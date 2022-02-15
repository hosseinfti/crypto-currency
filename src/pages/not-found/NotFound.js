import React from "react";
import { Link } from "react-router-dom";
import "./not-found.css"

function NotFound() {
  return (
    <div className="notFoundDIV">
      <img
        className="notFoundIMG"
        src={require("../../assets/image/notFound/undraw_crypto_portfolio_2jy5.svg")}
        alt="notFound"
      />
      <Link className="returnHomeLink" to="/">
        <div className="returnHome">
            بازگشت به صفحه‌ی اصلی
        </div>
      </Link>
      <div className="notFoundFA"> صفحه مورد نظر یافت نشد! </div>
      <div className="notFoundEN">Error 404 - Page Not Found</div>
    </div>
  );
}
export default NotFound;
