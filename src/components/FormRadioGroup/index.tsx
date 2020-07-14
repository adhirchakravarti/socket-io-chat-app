import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        radioGroup: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        },
        formControl: {
            margin: theme.spacing(3),
            display: "flex",
            flexGrow: 1
        }
    })
);

interface FormRadioGroupProps {
    label: string;
    onChange: (value) => void;
    value: string | boolean | number;
    radioLabels: string[];
    radioValues: string[] | number[] | boolean[];
}

function FormRadioGroup({
    label,
    onChange,
    value,
    radioLabels,
    radioValues
}: FormRadioGroupProps): React.FunctionComponentElement<FormRadioGroupProps> {
    console.log("Props at FormRadioGroup = ", value);
    const classes = useStyles();
    const handleValueChange = (e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
        const {value} = e.target;
        onChange(value);
    };

    return (
        <FormControl className={classes.formControl} fullWidth>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                aria-label={label}
                name={label}
                value={value}
                onChange={handleValueChange}
                className={classes.radioGroup}
            >
                <FormControlLabel
                    value={radioValues[0]}
                    control={<Radio />}
                    label={radioLabels[0]}
                    labelPlacement="end"
                />
                <FormControlLabel
                    value={radioValues[1]}
                    control={<Radio />}
                    label={radioLabels[1]}
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormControl>
    );
}

export default FormRadioGroup;
