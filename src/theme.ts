import {createMuiTheme} from "@material-ui/core";

export const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#0d47a1"
        },
        secondary: {
            main: "#689f38"
        }
    }
});

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#29b6f6"
        },
        secondary: {
            main: "#689f38"
        },
        background: {
            paper: "#212121",
            default: "#000"
        },
        contrastThreshold: 5
    }
});
