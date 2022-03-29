module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                gochi: ["Gochi", "cursive"],
                sans: ["Roboto"]
            },
            colors: {
                glass: {
                    DEFAULT: "rgba(255,255,255,0.4)"
                },
                cherry: {
                    DEFAULT: '#D33148',
                    '50': '#F3C8CE',
                    '100': '#F0B7BF',
                    '200': '#E996A2',
                    '300': '#E17484',
                    '400': '#DA5366',
                    '500': '#D33148',
                    '600': '#A82437',
                    '700': '#7A1A28',
                    '800': '#4C1019',
                    '900': '#1D060A'
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