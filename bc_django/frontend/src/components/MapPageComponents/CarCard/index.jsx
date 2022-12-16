import "./CarCard.css";
import React, { useState, setState } from "react";
import { Navigate } from "react-router-dom";

import { addCarZoom, updateCarZoom } from "../../../features/Cars";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import test from "../../../assets/img/p4.jpg";
import test_1 from "../../../assets/img/p2.jpg";
import test_2 from "../../../assets/img/p3.jpg";
import test_5 from "../../../assets/img/1234.jpeg";
import test_6 from "../../../assets/img/commercial.png";

const CarCard = ({
  car_id,
  title,
  variant,
  price,
  registration_number,
  body_type,
  latitude,
  longitude,
}) => {
  //chage it
  let image = "";
  if (variant == "standard") image = test_5;
  else if (variant == "premium") image = test_5;
  else image = test_6;

  const [redirectRentCar, setRedirectRentCar] = useState(false);

  const dispatch = useDispatch();

  const handleForSubmit = (event) => {
    event.preventDefault();
    setRedirectRentCar(true);
  };

  const HandleOnSetView = (props) => {
    console.log(props.car_id, props.latitude, props.longitude);
    console.log("car_data", props);
    dispatch(
      addCarZoom({
        car_id: props.car_id,
        make_model: props.title,
        price_per_min: props.price,
        registration_number: props.registration_number,
        latitude: props.latitude,
        longitude: props.longitude,
        isClicked: true
      })
    );
    // dispatch(updateCarZoom({ car_id: props.car_id, isClicked: true }));
  };

  let redirectUrl = "/car/" + car_id + "/rent";

  return (
    <div className="carCard">
      <div className="carCard__img">
        <img
          src={image}
          alt=""
          onClick={() => {
            HandleOnSetView({
              car_id,
              title,
              variant,
              price,
              registration_number,
              latitude,
              longitude,
            });
          }}
        />
      </div>
      <div className="carCard__desc">
        <div className="carCard__info">
          <h2>{title}</h2>
          <p>
            {variant} <br />
            <span> {body_type} </span> <br />
            {price}
          </p>
        </div>
        <button onClick={handleForSubmit}>Орендувати</button>
        {redirectRentCar && <Navigate to={redirectUrl} />}
      </div>
    </div>
  );
};

export { CarCard };
