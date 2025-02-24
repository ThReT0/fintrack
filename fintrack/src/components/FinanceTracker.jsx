"use client"

import { useState, useEffect } from "react"
import TransactionHistory from "./TransactionHistory"
import TransactionSummary from "./TransactionSummary"
import SpendingPieChart from "./SpendingPieChart"
import IncomePieChart from "./IncomePieChart"

function FinanceTracker() {
  // State to store the list of transactions
  const [transactions, setTransactions] = useState([])

  // State to store the user's balance
  const [balance, setBalance] = useState(0)

  // State to store the details of a new transaction being added
  const [newTransaction, setNewTransaction] = useState({
    type: "expense", // Can be "income" or "expense"
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0], // Sets default to today's date
    description: "",
  })

  // useEffect to load stored transactions from local storage when the component first mounts
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions")
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  // useEffect to update local storage and recalculate balance whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
    calculateBalance()
  }, [transactions])

  // Function to calculate the total balance based on transaction history
  const calculateBalance = () => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount
    }, 0)
    setBalance(newBalance)
  }

  // Handles user input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTransaction((prev) => ({ ...prev, [name]: name === "amount" ? Number.parseFloat(value) : value }))
  }

  // Handles selection changes for transaction type (income or expense)
  const handleSelectChange = (e) => {
    setNewTransaction((prev) => ({ ...prev, type: e.target.value }))
  }

  // Handles form submission to add a new transaction
  const handleSubmit = (e) => {
    e.preventDefault()
    const transaction = {
      ...newTransaction,
      id: Date.now().toString(), // Creates a unique ID using the current timestamp
    }
    setTransactions((prev) => [...prev, transaction]) // Adds the new transaction to the list
    setNewTransaction({
      type: "expense",
      amount: 0,
      category: "",
      date: new Date().toISOString().split("T")[0], // Reset the date to today's date
      description: "",
    }) // Resets the form after submission
  }

  // Function to update an existing transaction in the list
  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions((prev) => prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
  }

  return (
    <div className="container">
      <h1 className="title">CoinTrack Dashboard</h1>

      {/* Display the user's current balance */}
      <div className="grid">
        <div className="card">
          <h2>Current Balance</h2>
          <p className={`balance ${balance >= 0 ? "positive" : "negative"}`}>${balance.toFixed(2)}</p>
        </div>

        {/* Form to add a new transaction */}
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

      {/* Display the transaction history with editing functionality */}
      <TransactionHistory transactions={transactions} onUpdateTransaction={handleUpdateTransaction} />

      {/* Display transaction summary and pie charts */}
      <div className="grid">
        <TransactionSummary transactions={transactions} />
        <SpendingPieChart transactions={transactions} />
        <IncomePieChart transactions={transactions} />
      </div>
    </div>
  )
}

export default FinanceTracker
