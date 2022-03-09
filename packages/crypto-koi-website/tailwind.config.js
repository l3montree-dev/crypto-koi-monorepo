module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                cherry: {
                    DEFAULT: '#D94D61',
                    '50': '#F9E4E7',
                    '100': '#F6D3D8',
                    '200': '#EFB2BB',
                    '300': '#E7909D',
                    '400': '#E06F7F',
                    '500': '#D94D61',
                    '600': '#C42A40',
                    '700': '#962031',
                    '800': '#681622',
                    '900': '#390C13'
                },
                soft: {
                    DEFAULT: '#FFF6F1',
                    '50': '#FFFFFF',
                    '100': '#FFFFFF',
                    '200': '#FFFFFF',
                    '300': '#FFFFFF',
                    '400': '#FFFFFF',
                    '500': '#FFF6F1',
                    '600': '#FFD2B9',
                    '700': '#FFAE81',
                    '800': '#FF8A49',
                    '900': '#FF6611'
                },
                sea: {
                    DEFAULT: '#32324D',
                    '50': '#8686B0',
                    '100': '#7A7AA8',
                    '200': '#626297',
                    '300': '#52527E',
                    '400': '#424266',
                    '500': '#32324D',
                    '600': '#1C1C2B',
                    '700': '#060609',
                    '800': '#000000',
                    '900': '#000000'
                }
            }
        }
    },
    plugins: [],
}