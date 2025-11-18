import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, User, Building, MessageSquare } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
    gdpr: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.interest) newErrors.interest = 'Please select an interest';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.gdpr) newErrors.gdpr = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          interest: '',
          message: '',
          gdpr: false,
        });
      }, 500);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-[var(--color-neutral-light)]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[var(--color-neutral-dark)] mb-4" style={{ fontWeight: 700 }}>
            Let's Start Something Great
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)]/70 max-w-2xl mx-auto">
            Ready to transform your digital presence? Get in touch and let's discuss your goals.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="contact-form bg-white rounded-2xl p-8 md:p-12 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block mb-2 text-[var(--color-neutral-dark)]">
                      <User size={16} className="inline mr-2" />
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-150 ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--color-neutral-light)] focus:border-[var(--color-brand-primary)]'
                      } outline-none`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-[var(--color-neutral-dark)]">
                      <Mail size={16} className="inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-150 ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--color-neutral-light)] focus:border-[var(--color-brand-primary)]'
                      } outline-none`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block mb-2 text-[var(--color-neutral-dark)]">
                      <Building size={16} className="inline mr-2" />
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-150 ${
                        errors.company
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--color-neutral-light)] focus:border-[var(--color-brand-primary)]'
                      } outline-none`}
                      placeholder="Your Company"
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                    )}
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="interest" className="block mb-2 text-[var(--color-neutral-dark)]">
                      I'm interested in *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-150 ${
                        errors.interest
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[var(--color-neutral-light)] focus:border-[var(--color-brand-primary)]'
                      } outline-none bg-white`}
                    >
                      <option value="">Select a service</option>
                      <option value="seo">SEO Optimization</option>
                      <option value="content">Content Marketing</option>
                      <option value="social">Social Media</option>
                      <option value="sem">SEM & PPC</option>
                      <option value="full">Full Service</option>
                    </select>
                    {errors.interest && (
                      <p className="mt-1 text-sm text-red-500">{errors.interest}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-[var(--color-neutral-dark)]">
                    <MessageSquare size={16} className="inline mr-2" />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-150 resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[var(--color-neutral-light)] focus:border-[var(--color-brand-primary)]'
                    } outline-none`}
                    placeholder="Tell us about your project and goals..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* GDPR Checkbox */}
                <div className="mb-8">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="gdpr"
                      checked={formData.gdpr}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-2 border-[var(--color-neutral-light)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
                    />
                    <span className="text-sm text-[var(--color-neutral-dark)]/70">
                      I agree to the privacy policy and consent to SiteCrafted storing my information
                      for the purpose of responding to my inquiry. *
                    </span>
                  </label>
                  {errors.gdpr && (
                    <p className="mt-1 text-sm text-red-500 ml-8">{errors.gdpr}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full btn-primary px-8 py-4 bg-[var(--color-brand-primary)] text-white rounded-lg inline-flex items-center justify-center gap-2 shadow-lg hover:bg-[var(--color-brand-accent)] transition-colors duration-150"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <Send size={20} />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                className="success-message bg-white rounded-2xl p-12 shadow-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 size={64} className="text-[var(--color-success)] mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl mb-4 text-[var(--color-neutral-dark)]" style={{ fontWeight: 700 }}>
                  Thank You!
                </h3>
                <p className="text-xl text-[var(--color-neutral-dark)]/70 mb-8">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-outline px-6 py-3 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] rounded-lg hover:bg-[var(--color-brand-primary)] hover:text-white transition-all duration-150"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}