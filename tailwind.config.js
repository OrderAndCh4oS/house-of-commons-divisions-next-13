/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            'swiss-coffee': {
                DEFAULT: '#E0D7D5',
                50: '#E3DBD9',
                100: '#E0D7D5',
                200: '#D7CCC9',
                300: '#CFC1BE',
                400: '#C6B5B2',
                500: '#BDAAA6',
                600: '#B59F9A',
                700: '#AC948F',
                800: '#A38983',
                900: '#9B7E77',
                950: '#967871'
            },
            'woodsmoke': {
                DEFAULT: '#141418',
                50: '#636377',
                100: '#5E5E71',
                200: '#555566',
                300: '#4C4C5B',
                400: '#424250',
                500: '#393945',
                600: '#303039',
                700: '#27272E',
                800: '#1D1D23',
                900: '#141418',
                950: '#08080A'
            },
        }
    },
    plugins: [],
}
