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
    const [products, setProducts] = useState([]);

    // このカスタムフックを利用しているコンポーネントがマウントされたら Products を取得する。
    useEffect(() => {
        const fetchAll = async () => {
            const response = await loadProductsApi();
            setProducts(response)
        }

        fetchAll()
    }, []);

    const addProduct = async (product) => {
        await addProductApi(product);
    }

    const updateProduct = async (product) => {
        await updateProductApi(product);
    }

    const deleteProduct = async (product) => {
        await deleteProductApi(product);
    }

    return { products, addProduct, updateProduct, deleteProduct };
};

export default useProducts;