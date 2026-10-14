---
name: Saint Tropez Confeitaria
description: The house seen through its own arches; porcelain day, turquoise canopy fields, petrol night.
colors:
  porcelain: "#f5f6f3"
  porcelain-hi: "#fbfbf9"
  porcelain-lo: "#e3e7e3"
  turq: "#0cb1ad"
  turq-hi: "#19c2bd"
  turq-deep: "#08807c"
  turq-ink: "#066b68"
  cocoa: "#2a1a14"
  cocoa-2: "#4e3a31"
  gold: "#b8924a"
  night: "#0b1f20"
  night-2: "#12302f"
  night-3: "#081617"
  night-ink: "#e9f1ef"
  night-muted: "#a7bdb9"
  rule: "rgba(42, 26, 20, 0.16)"
  rule-strong: "rgba(42, 26, 20, 0.5)"
typography:
  display:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(2.6rem, 1.3rem + 5.1vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(2.4rem, 1.4rem + 4.2vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(1.9rem, 1.3rem + 2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
  lead:
    fontFamily: "Figtree Variable, Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 450
    lineHeight: 1.5
  body:
    fontFamily: "Figtree Variable, Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 450
    lineHeight: 1.6
  label:
    fontFamily: "Figtree Variable, Figtree, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 650
    lineHeight: 1.35
rounded:
  hairline: "2px"
  sm: "3px"
  arch: "50vw 50vw 0 0"
  pill: "999px"
  round: "50%"
spacing:
  s1: "0.5rem"
  s2: "0.75rem"
  s3: "1rem"
  s4: "1.5rem"
  s5: "2rem"
  s6: "3rem"
  s7: "4.5rem"
  s8: "7rem"
  s9: "10rem"
  gutter: "clamp(16px, 4vw, 56px)"
  col-gap: "clamp(0.75rem, 1.6vw, 1.5rem)"
components:
  button-canopy:
    backgroundColor: "{colors.turq}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.45rem"
    height: "52px"
  button-canopy-hover:
    backgroundColor: "{colors.turq-hi}"
    textColor: "{colors.cocoa}"
  button-canopy-active:
    backgroundColor: "{colors.turq-deep}"
    textColor: "{colors.porcelain-hi}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.45rem"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.cocoa}"
    textColor: "{colors.porcelain-hi}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.45rem"
    height: "52px"
  piece-frame:
    backgroundColor: "{colors.porcelain-lo}"
    rounded: "{rounded.hairline}"
  piece-frame-arch:
    backgroundColor: "{colors.porcelain-lo}"
    rounded: "{rounded.arch}"
  map-load:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.25rem"
    height: "88px"
  highlight-ring:
    backgroundColor: "{colors.turq}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.round}"
    size: "84px"
---

# Design System: Saint Tropez Confeitaria

## Overview

**Creative North Star: "Through the Arches"**

The page walks through the house the way a visitor does: through the arches of the glass salão vault. Every photograph opens through an arch-topped window or rises from a sill. The page's material changes with the place: porcelain white by day (the facade), whole turquoise fields where the canopy takes over (the Salgados counter, A casa, the mobile menu), and petrol night under the glass (the salão, the visit, the footer). The photographs are the house's own. The system exists to frame them, not to decorate around them.

Density is editorial and generous: big Gloock lettering at full scale, offset collage grids on a 12-column frame, and long vertical rests between chapters (7rem to 10rem). Type, rules and photo frames carry all the structure. There are no background patterns, no textures and no decorative grids. The old canvas pyramid relief world is retired.

Motion belongs to the world itself. Arches and sills open by clip-path while the image settles from roughly 1.15 to 1.3 scale, display lines rise out of masks, depth parallax is scrubbed, and three stages pin. With reduced motion or without JS, every staged layout falls back to a complete static page.

**Key Characteristics:**
- Porcelain ground, cocoa type, turquoise as whole chapter fields, petrol night chapters.
- Gloock 400 for every display line; Figtree for everything practical.
- The arch (fully round top, square foot) is the one signature shape.
- Photos stand on a 1px cocoa sill with the caption beneath.
- Flat on porcelain; shadows only where a photo sits on turquoise or night.
- Pinned scroll stages that open, stack and crossfade photos through arches.

## Colors

A three-material palette (porcelain day, turquoise canopy, petrol night), all carrying a single warm cocoa voice for type.

### Primary
- **Canopy Turquoise** (turq): the marquise colour. Used as entire section fields (Salgados chapter, A casa, open mobile menu, turquoise header state), the canopy button, highlight rings, live-status dot and text selection. Always carries cocoa type, never white.
- **Lit Canopy** (turq-hi): hover state of the canopy, and the accent on night (focus rings, today's row in the hours table, footer column heads, map-load icon).
- **Canopy Edge** (turq-deep): pressed canopy button and the empty frame behind photos on turquoise fields.
- **Legible Turquoise** (turq-ink): turquoise as text on porcelain (brand sub-line, accent-color, caret). The base turquoise is never used as text on white.

### Secondary
- **Petrol Night** (night): ground of the salão and Visite chapters, and the colour the turquoise flood rises over in A casa.
- **Night Panel** (night-2): raised panels on night (the map loader).
- **Deep Night** (night-3): the footer, one step below the chapters.
- **Night Ink** (night-ink) and **Night Mist** (night-muted): primary and secondary type on night.

### Tertiary
- **Filigree Gold** (gold): reserved for the 1px ring around the round brand seal and the closed-status dot. An echo of the packaging, never a fill or a type colour.

### Neutral
- **Porcelain** (porcelain): the day ground, taken from the white facade.
- **Porcelain Light** (porcelain-hi): text on cocoa and on pressed turquoise, the scrolled header glass, the round lightbox and zoom buttons.
- **Porcelain Shade** (porcelain-lo): empty frame colour behind photos while they load.
- **Cocoa** (cocoa): all type on porcelain and turquoise, the sill rules, the focus outline. Taken from the brown script wordmark.
- **Cocoa Soft** (cocoa-2): lead paragraphs, counts and secondary text on porcelain.
- **Hairline** (rule) and **Strong Hairline** (rule-strong): divider rules on porcelain.

### Named Rules
**The Whole Field Rule.** Turquoise is a place, not a highlight. It either fills a whole chapter edge to edge or appears as one solid object (button, ring, dot). No turquoise tints, gradient washes or tinted cards; a turquoise line appears only as a state accent (the open-status ping, the hover outline of a night panel).

**The Cocoa Voice Rule.** Type on porcelain and on turquoise is cocoa. White type appears only on night or over a darkened photo.

## Typography

**Display Font:** Gloock 400 (with Times New Roman, serif)
**Body Font:** Figtree Variable (with Figtree, system-ui, sans-serif)

**Character:** Gloock is the shop sign, a high-contrast serif set large and tight. Figtree is the counter staff: warm, round, solid weights (450 body, 600 to 700 UI), never thin.

### Hierarchy
- **Display** (400, clamp(2.6rem, 1.3rem + 5.1vw, 6rem), 0.94, -0.03em): the opening line and chapter titles at the same scale, plus the hero arrival street name and the Instagram handle.
- **Headline** (400, clamp(2.4rem, 1.4rem + 4.2vw, 5.25rem), 0.98): section displays (A vitrine, A casa).
- **Title** (400, clamp(1.9rem, 1.3rem + 2vw, 3rem), 1): sub-section titles (the turquoise cart). Gloock lists (shelf index, house rules, the "also" list, mobile menu) sit between title and headline.
- **Lead** (450, clamp(1.0625rem, 1rem + 0.35vw, 1.25rem), 1.5): chapter intros, 34 to 50ch.
- **Body** (450, 1.0625rem, 1.6; 1rem under 760px): running text.
- **Label** (650, 0.9375rem, 1.35): photo captions, counts, status, buttons (1rem). Small notes run at 0.875rem.

### Named Rules
**The Sign and Counter Rule.** Gloock 400 only for display lines and lists of names. Figtree for every number, caption, button, address and table. Gloock never goes bold, and Figtree never goes below weight 450.

**The Rising Line Rule.** Display lines sit in clipped masks so they can rise into place. Titles balance (text-wrap: balance) and paragraphs use pretty wrapping.

## Layout

A 12-column grid (column gap clamp(0.75rem, 1.6vw, 1.5rem)) sits inside a 1440px frame with a fluid gutter (clamp(16px, 4vw, 56px)). Chapters are offset collages, not rows of equal cards: pieces span 3 to 7 columns, take mixed aspect ratios (1, 4/5, 3/4, 3/2, 5/4) and are nudged up or down by spacing steps so their tops never align. Full-bleed moments (the Pães band, the pinned salão) break the frame entirely.

The spacing scale runs 0.5rem to 10rem (s1 to s9), and chapters breathe on s8 and s9. The header is fixed (76px, 64px on phones) and takes the material of the section beneath it: transparent over the hero, porcelain glass when scrolled, solid turquoise over turquoise fields, translucent night over night.

Responsive: at 960px the grid drops to 6 columns or one, the desktop nav becomes the turquoise menu, and sticky text columns collapse into flow. At 760px collages become two columns, and at 520px the hero buttons go full width. The pinned Salgados stack only runs above 961px wide and 621px tall.

## Elevation & Depth

Flat on porcelain. Depth comes from photographs, scale and scroll, not from lifted surfaces. Vitrine photos on porcelain have no resting shadow; they stand on a sill rule. Shadows appear only where a photo sits on a coloured field (turquoise or night), as long, soft, downward drops tinted to that field, plus the soft lift under the canopy button.

### Shadow Vocabulary
- **Porcelain lift** (`box-shadow: 0 34px 60px -34px rgba(42, 26, 20, 0.45), 0 10px 22px -16px rgba(42, 26, 20, 0.28)`): only the floating hover thumbnail of the shelf index.
- **Turquoise drop** (`box-shadow: 0 34px 56px -34px rgba(4, 52, 50, 0.85)`): photos on turquoise fields.
- **Night drop** (`box-shadow: 0 40px 70px -36px rgba(0, 0, 0, 0.75)`): photos on night.
- **Canopy lift** (`box-shadow: 0 14px 24px -16px rgba(8, 64, 62, 0.75)`; hover `0 20px 30px -16px rgba(8, 64, 62, 0.8)`): the canopy button.

### Named Rules
**The Sill Not Shadow Rule.** On porcelain a photo is grounded by its 1px cocoa sill, never by a drop shadow.

**The Tinted Drop Rule.** A shadow takes the colour of the field it falls on. No neutral grey shadows and no hard offset shadows.

## Shapes

There are two silhouettes, the arch and the near-square. The arch has a fully round top and a square foot (border-radius 50vw 50vw 0 0) and comes from the salão vault. It frames the hero arcade, chosen vitrine pieces, the night facade, the A casa facade, the cart tricycle and one Instagram tile, and the scroll openings clip through the same arch shape. Everything else is almost square: 2px on photo frames, 3px on buttons and the map panel. Circles are kept for the brand seal, highlight rings, status dots and round icon buttons, and the lightbox close is a pill. Rules are 1px, or 1.5px for a section's top rule.

## Components

### Buttons
Solid and plain, like a painted shop sign.
- **Shape:** gently squared (3px), min height 52px, padding 0.85rem 1.45rem, Figtree 650 1rem, optional SVG line icon.
- **Canopy (primary):** flat turquoise fill, cocoa label, soft canopy lift shadow. No inset lip, no gradient. One per view.
- **Hover / Active:** hover lifts 2px to lit turquoise with a deeper shadow. Active presses 1px to canopy edge with a porcelain label. Transitions take 0.25s on the out-expo curve.
- **Line:** transparent with a 1.5px cocoa inset outline. Fills cocoa with a porcelain label on hover.
- **Ghost:** the line button for night, with a night-ink label and a 45% night-ink outline.
- **Inside the turquoise menu**, the canopy button inverts to a porcelain fill.

### Vitrine piece (signature)
- **Frame:** a button that opens the lightbox, with 2px corners or an arch and a porcelain-shade empty colour. No shadow on porcelain.
- **Sill:** a 1px cocoa rule directly under the photo, with the caption below it in Figtree 650 0.9375rem.
- **Hover / Focus:** the image eases to 1.05 scale over 1.2s, and a round porcelain zoom button rises into the lower right corner (always visible on touch).

### Shelf index
Four category names in Gloock (clamp up to 4.25rem) sit between a 1.5px cocoa top rule and strong hairlines, with the count at the right in tabular Figtree. On desktop hover the other lines dim to 32%, the hovered one indents, and a tilted arch thumbnail floats in.

### Navigation
A fixed header holds the round seal (gold ring), the Gloock wordmark and a turquoise-ink sub-line. Links are Figtree 600 with a 1.5px underline that wipes in from the left. Below 960px, a text Menu button with two bars opens a full-screen turquoise sheet. The sheet drops in by clip-path, its Gloock links rise in a stagger, and the address and canopy button sit at its foot.

### Live status
A 9px dot (turquoise and pinging when open, gold when closed) beside a Figtree 600 line. On turquoise fields the dot turns cocoa.

### Map loader
A night panel (88px, 3px corners, 1.5px inset outline at 22% night ink) that loads the map only on request. The outline turns lit turquoise on hover.

### Instagram highlights
84px turquoise rings with a cocoa line icon, a porcelain gap and a hairline outer ring. They lift 4px on hover. A horizontal strip of Instagram photos stands on one shared cocoa sill and drifts with scroll.

### Pinned stages (signature motion)
- **The arcade opening:** five arches (three on phones) rise from the floor in a stagger. On scroll the stage pins and the centre facade arch widens by clip-path until it fills the screen. The side arches slide away and down, a night scrim rises, and the street name lands on the photo.
- **The Salgados stack:** on the turquoise field, one frame pins. Each photo rises over the last from the sill while the previous one recedes to 0.94, and a numbered list lights the one in view. The stack snaps per photo.
- **The salão crossfade:** a full-screen night stage pins. Each next photo opens through an arch that then widens to full bleed, captions crossfade, and step bars mark progress.
- **The turquoise flood:** A casa starts on night, and the turquoise field rises through an arch until it fills the chapter.

## Do's and Don'ts

### Do:
- **Do** let turquoise fill whole chapters and carry cocoa type on it.
- **Do** frame photos with the arch (50vw 50vw 0 0) or a 2px near-square, and ground them on a 1px cocoa sill with the caption beneath.
- **Do** set every display line in Gloock 400 at full scale with tight tracking, and everything practical in Figtree at 450 or heavier.
- **Do** use turq-ink for turquoise text on porcelain and turq-hi for accents on night.
- **Do** tint shadows to the field they fall on and keep porcelain flat.
- **Do** keep every pinned or clipped stage readable as a complete static layout under reduced motion and without JS.

### Don't:
- **Don't** add background patterns, textures, grids or the retired canvas pyramid relief.
- **Don't** use thin or monospace fonts, or bold Gloock.
- **Don't** put a drop shadow under photos on porcelain, or give the canopy button an inset lip or hard offset shadow.
- **Don't** use turquoise as tints, gradient washes, tinted cards or body text on white.
- **Don't** lay products out as a grid of equal cards.
- **Don't** use em dashes in visible text.
