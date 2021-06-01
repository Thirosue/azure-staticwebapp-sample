const data = {
  products: [
    {
      id: 1,
      name: 'Strawberries',
      description: '16oz package of fresh organic strawberries',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Sliced bread',
      description: 'Loaf of fresh sliced wheat bread',
      quantity: 2,
    },
    {
      id: 3,
      name: 'Apples',
      description: 'Bag of 7 fresh McIntosh apples',
      quantity: 3,
    },
    {
      id: 4,
      name: 'Item4',
      description: 'no.4',
      quantity: 4,
    },
    {
      id: 5,
      name: 'Item5',
      description: 'no.5',
      quantity: 5,
    },
    {
      id: 6,
      name: 'Item6',
      description: 'no.6',
      quantity: 6,
    },
  ],
};

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const addProduct = (product) => {
  product.id = getRandomInt();
  data.products.push(product);
  return product;
};

const updateProduct = (product) => {
  const index = data.products.findIndex((v) => v.id === product.id);
  console.log(product);
  data.products.splice(index, 1, product);
  return product;
};

const deleteProduct = (id) => {
  const value = parseInt(id, 10);
  data.products = data.products.filter((v) => v.id !== value);
  return true;
};

const getProducts = () => {
  return data.products;
};

module.exports = { addProduct, updateProduct, deleteProduct, getProducts };
