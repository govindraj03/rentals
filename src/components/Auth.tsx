import { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthProps {
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function Auth({ onClose, initialMode = 'signin' }: AuthProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication
    console.log('Auth submitted:', { mode, email, password });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">{mode === 'signin' ? 'Log in' : 'Sign up'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-gray-900 mb-6">Welcome to Eazypg</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 mb-2">First name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'signin' && (
              <div className="text-right">
                <button type="button" className="text-sm text-gray-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <div className="text-sm text-gray-600">
                By selecting <span className="text-gray-900">Agree and continue</span>, I agree to Eazypg&apos;s{' '}
                <button type="button" className="text-[#FF385C] hover:underline">
                  Terms of Service
                </button>
                ,{' '}
                <button type="button" className="text-[#FF385C] hover:underline">
                  Payments Terms of Service
                </button>
                , and{' '}
                <button type="button" className="text-[#FF385C] hover:underline">
                  Nondiscrimination Policy
                </button>
                .
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
            >
              {mode === 'signin' ? 'Log in' : 'Agree and continue'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <SocialButton icon="🌐" label="Continue with Google" />
            <SocialButton icon="📱" label="Continue with Apple" />
            <SocialButton icon="📧" label="Continue with Facebook" />
          </div>

          {/* Toggle Mode */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-gray-900 hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SocialButton({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
    </motion.button>
  );
}
