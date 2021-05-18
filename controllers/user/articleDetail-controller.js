const article = require('../../models/article');
const category = require('../../models/category');
const mongoose = require('mongoose');


exports.article_detail = function (req, res) {
    article.findById(req.query.id).populate('category').exec(async function (err,data){
        res.render('user/article-userdisplay/articles_detail', {
            item: data
        });
    })
}
