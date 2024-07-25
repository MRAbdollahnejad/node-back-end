const router = require('express').Router();  
const { asyncHandler } = require('../utils/async-handler');  
const { validator } = require('../validations/validator');  
const { protect, restrictTo } = require('../controllers/auth-controller');  
const {  
	addUser,  
	getAllUsers,  
	getUserById,  
	editUserById,  
	removeUserById,
	addToWishlist,  
    removeFromWishlist,  
    getWishlist  
} = require('../controllers/user-controller');  
const {  
	addUserValidationSchema,  
	editUserValidationSchema  
} = require('../validations/user-validation');  

// Wishlist controller methods to be imported  


// User routes  
router.get('/', protect, restrictTo('ADMIN'), asyncHandler(getAllUsers));  

router.post(  
	'/',  
	protect,  
	restrictTo('ADMIN'),  
	validator(addUserValidationSchema),  
	asyncHandler(addUser)  
);  

router.get('/:id', asyncHandler(getUserById));  

router.patch(  
	'/:id',  
	validator(editUserValidationSchema),  
	asyncHandler(editUserById)  
);  

router.delete('/:id', asyncHandler(removeUserById));  

// Wishlist routes  
router.post('/wishlist/:productId', protect, asyncHandler(addToWishlist));  
router.delete('/wishlist/:productId', protect, asyncHandler(removeFromWishlist));  
router.post('/allWishlist', protect, asyncHandler(getWishlist));  

module.exports = router;  