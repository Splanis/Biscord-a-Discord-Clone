import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import Navigation from "./components/layout/navigation";

import { Container } from "./components/shared/Container";

const App = (store) => {
    return (
        <Router>
            <Navigation />
            <Container>
                <Routes />
            </Container>
        </Router>
    );
};

export default App;
