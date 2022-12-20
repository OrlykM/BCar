import React, {useState} from 'react';
import './../../LoginPageComponents/LoginForm/loginform.css'
import './shareCar.css';
import UploadCarPhotos from "../uploadCarPhotos";
import {Navigate, useParams} from "react-router-dom";



const ShareCarForm = () => {
    // change useState to empty ""

    // car data
    const [make, setMake] = useState("Alfa Romeo");
    const [model, setModel] = useState("Brera");
    const [year, setYear] = useState("2013");
    const [numberOfSeats, setSeats] = useState("4");
    const [bodyType, setBodyType] = useState("coupe");
    const [categoryType, setCategoryType] = useState("premium");
    const [fuelType, setFuelType] = useState("Petrol (A98)");
    const [vinCode, setVinCode] = useState("0000000000");
    const [registrationNumber, setRegistrationNumber] = useState("AA1234AA");
    const [insureNumber, setInsureNumber] = useState("1234");

    // error data
    const [isError,setIsError] = useState('');
    const [isMakeError,setMakeError] = useState('');
    const [isModelError,setModelError] = useState('');
    const [isYearError,setYearError] = useState('');
    const [isSeatsError,setSeatsError] = useState('');
    const [isBodyTypeError,setBodyTypeError] = useState('');
    const [isCategoryTypeError,setCategoryTypeError] = useState('');
    const [isFuelTypeError,setFuelTypeError] = useState('');
    const [isVinCodeError,setVinCodeError] = useState('');
    const [isRegistrationNumberError,setRegistrationNumberError] = useState('');
    const [isInsureNumberError,setInsureNumberError] = useState('');

    // Get ID from URL
    const params = useParams();
    const [redirectUserCars,setRedirectUserCars] = useState(false);
    const handleForSubmit = (event) =>
    {
        event.preventDefault();
        const car =
        {
            make: make,
            model: model,
            year: year,
            number_of_seats: numberOfSeats,
            body_type: bodyType,
            category_type: "premium",
            fuel_type: fuelType,
            vin_code: vinCode,
            registration_number: registrationNumber,
            insure_number: insureNumber,
        }
        let token = localStorage.getItem("token");
        let user_id = localStorage.getItem("user_id");
        fetch(`http://127.0.0.1:8000/car/add/${user_id}/`,
            {
                method: 'POST',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Token ${token}`,
                    },
                body: JSON.stringify(car),
            }).then(async(response) => {
            if (response.ok){
                console.log(response.json());
                setRedirectUserCars(true);
            }
            else if (response.status === 201){
                console.log(response.json());
            }
            else if (response.status === 400)
             {
                // will succeed if the server will always respond with JSON with a 400 response
                const result = await response.json();

                if (result.make)
                    setMakeError(result.make);
                if (result.model)
                    setModelError(result.model);
                if (result.year)
                    setYearError("Choose the correct year"); // enum
                if (result.number_of_seats)
                    setSeatsError(result.number_of_seats);
                if (result.body_type)
                    setBodyTypeError("Choose the correct body type"); // enum
                if (result.category_type)
                    setCategoryTypeError("Choose the correct category type"); // enum
                if (result.fuel_type)
                    setFuelTypeError("Choose the correct fuel type"); // enum
                if (result.vin_code)
                    setVinCodeError(result.vin_code);
                if (result.registration_number)
                    setRegistrationNumber("Your number must be like this: AA0000AA");
                if (result.insure_number)
                    setInsureNumberError(result.insure_number);
            }
            else
            {
                // there was some other error in the response, such as status 500
                console.log(response.json());
            }
        }).catch((err) => {
            // An unexpected error occurred which was not 400 nor while parsing the response header
            console.log('caught it!',err);
        });};
    return (
        <div className="rentForm">
            {redirectUserCars && <Navigate to={"/map"} />}
            <h1>Car Data</h1>
            <form>
                <div className="rentForm__grid">
                    <div className="rentForm__left">
                        <div className="form-outline mb-4" style={{marginRight: "10px", marginTop: "50px"}}>
                            <input value={make}
                                    onChange={(e) => setMake(e.target.value)} type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Make of your car</label>
                            <input value={model}
                                    onChange={(e) => setModel(e.target.value)} type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Model of your car</label>
                            {/*<input type="text" className="form-control form-control-lg  bg-dark text-white"/>*/}
                            <select value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="form-select" aria-label="Default select example" style={{
                                backgroundColor:"#212529", color: "lightgray", height: "50px"}}>
                                <option selected>Year</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>
                            <label className="form-label" htmlFor="form3Example4cdg">Year of production</label>
                            <input value={numberOfSeats}
                                    onChange={(e) => setSeats(e.target.value)} type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Number of seats</label>
                            {/*<input type="text" className="form-control form-control-lg  bg-dark text-white"/>*/}
                            <select value={bodyType}
                                    onChange={(e) => setBodyType(e.target.value)} className="form-select" aria-label="Default select example" style={{
                                backgroundColor:"#212529", color: "lightgray", height: "50px"}}>
                                <option selected>Body type</option>
                                <option value="sedan">sedan</option>
                                <option value="hatchback">hatchback</option>
                                <option value="liftback">liftback</option>
                                <option value="coupe">coupe</option>
                                <option value="convertible">convertible</option>
                                <option value="minivan">minivan</option>
                                <option value="van">van</option>
                                <option value="suv">suv</option>
                            </select>
                            <label className="form-label" htmlFor="form3Example4cdg">Body type <i>(sedan, coupe, suv, etc)</i></label>
                        </div>
                        <div className="form-outline mb-4" style={{marginLeft: "10px", marginTop:"50px"}}>

                            {/*<input type="text" className="form-control form-control-lg  bg-dark text-white"/>*/}
                            <select value={fuelType}
                                    onChange={(e) => setFuelType(e.target.value)}
                                    className="form-select" aria-label="Default select example" style={{
                                backgroundColor:"#212529", color: "lightgray", height: "50px"}}>
                                <option selected>Fuel type</option>
                                <option value="Petrol (A92)">Petrol (A92)</option>
                                <option value="Petrol (A95)">Petrol (A95)</option>
                                <option value="Petrol (A98)">Petrol (A98)</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Gas">Gas</option>
                            </select>
                            <label className="form-label" htmlFor="form3Example4cdg">Fuel type</label>
                            <input value={vinCode}
                                    onChange={(e) => setVinCode(e.target.value)}
                                   type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">VIN Code</label>

                            <input value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                   type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
                            <label className="form-label" htmlFor="form3Example4cdg">Registration number</label>
                            <input value={insureNumber}
                                    onChange={(e) => setInsureNumber(e.target.value)} type="text" className="form-control form-control-lg  bg-dark text-white" style={{height: "50px"}}/>
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
            <div className="d-flex justify-content-center">
                    <button onClick={handleForSubmit} className="button-87" role="button">Send</button>
                    {/*<button type="submit"*/}
                    {/*        className="btn btn-warning btn-block btn-lg gradient-custom-4 text-white"*/}
                    {/*        >*/}
                    {/*    Send*/}
                    {/*</button>*/}
                </div>
        </div>
    );
};

export default ShareCarForm;