import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import SettingsComponent from "../settingsComponent/SettingsComponent";
import TableComponent from "../TableComponent/TableComponent";
import styles from "./analyticsBoard.module.css";

const AnalyticsBoard = () => {
  const [tableData, setTableData] = useState([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await axios.get(
        "http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03"
      );
      setTableData(fetchedData.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const toggleSettings = () => {
    setSettingsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(tableData);

  return (
    <div className={styles.analyticsBoardContainer}>
      <h2>Analytics</h2>
      <input type="date" />
      <button onClick={toggleSettings}>Settings</button>
      {settingsOpen ? <SettingsComponent></SettingsComponent> : null}
      <TableComponent data={tableData} />
    </div>
  );
};

export default AnalyticsBoard;
