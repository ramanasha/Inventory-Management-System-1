const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const app = express();
const path = require('path');
const routes = require('./controllers/index');
const helmet = require('helmet');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('hbs', expressHandlebars({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main'
}));

app.use(routes);

app.set('PORT', 4000);

app.use((err, req, res, next) => {
  if (err) {
    res.send(JSON.stringify(err));
  } else {
    res.send('error');
  }
});

module.exports = app;
