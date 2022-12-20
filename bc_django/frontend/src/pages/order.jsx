import React from 'react';
import Header from "../components/OrderPageComponents/Header";
import OrderCard from "../components/OrderPageComponents/OrderCard";


const Order = () => {
    return (
        <div className='min-vh-100' style={{background: "radial-gradient(circle, #2e59af, #071843)"}}>
            <Header/>
            <OrderCard/>

        </div>
    );
};

export default Order;