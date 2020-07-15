import React from "react";
import Badge from "@material-ui/core/Badge";
import Fade from "@material-ui/core/Fade";

interface BadgeProps {
    content: number;
    childIcon: React.FunctionComponentElement<number>;
    visible: boolean;
}

function BadgeIcon({
    content,
    childIcon,
    visible
}: BadgeProps): React.FunctionComponentElement<BadgeProps> {
    return (
        <Fade in={visible} timeout={500}>
            <Badge color="secondary" badgeContent={content}>
                {childIcon}
            </Badge>
        </Fade>
    );
}

export default BadgeIcon;
