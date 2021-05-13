const article = require('../models/article');
const category = require('../models/category');
const mongoose = require('mongoose');


//lay thong tin tat cac bai viet
exports.getList = function (req, res) {
    var categoryId = req.query.categoryId;
    var fillterObject = {};

    //fillter theo categoryID
    if (typeof categoryId !== "undefined" && categoryId.length > 0) {
        fillterObject["category"] = mongoose.Types.ObjectId(categoryId);
    }
    article.find().then(function (data) {
        category.find().then(function (cate){
            res.render('admin/article/list', {
                list1: data,
                cate:cate
            })
        })

    })
    // article.find(fillterObject).populate('category').exec(async function (err,data){
    //     var cate = await article.find();
    //     res.render('admin/article/list',{
    //         list1:data,
    //         cate:cate,
    //         currentArticle:categoryId
    //     })
    // })
}
//them moi bai viet
exports.create = function (req, res) {
    category.find().then(function (data) {
        res.render('admin/article/form', {
            cateList: data
        });
    })
}

exports.store = function (req, res) {
    const newArticle = new article(req.body);
    newArticle.category = mongoose.Types.ObjectId(req.body.categoryID)
    newArticle.save().then(function () {
        res.redirect('/admin/article')
    })
}
//xoa bai viet
exports.delete = function (req, res) {
    article.findById(req.query.id).then(function (data) {
        res.render('admin/article/delete', {
            item: data
        })
    })
}

exports.doDelete = function (req, res) {
    article.findByIdAndDelete(req.query.id).then(function (data) {
        res.redirect('/admin/article');
    })
}
//sua bai viet
exports.edit = function (req, res) {
    article.findById(req.query.id).then(function (data) {
        res.render('admin/article/edit', {
            item: data
        });
    });
}

exports.update = function (req, res) {
    article.findByIdAndUpdate(req.query.id, req.body).then(function (data) {
        res.redirect('/admin/article');
    })
}
//lay thong tin chi tiet bai viet
exports.getDetail = function (req, res) {
    article.findById(req.query.id).then(function (data) {
        res.render('admin/article/detail', {
            item: data
        });
    });
}