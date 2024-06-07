import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as ApiFunction from "../utils/ApiFuntion";
import { Container, Card, Col, Row } from "react-bootstrap";
import {
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

export default function DetailRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const [detailRoom, setDetailRoom] = useState({
    id: 0,
    roomPrice: "",
    roomType: "",
    photo: null,
  });
  const { roomId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    ApiFunction.getRoomById(roomId)
      .then((res) => {
        setIsLoading(false);
        setDetailRoom(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [roomId]);

  return (
    <>
      {isLoading ? (
        <p>Loading room detail....</p>
      ) : (
        <div>
          <div className="header-detail">
            <img
              src={`data:image/png;base64,${detailRoom.photo}`}
              className="detail-photo"
              alt="Room photo"
              loading="lazy"
            />
            <h2 className="detail-title">Detail Room</h2>
          </div>

          <div className="body-detail">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Loại Phòng:</th>
                  <th>{detailRoom.roomType}</th>
                </tr>
                <tr>
                  <th>Giá Phòng:</th>
                  <th>${detailRoom.roomPrice}</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="service-detail">
            <Container className="mb-2">
              <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="hotel-color">
                        <FaWifi />
                        Wifi
                      </Card.Title>
                      <Card.Text>Giữ Kết nối với truy cập cao nhất</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="hotel-color">
                        <FaUtensils />
                        Bữa Sáng
                      </Card.Title>
                      <Card.Text>Chất Lượng </Card.Text>
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
                        Giữ quần áo luôn sách sẽ và thoải mái
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
                      <Card.Text>Quán Rượu đêm cho các khách hàng</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="hotel-color">
                        <FaParking />
                        Đỗ Xe
                      </Card.Title>
                      <Card.Text>
                        Xe của bạn sẽ được an toàn và giữ sạch sẽ
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="hotel-color">
                        <FaSnowflake />
                        Điều hóa
                      </Card.Title>
                      <Card.Text>Thoải mái và mát lạnh</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <hr />

          <div className="footer-detail">
            <p className="text">Cảm ơn bạn đã ghé thăm lakeside-hotel</p>
            <Link
              to={`/book-room/${detailRoom.id}`}
              className="btn btn-detail btn-sm"
            >
              Đặt Phòng
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
