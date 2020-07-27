import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {LinkMeta} from "src/types";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

interface MessageMetadataProps {
    link: LinkMeta;
}

function MessageMetadata({
    link
}: MessageMetadataProps): React.FunctionComponentElement<MessageMetadataProps> {
    const classes = useStyles();
    const {url, title, description, image} = link;
    return (
        <Box className={classes.metaContainer} key={url}>
            <Box>
                <Typography>{title}</Typography>
                <Typography variant="caption">{description}</Typography>
            </Box>
            <Box>
                <img className={classes.image} src={image} alt="Image" />
            </Box>
        </Box>
    );
}

export default MessageMetadata;
