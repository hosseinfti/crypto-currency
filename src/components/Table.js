// import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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
  const [searchedList, setSearcedList] = useState([]);
  // const [loading, setLoading] = useState(true);
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
    // eslint-disable-next-line no-use-before-define
    navigation(`?${urlStringfy}`);
  }, [searchTerm, navigation]);

  useEffect(() => {
    setDefaultCurrency([...props.currency]);
  }, [props.currency]);

  function handleChangeCurrency(event) {
    setSearchTerm(event.target.value);
    const newList = props.currency.filter((item) => {
      return (
        item["faBaseAsset"].includes(event.target.value) &&
        item["quoteAsset"] === marketDisplay
      );
    });
    setSearcedList(newList);
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
    <>
      <table>
        <thead>
          <tr className="theaedRow1">
            <th className="searchTh" colSpan="2">
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
            <th></th>
            <th></th>
            <th colSpan="2">
              <span className="marketBaseTitle">پایه بازار :</span>
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
                  <span>تومان</span>
                </button>
                <button
                  onClick={() => handleMarketDisplay("USDT")}
                  className="marketBaseDisplayBtn"
                >
                  <span>USDT</span>
                </button>
                <button
                  onClick={() => handleMarketDisplay("BTC")}
                  className="marketBaseDisplayBtn"
                >
                  <span>BTC</span>
                </button>
              </div>
            </th>
          </tr>
          <tr className="theadRow2">
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
              <span>نام ارز</span>
              <span>
                {sortCol === "currency" && order === "ASC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "currency" && order === "DSC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
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
              <span>قیمت خرید</span>
              <span>
                {" "}
                {sortCol === "bidPrice" && order === "ASC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "bidPrice" && order === "DSC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
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
              <span>قیمت فروش</span>
              <span>
                {" "}
                {sortCol === "askPrice" && order === "ASC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "askPrice" && order === "DSC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
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
              <span>تغییرات</span>
              <span>
                {" "}
                {sortCol === "24h_ch" && order === "ASC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "24h_ch" && order === "DSC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
            </th>
            <th
              lang="fa"
              className={` volumeHeader tableHeader ${
                sortCol === "24h_quoteVolume" && order === "ASC"
                  ? "ascending"
                  : sortCol === "24h_quoteVolume" && order === "DSC"
                  ? "decending"
                  : ""
              }`}
              onClick={() => sorting("stats", "24h_quoteVolume")}
            >
              <span>حجم معامله</span>
              <span>
                {" "}
                {sortCol === "24h_quoteVolume" && order === "ASC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "24h_quoteVolume" && order === "DSC" ? (
                  <img
                    src={require(`../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
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
                  <td className="rowIndex"> {index + 1} </td>
                  <td className="currency">
                    <span onClick={() => handleFavorite(item)} className="star">
                      {!favorite.includes(item) ? (
                        <img
                          draggable="false"
                          className="starOff"
                          src={require("../assets/image/favorite/starOff.png")}
                          width="25px"
                          // height="20px"
                          alt="starOff"
                        />
                      ) : (
                        <img
                          draggable="false"
                          className="starOn"
                          src={require("../assets/image/favorite/starOn.png")}
                          width="25px"
                          // height="20px"
                          alt="starOn"
                        />
                      )}
                    </span>
                    <img
                      className="currencyIcon"
                      src={require(`../assets/image/cryptoIcon/${temp[0]["symbol"]}.svg`)}
                      alt={temp[0]["symbol"]}
                      width="25px"
                      // height="20px"
                    />
                    <div className="currencyNameParent">
                      <span className="currencyName">
                        {item["faBaseAsset"]}
                      </span>
                      <span className="currencyIndex">
                        {" "}
                        {item["baseAsset"]}{" "}
                      </span>
                    </div>
                  </td>

                  <td className="numericTd">
                    <span className="numericSpan">
                      {item["stats"]["bidPrice"] !== "-" &&
                      marketDisplay === "BTC"
                        ? Number(item["stats"]["bidPrice"])
                            .toString()
                            .replace(/\d/g, function (v) {
                              return String.fromCharCode(
                                v.charCodeAt(0) + 0x06c0
                              );
                            })
                        : item["stats"]["bidPrice"] !== "-" &&
                          marketDisplay !== "BTC"
                        ? Number(item["stats"]["bidPrice"])
                            // .toFixed(3)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .replace(/\d/g, function (v) {
                              return String.fromCharCode(
                                v.charCodeAt(0) + 0x06c0
                              );
                            })
                        : "-"}
                    </span>
                  </td>
                  <td className="numericTd">
                    <span className="numericSpan">
                      {item["stats"]["askPrice"] !== "-" &&
                      marketDisplay === "BTC"
                        ? Number(item["stats"]["askPrice"])
                            .toString()
                            .replace(/\d/g, function (v) {
                              return String.fromCharCode(
                                v.charCodeAt(0) + 0x06c0
                              );
                            })
                        : item["stats"]["askPrice"] !== "-" &&
                          marketDisplay !== "BTC"
                        ? Number(item["stats"]["askPrice"])
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .replace(/\d/g, function (v) {
                              return String.fromCharCode(
                                v.charCodeAt(0) + 0x06c0
                              );
                            })
                        : "-"}
                    </span>
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
                    <span className="numericSpan">
                      {item["stats"]["24h_ch"] > 0 ? "+" : ""}
                      {item["stats"]["24h_ch"] !== "-"
                        ? Number(item["stats"]["24h_ch"])
                            // .toFixed(3)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .replace(/\d/g, function (v) {
                              return String.fromCharCode(
                                v.charCodeAt(0) + 0x06c0
                              );
                            })
                        : "-"}{" "}
                      %
                    </span>
                  </td>
                  <td className="numericTd">
                    <span className="numericSpan">
                      {item["stats"]["24h_quoteVolume"] !== "-" &&
                      marketDisplay === "BTC"
                        ? Number(item["stats"]["24h_quoteVolume"])
                            .toString()
                            .replace(/\d/g, function (v) {
                              return String.fromCharCode(
                                v.charCodeAt(0) + 0x06c0
                              );
                            })
                        : item["stats"]["24h_quoteVolume"] !== "-" &&
                          marketDisplay !== "BTC"
                        ? Number(item["stats"]["24h_quoteVolume"])
                            .toFixed(0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .replace(/\d/g, function (v) {
                              return String.fromCharCode(
                                v.charCodeAt(0) + 0x06c0
                              );
                            })
                        : "-"}
                    </span>
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
                    <td className="rowIndex">
                      {!favorite.length
                        ? index + 1
                        : favorite.length + index + 1}
                    </td>
                    <td className="currency">
                      <span
                        onClick={() => handleFavorite(item)}
                        className="star"
                      >
                        {!favorite.includes(item) ? (
                          <img
                            draggable="false"
                            className="starOff"
                            src={require("../assets/image/favorite/starOff.png")}
                            width="25px"
                            // height="20px"
                            alt="starOff"
                          />
                        ) : (
                          <img
                            draggable="false"
                            className="starOn"
                            src={require("../assets/image/favorite/starOn.png")}
                            width="25px"
                            // height="20px"
                            alt="starOn"
                          />
                        )}
                      </span>
                      <img
                        className="currencyIcon"
                        src={require(`../assets/image/cryptoIcon/${temp[0]["symbol"]}.svg`)}
                        alt={temp[0]["symbol"]}
                        width="25px"
                        // height="20px"
                      />
                      <div className="currencyNameParent">
                        <span className="currencyName">
                          {item["faBaseAsset"]}
                        </span>
                        <span className="currencyIndex">
                          {" "}
                          {item["baseAsset"]}{" "}
                        </span>
                      </div>
                    </td>

                    <td className="numericTd">
                      <span className="numericSpan">
                        {item["stats"]["bidPrice"] !== "-" &&
                        marketDisplay === "BTC"
                          ? Number(item["stats"]["bidPrice"])
                              .toString()
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : item["stats"]["bidPrice"] !== "-" &&
                            marketDisplay !== "BTC"
                          ? Number(item["stats"]["bidPrice"])
                              // .toFixed(3)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : "-"}
                      </span>
                    </td>
                    <td className="numericTd">
                      <span className="numericSpan">
                        {item["stats"]["askPrice"] !== "-" &&
                        marketDisplay === "BTC"
                          ? Number(item["stats"]["askPrice"])
                              .toString()
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : item["stats"]["askPrice"] !== "-" &&
                            marketDisplay !== "BTC"
                          ? Number(item["stats"]["askPrice"])
                              // .toFixed(3)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : "-"}
                      </span>
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
                      <span className="numericSpan">
                        {item["stats"]["24h_ch"] > 0 ? "+" : ""}
                        {item["stats"]["24h_ch"] !== "-" &&
                        marketDisplay === "BTC"
                          ? Number(item["stats"]["24h_ch"])
                              .toString()
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : item["stats"]["24h_ch"] !== "-" &&
                            marketDisplay !== "BTC"
                          ? Number(item["stats"]["24h_ch"])
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : "-"}{" "}
                        %
                      </span>
                    </td>
                    <td className="numericTd">
                      <span className="numericSpan">
                        {item["stats"]["24h_quoteVolume"] !== "-" &&
                        marketDisplay === "BTC"
                          ? Number(item["stats"]["24h_quoteVolume"])
                              // .toFixed(0)
                              .toString()
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : item["stats"]["24h_quoteVolume"] !== "-" &&
                            marketDisplay !== "BTC"
                          ? Number(item["stats"]["24h_quoteVolume"])
                              .toFixed(0)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              .replace(/\d/g, function (v) {
                                return String.fromCharCode(
                                  v.charCodeAt(0) + 0x06c0
                                );
                              })
                          : "-"}
                      </span>
                    </td>
                  </tr>
                </>
              );
            })}
          <tr
            className={`${
              searchTerm && searchedList.length === 0
                ? "noResult-tr"
                : "noResult-tr-none"
            }`}
          >
            <td colSpan="6" className="noResultTable">
                نتیجه‌ای یافت نشد!
            </td>
          </tr>
        </tbody>
      </table>
      {/* <div className="loadin"> {loading === true ? "Loading" : "" } </div> */}
    </>
  );
}
export default Table;
