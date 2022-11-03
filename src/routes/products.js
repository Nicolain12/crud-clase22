// ************ Require's ************
const express = require('express');
const router = express.Router();

const multer = require('multer');
var storage = multer .diskStorage({
destination: function (req, file, cb) {
cb(nul1, '/public/images/products')
},
filename: function (reg, file, cb) {
cb (null, file.fieldname + '-' + Date. now())
}
})
var upload = multer({ storage: storage })


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);  

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/products/', productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/', productsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
