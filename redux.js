import { configureStore } from "@reduxjs/toolkit";
import weatherSlice  from '../Redux/weatherSlice';

export const Store = configureStore({
    reducer:{
        weather: weatherSlice.reducer
    },
})
