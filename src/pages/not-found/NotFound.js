import React from "react";
import { Link } from "react-router-dom";
import "./not-found.css";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <div className="notFoundDIV">
      <img
        className="notFoundIMG"
        src={require("../../assets/image/notFound/undraw_page_not_found_re_e9o6.svg")}
        alt="notFound"
      />
      <Link className="returnHomeLink" to="/">
        <div className="returnHome">بازگشت به صفحه‌ی اصلی</div>
      </Link>
      <div className="notFoundFA"> صفحه مورد نظر یافت نشد! </div>
      <div className="notFoundEN">Error 404 - Page Not Found</div>
      <Helmet>
        {" "}
        <title> صفحه مورد نظر یافت نشد | BestCoino </title>
      </Helmet>
    </div>
  );
}
export default NotFound;
