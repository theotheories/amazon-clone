import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { useStateValue } from './StateProvider';
function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();


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
                        <h3>Payment Address</h3>
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
                        <h3>Review your items and delivery method</h3>
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
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
