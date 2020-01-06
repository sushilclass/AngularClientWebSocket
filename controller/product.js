const product = require('../model/product')
exports.product_get = (req, res, next)=>{
	//res.status(200).json(product);
	product.find().select('name price').exec().then(docs=>{
		res.status(200).json(docs.map(doc=>{
			return {
				name: doc.name,
				price: doc.price
			}
		}));
	}).catch(error=>{
		res.status(500).json(error);
	});
};