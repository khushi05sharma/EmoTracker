import React from "react";
import "./DateInput.css";

const DateInput = ({ selectedDate, onDateChange }) => {
  const handleChange = (event) => {
    onDateChange(event.target.value); // Update the selected date
  };

  return (
    <div className="date-container">
      <input
        id="date-input"
        type="date"
        className="date-input"
        value={selectedDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateInput;
