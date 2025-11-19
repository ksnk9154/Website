// src/components/HeroCarousel.tsx
// import React from 'react';
import { motion } from 'framer-motion';

interface HeroCarouselProps {
  services?: string[];
  itemMinWidth?: number;
  duration?: number;
}

export default function HeroCarousel({
  services = [],
  itemMinWidth = 200,
  duration = 15,
}: HeroCarouselProps) {
  const loopItems = [...services, ...services];
  const colors = ['rgb(45, 113, 118)', 'rgb(77, 169, 176)', 'rgb(58, 61, 63)'];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-4"
        initial={{ x: '0%' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ willChange: 'transform', whiteSpace: 'nowrap' }}
      >
        {loopItems.map((service, i) => (
          <div
            key={i}
            className="carousel-item shrink-0 px-6 py-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
            style={{ minWidth: `${itemMinWidth}px` }}
            role="presentation"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
                aria-hidden
              />
              <span className="text-white">{service}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
