import React, {useEffect, useState,setState} from 'react';
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {CarCard} from "../CarCard";
import "./Sidebar.css";
import {Navigate, redirect} from "react-router-dom";
let body_type = [
    'sedan', 'estate', 'hatchback', 
    'liftback', 'coupe', 'convertible',
    'minivan', 'van', 'suv'
]

const Sidebar = ({isOpen, setIsOpen}) => {
      const [activeButton, setActiveButton] = useState(-1);
const [category, setCategory] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [isLoadBody, setLoadBody] = useState('');
    const [count, setCount] = useState(0);

    const [notEndedUrl, setNotEndedUrl] = useState('');
    const [carData, setCarData] = useState([]);
    const [selectPrice, setSelectPrice] = useState();
    const [selectBodyType, setSelectBodyType] = useState();

    const [redirectLogin,setRedirectLogin] = useState(false);
    const [redirectOrder,setRedirectOrder] = useState(false);

    let result = null;
    let price =  "+price_per_min";
    let car_id = 0;
    let not_ended_url;

    let token = localStorage.getItem("token");

    let user_id = localStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/user/order/last/${user_id}/`,
            {
                method: 'GET',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Token ${token}`,
                    },
            }).then(async(response) => {


           if (response.ok)
           {
                result = await response.json();
                console.log(result);
                car_id = result;
                not_ended_url = `/order`;
                setNotEndedUrl(not_ended_url);
                if (car_id != 0) {
                    setRedirectOrder(true);
                }
           };
           });

    const handleForSubmitPrice = (is_submitted = false) =>
    {
        if (selectPrice !== undefined)
            if (selectPrice === "ASC")
                price = "+price_per_min";
            else
                price = "-price_per_min"
        else
            price = "+price_per_min"

        console.log({"handleForSubmitPrice": price});
        handleForSubmit(category);
    }
    const handleForSubmit = () =>
    {
        console.log(category);
        console.log({"handleForSubmit": price});
        let token = localStorage.getItem("token");
        let user_id = localStorage.getItem("user_id");
        console.log(user_id);


        fetch(`http://127.0.0.1:8000/car/search/?category_type=${encodeURIComponent(category)}&ordering=${price}&body_type=${bodyType}`,
            {
                method: 'GET',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Token ${token}`,
                    },
            }).then(async(response) => {
           if (response.ok)
           {
                result = await response.json();
                setCarData(result);
           }
           if (response.status === 401)
           {
               setRedirectLogin(true);
           };});
    }
    useEffect(() => {
        handleForSubmit();
    },[category])
    console.log(notEndedUrl);
    
    return (


        <div
            className={isOpen ? 'mySidebar mySidebar_open' : 'mySidebar'}

        >
        {redirectLogin && <Navigate to="/login" />}
            {redirectOrder && <Navigate to={notEndedUrl} />}
            <div className="mySidebar__btns">
                {/*<button className="button-81" role="button" onClick={() => {handleForSubmit();*/}
                {/*                        setCategory("standard")}}>Standard</button>*/}
                {/*<button className="button-81" role="button" onClick={() => {handleForSubmit();*/}
                {/*                        setCategory("premium")}}>Premium</button>*/}
                {/*<button className="button-81" role="button" onClick={() => {handleForSubmit();*/}
                {/*                        setCategory("commercial")}}>Commercial</button>*/}
                {
                    ["standard", "premium", "commercial"].map((cat, i) => (
                        <button
                            onClick={() => {
                                setCategory(cat);
                                setActiveButton(i);
                            }}
                            className={activeButton === i ? "button-81 button-81_active" : "button-81"}
                        >
                            {cat}
                        </button>
                    ))
                }
            </div>
            <div className='select__sector'>
             <div className="mySidebar__select">
                 {/*<label htmlFor="">Price </label>*/}
                 {/*<label className="form-label" htmlFor="form3Example4cdg">Price</label>*/}
            <select className="form-select" aria-label="Default select example" style={{
                backgroundColor:"#212529", color: "lightgray", height: "50px", width:"200px"}}
                onChange={(e) => {
                    const selectItem = e.target.value;
                    setSelectPrice(selectItem);
                }}>
                <option value="ASC">Price ASC</option>
                <option value="DESC">Price DESC</option>

            </select>


                 {/*<button className='button-81' id='button' onClick={() => {handleForSubmitPrice(true); }}>Submit changes</button>*/}
            </div>
                <button className="button-87" role="button" onClick={() => {handleForSubmitPrice(true); }}>Filter</button>

            </div>

            <div className="mySidebar__cars">
                {carData.results && carData.results.map((item, i) => (
                    <CarCard
                        type = 'type'
                        key={item.id}
                        car_id = {item.id}
                        title = {item.make + " " + item.model}
                        variant = {item.category_type}
                        price = {item.price_per_min + " грн/хв"}
                        registration_number = {item.registration_number}
                        body_type = {item.body_type}
                        latitude = {item.latitude}
                        longitude = {item.longitude}
                    />
                ))}
            </div>

        </div>

    );
};

export default Sidebar;