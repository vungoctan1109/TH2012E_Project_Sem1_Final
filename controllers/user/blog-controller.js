const article = require('../../models/article');
const category = require('../../models/category');
const mongoose = require('mongoose');

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