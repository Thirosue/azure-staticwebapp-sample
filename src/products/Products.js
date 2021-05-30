/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { head } from 'lodash';

import useProducts from '../hooks/useProducts';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';

const captains = console;

const selectedProduct = {
  id: 10,
  name: 'Strawberries',
  description: '16oz package of fresh organic strawberries',
  quantity: 1,
};

function Products({ history }) {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [product, selectProduct] = useState({});

  function addNewProduct() {
    selectProduct({});
    history.push('/products/0');
  }

  function handleCancelProduct() {
    history.push('/products');
    selectProduct(null);
  }

  async function handleDeleteProduct(product) {
    selectProduct(null);
    await deleteProduct(product)
  }

  function handleSaveProduct(product) {
    if (product.id) {
      captains.log(product);
      updateProduct(product);
    } else {
      addProduct(product);
    }
    handleCancelProduct();
  }

  function handleSelectProduct(selectedProduct) {
    selectProduct(selectedProduct);
    captains.log(`you selected ${selectedProduct.name}`);
  }

  return (
    <>
      <div className="columns is-multiline is-variable">
        <div className="column is-8">
          <Switch>
            <Route
              exact
              path="/products"
              component={() => (
                <ProductList
                  products={products}
                  addNewProduct={addNewProduct}
                  selectedProduct={product}
                  handleSelectProduct={handleSelectProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
              )}
            />
            <Route
              exact
              path="/products/:id"
              component={() => {
                return (
                  <ProductDetail
                    product={product}
                    handleCancelProduct={handleCancelProduct}
                    handleSaveProduct={handleSaveProduct}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Products;
