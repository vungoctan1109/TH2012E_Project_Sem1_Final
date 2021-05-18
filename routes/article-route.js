const express = require('express');
const route = express.Router();
const articleController = require('../controllers/article-controller');


//lay danh sach bai viet
route.get('/admin/article',articleController.getList);
route.get('/blog',articleController.getListBlog);

//add new article
route.get('/admin/article/create',articleController.create);
route.post('/admin/article/create',articleController.store);

//Xoa bai viet
route.get('/admin/article/delete', articleController.delete);
route.post('/admin/article/delete',articleController.doDelete);

//sua bai viet
route.get('/admin/article/edit', articleController.edit);
route.post('/admin/article/edit',articleController.update);

//lay thong tin chi tiet bai viet
route.get('/admin/article/detail', articleController.getDetail);
//----------------------User Part--------------------------
route.get('/article/list', articleController.getList_Aticles);
route.get('/article/detail',articleController.article_detail);




module.exports = route;