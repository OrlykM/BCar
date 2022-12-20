import React, {useState} from 'react';
import './CardBalance.css'

const CardBalanceForm = () => {
    const [amount, setAmount] = useState(0);

    return (
        <div className="container__balance p-0">
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
                            <span className="ps-3 d-inline-block text-dark text-center">Top up {amount} UAH</span>
                            <span className="fas fa-arrow-right"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardBalanceForm;