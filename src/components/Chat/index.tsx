import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Header from "../Header";
import ChatWindow from "../ChatWindow";
import TabPanel from "components/TabPanel";

const tabs = [
    {label: "Chat", link: "chat"},
    {label: "Settings", link: "settings"}
];

function Chat(): JSX.Element {
    // return <h1>Chat Component!</h1>;
    return (
        <Container maxWidth="xl">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                alignContent="stretch"
                xl={12}
                spacing={2}
            >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Header title="Docler Chat App" />
                    <TabPanel tabs={tabs} />
                </Grid>
                {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TabPanel tabs={tabs} />
                </Grid> */}
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ChatWindow />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Chat;
