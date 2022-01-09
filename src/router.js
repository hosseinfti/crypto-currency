import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Finance from "./Finance";


function router() {
    return (
        <>
        <Router>
            <Routes>
            <Route path="/" element={<Finance />} />
            </Routes>
        </Router>
        </>
    )
}
export default router;