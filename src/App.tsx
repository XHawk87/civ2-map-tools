import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

const Waterways = lazy(() => import('./screens/Waterways'));
const NavMenu = lazy(() => import('./screens/NavMenu'));

function App() {
    return (
        <Router basename="/civ2-map-tools">
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={NavMenu}/>
                    <Route path="/waterways" component={Waterways}/>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
