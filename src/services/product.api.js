/* eslint-disable */
import axios from 'axios';
import { parseItem, parseList } from '../utils/action-utils';
import API from './config';

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

export const loadProductsApi = () => {
  return axios.get(`${API}/products`)
    .then(response => parseList(response, 200));
};
