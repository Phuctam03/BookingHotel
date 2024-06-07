import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

export default function HotelService() {
  return (
    <>
      <Container className="mb-2">
        <Header er title={"Our Services"} />
        <Row>
          <h4 className="text-center">
            Phục Vụ tại <span className="hotel-color">LakeSide -</span> Hotel
            <span className="gap-2"></span>
            <FaClock /> -Lễ Tân - 24 giờ
          </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi />
                  Wifi
                </Card.Title>
                <Card.Text>Kết nối với truy cập mạng cao</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils />
                  Bữa sáng
                </Card.Title>
                <Card.Text>Chất lượng đảm bảo</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt />
                  Giặt là
                </Card.Title>
                <Card.Text>
                  Giữ cho quần áo của bạn thật thoải mái và sách sẽ .
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail />
                  Mini-bar
                </Card.Title>
                <Card.Text>
                  Sự Thoải mái và tận hưởng khi đến Bar-Corse
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking />
                  Bẫy đỗ xe
                </Card.Title>
                <Card.Text>
                  Xe của bạn sẽ có chỗ để tiện lợi và an toàn
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake />
                  Điều hòa
                </Card.Title>
                <Card.Text>
                  Thoải mái với máy lạnh tại khách sạn chúng tôi
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
