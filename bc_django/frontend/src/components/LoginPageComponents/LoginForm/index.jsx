import React from "react";
import "./loginform.css";
import {useState} from "react";
import {Link} from "react-router-dom";
import ErrorDisplay from "../../../modal/Modal";
import {Navigate} from "react-router-dom";

const LoginForm = () => {
      const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectHome, setRedirectHome] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailVerifiedError, setEmailVerifiedError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      username: username,
    };

    fetch("http://localhost:8000/user/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify(user),
    })
      .then(async (response) => {
        if (response.ok) {
          setRedirectHome(true);
          const result = await response.json();
          // will succeed unless server logic or your logic is off
          console.log(result);
          localStorage.setItem("token", result.key);
            fetch(`http://127.0.0.1:8000/user/getId/`,
                    {
                        method: 'GET',
                        headers:
                            {
                                "Content-Type": "application/json;charset=utf-8",
                                "Authorization": `Token ${result.key}`,
                            },
                    }).then(async(response) => {
                        if (response.ok) {
                          const id_result = await response.json();
                          // will succeed unless server logic or your logic is off
                          console.log(id_result);
                          localStorage.setItem("user_id", id_result);
                        }
                    });
        } else if (response.status === 400) {
          // will succeed if the server will always respond with JSON with a 400 response
          const result = await response.json();
          setEmailError("");
          setPasswordError("");
          setEmailVerifiedError(false);
          setLoginError(false);

          if (result.email) setEmailError(result.email);
          if (result.non_field_errors) {
            setEmailError("Invalid email");
            setPasswordError("Invalid password");
            console.log(result.non_field_errors);

            if (result.non_field_errors == "E-mail is not verified.")
              setEmailVerifiedError(true);
            else setLoginError(true);
          }
          if (result.password) setPasswordError(result.password);
        } else {
          // there was some other error in the response, such as status 500
          console.log(response.json());
        }
      })
      .catch((err) => {
        // An unexpected error occurred which was not 400 nor while parsing the response header
      });
  };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="form3Example3cg"
                    className="form-control form-control-lg  bg-dark text-white"
                />
                <label className="form-label" htmlFor="form3Example3cg">
                    {emailError ? emailError : "Your Email"}
                </label>
            </div>

            <div className="form-outline mb-4">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="form3Example4cg"
                    className="form-control form-control-lg  bg-dark text-white"
                />
                <label className="form-label" htmlFor="form3Example4cg">
                    {passwordError ? passwordError : "Your Password"}
                </label>
            </div>

            <ErrorDisplay active={loginError} setActive={setLoginError}>
                Unable to log in
            </ErrorDisplay>

            <ErrorDisplay
                active={emailVerifiedError}
                setActive={setEmailVerifiedError}
            >
                Email is not verified
            </ErrorDisplay>

            <p className="small mb-3 pb-lg-10 text-end">
                <a href="#" className="text-white-50">
                    <Link to="/reset">
                        <u>Forgot password?</u>
                    </Link>
                </a>
            </p>

            <div className="d-flex justify-content-center">
                <button
                    type="submit"
                    className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                >
                    Login
                </button>
                {redirectHome && <Navigate to="/map"/>}
            </div>

            <p className="text-center text-muted mt-5 mb-0">
                Don`t have an account?
                <a href="#" className="fw-bold text-body">
                    <Link to="/register">
                        <u>Register here</u>
                    </Link>
                </a>
            </p>
        </form>
    );
};

export default LoginForm;
