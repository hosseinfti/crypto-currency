import { useState, useEffect } from "react";

function Calculator(props) {
  const [baseCurrency, setBaseCurrency] = useState();
  const [quoteCurrency, setQuoteCurrency] = useState();
  const [uniqBaseCurrency, setUniqBaseCurrency] = useState([]);
  const [uniqQuoteCurrency, setUniqQuoteCurrency] = useState([]);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("بیت کوین");
  const [selectedQuoteCurrency, setSelectedQuoteCurrency] = useState("تتر");
  const [reverseIcon, setReverseIcon] = useState(false);
  const [noneQuote, setNoneQuote] = useState(false);
  const [noneBase, setNoneBase] = useState(false);
  const [baseSearch, setBaseSearch] = useState("");
  const [quoteSearch, setQuoteSearch] = useState("");

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
    convertToQuote(event.target.value);
    setBaseCurrency(event.target.value);
  }
  function handleChangeQuoteCurrency(event) {
    convertToBase(event.target.value);
    setQuoteCurrency(event.target.value);
  }

  // let map =  ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  // function changeLangNumToEn(event) {
  //   event.value = event.value.replace(/\d/g, function(match){
  //     return map[match]
  //   })
  // }
  function changeBase(event) {
    setSelectedBaseCurrency(event.target.innerText);
    setNoneBase(false);
  }
  function changeQuote(event) {
    setSelectedQuoteCurrency(event.target.innerText);
    setNoneQuote(false);
  }
  function changeBasaeSearch(e) {
    setBaseSearch(e.target.value);
  }
  function changeQuoteSearch(e) {
    setQuoteSearch(e.target.value);

  }

  return (
    <div className="calcBody">
      <div className="pairCurrency">
        <div
          className={` baseCurrency ${
            reverseIcon === true ? "baseCurrencyReverse" : ""
          }`}
        >
          {/* <div className="dropDown divDropDown currencyParts"> */}

          {/* <select
              value={selectedBaseCurrency}
              onChange={(e) => setSelectedBaseCurrency(e.target.value)}
              className=" dropDown"
              id="baseSelect"
            >
              {uniqBaseCurrency.map((item) => {
                return (
                  <>
                    <div>
                      <option key={item["symbol"]} value={item["baseAsset"]}>
                        {item["faBaseAsset"]}
                      </option>
                    </div>
                  </>
                );
              })}
            </select> */}
          <div
            // onm={setNoneBase(false)}
            // onClickCapture={() => setNoneBase(false)}
            onClick={() => setNoneBase(noneBase ? false : true)}
            className="selected-drop-down currencyParts"
          >
            <span className="dropDownText">{selectedBaseCurrency}</span>
            <img
              className="dropDownIcon"
              src={require("../assets/image/arrow/dropDown-Arrow.png")}
              width="15px"
              alt="arrow"
            />
          </div>
          <div className={` ${noneBase ? "drop-down" : "drop-down-None"}`}>
            <div className="searchBaseDivDropDown">
              <input
                value={baseSearch}
                onChange={(e) => changeBasaeSearch(e)}
                className="searchInputDropDown inputCurrency"
                type="text"
              />
              <img
                className="searchBaseIconDropDown"
                src={require("../assets/image/search/magnifying-glass.png")}
                alt="searchIcon"
                width="20px"
              />
            </div>
            {uniqBaseCurrency
              .filter((item) => {
                return baseSearch === "" ? item["faBaseAsset"] : item["faBaseAsset"].includes(baseSearch);
              })
              .map((item) => {
                return (
                  <div
                    key={item["symbol"]}
                    onClick={(e) => changeBase(e)}
                    className="drop-down-Item"
                  >
                    {item["faBaseAsset"]}
                  </div>
                );
              })}
          </div>

          {/* </div> */}
          <div>
            <input
              placeholder="مقدار را وارد کنید"
              onChange={handleChangeBaseCurrency}
              value={baseCurrency || ""}
              className="inputCurrency currencyParts "
              // oninput={changeLangNumToEn(this)}
            />
          </div>
        </div>
        <div
          onClick={() => {
            reverseIcon === false
              ? setReverseIcon(true)
              : setReverseIcon(false);
          }}
          className={` convertIcon ${
            reverseIcon === true ? "convertIconReverse" : ""
          }`}
        >
          &#8646;
        </div>
        <div
          className={` quoteCurrency ${
            reverseIcon === true ? "quoteCurrencyReverse" : ""
          }`}
        >
          {/* <div className="dropDown divDropDown currencyParts"> */}
          {/* <img
              className="dropDownIcon"
              src={require("../assets/image/arrow/dropDown-Arrow.png")}
              width="15px"
              alt="arrow"
            /> */}
          {/* <select
              value={selectedQuoteCurrency}
              onChange={(e) => setSelectedQuoteCurrency(e.target.value)}
              className="dropDown"
              id="quoteSelect"
            >
              {uniqQuoteCurrency.map((item) => {
                return (
                  <div>
                    <div className=""></div>
                    <option key={item["symbol"]} value={item["quoteAsset"]}>
                      {item["faQuoteAsset"]}
                    </option>
                  </div>
                );
              })}
            </select> */}
          <div
            // onMouseOver={setNoneQuote(false)}
            // onMouseUp={setNoneQuote(false)}
            onClick={() => setNoneQuote(noneQuote ? false : true)}
            className="selected-drop-down currencyParts"
          >
            <span className="dropDownText">{selectedQuoteCurrency}</span>
            <img
              className="dropDownIcon"
              src={require("../assets/image/arrow/dropDown-Arrow.png")}
              width="15px"
              alt="arrow"
            />
          </div>
          <div className={` ${noneQuote ? "drop-down" : "drop-down-None"}`}>
            <div className="searchQuoteDivDropDown">
              <input
              value={quoteSearch}
              onChange={(e) => changeQuoteSearch(e)}
                className="searchInputDropDown inputCurrency"
                type="text"
              />
              <img
                className="searchQuoteIconDropDown"
                src={require("../assets/image/search/magnifying-glass.png")}
                alt="searchIcon"
                width="20px"
              />
            </div>
            {uniqQuoteCurrency
            .filter((item) => {
              return quoteSearch === "" ? item["faQuoteAsset"] : item["faQuoteAsset"].includes(quoteSearch);
            })
            .map((item) => {
              return (
                <div
                  key={item["symbol"]}
                  onClick={(e) => changeQuote(e)}
                  className="drop-down-Item"
                >
                  {item["faQuoteAsset"]}
                </div>
              );
            })}
          </div>
          {/* </div> */}
          <div>
            <input
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
