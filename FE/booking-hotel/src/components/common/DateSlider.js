import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

export default function DateSlider({ onDateChange, onFilterChange }) {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const handleSelect = (range) => {
    setDateRange(range.selection);
    onDateChange(range.selection.startDate, range.selection.endDate);
    onFilterChange(range.selection.startDate, range.selection.endDate);
  };

  const handleClearFilter = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    onDateChange(null, null);
    onFilterChange(null, null);
  };
  return (
    <>
      <h5>Filter bookings by date</h5>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        className="mb-4"
      />
      <button onClick={handleClearFilter} className="btn btn-secondary">
        clear Filter
      </button>
    </>
  );
}
