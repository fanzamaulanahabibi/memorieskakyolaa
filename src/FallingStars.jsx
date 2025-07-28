// src/FallingStars.jsx
import { useEffect, useRef } from 'react'

function FallingStars() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    const createStar = () => {
      const star = document.createElement("div")
      star.className = "shooting-star"
      star.style.left = `${Math.random() * 100}vw`
      star.style.animationDuration = `${1 + Math.random() * 1.5}s`
      container.appendChild(star)

      setTimeout(() => {
        container.removeChild(star)
      }, 2000)
    }

    const interval = setInterval(createStar, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    />
  )
}

export default FallingStars
