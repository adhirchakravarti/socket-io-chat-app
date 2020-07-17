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

import ChatWindow from "../index";

const mockProps = {
    maxHeight: 73,
    parentHeight: 600,
    isPortrait: true
};

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
                        <ChatWindow {...mockProps} />
                    </MemoryRouter>
                </ThemeProvider>
            </StylesProvider>
        </Provider>
    );
}

describe("<ChatWindow />", () => {
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
