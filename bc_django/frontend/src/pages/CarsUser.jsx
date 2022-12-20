import React from 'react';
import Header from "../components/CarsUserPageComponents/header";
import CarCard from "../components/CarsUserPageComponents/CarCard";


const CarsUser = () => {
    return (
        <div>
            <Header/>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: "radial-gradient(circle, #2e59af, #071843)"
            }}>
                <section className="min-vh-100 bg-image">
                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">

                                <div className="card" style={{background: "#272626", borderRadius: "50px"}}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5"
                                            style={{color: "#b4dbe9"}}>
                                            Your Cars
                                        </h2>
                                        <div className="d-flex justify-content-center">

                                            <div style={{
                                                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                                                columnGap: "10px", rowGap: "10px"
                                            }}>
                                                <CarCard/>
                                                <CarCard/>
                                                <CarCard/>
                                                <CarCard/>
                                                <CarCard/>
                                                <CarCard/>


                                            </div>
                                            {/*<button className="button-87" role="button">Send</button>*/}
                                            {/*<button type="submit"*/}
                                            {/*        className="btn btn-warning btn-block btn-lg gradient-custom-4 text-white"*/}
                                            {/*        >*/}
                                            {/*    Send*/}
                                            {/*</button>*/}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CarsUser;