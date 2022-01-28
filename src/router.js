import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Finance from "./Finance";
import Header from "./components/Header";
import Footer from "./components/Footer";


function router() {
    return (
        <>
        <Router>
            <Header />
            <Routes>
            <Route path="/" element={<Finance />} />
            </Routes>
            <Footer />
        </Router>
        </>
    )
}
export default router;