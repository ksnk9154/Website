import { motion } from 'motion/react';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$2,500',
    period: '/month',
    description: 'Perfect for growing businesses ready to establish their digital presence',
    features: [
      'SEO Foundation & Audit',
      'Content Strategy (4 posts/month)',
      'Social Media Management (2 platforms)',
      'Monthly Analytics Report',
      'Email Support',
    ],
    recommended: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$5,500',
    period: '/month',
    description: 'Comprehensive marketing for businesses scaling rapidly',
    features: [
      'Advanced SEO + Technical Optimization',
      'Content Marketing (12 posts/month)',
      'Social Media (4 platforms + ads)',
      'PPC Campaign Management ($5K ad spend)',
      'Weekly Strategy Calls',
      'Priority Support + Slack Access',
      'Conversion Rate Optimization',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for established brands seeking market dominance',
    features: [
      'Full-Service Digital Strategy',
      'Unlimited Content Production',
      'Omnichannel Campaign Management',
      'Advanced Analytics & BI',
      'Dedicated Account Team',
      '24/7 Priority Support',
      'Custom Integrations & Tools',
      'Quarterly Executive Reviews',
    ],
    recommended: false,
  },
];

export function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 0.9, 0.32, 1],
      },
    },
  };

  return (
    <section id="pricing" className="py-24 bg-[var(--color-neutral-light)]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[var(--color-neutral-dark)] mb-4" style={{ fontWeight: 700 }}>
            Transparent Pricing
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)]/70 max-w-2xl mx-auto">
            Investment plans designed to deliver exceptional ROI at every stage of your journey
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`pricing-card pricing-card--${plan.id} relative bg-white rounded-2xl p-8 ${
                plan.recommended ? 'shadow-2xl ring-2 ring-[var(--color-brand-primary)]' : 'shadow-lg'
              }`}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: plan.recommended
                  ? '0 30px 60px rgba(45, 113, 118, 0.2)'
                  : '0 20px 40px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.15 },
              }}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[var(--color-brand-primary)] text-white px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
                    <Zap size={16} />
                    <span className="text-sm" style={{ fontWeight: 600 }}>Recommended</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl mb-2 text-[var(--color-neutral-dark)]" style={{ fontWeight: 700 }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--color-neutral-dark)]/60 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl text-[var(--color-neutral-dark)]" style={{ fontWeight: 700 }}>
                    {plan.price}
                  </span>
                  <span className="text-lg text-[var(--color-neutral-dark)]/60">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-[var(--color-success)]" />
                    </div>
                    <span className="text-[var(--color-neutral-dark)]/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                className={`w-full py-4 rounded-lg transition-all duration-150 ${
                  plan.recommended
                    ? 'bg-[var(--color-brand-primary)] text-white shadow-lg hover:bg-[var(--color-brand-accent)]'
                    : 'bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] hover:bg-[var(--color-brand-primary)] hover:text-white'
                }`}
                style={{ fontWeight: 600 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-12 text-[var(--color-neutral-dark)]/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          All plans include a 30-day money-back guarantee. No long-term contracts required.
        </motion.p>
      </div>
    </section>
  );
}
