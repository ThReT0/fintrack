// src/components/FinanceTracker.jsx
"use client"

import { useState, useEffect, useRef } from "react" // Added useRef for tracking initial render
import TransactionHistory from "./TransactionHistory"
import TransactionSummary from "./TransactionSummary"
import SpendingPieChart from "./SpendingPieChart"
import IncomePieChart from "./IncomePieChart"
import { auth } from "../firebase"
import { db } from "../firebase" // Import Firestore
import { signOut, onAuthStateChanged } from "firebase/auth"
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"

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
  const [user, setUser] = useState(null) // Track the current user
  const isInitialRender = useRef(true) // Track initial render to handle Strict Mode

  // Load transactions for the current user when they log in
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        let initialTransactions = [] // Temporary array to store initial data
        const userTransactionsRef = collection(db, "transactions")
        const q = query(userTransactionsRef, where("userId", "==", currentUser.uid))

        // Real-time listener for transactions
        const unsubscribeTransactions = onSnapshot(q, (snapshot) => {
          const userTransactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          // Prevent duplicate updates on initial render (e.g., due to Strict Mode)
          if (isInitialRender.current) {
            initialTransactions = userTransactions
            setTransactions(userTransactions)
            isInitialRender.current = false // Mark as not initial after first update
          } else {
            // Only update if there are new or different transactions
            const newTransactions = userTransactions.filter(
              (t) => !initialTransactions.some((it) => it.id === t.id)
            )
            if (newTransactions.length > 0) {
              setTransactions(userTransactions)
              initialTransactions = userTransactions // Update initial data
            }
          }
        }, (error) => {
          console.error("Error fetching transactions:", error)
        })

        return () => unsubscribeTransactions() // Cleanup on unmount or user change
      } else {
        setUser(null)
        setTransactions([])
        isInitialRender.current = true // Reset for next user
      }
    })

    return () => unsubscribeAuth() // Cleanup auth listener
  }, [auth, db])

  // Calculate balance whenever transactions change
  useEffect(() => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount
    }, 0)
    setBalance(newBalance)
  }, [transactions])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTransaction((prev) => ({ ...prev, [name]: name === "amount" ? Number.parseFloat(value) : value }))
  }

  const handleSelectChange = (e) => {
    setNewTransaction((prev) => ({ ...prev, type: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return // Ensure user is logged in

    const transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      userId: user.uid, // Associate transaction with the user
    }

    const transactionExists = transactions.some(
      (t) => t.id === transaction.id || (t.amount === transaction.amount && t.category === transaction.category && t.description === transaction.description && t.date === transaction.date)
    )
    if (transactionExists) return

    try {
      // Save to Firestore under the user's transactions collection
      const userDocRef = doc(db, "transactions", transaction.id)
      await setDoc(userDocRef, transaction)

      setTransactions((prev) => [...prev, transaction])
      setNewTransaction({
        type: "expense",
        amount: 0,
        category: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      })
    } catch (error) {
      console.error("Error saving transaction:", error)
    }
  }

  const handleUpdateTransaction = async (updatedTransaction) => {
    if (!user) return // Ensure user is logged in

    try {
      const transactionDocRef = doc(db, "transactions", updatedTransaction.id)
      await setDoc(transactionDocRef, updatedTransaction, { merge: true })

      setTransactions((prev) => prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
    } catch (error) {
      console.error("Error updating transaction:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <div className="container">
      <h1 className="title">CoinTrack Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-secondary">
        Log Out
      </button>

      <div className="grid">
        <div className="card">
          <h2>Current Balance</h2>
          <p className={`balance ${balance >= 0 ? "positive" : "negative"}`}>
            ${balance.toFixed(2)}
          </p>
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