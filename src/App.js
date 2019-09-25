import React from 'react';

import Header from "./layout/header/header"
import Main from "./layout/main/main"
import Footer from "./layout/footer/footer"

const App = ({ children }) => [
    <Header key="header"/>,
    <Main key="main">
        {children}
    </Main>,
    <Footer key="footer"/>
];

export default App;
