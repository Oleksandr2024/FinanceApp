import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  tickers: [],
  chartData: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      state.isConnected = true;
    },
    //receive data from server and push it to tickers state
    receiveData: (state, action) => {
      const incomingTickers = action.payload;
      if (state.tickers.length < 200) {
        state.tickers.push(incomingTickers);
      } else if (state.tickers.length >= 200) {
        state.tickers.shift(); // not to oversize length
        state.tickers.push(incomingTickers);
      }
      //fill chartData state with new incoming tickers
      incomingTickers.forEach((ticker) => {
        //create an appropriate object structure
        const { ticker: symbol, price, last_trade_time } = ticker;
        const { open_price, high_price, low_price, close_price } = price;

        const timestamp = new Date(last_trade_time).getTime();

        const dataItem = {
          price: {
            open_price: parseFloat(open_price),
            high_price: parseFloat(high_price),
            low_price: parseFloat(low_price),
            close_price: parseFloat(close_price),
          },
          last_trade_time: timestamp,
        };

        // Find the existing data of chartData array for the current ticker, or create a new one if it doesn't exist
        let dataArr = state.chartData.find(
          (item) => item.ticker === symbol
        )?.data;

        if (!dataArr) {
          dataArr = [];
          state.chartData.push({ ticker: symbol, data: dataArr });
        }

        // Add the new data item to the data array
        dataArr.push([dataItem]);
      });
    },
    disconnectServer: (state, action) => {
      state.isConnected = false;
    },
  },
});

export const selectAllTickers = (state) => state.data.tickers;
export const selectConnectionState = (state) => state.data.isConnected;
export const selectChartData = (state) => state.data.chartData;

export const { receiveData, connectSocket, disconnectServer } =
  dataSlice.actions;
