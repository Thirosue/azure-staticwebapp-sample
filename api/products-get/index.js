const _ = require('lodash');

const data = require('../shared/product-data');

module.exports = async function (context, req) {
    try {
        const { name, description, page, rows, order, orderBy } = req.query;
        let products = _.orderBy(data.getProducts(), 'id', 'asc');
        if (order) {
            if (['name', 'description'].includes(orderBy)) {
                products = _.orderBy(products, orderBy, order);
            }
        }
        if (name) {
            products = products.filter((item) => -1 !== item.name.indexOf(name));
        }
        if (description) {
            products = products.filter((item) => -1 !== item.description.indexOf(description));
        }
        const start = rows * page;
        console.log(name, description, start, page, rows, order, orderBy);
        const results = {
            count: products.length,
            data: products.slice(start, start + parseInt(rows)),
        };
        context.res.status(200).json(results);
    } catch (error) {
        context.res.status(500).send(error);
    }
};