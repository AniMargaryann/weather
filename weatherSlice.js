import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = 'YOUR_ACTUAL_API_KEY'; 

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  }
);

export const fetchFiveDayForecast = createAsyncThunk(
  'weather/fetchFiveDayForecast',
  async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,  
    forecast: null,       
    status: 'idle',
    error: null,
    unit: 'metric',
  },
  reducer: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
  },
  extraReducer: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFiveDayForecast.fulfilled, (state, action) => {
        state.forecast = action.payload;  
      });
  },
});

export const { toggleUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
