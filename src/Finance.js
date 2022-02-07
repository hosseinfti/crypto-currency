import axios from "axios";
import React,{ useState, useEffect } from "react";
import Table from "./components/Table";
import Calculator from "./components/Calculator";

function Finance() {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.wallex.ir/v1/markets")
      .then((res1) => Object.values(res1.data.result.symbols))
      .then((res3) => setCurrency(res3))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div className="container">
        <h1>بازار معامله‌گری ارزهای دیجیتال</h1>
        <Calculator currency={currency} />
        <div className="tableContainer">
          <div className="tableDiv">
            <Table currency={currency} setCurrency={setCurrency} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Finance;
