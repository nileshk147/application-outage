const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    user_name: {type: String, require: true}
})

module.exports = mongoose.model('user', userSchema);