import React, {useEffect, useState,setState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Register = () => {

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [isError,setIsError] = useState('');
    const [isEmailError,setEmailError] = useState('');
    const [isPhoneError,setPhoneError] = useState('');
    const [isPasswordError,setPasswordError] = useState('');
    const [isPasswordConfirmError,setPasswordConfirmError] = useState('');

    const navigate = useNavigate();

    const handleForSubmit =  (event) =>
    {
        event.preventDefault();
        const user =
            {
                phone: phone,
                email: email,
                password1: password,
                password2: confirmPassword,
            }
        fetch("http://localhost:8000/user/auth/register/",
            {
                method: 'POST',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                body: JSON.stringify(user),
            }).then(async(response) => {
           if (response.ok) {
                // will succeed unless server logic or your logic is off
                console.log(response.json());
            } else if (response.status === 400) {
                // will succeed if the server will always respond with JSON with a 400 response
                const result = await response.json();
                if (result.email)
                    setEmailError(result.email);
                if (result.phone)
                    setPhoneError(result.phone);
                if (result.password1)
                    setPasswordError(result.password1)
                if (result.password2)
                    setPasswordConfirmError(result.password2)
            } else {
                // there was some other error in the response, such as status 500
                console.log(response.json());
            }
        })
            .catch((err) => {
                // An unexpected error occurred which was not 400 nor while parsing the response header
                console.log('caught it!',err);
                setIsError(String(err));
            });
    }
    return (
        <section className="vh-100 bg-image" style={{background: "#343131"}}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{background: "#000000", borderRadius:"15px"}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                    <form>

                                        <div className="phone">
                                            <input type="text" id="phone"
                                                   value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="phone"
                                                   className="form-control form-control-lg bg-dark text-white"/>
                                            <label className="form-label" htmlFor="form3Example1cg">{isPhoneError ? isPhoneError : 'Your Phone'}</label>
                                        </div>

                                        <div className="email">
                                            <input type="email" id="email"
                                                   value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="email"
                                                   className="form-control form-control-lg bg-dark text-white"/>
                                            <label className="form-label" htmlFor="form3Example3cg">{isEmailError ? isEmailError : 'Your Email'}</label>
                                        </div>

                                        <div className="password">
                                            <input type="password" id="password"
                                                   value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="password"
                                                   className="form-control form-control-lg bg-dark text-white"/>
                                            <label className="form-label" htmlFor="form3Example4cg">{isPasswordError ? isPasswordError : 'Password'}</label>
                                        </div>

                                        <div className="confirmPassword">
                                            <input type="password" id="confirmPassword"
                                                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                   placeholder="confirmPassword"
                                                   className="form-control form-control-lg bg-dark text-white"/>
                                            <label className="form-label" htmlFor="form3Example4cdg">{isPasswordConfirmError ? isPasswordConfirmError : 'Repeat your password'}</label>
                                        </div>


                                        <div className="d-flex justify-content-center">
                                            <button onClick={handleForSubmit} type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                    href="login.html">Register</button>

                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an account?
                                            <a className="fw-bold text-body">
                                                <Link to="/login">
                                                    <u>Login here</u>
                                                </Link>
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;