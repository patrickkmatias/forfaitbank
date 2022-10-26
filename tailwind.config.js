/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/styles.css",
    "./src/index.html",
    "./src/app/app.component.html",
    "./src/app/app.component.css",
    "./src/app/pages/login/login.component.html",
    "./src/app/pages/login/login.component.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
