import React from 'react';
import './../../LoginPageComponents/LoginForm/loginform.css'
import './shareCar.css';
import UploadCarPhotos from "../uploadCarPhotos";



const ShareCarForm = () => {
    return (
        <div className="rentForm">
            <h1>Car Data</h1>
            <form>
                <div className="rentForm__grid">
                    <div className="rentForm__left">
                        <div className="form-outline mb-4" style={{marginRight: "10px", marginTop: "50px"}}>
                            <input type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Make of your car</label>
                            <input type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Model of your car</label>
                            {/*<input type="text" className="form-control form-control-lg  bg-dark text-white"/>*/}
                            <select className="form-select" aria-label="Default select example" style={{
                                backgroundColor:"#212529", color: "lightgray", height: "50px"}}>
                                <option selected>Year</option>
                                <option value="1">2012</option>
                                <option value="2">2013</option>
                                <option value="3">2014</option>
                                <option value="4">2015</option>
                                <option value="5">2016</option>
                                <option value="6">2017</option>
                                <option value="7">2018</option>
                                <option value="8">2019</option>
                                <option value="9">2020</option>
                                <option value="10">2021</option>
                                <option value="11">2022</option>
                            </select>
                            <label className="form-label" htmlFor="form3Example4cdg">Year of production</label>
                            <input type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Number of seats</label>
                            {/*<input type="text" className="form-control form-control-lg  bg-dark text-white"/>*/}
                            <select className="form-select" aria-label="Default select example" style={{
                                backgroundColor:"#212529", color: "lightgray", height: "50px"}}>
                                <option selected>Body type</option>
                                <option value="1">sedan</option>
                                <option value="2">hatchback</option>
                                <option value="3">liftback</option>
                                <option value="4">coupe</option>
                                <option value="5">convertible</option>
                                <option value="6">minivan</option>
                                <option value="7">van</option>
                                <option value="8">suv</option>
                            </select>
                            <label className="form-label" htmlFor="form3Example4cdg">Body type <i>(sedan, coupe, suv, etc)</i></label>
                        </div>
                        <div className="form-outline mb-4" style={{marginLeft: "10px", marginTop:"50px"}}>

                            {/*<input type="text" className="form-control form-control-lg  bg-dark text-white"/>*/}
                            <select className="form-select" aria-label="Default select example" style={{
                                backgroundColor:"#212529", color: "lightgray", height: "50px"}}>
                                <option selected>Fuel type</option>
                                <option value="1">Petrol (A92)</option>
                                <option value="2">Petrol (A95)</option>
                                <option value="3">Petrol (A98)</option>
                                <option value="4">Diesel</option>
                                <option value="5">Electric</option>
                                <option value="6">Gas</option>
                            </select>
                            <label className="form-label" htmlFor="form3Example4cdg">Fuel type</label>
                            <input type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">VIN Code</label>

                            <input type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Registration number</label>
                            <input type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Insure number</label>

                        </div>

                    </div>

                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" style={{background: "#000000",borderRadius:"15px"}}>
                                        <div className="card-body p-5">
                                            <UploadCarPhotos/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
};

export default ShareCarForm;