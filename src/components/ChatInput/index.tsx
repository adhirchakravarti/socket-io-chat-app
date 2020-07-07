import React, {useState} from "react";
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

interface ChatInputProps {
    onSubmit: (message: string) => void;
}

function ChatInput({onSubmit}: ChatInputProps): JSX.Element {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log(e.target.value);
        const {value} = e.target;
        setInputValue(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        // console.log(e, e.target);
        e.preventDefault();
        if (inputValue.trim().length > 0) {
            onSubmit(inputValue);
            setInputValue("");
        }
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
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
                onChange={handleInputChange}
                value={inputValue}
            />
            <Button variant="contained" size="large" color="secondary" type="submit">
                Send
            </Button>
        </form>
    );
}

export default ChatInput;
