import React from "react";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Linkify from "linkifyjs/react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {Message as ChatMessage} from "../../types/index";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (props: {sender: string}) => {
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
        },
        metaContainer: {
            display: "flex",
            justifyContent: "flex-start",
            margin: "0rem 0rem 1rem 0rem",
            [theme.breakpoints.down("xs")]: {
                display: "flex",
                flexDirection: "column"
            },
            "@media (max-width: 300px)": {
                maxWidth: "90%"
            }
        },
        image: {
            maxWidth: "12rem",
            maxHeight: "6.5rem",
            margin: "0rem 0rem 0rem 1rem",
            [theme.breakpoints.down("xs")]: {
                margin: "1rem 0rem 0rem 0rem"
            }
        }
    })
);

interface MessageProps {
    message: ChatMessage;
    sender: string;
    clock: string;
}

function ChatMessage({
    message,
    sender,
    clock
}: MessageProps): React.FunctionComponentElement<MessageProps> {
    const classes = useStyles({sender});
    const timeFormat = clock === "24" ? "MMM D YYYY HH:mm:ss" : "MMM D YYYY h:mm:ss a";
    return (
        <Paper elevation={4} className={classes.root}>
            <Box className={classes.container}>
                <Typography variant="h6" gutterBottom>
                    <Linkify>{message.text}</Linkify>
                </Typography>
                {message.links &&
                    message.links.map((link) => {
                        return (
                            <Box className={classes.metaContainer} key={link.url}>
                                <Box>
                                    <Typography>{link.title}</Typography>
                                    <Typography variant="caption">{link.description}</Typography>
                                </Box>
                                <Box>
                                    <img className={classes.image} src={link.image} alt="Image" />
                                </Box>
                            </Box>
                        );
                    })}
                <Typography variant="caption" gutterBottom>
                    {message.sender}
                </Typography>
                <Typography variant="caption" gutterBottom>
                    {moment(message.time).format(timeFormat)}
                </Typography>
            </Box>
        </Paper>
    );
}

export default ChatMessage;
