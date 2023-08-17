module.exports = {
  mode: 'jit',
  content: ['./src/**/*.js', './public/index.html'],
  theme: {
    extend: {
      height: {
        logoutBar: '52px',
      },
      colors: {
        highlightPurple: '#8a70b8',
        coolGray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          150: '#ededf0',
          200: '#e5e7eb',
          250: '#dcdfe4',
          300: '#d1d5db',
          350: '#c6cace',
          400: '#9ca3af',
          450: '#868c96',
          500: '#6b7280',
          550: '#5a5f69',
          600: '#4b5563',
          650: '#3f4754',
          700: '#374151',
          750: '#2e353f',
          800: '#1f2937',
          850: '#161f28',
          900: '#111827',
          950: '#030712',
        },
      },
    },
  },
  variants: [],
  plugins: [],
};
