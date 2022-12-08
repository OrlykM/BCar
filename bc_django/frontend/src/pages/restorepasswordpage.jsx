import React from 'react';
import LoginForm from "../components/LoginPageComponents/LoginForm";
import ResetPasswordForm from "../components/ResetPasswordComponents/ResetPasswordForm";

const RestorePassword = () => {
    return (
        <section className="vh-100 bg-image" style={{background: "#343131"}}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{background: "#000000",borderRadius:"15px"}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Enter your email</h2>
                                    <ResetPasswordForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RestorePassword;