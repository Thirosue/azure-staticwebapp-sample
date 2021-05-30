/* eslint-disable */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GlobalContext from '../context/global-context';
import useConfirm from '../hooks/useConfirm';
import useProducts from '../hooks/useProducts';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';

import { Progress } from '../components';

const captains = console;

function Products({ history }) {
  const confirm = useConfirm();
  const context = React.useContext(GlobalContext);

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [product, selectProduct] = React.useState({});

  function addNewProduct() {
    selectProduct({});
    history.push('/products/0');
  }

  function handleCancelProduct() {
    history.push('/products');
    selectProduct({});
  }

  async function handleDeleteProduct(product) {
    confirm({ description: '本当に削除しますか?' })
      .then(async () => {
        selectProduct({});
        context.startProcess();
        await deleteProduct(product).finally(() => context.endProcess());
        window.location.reload();
      });
  }

  async function handleSaveProduct(product) {
    context.startProcess();
    if (product.id) {
      captains.log(product);
      await updateProduct(product).finally(() => context.endProcess());
    } else {
      await addProduct(product).finally(() => context.endProcess());
    }
    handleCancelProduct();
    window.location.reload();
  }

  function handleSelectProduct(selectedProduct) {
    selectProduct(selectedProduct);
    captains.log(`you selected ${selectedProduct.name}`);
  }

  return (
    <>
      <Progress processing={products === null} />
      {products !== null &&
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
      }
    </>
  );
}

export default Products;
