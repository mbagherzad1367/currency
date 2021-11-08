import React, { useMemo, useState } from "react";
import styles from "./styles/main.module.scss";
export default function App() {
  const [value, setValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies] = useState(["EUR", "USD", "CAD", "GBP"]);
  const [result, setResult] = useState(0);
  const fromCurrencies = useMemo(() => {
    return currencies.filter((c) => c !== toCurrency);
  }, [currencies, toCurrency]);
  const toCurrencies = useMemo(() => {
    return currencies.filter((c) => c !== fromCurrency);
  }, [currencies, fromCurrency]);
  const convert = async (e) => {
    e.preventDefault();
    const formValid = +value >= 0 && fromCurrency && toCurrency;
    if (!formValid) {
      return;
    }
    const res = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=b354b5f63b5e41c5ba855a2c46fecdc4`
    );
    const { rates } = await res.json();
    setResult(+value * rates[toCurrency]/rates[fromCurrency]);
  };
  return (
    <div className={styles.backdrop}>
      <form className={styles.form} onSubmit={convert}>
        <input
          className={styles.inputClass}
          value={value}
          type="number"
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={styles.selector__container}>
          <select
            className={styles.selector}
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {fromCurrencies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={styles.divClass}>
          {value} {fromCurrency} is {result.toFixed(2)} {toCurrency}
        </div>
        <div className={styles.selector__container}>
          <select
            className={styles.selector}
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {toCurrencies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <button className={styles.exchange_back} type="submit">
            Exchange
          </button>
        </div>
      </form>
    </div>
  );
}
