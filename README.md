# React Test Task

## Requirements

We need you to implement a solution to display price tickers data on the UI in realtime.

Price data is available from a locally running service (see information below). Any additional visualisations to indicate how prices have changed would be a plus. Testing is also an important part to this exercise.

Requirements:

- application should connect to the locally running service
- application should render price changes for some tickers in real time

You can get some ideas how your application may look like on the [Google Finance](https://www.google.com/finance/) page.

As a bonus you can implement (please describe implemented bonus functionality in this file): **PLEASE SCROLL DOWN TO SEE THE DESCRIPTION**

- any additional visual effects to highlight positive or negative changes in the prices +
- the possibility to switch on/off tickers by user +
- the possibility to specify interval time by user +
- the possibility to add/remove ticker from watching group +
- any additional functionality you consider useful +(darkMode, currency)

You should use the next technologies:

- React (preferable with hooks) +
- Redux (with Redux-Thunk or any other Redux middleware you are familiar) or any other state-manager library you want +
- Socket.io - to connect to the service +
- any UI library you want, or you can use just pure CSS (add Matherial UI buttons -)
- Testing Library -

We will assess the next parts:

- workability: how your application works
- projects structure: how you structure your files
- code quality: how you write clean, readable code (feel free to install and use ESLint and Prettier)
- knowledge React and its ecosystem: how you compose and use libraries together
- testing: how you can test your code

## Running the local service

1. Open a new bash shell
2. `cd server`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`
5. You can visit [http://localhost:4000](http://localhost:4000) to check that the service is working correctly and inspect the data it produces.

## Run your application

1. Open a new bash shell
2. `cd client`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`

## Run the tests

1. Open a new bash shell
2. `cd client`
3. `npm run test` or `yarn test`

# Price Service Usage

URL:
`http://localhost:4000`

Price tickers are real-time via web-sockets.

## Example JSON Response from the Price Ticker service

```json
[
  {
    "ticker": "AAPL",
    "exchange": "NASDAQ",
    "price": 279.29,
    "change": 64.52,
    "change_percent": 0.84,
    "dividend": 0.56,
    "yield": 1.34,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "GOOGL",
    "exchange": "NASDAQ",
    "price": 237.08,
    "change": 154.38,
    "change_percent": 0.1,
    "dividend": 0.46,
    "yield": 1.18,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "MSFT",
    "exchange": "NASDAQ",
    "price": 261.46,
    "change": 161.45,
    "change_percent": 0.41,
    "dividend": 0.18,
    "yield": 0.98,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "AMZN",
    "exchange": "NASDAQ",
    "price": 260.34,
    "change": 128.71,
    "change_percent": 0.6,
    "dividend": 0.07,
    "yield": 0.42,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "FB",
    "exchange": "NASDAQ",
    "price": 266.77,
    "change": 171.92,
    "change_percent": 0.75,
    "dividend": 0.52,
    "yield": 1.31,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {
    "ticker": "TSLA",
    "exchange": "NASDAQ",
    "price": 272.13,
    "change": 158.76,
    "change_percent": 0.1,
    "dividend": 0.96,
    "yield": 1.0,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  }
]
```

The tickers we use:

- **AAPL** - Apple
- **GOOGL** - Alphabet
- **MSFT** - Microsoft
- **AMZN** - Amazon
- **FB** - Facebook
- **TSLA** - Tesla

## How to complete the task

1. Clone or fork this repository
2. Modify content of the folder `client`
3. Modify content of the folder `server` - if you want to complete bonus tasks
4. Commit and push your code to your repository
5. Send us link to your repository

During the building process of this app, the following additional functionalities were implemented:

1. Server-side:

- Refactored the original "getQuotes" function in server.js to generate ticker prices with four dimensions: open_price, high_price, low_price, and close_price. This was done to enable candlestick visualization in the chart, similar to real-world stock apps. Additionally, the function considers the close price of a certain ticker and generates new prices with a reasonable price difference to avoid dramatic changes. It also calculates the "change_percent" and "change" based on a comparison between previous and current prices.

- Implemented the ability for users to change the original value of "FETCH_INTERVAL" variable. Users can now adjust the fetch interval within a range of 1 to 50 seconds through the user interface. The updated value is then passed to the server-side and applied to the fetch_interval variable.

2. Client-side:

- Introduced visual effects to highlight positive or negative changes in prices. When the current price differs from the previous one, positive changes are highlighted in green, while negative changes are highlighted in red. The same color visualization is applied to the price chart.

- Implemented the option for users to switch on/off tickers. Initially, the app doesn't track ticker prices. However, users can enable ticker tracking by clicking the visually noticeable button labeled "Show tickers". Under the hood, each switch operation establishes or disconnects a new socket connection accordingly.

- Provided the ability for users to add or remove tickers from their watching group. The app includes a simple "watching group" interface, allowing users to easily add preferred tickers or remove them. By default, all tickers are added to the watching group upon the initial app render.
  During interaction with the app, user's preferences are saved to the Local Storage, ensuring that the watchlist remains accessible even after socket connection is disconnected.

- Added support for a light or dark mode UI interface, enabling users to switch between different visual themes based on their preferences and lighting conditions. Users can toggle between the two modes to customize their viewing experience and enhance usability.

- Integrated multi-currency support, including the national currency of Ukraine "UAH" and the United States dollar "USD". Users can switch between these currencies to view stock prices, changes, and other financial data in their preferred currency. The app uses a specific API for up-to-date currency rates.

- Implemented an app-specific historical price state to visualize a certain amount of price data in the chart.
