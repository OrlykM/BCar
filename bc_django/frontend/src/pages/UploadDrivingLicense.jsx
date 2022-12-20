import React from 'react';
import UploadLicenseForm from "../components/UploadDrivingLicensePageComponents/UploadLicenseForm";




const UploadDrivingLicense = () => {
    return (
        <section className="vh-100 bg-image" style={{background: "radial-gradient(circle, #2e59af, #071843)"}}>
            <UploadLicenseForm/>
        </section>
    );
};

export default UploadDrivingLicense;