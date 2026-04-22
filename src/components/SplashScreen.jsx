import { useEffect, useRef, useState } from 'react'
import './SplashScreen.css'
import tree from '../assets/tree.png'

export default function SplashScreen({ onComplete }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const scrollAccum = useRef(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    
    // 1. CREAZIONE SPRITE PIÙ LUMINOSO
    const spriteSize = 24
    const sprite = document.createElement('canvas')
    sprite.width = spriteSize
    sprite.height = spriteSize
    const sCtx = sprite.getContext('2d')
    const gradient = sCtx.createRadialGradient(spriteSize/2, spriteSize/2, 0, spriteSize/2, spriteSize/2, spriteSize/2)
    // Colore più caldo e intenso
    gradient.addColorStop(0, 'rgba(255, 200, 50, 1)')
    gradient.addColorStop(0.4, 'rgba(201, 162, 39, 0.6)')
    gradient.addColorStop(1, 'rgba(201, 162, 39, 0)')
    sCtx.fillStyle = gradient
    sCtx.fillRect(0, 0, spriteSize, spriteSize)

    let particles = []
    let targets = []
    let phase = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createTreeTargets()
    }

    const createTreeTargets = () => {
      const img = new Image()
      img.src = tree
      img.onload = () => {
        const off = document.createElement('canvas')
        const octx = off.getContext('2d')
        const scale = Math.min(window.innerWidth / img.width, window.innerHeight / img.height) * 0.4
        const w = img.width * scale
        const h = img.height * scale
        off.width = window.innerWidth
        off.height = window.innerHeight
        octx.drawImage(img, off.width/2 - w/2, off.height/2 - h/2, w, h)

        const data = octx.getImageData(0, 0, off.width, off.height).data
        targets = []
        for (let y = 0; y < off.height; y += 6) {
          for (let x = 0; x < off.width; x += 6) {
            if (data[(y * off.width + x) * 4 + 3] > 100) {
              targets.push({ x, y })
            }
          }
        }
        createParticles()
      }
    }

    const createParticles = () => {
      particles = targets.map(t => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        tx: t.x,
        ty: t.y,
        vx: 0,
        vy: 0,
        size: Math.random() * 6 + 3 // Leggermente più grandi
      }))
    }

    const draw = () => {
      // Sfondo pulito
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#0d1b2a'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // EFFETTO GLOW: usiamo 'lighter' per sommare la luce delle particelle
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        if (phase === 1) {
          p.vx += (p.tx - p.x) * 0.05
          p.vy += (p.ty - p.y) * 0.05
        } else {
          p.vx += (Math.random() - 0.5) * 0.2
          p.vy += (Math.random() - 0.5) * 0.2
        }

        p.vx *= 0.9
        p.vy *= 0.9
        p.x += p.vx
        p.y += p.vy

        ctx.drawImage(sprite, p.x - p.size/2, p.y - p.size/2, p.size, p.size)
      }
      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const timer = setTimeout(() => { phase = 1 }, 1500)
    window.addEventListener('resize', resize)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // 2. RIPRISTINO DELLO SCROLL
  useEffect(() => {
    const handleScroll = (e) => {
      scrollAccum.current += Math.abs(e.deltaY || 10)
      if (scrollAccum.current > 300 && !exiting) {
        setExiting(true)
        setTimeout(() => onComplete?.(), 1500)
      }
    }
    window.addEventListener('wheel', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [exiting, onComplete])

  return (
    <div className={`splash ${exiting ? 'splash--exit' : ''}`}>
      <canvas ref={canvasRef} className="splash__canvas" />
      <div className="splash__overlay" />
      <div className="splash__logo">
        <span className="splash__logo-text ">Benvenuto su Ohara</span>
      </div>
      <div className="splash__scroll">
        <span className='text-[#fec039]'>Scrolla per entrare</span>
        <div className="splash__arrow" />
      </div>
    </div>
  )
}