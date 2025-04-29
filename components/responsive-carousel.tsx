"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipe } from "@/utils/touch"
import { useIsMobile } from "@/hooks/use-media-query"

interface ResponsiveCarouselProps {
  children: React.ReactNode[]
  className?: string
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  interval?: number
  slidesToShow?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export function ResponsiveCarousel({
  children,
  className = "",
  showArrows = true,
  showDots = true,
  autoPlay = false,
  interval = 5000,
  slidesToShow = { mobile: 1, tablet: 2, desktop: 3 },
}: ResponsiveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Determine how many slides to show based on screen size
  const visibleSlides = isMobile
    ? slidesToShow.mobile || 1
    : window.innerWidth < 1024
      ? slidesToShow.tablet || 2
      : slidesToShow.desktop || 3

  const totalSlides = children.length
  const maxIndex = Math.max(0, totalSlides - visibleSlides)

  // Handle swipe gestures
  const { handlers } = useSwipe({
    onSwipeLeft: () => goToNext(),
    onSwipeRight: () => goToPrev(),
  })

  // Navigate to previous slide
  const goToPrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Navigate to next slide
  const goToNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return

    const intervalId = setInterval(() => {
      if (currentIndex < maxIndex) {
        goToNext()
      } else {
        setCurrentIndex(0)
      }
    }, interval)

    return () => clearInterval(intervalId)
  }, [autoPlay, currentIndex, maxIndex, interval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
        }}
        {...handlers}
      >
        {children.map((child, index) => (
          <div key={index} className="flex-shrink-0" style={{ width: `${100 / visibleSlides}%` }}>
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity ${
              currentIndex === 0 ? "opacity-50" : "opacity-80 hover:opacity-100"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === maxIndex}
            className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity ${
              currentIndex === maxIndex ? "opacity-50" : "opacity-80 hover:opacity-100"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {showDots && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
