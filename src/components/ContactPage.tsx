import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PageHeader } from './PageHeader';

interface ContactPageProps {
  onBack: () => void;
  onAuthOpen?: (mode: 'signin' | 'signup') => void;
}

export function ContactPage({ onBack, onAuthOpen }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader onBack={onBack} onAuthOpen={onAuthOpen} title="Contact Us" />
      
      <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-gray-900 mb-4">Get in touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question or need assistance? We're here to help. Reach out to our support team.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <ContactInfoItem
                  icon={Phone}
                  title="Phone"
                  content="+1 (855) 424-7262"
                  subtitle="Mon-Fri 9am-6pm EST"
                />
                <ContactInfoItem
                  icon={Mail}
                  title="Email"
                  content="support@eazypg.com"
                  subtitle="We'll respond within 24 hours"
                />
                <ContactInfoItem
                  icon={MapPin}
                  title="Address"
                  content="888 Brannan Street"
                  subtitle="San Francisco, CA 94103"
                />
                <ContactInfoItem
                  icon={Clock}
                  title="Business Hours"
                  content="Monday - Friday"
                  subtitle="9:00 AM - 6:00 PM EST"
                />
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 p-6 bg-white rounded-2xl border border-gray-200"
            >
              <h3 className="text-gray-900 mb-4">Quick Help</h3>
              <div className="space-y-3">
                <QuickLink icon={MessageCircle} label="Help Center" />
                <QuickLink icon={HeadphonesIcon} label="Live Chat Support" />
                <QuickLink icon={Mail} label="Email Support" />
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Support Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-gray-900 text-center mb-8">Popular Topics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SupportCard
              icon="🏠"
              title="Booking Issues"
              description="Help with reservations and bookings"
            />
            <SupportCard
              icon="💳"
              title="Payment & Refunds"
              description="Questions about payments"
            />
            <SupportCard
              icon="🏡"
              title="Hosting"
              description="Support for hosting your property"
            />
            <SupportCard
              icon="🛡️"
              title="Safety & Security"
              description="Report safety concerns"
            />
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon: Icon, title, content, subtitle }: {
  icon: any;
  title: string;
  content: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-[#FF385C]" />
      </div>
      <div>
        <h4 className="text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-700">{content}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function QuickLink({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-gray-700">{label}</span>
    </button>
  );
}

function SupportCard({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all text-left"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.button>
  );
}
