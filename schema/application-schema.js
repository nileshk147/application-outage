const mongoose = require('mongoose');
const schema = mongoose.Schema;

const applicationSchema = new schema({
    application_name: {type:  String, required: true},
    status: { type: Boolean, default: false},
    outage_start_time: { type: Date, required: false},
    outage_end_time: { type: Date, required: false},
    recieved_from:{
        type: schema.Types.ObjectId,
        ref: 'user',
    }
})

module.exports = mongoose.model('application', applicationSchema);