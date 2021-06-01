import axios from 'axios';
import { parseItem } from '../utils/action-utils';
import API from './config';
import querystring from 'querystring';

const captains = console;

export const deleteProductApi = (product) => {
  return axios.delete(`${API}/products/${product.id}`)
    .then(response => parseItem(response, 200));
};

export const updateProductApi = (product) => {
  captains.log(product.id);
  return axios.put(`${API}/products/${product.id}`, product)
    .then(response => parseItem(response, 200));
};

export const addProductApi = (product) => {
  return axios.post(`${API}/products`, product)
    .then(response => parseItem(response, 201));
};

export const loadProductsApi = (query) => {
  return axios.get(`${API}/products?${querystring.stringify(query)}`)
    .then(response => parseItem(response, 200));
};
