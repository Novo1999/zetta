import { motion, Transition } from 'framer-motion'
import React, { CSSProperties } from 'react'

const styleContainer: CSSProperties = {
  position: 'relative',
  width: 50,
  height: 50,
}

const styleSpan: CSSProperties = {
  display: 'block',
  width: 50,
  height: 50,
  border: '7px solid #eee',
  borderTop: '7px solid #2D3134',
  borderRadius: '50%',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
}

const spinTransition: Transition = {
  repeat: Infinity,
  ease: 'easeInOut',
  duration: 1,
}

const Spinner = () => {
  return (
    <div style={styleContainer}>
      <motion.span style={styleSpan} animate={{ rotate: 360 }} transition={spinTransition} />
    </div>
  )
}

export default Spinner
