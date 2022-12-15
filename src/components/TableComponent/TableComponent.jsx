import React from "react";
import {
  getStringFromObject,
  isArrayValidAndNotEmpty,
  isObjectValidAndNotEmpty,
  makeCurrency,
  makeNumber,
  makePercentage,
} from "../../constants/utils";
import "./tableComponent.css";

const TableComponent = (props) => {
  const { schema, data, appData, hideColumns } = props;

  const getAppName = (appId) => {
    const requiredApp = appData.filter(
      (appDetails) => appDetails.app_id === appId
    );
    return requiredApp.app_name;
  };

  const textToDisplay = (column, data) => {
    let text = "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    text = getStringFromObject(column.find, data);
    switch (column.type) {
      case "date":
        text = new Date(text);
        text = text.toLocaleDateString("en-GB", options);
        break;

      case "number":
        text = makeNumber(text);
        break;

      case "app":
        const requiredApp = appData.filter((app) => app.app_id === data.app_id);
        if (isArrayValidAndNotEmpty(requiredApp)) {
          text = getStringFromObject("app_name", requiredApp[0]);
        }
        break;

      case "currency":
        text = makeCurrency(text);
        break;

      case "percentage":
        text = makePercentage(text);
        break;

      default:
        text = text;
    }
    return text;
  };

  return (
    <div className="table-container">
      <table className="table" cellSpacing="0">
        <thead>
          <tr>
            {isArrayValidAndNotEmpty(data) &&
              schema.map((column, index) => {
                if (isObjectValidAndNotEmpty(column)) {
                  if (
                    !hideColumns.some((hiddenIndex) => hiddenIndex === index)
                  ) {
                    return (
                      <th key={column.id} className={column.align}>
                        {column.label}
                      </th>
                    );
                  }
                }
              })}
          </tr>
        </thead>
        <tbody>
          {isArrayValidAndNotEmpty(data) &&
            data.map((row, rowIndex) => (
              <tr key={2 * rowIndex}>
                {schema.map((column, index) => {
                  if (isObjectValidAndNotEmpty(column)) {
                    if (
                      !hideColumns.some((hiddenIndex) => hiddenIndex === index)
                    ) {
                      return (
                        <td key={column.id} className={column.align}>
                          {textToDisplay(column, row)}
                        </td>
                      );
                    }
                  }
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
