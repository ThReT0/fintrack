"use client"

import { useState } from "react"

function TransactionHistory({ transactions, onUpdateTransaction }) {
  // State for tracking the transaction being edited
  const [editingId, setEditingId] = useState(null)
  const [editedTransaction, setEditedTransaction] = useState(null)

  // Function to start editing a transaction
  const handleEdit = (transaction) => {
    setEditingId(transaction.id) // Set the transaction ID being edited
    setEditedTransaction(transaction) // Store the selected transaction in state
  }

  // Function to save the edited transaction
  const handleSave = () => {
    if (editedTransaction) {
      onUpdateTransaction(editedTransaction) // Call parent function to update transaction
      setEditingId(null) // Reset editing state
      setEditedTransaction(null)
    }
  }

  // Function to cancel editing
  const handleCancel = () => {
    setEditingId(null)
    setEditedTransaction(null)
  }

  // Function to update edited transaction fields
  const handleChange = (e) => {
    if (editedTransaction) {
      const { name, value } = e.target
      setEditedTransaction({
        ...editedTransaction,
        [name]: name === "amount" ? Number.parseFloat(value) : value, // Convert amount to a float
      })
    }
  }

  return (
    <div className="card transaction-history">
      <h2>Transaction History</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            {editingId === transaction.id ? (
              // Edit form when transaction is being edited
              <div className="edit-form">
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={editedTransaction.type}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={editedTransaction.amount || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    name="category"
                    value={editedTransaction.category || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    value={editedTransaction.description || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                {/* Buttons for saving or canceling edits */}
                <div className="button-group">
                  <button onClick={handleSave} className="btn btn-primary">
                    Save
                  </button>
                  <button onClick={handleCancel} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display transaction details when not in edit mode
              <div className="transaction-details">
                <span className={`amount ${transaction.type === "income" ? "positive" : "negative"}`}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </span>
                <span className="category">{transaction.category}</span>
                <span className="description">{transaction.description}</span>
                <button onClick={() => handleEdit(transaction)} className="btn btn-edit">
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionHistory
