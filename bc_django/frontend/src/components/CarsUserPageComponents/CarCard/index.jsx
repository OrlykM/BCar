import React from 'react';
import {Navigate} from "react-router-dom";
import './carCard.css'

const CarCard = () => {
    return (
        <div className="carsCard">
            <div className="carsCard__img">
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hiQ-sqfN3wnk9lHyDywYmZ5-X-IfpUUllg&usqp=CAU'
                    alt=""

                />
            </div>
            <div className="carsCard__info">
                <h2 style={{color:"#a0c6db"}}>title</h2>
                <h5 style={{color:"#8a8787", fontWeight:"bold"}}>registration_number</h5>
                <hr style={{color:'#9ab7ff'}}/>
                <p>
                    <span>Price:</span>
                    <span>price</span>
                </p>
                <p>
                    <span>Type:</span>
                    <span>body_type</span>
                </p>
                <p>
                    <span>Type:</span>
                    <span>body_type</span>
                </p>
                <p>
                    <span>Type:</span>
                    <span>body_type</span>
                </p>
                <p>
                    <span>Type:</span>
                    <span>body_type</span>
                </p>
                <p>
                    <span>Total money for 30 days:</span>
                    <span>303000000</span>
                </p>
                {/*<button >Rent</button>*/}

                <button className="button-24" role="button">Delete</button>
                {/*{redirectRentCar && <Navigate to={redirectUrl} />}*/}

            </div>
        </div>
    );
};

export default CarCard;