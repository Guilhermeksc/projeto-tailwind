/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background-color)',
        'table-bg': 'var(--table-bg)',
        'table-bg-alt': 'var(--table-bg-alt)',
        'table-hover': 'var(--table-hover)',
        'border': 'var(--border-color)',
        'text': 'var(--text-color)',
        'text-gray': 'var(--text-gray)',
      },
    },
  },
  plugins: [],
};