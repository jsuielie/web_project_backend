import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from "./components/Board";
import Introduction from "./components/Introduction";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import "./styles.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Introduction />} />
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="board/:boardId" element={<Board />} />
                </Route>
            </Routes>
        </Router >
    )
}

ReactDOM.render(<App />, document.getElementById("root"));