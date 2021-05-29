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

    const add = async () => {
    }

    const update = async () => {
    }

    const remove = async () => {
    }

    return { products, add, update, remove };
};

export default useProducts;