// services/productService.js
import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'https://localhost:8443';

export const getProducts = async ({ page = 1, size = 10, sort = ["id"], filter }) => {
  const params = {
    page,
    size,
    sort, // передаем массив сортировки
    filter, // передаем массив фильтрации, если он задан
  };

  return await axios.get(`${API_BASE_URL}/api/v1/products/`, {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};

export const getProductById = (id) => {
  return axios.get(`${API_BASE_URL}/api/v1/products/${id}`);
};

export const createProduct = (product) => {
  return axios.post(`${API_BASE_URL}/api/v1/products/`, product);
};

export const updateProduct = (id, product) => {
  return axios.patch(`${API_BASE_URL}/api/v1/products/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/api/v1/products/${id}`);
};

export const getUnitsOfMeasure = () => {
  return axios.get(`${API_BASE_URL}/enums/unit-of-measure`);
};

export const getOrganizationTypes = () => {
  return axios.get(`${API_BASE_URL}/enums/organization-type`);
};

export const getManufacturers = () => {
  return axios.get(`${API_BASE_URL}/api/v1/products/manufacturers`);
};

export const getPriceSum = () => {
  return axios.get(`${API_BASE_URL}/api/v1/products/price/sum`);
};