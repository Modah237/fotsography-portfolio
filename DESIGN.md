# DESIGN SYSTEM — ADRIEL FOTSOGRAPHY

## 1. Brand Identity & Aesthetic
Direction : **Dark Editorial & Liquid Glassmorphism** (Awwwards SOTD aesthetic).
Inspiration : Galeries d'art contemporain, haute joaillerie, éditos de mode africaine & cinéma afrobeats.

## 2. Color Palette
```yaml
colors:
  background: "#08080A"        # Obsidian deep dark (évite le noir plat #000)
  background_subtle: "#0E0E12" # Nuance de surface élevée
  surface: "rgba(255, 255, 255, 0.04)"
  surface_glass: "rgba(255, 255, 255, 0.07)"
  surface_active: "rgba(255, 255, 255, 0.12)"
  border_glass: "rgba(255, 255, 255, 0.12)"
  border_highlight: "rgba(255, 255, 255, 0.25)"
  text_primary: "#F7F5F0"     # Ivoire pur chaleureux
  text_secondary: "#9C978F"   # Gris chaud pour métadonnées
  text_muted: "#66625C"       # Muted annotations
  accent: "#D4AF37"           # Warm Gold / Golden hour (reflet peau & lumière chaude)
  accent_glow: "rgba(212, 175, 55, 0.25)"
  success: "#10B981"
```

## 3. Typography
- **Display / Editorial**: `Instrument Serif`, serif haute couture, italique dramatique pour les mots-clés d'accent.
- **Body & Metadata**: `Inter`, `Space Grotesk` ou `Plus Jakarta Sans`, épuré, tracking élargi (`tracking-widest` pour labels/tags en majuscules).
- **Scale**:
  - Hero Display : `clamp(3.5rem, 9vw, 8.5rem)`
  - Section Headings : `clamp(2rem, 5vw, 4.5rem)`
  - Subheads : `1.25rem - 1.5rem`
  - Body : `1rem / 1.6`
  - Small / Tags : `0.75rem - 0.85rem / tracking-[0.2em] / uppercase`

## 4. Spacing & Elevation
- Base unit : `4px`
- Containers : `max-w-7xl mx-auto px-6 md:px-12`
- Radii :
  - `rounded-full` (pills flottantes, badges de statut, CTA)
  - `rounded-3xl` / `24px` (cartes glass, fenêtres de modale)
  - `rounded-2xl` / `16px` (vignettes de galerie média)

## 5. Liquid Glass Tokens
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
}

.liquid-glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
```

## 6. Interaction Rules
- **Cursor** : Curseur magnétique interactif (mode « Explore / View » au hover des photos).
- **Smooth Scroll** : Défilement inertiel Lenis.
- **Image Reveal** : Zoom lent subtil (scale 1.05 -> 1.0) et apparition avec fondu d'opacité.
- **Glass Hover** : Accentuation lumineuse de la bordure supérieure (`inset 0 1px 0 rgba(255,255,255,0.4)`).
