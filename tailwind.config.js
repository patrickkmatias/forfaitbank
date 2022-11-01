/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/styles.css",
    "./src/index.html",
    "./src/app/app.component.html",
    "./src/app/app.component.css",
    "./src/app/pages/login/login.component.html",
    "./src/app/pages/login/login.component.css",
    "./src/app/pages/painel/painel.component.html",
    "./src/app/pages/painel/painel.component.css",
    "./src/app/components/login-form/login-form.component.html",
    "./src/app/components/login-form/login-form.component.css",
    "./src/app/components/register-form/register-form.component.html",
    "./src/app/components/register-form/register-form.component.css",
    "./src/app/components/user-detail/user-detail.component.html",
    "./src/app/components/user-detail/user-detail.component.css",
    "./src/app/components/operation/operation.component.html",
    "./src/app/components/operation/operation.component.css",
    "./src/app/components/operations-table/operations-table.component.html",
    "./src/app/components/operations-table/operations-table.component.css",
    "./src/app/components/operation-form/operation-form.component.html",
    "./src/app/components/operation-form/operation-form.component.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
