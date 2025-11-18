import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Growth',
    client: 'RetailCo',
    image: 'https://images.unsplash.com/photo-1542744094-f77e9f7a10b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MzIzMDI3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    stats: [
      { icon: TrendingUp, value: '+245%', label: 'Revenue' },
      { icon: Users, value: '2.3M', label: 'Reach' },
    ],
    category: 'SEO + Content',
  },
  {
    id: 2,
    title: 'Social Media Transformation',
    client: 'TechStart',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnR8ZW58MXx8fHwxNzYzMTk5MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stats: [
      { icon: Users, value: '450K', label: 'Followers' },
      { icon: TrendingUp, value: '+180%', label: 'Engagement' },
    ],
    category: 'Social Media',
  },
  {
    id: 3,
    title: 'PPC Campaign Success',
    client: 'FinanceHub',
    image: 'https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNoYXJ0cyUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjMyNTY4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    stats: [
      { icon: DollarSign, value: '12.5x', label: 'ROI' },
      { icon: TrendingUp, value: '-65%', label: 'CPA' },
    ],
    category: 'SEM & PPC',
  },
  {
    id: 4,
    title: 'Brand Authority Building',
    client: 'ConsultPro',
    image: 'https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2MzI5NTExM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    stats: [
      { icon: TrendingUp, value: '+320%', label: 'Traffic' },
      { icon: Users, value: '95%', label: 'Quality Score' },
    ],
    category: 'Content',
  },
  {
    id: 5,
    title: 'Local SEO Domination',
    client: 'ServiceLocal',
    image: 'https://images.unsplash.com/photo-1712331669095-c845e0b4cacf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW8lMjBtYXJrZXRpbmclMjBjb25jZXB0fGVufDF8fHx8MTc2MzI5NzA2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    stats: [
      { icon: TrendingUp, value: '#1', label: 'Rankings' },
      { icon: Users, value: '+410%', label: 'Leads' },
    ],
    category: 'SEO',
  },
  {
    id: 6,
    title: 'Multi-Channel Excellence',
    client: 'GlobalBrand',
    image: 'https://images.unsplash.com/photo-1646038572891-86b08ccd6719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwd2F2ZXN8ZW58MXx8fHwxNzYzMjY3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stats: [
      { icon: DollarSign, value: '$2.8M', label: 'Revenue' },
      { icon: TrendingUp, value: '+290%', label: 'Growth' },
    ],
    category: 'Full Service',
  },
];

export function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="work" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[var(--color-neutral-dark)] mb-4" style={{ fontWeight: 700 }}>
            Case Studies
          </h2>
          <p className="text-xl text-[var(--color-neutral-dark)]/70 max-w-2xl mx-auto">
            Real results from real partnerships. See how we've helped businesses achieve extraordinary growth.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              className="case-study group relative bg-[var(--color-neutral-light)] rounded-2xl overflow-hidden cursor-pointer"
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.15 },
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                  <span className="text-sm text-[var(--color-brand-primary)]" style={{ fontWeight: 600 }}>
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl mb-2 text-[var(--color-neutral-dark)]" style={{ fontWeight: 600 }}>
                  {study.title}
                </h3>
                <p className="text-sm text-[var(--color-neutral-dark)]/60 mb-4">
                  Client: {study.client}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {study.stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="kpi-badge flex items-center gap-2 p-3 bg-white rounded-lg">
                        <Icon size={20} className="text-[var(--color-brand-primary)]" />
                        <div>
                          <div className="text-lg text-[var(--color-neutral-dark)]" style={{ fontWeight: 700 }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-[var(--color-neutral-dark)]/60">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
