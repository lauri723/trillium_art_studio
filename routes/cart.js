// const express = require('express');
// const router = express.Router();
// const artworks = require('../controllers/artworks');
// const catchAsync = require('../utils/catchAsync');
// // const { isLoggedIn, isAuthor, validateCollection } = require('../middleware');
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const Artwork = require('../models/artwork');

// router.get('/view', function (req, res, next) {
//     const artworks = req.session.cart || [];
//     let subTotal = 0;
//     let shippingTotal = 0;
//     artworks.forEach(artwork => {
//         subTotal += artwork.price;
//         shippingTotal += artwork.shipping;
//     });
//     res.render('cart', {
//         artworks: artworks,
//         cart: req.session.cart,
//         subTotal,
//         shippingTotal,
//         // title: "Shopping Cart"
//     });
// });

// router.post('/create-customer', async function(req, res, next) {
//     try {
//         const { paymentIntentId, customerData } = req.body;
//         const customer = await stripe.customers.create(customerData);
//         const paymentIntent = await stripe.paymentIntents.update(
//             paymentIntentId,
//             {customer: customer.id}
//           );
//         res.status(200).json({message: 'Customer successfully created!'});
//     } catch(err) {
//         next(err);
//     }
// })

// router.get('/checkout', function (req, res, next) {
//     const items = req.session.cart;
//     const shipping = req.session.shipping;
//     if (!items || !items.length) {
//         req.flash('error', 'Your cart is empty.');
//         return res.redirect('/');
//     }
//     res.render('checkout', {
//         items,
//         shipping,
//         stripePublicKey: process.env.STRIPE_PUBLIC_KEY
//     });
// });


// router.get('/add/:artwork', catchAsync(async function (req, res) {
//     const slug = req.params.artwork
//     try {
//         let artwork = await Artwork.findOne({ slug: slug });
//         if (req.session.cart === undefined) {
//             req.session.cart = [];
//             req.session.cart.push({
//                 id: artwork._id,
//                 title: artwork.title,
//                 qty: 1,
//                 price: artwork.price,
//                 shipping: artwork.shipping,
//                 photos: artwork.photos    //(req.files.map(f => ({ url: f.path, filename: f.filename })))
//             }); 
//         } else {
//             let item = req.session.cart.find(item => {
//                 return item.id == artwork._id;
//             });
    
//             if (!item) {
//                 req.session.cart.push({
//                     id: artwork._id,
//                     title: artwork.title,
//                     qty: 1,
//                     price: artwork.price,
//                     shipping: artwork.shipping,
//                     photos: artwork.photos  //(req.files.map(f => ({ url: f.path, filename: f.filename })))
//                 });
//             } else {
//                 req.flash('success', 'Artwork can only be added to the cart one time.');
//             }
//         }
//         req.session.shipping = true;
//         res.redirect('/cart/view')
//     } catch(err) {
//         console.log(err);
//     }
// }));

// router.get('/update/:artwork', function (req, res, next) {
//     let action = req.query.action;
//     let artwork = req.session.cart.find(item => {
//         return item.id == req.params.artwork;
//     });
//     let index = req.session.cart.indexOf(artwork);
//     switch (action) {
//         case 'add':
//             artwork.qty++;
//             break;
//         case 'min':
//             artwork.qty--;
//             if (artwork.qty < 1) {
//                 req.session.cart.splice(index, 1)
//             }
//             break;
//         case "clear":
//             req.session.cart.splice(index, 1);
//             if (artwork.qty <= 0)
//                 delete req.session.cart;
//             break;
        
//         default:
//             res.redirect('/cart/view');
//             break;
//     }
//     res.redirect('/cart/view')
//     // res.redirect('/cart/view', {
//     //     title: "Shopping Cart"
//     // });
// });

// router.get('/cancel', function(req, res, next) {
//     res.redirect('/artworks');
// });

// router.get('/clear', function (req, res, next) {
//     delete req.session.cart;
//     delete req.session.shipping;
//     res.redirect('/');
// });


// module.exports = router;