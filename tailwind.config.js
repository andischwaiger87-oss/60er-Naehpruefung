/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#92a7a3",
                secondary: "#876d88",
                background: "#e3dddc",
                text: "#7c7a7c",
                white: "#ffffff",
            },
            fontFamily: {
                display: ['"Quicksand"', 'sans-serif'],
                body: ['"Inter"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
