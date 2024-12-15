/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-a0": "#99e7b8",
                "primary-a10": "#a5eac0",
                "primary-a20": "#b1edc8",
                "primary-a30": "#bdefcf",
                "primary-a40": "#c8f2d7",
                "primary-a50": "#d3f5df",

                "surface-a0": "#121212",
                "surface-a10": "#282828",
                "surface-a20": "#3f3f3f",
                "surface-a30": "#575757",
                "surface-a40": "#717171",
                "surface-a50": "#8b8b8b",

                "surface-tonal-a0": "#1e2420",
                "surface-tonal-a10": "#333835",
                "surface-tonal-a20": "#494e4b",
                "surface-tonal-a30": "#606562",
                "surface-tonal-a40": "#797d7a",
                "surface-tonal-a50": "#929593",
            },
        },
    },
    plugins: [],
};
