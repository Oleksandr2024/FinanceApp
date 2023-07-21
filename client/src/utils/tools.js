// Here are just some functional tools that we can use in our app. Not to pollute components, so some functionality will be there

export const getNameFromAbbreviation = (abbr) => {
  const abbreviationMapping = {
    AAPL: "Apple",
    GOOGL: "Alphabet",
    MSFT: "Microsoft",
    AMZN: "Amazon",
    FB: "Meta",
  };

  return abbreviationMapping[abbr] || "Tesla";
};

//-------------------------------------------------------------------------------------------------

export const getLatestGeneratedTickers = (tickers) => {
  return tickers[tickers.length - 1];
};

//-------------------------------------------------------------------------------------------------

export const generateRandomKey = () => {
  const key = Math.floor(Math.random() * 1000 * (Math.random() * 1000));
  return key;
};

//-------------------------------------------------------------------------------------------------
export const getImageSource = (ticker) => {
  const imageSourceMapping = {
    AAPL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/640px-Apple-logo.png",
    GOOGL:
      "https://toppng.com/uploads/preview/alphabet-logo-11530965262mcvcbhaafb.png",
    MSFT: "https://static.vecteezy.com/system/resources/previews/019/017/460/non_2x/microsoft-transparent-logo-free-png.png",
    AMZN: "https://banner2.cleanpng.com/20180721/tbz/kisspng-amazon-com-brand-logo-e-commerce-customer-international-volunteering-5b534dc6015e31.6273062615321860540056.jpg",
    FB: "https://img.freepik.com/free-vector/meta-icon-social-media-flat-graphic-vector-3-november-2021-bangkok-thailand_53876-157871.jpg?w=2000",
  };

  return (
    imageSourceMapping[ticker] ||
    "https://www.kindpng.com/picc/m/113-1136446_tesla-logo-png-tesla-logo-transparent-png.png"
  );
};

//-----------------------------------------------------------------------------------------------
export const findTickerForPage = (id, tickers) => {
  const myTicker = tickers?.find(
    (ticker) => ticker.ticker === id.toUpperCase()
  );
  return myTicker;
};

//-------------------------------------------------------------------------------------------------
//get ticker price USD or UAH depending on currency state

export const getTickerPrice = (currency, price, currencyRate) => {
  let tickerPrice;
  if (currency === "USD") {
    tickerPrice = price;
  } else if (currency === "UAH") {
    tickerPrice = (price * currencyRate).toFixed(0);
  }
  return tickerPrice;
};

//--------------------------------------------------------------
// get only tickers that are in a user's watch list

export const getTickersToDisplay = (tickersArray, watchingList) => {
  const tickersToDisplay = tickersArray.filter((item) =>
    watchingList.includes(`**${item.ticker}**`)
  );
  return tickersToDisplay;
};

//----------------------- information about company

export const getInfoAboutCompany = (companyAbbreviation) => {
  const companyInfoMapping = {
    AAPL:
      "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the world's largest technology company by revenue, with US$394.3 billion in 2022 revenue. As of March 2023, Apple is the world's biggest company by market capitalization. As of June 2022, Apple is the fourth-largest personal computer vendor by unit sales and second-largest mobile phone manufacturer. It is one of the Big Five American information technology companies, alongside Alphabet Inc. (parent company of Google), Amazon, Meta Platforms (formerly Facebook, Inc.), and Microsoft" +
      "Apple was founded as Apple Computer Company on April 1, 1976, by Steve Wozniak, Steve Jobs and Ronald Wayne to develop and sell Wozniak's Apple I personal computer. It was incorporated by Jobs and Wozniak as Apple Computer, Inc. in 1977.",
    GOOGL:
      "Alphabet Inc. is an American multinational technology conglomerate holding company headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries. Alphabet is the world's third-largest technology company by revenue and one of the world's most valuable companies. It is one of the Big Five American information technology companies, alongside Amazon, Apple, Meta, and Microsoft.",
    MSFT: "Microsoft Corporation is an American multinational technology corporation headquartered in Redmond, Washington. Microsoft's best-known software products are the Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 14 in the 2022 Fortune 500 rankings of the largest United States corporations by total revenue, it was the world's largest software maker by revenue as of 2022. It is considered as one of the Big Five American information technology companies, alongside Alphabet (parent company of Google), Amazon, Apple, and Meta (formerly Facebook). Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.",
    AMZN: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It has been often referred to as 'one of the most influential economic and cultural forces in the world', and is often regarded as one of the world's most valuable brands. It is considered as one of the Big Five American technology companies, alongside Alphabet (parent company of Google), Apple, Meta (formerly Facebook Inc.) and Microsoft. Amazon was founded by Jeff Bezos from his garage in Bellevue, Washington, on July 5, 1994. Initially an online marketplace for books, it has expanded into a multitude of product categories, a strategy that has earned it the moniker The Everything Store.",
    FB: "Meta Platforms, Inc., formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services (such as great JavaScript framework ReactJS). Meta is one of the world's most valuable companies and among the ten largest publicly traded corporations in the United States. It is considered one of the Big Five American information technology companies, alongside Alphabet (Google), Amazon, Apple, and Microsoft. Meta's products and services include Facebook, Instagram, WhatsApp, Messenger, and Meta Quest. It has acquired Oculus, Mapillary, CTRL-Labs, Kustomer, and has a 9.99% stake in Jio Platforms. In 2021, the company generated 97.5% of its revenue from the sale of advertising. On October 28, 2021, the parent company of Facebook changed its name from Facebook, Inc., to Meta Platforms, Inc., to 'reflect its focus on building the metaverse'. According to Meta, the 'metaverse' refers to the integrated environment that links all of the company's products and services.",
  };
  return (
    companyInfoMapping[companyAbbreviation] ||
    "Tesla, Inc. is an American multinational automotive and clean energy company headquartered in Austin, Texas. Tesla designs and manufactures electric vehicles (electric cars and trucks), battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. Tesla is one of the world's most valuable companies and, as of 2023, is the world's most valuable automaker. In 2022, the company had the most worldwide sales of battery electric vehicles, capturing 18% of the market. Through its subsidiary Tesla Energy, the company develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 6.5 gigawatt-hours (GWh) installed in 2022. Tesla was incorporated in July 2003 by Martin Eberhard and Marc Tarpenning as Tesla Motors. The company's name is a tribute to inventor and electrical engineer Nikola Tesla. In February 2004, via a $6.5 million investment, Elon Musk became the largest shareholder of the company. He has served as CEO since 2008."
  );
};

//--------------------------------------------------------------------------------
export const convertDataToChartData = (dataSet, ticker) => {
  const tickerChartData = [];

  const tickerData = dataSet.find((item) => item.ticker === ticker)?.data;

  if (tickerData) {
    // Get the last 30 elements if the array length exceeds 30
    const dataSlice = tickerData.slice(-30);

    dataSlice.forEach((item) => {
      const price = item[0].price;
      const lastTradeTime = item[0].last_trade_time;

      const chartItem = {
        x: lastTradeTime,
        y: [
          price.open_price,
          price.high_price,
          price.low_price,
          price.close_price,
        ],
      };

      tickerChartData.push(chartItem);
    });
  }

  return tickerChartData;
};

//-------------------------------------
export const convertDataToChartDataUAH = (dataSet, ticker, currencyRate) => {
  const tickerChartData = [];

  const tickerData = dataSet.find((item) => item.ticker === ticker)?.data;

  if (tickerData) {
    // Get the last 30 elements if the array length exceeds 30
    const dataSlice = tickerData.slice(-30);

    dataSlice.forEach((item) => {
      const price = item[0].price;
      const lastTradeTime = item[0].last_trade_time;

      const chartItem = {
        x: lastTradeTime,
        y: [
          (price.open_price * currencyRate).toFixed(2),
          (price.high_price * currencyRate).toFixed(2),
          (price.low_price * currencyRate).toFixed(2),
          (price.close_price * currencyRate).toFixed(2),
        ],
      };

      tickerChartData.push(chartItem);
    });
  }

  return tickerChartData;
};
