/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/styles.css",
    "./src/app/app.component.html",
    "./src/app/pages/**/**.{html,css}",
    "./src/app/components/**/**.{html,css,ts}",
    "./src/app/services/uifeedback.service.ts"
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto-1': 'repeat(1, auto)',
        'auto-3': 'repeat(3, auto)',
      },
      gridTemplateColumns: {
        'auto-2': 'repeat(2, auto)',
      }
    },
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
