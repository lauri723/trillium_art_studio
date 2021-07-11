// // A reference to Stripe.js initialized with a fake API key.
// // Sign in to see examples pre-filled with your key.
// var stripe = Stripe(STRIPE_PUBLIC_KEY);
// // Disable the button until we have Stripe set up on the page
// document.querySelector("button").disabled = true;

// fetch("/create-payment-intent", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(purchase)
// })
//   .then(function(result) {
//     return result.json();
//   })
//   .then(function(data) {
//     // Custom code added by Ian
//     if(data && data.total) {
//       // check if data.total has a period (cents)
//       if(!data.total.toString().match(/\./)) {
//         data.total = data.total += '.00'
//       }
//     }
//     document.getElementById('total').innerText = `$${data.total}`;
//     //
//     var elements = stripe.elements();

//     var style = {
//       base: {
//         color: "#32325d",
//         fontFamily: 'Arial, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d"
//         }
//       },
//       invalid: {
//         fontFamily: 'Arial, sans-serif',
//         color: "#fa755a",
//         iconColor: "#fa755a"
//       }
//     };

//     var card = elements.create("card", { style: style });
//     // Stripe injects an iframe into the DOM
//     card.mount("#card-element");

//     card.on("change", function (event) {
//       // Disable the Pay button if there are no card details in the Element
//       document.querySelector("button").disabled = event.empty;
//       document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
//     });

//     var form = document.getElementById("payment-form");
//     form.addEventListener("submit", function(event) {
//       event.preventDefault();
//       let body;
//       if(isShipping) {
//         body = JSON.stringify({
//           customerData: {
//             name: customerName.value,
//             email: email.value,
//             shipping: {
//               name: shippingName.value,
//               phone: shippingPhone.value,
//               address: {
//                 line1: shippingAddress1.value,
//                 line2: shippingAddress2.value,
//                 city: shippingCity.value,
//                 state: shippingState.value,
//                 country: 'US',
//                 postal_code: shippingZip.value
//               }
//             },
//             phone: phone.value
//           }, 
//           paymentIntentId: data.paymentIntentId
//         });
//       } else {
//         body = JSON.stringify({
//           customerData: {
//             name: customerName.value,
//             email: email.value,
//             phone: phone.value
//           }, 
//           paymentIntentId: data.paymentIntentId
//         });
//       }
//       // create a customer on the backend
//       fetch("/cart/create-customer", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body
//       }).then(res => {
//         // Complete payment when the submit button is clicked
//         payWithCard(stripe, card, data.clientSecret);
//       }).catch(err => {
//         // Show error to your customer
//         showError('Something went wrong, please try again or contact site owner');
//       })
//     });
//   });

// // Calls stripe.confirmCardPayment
// // If the card requires authentication Stripe shows a pop-up modal to
// // prompt the user to enter authentication details without leaving your page.
// var payWithCard = function(stripe, card, clientSecret) {
//   loading(true);
//   stripe
//     .confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: card
//       }
//     })
//     .then(function(result) {
//       if (result.error) {
//         // Show error to your customer
//         showError(result.error.message);
//       } else {
//         // The payment succeeded!
//         orderComplete(result.paymentIntent.id);
//       }
//     });
// };

// /* ------- UI helpers ------- */

// // Shows a success message when the payment is complete
// var orderComplete = function(paymentIntentId) {
//   loading(false);
//   document
//     .querySelector(".result-message a")
//     .setAttribute(
//       "href",
//       "https://dashboard.stripe.com/test/payments/" + paymentIntentId
//     );
//   document.querySelector(".result-message").classList.remove("hidden");
//   document.querySelector("button").disabled = true;
//   // clear the cart
//   fetch("/cart/clear", {
//     method: "GET",
//   }).then(res => {
//     // do nothing
//   }).catch(err => {
//     // Show error to your customer
//     showError('Something went wrong, please try again or contact site owner');
//   })
// };

// // Show the customer the error from Stripe if their card fails to charge
// var showError = function(errorMsgText) {
//   loading(false);
//   var errorMsg = document.querySelector("#card-error");
//   errorMsg.textContent = errorMsgText;
//   setTimeout(function() {
//     errorMsg.textContent = "";
//   }, 4000);
// };

// // Show a spinner on payment submission
// var loading = function(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     document.querySelector("button").disabled = true;
//     document.querySelector("#spinner").classList.remove("hidden");
//     document.querySelector("#button-text").classList.add("hidden");
//   } else {
//     document.querySelector("button").disabled = false;
//     document.querySelector("#spinner").classList.add("hidden");
//     document.querySelector("#button-text").classList.remove("hidden");
//   }
// };