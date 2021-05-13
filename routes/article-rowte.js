const express = require('express');
const route = express.Router();
const articleController = require('../controllers/article-controller');


//lay danh sach bai viet
route.get('/',articleController.getList);

//add new article
route.get('/create',articleController.create);
route.post('/create',articleController.store);

//Xoa bai viet
route.get('/delete', articleController.delete);
route.post('/delete',articleController.doDelete);

//sua bai viet
route.get('/edit', articleController.edit);
route.post('/edit',articleController.update);
//lay thong tin chi tiet bai viet
route.get('/detail', articleController.getDetail);

module.exports = route;