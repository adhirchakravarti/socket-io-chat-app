import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "82vh",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            // maxWidth: 300,
            backgroundColor: theme.palette.background.paper
        },
        chatContainer: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
        },
        listContainer: {
            display: "flex",
            height: "88%"
        },
        list: {
            width: "100%",
            overflowY: "auto"
        },
        input: {
            display: "flex",
            flexDirection: "row",
            // margin: "2rem",
            justifyContent: "center",
            alignItems: "stretch"
        }
    })
);

function UserSettings(): JSX.Element {
    const classes = useStyles();

    return (
        <Container maxWidth="xl" className={classes.root} disableGutters>
            <Paper className={classes.chatContainer} elevation={3}>
                <Box component="div" className={classes.listContainer}></Box>
            </Paper>
        </Container>
    );
}

export default UserSettings;
