const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();


//import routers
const customerRoutes = require('./routes/customerRoute');



//settings
app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middlewares

app.use(morgan('dev')); 
app.use(myConnection(mysql,{
	host:'localhost',
	user:'root',
	password:'root',
	port:3306,
	database: 'crudnodejsmysql'
},'single'));

app.use(express.urlencoded({extended:false}));
//routes
app.use('/',customerRoutes);

//static files (img,javascript,css ,...)
app.set(express.static(path.join(__dirname,'public')));



//start serve
app.listen(3000, () =>{
	console.log("Serve up");

});