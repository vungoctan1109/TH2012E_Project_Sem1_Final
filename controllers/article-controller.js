const article = require('../models/article');
const category = require('../models/category');
const mongoose = require('mongoose');


//lay thong tin tat cac bai viet
exports.getList = function (req, res) {
    var keyword = req.query.keyword;
    var categoryId = req.query.categoryId;
    var fillterObject = {};
    //fillter theo categoryID
    if (typeof categoryId !== "undefined" && categoryId.length > 0) {
        fillterObject["category"] = mongoose.Types.ObjectId(categoryId);
    }
    //fillter theo keyword
    if (typeof keyword !== "undefined" && keyword.length > 0) {
        fillterObject["$text"] = {
            $search: keyword
        }
    }

    article.find(fillterObject).populate('category').sort({createAt: 'desc'}).exec(async function (err, data) {
        var cate = await category.find();
        res.render('admin/article/list', {
            message: await req.consumeFlash('message'),
            list1: data,
            cate: cate,
            currentCategoryID: categoryId
        })
    })
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
    //tu dong fill gia tri date cho thoi diem req, truoc khi save and then
    newArticle.updateAtttt = Date.now();
    newArticle.createAt = Date.now();
    newArticle.category = mongoose.Types.ObjectId(req.body.categoryID)
    //tra ve thong tin loi
    const error = newArticle.validateSync();
    if (error && error.errors) {
        category.find().then(function (cateList) {
            res.render('admin/article/form', {
                item: newArticle,
                errors: error.errors,
                cateList: cateList
            })
        })
    } else {
        newArticle.save().then(async function () {
            await req.flash('message', 'Your article creation is complete!');
            res.redirect('/admin/article')
        })
    }
}
//xoa bai viet
exports.delete = function (req, res) {
    article.findById(req.query.id).populate('category').exec(async function (err, data) {
        res.render('admin/article/delete', {
            item: data,
        });
    })
}

exports.doDelete = function (req, res) {
    article.findByIdAndDelete(req.query.id).then(function (data) {
        res.redirect('/admin/article');
    })
}
//sua bai viet
exports.edit = function (req, res) {
    var categoryId1 = req.query.categoryId;
    article.findById(req.query.id).populate('category').exec(async function (err, data) {
        var cate = await category.find();
        res.render('admin/article/edit', {
            item: data,
            cate: cate,
            currentCategoryID: categoryId1
        });
    })
}

exports.update = function (req, res) {
    article.findByIdAndUpdate(req.query.id, req.body).then(function (data) {
        res.redirect('/admin/article');
    })
}
//lay thong tin chi tiet bai viet
exports.getDetail = function (req, res) {
    article.findById(req.query.id).populate('category').exec(async function (err, data) {
        res.render('admin/article/detail', {
            item: data
        });
    })
}
//----------------------User Part-----------------------------
exports.getList_Aticles = function (req, res) {
    var curentCategoryID = req.query.categoryID;
    article.find({}).populate('category').sort({createAt: 'desc'}).exec(async function (err, data) {
        res.render('user/article-userdisplay/articles_list', {
            list: data,
            curentCategoryID:curentCategoryID
        });
    })
}

//xem bai viet chi tiet - cai nay dung cho tat ca
exports.article_detail = function (req, res) {
    article.findById(req.query.id).populate('category').exec(async function (err,data){
        res.render('user/article-userdisplay/articles_detail', {
            item: data
        });
    })
}
//lay thong tin tat cac bai viet cho User Blog
exports.getListBlog = function (req, res) {
    var keyword = req.query.keyword;
    var categoryId = req.query.categoryId;
    var fillterObject = {};
    //fillter theo categoryID
    // if (typeof categoryId !== "undefined" && categoryId.length > 0) {
    //     fillterObject["category"] = mongoose.Types.ObjectId(categoryId);
    // }
    //fillter theo keyword
    if (typeof keyword !== "undefined" && keyword.length > 0) {
        fillterObject["$text"] = {
            $search: keyword
        }
    }

    article.find(fillterObject).sort({ createAt : "desc"}).populate('category').exec(async function (err, data) {
        var cate = await category.find();
        res.render('user/page/blog', {
            list1: data,
            cate: cate,
            currentCategoryID: categoryId
        })
    })
}