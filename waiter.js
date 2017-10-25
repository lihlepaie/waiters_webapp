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
        var nameShift = {
            name: names,
            days: Week
        }
        models.waiters.create(nameShift, function(err, results) {
            if (err) {
                if (err.code === 11000) {
                    models.waiters.findOne({
                        name: nameShift.name
                    }, function(err, foundName) {
                        if (err) {
                            return next();
                        } else {
                            foundName.days = nameShift.days
                            foundName.save()
                        }
                    })
                }
            }
        })
        console.log(Week);
        res.render('waiter/add', {
          waiter: names
        })
        
    }

    const color = function(colors) {
        if (colors === 3) {
            return "colorOne";
        } else
        if (colors < 3) {
            return "colorTwo";
        } else
        if (colors > 3) {
            return "colorThree";
        }
    }
    const AddDays = function(req, res, next) {
        var shiftDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        models.waiters.find({}, function(err, waiter) {
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
                Sundaycolors: color(add.Sunday.waiter.length),

                add2: add.Monday.waiter,
                Mondaycolors: color(add.Monday.waiter.length),

                add3: add.Tuesday.waiter,
                Tuesdaycolors: color(add.Tuesday.waiter.length),

                add4: add.Wednesday.waiter,
                Wednesdaycolors: color(add.Wednesday.waiter.length),

                add5: add.Thursday.waiter,
                Thursdaycolors: color(add.Thursday.waiter.length),

                add6: add.Friday.waiter,
                Fridaycolors: color(add.Friday.waiter.length),

                add7: add.Saturday.waiter,
                Saturdaycolors: color(add.Saturday.waiter.length)
            })
        })
    }
    const Reset = function(req, res) {
        models.waiters.remove({}, function(err, remove) {
            if (err) {
                return (err);
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
