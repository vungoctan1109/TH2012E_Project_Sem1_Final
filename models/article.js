const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your article name.'],
            trim: true
        },
        category: {
            required:[true, 'Please enter your article categories.'],
            type: mongoose.Schema.Types.ObjectId,
            ref:'category'
        },
        articleDetail: {
            type: String,
            trim: [true, 'Please enter your article content.']
        },
        createAt:{
            type:Date,
            trim:[true, 'Please enter your posting time.']
        }
    }
)
//index cac truong muon chuan bi cho viec tim kiem thong tin, trong th nay la name va description
articleSchema.index({name:'text', category:'text'});
module.exports = mongoose.model('article', articleSchema);