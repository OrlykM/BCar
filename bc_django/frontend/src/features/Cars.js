import React from 'react';
import {createSlice} from '@reduxjs/toolkit';
import {CarsData} from '../carData'
 
export const carSlice = createSlice({
    name: "cars",
    initialState: {value: CarsData},
    reducers:{
        updateCarZoom: (state, action) =>{
             console.log("CAR update", action.payload);

            state.value.map((car) =>{
                if (car.car_id === action.payload.car_id)
                    car.isClicked = action.payload.isClicked;
            })
        }
    },
});

export const {updateCarZoom} = carSlice.actions;
export default carSlice.reducer;