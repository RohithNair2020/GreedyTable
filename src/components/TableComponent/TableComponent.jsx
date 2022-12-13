import React from "react";
import { isArrayValidAndNotEmpty } from "../../constants/utils";
import styles from "./tableComponent.module.css";

const TableComponent = (props) => {
  const { data } = props;
  return (
    <div className={styles.table}>
      <table>
        <tr>
          {isArrayValidAndNotEmpty(data) &&
            Object.keys(data[0]).map((title) => <th>{title}</th>)}
        </tr>
        {isArrayValidAndNotEmpty(data) &&
          data.map((row) => (
            <tr>
              {Object.values(row).map((cell) => (
                <td>{cell}</td>
              ))}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default TableComponent;
