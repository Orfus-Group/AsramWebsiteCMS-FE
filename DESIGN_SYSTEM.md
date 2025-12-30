# 🎨 Sign-In Page - Design System & Component Specifications

## Color Palette

### Primary Colors
```css
--primary-blue: #2B5697;
--primary-dark: #1E3A5F;
--primary-darker: #0F1E3D;
--secondary-blue: #4A90E2;
```

### Text Colors
```css
--text-primary: #1E3A5F;
--text-secondary: #374151;
--text-tertiary: #6B7280;
--text-placeholder: #9CA3AF;
```

### Background Colors
```css
--bg-primary: #FFFFFF;
--bg-secondary: #F8F9FA;
--bg-tertiary: #F3F4F6;
--bg-hover: #F9FAFB;
```

### Border Colors
```css
--border-default: #D1D5DB;
--border-hover: #9CA3AF;
--border-focus: #2B5697;
```

### Status Colors
```css
--error: #DC2626;
--error-bg: #FEF2F2;
--error-border: #FCA5A5;
--success: #059669;
--warning: #D97706;
```

## Typography

### Font Families
```css
--font-serif: "Playfair Display", serif;
--font-sans: "Montserrat", system-ui, sans-serif;
```

### Font Sizes & Line Heights
```css
/* Headings */
--h1: 48px / 56px;  /* Page title */
--h2: 40px / 52px;  /* Section title */
--h3: 24px / 32px;  /* Card title */

/* Body */
--body-large: 18px / 28px;
--body: 16px / 24px;
--body-small: 14px / 20px;
--caption: 12px / 16px;
```

### Font Weights
```css
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

## Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-30: 120px;
```

## Component Specifications

### Logo Component

#### Full Logo
- **Icon Size**: 64px × 64px
- **Text Size**: 48px / 56px
- **Font**: Playfair Display, Bold (700)
- **Tagline Size**: 12px / 16px, Letter spacing: 0.08em
- **Spacing**: 12px between icon and text
- **Tagline Left Padding**: 76px (aligned with text)

#### Icon Only
- **Size**: 48px × 48px

### Input Component

#### Dimensions
- **Height**: 44px
- **Padding**: 14px horizontal, 12px vertical
- **Left Padding (with icon)**: 44px
- **Right Padding (with icon)**: 44px
- **Border Width**: 1px
- **Border Radius**: 8px

#### States
```css
/* Default */
border: 1px solid #D1D5DB;
background: #FFFFFF;

/* Hover */
border: 1px solid #9CA3AF;

/* Focus */
border: transparent;
ring: 2px solid #2B5697;

/* Error */
border: 1px solid #DC2626;
ring: 2px solid #DC2626;

/* Disabled */
background: #F3F4F6;
color: #9CA3AF;
cursor: not-allowed;
```

#### Icon
- **Size**: 20px × 20px
- **Position**: 14px from edge
- **Color**: #6B7280

#### Label
- **Size**: 14px / 20px
- **Weight**: 500 (Medium)
- **Color**: #374151
- **Margin Bottom**: 8px

#### Error Message
- **Size**: 12px / 16px
- **Weight**: 500 (Medium)
- **Color**: #DC2626
- **Margin Top**: 6px

### Button Component

#### Primary Button
```css
/* Default */
background: #2B5697;
color: #FFFFFF;
height: 44px;
padding: 0 20px;
border-radius: 8px;
font-size: 16px / 24px;
font-weight: 600;
shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Hover */
background: #1E3A5F;

/* Active */
background: #0F1E3D;

/* Focus */
ring: 2px #2B5697;
ring-offset: 2px;

/* Disabled */
opacity: 0.6;
cursor: not-allowed;
```

#### Secondary Button
```css
/* Default */
background: #FFFFFF;
color: #2B5697;
border: 2px solid #2B5697;

/* Hover */
background: #F8F9FA;

/* Active */
background: #E5E7EB;
```

#### Sizes
```css
/* Small */
height: 36px;
padding: 0 16px;
font-size: 14px / 20px;

/* Medium (Default) */
height: 44px;
padding: 0 20px;
font-size: 16px / 24px;

/* Large */
height: 52px;
padding: 0 24px;
font-size: 18px / 28px;
```

### Checkbox Component

#### Dimensions
- **Size**: 18px × 18px
- **Border Width**: 2px
- **Border Radius**: 4px
- **Label Margin**: 8px left

#### States
```css
/* Default */
border: 2px solid #D1D5DB;
background: #FFFFFF;

/* Hover */
border: 2px solid #9CA3AF;

/* Checked */
background: #2B5697;
border: 2px solid #2B5697;

/* Focus */
ring: 2px #2B5697;
ring-offset: 2px;

/* Disabled */
background: #F3F4F6;
cursor: not-allowed;
```

#### Checkmark
- **Color**: #FFFFFF
- **Stroke Width**: 2px

### Card Component (Sign-In Form)

#### Dimensions
- **Width**: 400px max
- **Padding**: 40px
- **Border Radius**: 12px
- **Shadow**: 0 2px 12px rgba(0, 0, 0, 0.08)
- **Background**: #FFFFFF

#### Title
- **Size**: 24px / 32px
- **Font**: Montserrat, Semibold (600)
- **Color**: #1E3A5F
- **Margin Bottom**: 32px

## Layout Specifications

### Desktop Layout (1200px+)

```
┌─────────────────────────────────────────────────────────────┐
│                         Container                           │
│  Max Width: 1200px, Gap: 120px                             │
│                                                             │
│  ┌──────────────────────┐    ┌────────────────────────┐   │
│  │   Left Section       │    │   Right Section        │   │
│  │   (Branding)         │    │   (Sign-In Form)       │   │
│  │                      │    │                        │   │
│  │  • Logo              │    │  Form Card:           │   │
│  │  • Headline          │    │  - Width: 400px       │   │
│  │    (max-width:480px) │    │  - Padding: 40px      │   │
│  │                      │    │  - Inputs: 24px gap   │   │
│  └──────────────────────┘    └────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Page Layout
- **Background**: #F8F9FA
- **Min Height**: 100vh
- **Padding**: 32px horizontal, 32px vertical
- **Content Alignment**: Center (vertical and horizontal)

## Interactions & Animations

### Transitions
```css
/* Default transition */
transition: all 200ms ease;

/* Focus ring */
transition: ring 200ms ease;

/* Hover states */
transition: background-color 200ms ease, border-color 200ms ease;
```

### Loading Spinner
- **Size**: 20px × 20px
- **Animation**: Spin (1s linear infinite)
- **Position**: Left of button text, margin-right: 12px

### Password Toggle
- **Icon Size**: 20px × 20px
- **Hover**: Background: #F3F4F6, Opacity: 100%
- **Padding**: 4px
- **Border Radius**: 4px

## Accessibility

### Focus Indicators
- All interactive elements have visible focus rings
- Focus ring: 2px solid #2B5697 with 2px offset

### Keyboard Navigation
- Tab order follows visual flow
- Enter key submits form
- Space toggles checkbox

### Text Contrast
- All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)

### Screen Readers
- Form labels properly associated with inputs
- Error messages announced
- Loading states announced
- Button states announced

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  /* Stack layout vertically */
  /* Form full width with padding */
  /* Reduce spacing */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {
  /* Adjust gap between sections */
  /* Reduce max widths */
}

/* Desktop */
@media (min-width: 1200px) {
  /* Side-by-side layout */
  /* Full specifications as defined */
}
```

## Shadow Definitions

```css
/* Card shadow */
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

/* Button shadow */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Focus ring shadow */
box-shadow: 0 0 0 2px rgba(43, 86, 151, 1);
```

## Icon Specifications

### Input Icons
- **Size**: 20px × 20px
- **Stroke Width**: 1.5px
- **Stroke Color**: #6B7280
- **Position**: Absolute, vertically centered

### Password Toggle Icons
- **Eye Open**: Visible password
- **Eye Closed**: Hidden password
- **Interaction**: Click to toggle

## Error States

### Input Error
```css
border-color: #DC2626;
focus:ring: 2px solid #DC2626;
```

### Error Message
```css
color: #DC2626;
font-size: 12px / 16px;
font-weight: 500;
margin-top: 6px;
```

### Error Alert (General)
```css
padding: 12px;
background: #FEF2F2;
border: 1px solid #FCA5A5;
border-radius: 8px;
color: #DC2626;
font-size: 14px / 20px;
font-weight: 500;
```

## Grid System

The layout uses CSS Flexbox with specific gap values:
- Main content gap: 120px
- Form elements gap: 24px
- Inline elements gap: 8px

## Best Practices

1. **Consistency**: All measurements follow the 4px spacing scale
2. **Accessibility**: All interactive elements are keyboard accessible
3. **Responsiveness**: Layout adapts to all screen sizes
4. **Performance**: Minimal re-renders, optimized state management
5. **Maintainability**: Reusable components with clear props
6. **Scalability**: Service layer ready for API integration
