import React, { useState, useEffect } from "react";
import "./dateRangeFilter.css";
import { TextField } from "@mui/material";

const DateRangeFilter = (props) => {
  const { dates, onDatesChange } = props;
  const [startDate, setStartDate] = useState(dates.start);
  const [endDate, setEndDate] = useState(dates.end);

  const validateDate = () => {
    const startingDate = new Date(startDate);
    const endingDate = new Date(endDate);
    return endingDate.getTime() < startingDate.getTime();
  };

  const handleDatesChange = async (e) => {
    if (e.target.name === "start-date") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  useEffect(() => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    if (eDate.getTime() >= sDate.getTime()) {
      onDatesChange(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="date-range-filter-container">
      <TextField
        id="from-date"
        type="date"
        name="start-date"
        value={startDate}
        error={validateDate()}
        defaultValue="2021-05-24"
        size="small"
        onChange={handleDatesChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            height: "30px",
            width: "120px",
            fontSize: "0.8em",
          },
        }}
      />
      <span>to</span>
      <TextField
        id="to-date"
        name="end-date"
        type="date"
        value={endDate}
        error={validateDate()}
        size="small"
        onChange={handleDatesChange}
        defaultValue="2021-05-30"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            height: "30px",
            width: "120px",
            fontSize: "0.8em",
          },
        }}
      />
    </div>
  );
};

export default DateRangeFilter;
