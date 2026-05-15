export function addExpense(expenses, newExpense) {
  if (!newExpense.title || newExpense.title.trim() === "") {
    throw new Error("Expense title is required");
  }

  if (!newExpense.amount || Number(newExpense.amount) <= 0) {
    throw new Error("Expense amount must be greater than zero");
  }

  if (!newExpense.category || newExpense.category.trim() === "") {
    throw new Error("Expense category is required");
  }

  const expense = {
    id: Date.now(),
    title: newExpense.title.trim(),
    amount: Number(newExpense.amount),
    category: newExpense.category.trim(),
    date: newExpense.date || new Date().toISOString().split("T")[0],
  };

  return [...expenses, expense];
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
}

export function filterByCategory(expenses, category) {
  if (!category || category === "All") {
    return expenses;
  }

  return expenses.filter(
    (expense) => expense.category.toLowerCase() === category.toLowerCase()
  );
}

export function deleteExpense(expenses, id) {
  return expenses.filter((expense) => expense.id !== id);
}

export function getHighestExpense(expenses) {
  if (expenses.length === 0) {
    return null;
  }

  return expenses.reduce((highest, current) =>
    Number(current.amount) > Number(highest.amount) ? current : highest
  );
}

export function generateExpenseSummary(expenses) {
  const total = calculateTotal(expenses);
  const highest = getHighestExpense(expenses);

  return {
    totalExpenses: expenses.length,
    totalAmount: total,
    highestExpense: highest,
    averageExpense: expenses.length === 0 ? 0 : total / expenses.length,
  };
}