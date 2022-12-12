import React from 'react';
import "./potfoliosection.css"

const PortfolioSection = () => {
    return (
        <section id="portfolio" className="row g-0 py-0">

            <div className="col-lg-4 col-sm-6">
                <div className="portfolio-item">
                    <img src={require('../../../assets/img/p1.jpg')} alt=""/>
                        <div className="portfolio-overlay">
                            <div>
                                <h3>Project title</h3>
                                <h6>Project subtite</h6>
                            </div>
                        </div>
                </div>
            </div>
            <div className="col-lg-4 col-sm-6">
                <div className="portfolio-item">
                    <img src={require('../../../assets/img/p2.jpg')} alt=""/>
                        <div className="portfolio-overlay">
                            <div>
                                <h3>Project title</h3>
                                <h6>Project subtite</h6>
                            </div>
                        </div>
                </div>
            </div>
            <div className="col-lg-4 col-sm-6">
                <div className="portfolio-item">
                    <img src={require('../../../assets/img/p3.jpg')} alt=""/>
                        <div className="portfolio-overlay">
                            <div>
                                <h3>Project title</h3>
                                <h6>Project subtite</h6>
                            </div>
                        </div>
                </div>
            </div>
            <div className="col-lg-4 col-sm-6">
                <div className="portfolio-item">
                    <img src={require('../../../assets/img/p4.jpg')} alt=""/>
                        <div className="portfolio-overlay">
                            <div>
                                <h3>Project title</h3>
                                <h6>Project subtite</h6>
                            </div>
                        </div>
                </div>
            </div>
            <div className="col-lg-4 col-sm-6">
                <div className="portfolio-item">
                    <img src={require('../../../assets/img/p5.jpg')} alt=""/>
                        <div className="portfolio-overlay">
                            <div>
                                <h3>Project title</h3>
                                <h6>Project subtite</h6>
                            </div>
                        </div>
                </div>
            </div>
            <div className="col-lg-4 col-sm-6">
                <div className="portfolio-item">
                    <img src={require('../../../assets/img/p6.jpg')} alt=""/>
                        <div className="portfolio-overlay">
                            <div>
                                <h3>Project title</h3>
                                <h6>Project subtite</h6>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;