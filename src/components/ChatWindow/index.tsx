import React, {useState, useEffect} from "react";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles, Theme} from "@material-ui/core/styles";
import ChatInput from "components/ChatInput";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        height: "82vh",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        // maxWidth: 300,
        backgroundColor: theme.palette.background.paper
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
}));

function ChatWindow(): JSX.Element {
    const classes = useStyles();
    const [messages, setMessage] = useState([]);
    const listRef = React.createRef<HTMLUListElement>();
    // const lRef = useRef<HTMLUListElement>(); // didn't work
    const itemRefs = {};

    useEffect(() => {
        console.log(
            listRef.current.lastChild,
            listRef.current.children[listRef.current.children.length - 1]
        );
        const lastElement = listRef.current.children[listRef.current.children.length - 1];
        lastElement?.scrollIntoView();
    }, [listRef]);

    const handleInputMessage = (message: string): void => {
        const currentMessages = [...messages];
        currentMessages.push(message);
        setMessage(currentMessages);
        console.log(messages, listRef.current);
    };

    return (
        <Container maxWidth="xl" className={classes.root} disableGutters>
            <Box component="div" className={classes.listContainer}>
                <List ref={listRef} className={classes.list}>
                    {messages.map((message) => {
                        return (
                            <ListItem button key={message} ref={(el) => (itemRefs[message] = el)}>
                                <ListItemText primary={message} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
            <Box className={classes.input}>
                <ChatInput onSubmit={handleInputMessage} />
            </Box>
        </Container>
    );
}

export default ChatWindow;
