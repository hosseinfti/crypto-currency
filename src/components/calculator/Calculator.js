import React, { useState, useEffect, useRef } from "react";
import cryptoSrc from "../../json/cryptoIcon.json";

function Calculator(props) {
  const [baseCurrency, setBaseCurrency] = useState();
  const [quoteCurrency, setQuoteCurrency] = useState();
  const [uniqBaseCurrency, setUniqBaseCurrency] = useState([]);
  const [uniqQuoteCurrency, setUniqQuoteCurrency] = useState([]);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("بیت کوین");
  const [selectedQuoteCurrency, setSelectedQuoteCurrency] = useState("تتر");
  const [reverseIcon, setReverseIcon] = useState(false);
  const [isQuoteDropDownOpen, setIsQuoteDropDownOpen] = useState(false);
  const [isBaseDropDownOpen, setIsBaseDropDownOpen] = useState(false);
  const [baseSearchTerm, setBaseSearchTerm] = useState("");
  const [quoteSearchTerm, setQuoteSearchTerm] = useState("");
  const [quoteSearchedList, setQuoteSearchedList] = useState([]);
  const [baseSearchedList, setBaseSearchedList] = useState([]);

  const clickRefBase = useRef();
  const clickRefQuote = useRef();

  const selectedBaseAsset = cryptoSrc.filter((item) => {
    return item["faAsset"] === selectedBaseCurrency;
  });
  const selectedQuoteAsset = cryptoSrc.filter((item) => {
    return item["faAsset"] === selectedQuoteCurrency;
  });

  useEffect(() => {
    const quoteSeen = new Set();
    const filteredQuoteCurrency = props.currency.filter((el) => {
      const duplicate = quoteSeen.has(el["quoteAsset"]);
      quoteSeen.add(el["quoteAsset"]);
      return !duplicate;
    });
    setUniqQuoteCurrency(filteredQuoteCurrency);

    const baseSeen = new Set();
    const filteredBaseCurrency = props.currency.filter((el) => {
      const duplicate = baseSeen.has(el["baseAsset"]);
      baseSeen.add(el["baseAsset"]);
      return !duplicate;
    });
    setUniqBaseCurrency(filteredBaseCurrency);
  }, [props.currency]);

  useOnClickOutside(clickRefBase, () => setIsBaseDropDownOpen(false));
  useOnClickOutside(clickRefQuote, () => setIsQuoteDropDownOpen(false));

  function useOnClickOutside(clickRef, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!clickRef.current || clickRef.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [clickRef, handler]);
  }

  function convertToQuote(baseCrncy) {
    const baseCurrencyThatShouldConvert = props.currency.filter((item) => {
      return (
        item["faBaseAsset"] === selectedBaseCurrency &&
        item["faQuoteAsset"] === selectedQuoteCurrency
      );
    });

    if (baseCrncy !== 0) {
      setQuoteCurrency(
        baseCrncy *
          Number(baseCurrencyThatShouldConvert[0]["stats"]["bidPrice"])
      );
    }
  }

  function convertToBase(quoteCrncy) {
    const quoteCurrencyThatShouldConvert = props.currency.filter((item) => {
      return (
        item["faBaseAsset"] === selectedBaseCurrency &&
        item["faQuoteAsset"] === selectedQuoteCurrency
      );
    });
    if (quoteCrncy !== 0) {
      setBaseCurrency(
        quoteCrncy /
          Number(quoteCurrencyThatShouldConvert[0]["stats"]["bidPrice"])
      );
    }
  }
  function handleChangeBaseCurrency(event) {
    // resetQuoteCurrency();
    convertToQuote(event.target.value);
    setBaseCurrency(event.target.value);
  }
  function handleChangeQuoteCurrency(event) {
    // resetQuoteCurrency();
    convertToBase(event.target.value);
    setQuoteCurrency(event.target.value);
  }

  function changeBase(event) {
    setSelectedBaseCurrency(event.currentTarget.id);
    setIsBaseDropDownOpen(false);
  }
  function changeQuote(event) {
    setSelectedQuoteCurrency(event.currentTarget.id);
    setIsQuoteDropDownOpen(false);
  }

  function changeBasaeSearch(e) {
    setBaseSearchTerm(e.target.value);
    const newList = uniqBaseCurrency.filter((item) => {
      return item["faBaseAsset"].includes(e.target.value);
    });
    setBaseSearchedList(newList);
  }

  function changeQuoteSearch(e) {
    setQuoteSearchTerm(e.target.value);
    const newList = uniqQuoteCurrency.filter((item) => {
      return item["faQuoteAsset"].includes(e.target.value);
    });
    setQuoteSearchedList(newList);
  }

  return (
    <div className="calcBody">
      <div className="pairCurrency">
        <div
          className={` baseCurrency ${
            reverseIcon === true ? "baseCurrencyReverse" : ""
          }`}
        >
          <div ref={clickRefBase}>
            <div
              className="selected-drop-down currencyParts"
              onClick={() => setIsBaseDropDownOpen(!isBaseDropDownOpen)}
            >
              <div className="selectedAssetAndIconDiv">
                <img
                  className="selectedDropDownIcon"
                  src={require(`../../assets/image/cryptoIcon/${selectedBaseAsset[0]["symbol"]}.svg`)}
                  alt={selectedBaseAsset[0]["symbol"]}
                  width="25px"
                />

                <span className="selectedDropDownText">
                  {selectedBaseCurrency}
                </span>
                <span className="selectedDropDownIndex">
                  ({selectedBaseAsset[0]["symbol"]})
                </span>
              </div>
              <img
                className={` ${
                  isBaseDropDownOpen === false
                    ? "dropDownIconClose"
                    : "dropDownIconOpen"
                } `}
                src={require("../../assets/image/arrow/dropDown-Arrow.png")}
                width="15px"
                alt="arrow"
              />
            </div>
            <div
              className={`drop-down-base ${
                isBaseDropDownOpen ? "drop-down" : "drop-down-None"
              }`}
            >
              <div className="searchBaseDivDropDown">
                <img
                  className="searchIconDropDown"
                  src={require("../../assets/image/search/magnifying-glass.png")}
                  alt="searchIcon"
                  width="20px"
                />
                <input
                  value={baseSearchTerm}
                  placeholder="نام ارز"
                  onChange={(e) => changeBasaeSearch(e)}
                  className="searchInputDropDown"
                  type="text"
                />
                {/* <div className="searchInputDropDown">نام ارز</div> */}
              </div>
              {uniqBaseCurrency
                .filter((item) => {
                  return baseSearchTerm === ""
                    ? item["faBaseAsset"]
                    : item["faBaseAsset"].includes(baseSearchTerm);
                })
                .filter((item) => {
                  return item["faBaseAsset"] !== selectedBaseCurrency;
                })
                .map((item) => {
                  let mapItem = item;
                  const temp = cryptoSrc.filter((item) => {
                    return item["symbol"] === mapItem["baseAsset"];
                  });
                  return (
                    <div
                      key={item["symbol"]}
                      id={item["faBaseAsset"]}
                      className="drop-down-Item"
                      onClick={(e) => changeBase(e)}
                    >
                      <img
                        className="drop-down-Icon"
                        src={
                          temp[0] &&
                          temp[0]["symbol"] &&
                          require(`../../assets/image/cryptoIcon/${temp[0]["symbol"]}.svg`)
                        }
                        alt={temp[0] && temp[0]["symbol"]}
                        width="20px"
                      />
                      <div key={item["symbol"]} className="drop-down-currency">
                        {item["faBaseAsset"]}
                      </div>
                      <div className="drop-down-Index">
                        ({item["baseAsset"]})
                      </div>
                    </div>
                  );
                })}
              <div
                className={`${
                  baseSearchTerm && baseSearchedList.length === 0
                    ? "noResultBaseDiv"
                    : ""
                }`}
              >
                <span className="noResultBase">
                  {baseSearchTerm && baseSearchedList.length === 0
                    ? "نتیجه‌ای یافت نشد"
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div>
            <input
              type="number"
              placeholder="مقدار را وارد کنید"
              onChange={handleChangeBaseCurrency}
              value={baseCurrency || ""}
              className="inputCurrency currencyParts "
            />
          </div>
        </div>
        <img
          src={require("../../assets/image/exchange/money-exchange.png")}
          width="30px"
          alt="exchangeIcon"
          onClick={() => {
            reverseIcon === false
              ? setReverseIcon(true)
              : setReverseIcon(false);
          }}
          className={` convertIcon ${
            reverseIcon === true ? "convertIconReverse" : ""
          }`}
        />
        <div
          className={` quoteCurrency ${
            reverseIcon === true ? "quoteCurrencyReverse" : ""
          }`}
        >
          <div ref={clickRefQuote}>
            <div
              className="selected-drop-down currencyParts"
              onClick={() => setIsQuoteDropDownOpen(!isQuoteDropDownOpen)}
            >
              <div className="selectedAssetAndIconDiv">
                <img
                  className="selectedDropDownIcon"
                  src={require(`../../assets/image/cryptoIcon/${selectedQuoteAsset[0]["symbol"]}.svg`)}
                  alt={selectedQuoteAsset[0]["symbol"]}
                  width="25px"
                />
                <span className="selectedDropDownText">
                  {selectedQuoteCurrency}
                </span>
                <span className="selectedDropDownIndex">
                  ({selectedQuoteAsset[0]["symbol"]})
                </span>
              </div>
              <img
                className={` ${
                  isQuoteDropDownOpen === false
                    ? "dropDownIconClose"
                    : "dropDownIconOpen"
                } `}
                src={require("../../assets/image/arrow/dropDown-Arrow.png")}
                width="15px"
                alt="arrow"
              />
            </div>
            <div
              className={` ${
                isQuoteDropDownOpen ? "drop-down" : "drop-down-None"
              }`}
            >
              <div className="searchQuoteDivDropDown">
                <img
                  className="searchIconDropDown"
                  src={require("../../assets/image/search/magnifying-glass.png")}
                  alt="searchIcon"
                  width="20px"
                />
                <input
                  value={quoteSearchTerm}
                  placeholder="نام ارز"
                  onChange={(e) => changeQuoteSearch(e)}
                  className="searchInputDropDown"
                  type="text"
                />
              </div>
              {uniqQuoteCurrency
                .filter((item) => {
                  return quoteSearchTerm === ""
                    ? item["faQuoteAsset"]
                    : item["faQuoteAsset"].includes(quoteSearchTerm);
                })
                .map((item) => {
                  let mapItem = item;
                  const temp = cryptoSrc.filter((item) => {
                    return item["symbol"] === mapItem["quoteAsset"];
                  });
                  return (
                    <div
                      className="drop-down-Item"
                      key={item["symbol"]}
                      id={item["faQuoteAsset"]}
                      onClick={(e) => changeQuote(e)}
                    >
                      <img
                        className="drop-down-Item-Icon"
                        src={
                          temp[0] &&
                          temp[0]["symbol"] &&
                          require(`../../assets/image/cryptoIcon/${temp[0]["symbol"]}.svg`)
                        }
                        alt={temp[0] && temp[0]["symbol"]}
                        width="20px"
                      />
                      <div key={item["symbol"]} className="drop-down-currency">
                        {item["faQuoteAsset"]}
                      </div>
                      <div className="drop-down-Index">
                        ({item["quoteAsset"]})
                      </div>
                    </div>
                  );
                })}
              <div
                className={`${
                  quoteSearchTerm && quoteSearchedList.length === 0
                    ? "noResultQuoteDiv"
                    : ""
                }`}
              >
                <span className="noResultQuote">
                  {quoteSearchTerm && quoteSearchedList.length === 0
                    ? "نتیجه‌ای یافت نشد"
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div>
            <input
              type="number"
              placeholder="مقدار را وارد کنید"
              onChange={handleChangeQuoteCurrency}
              value={quoteCurrency || ""}
              className="inputCurrency currencyParts "
              // oninput={changeLangNumToEn(this)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
