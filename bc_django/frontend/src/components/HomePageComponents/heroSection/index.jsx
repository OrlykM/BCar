import React from 'react';
import "./herosection.css"

const HeroSection = () => {
    return (
        <section id="home">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-white display-4"><b>Carsharing BCar – comfortable car rental</b></h1>
                        <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Exercitationem incidunt sunt molestiae!</p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;