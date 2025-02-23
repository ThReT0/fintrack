"use client"

import { useState, useEffect } from "react"
import TransactionHistory from "./TransactionHistory"
import TransactionSummary from "./TransactionSummary"
import SpendingPieChart from "./SpendingPieChart"
import IncomePieChart from "./IncomePieChart"

function FinanceTracker() {
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  })

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions")
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
    calculateBalance()
  }, [transactions])

  const calculateBalance = () => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount
    }, 0)
    setBalance(newBalance)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTransaction((prev) => ({ ...prev, [name]: name === "amount" ? Number.parseFloat(value) : value }))
  }

  const handleSelectChange = (e) => {
    setNewTransaction((prev) => ({ ...prev, type: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [...prev, transaction])
    setNewTransaction({
      type: "expense",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    })
  }

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions((prev) => prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
  }

  return (
    <div className="container">
      <h1 className="title">CoinTrack Dashboard</h1>
      <div className="grid">
        <div className="card">
          <h2>Current Balance</h2>
          <p className={`balance ${balance >= 0 ? "positive" : "negative"}`}>${balance.toFixed(2)}</p>
        </div>
        <div className="card">
          <h2>Add New Transaction</h2>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label htmlFor="type">Type</label>
              <select id="type" name="type" value={newTransaction.type} onChange={handleSelectChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                name="amount"
                type="number"
                value={newTransaction.amount || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={newTransaction.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                value={newTransaction.description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <TransactionHistory transactions={transactions} onUpdateTransaction={handleUpdateTransaction} />
      <div className="grid">
        <TransactionSummary transactions={transactions} />
        <SpendingPieChart transactions={transactions} />
        <IncomePieChart transactions={transactions} />
      </div>
    </div>
  )
}

export default FinanceTracker

