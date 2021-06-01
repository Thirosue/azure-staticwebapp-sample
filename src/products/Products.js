import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GlobalContext from '../context/global-context';
import useConfirm from '../hooks/useConfirm';
import useProducts from '../hooks/useProducts';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';

const captains = console;

function Products({ history }) {
  const confirm = useConfirm();
  const context = React.useContext(GlobalContext);

  const {
    searchProduct,
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
        context.startProcess();
        await deleteProduct(product).finally(() => context.endProcess());
        history.push('/complete', { to: '/products' });
      });
  }

  async function handleSaveProduct(product) {
    context.startProcess();
    const updateFunc = product.id ? updateProduct : addProduct;
    await updateFunc(product).finally(() => context.endProcess());
    history.push('/complete', { to: '/products' });
  }

  function handleSelectProduct(selectedProduct) {
    selectProduct(selectedProduct);
    captains.log(`you selected ${selectedProduct.name}`);
  }

  return (
    <Switch>
      <Route
        exact
        path="/products"
        component={() => (
          <ProductList
            addNewProduct={addNewProduct}
            searchProduct={searchProduct}
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
  );
}

export default Products;
