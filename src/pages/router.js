import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Finance from "../Finance";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import NotFound from "../pages/not-found/NotFound"


function router() {
    return (
        <>
        <Router>
            <Header />
            <Routes>
            <Route path="/"                 element={<Finance />} />
            <Route path="/crypto-currency/" element={<Finance />} />
            <Route path="*"                 element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
        </>
    )
}
export default router;