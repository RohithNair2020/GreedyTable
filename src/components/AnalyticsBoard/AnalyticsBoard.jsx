import React, { useEffect, useState, useCallback } from "react";
import "./analyticsBoard.css";
import SettingsComponent from "../SettingsComponent/SettingsComponent";
import TableComponent from "../TableComponent/TableComponent";
import axios from "axios";
import TuneIcon from "@mui/icons-material/Tune";
import { Collapse } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppData, setTableData } from "./analyticsSlice";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const AnalyticsBoard = () => {
  //redux
  const analyticsData = useSelector((state) => state.analyticsData);
  const tableData = analyticsData.tableData;
  const appData = analyticsData.appData;
  const dispatch = useDispatch();

  const [schema, setSchema] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const fetchAnalyticsSchema = useCallback(async () => {
    try {
      const fetchedSchema = await axios.get("/analyticsSchema.json");
      setSchema(fetchedSchema.data.tableCells);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await axios.get(
        "https://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03"
      );
      const rows = fetchedData.data.data;
      rows.map((row) => {
        row.fill_rate = row.requests / row.responses;
        row.ctr = row.clicks / row.impressions;
      });
      dispatch(setTableData(rows));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSchemaChange = (newSchema) => {
    setSchema(newSchema);
  };

  const handleColumnsEdit = (index, active) => {
    let newHiddenColumns = [...hiddenColumns];
    if (active) {
      newHiddenColumns.push(index);
    } else {
      newHiddenColumns.pop(index);
    }
    setHiddenColumns(newHiddenColumns);
  };

  const fetchAppData = useCallback(async () => {
    try {
      const fetchedAppData = await axios.get(
        "https://go-dev.greedygame.com/v3/dummy/apps"
      );
      const appData = fetchedAppData.data.data;
      dispatch(setAppData(appData));
    } catch (err) {
      console.log(err);
    }
  });

  const toggleSettings = () => {
    setSettingsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchAnalyticsSchema();
    fetchAppData();
    fetchData();
  }, []);
  return (
    <div className="analytics-container glass">
      <header>
        <h4>Analytics</h4>
      </header>
      <div className="date-and-settings">
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
        <DateRangePicker
          calendars={1}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
        </LocalizationProvider> */}
        {/* <input type="date" /> */}
        <button className="settings-btn" onClick={toggleSettings}>
          <TuneIcon></TuneIcon>
          Settings
        </button>
      </div>
      <Collapse in={settingsOpen}>
        <SettingsComponent
          columns={schema}
          onSchemaChange={handleSchemaChange}
          onColumnsEdit={handleColumnsEdit}
        />
      </Collapse>
      <TableComponent
        schema={schema}
        data={tableData}
        appData={appData}
        hideColumns={hiddenColumns}
      />
      {/* <p>add redux</p>
      <p>add no data found</p>
      <p>add date filtering</p>
      <p>add filters</p>
      <p>add sorting</p> */}
    </div>
  );
};

export default AnalyticsBoard;
