---
name: Pitch Side Trading
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e4bebc'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ab8987'
  outline-variant: '#5b403f'
  surface-tint: '#ffb3b1'
  primary: '#ffb3b1'
  on-primary: '#680011'
  primary-container: '#ff535b'
  on-primary-container: '#5b000e'
  inverse-primary: '#bb152c'
  secondary: '#b0c7f1'
  on-secondary: '#183153'
  secondary-container: '#334a6d'
  on-secondary-container: '#a2b9e2'
  tertiary: '#95d4b3'
  on-tertiary: '#003824'
  tertiary-container: '#609d7f'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#b0c7f1'
  on-secondary-fixed: '#001b3c'
  on-secondary-fixed-variant: '#30476a'
  tertiary-fixed: '#b1f0ce'
  tertiary-fixed-dim: '#95d4b3'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#0e5138'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  stat-number:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '900'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for a high-energy, competitive sticker-trading environment centered around the World Cup. The target audience is football enthusiasts and collectors who value speed, rarity, and the thrill of the "find." 

The style is **High-Contrast / Bold** with a focus on **Modern Card-Based UI**. It leverages dark mode to make sticker artwork pop, utilizing vibrant team-inspired accents to create an atmosphere of stadium lights at night. Visuals are aggressive and impactful, using large typography and glowing indicators to signal active trades and rare finds.

## Colors

The palette is anchored by a **Dark Charcoal (#121212)** base to ensure maximum contrast for digital collectibles. 

- **Primary (Vibrant Red):** Used for urgent actions, "Missing" status indicators, and primary buttons.
- **Secondary (Deep Navy):** Used for structural elements, headers, and container backgrounds to provide depth against the black base.
- **Tertiary (Forest Green):** Reserved for "Duplicate" indicators, successful trades, and "In-Stock" status.
- **Crisp White:** Used strictly for high-priority typography and icons to maintain an athletic, clean aesthetic.
- **Glow Effects:** Interactive elements and rare stickers utilize subtle outer glows using the Primary or Success colors to simulate stadium neon.

## Typography

This design system employs a tiered typographic scale to reinforce the athletic theme. 

**Montserrat** is the voice of the brand, used for all headlines in bold and black weights. It should be set with tight letter-spacing to mimic sports jersey lettering. 

**Inter** provides a neutral, highly legible balance for descriptions and player data. 

**JetBrains Mono** is introduced for technical labels (serial numbers, "Missing/Duplicate" counts) to give a precise, data-heavy feel to the collection stats. All labels should be transformed to uppercase.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for mobile-first interaction. 

- **Mobile:** 4-column grid with 16px margins. 
- **Desktop:** 12-column grid centered with a max-width of 1280px.
- **Rhythm:** A 4px baseline grid governs all spatial relationships. Card components should use "Stack-MD" (16px) for internal padding to maintain a dense, high-information feel. 

The "Tinder-style" swipe interface for trading should occupy 85% of the viewport height on mobile, ensuring the focus remains entirely on the sticker graphic and its associated metadata.

## Elevation & Depth

This design system uses **Tonal Layers** combined with **Inner Glows** rather than traditional drop shadows. 

1.  **Level 0 (Base):** #121212.
2.  **Level 1 (Cards/Surface):** #1E1E1E with a 1px subtle border (#2C2C2C).
3.  **Level 2 (Active/Trading):** Surface with a Primary or Secondary color tint and a 0.5px inner highlight on the top edge.

**Glows:** Interactive "Match" indicators use a 10px blur, 0.3 opacity shadow matching the accent color (Red or Green) to simulate a light-emissive surface.

## Shapes

The shape language is defined by large, friendly **16px corners** (rounded-lg) for primary cards, creating a premium "collectible card" feel. 

- **Standard Buttons:** 8px (rounded-md).
- **Status Badges:** Fully rounded (pill-shaped) to distinguish them from actionable buttons.
- **Sticker Containers:** 16px to match the physical aspect of rounded-corner trading cards.

## Components

### Swipe Cards (Sticker Cards)
The centerpiece of the UI. Feature a large player image, a country flag icon in the top right, and the sticker number in the bottom left. Use a subtle linear gradient overlay (bottom-to-top, black to transparent) to ensure white text remains readable over player jerseys.

### Status Badges
- **Missing:** Primary Red background, White text, JetBrains Mono font.
- **Duplicate:** Tertiary Green background, White text, JetBrains Mono font.
These should be positioned in the top-left corner of any card or list item.

### Buttons
- **Primary:** High-contrast White background with Navy text for "Trade Now" actions.
- **Ghost:** Transparent with a 2px White border for "View Collection."

### Match Indicators
Small circular pips that pulse with a green glow when a trading partner has a sticker you are "Missing."

### Progress Bars
Used for "Collection Completion." Use a thick 12px track in Secondary Navy with a Primary Red fill and a subtle glow on the leading edge.