import React, {useMemo, useState} from 'react';
import {useDropzone} from "react-dropzone";
import "./uploadphoto.css";
import {Navigate, useNavigate} from "react-router-dom";
import ErrorDisplay from "../../../modal/Modal";

const UploadCarPhotos = () => {
    const navigate = useNavigate();
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg']
        },
        multiple: false
    });
    const removeFile = (file) => {
        console.log('removeFile...')
        acceptedFiles.splice(acceptedFiles.indexOf(file), 1)
        console.log(acceptedFiles)
        window.location.reload();
    }
    const files = acceptedFiles.map(file => (
        <li className="text-light mb-2" key={file.path}>
            {file.path} -
            <svg onClick={() => removeFile(file)}
                 xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                 className="bi bi-x" role="button" viewBox="0 0 16 16">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </li>
    ));

    const [lic_serial, setLicSerial] = useState('');
    const [isError,setIsError] = useState('');
    const [isLicSerialError,setLicSerialError] = useState('');
    const [redirectLogin,setRedirectLogin] = useState(false);
    const [redirectMap,setRedirectMap] = useState(false);
    let token = localStorage.getItem("token");
    let user_id = localStorage.getItem("user_id");

    fetch(`http://127.0.0.1:8000/user/getId/`,
            {
                method: 'GET',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Token ${token}`,
                    },
            }).then(async(response) => {
                if (response.status === 401) {
                  setRedirectLogin(true);
                }
            });

    const handleForSubmit = (event) => {
        event.preventDefault();
        console.log(acceptedFiles[0]);
        let token = localStorage.getItem("token");
        let user_id = localStorage.getItem("user_id");

        const lic = {lic_serial: lic_serial,}
        fetch(`http://localhost:8000/user/${user_id}/upload_lic/`,
            {
                method: 'PUT',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Token ${token}`,
                    },
                body: JSON.stringify(lic),
            }).then(async(response) => {
           if (response.ok) {
                // make popup with sentence like : "Email was sent. Check it"
                // setRedirectHome(true);
                // will succeed unless server logic or your logic is off
                console.log(response.json());
                setRedirectMap(true);
           } else if (response.status === 400) {
                // will succeed if the server will always respond with JSON with a 400 response
                const result = await response.json();

                setLicSerialError('');
                if (result.lic_serial)
                    setLicSerialError(result.lic_serial);
           } else if (response.status === 401) {
                setRedirectLogin(true);
           }
           else {
                // there was some other error in the response, such as status 500
                console.log(response.json());
           }
           })
    }

    return (
        <form>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                {redirectLogin && <Navigate to="/login" />}
            {redirectMap && <Navigate to="/map" />}
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{background: "#000000",borderRadius:"15px"}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Upload photo of your driving license</h2>
                                    <input type="text" value={lic_serial} onChange={(e) => setLicSerial(e.target.value)} className="form-control form-control-lg  bg-dark text-white"/>
                                    <label className="form-label" htmlFor="form3Example4cdg">License number</label>
                                    <div className="dropzone" {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <p>Drag 'n' drop driving license here, or click to select file</p>
                                        </div>
                                        {
                                            files

                                        }
                                        <ErrorDisplay active={isLicSerialError} setActive={setLicSerialError}>
                                        Invalid serial number provided
                                    </ErrorDisplay>

                                        <div className="d-flex justify-content-center">
                                            <button onClick={handleForSubmit} type="submit"
                                                    className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body">Send
                                            </button>
                                        </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default UploadCarPhotos;