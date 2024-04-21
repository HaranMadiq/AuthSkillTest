//required liberary
const express=require('express');
const session = require('express-session');

const expresslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

const app=express();
const port=3000;

//require passport
const passport=require('passport');

//require passport local strategy
const localStrategy=require('./config/passport_local_strategy');

//require google strategy
const googleStrategy=require('./config/passport-google-oauth2-strategy');
//require connect flash
const flash=require('connect-flash');

//require custom middleware
const customMiddleware=require('./config/middleware');

app.use(expresslayouts);

//assets
app.use(express.static('./assets'));

//set up the view engine

app.set('view engine', 'ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScript', true);

//middleware
app.use(express.urlencoded({extended:true}));

//session
app.use(session({
    name: 'nodejs auth',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100)
    }
  }));

//use passport for authentication

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setflash);

//use express router
app.use('/',require('./routes'));


//listen on port 3000

app.listen(port,()=>{
    console.log('This app is listening to the port',port);
})







