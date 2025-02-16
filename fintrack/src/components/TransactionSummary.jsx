"use client"

import { useState, useEffect } from "react"

function TransactionSummary({ transactions }) {
  const [summaryPeriod, setSummaryPeriod] = useState("weekly")
  const [summary, setSummary] = useState({ income: 0, expenses: 0, net: 0 })

  useEffect(() => {
    const getSummary = () => {
      const now = new Date()
      const periodStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        summaryPeriod === "weekly" ? now.getDate() - 7 : 1,
      )

      const filteredTransactions = transactions.filter((t) => new Date(t.date) >= periodStart)

      const income = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
      const expenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

      return { income, expenses, net: income - expenses }
    }

    setSummary(getSummary())
  }, [transactions, summaryPeriod])

  return (
    
    <div className="card">
      <h2>Transaction Summary</h2>
      <div className="summary-controls">
        <button onClick={() => setSummaryPeriod("weekly")} className={summaryPeriod === "weekly" ? "active" : ""}>
          Weekly
        </button>
        <button onClick={() => setSummaryPeriod("monthly")} className={summaryPeriod === "monthly" ? "active" : ""}>
          Monthly
        </button>
      </div>
      <div className="summary-content">
        <p>Income: ${summary.income.toFixed(2)}</p>
        <p>Expenses: ${summary.expenses.toFixed(2)}</p>
        <p>Net: ${summary.net.toFixed(2)}</p>
        
      </div>
    </div>
  )
}

export default TransactionSummary
