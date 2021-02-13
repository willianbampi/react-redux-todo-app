const mongoose = require('mongoose')
mongoose.Promise = global.Promise //deixa de usar api de promise do mongoose pois está depreciada e passa a usar a api de promise do node, remove o aviso
module.exports = mongoose.connect('mongodb://localhost/todo')