import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {Message as ChatMessage} from "../ChatWindow/types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
    createStyles({
        root: (props: {sender: string}) => {
            console.log(props);
            const {sender} = props;
            if (sender === "other") {
                return {
                    backgroundColor: "#ffffe0",
                    width: "fit-content",
                    margin: "0rem 0rem 1rem 1rem",
                    alignSelf: "flex-start"
                };
            }
            return {
                backgroundColor: "#f2f2f2",
                width: "fit-content",
                margin: "0rem 1rem 1rem 0rem",
                alignSelf: "flex-end"
            };
        },
        container: {
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem 1rem"
        }
    })
);

interface MessageProps {
    message: ChatMessage;
    sender: string;
}

function ChatMessage({
    message,
    sender
}: MessageProps): React.FunctionComponentElement<MessageProps> {
    const classes = useStyles({sender});
    return (
        <Paper elevation={4} className={classes.root}>
            <Box className={classes.container}>
                <Typography variant="body2" gutterBottom>
                    {message.text}
                </Typography>
                <Typography variant="caption" gutterBottom>
                    {message.sender}
                </Typography>
            </Box>
        </Paper>
    );
}

export default ChatMessage;
