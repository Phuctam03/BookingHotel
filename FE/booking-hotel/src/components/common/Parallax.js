import React from "react";
import { Container } from "react-bootstrap";

export default function Parallax() {
  return (
    <div className="parallax mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <div className="animated-texts bounceIn">
          <h1>
            Chào Mừng đến với{" "}
            <span className="hotel-color">LakeSide Hotel</span>
          </h1>
          <h3>Chúng tôi sẽ phục vụ tất cả những thứ tốt nhất bạn cần</h3>
        </div>
      </Container>
    </div>
  );
}
