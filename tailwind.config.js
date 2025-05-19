module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary-500)',
        },
        // Neutral colors
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        // Semantic colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        // Processing colors
        processing: {
          50: 'var(--color-processing-50)',
          100: 'var(--color-processing-100)',
          200: 'var(--color-processing-200)',
          300: 'var(--color-processing-300)',
          400: 'var(--color-processing-400)',
          500: 'var(--color-processing-500)',
          600: 'var(--color-processing-600)',
          700: 'var(--color-processing-700)',
          800: 'var(--color-processing-800)',
          900: 'var(--color-processing-900)',
          DEFAULT: 'var(--color-processing-500)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],      // Caption
        sm: ['14px', { lineHeight: '20px' }],      // Body Small
        base: ['16px', { lineHeight: '24px' }],    // Body
        lg: ['18px', { lineHeight: '28px' }],      // Body Large
        xl: ['20px', { lineHeight: '28px' }],      // Heading 3
        '2xl': ['24px', { lineHeight: '32px' }],   // Heading 2
        '3xl': ['30px', { lineHeight: '36px' }],   // Heading 1
        '4xl': ['36px', { lineHeight: '40px' }],   // Display
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'pulse-custom': 'pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}