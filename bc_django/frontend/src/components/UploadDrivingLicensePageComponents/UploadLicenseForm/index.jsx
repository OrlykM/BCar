import React, {useMemo} from 'react';
import {useDropzone} from "react-dropzone";
import "./uploadphoto.css";
import {useNavigate} from "react-router-dom";

const UploadCarPhotos = () => {
    const navigate = useNavigate();
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg']
        },
        multiple: true
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


    const handleForSubmit = (event) => {
        event.preventDefault();
        console.log(acceptedFiles);

        fetch("http://localhost:8000/user/auth/password/",
            {
                method: 'POST',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                body: JSON.stringify({acceptedFiles}),
            }).then(async (response) => {
        }).then(() => navigate("/mapPage"))

    }

    return (
        <form>
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop driving license here, or click to select file</p>
            </div>
            {
                files

            }


            <div className="d-flex justify-content-center">
                <button onClick={handleForSubmit} type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Send
                </button>
            </div>
        </form>
    );
};

export default UploadCarPhotos;