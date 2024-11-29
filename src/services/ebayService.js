// services/ebayService.js
import axios from 'axios';

const EBAY_API_BASE_URL = 'http://localhost:8081/ebay-service/api/v1/ebay';

export const filterByUnit = (unit) => {
  return axios.get(`${EBAY_API_BASE_URL}/filter/unit-of-measure/${unit}`);
};

export const increasePrices = (percent) => {
  return axios.patch(`${EBAY_API_BASE_URL}/price/increase/${percent}`);
};
