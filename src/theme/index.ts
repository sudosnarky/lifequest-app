// Theme colors - Beige and Navy Blue color scheme
export const colors = {
  // Primary Navy Blues
  navy: {
    dark: '#1e3a5f',      // Dark navy for primary elements
    main: '#2c5f8d',      // Main navy for headers
    light: '#4a8cc7',     // Light navy for accents
    lighter: '#7bb3e0',   // Very light navy for hover states
  },
  
  // Beige Tones
  beige: {
    light: '#f5e6d3',     // Light beige for backgrounds
    main: '#e8d5bd',      // Main beige for cards
    dark: '#d4c4a8',      // Dark beige for borders
    darker: '#c0ad8f',    // Darker beige for subtle elements
  },
  
  // RPG Element Colors
  health: '#dc143c',      // Crimson red for health
  experience: '#ffd700',  // Gold for experience
  mana: '#4169e1',        // Royal blue for mana
  gold: '#daa520',        // Goldenrod for currency
  
  // Task Type Colors (adjusted for beige/navy theme)
  habit: '#8b4789',       // Purple for habits
  daily: '#2c5f8d',       // Navy blue for dailies
  todo: '#c17817',        // Bronze for todos
  reward: '#cd7f32',      // Bronze for rewards
  
  // Functional Colors
  success: '#5a8f5a',     // Muted green
  danger: '#b94a48',      // Muted red
  warning: '#d9a441',     // Muted yellow/gold
  info: '#4a8cc7',        // Light navy
  
  // Neutral Colors
  white: '#ffffff',
  black: '#000000',
  gray: {
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
  
  // Status Colors
  transparent: 'transparent',
  overlay: 'rgba(30, 58, 95, 0.7)',  // Navy overlay
};

// Typography
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.navy.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: colors.navy.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.navy.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Layout
export const layout = {
  containerPadding: spacing.md,
  cardPadding: spacing.md,
  headerHeight: 60,
  tabBarHeight: 60,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
};
