import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      { method: "GET" },
      { mode: "no-cors" },
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) =>
    (coin.name.toLowerCase() && coin.symbol.toLowerCase()).includes(
      search.toLowerCase(),
    ),
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <form action="">
          <input
            type="text"
            className="coin-input"
            placeholder="Search Coin or Symbol..."
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="title-heading">
        <p className="title-name">Name</p>
        <p className="title-price">Coin Price</p>
        <p> Change's (24hr)</p>
        <p>Market Cap</p>
        <p>Currency Rank</p>
      </div>

      {filteredCoins.map((coin) => {
        return (
          <Fragment key={coin.id}>
            <Coin
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              pricechange={coin.price_change_percentage_24h}
              marketRank={coin.market_cap_rank}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export default App;
