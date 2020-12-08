import React, { useState, useEffect } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                    method: "post",
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                    // ` useful
                    // ? is for query params
                    // Stripe expects the total in a currency's subunits, ie pence hence we multiply by 100
                });
                setClientSecret(response.data.clientSecret)
        }
        // any time the basket updates, update stripe, get a new clientsecret, so we can take payment, v important snippet
        getClientSecret();
    }, [basket])

    // debug, check object props, e.g. uid not id within the user object
    // console.log("The Client Secret is >>> ", clientSecret)
    // console.log("The user is >>> ", user);

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            } //.then good for promises
        }).then(({ paymentIntent })=>{
            // paymentIntent is payment confirmation
            
            // must protect ENSURE USER SIGNED IN BEFORE ORDER
            // i push the order into the (noSQL) firestore db
            db
                .collection("users")
                .doc(user?.uid)
                .collection("orders")
                .doc(paymentIntent.id)
                .set({
                    basket: basket, 
                    amount: paymentIntent.amount, 
                    created: paymentIntent.created
                });
            
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: "EMPTY_BASKET"
            });

            history.replace("/orders");
            // now payment is done, swap the page the user is on as i dont want them to come back to payment page. this instead of history push
            // card number to use is 4242424242424242 4/24 242 42424 for testing purposes
        })

    }

    const handleChange = event => {
        // listen for changes in the CardElement
        // display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    console.log({user})
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} {basket?.length===1 ? "item" : "items"}</Link>
                        )
                </h1>
                {/* payment section - delivery address */}
            <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        {user===null ? 
                        <p><em>Sign in before continuing</em></p>
                            : <div><p>{user?.email}</p><p>123 Pleasant View</p><p>Bristol, UK</p></div>}
                    </div>
                </div>
                {/* payment section - review items */}
                <div className="payment__section">
                <div className="payment__title">
                        <h3>Review Items and Delivery Method</h3>
                    </div>
                    <div className="payment__items">
                        {/* all products in basket show here */}
                        {basket.map(item => (
                            <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            /> 
                        ))}
                    </div>
                </div>

                {/* payment section - payment method */}
                <div className="payment__section">
                <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3 className="order__total">Order total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"£"}
                                />
                                {user===null ? <p><em>Sign in before continuing</em></p> : 
                                 <button disabled={processing ||disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button> 
                                }
                            </div>
                            {/* errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
