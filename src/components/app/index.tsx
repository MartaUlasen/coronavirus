import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from 'components/header';
import Home from 'components/home';

function App() {
    return (
        <>
            <Header />
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </main>
        </>
    );
}

export default App;
