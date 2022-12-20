import React, { useState, useEffect, useCallbac, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useTimer } from "../../../hooks/useTimer";
import Timer from "../Timer";

const date = new Date();

const OrderCard = () => {

    const dataFetchedRef = useRef(false);
    const navigate = useNavigate();
    const [carData, setCarData] = useState('');

    const [dateCreationMonth, setDateCreationMonth] = useState('');
    const [dateCreationDay, setDateCreationDay] = useState('');
    const [dateCreationHours, setDateCreationHours] = useState('');
    const [dateCreationMin, setDateCreationMin] = useState('');
    const [dateCreationSec, setDateCreationSec] = useState(0);

    // info about car
    let token = localStorage.getItem("token");
    console.log(token);
    const fetchData = () => {

        fetch(`http://127.0.0.1:8000/user/getOrder/`,
            {
                method: 'GET',
                headers:
                {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": `Token ${token}`,
                },
            }).then(async (response) => {
                if (response.ok) {
                    const result = await response.json();
                    console.log("Result", result);

                    // the actual
                    console.log(date);
                    let tmp;
                    tmp = result.date_creation.split("-");
                    console.log("TMP", tmp);
                    setDateCreationMonth(tmp[1]);

                    let res = tmp[2].split("T");
                    console.log("REs", res);
                    setDateCreationDay(tmp[0]);

                    tmp = res[1].split(":");
                    console.log("TIE", tmp);

                    setDateCreationHours(tmp[0]);
                    setDateCreationMin(tmp[1]);

                    let tmp_1 = tmp[2].split(".");

                    let res_day = Math.abs(res[0] - date.getDate());
                    let res_hour = Math.abs(tmp[0] - date.getHours() + 2);
                    let res_min = Math.abs(tmp[1] - date.getMinutes());
                    let res_sec = Math.abs(tmp_1[0] - date.getSeconds())

                    let data = {
                        "day": res_day,
                        "hour": res_hour,
                        "min": res_min,
                        "sec": date.getSeconds()
                    }
                    console.log(data);
                    localStorage.setItem("date_creation", JSON.stringify(data))

                    let reaas = localStorage.getItem("date_creation");
                    console.log(JSON.parse(reaas))

                    setCarData(result);

                }
                else if (response.status === 401) {
                    console.log("NONONNO");
                };
            });
        console.log('Fetching data...');
    }
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchData();
    }, [])

    let reaas = localStorage.getItem("date_creation");
    let aaaa = JSON.parse(reaas);

    const time = useTimer({
        start: {
            seconds: aaaa.sec,
            minutes: aaaa.min,
            hours: aaaa.hour,
            days: aaaa.day
        }
    });

    const [price, setPrice] = useState(0);

    useEffect(() => {
        const newPrice =
            (carData.price_per_min / 60) *
            (time.days * 86400 +
                time.hours * 3600 +
                time.minutes * 60 +
                time.seconds);
        setPrice(newPrice);
    }, [time]);

    // stop order
    const handleForStop = () => {

        fetch(`http://127.0.0.1:8000/user/order/new/${carData.user_id}/${carData.car_id}/`,
            {
                method: 'PUT',
                headers:
                {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": `Token ${token}`,
                },
            }).then(async (response) => {
                if (response.ok) {
                    const result = await response.json();
                    console.log("The order was stopped", result);

                    let data = {
                        "day": 0,
                        "hour": 0,
                        "min": 0,
                        "sec": 0
                    }
                    console.log(data);
                    localStorage.setItem("date_creation", JSON.stringify(data))
                    navigate("/map");
                }
                else if (response.status === 401)
                    console.log("HOHOHO");
            });
    }
    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ background: "#000000", borderRadius: "15px" }}>
                                <div className="card-body p-5 d-flex flex-column align-items-center justify-content-center">
                                    <h2 className="text-uppercase text-center mb-5">ORDER</h2>
                                    <h5 className="card-title text-uppercase text-center">{carData?.make + " " + carData?.model}</h5>
                                    <h6 className="card-price text-center">{carData?.price_per_min}<span className="period"> UAH/min</span></h6>
                                    <h6 className="card-price text-center"><span className="period">{carData?.registration_number}</span></h6>
                                    <hr />

                                    <Timer time={time} />
                                    <h2 style={{ color: "white", marginTop: '50px', marginBottom: '20px' }}>Price: {price} UAH</h2>
                                    <button type="submit" onClick={handleForStop} className="btn btn-warning btn-block btn-lg gradient-custom-5 text-body">Stop</button>
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