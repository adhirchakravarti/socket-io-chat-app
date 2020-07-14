import React, {useState} from "react";
import PropTypes from "prop-types";
import {useRouteMatch, useLocation} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import LinkTab from "../LinkTab";

interface ITab {
    link: string;
    label: string;
}

interface TabPanelProps {
    tabs: ITab[];
}

function TabPanel({tabs}: TabPanelProps): JSX.Element {
    const {path, url} = useRouteMatch();
    const location = useLocation();
    const [tabValue, setTabValue] = useState(() => {
        if (location.pathname.includes("/settings")) {
            return 1;
        }
        return 0;
    });
    console.log("TabValue = ", tabValue, url, path, location);

    const handleTabChange = (e: React.MouseEvent<HTMLButtonElement>, newVal: number) => {
        setTabValue(newVal);
    };

    return (
        <Paper>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {tabs.length > 0 &&
                    tabs.map(({label, link}) => <LinkTab key={label} label={label} link={link} />)}
            </Tabs>
        </Paper>
    );
}

TabPanel.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string,
            label: PropTypes.string
        })
    )
};

export default TabPanel;
