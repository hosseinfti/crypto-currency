import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

function Table(props) {
  const location = useLocation();
  const navigation = useNavigate();
  const { search = "" } = queryString.parse(location.search);

  const [defaultCurrency, setDefaultCurrency] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search);
  const [searchedList, setSearcedList] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [sortCol, setSortCol] = useState();
  const [order, setOrder] = useState("DEF");
  const [favorite, setFavorite] = useState([]);
  const [marketDisplay, setMarketDisplay] = useState("USDT");

  const uniqFav = favorite.filter(
    (item) => item["quoteAsset"] === marketDisplay
  );

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
      !favorite.includes(item) && item["quoteAsset"] === marketDisplay
        ? [...favorite, item].reverse()
        : favorite.filter((i) => i !== item)
    );
  }
  function handleMarketDisplay(crncy) {
    setMarketDisplay(crncy);
  }

  // const sorting = (obj1, obj2) => {
  //   setSortCol((prevstate) => {
  //     if (prevstate === obj2) {
  //       if (order === "ASC") {
  //         setOrder("DSC");
  //       } else if (order === "DSC") {
  //         setOrder("DEF");
  //       } else {
  //         setOrder("ASC");
  //       }
  //     } else {
  //       setOrder("ASC");
  //     }
  //     return obj2;
  //   });
  //   useEffect(() => {
  //     if (obj1 === "stats") {
  //       if (order === "ASC") {
  //         const sorted = props.currency.sort((a, b) => {
  //           return Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? 1 : -1;
  //         });
  //         props.setCurrency(sorted);
  //       } else if (order === "DSC") {
  //         const sorted = props.currency.sort((a, b) => {
  //           return Number(a[obj1][obj2]) < Number(b[obj1][obj2]) ? 1 : -1;
  //         });
  //         props.setCurrency(sorted);
  //       } else {
  //         props.setCurrency(defaultCurrency);
  //       }
  //     } else if (order === "ASC") {
  //       const sorted = props.currency.sort((a, b) => {
  //         return a[obj1][obj2] > b[obj1][obj2] ? 1 : -1;
  //       });
  //       props.setCurrency(sorted);
  //     } else if (order === "DSC") {
  //       const sorted = props.currency.sort((a, b) => {
  //         return a[obj1][obj2] < b[obj1][obj2] ? 1 : -1;
  //       });
  //       props.setCurrency(sorted);
  //     } else {
  //       props.setCurrency(defaultCurrency);
  //     }
  //   }, [order]);
  // };

  // const sorting = (obj1, obj2) => {
  //   if (sortCol === obj2) {
  //     if (obj1 === "stats") {
  //       if (order === "DEF") {
  //         const sorted = props.currency.sort((a, b) => {
  //           return Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? 1 : -1;
  //         });
  //         props.setCurrency(sorted);
  //         setOrder("ASC");
  //       } else if (order === "ASC") {
  //         const sorted = props.currency.sort((a, b) => {
  //           return Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? -1 : 1;
  //         });
  //         props.setCurrency(sorted);
  //         setOrder("DSC");
  //       } else {
  //         props.setCurrency(defaultCurrency);
  //         setOrder("DEF");
  //       }
  //     } else {
  //       if (order === "DEF") {
  //         const sorted = props.currency.sort((a, b) => {
  //           return a[obj1] > b[obj1] ? 1 : -1;
  //         });
  //         props.setCurrency(sorted);
  //         setOrder("ASC");
  //       } else if (order === "ASC") {
  //         const sorted = props.currency.sort((a, b) => {
  //           return a[obj1] > b[obj1] ? -1 : 1;
  //         });
  //         props.setCurrency(sorted);
  //         setOrder("DSC");
  //       } else {
  //         props.setCurrency(defaultCurrency);
  //         setOrder("DEF");
  //       }
  //     }
  //   } else {
  //     if (obj1 === "stats") {
  //       const sorted = props.currency.sort((a, b) => {
  //         return Number(a[obj1][obj2]) > Number(b[obj1][obj2]) ? 1 : -1;
  //       });
  //       props.setCurrency(sorted);
  //       setOrder("ASC");
  //       setSortCol(obj2);
  //     } else {
  //       const sorted = props.currency.sort((a, b) => {
  //         return a[obj1] > b[obj2] ? 1 : -1;
  //       });
  //       props.setCurrency(sorted);
  //       setOrder("ASC");
  //       setSortCol(obj2);
  //     }
  //   }
  // };

  const sorting = (obj1, obj2) => {
    if (sortCol === obj2) {
      if (obj1 === "stats") {
        if (order === "DEF") {
          const sorted = props.currency.sort((a, b) => {
            return Number(a[obj1][obj2]) > Number(b[obj1][obj2])
              ? 1
              : Number(b[obj1][obj2]) > Number(a[obj1][obj2]) ||
                a[obj1][obj2] === "-"
              ? -1
              : 0;
          });
          props.setCurrency(sorted);
          setOrder("ASC");
        } else if (order === "ASC") {
          const sorted = props.currency.sort((a, b) => {
            return Number(a[obj1][obj2]) < Number(b[obj1][obj2]) ||
              a[obj1][obj2] === "-"
              ? 1
              : Number(b[obj1][obj2]) < Number(a[obj1][obj2])
              ? -1
              : 0;
          });
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
            a[obj1].localeCompare(b[obj1])
          );
          props.setCurrency(sorted);
          setOrder("ASC");
        } else if (order === "ASC") {
          const sorted = props.currency.sort((a, b) =>
            b[obj1].localeCompare(a[obj1])
          );
          props.setCurrency(sorted);
          setOrder("DSC");
        } else {
          const sorted = defaultCurrency;
          props.setCurrency(sorted);
          setOrder("DEF");
        }
      }
    } else if (obj1 === "stats") {
      const sorted = props.currency.sort((a, b) => {
        return Number(a[obj1][obj2]) > Number(b[obj1][obj2])
          ? 1
          : Number(a[obj1][obj2]) < Number(b[obj1][obj2]) ||
            a[obj1][obj2] === "-"
          ? -1
          : 0;
      });
      props.setCurrency(sorted);
      setOrder("ASC");
      setSortCol(obj2);
    } else {
      const sorted = props.currency.sort((a, b) =>
        a[obj1].localeCompare(b[obj1])
      );
      props.setCurrency(sorted);
      setOrder("ASC");
      setSortCol(obj2);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="6">
              <div className="theadRow1">
                <div className="searchDiv">
                  <img
                    className="searchIcon"
                    src={require("../../assets/image/search/magnifying-glass.png")}
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
                {/* </th>
              <th> */}
                <div className="marketBaseDiv">
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
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="theadRow2">
            <td className="tableHeader rowsNumber"> ردیف </td>
            <td
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
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "currency" && order === "DSC" ? (
                  <img
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
            </td>
            <td
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
                {sortCol === "bidPrice" && order === "ASC" ? (
                  <img
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "bidPrice" && order === "DSC" ? (
                  <img
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
            </td>
            <td
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
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "askPrice" && order === "DSC" ? (
                  <img
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
            </td>
            <td
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
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "24h_ch" && order === "DSC" ? (
                  <img
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
            </td>
            <td
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
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="ascendingIcon"
                    width="15px"
                    alt="ascend"
                  />
                ) : sortCol === "24h_quoteVolume" && order === "DSC" ? (
                  <img
                    src={require(`../../assets/image/sort/right-arrow.png`)}
                    className="descendingIcon"
                    width="15px"
                    alt="decsend"
                  />
                ) : (
                  ""
                )}
              </span>
            </td>
          </tr>
          {favorite
            .filter((item) => item["quoteAsset"] === marketDisplay)
            .filter((item) => {
              return searchTerm === ""
                ? item["faBaseAsset"]
                : item["faBaseAsset"]
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
            .map((item, index) => {
              return (
                <tr
                  className="tbodyRows"
                  key={item["symbol"]}
                  id={item["symbol"]}
                >
                  <td className="rowIndex"> {index + 1} </td>
                  <td className="currency">
                    <span onClick={() => handleFavorite(item)} className="star">
                      {!favorite.includes(item) ? (
                        <img
                          draggable="false"
                          className="starOff"
                          src={require("../../assets/image/favorite/starOff.png")}
                          width="25px"
                          // height="20px"
                          alt="starOff"
                        />
                      ) : (
                        <img
                          draggable="false"
                          className="starOn"
                          src={require("../../assets/image/favorite/starOn.png")}
                          width="25px"
                          // height="20px"
                          alt="starOn"
                        />
                      )}
                    </span>
                    <img
                      className="currencyIcon"
                      src={item["aasdasdasd"]}
                      alt={item["baseAsset"]}
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
              return (
                <tr
                  className="tbodyRows"
                  key={item["symbol"]}
                  id={item["symbol"]}
                >
                  <td className="rowIndex">
                    {!favorite.length ? index + 1 : uniqFav.length + index + 1}
                  </td>
                  <td className="currency">
                    <span onClick={() => handleFavorite(item)} className="star">
                      {!favorite.includes(item) ? (
                        <img
                          draggable="false"
                          className="starOff"
                          src={require("../../assets/image/favorite/starOff.png")}
                          width="25px"
                          alt="starOff"
                        />
                      ) : (
                        <img
                          draggable="false"
                          className="starOn"
                          src={require("../../assets/image/favorite/starOn.png")}
                          width="25px"
                          alt="starOn"
                        />
                      )}
                    </span>
                    <img
                      className="currencyIcon"
                      src={item["baseAsset_svg_icon"]}
                      alt={item["baseAsset"]}
                      width="25px"
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
