"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let fetch_interval = 5000;
let timer;
const PORT = process.env.PORT || 4000;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

//Memory storage for (temporary) data persist
let generatedQuotes = [];

//keep track of quotes array length not be longer than 10
function trackQuotesLength(quotes) {
  const newQuotes = [...quotes];
  // console.log("length: " + newQuotes.length);
  if (quotes.length > 10) {
    newQuotes.shift();
  }
  return newQuotes;
}

function getQuotes(socket, quotes) {
  //if app just starts and we have an empty generatedQuotes array
  if (!quotes?.length) {
    const newQuotes = tickers.map((ticker) => {
      const openPrice = randomValue(100, 300, 2);
      const highPrice = (Number(openPrice) + Math.random() * 30).toFixed(2);
      const lowPrice = (openPrice - Math.random() * 30).toFixed(2);
      const closePrice = (
        (Number(highPrice) + Number(lowPrice) + Number(openPrice)) /
        3
      ).toFixed(2);
      const priceGap = closePrice - openPrice;
      return {
        ticker,
        exchange: "NASDAQ",
        price: {
          //in order to build candlestick chart we need to have 4 prices values, 2nd reason is to have mock data but still to be close to real life price changes, not with huge gap every time
          open_price: openPrice,
          high_price: highPrice,
          low_price: lowPrice,
          close_price: closePrice,
        },
        change: priceGap.toFixed(2), //was randomValue(-30, 30, 2),
        change_percent: ((priceGap / openPrice) * 100).toFixed(2), //was randomValue(-3, 3, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
      };
    });
    //emit data to client side
    socket.emit("data", newQuotes);

    //add generated data to local state
    generatedQuotes.push(newQuotes);
    //keep track of quotes length, not to oversize it
    generatedQuotes = trackQuotesLength(generatedQuotes);
    //If we have data in generatedQuotesArray (second and next following generating actions)
  } else if (quotes.length > 0) {
    //grab last set of previous generated tickers and map through it
    const newQuotes = quotes[quotes.length - 1].map((ticker, index) => {
      //grab close price of a certain ticker corresponding to index, so it'll be open price of a next one
      const openPrice = quotes[quotes.length - 1][index].price.close_price;
      const highPrice = (Number(openPrice) + Math.random() * 30).toFixed(2);
      let lowPrice = (openPrice - Math.random() * 30).toFixed(2);
      //if app runs for a long period of time it can happen (lowPrice < 1)
      if (lowPrice < 1) {
        lowPrice = 1;
      }
      const closePrice = (
        (Number(highPrice) + Number(lowPrice) + Number(openPrice)) /
        3
      ).toFixed(2);
      const priceGap = closePrice - openPrice;
      return {
        ticker: ticker.ticker,
        exchange: "NASDAQ",
        price: {
          open_price: openPrice,
          high_price: highPrice,
          low_price: lowPrice,
          close_price: closePrice,
        },
        change: priceGap.toFixed(2), //instead of randomValue(-30, 30, 2),
        change_percent: ((priceGap / openPrice) * 100).toFixed(2), //instead of randomValue(-3, 3, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
      };
    });
    //emit data to client side
    socket.emit("data", newQuotes);
    //add generated data to local state
    generatedQuotes.push(newQuotes);
    //keep track of quotes length, not to oversize it
    generatedQuotes = trackQuotesLength(generatedQuotes); //probably not good approach..
  }
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket, generatedQuotes); //**modified, added 2nd parameter */

  //if user sets new fetch_interval value, we need to restart Interval function
  if (timer) {
    clearInterval(timer);
  }
  // every N seconds
  timer = setInterval(function () {
    getQuotes(socket, generatedQuotes);
  }, fetch_interval);

  socket.on("disconnect", function () {
    // console.log("user " + socket.id + " disconnected");
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  // console.log(`user with id ${socket.id} joined`);
  trackTickers(socket);

  //incoming "setInterval" from client
  socket.on("setInterval", (data) => {
    fetch_interval = data * 1000;
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
