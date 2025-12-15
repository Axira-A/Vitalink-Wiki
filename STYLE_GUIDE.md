# Vitalink Design System (Style Guide)

## 1. Color Palette (配色方案)

Our design uses a strict "Deep Dark" theme to ensure a high-end, distraction-free environment.

### Primary Colors
- **Background Primary**: `#0a0a0a` (Main Page Background)
- **Background Secondary**: `#171717` (Cards, Panels)
- **Accent**: `#0ea5e9` (Sky Blue - Buttons, Highlights, Active States)

### Text Colors
- **Text Primary**: `#f5f5f5` (Headings, Body Text)
- **Text Secondary**: `#a3a3a3` (Subtitles, Meta Data)

## 2. Typography (排版)

- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Tight tracking (`tracking-tight`), Bold weight.
- **Body**: Relaxed leading (`leading-relaxed`) for readability.

## 3. Components (组件规范)

### Cards
- **Background**: `bg-bg-secondary`
- **Border**: `border-white/5` (Subtle 1px border)
- **Hover Effect**:
  - Lift up (`y: -5px`)
  - Glow (`shadow-lg` with accent color)
  - Border highlight (`border-accent/30`)

### Buttons
- **Primary**: Solid Accent color, Text Black, Rounded Full or slightly rounded.
- **Secondary**: Outline or Ghost (Text only), White/10 hover background.

### Navigation
- **Top Bar**: Fixed, Backdrop Blur (`backdrop-blur-md`), semi-transparent background.
- **Links**: Text Secondary by default, White on hover.

## 4. Animation (动画)

We use `Framer Motion` for all interactions.
- **Page Load**: Fade In + Slide Up (`y: 20 -> 0`, `opacity: 0 -> 1`).
- **Hover**: Spring physics (stiffness: 300, damping: 20).
- **Stagger**: List items should stagger by 0.1s.

## 5. Accessibility (无障碍)
- Ensure text contrast ratio is at least 4.5:1 (checked with #a3a3a3 on #0a0a0a).
- Focus states must be visible (`ring-2 ring-accent`).
- Interactive elements must have a minimum touch target of 44px.
