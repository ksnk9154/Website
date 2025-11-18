// src/components/Services.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Search, FileText, Share2, MousePointerClick, LucideIcon } from 'lucide-react';
import Folder, { FolderItem } from './Folder';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const SERVICES: Service[] = [
  { id: 'seo', title: 'SEO Optimization', description: 'Dominate search rankings with our advanced SEO strategies. We optimize technical and on-page aspects for growth.', icon: Search, color: '#2D7176' },
  { id: 'content', title: 'Content Marketing', description: 'Engaging content that converts. We craft narratives that build trust and lead generation.', icon: FileText, color: '#4DA9B0' },
  { id: 'social', title: 'Social Media', description: 'Strategic social campaigns that amplify your brand voice and grow your community.', icon: Share2, color: '#3A3D3F' },
  { id: 'sem', title: 'SEM & PPC', description: 'Data-driven paid campaigns focused on ROI and qualified leads.', icon: MousePointerClick, color: '#2D7176' },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(inViewRef, { once: true, margin: '-120px' });

  // store refs to thumbnails (from Folder)
  const thumbnailRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const registerThumbnail = useCallback((id: string, el: HTMLButtonElement | null) => {
    thumbnailRefs.current[id] = el;
  }, []);

  // store refs to card elements in the grid
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const registerCard = (id: string, el: HTMLDivElement | null) => {
    cardRefs.current[id] = el;
  };

  // overlay flyer state: used to render the animating clone
  const [flyer, setFlyer] = useState<null | {
    id: string;
    thumbnailRect: DOMRect;
    targetRect: DOMRect;
    thumbnailHtml: React.ReactNode;
  }>(null);

  // which card is expanded in place (after animation)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Control the open state of the folder component.
  // When true, the folder displays cards side by side, and the grid below is hidden.
  const [folderOpen, setFolderOpen] = useState(false);

  // build folder items with thumbnails
  const folderItems: FolderItem[] = SERVICES.slice(0, 4).map((s) => ({
    id: s.id,
    title: s.title,
    thumbnail: <s.icon size={20} style={{ color: s.color }} />,
    content: (
      <div>
        <p className="mb-4">{s.description}</p>
        <h4 className="font-semibold mb-2">What we do</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>Custom strategy</li>
          <li>Implementation & tracking</li>
          <li>Reporting & iteration</li>
        </ul>
      </div>
    ),
    color: s.color,
  }));

  // compute page scroll offsets to convert viewport rects to container-local coords
  const pageToContainer = (rect: DOMRect) => {
    const container = containerRef.current;
    if (!container) return rect;
    const containerRect = container.getBoundingClientRect();
    return {
      x: rect.left - containerRect.left,
      y: rect.top - containerRect.top,
      width: rect.width,
      height: rect.height,
    } as DOMRect;
  };

  // When a paper thumbnail is clicked, compute rects and create the flyer
  const handlePaperClick = (item: FolderItem) => {
    const thumbEl = thumbnailRefs.current[item.id];
    const cardEl = cardRefs.current[item.id];
    const containerEl = containerRef.current;

    if (!containerEl || !thumbEl) {
      // no geometry available — just expand immediately
      setExpandedId(item.id);
      return;
    }

    const thumbRect = thumbEl.getBoundingClientRect();

    // If the grid/card is mounted, use its rect. Otherwise synthesize a target rect centered under the folder
    let targetRect: DOMRect;
    if (cardEl) {
      targetRect = cardEl.getBoundingClientRect();
    } else {
      // synthetic rect: centered under the folder in the container
      const cRect = containerEl.getBoundingClientRect();
      const targetWidth = Math.min(420, cRect.width * 0.6);
      const targetHeight = 220;
      const left = cRect.left + cRect.width / 2 - targetWidth / 2;
      const top = cRect.top + 120; // ~space below folder
      // DOMRect constructor is available in browsers
      targetRect = new DOMRect(left, top, targetWidth, targetHeight);
    }

    setFlyer({
      id: item.id,
      thumbnailRect: thumbRect,
      targetRect,
      thumbnailHtml: (
        // small representation to paint inside flyer while animating
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.03)' }}>
            {item.thumbnail ?? null}
          </div>
          <div style={{ fontSize: 13, color: '#1f2937', fontWeight: 600 }}>{item.title}</div>
        </div>
      ),
    });
  };

  // Flyer component: animates an overlay from thumbnail -> target
  function FlyerOverlay({ fly }: { fly: NonNullable<typeof flyer> }) {
    // map DOM rects to container-local coordinates (containerRef is positioned relative)
    const from = pageToContainer(fly.thumbnailRect);
    const to = pageToContainer(fly.targetRect);

    // initial style positioned at 'from'
    const initialStyles = {
      left: from.x,
      top: from.y,
      width: from.width,
      height: from.height,
    };

    // final style at 'to'
    const finalStyles = {
      left: to.x,
      top: to.y,
      width: to.width,
      height: to.height,
    };

    // small lift mid-point to make motion appear curved
    const midPos = {
      left: (from.x + to.x) / 2,
      top: Math.min(from.y, to.y) - 80, // lift above both
      width: (from.width + to.width) / 2,
      height: (from.height + to.height) / 2,
    };

    return (
      <motion.div
        initial={{
          position: 'absolute',
          zIndex: 80,
          left: initialStyles.left,
          top: initialStyles.top,
          width: initialStyles.width,
          height: initialStyles.height,
          borderRadius: 8,
          background: '#fff',
          boxShadow: '0 18px 40px rgba(11,15,20,0.12)',
          opacity: 1,
        }}
        animate={{
          left: [initialStyles.left, midPos.left, finalStyles.left],
          top: [initialStyles.top, midPos.top, finalStyles.top],
          width: [initialStyles.width, midPos.width, finalStyles.width],
          height: [initialStyles.height, midPos.height, finalStyles.height],
          borderRadius: ['10px', '14px', '14px'],
          opacity: [1, 1, 1],
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          // mark the target card as expanded in place
          setExpandedId(fly.id);
          // close the folder to show the grid with expanded card
          setFolderOpen(false);
          // remove flyer after small delay so replacement is visible
          setTimeout(() => setFlyer(null), 40);
        }}
        style={{ pointerEvents: 'none' }}
      >
        {/* render the thumbnailHtml centered inside */}
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {fly.thumbnailHtml}
        </div>
      </motion.div>
    );
  }

  // When expandedId changes (user clicks card again?), you might want to collapse; here clicking expanded card will collapse it.
  const handleCardClick = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  // container is relative to position flyer overlay
  return (
    <section id="services" className="py-24 bg-[var(--color-neutral-light)]">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="text-center mb-6" ref={inViewRef}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-neutral-dark)] mb-2">Our Services</h2>
          <p className="text-xl text-[var(--color-neutral-dark)]/70 max-w-2xl mx-auto">Comprehensive digital marketing solutions tailored to your unique business goals</p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto" style={{ minHeight: 360 }}>
          {/* Folder component that overlaps the grid.
             When opened, it displays service cards side by side horizontally.
             The grid below is removed while folder is open. */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: expandedId ? -70 : -28, zIndex: 40 }}>
            <Folder
              items={folderItems}
              onPaperClick={handlePaperClick}
              registerThumbnail={registerThumbnail}
              color="#FF8C00"
              size={folderOpen ? 1.8 : 0.7}
              open={folderOpen}
              onOpenChange={setFolderOpen}
            />
          </div>

          {/* Grid of service cards underneath the folder.
              Only visible when a card is expanded and folder is closed. */}
          {expandedId && !folderOpen && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-24"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
              }}
              style={{ zIndex: 10 }}
            >
              {SERVICES.map((svc) => {
                const Icon = svc.icon;
                const isExpanded = expandedId === svc.id;
                return (
                  <motion.div
                    key={svc.id}
                    ref={(el) => registerCard(svc.id, el)}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl cursor-pointer transition-all ${isExpanded ? 'col-span-1 lg:col-span-1' : ''}`}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
                    }}
                    onClick={() => handleCardClick(svc.id)}
                    whileHover={{ translateY: -6, scale: 1.02 }}
                  >
                    {/* if this card is expanded, render the full expanded content */}
                    {!isExpanded ? (
                      <>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${svc.color}15` }}>
                            <Icon size={22} style={{ color: svc.color }} />
                          </div>
                          <h3 className="text-lg font-semibold">{svc.title}</h3>
                        </div>
                        <p className="text-sm text-[var(--color-neutral-dark)]/75">{svc.description}</p>
                      </>
                    ) : (
                      // expanded content (replaces card)
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${svc.color}15` }}>
                              <Icon size={22} style={{ color: svc.color }} />
                            </div>
                            <h3 className="text-2xl font-semibold">{svc.title}</h3>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedId(null);
                            }}
                            className="text-neutral-500 hover:text-neutral-800"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="prose max-w-none">
                          <p className="text-lg mb-4">{svc.description}</p>
                          <h4 className="font-semibold mb-2">What we do</h4>
                          <ul className="list-disc ml-6 mb-4">
                            <li>Custom strategy tailored to your business</li>
                            <li>Implementation & tracking</li>
                            <li>Reporting & continuous improvements</li>
                          </ul>
                          <button className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white">Contact us about {svc.title}</button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Flyer overlay — renders on top of everything inside container */}
          {flyer && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 90 }}>
              <FlyerOverlay fly={flyer} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
