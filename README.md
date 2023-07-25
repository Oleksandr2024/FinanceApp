
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


The tickers I use:

- **AAPL** - Apple
- **GOOGL** - Alphabet
- **MSFT** - Microsoft
- **AMZN** - Amazon
- **FB** - Facebook
- **TSLA** - Tesla

During the building process of this app, the following additional functionalities were implemented:

1. Server-side:

- Server side "getQuotes" function in server.js generates ticker prices with four dimensions: open_price, high_price, low_price, and close_price. This was done to enable candlestick visualization in the chart, similar to real-world stock apps. Additionally, the function considers the close price of a certain ticker and generates new prices with a reasonable price difference to avoid dramatic changes. It also calculates the "change_percent" and "change" based on a comparison between previous and current prices.

- Implemented the ability for users to change the original value of "FETCH_INTERVAL" variable. Users can now adjust the fetch interval within a range of 1 to 50 seconds through the user interface. The updated value is then passed to the server-side and applied to the fetch_interval variable.

2. Client-side:

- Introduced visual effects to highlight positive or negative changes in prices. When the current price differs from the previous one, positive changes are highlighted in green, while negative changes are highlighted in red. The same color visualization is applied to the price chart.

- Implemented the option for users to switch on/off tickers. Initially, the app doesn't track ticker prices. However, users can enable ticker tracking by clicking the visually noticeable button labeled "Show tickers". Under the hood, each switch operation establishes or disconnects a new socket connection accordingly.

- Provided the ability for users to add or remove tickers from their watching group. The app includes a simple "watching group" interface, allowing users to easily add preferred tickers or remove them. By default, all tickers are added to the watching group upon the initial app render.
  During interaction with the app, user's preferences are saved to the Local Storage, ensuring that the watchlist remains accessible even after socket connection is disconnected.

- Added support for a light or dark mode UI interface, enabling users to switch between different visual themes based on their preferences and lighting conditions. Users can toggle between the two modes to customize their viewing experience and enhance usability.

- Integrated multi-currency support, including the national currency of Ukraine "UAH" and the United States dollar "USD". Users can switch between these currencies to view stock prices, changes, and other financial data in their preferred currency. The app uses a specific API for up-to-date currency rates.

- Implemented an app-specific historical price state to visualize a certain amount of price data in the chart.
