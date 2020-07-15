import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import LinkTab from "../LinkTab";

interface ITab {
    link: string;
    label: string;
    icon: React.FunctionComponentElement<number>;
}

interface TabPanelProps {
    tabs: ITab[];
}

function TabPanel({tabs}: TabPanelProps): JSX.Element {
    const location = useLocation();
    const [tabValue, setTabValue] = useState(() => {
        if (location.pathname.includes("/settings")) {
            return 1;
        }
        return 0;
    });

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
                    tabs.map(({label, link, icon}) => (
                        <LinkTab key={label} label={label} link={link} icon={icon} />
                    ))}
            </Tabs>
        </Paper>
    );
}

export default TabPanel;
