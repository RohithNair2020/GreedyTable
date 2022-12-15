import { createSlice } from "@reduxjs/toolkit";

export const analyticsSlice = createSlice({
  name: "analyticsData",
  initialState: {
    tableData: [],
    appData: [],
    inactiveCols: [],
  },
  reducers: {
    setTableData2: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    setAppData: (state, action) => {
      state.appData = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setInactiveCols: (state, action) => {
      state.inactiveCols = action.payload; //set the payload first and then send to redux
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTableData, setAppData } = analyticsSlice.actions;

export default analyticsSlice.reducer;
