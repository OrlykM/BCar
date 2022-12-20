import React, {useEffect, useState} from 'react';
import {useTimer} from "../../../hooks/useTimer";
import Timer from "../Timer";

const date = new Date();

const OrderCard = () => {
    const time = useTimer({
        start: {
            seconds: date.getSeconds(),
            minutes: date.getMinutes(),
            hours: date.getHours(),
            days: date.getDate()
        }
    });
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const newPrice =
            0.03333333 *
            (time.days * 86400 +
                time.hours * 3600 +
                time.minutes * 60 +
                time.seconds);
        setPrice(newPrice);
    }, [time]);

    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{background: "#000000", borderRadius: "15px"}}>
                                <div className="card-body p-5 d-flex flex-column align-items-center justify-content-center">
                                    <h2 className="text-uppercase text-center mb-5">ORDER</h2>
                                    <h5 className="card-title text-uppercase text-center">audi rs</h5>
                                    <h6 className="card-price text-center">$2<span className="period">/min</span></h6>
                                    <h6 className="card-price text-center"><span className="period">registration number</span></h6>
                                    <hr/>

                                    <Timer time={time} />
                                    <h2 style={{ color: "white", marginTop:'50px', marginBottom:'20px'}}>Price: {price} UAH</h2>
                                    <button type="submit" className="btn btn-warning btn-block btn-lg gradient-custom-5 text-body">Stop</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderCard;