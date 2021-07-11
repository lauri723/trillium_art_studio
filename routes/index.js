const express = require('express')
const router = express.Router()
const Collection = require('../models/collection')
const Artwork = require('../models/artwork')
const Leaf = require('../models/leaf')
const Student = require('../models/student')
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
// const endpointSecret = 'whsec_bNJSLxQu2IEAy6s8g9aKjloaJ20aBu5p';

router.get('/', async (req, res) => {
    const collections = await Collection.find({}).sort({ orderKey: 1 }).sort({ createdAt: 'desc' })
    const leaves = await Leaf.find({}).sort({ orderKey: 1 })
    res.render('index', {
        collections,
        leaves,
        searchOptions: req.query,
    })
})

router.get('/admin', async (req, res) => {
    const collection = await Collection.findOne({ slug: req.params.slug })
    const collections = await Collection.find({}).sort({ createdAt: 'desc' }).populate('artworks')
    const artworks = await Artwork.find({})
    const artwork = await Artwork.findOne({ slug: req.params.slug })
    const leaves = await Leaf.find({}).sort({ createdAt: 'desc' })
    const leaf = await Leaf.findOne({ slug: req.params.slug })
    const students = await Student.find({}).sort({ createdAt: 'desc' })
    const student = await Student.findOne({ slug: req.params.slug })
    res.render('admin', { collections, collection, artwork, artworks, leaves, leaf, student, students })
})

// router.get("/toggle-shipping", async (req, res, next) => {
//     if(req.query && req.query.shipping === 'yes') {
//         req.session.shipping = true;
//     } else {
//         req.session.shipping = false;
//     }
//     res.status(200).json({message: 'Shipping toggled'});
// })

// router.get("/back-to-cart", async (req, res, next) => {
//     req.session.shipping = true;
//     res.redirect('/cart/view');
// })

// router.post("/create-payment-intent", async (req, res) => {
//     let { items } = req.body;
//     let { shipping } = req.session;
//     items = items.map(item => item.id)
//     let total = 0;
//     let amount;
//     try {
//         let docs = await Artwork.find({
//             '_id': { $in: items }
//         })
//         // decide if we need to include shipping cost in payment intent
//         docs.forEach(doc => {
//             total += doc.price;
//             if(shipping) {
//                 total += doc.shipping;
//             }
//         })
//         amount = total * 100
//     } catch (err) {
//         console.log(err)
//     }
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency: "usd"
//     });
//     res.send({
//         clientSecret: paymentIntent.client_secret,
//         paymentIntentId: paymentIntent.id,
//         total
//     });
// });

// // Webhook stuff for stripe

// const fulfillOrder = async (session) => {
//     // TODO: fill me in
//     console.log("Fulfilling order");
//     const customer = await stripe.customers.retrieve(
//         session.customer
//     );
//     console.log('Customer Info for fulfillment:', customer);
// }

// router.post('/webhook', (req, res) => {
//     const payload = req.body;
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//         console.log(event.type);
//     } catch (err) {
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//     switch (event.type) {
//         case 'payment_intent.succeeded': {
//             const session = event.data.object;

//             fulfillOrder(session);

//             break;
//         }
//     }

//     res.status(200);
// });

module.exports = router