import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import TextInput from "../TextInput";
import {marginType, inputSize, inputVariant} from "../../types/index";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() =>
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
        }
    })
);

interface ChatInputProps {
    onSubmit: (message: string) => void;
    sendMessageOnCtrlEnter: string;
}

function ChatInput({onSubmit, sendMessageOnCtrlEnter}: ChatInputProps): JSX.Element {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = e.target;
        setInputValue(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey && sendMessageOnCtrlEnter === "true") {
            handleSubmit();
        }
    };

    const handleSubmit = (): void => {
        if (inputValue.trim().length > 0) {
            onSubmit(inputValue);
            setInputValue("");
        }
    };

    return (
        <Box className={classes.root}>
            <TextInput
                labelText="Chat"
                placeHolder={`Enter chat message and ${
                    sendMessageOnCtrlEnter === "true"
                        ? "press Ctrl + Enter to send"
                        : "click the send button"
                }`}
                marginType={marginType.dense}
                inputSize={inputSize.small}
                inputVariant={inputVariant.outlined}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <Button
                variant="contained"
                size="large"
                color="secondary"
                type="button"
                onClick={handleSubmit}
            >
                Send
            </Button>
        </Box>
    );
}

export default ChatInput;
