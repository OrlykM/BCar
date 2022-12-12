import React from 'react';
import './ctasection.css'
const CtaSection = () => {
    return (
        <section id="cta" className="py-5">
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h3 className="text-white">Try just now.</h3>
                    </div>
                    <div className="col-auto">
                        <a href="#" className="btn btn-dark">LOG IN</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;