# 📸 BRIEF DESIGN & HANDOFF — ADRIEL FOTSOGRAPHY
### Document de référence pour génération & intégration
**Préparé par :** Antigravity / Modah  
**Date :** Novembre 2026  
**Usage :** Handoff de design & spécifications frontend Awwwards SOTD.

---

## 1. IDENTITÉ VISUELLE & COULEURS (DARK EDITORIAL & LIQUID GLASS)

```yaml
colors:
  background: "#08080A"        # Noir obsidienne profond (jamais #000 plat)
  surface_glass: "rgba(255, 255, 255, 0.05)" # Verre liquide principal
  border_glass: "rgba(255, 255, 255, 0.12)"  # Liseré subtil de réfraction
  text_primary: "#F7F5F0"     # Ivoire chaud de lecture
  text_muted: "#9C978F"       # Méta-données & labels techniques
  accent_gold: "#D4AF37"      # Or chaud / Teinte Golden Hour & peau
  accent_emerald: "#10B981"   # Statut disponible & WhatsApp
```

### Gradients CSS & Effets de Verre :
```css
/* Liquid Glassmorphism Pill */
background: rgba(20, 20, 26, 0.75);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.12);
box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);

/* Gold Typography Gradient */
background: linear-gradient(135deg, #F7F5F0 30%, #D4AF37 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 2. TYPOGRAPHIE HAUTE COUTURE

* **Display / Titres géants (H1, H2) :** `Cormorant Garamond` (ou `Playfair Display`) avec italique dramatic pour les mots de signature.
* **Navigation, Métadonnées, Badges :** `Plus Jakarta Sans` ou `Inter` — espacement élargi (`tracking-[0.25em]`, majuscules légères).

---

## 3. ASSETS RÉELS TÉLÉCHARGÉS & INTÉGRÉS

* **Miniature Réalisation Cysoul :** `/cysoul_albertine_thumbnail.webp`
* **Miniature Mariage Coutumier :** `/mariage_laurene_noel.webp`
* **Miniature Clip Malewa :** `/clip_malewa.webp`
* **Vidéo YouTube officielle :** `https://www.youtube.com/watch?v=w-A0l7MNKYo`
