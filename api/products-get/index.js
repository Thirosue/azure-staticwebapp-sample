const data = require('../shared/product-data');

module.exports = async function (context, req) {
    try {
        const { name, description, page, rows } = req.query;
        let products = data.getProducts();
        if (name) {
            products = products.filter((item) => -1 !== item.name.indexOf(name));
        }
        if (description) {
            products = products.filter((item) => -1 !== item.description.indexOf(description));
        }
        const start = rows * page;
        console.log(name, description, start, page, rows);
        const results = {
            count: products.length,
            data: products.slice(start, start + parseInt(rows)),
        };
        context.res.status(200).json(results);
    } catch (error) {
        context.res.status(500).send(error);
    }
};