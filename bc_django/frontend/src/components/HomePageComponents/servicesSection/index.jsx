import React from 'react';
import "./servicesection.css"
const ServiceSection = () => {
    return (
        <section id="services">
            <div className="container">
                <div className="row">
                    <div className="col-12 section-intro">
                        <h1>Our Services</h1>
                        <div className="hline"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-6 p-4">
                        <div className="icon-box">
                            <i className='bx bxs-landscape'></i>
                        </div>
                        <h4 className="title-sm mt-4">Graphic Designing</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem incidunt sunt
                            molestiae!</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 p-4">
                        <div className="icon-box">
                            <i className='bx bxs-coffee'></i>
                        </div>
                        <h4 className="title-sm mt-4">Codding</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem incidunt sunt
                            molestiae!</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 p-4">
                        <div className="icon-box">
                            <i className='bx bxs-image'></i>
                        </div>
                        <h4 className="title-sm mt-4">Photography</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem incidunt sunt
                            molestiae!</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 p-4">
                        <div className="icon-box">
                            <i className='bx bxs-check-shield'></i>
                        </div>
                        <h4 className="title-sm mt-4">Safe</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem incidunt sunt
                            molestiae!</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 p-4">
                        <div className="icon-box">
                            <i className='bx bx-laptop'></i>
                        </div>
                        <h4 className="title-sm mt-4">Web Designing</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem incidunt sunt
                            molestiae!</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 p-4">
                        <div className="icon-box">
                            <i className='bx bxs-happy-heart-eyes'></i>
                        </div>
                        <h4 className="title-sm mt-4">UI Design</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem incidunt sunt
                            molestiae!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;