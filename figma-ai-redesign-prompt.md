# 🎨 Jellit UI Redesign Prompt — Figma AI

**Goal:** Transform the Jellit mobile app from a clinical medical tracker to a calm, meditative wellness experience. Think meditation app aesthetic, not health dashboard.

---

## 📋 Context: Current State

### Existing Color Palette (TO REPLACE)

The app currently uses a **medical-friendly** teal/green palette that feels clinical:

- **Primary:** `#5B9FA3` (Muted teal - medical/hospital vibe)
- **Primary Light:** `#E8F3F4` (Light teal backgrounds)
- **Secondary:** `#7FB685` (Bright soft green)
- **Background:** `#F8FAFB` (Soft off-white)
- **Surface:** `#FFFFFF` (Pure white - feels sterile)
- **Text Primary:** `#1F2937` (Near-black)
- **Text Secondary:** `#6B7280` (Muted gray)

**Problem:** These colors feel sterile, medical, and analytical rather than supportive and calming.

### Current Visual Issues

1. **Typography:** Heavy use of `fontWeight: 700` (bold) creates harsh hierarchy
2. **Stats Display:** Large analytical numbers (`36px`, `700` weight) without warmth
3. **Layouts:** Grid-like precision feels clinical (Bristol buttons, stat cards)
4. **Surfaces:** Pure white cards feel institutional
5. **No Gradients:** Flat colors lack depth and softness
6. **Missing Companion:** Logo character exists but not integrated into UI

### Component Styling

- **Cards:** `16px` border radius, subtle shadows (good foundation)
- **Buttons:** `12px` border radius, `600` weight
- **Spacing:** Generous padding (already wellness-friendly)

---

## 🎯 Target Design Direction

### New Color Palette: Calm Wellness Green/Blue

Replace clinical teal with **warmer, softer sage and eucalyptus tones**:

#### Primary Colors
- **Primary:** `#8FA89E` or `#91B5A8` (Sage green - calm, grounded)
- **Primary Light:** `#D4E3DE` or `#E0EBE7` (Very light sage for backgrounds)
- **Primary Dark:** `#6E8980` (Deeper sage for active states)

#### Secondary & Accents
- **Secondary:** `#A8C4BC` or `#9FBAA8` (Soft mint/eucalyptus)
- **Secondary Light:** `#E8F1EE` (Light mint backgrounds)
- **Accent (Blue-Green):** `#7EA5A3` (Gentle teal for highlights)

#### Surfaces & Backgrounds
- **Background:** `#F7FAF9` or `#F8FAF8` (Off-white with subtle warm green tint)
- **Surface:** `#FDFFFE` or gradient overlay (not pure white)
- **Surface Alt:** `#EDF3F1` (Tinted light surface)

#### Text
- **Text Primary:** `#2A3F38` (Soft dark green-gray, not harsh black)
- **Text Secondary:** `#6B7F78` (Muted sage gray)
- **Text Tertiary:** `#9AABA5` (Very light sage gray)

#### Semantic Colors (Soften existing)
- **Error:** `#D89B9B` (Soft dusty rose, not alarming)
- **Success:** `#A8C4B3` (Soft sage green)
- **Warning:** `#E8C9A6` (Soft sand/peach)

### Typography: Humanist & Gentle

**Font Recommendation:** Rounded or humanist sans-serif
- Suggest: Inter Rounded, Circular, DM Sans, or Nunito Sans (React Native compatible)

**Weight Distribution:**
- **Titles/Headlines:** `600` (medium, not bold) at `28-32px`
- **Section Headers:** `500` at `18-20px`
- **Body/Labels:** `400-500` at `15-16px`
- **Supporting Text:** `400` at `14px`
- **Stats:** `600` at `32-36px` (NOT `700` — gentler hierarchy)

**Rules:**
- NO all-caps
- Comfortable line height: `1.4-1.6`
- Headlines feel calm, not assertive

### Gradients: Subtle & Low-Saturation

**Apply to:**
- Card backgrounds (5-10% opacity overlays)
- Screen backgrounds (very subtle vertical gradients)
- Empty state backgrounds

**Gradient Specifications:**
- **Card Gradient Example:** Linear from `#F7FAF9` to `#EDF3F1` (vertical, subtle)
- **Background Gradient:** `#F8FAF8` (top) to `#F0F5F3` (bottom), barely perceptible
- **Accent Gradients:** Use primary/secondary blends for empty states

**Constraints (React Native):**
- Use `expo-linear-gradient` component (no CSS gradients)
- Maximum 2-3 color stops
- NEVER apply gradients to text or charts
- Opacity range: 5-15% for subtlety

### Shapes & Surfaces

**Card Design:**
- Border radius: `18-24px` (more rounded than current `16px`)
- **Option A:** Floating with soft shadow (`rgba(0,0,0,0.04)`, offset `0 4px`, blur `16px`)
- **Option B:** Separated by subtle color shift (no shadow, different tinted background)
- **Do NOT combine:** shadow + border + color shift (pick one method)

**Buttons:**
- Border radius: `14-16px` (warmer than current `12px`)
- Primary buttons: Solid primary color
- Secondary buttons: Light background with primary color text
- Tap states: Gentle scale (0.97) and opacity (0.8) — NO bounce

**Spacing:**
- Maintain generous vertical spacing (current `16-24px` gaps are good)
- No table-like dividers — use spacing or subtle color shifts

---

## 🐻‍❄️ Companion Character Integration

### Reference Asset
**File:** `assets/images/logo.png` (provided separately)
**Description:** Simple, friendly character based on toilet mascot — calm, supportive, non-reactive expression

### Usage Guidelines

The companion should appear **ONLY** in:
1. **Empty States**
2. **First-time Onboarding**
3. **Summary Screens**

**NEVER:**
- During active logging
- Commenting on specific entries
- Reacting dramatically or celebrating

### Companion Placement Specifications

#### Empty State Screens

**1. Dashboard — No Entries Yet**
- **Companion:** Center of screen, medium size (80-100px), neutral smile
- **Position:** Above text, gentle pointing gesture toward "Add entry" CTA
- **Copy:**
  - Headline: "Welcome to Jellit"
  - Body: "This is a quiet place to notice patterns over time.\nThere's nothing to fix — just observe."
  - CTA: "Add first entry"

**2. History — No Entries**
- **Companion:** Smaller (60-80px), relaxed sitting posture
- **Position:** Center, between headline and body text
- **Copy:**
  - Headline: "No entries yet"
  - Body: "Your logged entries will appear here"

**3. Insights — No Data This Week/Month**
- **Companion:** Small (60px), calm neutral expression
- **Position:** Top of empty chart area, subtle presence
- **Copy:**
  - Headline: "A quiet week"
  - Body: "When you're ready, pick up where you left off.\nYour body doesn't keep score."

**4. Dashboard — No Data This Week**
- **Companion:** Medium (70-80px), pointing gently toward chart placeholder
- **Copy:**
  - Headline: "Your patterns will show up here"
  - Body: "After a few entries, you'll start seeing trends.\nThere's no rush."

### Companion Visual Treatment
- Soft drop shadow: `rgba(0,0,0,0.06)`, offset `0 2px`, blur `8px`
- Optional: Very subtle gradient background circle behind companion (light primary color, 10% opacity)
- Expression: Calm, neutral smile — never exaggerated
- Animation (optional): Gentle breathing motion (slow scale 1.0 to 1.02)

---

## 📱 Screen-by-Screen Redesign Guide

### 1. Dashboard (`index.tsx`)

**Current Issues:**
- Stats presented as raw analytical numbers (`36px` bold)
- 2x2 grid feels data-heavy
- No companion presence
- FAB (Floating Action Button) strong shadow feels aggressive

**Redesign Goals:**
- Soften stat presentation with context
- Add breathing room
- Integrate companion for empty/low-data states
- Gentle FAB treatment

**Specific Changes:**

**Stats Section:**
- Wrap stat numbers in soft gradient cards (primary light background)
- Reduce number size to `28-32px`, weight `600` (not `700`)
- Add supportive label below number: "entries this week" instead of just "This Week"
- Consider horizontal layout instead of 2x2 grid for fewer stats shown at once

**Empty State:**
- Show companion (center, 90px) with welcome message
- Use subtle background gradient (top: `#F8FAF8`, bottom: `#EDF3F1`)
- CTA button: Rounded (`16px`), primary color, medium size

**FAB:**
- Reduce shadow intensity to `rgba(0,0,0,0.15)`, blur `12px`
- Consider pill shape (rounded rectangle) instead of circle
- Color: Primary gradient overlay (subtle)

### 2. Log Entry (`log.tsx`)

**Current Issues:**
- Bristol buttons feel grid-like and clinical
- Sliders presented as utilitarian rectangles
- Layout feels form-like rather than conversational

**Redesign Goals:**
- Make Bristol selection feel gentle, not medical
- Soften urgency/pain sliders
- Add breathing room between sections
- Reduce "clinical checklist" feel

**Specific Changes:**

**Bristol Scale Selection:**
- Keep circular buttons but increase size to `52-56px` (more touchable)
- Add subtle gradient fill to active state (primary to primary light)
- Inactive buttons: Very light background (`#EDF3F1`), not gray
- Add small label below selected type (description)
- Spacing between buttons: `10-12px`

**Urgency & Pain Sliders:**
- Soften button corners to `10-12px`
- Active state: Gradient fill (primary blend)
- Inactive: Light tinted background, no harsh borders
- Label below (current: "Very Easy") with supportive tone

**Section Headers:**
- Reduce weight from `600` to `500`
- Increase spacing above section (24px minimum)
- Subtitle text: `400` weight, softer color

**Advanced Options Toggle:**
- Style as subtle text link, not button
- Color: Accent blue-green

### 3. History (`history.tsx`)

**Current Issues:**
- List feels medical record-like
- Delete button harsh red
- Expandable interaction not obvious

**Redesign Goals:**
- Make entries feel like journal pages, not records
- Soften delete action
- Add visual cue for expandability

**Specific Changes:**

**Entry Cards:**
- Increase spacing between cards to `14-16px`
- Add subtle gradient background (vertical, light)
- Top-left corner: Small rounded tag for Bristol type (pill shape, primary light background)
- Right side: Mood emoji larger (`32px`)
- Bottom: Subtle "Tap to expand" hint (first 2 entries only, then hide)

**Expanded Details:**
- Gentle reveal animation (fade in + slight slide down)
- Detail rows: Remove borders, use spacing only
- Icons for urgency/pain (small, 16px, accent color)

**Delete Action:**
- Change red to soft dusty rose (`#D89B9B`)
- Icon smaller, less prominent
- Confirmation dialog: Calm tone, "Remove entry?" not "Delete"

**Empty State:**
- Companion (70px, sitting)
- Soft gradient background
- Copy: "No entries yet\nYour logged entries will appear here"

### 4. Insights (`insights.tsx`)

**Current Issues:**
- Charts feel analytical and diagnostic
- Week/Month toggle feels segmented-control clinical
- Distribution bars are sharp
- Keyword tags feel functional

**Redesign Goals:**
- Charts as observational, not diagnostic
- Soften all data visualization
- Add calming interpretive copy

**Specific Changes:**

**Week/Month Toggle:**
- Pill-shaped container (`24px` radius)
- Active state: Gradient fill + shadow (floating appearance)
- Inactive: Transparent, lighter text
- Smooth slide animation on switch

**Summary Stats:**
- Remove stat rows with borders
- Present as soft gradient cards (3 cards in vertical stack)
- Each card: Icon (16px) + label + value
- Card background: Subtle gradient (light primary to light secondary)

**Bristol Distribution Chart:**
- Rounded bar ends (`4-6px` radius)
- Bars: Gradient fill (primary to secondary)
- Background track: Very light tinted (`#EDF3F1`)
- Remove percentage text clutter — show on tap only
- Add interpretive line below: "Variation like this is common."

**Keywords Section:**
- Pill tags: Larger radius (`20px`), more padding
- Gradient background (light primary blend)
- Soft shadow on tags

**Empty State:**
- Companion (65px) at top
- Copy: "A quiet week\nWhen you're ready, pick up where you left off.\nYour body doesn't keep score."
- Background: Gentle gradient canvas

**Disclaimer Card:**
- Soften warning background (use soft sand `#F5F0E8` instead of orange)
- Icon: Info circle (not warning triangle)
- Text: Gentle tone, `400` weight

### 5. Settings (`settings.tsx`)

**Current Issues:**
- Functional but lacks personality
- No companion presence
- Warning cards feel harsh

**Redesign Goals:**
- Add warmth through companion presence
- Soften warning tones
- Make account section feel supportive

**Specific Changes:**

**Header:**
- Add small companion (40-50px) next to "Settings" title (optional)
- Gradient background for header area

**Account Section:**
- Email display: Pill-shaped container, gradient background
- Icon (mail) with accent color
- Sign out: Change red to soft rose, smaller weight

**Anonymous Warning:**
- Background: Soft sand gradient (`#F5F0E8` to `#F7F2EA`)
- Icon: Gentle info icon
- Tone: Supportive, not alarming

**Privacy Section:**
- Add small lock icon (accent color)
- Lighter text weight (`400`)

**About Section:**
- Show companion logo (50-60px) above "About Jellit"
- Version number: Very subtle, light gray

---

## 🎨 Component Design Specifications

### Card Component

**Visual Style:**
```
Border Radius: 20-24px
Background: Linear gradient (#FDFFFE to #F7FAF9)
Shadow: 0px 4px 16px rgba(0,0,0,0.04)
Padding: 18-20px
Border: None (or very subtle 1px rgba(143,168,158,0.08))
```

**Variants:**
- **Default:** Floating with shadow
- **Flat:** Gradient background, no shadow
- **Accent:** Light primary gradient background

### Button Component

**Primary Button:**
```
Background: Gradient (#8FA89E to #91B5A8)
Border Radius: 16px
Padding: 14px 28px
Text: #FFFFFF, weight 500, 16px
Shadow: 0px 2px 8px rgba(143,168,158,0.2)
Hover/Tap: Opacity 0.9 + scale(0.98)
```

**Secondary Button:**
```
Background: #E8F1EE
Border Radius: 16px
Text: Primary color, weight 500
Border: None
Hover/Tap: Background darkens to #D4E3DE
```

**Outline Button:**
```
Background: Transparent
Border: 1.5px solid primary color
Border Radius: 16px
Text: Primary color
```

### Input Fields

```
Background: #EDF3F1
Border: 1px solid rgba(143,168,158,0.12)
Border Radius: 12px
Padding: 14px 16px
Font: 16px, weight 400
Placeholder: #9AABA5
Focus: Border color → Primary, subtle glow shadow
```

---

## 📐 Layout & Spacing Guidelines

### Screen Padding
- Horizontal: `20px` (maintain current)
- Top: `40px` for headers (maintain current)
- Bottom: `40px` for scroll containers

### Section Spacing
- Between sections: `20-24px`
- Between cards: `14-16px`
- Inside cards: `16-20px`

### Typography Spacing
- Headline to subtitle: `6px`
- Section title to content: `16px`
- Label to value: `4-6px`

### No Dividers
- Replace all `borderBottom` dividers with spacing
- If separation needed: Use subtle color shift or spacing increase to `24-28px`

---

## 🎭 Motion & Animation (React Native Compatible)

### Transitions
- **Duration:** 300-400ms (slow and gentle)
- **Easing:** `easeInOut` or custom bezier (0.4, 0.0, 0.2, 1.0)
- **Fade ins:** Opacity 0 → 1 over 350ms
- **Slide animations:** Max 20px distance, combined with fade

### Interactions
- **Button tap:** Scale 0.98, opacity 0.9 (100ms)
- **Card tap:** Scale 0.995 (subtle), opacity 0.95
- **Toggle switches:** Smooth slide (250ms)
- **Screen transitions:** Fade + slight horizontal slide (300ms)

### Animated Components (Use `react-native-reanimated`)
- Companion breathing: Scale 1.0 ↔ 1.02 (2s cycle, easeInOut)
- Stats counter: Number increment animation (500ms)
- Chart bars: Grow from 0 width on load (400ms, stagger 50ms)

### NO Bounce or Spring
- Avoid energetic/snappy animations
- No bouncy spring physics
- Nothing should feel "poppy"

---

## ✅ Design Checklist (Every Screen Must Pass)

Before finalizing any screen design:

### Visual Tone
- [ ] First impression feels calm, not clinical
- [ ] Would fit in a meditation app aesthetic
- [ ] No pure white or medical gray backgrounds
- [ ] Overall contrast is soft and readable

### Color & Gradients
- [ ] Backgrounds use off-white with warm tints
- [ ] Primary colors are sage/eucalyptus greens
- [ ] Gradients are subtle (5-15% opacity)
- [ ] No gradients on text or chart lines
- [ ] No warning red unless critical

### Typography
- [ ] Rounded or humanist sans-serif
- [ ] Medium weight (`500-600`) as default, not bold
- [ ] Headlines feel calm, not assertive
- [ ] No all-caps anywhere
- [ ] Line height 1.4-1.6 for readability

### Layout
- [ ] Generous vertical spacing (20-24px between sections)
- [ ] No table-like layouts or grids
- [ ] Dividers replaced by spacing
- [ ] Screen doesn't feel dense

### Cards & Surfaces
- [ ] Cards have large rounded corners (20-24px)
- [ ] Shadows are soft and wide (blur 12-16px)
- [ ] No hard borders on primary surfaces
- [ ] Gradients used for depth, not decoration

### Companion
- [ ] Companion appears in empty states only
- [ ] Never overlaps data or active logging
- [ ] Expression is calm and neutral
- [ ] Copy follows tone guidelines (see below)

### Motion
- [ ] Animations are slow (300-400ms)
- [ ] Gentle fades and subtle slides
- [ ] No bounce or spring effects
- [ ] Tap interactions scale softly

### Charts (Insights Screen)
- [ ] Muted colors (gradients encouraged)
- [ ] Rounded bar ends
- [ ] No sharp visual emphasis
- [ ] Includes calming interpretive copy below charts
- [ ] Feels observational, not diagnostic

### Empty States
- [ ] Intentional design, not "broken"
- [ ] Uses gradients and spacing
- [ ] Copy is encouraging without pressure
- [ ] No "missing data" language

### Final Polish
- [ ] Can one element be removed?
- [ ] Is this screen calmer with less?
- [ ] Does it pass the "meditation app" test?

---

## 💬 Copy & Tone Guidelines

### Voice Characteristics
- Calm, friendly, observant
- Reassuring, slightly optimistic
- NOT funny, clinical, motivational, or judgmental

### Allowed Words
✅ Noted, Gently, Common, Normal, Tends to, Often, Looks like, Over time, You might notice

### Forbidden Words
❌ Perfect/Imperfect, Optimal/Suboptimal, Warning, Failure, Missed, Should, Must, Irregular (use "varied")

### Empty State Copy (Ready to Use)

**No Entries Yet:**
- Headline: "Welcome to Jellit"
- Body: "This is a quiet place to notice patterns over time.\nThere's nothing to fix — just observe."

**No Entry Today:**
- Headline: "Nothing logged today"
- Body: "That's okay.\nNot every day needs a note."

**No Data This Week:**
- Headline: "A quiet week"
- Body: "When you're ready, pick up where you left off.\nYour body doesn't keep score."

**Long Gap:**
- Headline: "Welcome back"
- Body: "You can continue anytime.\nNothing was lost."

### Summary Insight Copy (Below Charts)
Single line maximum:
- "Variation like this is common."
- "Over time, timing tends to become clearer."
- "Comfort looks fairly steady."

---

## 🛠️ React Native Implementation Notes

### Gradient Component
```jsx
import { LinearGradient } from 'expo-linear-gradient';

// Card gradient example
<LinearGradient
  colors={['#FDFFFE', '#F7FAF9']}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }}
  style={{ borderRadius: 20, padding: 18 }}
>
  {/* Card content */}
</LinearGradient>
```

### Shadow Properties (React Native)
```jsx
shadowColor: '#000',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.04,
shadowRadius: 16,
elevation: 3, // Android
```

### Typography (System Fonts)
- iOS: Use SF Pro Rounded (system) or import custom font
- Android: Roboto or import custom font (Nunito Sans, DM Sans)

### Animation Library
- Use `react-native-reanimated` (already in dependencies)
- Avoid `Animated` API for complex animations

### Color Implementation
```jsx
// New color system in theme/colors.ts
export const colors = {
  primary: '#8FA89E',        // Sage green
  primaryLight: '#D4E3DE',   // Light sage
  primaryDark: '#6E8980',    // Deep sage
  secondary: '#A8C4BC',      // Mint
  secondaryLight: '#E8F1EE', // Light mint
  accent: '#7EA5A3',         // Blue-green
  background: '#F7FAF9',     // Tinted off-white
  surface: '#FDFFFE',        // Nearly white
  surfaceAlt: '#EDF3F1',     // Tinted surface
  textPrimary: '#2A3F38',    // Soft dark
  textSecondary: '#6B7F78',  // Sage gray
  textTertiary: '#9AABA5',   // Light sage gray
  error: '#D89B9B',          // Soft rose
  success: '#A8C4B3',        // Sage green
  warning: '#E8C9A6',        // Soft sand
};
```

---

## 📎 Assets & References

### Companion Character
- **File:** `assets/images/logo.png` (attach this file to your Figma AI request)
- **Description:** Simple, friendly mascot with calm expression
- **Usage:** Empty states, onboarding, summaries only

### Existing Components to Redesign
- `components/Card.tsx`
- `components/Button.tsx`
- `components/LoadingScreen.tsx`

### Screens to Redesign (Priority Order)
1. Dashboard (`app/(tabs)/index.tsx`) — First impression
2. Log Entry (`app/(tabs)/log.tsx`) — Core interaction
3. Insights (`app/(tabs)/insights.tsx`) — Data visualization challenge
4. History (`app/(tabs)/history.tsx`) — List/journal feel
5. Settings (`app/(tabs)/settings.tsx`) — Support/brand presence

---

## 🎯 Success Criteria

The redesign succeeds when:

1. **First Impression:** User opens app and thinks "peaceful wellness space" not "medical tracker"
2. **Emotional Safety:** Nothing feels judgmental, harsh, or clinical
3. **Visual Coherence:** Every screen uses consistent sage/mint palette with gentle gradients
4. **Companion Integration:** Character appears naturally in empty states with supportive copy
5. **Typography Hierarchy:** Gentle weights create calm, readable flow
6. **Motion Feel:** All interactions feel slow, smooth, and reassuring
7. **Data Presentation:** Charts and stats feel observational, not diagnostic
8. **Meditation App Test:** UI would not feel out of place next to Calm, Headspace, or Insight Timer

---

## 🚀 Deliverables Request

Please provide Figma designs for:

1. **Color System:** Palette with all specified sage/mint/blue-green colors
2. **Component Library:** Card, Button (3 variants), Input, Typography scale
3. **All 5 Screens:** Dashboard, Log, History, Insights, Settings (with empty states)
4. **Companion Integration:** Examples of companion in 4 empty states
5. **Motion Specs:** Transition timings and easing curves
6. **Gradient Examples:** 3-5 subtle gradient combinations for backgrounds/cards

**Export Formats:**
- High-fidelity mockups (PNG, 2x)
- Component specs with measurements
- Color codes (HEX)
- Typography specs (family, size, weight, line-height)

---

**Remember:** Serious about health. Gentle about being human.
