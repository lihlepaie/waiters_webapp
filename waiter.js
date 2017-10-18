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

        res.render('waiter/add', {
            name
        })

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
        models.WaitersSchema.find({}, function(err, waiter) {
            if (err) {
                return next(err);
            }
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
            //loop through
            waiter.forEach(function(waiter) {

                waiter.days.forEach(function(day) {

                    if (day == 'Sunday') {
                        add.Sunday.waiter.push(waiter.name)
                    }
                    if (day == 'Monday') {
                        add.Monday.waiter.push(waiter.name)
                    }
                    if (day == 'Tuesday') {
                        add.Tuesday.waiter.push(waiter.name)
                    }
                    if (day == 'Wednesday') {
                        add.Wednesday.waiter.push(waiter.name)
                    }
                    if (day == 'Thursday') {
                        add.Thursday.waiter.push(waiter.name)
                    }
                    if (day == 'Friday') {
                        add.Friday.waiter.push(waiter.name)
                    }
                    if (day == 'Saturday') {
                        add.Saturday.waiter.push(waiter.name)
                    }

                })
            })

            res.render("waiter/admin", {
                add1: add.Sunday.waiter,
                add: add.Monday.waiter,
                add2: add.Tuesday.waiter,
                add3: add.Wednesday.waiter,
                add4: add.Thursday.waiter,
                add5: add.Friday.waiter,
                add6: add.Saturday.waiter

            })
        })
    }
    const Reset = function(req, res) {
      models.WaitersSchema.remove({}, function(err, remove) {
        if (err) {
            return(err);
        }
      res.redirect("/days");
    })
    }

    return {
        index,
        Viewdays,
        AddDays,
        Reset
    }
}
