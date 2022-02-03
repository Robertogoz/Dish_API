const express = require('express');
const app = express();
const connection = require('./database/database');
const port = 3333;
const cors = require('cors');

//controllers
const usersController = require('./controllers/usersController');
const dishesController = require('./controllers/dishesController');

//cors
app.use(cors());

//sequelize
connection
    .authenticate()
    .then(() => {
        console.log('Connection between server and db successful');
    })
    .catch((err) => {
        console.log(err);
    })

//body-parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes
app.use('/', usersController);
app.use('/', dishesController);

//listen
app.listen(port, () => {
    console.log(`API Running on port ${port}.`)
});