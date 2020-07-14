import React from "react";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {Message as ChatMessage} from "../../Types/index";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "fit-content",
            margin: "0rem 0rem 1rem 0rem",
            alignSelf: "center"
        }
    })
);

interface ServerMessageProps {
    message: ChatMessage;
}

function ServerMessage({
    message
}: ServerMessageProps): React.FunctionComponentElement<ServerMessageProps> {
    const classes = useStyles();
    return (
        <Typography variant="subtitle1" gutterBottom className={classes.root}>
            {`[Server]: ${message.text}`}
        </Typography>
    );
}

export default ServerMessage;
