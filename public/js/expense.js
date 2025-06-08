import { auth, db } from "./firebase-config.js";

import {
  collection, addDoc, getDocs, deleteDoc, doc, query, where, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { formatRupiah } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");
  const categorySelect = document.getElementById("category");
  const filterSelect = document.getElementById("filter-type");

  const incomeCategories = ["Salary", "Freelance", "Bonus", "Gift", "Investment", "Business", "Rental Income", "Dividends", "Cashback", "Other"];

  const expenseCategories = ["Food & Drinks", "Groceries", "Transport", "Fuel", "Parking", "Bills & Utilities", "Electricity", "Internet", "Mobile Plan", "Shopping", "Entertainment", "Health & Medical", "Insurance", "Education", "Subscriptions", "Travel", "Dining Out", "Donations", "Gifts", "Personal Care", "Household", "Pets", "Loan Payments", "Taxes", "Other"];

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

  typeSelect.addEventListener("change", () => updateCategoryOptions(typeSelect.value));
  filterSelect.addEventListener("change", () => fetchEntries(currentUserId));

  amountInput.addEventListener("input", (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    amountInput.value = value ? formatRupiah(value) : "";
  });

  updateCategoryOptions(typeSelect.value);

  let currentUserId = null;

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Please login first.");
      window.location.href = "login.html";
      return;
    }

    currentUserId = user.uid;
    document.getElementById("user-email").textContent = user.email || "User";
    const userDocRef = doc(db, "users", currentUserId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists() && userDocSnap.data().name) {
      document.getElementById("user-name").textContent = userDocSnap.data().name;
    }

    fetchEntries(currentUserId);

    document.getElementById("expenseForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const amount = parseInt(amountInput.value.replace(/[^0-9]/g, ""));
      const description = document.getElementById("desc").value.trim();
      const category = categorySelect.value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const type = typeSelect.value;

      if (!amount || isNaN(amount) || amount <= 0) return alert("Enter valid amount");
      if (description.length < 3) return alert("Description too short");

      try {
        await addDoc(collection(db, "entries"), {
          userId: currentUserId, amount, description, category, date, time, type,
          createdAt: new Date()
        });

        e.target.reset();
        updateCategoryOptions(typeSelect.value);
        fetchEntries(currentUserId);
      } catch (err) {
        console.error("Add failed", err);
        alert("Failed to add entry.");
      }
    });

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

async function fetchEntries(userId) {
  const q = query(collection(db, "entries"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  const container = document.getElementById("transaction-list");
  container.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  const filterType = document.getElementById("filter-type").value;
  const grouped = {};

  snapshot.forEach((docSnap) => {
    const item = { id: docSnap.id, ...docSnap.data() };
    if (filterType !== "all" && item.type !== filterType) return;
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);

    if (item.type === "income") totalIncome += item.amount;
    else if (item.type === "expense") totalExpense += item.amount;
  });

  const balance = totalIncome - totalExpense;
  const balanceText = document.getElementById("balance");
  const totalIncomeText = document.getElementById("total-income");
  const totalExpenseText = document.getElementById("total-expense");

  if (balanceText) balanceText.textContent = formatRupiah(balance);
  if (totalIncomeText) totalIncomeText.textContent = formatRupiah(totalIncome);
  if (totalExpenseText) totalExpenseText.textContent = formatRupiah(totalExpense);
  balanceText.classList.toggle("positive", balance >= 0);
  balanceText.classList.toggle("negative", balance < 0);

  for (const date in grouped) {
    const dateHeader = document.createElement("div");
    dateHeader.className = "date-header my-2 border-bottom pb-1 text-muted small";
    dateHeader.textContent = date;
    container.appendChild(dateHeader);

    grouped[date].forEach(item => {
      const wrapper = document.createElement("div");
      wrapper.className = `transaction-box ${item.type}`;

      const icon = item.type === "income"
        ? '<i class="bi bi-caret-down-fill text-success"></i>'
        : '<i class="bi bi-caret-up-fill text-danger"></i>';

      wrapper.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex">
            <div class="me-2">${icon}</div>
            <div>
              <strong class="text-amount">${formatRupiah(item.amount)}</strong>
              <div class="transaction-details d-none">
                <div><strong>Type:</strong> ${item.type}</div>
                <div><strong>Category:</strong> ${item.category}</div>
                <div><strong>Description:</strong> ${item.description}</div>
                <div><strong>Time:</strong> ${item.time}</div>
              </div>
            </div>
          </div>
          <div class="entry-action-buttons">
            <button class="btn btn-edit-icon"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-delete-icon"><i class="bi bi-trash"></i></button>
          </div>
        </div>`;

      const detailSection = wrapper.querySelector(".transaction-details");
      wrapper.addEventListener("click", (e) => {
        if (!e.target.closest(".entry-action-buttons")) {
          detailSection.classList.toggle("d-none");
        }
      });

      wrapper.querySelector(".btn-delete-icon").onclick = async () => {
        await deleteDoc(doc(db, "entries", item.id));
        fetchEntries(userId);
      };

      wrapper.querySelector(".btn-edit-icon").onclick = async () => {
        document.getElementById("type").value = item.type;
        document.getElementById("amount").value = formatRupiah(item.amount);
        document.getElementById("desc").value = item.description;
        document.getElementById("category").value = item.category;
        document.getElementById("date").value = item.date;
        document.getElementById("time").value = item.time;
        await deleteDoc(doc(db, "entries", item.id));
        fetchEntries(userId);
      };

      container.appendChild(wrapper);
    });
  }
}
