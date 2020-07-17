import React from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";

import {useHistory} from "react-router-dom";

interface LinkTabProps {
    link: string;
    label: string;
    key: string;
    icon: React.FunctionComponentElement<number>;
}

function LinkTab({
    link,
    label,
    icon,
    ...restProps
}: LinkTabProps): React.FunctionComponentElement<LinkTabProps> {
    const history = useHistory();
    return (
        <Tab
            component="a"
            icon={icon}
            onClick={(event) => {
                event.preventDefault();
                history.push(`/${link}`);
            }}
            label={label}
            {...restProps}
        />
    );
}

LinkTab.propTypes = {
    link: PropTypes.string,
    label: PropTypes.string
};

export default LinkTab;
