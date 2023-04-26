import React from "react";

import Toolbar from "./Components/Layout/Toolbar";
import Player from "./Components/Layout/Player";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Cards from "./Components/Layout/Cards";
import MusicList from "./Components/Layout/MusicList";
import { StateProvider } from './Components/StateContext';

const App = () => {
    
    return (
        <StateProvider>
            <div className="container-fluid">
                <div className="row vh-100">
                    <Router>
                        <Toolbar />
                        <Switch>
                            <Route exact path="/" render={() => <MusicList url="/song/" />} />
                            <Route path="/Albums" render={() => <Cards type="Albums" />} />
                            <Route path="/Artists" render={() => <Cards type="Artists" />} />
                        </Switch>
                        <Player />
                    </Router>
                </div>
            </div>   
        </StateProvider>
    )
}
export default App;