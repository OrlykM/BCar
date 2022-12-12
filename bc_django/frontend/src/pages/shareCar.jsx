import React from 'react';
import ShareCarForm from "../components/ShareCarComponents/shareCarForm";



const ShareCar = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: "#226a3f"}}>
            <section className="vh-100 bg-image" >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">

                                <div className="card" style={{background: "#000000",borderRadius:"50px"}}>
                                    <div className="card-body p-5">
                                        <ShareCarForm/>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-white">Send
                                            </button>
                                        </div>
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