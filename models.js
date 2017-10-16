const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.connect(mongoUrl, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected successfully to the database.")
        }
    });


    var WaitersSchema = mongoose.model('WaitersSchema', {
        name: String,
        days:Array
        //   Sunday:String,
        //   Monday:String,
        //   Tuesday:String,
        //   Wednesday:String,
        //   Thursday:String,
        //   Friday:String,
        //   Saturday:String
        // }

    });

    return {
        WaitersSchema
    }
}
