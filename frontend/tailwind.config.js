/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myLightGray: "#F4F4F4",
        myGray: "#E6E6E6",
        myWhite: "#FFFFFF",
        myDarkGray: "#646464",
        myBlack: "#302A2B",
        myGreen: "#7CBC9A",
        myBlue: "#5386D7",
        myOrange: "#FF6600",
        myRed: "#E45D55",
        myPurple: "#A665AD",
        myYellow: "#F6C747",
        myPink: "#F58FB4",
        myTeal: "#47C9C9",
        myZinc: "#A0AEC0",
        myBrown: "#8B5C2F",
      },
      backgroundColor: {
        myBgLightGray: "#F4F4F4",
        myBgGray: "#E6E6E6",
        myBgWhite: "#FFFFFF",
        myBgDarkGray: "#646464",
        myBgBlack: "#302A2B",
        myBgGreen: "#7CBC9A",
        myBgBlue: "#5386D7",
        myBgOrange: "#FF6600",
        myBgRed: "#E45D55",
        myBgPurple: "#A665AD",
        myBgYellow: "#F6C747",
        myBgPink: "#F58FB4",
        myBgTeal: "#47C9C9",
        myBgZinc: "#A0AEC0",
        myBgBrown: "#8B5C2F",
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
