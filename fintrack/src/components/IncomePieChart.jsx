"use client"

import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function IncomePieChart({ transactions }) {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    const incomeByCategory = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})

    const labels = Object.keys(incomeByCategory)
    const data = Object.values(incomeByCategory)

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
  }, [transactions])

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

