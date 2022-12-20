import React, {useState} from 'react';
import './CardBalance.css'
import {Navigate} from "react-router-dom";

const CardBalanceForm = () => {
    const [amount, setAmount] = useState(0);

    const [isError,setIsError] = useState('');
    const [isAmountError,setAmountError] = useState('');
    const [redirectLogin,setRedirectLogin] = useState(false);
    const [redirectMap,setRedirectMap] = useState(false);
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

    const handleForSubmit = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("token");
        let user_id = localStorage.getItem("user_id");

        const new_money = {money: amount,}
        fetch(`http://localhost:8000/user/wallet/${user_id}/`,
            {
                method: 'PUT',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Token ${token}`,
                    },
                body: JSON.stringify(new_money),
            }).then(async(response) => {
           if (response.ok) {
                // make popup with sentence like : "Email was sent. Check it"
                // setRedirectHome(true);
                // will succeed unless server logic or your logic is off
                console.log(response.json());
                setRedirectMap(true);
           } else if (response.status === 400) {
                // will succeed if the server will always respond with JSON with a 400 response
                const result = await response.json();

                setAmountError('');
                if (result.amount)
                    setAmountError(result.amount);
           } else if (response.status === 401) {
                setRedirectLogin(true);
           }
           else {
                // there was some other error in the response, such as status 500
                console.log(response.json());
           }
           })
    }
    return (
        <div className="container__balance p-0">
            {redirectLogin && <Navigate to="/login" />}
            {redirectMap && <Navigate to="/map" />}
            <div className="card__balance px-4">
                <div className="row gx-3">
                    <div className="col-12">

                    </div>
                    <div className="col-12">
                        <div className="d-flex flex-column">
                            <p className="text__balance mb-1">Card Number</p>
                            <input className="form-control__balance mb-3" type="text" placeholder="1234 5678 4356 7890"
                                   size="16" minLength="16" maxLength="16"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-column">
                            <p className="text__balance mb-1">Expiry</p>
                            <input className="form-control__balance mb-3" type="text" placeholder="MM/YYYY"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-column">
                            <p className="text__balance mb-1">CVV/CVC</p>
                            <input className="form-control__balance mb-3 pt-2 " size="3" minLength="3" maxLength="3"
                                   type="password" placeholder="***" />
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <p className="text__balance mb-1">Payment amount</p>
                        <input className="form-control__balance mb-3" type="number" placeholder="Enter amount to top-up"
                               min={0}
                               value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                    </div>
                    <div className="col-12 text-lg-center">
                        <div className="btn btn-primary__balance mb-3  text-center">
                            <span onClick={handleForSubmit} className="ps-3 d-inline-block text-dark text-center">Top up {amount} UAH</span>
                            <span className="fas fa-arrow-right"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardBalanceForm;