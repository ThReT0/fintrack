"use client"

import { useState, useEffect } from "react"

function TransactionSummary({ transactions }) {
  // State for selecting summary period (weekly or monthly)
  const [summaryPeriod, setSummaryPeriod] = useState("weekly")
  // State to store calculated summary values
  const [summary, setSummary] = useState({ income: 0, expenses: 0, net: 0 })

  useEffect(() => {
    // Function to calculate transaction summary based on selected period
    const getSummary = () => {
      const now = new Date() // Get current date
      // Determine the start date for filtering transactions
      const periodStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        summaryPeriod === "weekly" ? now.getDate() - 7 : 1, // Weekly: last 7 days, Monthly: 1st day of month
      )

      // Filter transactions that fall within the selected period
      const filteredTransactions = transactions.filter((t) => new Date(t.date) >= periodStart)

      // Calculate total income by summing amounts of income transactions
      const income = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
      // Calculate total expenses by summing amounts of expense transactions
      const expenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

      // Return an object with calculated income, expenses, and net balance
      return { income, expenses, net: income - expenses }
    }

    setSummary(getSummary()) // Update summary state with calculated values
  }, [transactions, summaryPeriod]) // Effect runs when transactions or summary period changes

  return (
    <div className="card">
      <h2>Transaction Summary</h2>
      {/* Toggle buttons for selecting summary period */}
      <div className="period-toggle">
        <button
          onClick={() => setSummaryPeriod("weekly")}
          className={`toggle-btn ${summaryPeriod === "weekly" ? "active" : ""}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setSummaryPeriod("monthly")}
          className={`toggle-btn ${summaryPeriod === "monthly" ? "active" : ""}`}
        >
          Monthly
        </button>
      </div>
      {/* Display calculated summary values */}
      <div className="summary-content">
        <div className="summary-item">
          <span className="summary-label">Income:</span>
          <span className="summary-value positive">${summary.income.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Expenses:</span>
          <span className="summary-value negative">${summary.expenses.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Net:</span>
          <span className={`summary-value ${summary.net >= 0 ? "positive" : "negative"}`}>
            ${summary.net.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TransactionSummary
