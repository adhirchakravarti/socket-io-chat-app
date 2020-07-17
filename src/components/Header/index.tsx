import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

interface HeaderProps {
    title: string;
}

function Header({title}: HeaderProps): React.FunctionComponentElement<HeaderProps> {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">{title}</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
