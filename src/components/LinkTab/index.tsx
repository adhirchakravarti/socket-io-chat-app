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

export interface MatchParams {
    name: string;
}

function LinkTab({link, label, icon, ...restProps}: LinkTabProps): JSX.Element {
    const history = useHistory();
    // const {icon: iconBadge} = restProps;
    // const match = useRouteMatch<MatchParams>("/chat/:name");
    // const {
    //     params: {name}
    // } = match;
    return (
        <Tab
            component="a"
            icon={icon}
            onClick={(event) => {
                event.preventDefault();
                // const encodedName = encodeURIComponent(name);
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
