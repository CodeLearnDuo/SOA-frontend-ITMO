// services/productService.js
import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'https://localhost:25543';

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
  // "Вытаскиваем" только нужные для ProductInput поля
  const {
    name,
    coordinates,
    price,
    partNumber,
    unitOfMeasure,
    manufacturer,
  } = product;

  // Для manufacturer тоже берём только то, что указано в OrganizationInput
  const { name: mName, employeesCount, type } = manufacturer;

  const productInput = {
    name,
    coordinates,
    price,
    partNumber,
    unitOfMeasure,
    manufacturer: {
      name: mName,
      employeesCount,
      type,
    },
  };

  return axios.patch(`${API_BASE_URL}/api/v1/products/${id}`, productInput);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/api/v1/products/${id}`);
};

export const getUnitsOfMeasure = () => {
  return axios.get(`${API_BASE_URL}/api/v1/enums/unit-of-measure`);
};

export const getOrganizationTypes = () => {
  return axios.get(`${API_BASE_URL}/api/v1/enums/organization-type`);
};

export const getManufacturers = () => {
  return axios.get(`${API_BASE_URL}/api/v1/products/manufacturers`);
};

export const getPriceSum = () => {
  return axios.get(`${API_BASE_URL}/api/v1/products/price/sum`);
};
