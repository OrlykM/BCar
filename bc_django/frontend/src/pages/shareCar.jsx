import React from 'react';
import ShareCarForm from "../components/ShareCarComponents/shareCarForm";
import '../components/ShareCarComponents/shareCarForm/shareCar.css'


const ShareCar = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: "radial-gradient(circle, #2e59af, #071843)"}}>
            <section className="vh-100 bg-image" >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">

                                <div className="card" style={{background: "#000000",borderRadius:"50px"}}>
                                    <div className="card-body p-5">
                                        <ShareCarForm/>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShareCar;