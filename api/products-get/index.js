const data = require('../shared/product-data');

module.exports = async function (context, req) {
    try {
        const { name, description, page, rows } = req.query;
        const products = data.getProducts();
        console.log(name, description, page, rows);
        const results = {
            count: products.length,
            data: products.slice(rows * page, rows),
        };
        context.res.status(200).json(results);
    } catch (error) {
        context.res.status(500).send(error);
    }
};