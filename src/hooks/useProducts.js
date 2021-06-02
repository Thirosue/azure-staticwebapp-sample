import {
    addProductApi,
    deleteProductApi,
    loadProductsApi,
    updateProductApi,
} from '../services/product.api';

// Products の state と更新ロジックを持つフック
const useProducts = () => {
    const addProduct = (product) => addProductApi(product);
    const updateProduct = (product) => updateProductApi(product);
    const deleteProduct = (product) => deleteProductApi(product);
    const searchProduct = (query) => loadProductsApi(query);

    return { searchProduct, addProduct, updateProduct, deleteProduct };
};

export default useProducts;