import React from 'react';
import { Route, Switch } from 'react-router';

import Layout from './layouts/default/index';
import Home from './pages/home/index';
import NotFound from './pages/notFound/index';
import Characters from './pages/characters/index';
import NewCharacter from './pages/characters/new';
import CharacterDetails from './pages/characters/details';

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact={true} strict={true} render={() => <Home />} />

                <Route path="/characters/" exact={true} strict={false} render={() => <Characters/>} />
                <Route path="/characters/new" exact={true} strict={true} render={() => <NewCharacter/>} />
                <Route path="/characters/:id" exact={true} strict={true} render={() => <CharacterDetails/>} />

                <Route render={() => <NotFound />} />
            </Switch>
        </Layout>
    );
};

export {
    App as default,
};
