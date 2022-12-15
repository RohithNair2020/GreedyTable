// import { createStore } from 'redux'; //without redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "../components/AnalyticsBoard/analyticsSlice";

export default configureStore({
  reducer: {
    analyticsData: analyticsReducer,
  },
});
