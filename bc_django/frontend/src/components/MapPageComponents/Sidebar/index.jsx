import React, {useEffect, useState,setState} from 'react';
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import {CarCard} from "../CarCard";
import "./Sidebar.css";

let body_type = [
    'sedan', 'estate', 'hatchback', 
    'liftback', 'coupe', 'convertible',
    'minivan', 'van', 'suv'
]

const Sidebar = ({isOpen, setIsOpen}) => {
   
    const [category, setCategory] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [isLoadBody, setLoadBody] = useState('');
    const [count, setCount] = useState(0);

    const [carData, setCarData] = useState([]);
    const [selectPrice, setSelectPrice] = useState();
    const [selectBodyType, setSelectBodyType] = useState();
    
    let result = null;
    let price =  "+price_per_min";

    const handleForSubmitPrice = (is_submitted = false) =>
    {
        if (selectPrice !== undefined)
            if (selectPrice == "ASC")
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

        fetch(`http://127.0.0.1:8000/car/search/?category_type=${encodeURIComponent(category)}&ordering=${price}&body_type=${bodyType}`,
            {
                method: 'GET',
                headers:
                    {
                        "Content-Type": "application/json;charset=utf-8"
                    },
            }).then(async(response) => {
           if (response.ok)
           {
                result = await response.json();
                setCarData(result);
           };});
    }
    useEffect(() => {
        handleForSubmit();
    },[category])
    
    return (
        <div
            className="mySidebar"
            style={{
                display: isOpen ? "block" : "none"
            }}
        >
            <div className="mySidebar__btns">
                <button onClick={() => {handleForSubmit();
                                        setCategory("standard")}}>Standard</button>
                <button onClick={() => {handleForSubmit();
                                        setCategory("premium")}}>Premium</button>
                <button onClick={() => {handleForSubmit();
                                        setCategory("commercial") }}>Commercial</button>
            </div>

             <div className="mySidebar__select">
                <label htmlFor="">Price </label>
            <select
                onChange={(e) => {
                    const selectItem = e.target.value;
                    setSelectPrice(selectItem);
                }}>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
            </select>
            </div>

            <button onClick={() => {handleForSubmitPrice(true); }}>Submit changes</button>

            <div className="mySidebar__cars">
                {carData.results && carData.results.map((item, i) => (
                    <CarCard
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