import React from 'react';
import '../components/confirmationPageComponents/confirmationForm/confirmation.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from 'react-router-dom';
import { useParams } from "react-router-dom";


const Confirmation = () => {

    const [redirectHome,setRedirectHome] = useState('');
    const params = useParams();

   useEffect(() => {
        console.log({"params.key": params.key});
        fetch(`http://localhost:8000/user/auth/register/account-confirm-email/${params.key}/`,
            {
                method: 'GET',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8"
                    },
            }).then(async(response) => {
           if (response.ok)
                console.log(response.json());
           else if (response.status === 302)
                console.log(response.json());
            else
                console.log(response.json());});
    }, []);
    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: "#226a3f"
            }}>
                <section className="vh-100 bg-image">
                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                {/*background: "#226a3f"*/}
                                <div className="card" style={{background: "rgba(0,0,0,0.93)", borderRadius: "50px"}}>
                                    <div className="card-body p-5">
                                        <h2 style={{color: "white"}}>Thank you for confirmation!</h2>

                                        <div className="d-flex justify-content-center">
                                                <Link to="/login">
                                                <button className="button-86 " role="button"
                                                        style={{color: "#7e807e", margin: "50px"}}>Log in
                                                </button>
                                                </Link>
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

export default Confirmation;