import { useState } from "react";
import {
  addExpense,
  calculateTotal,
  filterByCategory,
  deleteExpense,
  getHighestExpense,
  generateExpenseSummary,
} from "./utils/expenseUtils";
import { sampleExpenses } from "./data/sampleExpenses";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const filteredExpenses = filterByCategory(expenses, filter);
  const total = calculateTotal(filteredExpenses);
  const highestExpense = getHighestExpense(expenses);
  const summary = generateExpenseSummary(expenses);

  const categories = ["All", ...new Set(expenses.map((expense) => expense.category))];

  function handleAddExpense(e) {
    e.preventDefault();

    try {
      const updatedExpenses = addExpense(expenses, {
        title,
        amount,
        category,
      });

      setExpenses(updatedExpenses);
      setTitle("");
      setAmount("");
      setCategory("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleDeleteExpense(id) {
    const updatedExpenses = deleteExpense(expenses, id);
    setExpenses(updatedExpenses);
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="badge">AI-Assisted React Project</p>
          <h1>Student Expense Tracker</h1>
          <p className="hero-text">
            Manage your daily student expenses, track spending patterns, and
            view a clear summary of your budget.
          </p>
        </div>

        <div className="hero-card">
          <p>Total Spending</p>
          <h2>Rs. {summary.totalAmount}</h2>
          <span>{summary.totalExpenses} expense records</span>
        </div>
      </section>

      <section className="dashboard">
        <div className="form-card">
          <h2>Add New Expense</h2>
          <p className="section-text">
            Enter your expense details below to update the tracker.
          </p>

          <form onSubmit={handleAddExpense} className="expense-form">
            <div className="input-group">
              <label>Expense Title</label>
              <input
                type="text"
                placeholder="e.g. Lunch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Amount</label>
              <input
                type="number"
                placeholder="e.g. 250"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="e.g. Food"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <button type="submit" className="add-btn">
              Add Expense
            </button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>

        <div className="summary-card">
          <h2>Expense Summary</h2>

          <div className="summary-grid">
            <div className="summary-box">
              <span>Total Records</span>
              <strong>{summary.totalExpenses}</strong>
            </div>

            <div className="summary-box">
              <span>Total Amount</span>
              <strong>Rs. {summary.totalAmount}</strong>
            </div>

            <div className="summary-box">
              <span>Average Expense</span>
              <strong>Rs. {summary.averageExpense.toFixed(2)}</strong>
            </div>

            <div className="summary-box">
              <span>Highest Expense</span>
              <strong>
                {highestExpense
                  ? `${highestExpense.title} - Rs. ${highestExpense.amount}`
                  : "No expense"}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="expense-section">
        <div className="expense-header">
          <div>
            <h2>Expense List</h2>
            <p className="section-text">
              View, filter, and delete expense records.
            </p>
          </div>

          <div className="filter-box">
            <label>Filter by Category</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filtered-total">
          Total after filter: <strong>Rs. {total}</strong>
        </div>

        <div className="expense-list">
          {filteredExpenses.length === 0 ? (
            <p className="empty-message">No expenses found in this category.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <div className="expense-item" key={expense.id}>
                <div>
                  <h3>{expense.title}</h3>
                  <p>{expense.date}</p>
                </div>

                <span className="category-pill">{expense.category}</span>

                <strong className="amount">Rs. {expense.amount}</strong>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;