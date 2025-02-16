"use client"

import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function SpendingPieChart({ transactions }) {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    const expensesByCategory = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})

    const labels = Object.keys(expensesByCategory)
    const data = Object.values(expensesByCategory)

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    })
  }, [transactions])

  if (!chartData) {
    return null
  }

  return (
    <div className="card">
      <h2>Spending Patterns</h2>
      <Pie data={chartData} options={{ responsive: true }} />
    </div>
  )
}

export default SpendingPieChart

