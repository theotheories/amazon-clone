import "./Orders.css";
import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";

// an example of noSQL db. 
// every single user will have a collection of orders. the db is provided by cloud firestore from firebase. 
function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {

// access user collection, get specific user, access that user's orders, 
// sort by the time order was created in "desc"ending order, map all the orders to an array which we will display
// data contains all the info about items involved and prices. 
// snapshot is real time
// if user not logged in then make the order array empty so none displayed

        db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        } else {
            setOrders([])
        }
    }, [user])
// if dependent on an external variable it needs to go in the array at the end there (..., [user])
    return (
        <div className="orders">
           <h1>Your orders</h1> 
        {user===null ? <p>Sign in to view your order history</p> :
           <div className="orders__order">
               {orders?.map(order => (
                   <Order order={order} />
               ))}
           </div>
        }
        </div>
    )
}

export default Orders
