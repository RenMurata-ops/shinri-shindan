import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B4F8F',
          light: '#8B7FC7',
          lighter: '#B8AED8',
          dark: '#3D3460',
          darker: '#2A2340',
        },
        accent: {
          gold: '#D4AF37',
          rose: '#FFB6C1',
          aqua: '#7FDBFF',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#F8F7FC',
          tertiary: '#F0EDF7',
          elevated: '#FFFFFF',
        },
        text: {
          primary: '#1D1D1F',
          secondary: '#6E6E73',
          tertiary: '#86868B',
        },
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-ethereal': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'gradient-mystical': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Newsreader', 'YuMincho', 'Yu Mincho', 'serif'],
        display: ['SF Pro Display', 'Inter', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display-large': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '600' }],
        'title': ['1.25rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'subheadline': ['1.0625rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '600' }],
        'body': ['1.0625rem', { lineHeight: '1.47059', letterSpacing: '0.012em' }],
        'body-large': ['1.1875rem', { lineHeight: '1.4211', letterSpacing: '0.012em' }],
        'body-small': ['0.9375rem', { lineHeight: '1.53333', letterSpacing: '0.016em' }],
        'caption': ['0.8125rem', { lineHeight: '1.38462', letterSpacing: '0.016em' }],
        'label': ['0.9375rem', { lineHeight: '1.4', letterSpacing: '0.012em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow-purple': '0 0 20px rgba(91, 79, 143, 0.3)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-white': '0 0 30px rgba(255, 255, 255, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-up': 'scaleUp 0.4s ease-out',
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-20px) translateX(-10px)', opacity: '0.3' },
          '50%': { transform: 'translateY(20px) translateX(10px)', opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}

export default config
