import React from 'react';
import './carrent.css'

const Index = () => {
    return (

        <section className="rent vh-100 pt-5" id="rent">
            <div className='container'>
                <div className="row pt-5">
                    <div className="col-sm">
                        <img className="img-fluid"
                             src="https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/News/2022/720x720_P90433010_highRes_bmw-ix5-hydrogen-08-.jpg.grp-transform/small/720x720_P90433010_highRes_bmw-ix5-hydrogen-08-.jpg"
                             width={500} height={500} alt=''/>
                    </div>
                    {/*Марка, модель, рік випуску, тип кузову, клас, реєстраційний номер*/}
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-muted text-uppercase text-center">BMW</h5>
                                <h6 className="card-price text-center">$2<span className="period">/hour</span></h6>
                                <hr/>
                                <ul className="fa-ul">
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span><strong>Unlimited
                                        Users</strong>
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>150GB Storage
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited
                                        Public Projects
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>Community
                                        Access
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited
                                        Private Projects
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>Dedicated
                                        Phone Support
                                    </li>
                                    <li><span className="fa-li"><i
                                        className="fas fa-check"></i></span><strong>Unlimited</strong> Free
                                        Subdomains
                                    </li>
                                    <li><span className="fa-li"><i className="fas fa-check"></i></span>Monthly
                                        Status Reports
                                    </li>
                                </ul>
                                <div className="d-grid ">
                                    <a className="btn btn text-uppercase abc">Button</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;