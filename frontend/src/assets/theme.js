import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#F29F58",
        },
        secondary: {
            main: "#AB4459",
        },
        background: {
            default: "#1B1833",
            paper: "#441752",
        },
        text: {
            primary: "#F3E5F5",
            secondary: "#F29F58",
        },
        chart: {
            colors: ["#FCC737", "#F26B0F", "#E73879", "#7E1891"],
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
    },
});

export default theme;