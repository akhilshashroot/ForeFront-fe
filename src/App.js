// @flow
import React, { Component, useLayoutEffect, useState } from 'react';
import Routes from './routes/Routes';

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes
import './assets/scss/Saas.scss';
import MobileWindow from './MobileWindow';

// For Dark import Saas-Dark.scss
// import './assets/scss/Saas-Dark.scss';

// For Modern import Modern.scss
// import './assets/scss/Modern.scss';
// For modern dakr import Modern-Dark.scss
// import './assets/scss/Modern-Dark.scss';

// For Creative demo import Modern.scss
// import './assets/scss/Creative.scss';
// For Creative dark demo import Modern.scss
// import './assets/scss/Creative-Dark.scss';

// configure fake backend
configureFakeBackend();

type AppProps = {};

/**
 * Main app component
 */
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const App = (props) => {
    const width = useWindowSize()[0];
    return <>{width > 800 && <Routes></Routes>}{width<800 && <MobileWindow/> } </>;
};

export default App;
