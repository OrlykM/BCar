import React, {useEffect, useState,setState} from 'react';
import { useParams } from "react-router-dom";

const AddNew = () =>
{
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

    const handleForAddCar = (event) =>
    {
        event.preventDefault();
        const car =
        {
            make: make,
            model: model,
            year: year,
            number_of_seats: numberOfSeats,
            body_type: bodyType,
            category_type: categoryType,
            fuel_type: fuelType,
            vin_code: vinCode,
            registration_number: registrationNumber,
            insure_number: insureNumber,
        }

        fetch(`http://127.0.0.1:8000/car/add/${params.userId}/`,
            {
                method: 'POST',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                body: JSON.stringify(car),
            }).then(async(response) => {
            if (response.ok){
                console.log(response.json());
            }
            else if (!response.ok)
                return response.text().then(text => { throw new Error(text) })
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
        });
    }
    return (
        <form onSubmit={handleForAddCar}>
        <button type="submit">Do the thing</button>
        </form>
    );
};

export default AddNew;