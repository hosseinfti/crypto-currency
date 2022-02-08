import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Finance from "../Finance";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "../components/NotFound"


function router() {
    return (
        <>
        <Router>
            <Header />
            <Routes>
            <Route path="/" element={<Finance />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
        </>
    )
}
export default router;