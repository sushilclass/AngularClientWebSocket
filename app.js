const express = require('express')
const app = express();
const routes = require('./routes/routes')
const mongoose = require('mongoose')
// db connection
mongoose.connect('mongodb+srv://nodejs-api:nodejs-api@nodejs-api-mongo-rydqv.mongodb.net/test?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error)=>{
		console.log(error);
	});
app.use('/',routes);


const ws_product = require('./controller/ws_products')


app.listen(3000);
module.exports = app;
