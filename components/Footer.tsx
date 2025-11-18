import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const footerLinks = {
    Services: [
      { label: 'SEO Optimization', href: '#services' },
      { label: 'Content Marketing', href: '#services' },
      { label: 'Social Media', href: '#services' },
      { label: 'SEM & PPC', href: '#services' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Case Studies', href: '#work' },
      { label: 'Our Process', href: '#process' },
      { label: 'Pricing', href: '#pricing' },
    ],
    Resources: [
      { label: 'Blog', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  const contactInfo = [
    { icon: Mail, text: 'hello@sitecrafted.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: 'San Francisco, CA 94103' },
  ];

  return (
    <footer className="footer bg-[var(--color-neutral-dark)] text-white pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Logo className="h-12 mb-6 brightness-0 invert" />
              <p className="text-white/70 mb-6 leading-relaxed">
                Your vision, crafted to perfection. We transform businesses through data-driven
                digital marketing strategies that deliver measurable results.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-brand-primary)] transition-colors duration-150"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="mb-4" style={{ fontWeight: 600 }}>
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[var(--color-brand-accent)] transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <motion.div
          className="border-t border-white/10 pt-8 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)]/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[var(--color-brand-accent)]" />
                  </div>
                  <span className="text-white/70">{info.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} SiteCrafted. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-[var(--color-brand-accent)] transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/60 hover:text-[var(--color-brand-accent)] transition-colors">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-[var(--color-brand-accent)] transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}