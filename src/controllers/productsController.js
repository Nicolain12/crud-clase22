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
		let newProduct = {
			id: products.length + 1,
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: null
		}

		products.push(newProduct)
   
		 fs.writeFileSync(productsFilePath, JSON.stringify(products))
		 
		 res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find( element => element.id == req.params.id)
		res.render("product-edit-form", {product: product})
	},
	// Update - Method to update
	update: (req, res) => {
		let parametro = req.params.id		
		let newInfo = {
			id: parametro,
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: null
		}
		products.map((element, index) =>{
			if(element.id == parametro){
				products[index] = newInfo
			}
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products))
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let dataFilter = products.filter(element => (element.id != req.params.id))
		let newDataBase = JSON.stringify(dataFilter)
		fs.writeFileSync(productsFilePath, newDataBase)
		res.redirect('/products')
	}

}


module.exports = controller;