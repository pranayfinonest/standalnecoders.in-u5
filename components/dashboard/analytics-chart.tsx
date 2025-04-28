"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
    fill?: boolean
  }[]
}

interface AnalyticsChartProps {
  title: string
  description?: string
  type: "line" | "bar" | "pie" | "doughnut"
  data: ChartData
  height?: number
  className?: string
}

export function AnalyticsChart({ title, description, type, data, height = 300, className }: AnalyticsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<any>(null)

  useEffect(() => {
    // This is a placeholder for Chart.js implementation
    // In a real implementation, you would import Chart.js and create the chart

    const renderChart = () => {
      if (!chartRef.current) return

      const ctx = chartRef.current.getContext("2d")
      if (!ctx) return

      // Clear canvas for re-renders
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

      // Draw placeholder chart
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height)

      ctx.fillStyle = "#6366f1"

      // Draw simple bar or line chart based on type
      if (type === "bar" || type === "line") {
        const dataPoints = data.datasets[0].data
        const maxValue = Math.max(...dataPoints)
        const width = chartRef.current.width / dataPoints.length

        for (let i = 0; i < dataPoints.length; i++) {
          const x = i * width
          const barHeight = (dataPoints[i] / maxValue) * (chartRef.current.height - 40)

          if (type === "bar") {
            ctx.fillRect(x + 10, chartRef.current.height - barHeight - 20, width - 20, barHeight)
          } else if (type === "line" && i > 0) {
            const prevX = (i - 1) * width + width / 2
            const prevY = chartRef.current.height - (dataPoints[i - 1] / maxValue) * (chartRef.current.height - 40) - 20
            const currX = i * width + width / 2
            const currY = chartRef.current.height - barHeight - 20

            ctx.beginPath()
            ctx.moveTo(prevX, prevY)
            ctx.lineTo(currX, currY)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(currX, currY, 4, 0, 2 * Math.PI)
            ctx.fill()
          } else if (i === 0 && type === "line") {
            const currX = i * width + width / 2
            const currY = chartRef.current.height - barHeight - 20

            ctx.beginPath()
            ctx.arc(currX, currY, 4, 0, 2 * Math.PI)
            ctx.fill()
          }
        }
      } else if (type === "pie" || type === "doughnut") {
        const dataPoints = data.datasets[0].data
        const total = dataPoints.reduce((sum, value) => sum + value, 0)
        const centerX = chartRef.current.width / 2
        const centerY = chartRef.current.height / 2
        const radius = Math.min(centerX, centerY) - 20

        let startAngle = 0
        const colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e"]

        for (let i = 0; i < dataPoints.length; i++) {
          const sliceAngle = (dataPoints[i] / total) * 2 * Math.PI

          ctx.fillStyle = colors[i % colors.length]
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
          ctx.closePath()
          ctx.fill()

          startAngle += sliceAngle
        }

        if (type === "doughnut") {
          ctx.fillStyle = "#ffffff"
          ctx.beginPath()
          ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
          ctx.fill()
        }
      }

      // Add labels
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      if (type === "bar" || type === "line") {
        const width = chartRef.current.width / data.labels.length
        for (let i = 0; i < data.labels.length; i++) {
          const x = i * width + width / 2
          ctx.fillText(data.labels[i], x, chartRef.current.height - 5)
        }
      }
    }

    renderChart()

    // Add window resize listener
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.width = chartRef.current.offsetWidth
        renderChart()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [data, type])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px`, position: "relative" }}>
          <canvas ref={chartRef} height={height} width="100%" style={{ width: "100%", height: "100%" }} />
        </div>
      </CardContent>
    </Card>
  )
}
