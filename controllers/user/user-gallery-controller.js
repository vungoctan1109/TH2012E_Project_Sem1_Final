const Gallery = require('../../models/gallery.js');

exports.getlist_gallery = function (req,res) {
    Gallery.find().then( async function (data) {
        //render view kèm theo dữ liệu
        res.render('user/page/gallery', {
            list: data
        });
    });
}
