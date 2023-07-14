import "./Coin.css";

function Coin({ image, name, price, marketRank, pricechange, marketcap }) {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
        </div>
        <div className="coin-data">
          <p className="coin-price">Rs.{price}</p>
          {pricechange < 0 ? (
            <p className="coin-percent red">{pricechange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{pricechange.toFixed(2)}%</p>
          )}
          <p className="coin-marketcap">Mkt Cap: Rs.{marketcap}</p>
          <p className="coin-marketRank">{marketRank}</p>
        </div>
      </div>
    </div>
  );
}

export default Coin;
