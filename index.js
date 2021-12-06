const express = require('express');
// const session = require('express-session');
const path = require('path');
const { registerPage, register } = require('./controllers/userController');
const app = express();
const { sequelize, User } = require('./models');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    // console.log(err);
    return res.send('Internal Server Error');
});

app.get('/',
    registerPage);

app.post('/',
    register);

app.listen(3000, async () => {

    console.log('Server is runngin on port 3000')

    await sequelize.authenticate()

    console.log('Database Connected')
});