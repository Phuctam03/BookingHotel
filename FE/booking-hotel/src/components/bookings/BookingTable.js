import React, { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import DateSlider from "../common/DateSlider";

export default function BookingTable({ bookinginfo, handleBookingCanllation }) {
  const [filteredBooking, setFilteredBooking] = useState(bookinginfo);

  const filterBooking = (startDate, endDate) => {
    let filtered = bookinginfo;
    if (startDate && endDate) {
      filtered = bookinginfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);

        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBooking(filtered);
  };

  useEffect(() => {
    setFilteredBooking(bookinginfo);
  }, [bookinginfo]);

  return (
    <section className="p-4">
      <DateSlider onDateChange={filterBooking} onFilterChange={filterBooking} />
      <table className="table table-bordered table-hover-shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guest </th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBooking.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.id}</td>
              <td>{booking.room.id}</td>
              <td>{booking.room.roomType}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.guestName}</td>
              <td>{booking.guestEmail}</td>
              <td>{booking.numberOfAdults}</td>
              <td>{booking.numberOfChildren}</td>
              <td>{booking.totalNumberOfGuest}</td>
              <td>{booking.bookingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCanllation(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filterBooking.length === 0 && <p>No booking found for the selected</p>}
    </section>
  );
}
