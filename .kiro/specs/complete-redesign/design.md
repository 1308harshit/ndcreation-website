# Design Document - Gaming/Sci-Fi Redesign

## Color System

### Primary Colors
```css
--neon-purple: #B026FF;
--deep-purple: #8B5CF6;
--hot-pink: #FF006E;
--magenta: #EC4899;
--electric-cyan: #00F0FF;
--neon-green: #39FF14;
```

### Background Colors
```css
--deep-black: #0A0A0F;
--dark-navy: #1A1A2E;
--card-bg: rgba(26, 26, 46, 0.6);
```

### Glow Effects
```css
--purple-glow: 0 0 20px rgba(176, 38, 255, 0.5);
--pink-glow: 0 0 20px rgba(255, 0, 110, 0.5);
--cyan-glow: 0 0 20px rgba(0, 240, 255, 0.5);
```

## Typography

### Fonts
- **Headings**: Orbitron, Exo 2, or Rajdhani (bold, futuristic)
- **Body**: Inter or Space Grotesk
- **Accent**: Audiowide for special headings

### Sizes
- Hero: 80px - 120px
- H1: 60px - 80px
- H2: 40px - 50px
- Body: 16px - 18px

## Component Designs

### 1. New Logo
**Concept**: "ND" letters with circuit board pattern inside, neon purple/pink gradient, holographic effect

**Design Elements**:
- Geometric hexagonal frame
- Circuit traces connecting letters
- Animated glow pulse
- Holographic shimmer effect
- 3D depth with shadows

### 2. Hero Section
**Layout**:
- Full viewport height
- Massive 3D centerpiece (rotating holographic cube or sphere)
- Particle system with purple/pink particles
- Animated grid background
- Glitch text effects on heading
- Neon CTA buttons with pulse animation

**3D Element**:
- Large holographic object (cube, sphere, or abstract shape)
- Purple/pink neon edges
- Particle trails
- Responds to mouse movement
- Rotating slowly
- Glowing core

### 3. Navigation Bar
**Style**:
- Glassmorphism with dark tint
- Neon purple bottom border
- Logo on left with glow
- Links with hover glow effect
- Mobile: Full-screen overlay with hexagonal pattern

### 4. Product/Service Cards
**Shape**: Hexagonal or angular clipped corners

**Effects**:
- Neon purple/pink gradient borders
- Hover: Lift + intense glow
- Animated background particles
- Glitch effect on hover
- Icon with neon glow

### 5. Buttons
**Primary Button**:
- Purple to pink gradient
- Pulsing glow animation
- Hover: Expand + brighten
- Click: Glitch effect

**Secondary Button**:
- Transparent with neon border
- Hover: Fill with gradient
- Glow on hover

### 6. Background Elements
**Animated Grid**:
- Perspective grid (like Tron)
- Purple/pink lines
- Fades into distance
- Animated movement

**Particles**:
- Floating purple/pink particles
- Various sizes
- Glow effect
- Slow movement
- Interactive (move away from cursor)

**Nebula Effect**:
- Blurred purple/pink clouds
- Animated movement
- Depth layers

### 7. 3D Enhancements
**Hero 3D Scene**:
- Larger, more prominent
- Holographic material
- Neon edges
- Particle emission
- Dynamic lighting (purple/pink)

**Additional 3D Elements**:
- Floating geometric shapes
- Holographic panels
- Animated tech symbols
- Circuit board patterns

### 8. Animations
**Glitch Effect**:
- Random RGB split
- Quick horizontal shifts
- Used on hover and page load

**Glow Pulse**:
- Continuous subtle pulse
- On buttons, borders, icons
- Purple/pink alternating

**Text Reveal**:
- Letters appear with glitch
- Neon glow trail
- Staggered timing

**Hover Effects**:
- Lift + glow
- Scale up
- Particle burst
- Color shift

## Page-Specific Designs

### Homepage
1. **Hero**: Massive 3D scene, glitch text, neon CTAs
2. **Stats**: Animated counters with neon glow
3. **Products**: Hexagonal cards with hover effects
4. **Services**: Angular cards with particle backgrounds
5. **Why Choose Us**: Animated icons with glow
6. **Testimonials**: Futuristic carousel with neon borders
7. **Footer**: Grid background, neon links

### Products Page
- Grid layout with hexagonal cards
- Filter tabs with neon active state
- Search bar with glow
- Hover: Card lifts, glows, particles appear

### Services Page
- Large service cards with 3D icons
- Pricing with neon highlights
- FAQ with glitch expand animation
- Booking modal with holographic effect

### Contact Page
- Form with neon borders
- Glowing input focus states
- Animated send button
- Particle background
- Contact info cards with glow

### About Page
- Founder section with neon frame
- Company values with animated icons
- Timeline with neon line
- Team section (if applicable)

## Implementation Priority
1. Update global CSS with new color system
2. Create new logo component
3. Redesign Hero section with enhanced 3D
4. Update navigation
5. Redesign all card components
6. Add particle systems
7. Implement glitch animations
8. Update all pages
9. Add background effects
10. Polish and optimize

## Performance Considerations
- Optimize particle count for mobile
- Use GPU acceleration
- Lazy load 3D elements
- Reduce motion for accessibility
- Efficient shader code
