/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/styles.css",
    "./src/app/app.component.html",
    "./src/app/app.component.css",
    "./src/app/pages/**/**.{html,css}",
    "./src/app/components/**/**.{html,css,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
