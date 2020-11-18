import React, { useState, useEffect } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from "./axios";

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
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace("/orders");
            // now payment is done, swap the page the user is on as i dont want them to come back to payment page. this instead of history push

        })

    }

    const handleChange = event => {
        // listen for changes in the CardElement
        // display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
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
                        <p>{user?.email}</p>
                        <p>123 Pleasant View</p>
                        <p>Bristol, UK</p>
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
                                        <h3>Order total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"£"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
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
