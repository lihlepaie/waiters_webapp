module.exports = function(models) {

    var Sunday = [];
    var Monday = [];
    var Tuesday = [];
    var Wednesday = [];
    var Thursday = [];
    var Friday = [];
    var Saturday = [];

    const index = function(req, res) {

        var name = req.params.username
        //  models.WaitersSchema.findOne({
        //    name:names
        //  },  function(err, results) {
        //
        //       if (err) {
        //               console.log(err);
        //           }
        res.render('waiter/add', {
            name
        })

        // })
    }

    const Viewdays = function(req, res, next) {
        var names = req.params.username;
        console.log(names);
        var Week = req.body.WeekDays
        models.WaitersSchema.create({
            name: names,
            days: Week
        }, function(err, results) {
            if (err) {
                return next(err)
            }
        })
        console.log(Week);
        res.render('waiter/add', {
            waiter: names
        })
    }
    const AddDays = function(req, res, next) {
        var shiftDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        var add = {
            Sunday: {
                waiter: []
            },
            Monday: {
                waiter: []
            },
            Tuesday: {
                waiter: []
            },
            Wednesday: {
                waiter: []
            },
            Thursday: {
                waiter: []
            },
            Friday: {
                waiter: []
            },
            Saturday: {
                waiter: []
            },
        }
        models.WaitersSchema.find({}, function(err, waiter) {
            if (err) {
                return next(err);
            }
            //loop through
            waiter.forEach(function(waiter) {
              console.log(waiter.days);
                //loop for days
                waiter.days.forEach(function(day) {
                    if (waiter.days[day]) {
                      console.log(waiter.days[day]);
                      add[day].waiter.push(waiter.name)
                    }
                })
            })

        })

        res.render("waiter/admin", {
            add: add
        })
    }

    return {
        index,
        Viewdays,
        AddDays
    }
}
