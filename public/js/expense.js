// public/js/expense.js

// 🔌 Import konfigurasi Firebase Auth & Firestore
import { auth, db } from "./firebase-config.js";

// 🔄 Import fungsi Firestore yang digunakan
import {
  collection, addDoc, getDocs, deleteDoc, doc, query, where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 Import fungsi autentikasi Firebase
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🧮 Import fungsi helper untuk format mata uang Rupiah
import { formatRupiah } from "./utils.js";

// 🔁 Ketika halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");
  const categorySelect = document.getElementById("category");

  // 📂 Kategori untuk income dan expense
  const incomeCategories = ["Salary",
  "Freelance",
  "Bonus",
  "Gift",
  "Investment",
  "Business",
  "Rental Income",
  "Dividends",
  "Cashback",
  "Other"];
  
  const expenseCategories = ["Food & Drinks",
  "Groceries",
  "Transport",
  "Fuel",
  "Parking",
  "Bills & Utilities",
  "Electricity",
  "Internet",
  "Mobile Plan",
  "Shopping",
  "Entertainment",
  "Health & Medical",
  "Insurance",
  "Education",
  "Subscriptions",
  "Travel",
  "Dining Out",
  "Donations",
  "Gifts",
  "Personal Care",
  "Household",
  "Pets",
  "Loan Payments",
  "Taxes",
  "Other"];

  // 🔄 Update isi dropdown kategori sesuai tipe transaksi
  function updateCategoryOptions(type) {
    const categories = type === "income" ? incomeCategories : expenseCategories;
    categorySelect.innerHTML = "";
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  // 🔁 Jika tipe berubah, update kategori
  typeSelect.addEventListener("change", () => updateCategoryOptions(typeSelect.value));

  // 💸 Saat user mengetik nominal, ubah jadi format Rupiah
  amountInput.addEventListener("input", (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    amountInput.value = value ? formatRupiah(value) : "";
  });

  updateCategoryOptions(typeSelect.value);

  // 👤 Cek apakah user sudah login
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("Please login first.");
      window.location.href = "login.html";
      return;
    }

    const userId = user.uid;
    fetchEntries(userId);

    // 📝 Submit form transaksi
    document.getElementById("expenseForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const amount = parseInt(amountInput.value.replace(/[^0-9]/g, ""));
      const description = document.getElementById("desc").value.trim();
      const category = categorySelect.value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const type = typeSelect.value;

      // ✅ Validasi form sederhana
      if (!amount || isNaN(amount) || amount <= 0) return alert("Enter valid amount");
      if (description.length < 3) return alert("Description too short");

      try {
        // 🚀 Simpan transaksi ke Firestore
        await addDoc(collection(db, "entries"), {
          userId,
          amount,
          description,
          category,
          date,
          time,
          type,
          createdAt: new Date()
        });

        // 🔄 Reset form dan refresh tampilan transaksi
        e.target.reset();
        updateCategoryOptions(typeSelect.value);
        fetchEntries(userId);
      } catch (err) {
        console.error("Add failed", err);
        alert("Failed to add entry.");
      }
    });

    // 🚪 Tombol Logout
    document.getElementById("logoutBtn")?.addEventListener("click", async () => {
      try {
        await signOut(auth);
        localStorage.clear();
        window.location.href = "login.html";
      } catch (err) {
        console.error("Logout error:", err);
        alert("Failed to logout");
      }
    });
  });
});

// 📥 Ambil dan render data transaksi dari Firestore
async function fetchEntries(userId) {
  const q = query(collection(db, "entries"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  const incomeList = document.getElementById("income-entries");
  const expenseList = document.getElementById("expense-entries");
  const balanceText = document.getElementById("balance");

  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  let totalIncome = 0, totalExpense = 0;

  snapshot.forEach((docSnap) => {
    const item = { id: docSnap.id, ...docSnap.data() };
    const list = item.type === "income" ? incomeList : expenseList;

    if (item.type === "income") totalIncome += item.amount;
    else totalExpense += item.amount;

    renderEntry(item, item.type, list, userId);
  });

  // 💰 Tampilkan balance akhir
  const balance = totalIncome - totalExpense;
  balanceText.textContent = `Balance: ${formatRupiah(balance)}`;
  balanceText.classList.toggle("positive", balance >= 0);
  balanceText.classList.toggle("negative", balance < 0);
}

// 🧾 Render satu transaksi (entry)
function renderEntry(item, type, list, userId) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  const summary = document.createElement("div");
  summary.innerHTML = `
    <strong>${formatRupiah(item.amount)}</strong> - ${item.category || "-"} (${item.date || "-"})<br/>
    ${item.description || "-"}
  `;

  const btnGroup = document.createElement("div");
  btnGroup.className = "mt-2 d-flex justify-content-end gap-2";

  // ❌ Tombol Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = async () => {
    await deleteDoc(doc(db, "entries", item.id));
    li.remove();
    fetchEntries(userId);
  };

  // ✏️ Tombol Edit (langsung isi form)
  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning btn-sm";
  editBtn.textContent = "Edit";
  editBtn.onclick = async () => {
    document.getElementById("type").value = item.type;
    document.getElementById("amount").value = formatRupiah(item.amount);
    document.getElementById("desc").value = item.description;
    document.getElementById("category").value = item.category;
    document.getElementById("date").value = item.date;
    document.getElementById("time").value = item.time;

    await deleteDoc(doc(db, "entries", item.id));
    fetchEntries(userId);
  };

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(summary);
  li.appendChild(btnGroup);
  list.appendChild(li);
}
