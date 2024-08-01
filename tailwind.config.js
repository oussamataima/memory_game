/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
 
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1110px",
      },
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        md: "3.5rem",

      }
    },
    extend: {
      borderRadius: {
        "2xl": "20px",
        "3xl": "26px",
      },
      colors: {
        yellowOrange: "#FDA214",
        lightGray: "#BCCED9",
        white: "#FCFCFC",
        darkBlue: "#152938",
        tealBlue: "#304859",
        lightestGray: "#F2F2F2",
        blueGray: "#7191A5",
        darkerTealBlue: "#6395B8",
        darkLightGray: "#DFE7EC",
        blueDarkGray: "#7191A5",
      },
    },
  },
  plugins: [],
};
