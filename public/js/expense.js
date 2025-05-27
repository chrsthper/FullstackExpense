document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "/";
    return;
  }

  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");
  const categorySelect = document.getElementById("category");

  const incomeCategories = ["Salary", "Gift", "Bonus", "Other"];
  const expenseCategories = ["Food", "Transport", "Groceries", "Bills", "Entertainment", "Other"];

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
  typeSelect.addEventListener("change", () => {
    updateCategoryOptions(typeSelect.value);
  });

  // format Rupiah saat input
  amountInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) {
      amountInput.value = "";
      return;
    }
    amountInput.value = formatRupiah(value);
  });

  updateCategoryOptions(typeSelect.value); // initial load
  fetchEntries();

  document.getElementById("expenseForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = typeSelect.value;
    const rawAmount = amountInput.value.trim();
    const amount = parseInt(rawAmount.replace(/[^0-9]/g, ""));
    const description = document.getElementById("desc").value.trim();
    const category = categorySelect.value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    if (!description || description.length < 3) {
      alert("Description must be at least 3 characters.");
      return;
    }

    try {
      await axios.post("/register-expense", {
        money: type === "income" ? 1 : 0,
        amount,
        description,
        category,
        date,
        time
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      e.target.reset();
      updateCategoryOptions(typeSelect.value); // reset category too
      fetchEntries();
    } catch (err) {
      console.error(err);
      alert("Failed to add entry.");
    }
  });
});

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}

async function fetchEntries() {
  const token = localStorage.getItem("token");
  const incomeList = document.getElementById("income-entries");
  const expenseList = document.getElementById("expense-entries");
  const balanceText = document.getElementById("balance");

  incomeList.innerHTML = "";
  expenseList.innerHTML = "";
  let totalIncome = 0;
  let totalExpense = 0;

  try {
    const [expenses, incomes] = await Promise.all([
      axios.get("/expenses", { headers: { Authorization: `Bearer ${token}` } }),
      axios.get("/incomes", { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    incomes.data.allIncomes.forEach(item => {
      totalIncome += parseInt(item.amount);
      renderEntry(item, "income", incomeList);
    });

    expenses.data.allExpense.forEach(item => {
      totalExpense += parseInt(item.amount);
      renderEntry(item, "expense", expenseList);
    });

    const balance = totalIncome - totalExpense;
    balanceText.textContent = `Balance: ${formatRupiah(balance)}`;
  } catch (err) {
    console.error("Failed to fetch data", err);
  }
}

function renderEntry(item, type, listElement) {
  const token = localStorage.getItem("token");
  const li = document.createElement("li");
  li.className = "list-group-item bg-secondary text-white mb-2";

  const content = document.createElement("div");
  content.innerHTML = `
    <strong>Amount:</strong> ${formatRupiah(item.amount)}<br/>
    <strong>Description:</strong> ${item.description}<br/>
    <strong>Category:</strong> ${item.category || "-"}<br/>
    <strong>Date:</strong> ${item.date || "-"}
  `;

  const btnGroup = document.createElement("div");
  btnGroup.className = "mt-2 d-flex justify-content-end";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-danger me-2";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = async () => {
    try {
      await axios.delete(`/${type === "income" ? "incomes" : "expenses"}/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      li.remove();
      fetchEntries();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-warning";
  editBtn.textContent = "Edit";
  editBtn.onclick = async () => {
    document.getElementById("type").value = type;
    document.getElementById("amount").value = formatRupiah(item.amount);
    document.getElementById("desc").value = item.description;
    document.getElementById("category").value = item.category;
    document.getElementById("date").value = item.date;
    document.getElementById("time").value = item.time;

    await axios.delete(`/${type === "income" ? "incomes" : "expenses"}/${item.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    li.remove();
    fetchEntries();
  };

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);
  li.appendChild(content);
  li.appendChild(btnGroup);

  listElement.appendChild(li);
}
