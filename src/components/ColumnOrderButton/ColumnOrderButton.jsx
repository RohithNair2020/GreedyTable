import React, { useState } from "react";
import "./columnOrderButton.css";

const ColumnOrderButton = (props) => {
  const { column, index, canHide, onColumnsEdit } = props;
  const [active, setActive] = useState(true);

  const handleClick = () => {
    if (canHide) {
      onColumnsEdit(index, active);
      setActive((prevState) => !prevState);
    }
  };

  return (
    <button
      className={`column-order-btn ${
        active && canHide ? "active" : "inactive"
      }`}
      onClick={handleClick}
    >
      {column.label}
    </button>
  );
};

export default ColumnOrderButton;
