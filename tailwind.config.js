/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/web/src/**/*.{html,ts,scss}",
    "./apps/borrower/src/**/*.{html,ts,scss}",
    "./apps/owner/src/**/*.{html,ts,scss}",
    "./apps/admin/src/**/*.{html,ts,scss}",
    "./libs/**/*.{html,ts,scss,mjs}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0F1D',
        'obsidian-light': '#0F1629',
        'obsidian-card': 'rgba(15, 23, 42, 0.5)',
        'emerald-trust': '#10B981',
        'indigo-electric': '#6366F1',
        'amber-warning': '#F59E0B',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-border-hover': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        '3xl': '64px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.3)',
        'card-hover': '0 20px 60px -15px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
