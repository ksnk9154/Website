import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Lightbulb, LineChart, Rocket } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Lightbulb,
    title: 'Strategy & Planning',
    description: 'Deep-dive analysis of your market, competitors, and audience. We create a data-backed roadmap tailored to your unique goals.',
    color: '#2D7176',
  },
  {
    id: 2,
    icon: LineChart,
    title: 'Execute & Optimize',
    description: 'Launch campaigns with precision. Continuous A/B testing and optimization ensure maximum performance and ROI.',
    color: '#4DA9B0',
  },
  {
    id: 3,
    icon: Rocket,
    title: 'Scale & Grow',
    description: 'Leverage proven strategies to scale your success. Systematic growth that compounds over time with predictable results.',
    color: '#3A3D3F',
  },
];

export function Process() {
  const containerRef = useRef(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[var(--color-neutral-dark)] mb-4" style={{ fontWeight: 700 }}>
            Our Process
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)]/70 max-w-2xl mx-auto">
            A proven methodology that transforms vision into measurable success
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            {/* Timeline connector line */}
            <div className="absolute top-24 left-0 right-0 h-1 bg-[var(--color-neutral-light)]">
              <motion.div
                ref={lineRef}
                className="timeline-line h-full bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-accent)] to-[var(--color-brand-secondary)]"
                style={{ width: lineWidth }}
              />
            </div>

            <div className="grid grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className="process-step relative text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2,
                      ease: [0.22, 0.9, 0.32, 1],
                    }}
                  >
                    {/* Step number & icon */}
                    <motion.div
                      className="relative inline-block mb-8"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-xl relative z-10"
                        style={{ border: `4px solid ${step.color}` }}
                      >
                        <Icon size={36} style={{ color: step.color }} />
                      </div>
                      <div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm z-20"
                        style={{ backgroundColor: step.color, fontWeight: 700 }}
                      >
                        {step.id}
                      </div>
                    </motion.div>

                    <h3 className="text-2xl mb-4 text-[var(--color-neutral-dark)]" style={{ fontWeight: 600 }}>
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-neutral-dark)]/70 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="process-step flex gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-lg"
                        style={{ border: `3px solid ${step.color}` }}
                      >
                        <Icon size={28} style={{ color: step.color }} />
                      </div>
                      <div
                        className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: step.color, fontWeight: 700 }}
                      >
                        {step.id}
                      </div>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div
                        className="w-1 flex-1 mt-4"
                        style={{ background: `linear-gradient(to bottom, ${step.color}, ${steps[index + 1].color})` }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl mb-3 text-[var(--color-neutral-dark)]" style={{ fontWeight: 600 }}>
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-neutral-dark)]/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
