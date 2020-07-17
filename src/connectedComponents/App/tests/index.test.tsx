import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ThemeProvider} from "@material-ui/core/styles";
import {StylesProvider} from "@material-ui/styles/";
import CssBaseline from "@material-ui/core/CssBaseline";

import GlobalResponsiveFont from "../../../globalResponsiveFont";
import {lightTheme} from "../../../theme";
import store from "../../../store/store";

import App from "../index";

function getPreparedPage(store, theme): JSX.Element {
    const generateClassName = (rule, styleSheet) =>
        `${styleSheet.options.classNamePrefix}-${rule.key}`;
    return (
        <Provider store={store}>
            <StylesProvider generateClassName={generateClassName}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalResponsiveFont />
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </ThemeProvider>
            </StylesProvider>
        </Provider>
    );
}

describe("<App />", () => {
    it("renders correctly and matches snapshot", () => {
        const {asFragment} = render(getPreparedPage(store, lightTheme));
        const initialRender = asFragment();
        expect(initialRender).toMatchSnapshot();
    });
    it("does not log errors in the console", () => {
        const spy = jest.spyOn(global.console, "error");
        render(getPreparedPage(store, lightTheme));
        expect(spy).not.toHaveBeenCalled();
    });
});
