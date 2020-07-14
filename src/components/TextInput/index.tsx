import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {marginType, inputSize, inputVariant} from "../../types/index";

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
        },
        input: {
            display: "flex",
            flexGrow: 1
        }
    })
);

interface TextInputProps {
    inputValue: string;
    onInputChange: (string) => void;
    onKeyPress: (string) => void;
    placeHolder: string;
    marginType: marginType;
    labelText: string;
    inputSize: inputSize;
    inputVariant: inputVariant;
}

function TextInput({
    inputValue,
    onInputChange,
    onKeyPress,
    placeHolder,
    marginType,
    labelText,
    inputSize,
    inputVariant
}: TextInputProps): React.FunctionComponentElement<TextInputProps> {
    const classes = useStyles();

    return (
        <TextField
            label={labelText || ""}
            placeholder={placeHolder}
            margin={marginType}
            InputLabelProps={{
                shrink: true
            }}
            variant={inputVariant}
            size={inputSize}
            className={classes.input}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            value={inputValue}
        />
    );
}

export default TextInput;
