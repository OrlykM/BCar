import React, {useEffect, useState,setState} from 'react';
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const GetInfoCars = () =>
{
    const [numberOfDays, setNumberOfDays] = useState("");
    const [cars, setCars] = useState("");

    const [isNumberOfDaysError, setNumberOfDaysError] = useState("");
    const [isCarsError, setCarsError] = useState("");
    const [isSearchParamsError, setSearchParamsError] = useState("");

    // get number_of_days from URL
    const [searchParams, setSearchParams] = useSearchParams();

    // Get userID from URL
    const params = useParams()

    let result = null;
    
    const handleGetData = (event) =>
    {
        event.preventDefault();
        let days = null;
        days = searchParams.get("number_of_days")
        console.log(days);

        // change the response to user
        // we need to make goto return jsx, if days === ""
        // in other case, code will bu ruined because
        // backed don`t get the number_of_days
        if (days === "")
        {
            console.log("number of days are required to get info about cars");
            setSearchParamsError("number of days are required to get info about cars");
        }

        // http://127.0.0.1:8000/user/owner/get_info/2/?number_of_days=20 - backend
        // http://localhost:3000/user/owner/get_info/2/?number_of_days=11 - frontend

        fetch(`http://127.0.0.1:8000/user/owner/get_info/${params.userId}/?number_of_days=${encodeURIComponent(days)}`,
            {
                method: 'GET',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8"
                    },
            }).then(response => {
                result = response.json()
                let status_code = response.status;
                if(status_code != 200) {
                    console.log('Error in getting brand info!')
                    return false;
                }
                return result
            })
            .then(result => {
                if (result.length === 0)
                {
                    const string = "You don`t have cars"
                    console.log(string);
                    setCarsError(string);
                }
                else
                {
                    setCars(result);
                    // Do something with the result
                    for (let i = 0; i < result.length; i++)
                        console.log(result[i].make);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div>
            <form onSubmit={handleGetData}>
            <button type="submit">Display Info</button>
            <div>
                {isCarsError ? isCarsError : <pre>{JSON.stringify(cars, null, 2)}</pre>}
            </div>
            <div>
                {isSearchParamsError ? isSearchParamsError : "number_of_days is filled"}
            </div>
            </form>
        </div>
    );
};

export default GetInfoCars;