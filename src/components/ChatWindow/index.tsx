import React from "react";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ChatInput from "components/ChatInput";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        // maxWidth: 300,
        backgroundColor: theme.palette.background.paper
    },
    list: {
        display: "flex",
        height: "90%"
    },
    input: {
        display: "flex",
        flexDirection: "row",
        // margin: "2rem",
        justifyContent: "center",
        alignItems: "stretch"
    }
}));

function renderRow(props) {
    const {index, style} = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

function ChatWindow(): JSX.Element {
    const classes = useStyles();
    const theme = useTheme();
    const xtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
    const small = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Container maxWidth="xl" className={classes.root} disableGutters>
            {/* <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                alignContent="stretch"
                xl={12}
                className={classes.root}
                wrap="nowrap"
            > */}
            {/* <Grid className={classes.list} item xl={12} lg={12} md={12} sm={12} xs={12}> */}
            <Box component="div" className={classes.list}>
                <AutoSizer>
                    {({height, width}) => (
                        <FixedSizeList
                            className="List"
                            height={height}
                            itemCount={1000}
                            itemSize={35}
                            width={width}
                        >
                            {renderRow}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </Box>
            {/* </Grid> */}
            {/* <Grid className={classes.input} item xl={12} lg={12} md={12} sm={12} xs={12}> */}
            <Box className={classes.input}>
                <ChatInput />
            </Box>
            {/* </Grid> */}
            {/* </Grid> */}
            {/* <FixedSizeList height={400} itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList> */}
        </Container>
    );
}

export default ChatWindow;
