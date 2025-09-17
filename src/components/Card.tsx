'use client'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  title?: string
}

export default function Card({ children, className = '', onClick, title }: CardProps) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={`bg-white rounded-2xl p-4 card-shadow ${className}`} onClick={onClick}>
      {title ? <h3 className="text-sm font-semibold mb-2">{title}</h3> : null}
      {children}
    </motion.div>
  )
}
