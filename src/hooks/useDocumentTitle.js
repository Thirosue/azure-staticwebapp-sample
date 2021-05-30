import { useState, useEffect } from 'react';
import _ from 'lodash'

const titleMapping = [
    { pathname: '/products/', title: '商品詳細' },
    { pathname: '/products', title: '商品一覧' },
    { pathname: '/about', title: 'About' },
]

const useDocumentTitle = (location) => {
    const [title, setTitle] = useState('Top');

    useEffect(() => {
        const pathname = location.pathname;
        const title = _.head(titleMapping.filter(mapping => _.startsWith(pathname, mapping.pathname)))?.title
        setTitle(`${title || 'Page not found'} - Sample`)
    }, [location]);

    return title
}

export default useDocumentTitle;