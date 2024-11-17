/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                main: "#6699CC",
                secondary: "#336699",
                active: "#336699",
                border: "#d7d5d5",
            },
        },
    },
    plugins: [],
};