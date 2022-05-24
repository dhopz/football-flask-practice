export const CoinPrices = (coins, currency) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=${currency}`

export const FootballLeagues = () =>
    'http://127.0.0.1:5000/leagues'