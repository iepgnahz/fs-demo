const items = require('./router/item');
const categories = require('./router/category');
const carts = require('./router/cart');
const route =  function(app) {
    app.use('/items', items);
    app.use('/categories', categories);
    app.use('/carts', carts);
};

module.exports = route;