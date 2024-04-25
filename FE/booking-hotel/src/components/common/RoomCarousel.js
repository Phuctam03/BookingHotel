import React, { useEffect, useState } from "react";
import * as ApiFunction from "../utils/ApiFuntion";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

export default function RoomCarousel() {
  const [rooms, setRooms] = useState([
    { id: "", roomType: "", roomPrice: "", photo: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ApiFunction.getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.errorMessage);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div clasName="mt-5">Loading room....</div>;
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error:{errorMessage}</div>;
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to={"/browse-all-rooms"} className="hotel-color text-center">
        Browse all rooms
      </Link>

      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, i) => (
            <Carousel.Item key={i}>
              <Row>
                {rooms.slice(i * 4, i * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link
                        to={`/book-room/${room.id}`}
                        className="btn btn-hotel btn-sm"
                      >
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt="Room photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        ></Card.Img>
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className="hotel-color">
                          {room.roomPrice}/night
                        </Card.Title>
                        <div className="flex-shrink-0">
                          <Link
                            to={`/book-room/${room.id}`}
                            className="btn btn-hotel btn-sm"
                          >
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
