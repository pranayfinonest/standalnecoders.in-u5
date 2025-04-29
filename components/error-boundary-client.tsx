"use client"

import React from "react"
import ErrorBoundary from "@/components/error-boundary"

export default class ErrorBoundaryClient extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Client-side error caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorBoundary error={this.state.error} reset={() => this.setState({ hasError: false })} />
    }

    return this.props.children
  }
}
