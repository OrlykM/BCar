import React from 'react';
import "./pricingsection.css"


const PricingSection = () => {
    return (
        <section className="pricing py-5" id="pricing">
            <div className="container">
                <div className="row">

                    <div className="col-lg-4">
                        <div className="card mb-5 mb-lg-0">
                            <div className="card-body">
                                <h5 className="card-title text-muted text-uppercase text-center">Standart</h5>
                                <h6 className="card-price text-center">2 UAH<span className="period">/min</span></h6>
                                <hr/>
                                    <ul className="fa-ul">
                                        <li><span className="fa-li"><i className="fas fa-check"></i></span>B/B+ class cars
                                        </li>
                                        <li><span className="fa-li"><i className="fas fa-check"></i></span>Affordable for everyone
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card mb-5 mb-lg-0">
                            <div className="card-body">
                                <h5 className="card-title text-muted text-uppercase text-center">Plus</h5>
                                <h6 className="card-price text-center">4 UAH<span className="period">/min</span></h6>
                                <hr/>
                                    <ul className="fa-ul">
                                        <li><span className="fa-li"><i className="fas fa-check"></i></span><strong>C/D/E class cars</strong></li>
                                        <li><span className="fa-li"><i className="fas fa-check"></i></span>Premium interiors
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-muted text-uppercase text-center">Commercial</h5>
                                <h6 className="card-price text-center">3 UAH<span className="period">/min</span></h6>
                                <hr/>
                                    <ul className="fa-ul">
                                        <li><span className="fa-li"><i className="fas fa-check"></i></span><strong>Wide variety of vans</strong>
                                        </li>
                                        <li><span className="fa-li"><i className="fas fa-check"></i></span>Different load capacities available
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;