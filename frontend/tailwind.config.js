/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myLightGray: "#F4F4F4",
        myGray: "#E6E6E6",
        myWhite: "#FFFFFF",
        myGreen: "#7CBC9A",
        myBlue: "#5386D7",
        myDarkGray: "#646464",
        myOrange: "#FF6600",
        myBlack: "#302A2B",
      },
      backgroundColor: {
        myBgLightGray: "#F4F4F4",
        myBgGray: "#E6E6E6",
        myBgWhite: "#FFFFFF",
        myBgGreen: "#7CBC9A",
        myBgBlue: "#5386D7",
        myBgDarkGray: "#646464",
        myBgOrange: "#FF6600",
        myBgBlack: "#302A2B",
      },
      borderRadius: {
        myXl: "1rem",
        my2xl: "2rem",
      },
      height: {
        "9/10": "90%",
        "100-minus-1rem": "calc(100% - 1rem)",
        "100-minus-4rem": "calc(100% - 4rem)",
        "1px": "1px",
      },
      minHeight: {
        16: "4rem",
      },
      fontFamily: {
        nunitoRegular: ["Nunito-Regular", "sans-serif"],
        nunitoXBold: ["Nunito-X-Bold", "sans-serif"],
      },
      maxWidth: {
        "250px": "250px",
      },
    },
  },
  plugins: [],
}
