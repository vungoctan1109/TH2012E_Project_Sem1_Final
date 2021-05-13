const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'category'
        },
        articleDetail: {
            type: String,
            trim: true
        },
        createAt:{
            type:Date,
            trim:true
        }
    }
)
//index cac truong muon chuan bi cho viec tim kiem thong tin, trong th nay la name va description
articleSchema.index({name:'text', category:'text'});
module.exports = mongoose.model('article', articleSchema);