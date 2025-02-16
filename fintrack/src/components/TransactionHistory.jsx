"use client"

import { useState } from "react"

function TransactionHistory({ transactions, onUpdateTransaction }) {
  const [editingId, setEditingId] = useState(null)
  const [editedTransaction, setEditedTransaction] = useState(null)

  const handleEdit = (transaction) => {
    setEditingId(transaction.id)
    setEditedTransaction(transaction)
  }

  const handleSave = () => {
    if (editedTransaction) {
      onUpdateTransaction(editedTransaction)
      setEditingId(null)
      setEditedTransaction(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditedTransaction(null)
  }

  const handleChange = (e) => {
    if (editedTransaction) {
      const { name, value } = e.target
      setEditedTransaction({
        ...editedTransaction,
        [name]: name === "amount" ? Number.parseFloat(value) : value,
      })
    }
  }

  return (
    <div className="card">
      <h2>Transaction History</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            {editingId === transaction.id ? (
              <div className="edit-form">
                <div>
                  <label htmlFor="type">Type</label>
                  <select id="type" name="type" value={editedTransaction.type} onChange={handleChange}>
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
                    value={editedTransaction.amount || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    name="category"
                    value={editedTransaction.category || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    value={editedTransaction.description || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-group">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="transaction-details">
                <span className={`amount ${transaction.type === "income" ? "positive" : "negative"}`}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </span>
                <span className="category">{transaction.category}</span>
                <span className="description">{transaction.description}</span>
                <button onClick={() => handleEdit(transaction)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionHistory

