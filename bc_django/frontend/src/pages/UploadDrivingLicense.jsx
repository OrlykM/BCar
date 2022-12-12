import React from 'react';
import UploadLicenseForm from "../components/UploadDrivingLicensePageComponents/UploadLicenseForm";




const UploadDrivingLicense = () => {
    return (
        <section className="vh-100 bg-image" style={{background: "#226a3f"}}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{background: "#000000",borderRadius:"15px"}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Upload photo of your driving license</h2>
                                    <input type="text" className="form-control form-control-lg  bg-dark text-white"/>
                                    <label className="form-label" htmlFor="form3Example4cdg">License series</label>
                                    <input type="text" className="form-control form-control-lg  bg-dark text-white"/>
                                    <label className="form-label" htmlFor="form3Example4cdg">License number</label>
                                    <input type="text" className="form-control form-control-lg  bg-dark text-white"/>
                                    <label className="form-label" htmlFor="form3Example4cdg">Date of owner's birth</label>
                                    <UploadLicenseForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadDrivingLicense;