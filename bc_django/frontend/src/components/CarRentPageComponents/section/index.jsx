import React, { useState, useEffect, useCallbac, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './carrent.css'
import {Navigate, redirect} from "react-router-dom";
const Index = () => {
    const params = useParams()
    const [carData, setCarData] = useState();
    const [counter, setCounter] = useState(0);
    const dataFetchedRef = useRef(false);
    const navigate = useNavigate();

    const [redirectLicense,setRedirectLicense] = useState(false);
    const [redirectLogin,setRedirectLogin] = useState(false);
    const [redirectOrder,setRedirectOrder] = useState(false);
    const [redirectWallet,setRedirectWallet] = useState(false);
    const [notEndedUrl, setNotEndedUrl] = useState('');
    let not_ended_url;

    let token = localStorage.getItem("token");
    let user_id = localStorage.getItem("user_id");

    fetch(`http://127.0.0.1:8000/user/getId/`,
            {
                method: 'GET',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Token ${token}`,
                    },
            }).then(async(response) => {
                if (response.status === 401) {
                  setRedirectLogin(true);
                }
            });

    // info about car
    let result = null;
    const fetchData = () => {
        let token = localStorage.getItem("token");
        fetch(`http://127.0.0.1:8000/car/${params.carId}/get_one/`,
        {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Token ${token}`,
            },
        }).then(async(response) => {
            if (response.ok)
            {
                result = await response.json();
                setCarData(result);
            };});
        console.log('Fetching data...');
    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchData();
    },[])

    // rent button
    const handleForSubmit =  (event) =>
    {
        event.preventDefault();
        let token = localStorage.getItem("token");
        let user_id = localStorage.getItem("user_id");
            fetch(`http://127.0.0.1:8000/user/order/new/${user_id}/${params.carId}/`,
                    {
                        method: 'POST',
                        headers:
                            {
                                "Content-Type": "application/json;charset=utf-8",
                                "Authorization": `Token ${token}`,
                            },
                    }).then(async(response) => {
                   if (response.ok)
                   {
                        const result_1 = await response.json();
                        console.log(result_1);
                        not_ended_url = `/order`;
                        setNotEndedUrl(not_ended_url);
                        setRedirectOrder(true);
                   }
                   if (response.status === 401)
                   {
                       setRedirectLogin(true);
                   }
                   if (response.status === 403)
                   {
                       setRedirectLicense(true);
                   }
                   if (response.status === 400)
                   {
                       not_ended_url = `/balance`;
                       setNotEndedUrl(not_ended_url);
                       setRedirectWallet(true);
                   };})
    }
    let image_url = "http://localhost:8000" + carData?.photo;
    return (

        <section className="rent vh-100 pt-5" id="rent">
            <div className='container'>
                {redirectLogin && <Navigate to={"/login"} />}
                {redirectLicense && <Navigate to={"/register/UploadDrivingLicense"} />}
                {redirectOrder && <Navigate to={notEndedUrl} />}
                {redirectWallet && <Navigate to={notEndedUrl} />}
                <div className="row pt-5">
                    <div className="col-sm">
                        <img className="img-fluid"
                             src={image_url}
                             width={500} height={500} alt={carData?.photo}/>
                    </div>
                    {/*Марка, модель, рік випуску, тип кузову, клас, реєстраційний номер*/}
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-uppercase text-center">{carData?.make}</h5>
                                <h5 className="card-title text-uppercase text-center">{carData?.model}</h5>
                                <h6 className="card-price text-center">{carData?.price_per_min} UAH<span className="period">/min</span></h6>
                                <hr/>
                                <ul className="fa-ul">
                                <li><span className="fa-li"><i className="fas fa-check"></i></span><strong>{carData?.category_type}</strong>
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>{carData?.fuel_type}
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>Seats {carData?.number_of_seats}
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>{carData?.registration_number}
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>{carData?.body_type}
                                    </li>
                                </ul>
                                <div className="d-grid ">
                                    <button onClick={handleForSubmit} type="submit" className="btn btn text-uppercase abc">
                                        Rent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;