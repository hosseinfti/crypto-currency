import React from "react";

function NotFound() {
  return (
    <div className="notFoundDIV">
      <img
        className="notFoundIMG"
        src={require("../assets/image/notFound/undraw_crypto_portfolio_2jy5.svg")}
        width="50%"
      />
      <div className="notFoundFA"> صفحه مورد نظر یافت نشد! </div>
      <div className="notFoundEN">Error 404 - Page Not Found</div>
    </div>
  );
}
export default NotFound;
