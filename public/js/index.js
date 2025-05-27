document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const token = localStorage.getItem("token");

  try {
    await axios.post(
      "/register-expense",
      { type, amount, description },
      { headers: { Authorization: token } }
    );
    await loadData();
    e.target.reset();
  } catch (err) {
    console.error("Error submitting data:", err);
  }
});

async function loadData() {
  const token = localStorage.getItem("token");
  const tbody = document.getElementById("recordsBody");
  tbody.innerHTML = "";

  try {
    const [expenseRes, incomeRes] = await Promise.all([
      axios.get("/expenses", { headers: { Authorization: token } }),
      axios.get("/incomes", { headers: { Authorization: token } }),
    ]);

    expenseRes.data.allExpense.forEach(e =>
      addRow("Expense", e.amount, e.description)
    );
    incomeRes.data.allIncomes.forEach(i =>
      addRow("Income", i.amount, i.description)
    );
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

function addRow(type, amount, description) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${type}</td>
    <td>${amount}</td>
    <td>${description}</td>
  `;
  document.getElementById("recordsBody").appendChild(tr);
}

window.addEventListener("DOMContentLoaded", loadData);
