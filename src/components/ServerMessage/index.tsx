import React from "react";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {Message as ChatMessage} from "../ChatWindow/types";
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
        // <Paper elevation={3} className={classes.root} square>
        //     <Box className={classes.container}>
        //         <Typography variant="body2" gutterBottom>
        //             {`[Server]: ${message.text}`}
        //         </Typography>
        //         <Typography variant="caption" gutterBottom>
        //             {message.sender}
        //         </Typography>
        //     </Box>
        // </Paper>
        <Typography variant="subtitle1" gutterBottom className={classes.root}>
            {`[Server]: ${message.text}`}
        </Typography>
    );
}

export default ServerMessage;
