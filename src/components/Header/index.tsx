import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));
interface HeaderProps {
    title: string;
}

function Header({title}: HeaderProps): JSX.Element {
    const classes = useStyles();

    const handleClick = (): void => {
        console.log("header click!");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleClick}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">{title}</Typography>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    title: PropTypes.string
};

export default Header;
