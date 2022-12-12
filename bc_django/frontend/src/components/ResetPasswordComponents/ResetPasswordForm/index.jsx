import React from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const ResetPasswordForm = () => {
    const [isError, setIsError] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleForSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8000/user/auth/password/reset/",
            {
                method: 'POST',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                body: JSON.stringify({email}),
            }).then(async (response) => {
            if (response.ok) {
                // will succeed unless server logic or your logic is off
                console.log(response.json());
            } else if (response.status === 400) {
                // will succeed if the server will always respond with JSON with a 400 response
                const result = await response.json();
                if (result.email) {
                    setEmailError(result.email);
                }
            } else {
                // there was some other error in the response, such as status 500
                console.log(response.json());
            }
        }).then(() => navigate("/reset/newPassword"))
            .catch((err) => {
                // An unexpected error occurred which was not 400 nor while parsing the response header
                setIsError(String(err));
            });


    }

    return (
        <form>
            <div className="form-outline mb-4">
                <input type="email" id="form3Example3cg" className="form-control form-control-lg  bg-dark text-white"
                       value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
                <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleForSubmit} type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">NEXT
                </button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;