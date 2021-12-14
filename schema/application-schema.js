const mongoose = require('mongoose');
const schema = mongoose.Schema;

const applicationSchema = new schema({
    application_name: {type:  String, required: true},
    status: { type: Boolean, default: true},
    outage_start_time: { type: Date, required: false,
    default: new Date().toISOString()},
    outage_end_time: { type: Date, required: false},
    recieved_from:{
        type: schema.Types.ObjectId,
        ref: 'user',
    }
})

module.exports = mongoose.model('application', applicationSchema);