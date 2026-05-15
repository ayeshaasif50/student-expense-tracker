import { describe, it, expect } from "vitest";
import {
  addExpense,
  calculateTotal,
  filterByCategory,
  deleteExpense,
  getHighestExpense,
  generateExpenseSummary,
} from "../utils/expenseUtils";

const testExpenses = [
  {
    id: 1,
    title: "Lunch",
    amount: 250,
    category: "Food",
    date: "2026-05-01",
  },
  {
    id: 2,
    title: "Bus Ticket",
    amount: 80,
    category: "Transport",
    date: "2026-05-02",
  },
  {
    id: 3,
    title: "Mobile Package",
    amount: 500,
    category: "Internet",
    date: "2026-05-03",
  },
];

describe("Expense Utility Functions", () => {
  it("should add a valid expense", () => {
    const result = addExpense(testExpenses, {
      title: "Notebook",
      amount: 150,
      category: "Stationery",
      date: "2026-05-04",
    });

    expect(result.length).toBe(4);
    expect(result[3].title).toBe("Notebook");
    expect(result[3].amount).toBe(150);
    expect(result[3].category).toBe("Stationery");
  });

  it("should throw error for empty expense title", () => {
    expect(() =>
      addExpense(testExpenses, {
        title: "",
        amount: 100,
        category: "Food",
      })
    ).toThrow("Expense title is required");
  });

  it("should throw error for invalid amount", () => {
    expect(() =>
      addExpense(testExpenses, {
        title: "Tea",
        amount: 0,
        category: "Food",
      })
    ).toThrow("Expense amount must be greater than zero");
  });

  it("should calculate total amount correctly", () => {
    const total = calculateTotal(testExpenses);
    expect(total).toBe(830);
  });

  it("should return 0 total for empty expense list", () => {
    const total = calculateTotal([]);
    expect(total).toBe(0);
  });

  it("should filter expenses by category", () => {
    const result = filterByCategory(testExpenses, "Food");

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Lunch");
  });

  it("should return all expenses when category is All", () => {
    const result = filterByCategory(testExpenses, "All");

    expect(result.length).toBe(3);
  });

  it("should delete expense by id", () => {
    const result = deleteExpense(testExpenses, 2);

    expect(result.length).toBe(2);
    expect(result.find((expense) => expense.id === 2)).toBeUndefined();
  });

  it("should return highest expense", () => {
    const highest = getHighestExpense(testExpenses);

    expect(highest.title).toBe("Mobile Package");
    expect(highest.amount).toBe(500);
  });

  it("should return null when highest expense is requested from empty list", () => {
    const highest = getHighestExpense([]);

    expect(highest).toBeNull();
  });

  it("should generate correct expense summary", () => {
    const summary = generateExpenseSummary(testExpenses);

    expect(summary.totalExpenses).toBe(3);
    expect(summary.totalAmount).toBe(830);
    expect(summary.highestExpense.title).toBe("Mobile Package");
    expect(summary.averageExpense).toBeCloseTo(276.67, 1);
  });
});