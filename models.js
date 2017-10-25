const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.connect(mongoUrl, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected successfully to the database.")
        }
    });


    var WaitersSchema = mongoose.Schema({
        name: String,
        days: Array
    });

WaitersSchema.index({name: 1}, {unique: true})
var waiters = mongoose.model('waiters', WaitersSchema);

return {
    waiters
}
}
