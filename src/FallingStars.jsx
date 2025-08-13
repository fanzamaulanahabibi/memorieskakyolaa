import { useEffect, useRef } from 'react'

function FallingStars() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    const createElement = () => {
      const isPetal = Math.random() > 0.5 // 50% kelopak, 50% bintang
      const el = document.createElement("div")

      if (isPetal) {
        // 🌸 Kelopak bunga
        el.innerHTML = "🌸"
        el.style.position = "absolute"
        el.style.left = `${Math.random() * 100}vw`
        el.style.top = "-5vh"
        el.style.fontSize = `${Math.random() * 18 + 18}px`
        el.style.opacity = "0.8"
        el.style.animation = `petal-fall ${4 + Math.random() * 4}s linear forwards, petal-sway 3s ease-in-out infinite`
      } else {
        // ✨ Shooting star
        el.className = "shooting-star"
        el.style.left = `${Math.random() * 100}vw`
        el.style.top = "0"
        el.style.animationDuration = `${1 + Math.random() * 1.5}s`
      }

      container.appendChild(el)

      setTimeout(() => {
        if (container.contains(el)) {
          container.removeChild(el)
        }
      }, 8000)
    }

    const interval = setInterval(createElement, 900) // 1 elemen setiap 0.9 detik
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
