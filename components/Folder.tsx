// src/components/Folder.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export type FolderItem = {
  id: string;
  title: string;
  thumbnail?: React.ReactNode;
  content?: React.ReactNode;
  color?: string;
};

type Props = {
  color?: string;
  size?: number;
  items?: FolderItem[];
  onPaperClick?: (item: FolderItem) => void;
  registerThumbnail?: (id: string, el: HTMLButtonElement | null) => void; // NEW: register thumbnail refs
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const darkenColor = (hex: string, percent = 0.08) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export default function Folder({
  color = '#FF8C00',
  size = 1.05,
  items = [],
  onPaperClick,
  registerThumbnail,
  className = '',
  open: externalOpen,
  onOpenChange,
}: Props) {
  const folderBack = darkenColor(color, 0.08);
    const [internalOpen, setInternalOpen] = React.useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;

  // Improved setOpen: if parent gave onOpenChange, forward the same updater
  // (either a boolean or an updater function). This keeps controlled usage
  // consistent with React's setState API and avoids stale-value bugs.
  const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    if (onOpenChange) {
      // If value is a function, forward it directly so parent can use it as an updater.
      // Otherwise forward the boolean.
      onOpenChange(value as any);
    } else {
      // Local uncontrolled mode: apply the value/updater to internal state.
      if (typeof value === 'function') {
        setInternalOpen((prev) => (value as (prev: boolean) => boolean)(prev));
      } else {
        setInternalOpen(value);
      }
    }
  };

  // compute horizontal line positions for up to 4 items
  const computeHorizontal = (n: number, spacing = 140) => {
    const results: { x: number; y: number }[] = [];
    const startX = -(n - 1) * spacing / 2;
    for (let i = 0; i < n; i++) {
      results.push({ x: startX + i * spacing, y: 0 });
    }
    return results;
  };

  const visibleItems = items.slice(0, 4);
  const positions = computeHorizontal(visibleItems.length, 140);

  // refs map to store each thumbnail element locally, and call registerThumbnail when it mounts.
  const localRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    // when Folder mounts/unmounts, inform parent of refs (null on unmount)
    visibleItems.forEach((it) => {
      registerThumbnail && registerThumbnail(it.id, localRefs.current[it.id] ?? null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: 260, height: 220 }}>
      <motion.button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-label={open ? 'Close folder' : 'Open folder'}
        initial={false}
        animate={open ? { y: -8, scale: 0.96 } : { y: 0, scale: size }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        style={{ zIndex: 40 }}
        className="focus:outline-none"
      >
        <div style={{ position: 'relative', width: 260, height: 160 }}>
          <div
            style={{
              width: 260,
              height: 160,
              backgroundColor: folderBack,
              borderRadius: 18,
              boxShadow: '0 18px 40px rgba(11,15,20,0.08)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: -10,
              left: 92,
              width: 60,
              height: 20,
              borderRadius: 6,
              backgroundColor: folderBack,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 260,
              height: 160,
              borderRadius: 18,
              backgroundColor: color,
              transformOrigin: 'bottom center',
              transform: open ? 'skew(8deg) scaleY(0.86)' : 'none',
            }}
          />
        </div>
      </motion.button>

      {open &&
        visibleItems.map((it, i) => {
          const pos = positions[i];
          const buttonRef = (el: HTMLButtonElement | null) => {
            localRefs.current[it.id] = el;
            registerThumbnail && registerThumbnail(it.id, el);
          };

          return (
            <motion.button
              key={it.id}
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation();
                onPaperClick && onPaperClick(it);
              }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, x: pos.x, y: pos.y, rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.06 }}
              whileHover={{ scale: 1.04, translateY: -6 }}
              whileTap={{ scale: 0.98 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 120,
                height: 72,
                zIndex: 50 + i,
                background: '#fff',
                borderRadius: 10,
                boxShadow: '0 10px 24px rgba(11,15,20,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 8,
              }}
              aria-label={it.title}
              title={it.title}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.03)' }}>
                  {it.thumbnail ?? <div style={{ width: 8, height: 8, background: '#ddd', borderRadius: 4 }} />}
                </div>
                <div style={{ fontSize: 13, color: '#1f2937', fontWeight: 600 }}>{it.title}</div>
              </div>
            </motion.button>
          );
        })}
    </div>
  );
}
