import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedTitleProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  delay?: number;
}

export function AnimatedTitle({ children, className = '', gradient = true, delay = 0 }: AnimatedTitleProps) {
  const words = typeof children === 'string' ? children.split(' ') : [children];
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={`inline-block ${gradient ? 'bg-gradient-to-r from-[#FF385C] to-[#E31C5F] bg-clip-text text-transparent' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          {word}{index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </div>
  );
}

export function AnimatedPageTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-gray-900 mb-4">
          <AnimatedTitle gradient={true}>{children}</AnimatedTitle>
        </h1>
      </motion.div>
      
      {subtitle && (
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
