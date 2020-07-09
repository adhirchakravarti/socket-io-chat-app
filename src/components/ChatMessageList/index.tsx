import React, {useEffect} from "react";
import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {Message} from "../ChatWindow/types";
import ChatMessage from "../ChatMessage";
import ServerMessage from "../ServerMessage";

const useStyles = makeStyles(() =>
    createStyles({
        list: {
            width: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column"
        }
    })
);

interface ChatMessageListProps {
    messages: Message[];
    userName: string;
}

function ChatMessageList({
    messages,
    userName
}: ChatMessageListProps): React.FunctionComponentElement<ChatMessageListProps> {
    const classes = useStyles();
    const listRef = React.createRef<HTMLUListElement>();
    useEffect(() => {
        const lastElement = listRef.current.children[listRef.current.children.length - 1];
        lastElement?.scrollIntoView();
    }, [messages]);
    return (
        <List ref={listRef} className={classes.list}>
            {messages?.length > 0 &&
                messages?.map((message) => {
                    const sender = message.sender === userName ? "self" : "other";
                    if (message.sender === "Server") {
                        return <ServerMessage key={message.id} message={message} />;
                    }
                    return <ChatMessage key={message.id} message={message} sender={sender} />;
                })}
        </List>
    );
}

export default ChatMessageList;
