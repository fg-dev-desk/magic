# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Magic UI landing page project** featuring animated web components and magical UI effects. The project is a static HTML/CSS/JavaScript website for "hardcoded.space" - a digital presence service offering professional websites and online stores.

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS v4.1.13 with custom extensions
- **UI Framework**: Shadcn/UI design system patterns
- **Package Manager**: pnpm v10.17.0
- **Development Server**: Python HTTP server (built-in)
- **Animation Libraries**: Framer Motion (CDN), Custom CSS animations

### Architecture Overview

The project follows a **component-based static site architecture**:

1. **Core Files**:
   - `index.html` - Main landing page with embedded Tailwind config
   - `page.tsx` - React/TypeScript component version (alternative implementation)
   - `script.js` - Basic animation and interaction handlers
   - `enhanced-script.js` - Advanced Magic UI interactions and effects

2. **Styling System**:
   - `shadcn-styles.css` - Shadcn/UI design system with black/white theme
   - `styles.css` - Traditional CSS animations and base styles
   - `tailwind.config.js` - Extended Tailwind configuration with custom animations
   - Extensive custom keyframe animations (60+ unique animations)

3. **Animation Framework**:
   - Custom scroll-triggered animations with Intersection Observer
   - Particle systems and cursor trail effects
   - Marquee animations with pause/resume controls
   - Magnetic button effects and ripple interactions
   - Performance-optimized animations using requestAnimationFrame

## Common Development Commands

### Development Server
```bash
# Start development server on port 3000
pnpm run dev

# Alternative ports
pnpm run start      # Port 8080
pnpm run preview    # Port 5000
pnpm run serve      # Port 8000
```

### Build System
```bash
# Build and watch Tailwind CSS
pnpm run build-css

# Install dependencies
pnpm install

# Lint project (placeholder command)
pnpm run lint
```

### Testing
This project currently has no automated test suite. Testing is done manually through browser inspection and visual verification of animations.

## Animation System Architecture

The project implements a **layered animation architecture**:

### 1. CSS Layer (Performance Critical)
- Hardware-accelerated transforms and opacity changes
- Custom keyframes defined in `tailwind.config.js` (lines 76-177)
- Optimized for 60fps performance

### 2. JavaScript Interaction Layer
- **Scroll Animations**: Intersection Observer-based triggers
- **Cursor Effects**: Real-time mouse tracking with throttling
- **Particle Systems**: Canvas-based with click interactions
- **Form Enhancements**: Progressive enhancement for UX

### 3. Component System
Key animation components:
- **Marquee System**: Infinite scroll with hover controls
- **Magic Buttons**: Morphing and magnetic effects  
- **Card Animations**: Hover states with backdrop filters
- **Theme System**: Dynamic dark/light mode with localStorage

## Key Development Patterns

### Animation Performance
- Use `will-change: transform` for animated elements
- Prefer `transform` and `opacity` over layout-changing properties
- Implement `requestAnimationFrame` for smooth JavaScript animations
- Use CSS `animation-play-state` for pause/resume controls

### Responsive Design
- Mobile-first approach with Tailwind responsive classes
- Touch-friendly interactions in `enhanced-script.js`
- Reduced motion support through CSS media queries

### Theme Management
- CSS custom properties for consistent theming
- Dark mode implementation with `document.documentElement.classList`
- Random theme selection on first visit with localStorage persistence

## File Structure Insights

### HTML Files
- Multiple index variations suggest iteration/backup workflow
- Main `index.html` contains inline Tailwind configuration
- CDN dependencies for Tailwind and Framer Motion

### CSS Architecture
- `shadcn-styles.css`: Component-focused with HSL color system
- `styles.css`: Traditional CSS with gradient backgrounds
- Tailwind config extends with 75+ custom animations

### JavaScript Modules
- `script.js`: Basic interactions (200+ lines)
- `enhanced-script.js`: Advanced effects (200+ lines)
- Modular initialization pattern with separate concerns

## Windows Development Notes
- Uses Python HTTP server (cross-platform)
- PowerShell-compatible npm scripts
- File paths use Windows backslashes in some configs

## Dependencies Management
- **Core Dependencies**: Minimal runtime dependencies (CVA, clsx, lucide-react, tailwind-merge)
- **Dev Dependencies**: Tailwind CSS toolchain (tailwindcss, autoprefixer, postcss)
- All animations implemented without heavy JavaScript frameworks

## Performance Considerations
- Static site with no build step required for core functionality
- Animations use CSS transforms for GPU acceleration
- Intersection Observer for efficient scroll handling
- Optional Tailwind CSS compilation for production optimization

## Development Workflow
1. Edit HTML/CSS/JS files directly
2. Run development server to test changes
3. Use browser dev tools for animation debugging
4. Build CSS when modifying Tailwind classes
5. Test across different viewport sizes and devices