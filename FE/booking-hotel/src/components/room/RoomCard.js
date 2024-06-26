import React from "react";
import { Card, CardHeader, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link
              to={`/detail/room/${room.id}`}
              className="btn btn-hotel btn-sm"
            >
              <Card.Img
                variant="top"
                src={`data:image/png;base64, ${room.photo}`}
                alt="Room Photo"
                style={{ width: "100p%", maxWidth: "200px", height: "auto" }}
                loading="lazy"
              ></Card.Img>
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Title className="room-price">{room.roomPrice}</Card.Title>
            <Card.Text>
              Dịch Vụ Phòng Với Chất Lượng Cao Và Thoải mái Cho khách Hàng
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Đặt Phòng
            </Link>

            <Link
              to={`/detail/room/${room.id}`}
              className="btn btn-hotel btn-sm mx-2"
            >
              Xem Chi Tiết Phòng
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
