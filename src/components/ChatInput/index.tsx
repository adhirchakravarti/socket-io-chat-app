import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
            margin: "1rem",
            "& > * + *": {
                margin: "0rem 0rem 0rem 1rem"
            }
        },
        input: {
            display: "flex",
            flexGrow: 1
        }
    })
);

function ChatInput(): JSX.Element {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField
                id="outlined-full-width"
                label="Label"
                placeholder="Enter chat message..."
                margin="dense"
                InputLabelProps={{
                    shrink: true
                }}
                variant="outlined"
                size="small"
                className={classes.input}
            />
            <Button variant="contained" size="large" color="secondary">
                Send
            </Button>
        </div>
    );
}

export default ChatInput;
