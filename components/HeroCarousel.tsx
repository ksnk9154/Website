// src/components/HeroCarousel.tsx
// import React from 'react';
import { motion } from 'framer-motion';

type Service = { title: string; color: string } | string;

interface HeroCarouselProps {
  services?: Service[];
  itemMinWidth?: number;
  duration?: number;
}

export default function HeroCarousel({
  services = [],
  itemMinWidth = 220,
  duration = 15,
}: HeroCarouselProps) {
  const loopItems = [...services, ...services];

  return (
    <section className="hero__carousel relative" aria-hidden="false">
      <div className="carousel-viewport">
        <motion.div
          className="carousel-track"
          initial={{ x: '0%' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ willChange: 'transform', whiteSpace: 'nowrap' }}
        >
          {loopItems.map((service, i) => {
            const label = typeof service === 'string' ? service : service.title ?? '';
            return (
              <div
                key={i}
                className="carousel-item"
                style={{ minWidth: `${itemMinWidth}px` }}
                role="presentation"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: typeof service === 'string' ? '#2d7176' : service.color }}
                    aria-hidden
                  />
                  <span className="text-white">{label}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
