import React from 'react';
import LoginForm from "../components/LoginPageComponents/LoginForm";
import {useState} from "react";

const Login = () => {


    return (

        <section className="vh-100 bg-image" style={{background: "#343131"}}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{background: "#000000",borderRadius:"15px"}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Log in</h2>
                                    <LoginForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;