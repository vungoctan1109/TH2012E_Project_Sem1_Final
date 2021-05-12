const express = require('express');
const route = express.Router();
const categoryController = require("../controllers/category_controller");

route.get('/', categoryController.getList);

route.get('/edit', categoryController.edit);

route.post('/edit', categoryController.update);

route.get('/delete', categoryController.delete);

route.post('/delete', categoryController.doDelete);

route.get('/create', categoryController.create);

route.post('/create', categoryController.store);

module.exports = route;
