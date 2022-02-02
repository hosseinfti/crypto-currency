// import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import cryptoSrc from "../json/cryptoIcon.json";

function Table(props) {
  const location = useLocation();
  const navigation = useNavigate();
  const { search = "" } = queryString.parse(location.search);

  //   const [currency, setCurrency] = useState([]);
  const [defaultCurrency, setDefaultCurrency] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search);
  const [sortCol, setSortCol] = useState();
  const [order, setOrder] = useState("DEF");
  const [favorite, setFavorite] = useState([]);
  const [marketDisplay, setMarketDisplay] = useState("USDT");

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  useEffect(() => {
    let url = {
      search: searchTerm ? searchTerm : undefined,
    };
    const urlStringfy = queryString.stringify(url);
    navigation(`?${urlStringfy}`);
  }, [searchTerm]);

  useEffect(() => {
    setDefaultCurrency([...props.currency]);
  }, [props.currency]);

  function handleChangeCurrency(event) {
    setSearchTerm(event.target.value);
  }

  function handleFavorite(item) {
    setFavorite(
      !favorite.includes(item)
        ? [...favorite, item].reverse()
        : favorite.filter((i) => i !== item)
    );
  }
  function handleMarketDisplay(crncy) {
    setMarketDisplay(crncy);
  }

  const sorting = (obj1, obj2) => {
    setSortCol(obj2);
    if (sortCol === obj2) {
      if (obj1 === "stats") {
        if (order === "DEF") {
          const sorted = props.currency.sort((a, b) =>
            Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? 1 : -1
          );
          props.setCurrency(sorted);
          setOrder("ASC");
        } else if (order === "ASC") {
          const sorted = props.currency.sort((a, b) =>
            Number(a[obj1][obj2]) < Number(b[obj1][obj2]) ? 1 : -1
          );
          props.setCurrency(sorted);
          setOrder("DSC");
        } else {
          const sorted = defaultCurrency;
          props.setCurrency(sorted);
          setOrder("DEF");
        }
      } else {
        if (order === "DEF") {
          const sorted = props.currency.sort((a, b) =>
            a[obj1] > b[obj1] ? 1 : -1
          );
          props.setCurrency(sorted);
          setOrder("ASC");
        }
        if (order === "ASC") {
          const sorted = props.currency.sort((a, b) =>
            a[obj1] < b[obj1] ? 1 : -1
          );
          props.setCurrency(sorted);
          setOrder("DSC");
        }
        if (order === "DSC") {
          const sorted = defaultCurrency;
          props.setCurrency(sorted);
          setOrder("DEF");
        }
      }
    } else if (obj1 === "stats") {
      const sorted = props.currency.sort((a, b) =>
        Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? 1 : -1
      );
      props.setCurrency(sorted);
      setOrder("ASC");
    } else {
      const sorted = props.currency.sort((a, b) =>
        a[obj1] > b[obj1] ? 1 : -1
      );
      props.setCurrency(sorted);
      setOrder("ASC");
    }
  };

  return (
    <table>
      <thead>
        <tr className="marketBaseDisplay">
          <th colSpan="3">
            <div className="searchDiv">
              <img
                className="searchIcon"
                src={require("../assets/image/search/magnifying-glass.png")}
                alt="searchIcon"
                width="20px"
              />
              <input
                className="searchInput"
                type="text"
                placeholder="جستجو"
                value={searchTerm}
                onChange={handleChangeCurrency}
                ref={searchRef}
              />
            </div>
          </th>
          <th>
            <span>پایه بازار :</span>
          </th>
          <th colSpan="2">
            <div className="marketbaseBtns">
              <span
                className={`marketBaseDisplayBtnSelected ${
                  marketDisplay === "TMN"
                    ? "selected-tmn"
                    : marketDisplay === "USDT"
                    ? "selected-usdt"
                    : "selected-btc"
                }`}
              />
              <button
                onClick={() => handleMarketDisplay("TMN")}
                className="marketBaseDisplayBtn"
              >
                تومان
              </button>
              <button
                onClick={() => handleMarketDisplay("USDT")}
                className="marketBaseDisplayBtn"
              >
                USDT
              </button>
              <button
                onClick={() => handleMarketDisplay("BTC")}
                className="marketBaseDisplayBtn"
              >
                BTC
              </button>
            </div>
          </th>
        </tr>
        <tr className="theadRow">
          <th className="tableHeader rowsNumber"> ردیف </th>
          <th
            className={` tableHeader ${
              sortCol === "currency" && order === "ASC"
                ? "ascending"
                : sortCol === "currency" && order === "DSC"
                ? "decending"
                : ""
            }`}
            onClick={() => sorting("faBaseAsset", "currency")}
          >
            نام ارز
          </th>
          <th
            className={` tableHeader ${
              sortCol === "bidPrice" && order === "ASC"
                ? "ascending"
                : sortCol === "bidPrice" && order === "DSC"
                ? "decending"
                : ""
            }`}
            onClick={() => sorting("stats", "bidPrice")}
          >
            قیمت خرید
          </th>
          <th
            className={` tableHeader ${
              sortCol === "askPrice" && order === "ASC"
                ? "ascending"
                : sortCol === "askPrice" && order === "DSC"
                ? "decending"
                : ""
            }`}
            onClick={() => sorting("stats", "askPrice")}
          >
            قیمت فروش
          </th>
          <th
            className={` tableHeader ${
              sortCol === "24h_ch" && order === "ASC"
                ? "ascending"
                : sortCol === "24h_ch" && order === "DSC"
                ? "decending"
                : ""
            }`}
            onClick={() => sorting("stats", "24h_ch")}
          >
            تغییرات
          </th>
          <th
            lang="fa"
            className={` tableHeader ${
              sortCol === "24h_quoteVolume" && order === "ASC"
                ? "ascending"
                : sortCol === "24h_quoteVolume" && order === "DSC"
                ? "decending"
                : ""
            }`}
            onClick={() => sorting("stats", "24h_quoteVolume")}
          >
            حجم معامله
          </th>
        </tr>
      </thead>
      <tbody>
        {favorite
          .filter((item) => {
            return searchTerm === ""
              ? item["faBaseAsset"]
              : item["faBaseAsset"]
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
          })
          .map((item, index) => {
            let mapItem = item;
            const temp = cryptoSrc.filter((item) => {
              return item["symbol"] === mapItem["baseAsset"];
            });
            return (
              <tr className="tbodyRows" key={item["symbol"]}>
                <td> {index + 1} </td>
                <td className="currency">
                  <span onClick={() => handleFavorite(item)} className="star">
                    {!favorite.includes(item) ? (
                      <img
                        draggable="false"
                        className="starOff"
                        src={require("../assets/image/favorite/starOff.png")}
                        width="20px"
                        height="20px"
                        alt="starOff"
                      />
                    ) : (
                      <img
                        draggable="false"
                        className="starOn"
                        src={require("../assets/image/favorite/starOn.png")}
                        width="20px"
                        height="20px"
                        alt="starOn"
                      />
                    )}
                  </span>
                  <img
                    className="currencyIcon"
                    src={require(`../assets/image/cryptoIcon/${temp[0]["symbol"]}.svg`)}
                    alt={temp[0]["symbol"]}
                    width="20px"
                    height="20px"
                  />
                  <span className="currencyName">{item["faBaseAsset"]}</span>
                </td>

                <td className="numericTd">
                  {item["stats"]["bidPrice"] !== "-" && marketDisplay === "BTC"
                    ? Number(item["stats"]["bidPrice"])
                    .toString()
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : item["stats"]["bidPrice"] !== "-" && marketDisplay !== "BTC" 
                      ? Number(item["stats"]["bidPrice"])
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : "-"}
                  </td>
                  <td className="numericTd">
                  {item["stats"]["askPrice"] !== "-" && marketDisplay === "BTC"
                    ? Number(item["stats"]["askPrice"])
                    .toString()
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : item["stats"]["askPrice"] !== "-" && marketDisplay !== "BTC" 
                      ? Number(item["stats"]["askPrice"])
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : "-"}
                  </td>
                <td
                  className={` numericTd
                  ${
                    Number(item["stats"]["24h_ch"]) > 0
                      ? "posetive"
                      : Number(item["stats"]["24h_ch"]) < 0
                      ? "negetive"
                      : ""
                  }
                  `}
                >
                  {item["stats"]["24h_ch"] !== "-"
                    ? Number(item["stats"]["24h_ch"])
                        .toFixed(3)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        .replace(/\d/g, function (v) {
                          return String.fromCharCode(v.charCodeAt(0) + 0x06c0);
                        })
                    : "-"}
                </td>
                <td className="numericTd">
                  {item["stats"]["24h_quoteVolume"] !== "-"
                    ? Number(item["stats"]["24h_quoteVolume"])
                        .toFixed(3)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        .replace(/\d/g, function (v) {
                          return String.fromCharCode(v.charCodeAt(0) + 0x06c0);
                        })
                    : "-"}
                </td>
              </tr>
            );
          })}
        {props.currency
          .filter((item) => item["quoteAsset"] === marketDisplay)
          .filter((item) => {
            return !favorite.includes(item);
          })
          .filter((item) => {
            return searchTerm === ""
              ? item["faBaseAsset"]
              : item["faBaseAsset"]
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
          })
          .map((item, index) => {
            let mapItem = item;
            const temp = cryptoSrc.filter((item) => {
              return item["symbol"] === mapItem["baseAsset"];
            });
            return (
              <>
                <tr className="tbodyRows" key={item["symbol"]}>
                  <td>
                    {" "}
                    {!favorite.length
                      ? index + 1
                      : favorite.length + index + 1}{" "}
                  </td>
                  <td className="currency">
                    <span onClick={() => handleFavorite(item)} className="star">
                      {!favorite.includes(item) ? (
                        <img
                          draggable="false"
                          className="starOff"
                          src={require("../assets/image/favorite/starOff.png")}
                          width="20px"
                          height="20px"
                          alt="starOff"
                        />
                      ) : (
                        <img
                          draggable="false"
                          className="starOn"
                          src={require("../assets/image/favorite/starOn.png")}
                          width="20px"
                          height="20px"
                          alt="starOn"
                        />
                      )}
                    </span>
                    <img
                      className="currencyIcon"
                      src={require(`../assets/image/cryptoIcon/${temp[0]["symbol"]}.svg`)}
                      alt={temp[0]["symbol"]}
                      width="20px"
                      height="20px"
                    />
                    <span className="currencyName">{item["faBaseAsset"]}</span>
                  </td>

                  <td className="numericTd">
                  {item["stats"]["bidPrice"] !== "-" && marketDisplay === "BTC"
                    ? Number(item["stats"]["bidPrice"])
                    .toString()
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : item["stats"]["bidPrice"] !== "-" && marketDisplay !== "BTC" 
                      ? Number(item["stats"]["bidPrice"])
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : "-"}
                  </td>
                  <td className="numericTd">
                  {item["stats"]["askPrice"] !== "-" && marketDisplay === "BTC"
                    ? Number(item["stats"]["askPrice"])
                    .toString()
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : item["stats"]["askPrice"] !== "-" && marketDisplay !== "BTC" 
                      ? Number(item["stats"]["askPrice"])
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : "-"}
                  </td>
                  <td
                    className={` numericTd
                ${
                  Number(item["stats"]["24h_ch"]) > 0
                    ? "posetive"
                    : Number(item["stats"]["24h_ch"]) < 0
                    ? "negetive"
                    : ""
                }
                `}
                  >
                    {item["stats"]["24h_ch"] !== "-" && marketDisplay === "BTC"
                    ? Number(item["stats"]["24h_ch"])
                    .toString()
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : item["stats"]["24h_ch"] !== "-" && marketDisplay !== "BTC" 
                      ? Number(item["stats"]["24h_ch"])
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : "-"}
                  </td>
                  <td className="numericTd">
                  {item["stats"]["24h_quoteVolume"] !== "-" && marketDisplay === "BTC"
                    ? Number(item["stats"]["24h_quoteVolume"])
                    .toString()
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : item["stats"]["24h_quoteVolume"] !== "-" && marketDisplay !== "BTC" 
                      ? Number(item["stats"]["24h_quoteVolume"])
                          .toFixed(3)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          .replace(/\d/g, function (v) {
                            return String.fromCharCode(
                              v.charCodeAt(0) + 0x06c0
                            );
                          })
                      : "-"}
                  </td>
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
}
export default Table;
