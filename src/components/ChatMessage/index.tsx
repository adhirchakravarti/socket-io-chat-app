import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {Message as ChatMessage} from "../ChatWindow/types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (props: {sender: string}) => {
            console.log(props);
            const {sender} = props;
            if (sender === "other") {
                return {
                    backgroundColor: theme.palette.type === "light" ? "#e0e0e0" : "#424242",
                    width: "fit-content",
                    margin: "0rem 6rem 1rem 1rem",
                    alignSelf: "flex-start",
                    wordBreak: "break-word"
                };
            }
            return {
                backgroundColor: theme.palette.type === "light" ? "#ffffe0" : "#eeeeee",
                color: theme.palette.common.black,
                width: "fit-content",
                margin: "0rem 1rem 1rem 6rem",
                alignSelf: "flex-end",
                wordBreak: "break-word"
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
                <Typography variant="h6" gutterBottom>
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
