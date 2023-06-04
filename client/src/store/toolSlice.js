import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  currency: "USD",
  currencyRate: null,
  fetchInterval: 5,
  showAllTickers: false,
  selectedTickers: [
    "**AAPL**",
    "**GOOGL**",
    "**MSFT**",
    "**AMZN**",
    "**FB**",
    "**TSLA**",
  ],
};

export const toolSlice = createSlice({
  name: "toolSlice",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    toggleCurrency: (state, action) => {
      state.currency = state.currency === "USD" ? "UAH" : "USD";
    },
    toggleShowTickers: (state, action) => {
      state.showAllTickers = !state.showAllTickers;
    },
    addTickerToWatchingGroup: (state, action) => {
      const isExist = state.selectedTickers.find(
        (item) => item === action.payload
      );
      if (!isExist) {
        state.selectedTickers.push(action.payload);
      }
    },
    removeTickerFromWatchingGroup: (state, action) => {
      state.selectedTickers = state.selectedTickers.filter(
        (ticker) => ticker !== action.payload
      );
    },
    setWatchingGroup: (state, action) => {
      state.selectedTickers = action.payload; //** */
    },

    setInterval: (state, action) => {
      state.fetchInterval = action.payload;
    },
    setCurrencyRate: (state, action) => {
      state.currencyRate = action.payload;
    },
  },
});

export const selectTheme = (state) => state.toolSlice.darkMode;
export const selectCurrency = (state) => state.toolSlice.currency;
export const showTickers = (state) => state.toolSlice.showAllTickers;
export const selectedTickers = (state) => state.toolSlice.selectedTickers;
export const intervalTimeFromStore = (state) => state.toolSlice.fetchInterval;
export const selectCurrencyRate = (state) => state.toolSlice.currencyRate;

export const {
  toggleTheme,
  toggleCurrency,
  toggleShowTickers,
  addTickerToWatchingGroup,
  removeTickerFromWatchingGroup,
  setInterval,
  setCurrencyRate,
  setWatchingGroup,
} = toolSlice.actions;
