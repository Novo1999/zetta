import { motion } from 'framer-motion'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

const Button = ({ onClick, children, icon, className = '' }: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 text-white font-medium shadow-lg shadow-sky-500/25 ${className}`}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(56, 189, 248, 0.4), 0 10px 10px -5px rgba(56, 189, 248, 0.04)',
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Background shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{
          translateX: ['100%', '-100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />

      {/* Button content */}
      <motion.span className="relative flex items-center gap-2" whileHover={{ x: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
        {icon && (
          <motion.div
            whileHover={{
              rotate: 180,
              transition: { duration: 0.3 },
            }}
          >
            {icon}
          </motion.div>
        )}
        {children}
      </motion.span>
    </motion.button>
  )
}

export default Button
