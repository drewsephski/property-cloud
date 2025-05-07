'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import React from 'react'

export function BackgroundBeams({
  className,
  beamColor = '#7877c6',
  beamOpacity = 0.25,
  beamCount = 8,
}: {
  className?: string
  beamColor?: string
  beamOpacity?: number
  beamCount?: number
}) {
  const beamsRef = React.useRef<HTMLDivElement>(null)
  const [beams, setBeams] = useState<React.ReactNode[]>([])
  const controls = useAnimation()

  useEffect(() => {
    if (!beamsRef.current) return

    const generateBeams = () => {
      const newBeams: React.ReactNode[] = []
      const { width, height } = beamsRef.current?.getBoundingClientRect() || {
        width: 0,
        height: 0,
      }

      for (let i = 0; i < beamCount; i++) {
        const startX = Math.random() * width
        const startY = Math.random() * height
        const angle = Math.random() * 360
        const length = Math.max(width, height) * (0.5 + Math.random() * 0.5)

        newBeams.push(
          <motion.div
            key={i}
            className="absolute bg-beam-color"
            initial={{
              opacity: 0,
              rotate: angle,
              x: startX,
              y: startY,
              scaleX: 0,
            }}
            animate={{
              opacity: beamOpacity,
              scaleX: 1,
              transition: {
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: Math.random() * 2,
              },
            }}
            style={
              {
                width: length,
                height: 1 + Math.random() * 2,
                transformOrigin: 'left',
                '--beam-color': beamColor,
              } as React.CSSProperties
            }
          />
        )
      }
      setBeams(newBeams)
    }

    generateBeams()
    controls.start('animate')

    const handleResize = () => {
      generateBeams()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [beamCount, beamOpacity, controls, beamColor])

  return (
    <div
      ref={beamsRef}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      style={{ '--beam-color': beamColor } as React.CSSProperties}
    >
      {beams}
    </div>
  )
}
