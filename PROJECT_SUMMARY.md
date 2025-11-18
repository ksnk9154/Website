# SiteCrafted Digital Marketing Agency Website

## Project Overview

A modern, conversion-focused single-page website for a digital marketing agency featuring advanced parallax scrolling, performant micro-interactions, and comprehensive motion specifications for GSAP and Framer Motion implementation.

## 🎨 Design System

### Color Palette (Extracted from Logo)
- **Primary**: `#2D7176` - Teal (CTAs, links, accents)
- **Secondary**: `#3A3D3F` - Dark Gray (text, secondary elements)
- **Accent**: `#4DA9B0` - Light Teal (hover states, highlights)
- **Neutral Dark**: `#1A1D1F` - Almost Black (body text)
- **Neutral Light**: `#F5F7F9` - Off White (backgrounds)
- **Success**: `#10B981` - Green (success states)

### Typography
- **Font Family**: Inter (primary) / Space Grotesk (alternative)
- **H1**: 4rem (64px) / 700
- **H2**: 3rem (48px) / 700
- **H3**: 2rem (32px) / 600
- **H4**: 1.5rem (24px) / 600
- **Body**: 1rem (16px) / 400
- **Small**: 0.875rem (14px) / 400

## 📐 Layout Structure

### Sections (in order)
1. **Header** - Sticky navigation with shrink animation
2. **Hero** - Full-bleed with gradient, CTAs, and service carousel
3. **Services** - 4 feature cards with hover animations
4. **Case Studies** - 6-item masonry grid with stats
5. **Process** - 3-step horizontal timeline
6. **Pricing** - 3 pricing tiers
7. **Testimonials** - Swipeable carousel
8. **Contact Form** - Full validation with GDPR checkbox
9. **Motion Spec** - Developer documentation (dark theme)
10. **Design System** - Complete design tokens and components
11. **Footer** - Links, social, contact info

## 🎭 Motion Specifications

### Parallax Layers
```javascript
// Three-layer system with distinct depth
parallax-bg:  translateY = scrollY * 0.05
parallax-mid: translateY = scrollY * 0.12
parallax-fg:  translateY = scrollY * 0.25
```

### Hero Pin & Scrub
```javascript
// GSAP ScrollTrigger
gsap.to('.hero-bg', {
  scale: 1.06,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: '+=650',
    pin: true,
    scrub: 0.6
  }
});
```

### Card Reveals
```javascript
// Framer Motion staggered entrance
variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}
// Stagger: 0.12s between cards
```

### Hover Micro-Interactions
- **Scale**: 1 → 1.03
- **TranslateY**: 0 → -6px
- **Shadow**: Increase elevation
- **Duration**: 150ms
- **Easing**: cubic-bezier(0.22, 0.9, 0.32, 1)

## 🧩 Component Architecture

### Custom Components
- `Header.tsx` - Sticky nav with mobile menu
- `Hero.tsx` - Parallax hero with auto-scrolling carousel
- `Services.tsx` - 4 service cards with icon animations
- `CaseStudies.tsx` - Masonry grid with KPI badges
- `Process.tsx` - Animated timeline
- `Pricing.tsx` - 3-tier pricing with recommended badge
- `Testimonials.tsx` - Carousel with swipe support
- `ContactForm.tsx` - Validated form with success state
- `Footer.tsx` - Multi-column footer
- `MotionSpec.tsx` - Complete motion documentation
- `DesignSystem.tsx` - Design tokens showcase
- `ScrollToTop.tsx` - Floating scroll button

### BEM Naming Convention
```css
.hero__headline
.hero__cta--primary
.service-card--seo
.pricing-card--growth
.process-step
.kpi-badge
.timeline-line
```

## 🚀 Key Features

### Conversion Optimization
- ✅ Primary CTA in hero (above the fold)
- ✅ Sticky header (always accessible)
- ✅ Contact form with demo booking option
- ✅ Multiple CTAs throughout journey
- ✅ Social proof (testimonials + client logos)
- ✅ Clear pricing transparency

### Performance
- ✅ Throttled scroll listeners with RAF
- ✅ CSS-based animations where possible
- ✅ Lazy loading for images
- ✅ Optimized parallax calculations
- ✅ Passive event listeners

### Accessibility
- ✅ WCAG AA contrast ratios (4.5:1+)
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Reduced motion support
- ✅ Focus states on all interactive elements

### Responsiveness
- ✅ Mobile: 375px
- ✅ Tablet: 768px
- ✅ Desktop: 1024px+
- ✅ All sections fully responsive
- ✅ Mobile-optimized navigation
- ✅ Touch-friendly interactions

## 📦 Asset Export Settings

### SVG (Icons/Logo)
- Format: SVG, SVGO optimized
- ViewBox: Preserved
- Colors: currentColor for theming
- Naming: kebab-case

### Raster Images
- Format: WebP with PNG fallback
- Export: 1x, 2x, 3x for retina
- Compression: 80% quality
- Naming: image-name@2x.png

## 🛠️ Developer Handoff

### CSS Variables (in globals.css)
```css
--color-brand-primary: #2D7176;
--color-brand-accent: #4DA9B0;
--text-h1: 4rem;
/* etc. */
```

### Tailwind Mapping
```jsx
bg-[var(--color-brand-primary)]
text-[var(--color-brand-accent)]
```

### Animation Libraries
- **Implemented**: Framer Motion (motion/react)
- **Specs Provided For**: GSAP + ScrollTrigger
- **Both frameworks** have complete code examples in MotionSpec component

## 📝 Services Offered

1. **SEO Optimization** - Search rankings and organic traffic
2. **Content Marketing** - Engaging content that converts
3. **Social Media** - Multi-platform community building
4. **SEM & PPC** - Paid advertising with ROI focus

## 🎯 Success Metrics Display

Case studies include KPI badges showing:
- Revenue increases
- Traffic growth
- Engagement rates
- ROI multiples
- Lead generation
- Follower counts

## 📱 Interactive Elements

- Smooth scroll navigation
- Swipeable testimonial carousel
- Form validation with error states
- Hover animations on all interactive elements
- Auto-scrolling service preview
- Mobile hamburger menu with slide animation
- Scroll-to-top button (appears after 500px scroll)

## 🎨 Implementation Notes

1. All animations respect `prefers-reduced-motion`
2. Logo uses imported asset from Figma
3. Images use Unsplash with fallback component
4. Form is frontend-only (ready for backend integration)
5. Complete motion specs in separate section for engineers
6. Design system fully documented for consistency

---

**Built with**: React, TypeScript, Tailwind CSS, Framer Motion
**Ready for**: Production deployment and GSAP migration
**Handoff includes**: Complete motion specs, design tokens, component library
