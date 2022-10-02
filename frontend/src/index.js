import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import AddCardForm from "./components/AddCardForm";
import Board from "./components/Board";
import EditCard from "./components/EditCard"
import Home from "./components/Home"
import Layout from "./components/Layout";
import LocalLogin from "./components/LocalLogin";
import LocalSignup from "./components/LocalSignup";
import NotFound from "./components/NotFound";
import "./styles.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="board/:boardId" element={<Board />} />
                    <Route path="edit-card-content" element={<EditCard />} />
                    <Route path="add-new-card/:boardId" element={<AddCardForm />} />
                    <Route path="local-login" element={<LocalLogin />} />
                    <Route path="local-signup" element={<LocalSignup />} />
                </Route>
            </Routes>
        </Router >
    )
}

ReactDOM.render(<App />, document.getElementById("root"));