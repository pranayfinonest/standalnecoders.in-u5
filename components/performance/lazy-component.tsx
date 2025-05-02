"use client"

import { Suspense, lazy, type ComponentType, type ReactNode } from "react"

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: ReactNode
  props?: Record<string, any>
}

export function LazyComponent({ component, fallback, props = {} }: LazyComponentProps) {
  const LazyLoadedComponent = lazy(component)

  return (
    <Suspense fallback={fallback || <div className="min-h-[100px] animate-pulse bg-gray-200 rounded-md" />}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  )
}
