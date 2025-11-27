import { motion } from 'motion/react';
import { Home } from 'lucide-react';

interface EazypgLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

export function EazypgLogo({ size = 'md', showText = true, onClick }: EazypgLogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-base' },
    md: { icon: 'w-8 h-8', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl' }
  };

  const currentSize = sizes[size];

  return (
    <motion.div 
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated Icon */}
      <motion.div
        className="relative"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {/* Gradient Background Circle */}
        <motion.div
          className={`${currentSize.icon} rounded-xl bg-gradient-to-br from-[#FF385C] via-[#FF5A7A] to-[#E31C5F] flex items-center justify-center shadow-lg`}
          whileHover={{ boxShadow: '0 20px 40px rgba(255, 56, 92, 0.3)' }}
          transition={{ duration: 0.3 }}
        >
          <Home className="w-1/2 h-1/2 text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Animated Ring */}
        <motion.div
          className={`absolute inset-0 rounded-xl border-2 border-[#FF385C]`}
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.div>

      {/* Animated Text */}
      {showText && (
        <div className="flex items-baseline gap-0.5">
          <motion.span
            className={`${currentSize.text} font-bold bg-gradient-to-r from-[#FF385C] to-[#E31C5F] bg-clip-text text-transparent`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            eazy
          </motion.span>
          <motion.span
            className={`${currentSize.text} font-bold bg-gradient-to-r from-[#E31C5F] to-[#FF385C] bg-clip-text text-transparent`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            pg
          </motion.span>
          
          {/* Animated Dot */}
          <motion.div
            className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF385C] to-[#E31C5F] rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
