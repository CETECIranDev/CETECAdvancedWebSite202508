/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Configure paths to all of your template files
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  // 2. Enable dark mode based on the 'class' strategy
  darkMode: 'class',

  // 3. Extend the default theme with our custom design system
  theme: {
    extend: {
      // 4. Define our color palette using CSS variables from globals.css
      // This is the core of our theming system.
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      // 5. Set the default font family for the project
      fontFamily: {
        sans: ['IRANYekanX', 'sans-serif'],
      },

      // 6. Define custom keyframe animations
      keyframes: {
        'gradient-pulse': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'subtle-bob': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      // 7. Make the custom animations available as utility classes
      animation: {
        'gradient-pulse': 'gradient-pulse 8s ease-in-out infinite',
        'subtle-bob': 'subtle-bob 4s ease-in-out infinite',
      },

      // 8. (Optional) Custom background images if needed
      backgroundImage: {
        'hero-grid-dark': "url('/images/grid-dark.svg')",
        'hero-grid-light': "url('/images/grid-light.svg')",
      },
    },
  },

  // 9. Add any Tailwind plugins here
  plugins: [],
};