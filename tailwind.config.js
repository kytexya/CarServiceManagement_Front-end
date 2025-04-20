/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077B6',
        secondary: '#90E0EF',
        highlight: '#1890ff',
        muted: '#F5F5F5',
        background: '#E9ECEF',
        success: '#2ECC71',
        warning: '#F39C12',
        yellow: '#ffd333',
        danger: '#E74C3C',
        dark: '#1C1C1C',
        gray: {
          100: '#F9FAFB',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
        },
      },
    },
  },
  plugins: [],
}
