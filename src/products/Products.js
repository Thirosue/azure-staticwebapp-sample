import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import GlobalContext from '../context/global-context';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import {
  useConfirm,
  useProducts,
} from '../hooks';

const captains = console;

function Products({ history }) {
  const confirm = useConfirm();
  const context = React.useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const message = history.location.state?.message;
    if (message) {
      const variant = message.variant ? message.variant : 'success';
      enqueueSnackbar(message.value, { variant });
    }
  }, [history.location.state]);

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
    selectProduct({});
    history.goBack();
  }

  async function handleDeleteProduct(product, to) {
    const message = {
      value: '商品の削除が完了しました',
      variant: 'default',
    };
    confirm({ description: '本当に削除しますか?' })
      .then(async () => {
        context.startProcess();
        await deleteProduct(product).finally(() => context.endProcess());
        history.push('/complete', { to, message });
      });
  }

  async function handleSaveProduct(product, to) {
    const message = {
      value: '商品の更新が完了しました'
    };
    selectProduct(product); // useFormでデフォルト値を指定するとonChangeイベントのvalueが使われないため、productを更新して、更新前の値を表示させないようにする
    context.startProcess();
    const updateFunc = product.id ? updateProduct : addProduct;
    await updateFunc(product).finally(() => context.endProcess());
    history.push('/complete', { to, message });
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
