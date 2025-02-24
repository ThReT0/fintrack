"use client"

import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

// Register required chart elements for Chart.js to work
ChartJS.register(ArcElement, Tooltip, Legend)

function IncomePieChart({ transactions }) {
  // State to store the chart data
  const [chartData, setChartData] = useState(null)

  // useEffect runs when transactions change to update the pie chart data
  useEffect(() => {
    // Filter only income transactions and group them by category
    const incomeByCategory = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})

    // Extract labels (categories) and data (amounts)
    const labels = Object.keys(incomeByCategory)
    const data = Object.values(incomeByCategory)

    // Set up the data for the Pie chart
    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    })
  }, [transactions]) // Runs whenever transactions change

  // If chart data is not ready, return nothing
  if (!chartData) {
    return null
  }

  return (
    <div className="card">
      <h2>Income Sources</h2>
      <Pie data={chartData} options={{ responsive: true }} />
    </div>
  )
}

export default IncomePieChart
