const express = require('express')
const routes = express.Router();
const product_controller = require('../controller/product')
routes.get('/',product_controller.product_get);


module.exports = routes;