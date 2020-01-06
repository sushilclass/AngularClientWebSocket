const Product = require('../model/product');
const WebSocket = require('ws');
const url = require('url');
const wss = new WebSocket.Server({ port: 4000 });
const isDataSaved = true;
const mongoose = require('mongoose')

wss.on('connection',(ws, req) =>{
	console.log("connected on port 4000");
	
	const pathName = url.parse(req.url).pathname;
	if(pathName == '/products'){	
		}
	ws.on('message', (data)=>{
		console.log("messeage recieved :"+ data); // recieve data from client
		_message=JSON.parse(data);

		if(pathName == '/products' && _message.route=='products' && _message.action=='getAll'){
			getall();				
		}

		if(pathName == '/products' && _message.route=='products' && _message.action=='get'){
			findbyid(_message.id);				
		}

		if(pathName == '/products' && _message.route=='products' && _message.action=='create'){
			addproduct(_message.product);
		}

		if(pathName == '/products' && _message.route=='products' && _message.action=='delete'){
			deletebyid(_message.id);
		}

		if(pathName == '/products' && _message.route=='products' && _message.action=='update'){
			updateProduct(_message.id, _message.product);
		}
	});

	ws.on('close', ()=>{
		console.log("Total Client size :" + wss.clients.size);
	});		


});

function getall(){
	Product.find().exec()
			.then(docs=>{
				send(docs);
			})
			.catch(error=>{
				send(error);
			});
}

function findbyid(id){
	Product.findById(id).exec()
			.then(docs=>{
				send(docs);
			})
			.catch(error=>{
				send(error);
			});

}

function addproduct(product){
	product = new Product({
				_id: new mongoose.Types.ObjectId(),
				name: _message.product.name,
				price: _message.product.price
			})
			product.save()
			.then(docs=>{
				let message = {"message": "Product added successfully!"}
				send(message);
			getall();	

			})
			.catch(error=>{
				send(error);
			});
				
}

function deletebyid(id){
	Product.remove({_id: id}).exec()
			.then(docs=>{
				message = "product not found";
				console.log(docs);
				if(docs.deletedCount>0){
					message = {"message":"Product delete successfully!"};
				}
				send(message);
				getall();
			})
			.catch(error=>{
				send(error);
			});				

}

function updateProduct(id, product){
	Product.findByIdAndUpdate(id, product,{new: true})
    .then(customer => {
        if(!customer) {
        	let message = {message: "Customer not found with id " + id}
           send(message);
        }
        getall();
    }).catch(err => {
        send(err);
    });
}

function send(data){
	wss.clients.forEach(function each(client){
				client.send(JSON.stringify(data));
				});
}