const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products: products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find( element => element.id == req.params.id);
		res.render('detail', { product:product });
	},


	// Create - Form to create
	create: (req, res) => { 
		res.render('product-create-form')	
	},
	
	// Create -  Method to store
	store: (req, res) => {
		products.push( {
			id: products.length + 1,
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename, // Contiene el nombre dado por librería Multer al archivo que subió el cliente
		 });
   
		 fs.writeFileSync(productsFilePath, JSON.stringify(products));
		 
		 res.render("products", {products: products});
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = products.find( element => element.id == req.params.id);
		res.render("product-edit-form", {product: product});	
	},
	// Update - Method to update
	update: (req, res) => {
		let product = products.find( element => element.id == req.params.id);
        	product = {
				  name:  req.body.name,
				  price:  req.body.price,
				  discount:  req.body.discount,
				  category:  req.body.category,
				  description:  req.body.description,
				  image:  req.body.image
        	}
			fs.writeFileSync(productsFilePath, JSON.stringify(product));
		 
			res.redirect("products", {products: products});
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let parametro = req.params.id
		let dataFilter = products.filter(element => (element.id != parametro))
		let newDataBase = JSON.stringify(dataFilter)
		fs.writeFileSync(productsFilePath, newDataBase)
		res.redirect('products',{products: products})
	}

}


module.exports = controller;