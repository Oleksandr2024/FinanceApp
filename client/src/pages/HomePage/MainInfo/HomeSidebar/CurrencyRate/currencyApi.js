//import axios from "axios"; also uncomment when use this API

export const fetchCurrencyRate = async () => {
  return 37; //hardcoded for now not to exceed the limit per month (200)
  // try {
  //   const response = await axios.get(process.env.REACT_APP_CURRENCY_API);

  //   // Extract the conversion rate from the response
  //   const usdToUahRate = Number(response.data.rates.UAH).toFixed(2);

  //   return usdToUahRate;
  // } catch (error) {
  //   console.error("Error fetching conversion rate:", error);
  //   return null;
  // }
};
