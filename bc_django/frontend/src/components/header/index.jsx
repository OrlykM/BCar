import React, {useState} from 'react';
import "./header.css"
import {Link} from "react-router-dom";

const Header = () => {
    const [token] = useState(() => {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    });

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand logo-text" href="#">BCar</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <a className="nav-link" href="#home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#services">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#portfolio">Available cars</a>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="#features">Features</a>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <a className="nav-link" href="#pricing">Prices</a>
                        </li>
                    </ul>

                    {token ? (<button type="button" className="btn btn-outline-danger">Logout</button>) : (<><Link to='/register'>
                        <button type="button" className="btn btn-outline-success">register</button>
                    </Link>
                        <div className="space">
                        </div>
                        <Link to='/login'>
                            <button type="button" className="btn btn-outline-danger">Log in</button>
                        </Link></>)}


                </div>
            </div>
        </nav>

    );
};

export default Header;