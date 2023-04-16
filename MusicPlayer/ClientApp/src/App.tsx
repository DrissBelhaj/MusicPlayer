import React from "react";

import Toolbar from "./Components/Toolbar";
import Content from "./Components/Content";
import Player from "./Components/Player";


const App = () => {
    
    return (
    <div className="container-fluid">
        <div className="row vh-100">
            <Toolbar />

            <Content />
            <Player />
        </div>
    </div>   
)
}
export default App;