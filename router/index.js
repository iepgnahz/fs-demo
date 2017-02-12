const items = require('./router/item');
const categories = require('./router/category');
const carts = require('./router/cart');
const users = require('./router/user');
const route =  function(app) {
    app.use('/items', items);
    app.use('/categories', categories);
    app.use('/carts', carts);
    app.use('/user', users);
};

module.exports = route;