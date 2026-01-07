export const theme = {
  // ------------------------------------
  // FONT SYSTEM
  // ------------------------------------
  font: {
    family: "font-montserrat",

    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },

    size: {
      xs: "text-[12px]",
      sm: "text-[14px]",
      base: "text-[16px]",
      lg: "text-[18px]",
      xl: "text-[20px]",
      "2xl": "text-[24px]",
      "3xl": "text-[28px]",
      "4xl": "text-[36px]",
    },

    leading: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    },
  },

  // ------------------------------------
  // COLOR SYSTEM (DESIGN TOKENS)
  // ------------------------------------
  color: {
    // Core brand
    primary: "#008C8C",
    secondary: "#223F7F",
    accent: "#008C8C",
    dark: "#191919",

    // Text palette
    text: {
      main: "#1A2A44",
      dark: "#191919",
      textdesc: "#6B6B6B",
      light: "#FFFFFF",
      secondary: "#223F7F",
      muted: "#191919BF",
      grayish: "#374151",
      researchMuted: "#4B5563",
    },

    // Surface palette
    surface: {
      card: "#FFFFFF",
      soft: "#F9FAFB",
      section: "#F7FAFF",
      programCard: "#F7F9FC",
      drawer: "#223F7F",
      drawerSub: "#1C3569",
    },

    // Legacy alias for backward compatibility
    background: {
      white: "#FFFFFF",
      grey: "#D8DFEF",
      soft: "#F9FAFB",
      section: "#F7FAFF",
      programCard: "#F7F9FC",
    },

    // Border + overlay
    border: "#E5E7EB",
    overlayDark: "rgba(0,0,0,0.70)",
    overlayDarker: "rgba(0,0,0,0.85)",
    overlayLight: "rgba(0,0,0,0.30)",

    // Opacity variants
    extra: {
      dark80: "#191919CC",
         borderResearch: "rgba(7,7,7,0.2)",

      dark75: "#191919BF",
      dark10: "rgba(25,25,25,0.10)",
    },
  },



  // ------------------------------------
  // TAILWIND BACKGROUND UTILITY HELPERS
  // ------------------------------------
 bg: {
    white: "bg-white",
    soft: "bg-[#F9FAFB]",
    greybg: "#D8DFEF",
    section: "bg-[#F7FAFF]",
    programCard: "bg-[#F7F9FC]",
    sectionCard: "bg-[#EEF2F7]",
    brand: "bg-[#223F7F]",
  },


  // ------------------------------------
  // SHADOW TOKENS
  // ------------------------------------
  shadow: {
    card: "shadow-[0px_3.94px_13.09px_rgba(0,0,0,0.05)]",
    soft: "shadow-[0px_2px_8px_rgba(0,0,0,0.04)]",
  },

  // ------------------------------------
  // BORDER RADIUS
  // ------------------------------------
  radius: {
    sm: "rounded-[6px]",
    md: "rounded-[9.87px]",
    lg: "rounded-[12px]",
  },

  // ------------------------------------
  // SPACING TOKENS
  // ------------------------------------
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  // ------------------------------------
  // COMPONENT DESIGN TOKENS (GENERIC)
  // ------------------------------------
  components: {
    // Card base style (used across Nursing, Research, Dashboard, etc.)
    card: {
      base: `
        bg-white 
        border border-[#E5E7EB]
        rounded-[9.87px]
        flex flex-col
      `,
      padding: "p-[33px]",
      gap: "gap-[20px]",
    },

    // Icon container (general purpose)
    iconContainer: `
      w-[55.26px]
      h-[55.26px]
      flex items-center justify-center
      bg-[#008C8C]
      rounded-[9.87px]
      shrink-0
    `,

    iconSmall: `
      w-[40px]
      h-[40px]
      flex items-center justify-center
      shrink-0
    `,

    iconImage: `
      w-[28px]
      h-[28px]
      object-contain
    `,
  },
};
