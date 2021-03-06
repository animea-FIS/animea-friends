let mongoose = require('mongoose');

let requestSchema = new mongoose.Schema({
    id: Number,
    userId: mongoose.Schema.Types.ObjectId,
    friendId: mongoose.Schema.Types.ObjectId,
    message: String
}, {collection: 'requests'});

var RequestM = mongoose.model('Request', requestSchema);

module.exports = {
    RequestM: RequestM
};