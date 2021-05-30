/* eslint-disable */
import { useState, useEffect } from 'react';
import {
    addProductApi,
    deleteProductApi,
    loadProductsApi,
    updateProductApi,
} from '../services/product.api';

// Products の state と更新ロジックを持つフック
const useProducts = () => {
    const [products, setProducts] = useState(null);

    // このカスタムフックを利用しているコンポーネントがマウントされたら Products を取得する。
    useEffect(() => {
        const fetchAll = async () => {
            const response = await loadProductsApi();
            setProducts(response)
        }

        fetchAll()
    }, []);

    const addProduct = (product) => addProductApi(product);
    const updateProduct = (product) => updateProductApi(product);
    const deleteProduct = (product) => deleteProductApi(product);

    return { products, addProduct, updateProduct, deleteProduct };
};

export default useProducts;