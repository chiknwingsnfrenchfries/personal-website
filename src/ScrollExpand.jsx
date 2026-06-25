import { useRef, useEffect, useState } from 'react'

// Collins-style scroll-expand: element scales from 0.88 → 1.05 as it passes through viewport
export default function ScrollExpand({ children, className = '' }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0.88)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // progress: 0 when bottom of el hits bottom of viewport, 1 when top hits top
      const progress = 1 - (rect.bottom / (vh + rect.height))
      const clamped = Math.max(0, Math.min(1, progress))
      // scale from 0.88 to 1.05
      setScale(0.88 + clamped * 0.17)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className={`expand-wrap ${className}`}>
      <div
        className="expand-inner"
        style={{ transform: `scale(${scale})`, transition: 'transform 0.1s linear' }}
      >
        {children}
      </div>
    </div>
  )
}
