const data = require('../shared/product-data');

module.exports = async function (context, req) {
    try {
        const { name, description, page, rows } = req.query;
        const products = data.getProducts();
        const start = rows * page;
        console.log(name, description, start, page, rows);
        const results = {
            count: products.length,
            data: products.slice(start, start + rows),
        };
        context.res.status(200).json(results);
    } catch (error) {
        context.res.status(500).send(error);
    }
};