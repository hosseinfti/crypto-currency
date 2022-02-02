import { useState, useEffect } from "react";

function Calculator(props) {
  const [baseCurrency, setBaseCurrency] = useState();
  const [quoteCurrency, setQuoteCurrency] = useState();
  const [uniqBaseCurrency, setUniqBaseCurrency] = useState([]);
  const [uniqQuoteCurrency, setUniqQuoteCurrency] = useState([]);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("BTC");
  const [selectedQuoteCurrency, setSelectedQuoteCurrency] = useState("USDT");
  const [reverseIcon, setReverseIcon] = useState(false);

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
        item["baseAsset"] === selectedBaseCurrency &&
        item["quoteAsset"] === selectedQuoteCurrency
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
        item["baseAsset"] === selectedBaseCurrency &&
        item["quoteAsset"] === selectedQuoteCurrency
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

  return (
    <div className="calcBody">
      <div className="pairCurrency">
        <div
          className={` baseCurrency ${
            reverseIcon === true ? "baseCurrencyReverse" : ""
          }`}
        >
          <div className="dropDown divDropDown currencyParts">
            <img
              className="dropDownIcon"
              src={require("../assets/image/arrow/dropDown-Arrow.png")}
              width="15px"
              alt="arrow"
            />
            <select
              value={selectedBaseCurrency}
              onChange={(e) => setSelectedBaseCurrency(e.target.value)}
              className=" dropDown"
              id="baseSelect"
            >
              {uniqBaseCurrency.map((item) => {
                return (
                  <>
                    <option key={item["symbol"]} value={item["baseAsset"]}>
                      {item["faBaseAsset"]}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div>
            <input
              placeholder="مقدار را وارد کنید"
              onChange={handleChangeBaseCurrency}
              value={baseCurrency || ""}
              className="inputCurrency currencyParts "
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
          <div className="dropDown divDropDown currencyParts">
            <img
              className="dropDownIcon"
              src={require("../assets/image/arrow/dropDown-Arrow.png")}
              width="15px"
              alt="arrow"
            />
            <select
              value={selectedQuoteCurrency}
              onChange={(e) => setSelectedQuoteCurrency(e.target.value)}
              className="dropDown"
              id="quoteSelect"
            >
              {uniqQuoteCurrency.map((item) => {
                return (
                  <option key={item["symbol"]} value={item["quoteAsset"]}>
                    {item["faQuoteAsset"]}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              placeholder="مقدار را وارد کنید"
              onChange={handleChangeQuoteCurrency}
              value={quoteCurrency || ""}
              className="inputCurrency currencyParts "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
