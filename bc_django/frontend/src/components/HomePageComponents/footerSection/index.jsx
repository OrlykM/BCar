import React from 'react';
import './footerSection.css'
const FooterSection = () => {
    return (
        <footer>
            <div className="footer-top">
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-md-4">
                            <h4 className="logo-text">BCar</h4>
                            <p>Praesent vulputate neque nec sem fermentum porttitor. Mauris eget dolor convallis,
                                trista, dignissim sapien. Duis vel felis dictu</p>
                            <div className="social-icons">
                                <a href="#"><i className="bx bxl-facebook"></i></a>
                                <a href="#"><i className="bx bxl-twitter"></i></a>
                                <a href="#"><i className="bx bxl-instagram"></i></a>
                                <a href="#"><i className="bx bxl-github"></i></a>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h5 className="title-sm">Navigation</h5>
                            <div className="footer-links">
                                <a href="#">Services</a>
                                <a href="#">Our Work</a>
                                <a href="#">Team</a>
                                <a href="#">Blog</a>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h5 className="title-sm">More</h5>
                            <div className="footer-links">
                                <a href="#">FAQ's</a>
                                <a href="#">Privacy & Policy</a>
                                <a href="#">Liscences</a>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h5 className="title-sm">Contact</h5>
                            <div className="footer-links">
                                <p className="mb">1649 Norman Street, Los Angeles, 9001</p>
                                <p className="mb-">8(800)316-06-42</p>
                                <p className="mb">hello@yourdomain.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row justify-content-between gy-3">
                        <div className="col-md-6">
                            <p className="mb-0">© BCar 2022. All rights reserved</p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;