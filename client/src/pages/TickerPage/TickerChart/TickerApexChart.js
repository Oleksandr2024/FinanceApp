import { useSelector } from "react-redux";
import { selectCurrency, selectCurrencyRate } from "../../../store/toolSlice";
import {
  convertDataToChartData,
  convertDataToChartDataUAH,
} from "../../../utils/tools";
import dayjs from "dayjs";
import Chart from "react-apexcharts";
import styles from "./TickerApexChart.module.css";
import TickerChartElements from "./TickerChartElements/TickerChartElements";
import { selectChartData } from "../../../store/dataSlice";

const TickerApexChart = ({
  ticker,
  darkMode,
  price,
  changePercent,
  change,
}) => {
  const currency = useSelector(selectCurrency);
  const currencyRate = useSelector(selectCurrencyRate);

  const chartData = useSelector(selectChartData);

  let dataForChart = convertDataToChartData(chartData, ticker);

  let dataForChartUAH = convertDataToChartDataUAH(
    chartData,
    ticker,
    currencyRate
  );

  //--------------chart config
  const options = {
    series: [
      {
        name: "candle",
        data: currency === "USD" ? dataForChart : dataForChartUAH, //our actual data (x = x-axis (date), y = y axis (actual data) )
      },
    ],

    plotOptions: {
      bar: {
        columnWidth: "20%",
        colors: {
          ranges:
            currency === "USD"
              ? [
                  {
                    from: 0,
                    to: 500,
                    color: "#FEB019",
                  },
                ]
              : [
                  {
                    from: 0,
                    to: 15000,
                    color: "#FEB019",
                  },
                ],
        },
      },
      candlestick: {
        wick: {
          useFillColor: true, //makes little border around each candle
        },
        colors: {
          upward: darkMode ? "#43b800" : "#507a38",
          downward: "#ae0000",
        },
      },
    },

    stroke: {
      width: 0.8,
    },

    grid: {
      padding: {
        bottom: 10,
      },
    },

    chart: {
      height: 350,
      type: "candlestick",
      background: darkMode ? "#14161a" : "#e0e6f4", //sets background
      fontFamily: "Montserrat",
      foreColor: darkMode ? "white" : "#373d3f", // *** font color
      animations: {
        enabled: false,
        easing: "easeout",
        speed: 500,
        animateGradually: {
          //Gradually animate one by one every data in the series instead of animating all at once
          enabled: true,
          delay: 750,
        },
        dynamicAnimation: {
          enabled: true, //Animate the chart when data is changed and chart is re-rendered.
          speed: 750, //Speed at which dynamic animation runs whenever data changes.
        },
      },
    },
    title: {
      text: `${ticker} stock prices`,
      align: "center",
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return dayjs(val).format("MMM DD HH:mm");
        },
      },
    },

    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className={styles.ticker_chart}>
      <TickerChartElements
        changePercent={changePercent}
        price={price}
        change={change}
        currency={currency}
        darkMode={darkMode}
      />
      <Chart
        style={{ margin: "0 auto" }}
        options={options}
        series={options.series}
        type="candlestick"
        width="100%"
        height={"100%"}
      />
    </div>
  );
};

export default TickerApexChart;
