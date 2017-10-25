const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const WaitersDayRoutes = require('./waiter');
const Models = require('./models')
const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost/waiter';
const models = Models(mongoUrl);


const waiterRoutes = WaitersDayRoutes(models);
const app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

 app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

// start Routes
app.get('/waiter/:username', waiterRoutes.index);
app.post('/waiter/:username', waiterRoutes.Viewdays);
app.get('/days', waiterRoutes.AddDays);
app.get('/Reset', waiterRoutes.Reset);

//start the server
app.set('port',(process.env.PORT || 5000) );

app.listen(app.get('port'), function(){
  console.log("Web app started on port: ", app.get('port'));
});
