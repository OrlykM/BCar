import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { CarsData } from "../carData";

export const carSlice = createSlice({
  name: "cars",
  initialState: { value: CarsData },
  reducers: {
    addCarZoom: (state, action) => {
        console.log("CAR add", action.payload);
        state.value.push(action.payload);
    },
    updateCarZoom: (state, action) => {
      console.log("CAR update", action.payload);

      state.value.map((car) => {
        if (car.car_id === action.payload.car_id)
          car.isClicked = action.payload.isClicked;
      });
    },
  },
});

export const { addCarZoom, updateCarZoom } = carSlice.actions;
export default carSlice.reducer;
