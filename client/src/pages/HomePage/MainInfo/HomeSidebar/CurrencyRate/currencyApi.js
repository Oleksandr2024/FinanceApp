import axios from "axios";

export const fetchCurrencyRate = async () => {
  try {
    const response = await axios.get(
      "https://api.currencyfreaks.com/latest?apikey=6a6c5f7a51b7404ba3e49f0f2e6efbe9&symbols=UAH"
    );

    // Extract the conversion rate from the response
    const usdToUahRate = Number(response.data.rates.UAH).toFixed(2);

    return usdToUahRate;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return null;
  }
};
