import React from 'react';
import { Routes, Route } from "react-router-dom";

import { LoginPage, GamePage, ResultPage } from './Pages'

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<LoginPage/>}/>
            <Route exact path="/game" element={<GamePage/>}/>
            <Route exact path="/result" element={<ResultPage/>}/>
        </Routes>
    );
}

export default App;


