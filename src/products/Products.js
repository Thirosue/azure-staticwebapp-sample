import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ModalYesNo } from '../components';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import useProducts from './useProducts';

const captains = console;

function Products({ history }) {
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    addProduct,
    deleteProduct,
    getProducts,
    products,
    selectProduct,
    selectedProduct,
    updateProduct,
  } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  function addNewProduct() {
    selectProduct({});
    history.push('/products/0');
  }

  function handleCancelProduct() {
    history.push('/products');
    selectProduct(null);
    setProductToDelete(null);
  }

  function handleDeleteProduct(product) {
    selectProduct(null);
    setProductToDelete(product);
    setShowModal(true);
  }

  function handleSaveProduct(product) {
    if (selectedProduct && selectedProduct.name) {
      captains.log(product);
      updateProduct(product);
    } else {
      addProduct(product);
    }
    handleCancelProduct();
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleDeleteFromModal() {
    setShowModal(false);
    deleteProduct(productToDelete);
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
                  selectedProduct={selectedProduct}
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
                    product={selectedProduct}
                    handleCancelProduct={handleCancelProduct}
                    handleSaveProduct={handleSaveProduct}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>

      {showModal && (
        <ModalYesNo
          message={`Would you like to delete ${productToDelete.name}?`}
          onNo={handleCloseModal}
          onYes={handleDeleteFromModal}
        />
      )}
    </>
  );
}

export default Products;
