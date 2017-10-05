module.exports = function(models) {

var DaysOftheWeek = [];

 const Index = function (req, res) {

   var name = req.params.username
   res.send('waiter/add', name)
 }

const AddDays = function (req, res) {
  var waiters = req.body.name

  res.render('waiter/add', {waiters})
}
 return{
   Index,
   AddDays
}
}
