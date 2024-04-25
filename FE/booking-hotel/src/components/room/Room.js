import React, { useEffect, useState } from "react";
import * as ApiFunction from "../utils/ApiFuntion";
import RoomCard from "./RoomCard";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { Container } from "react-bootstrap";

export default function Room() {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filterData, setFilteredData] = useState([{ id: "" }]);

  useEffect(() => {
    setIsLoading(true);
    ApiFunction.getAllRooms()
      .then((data) => {
        setDatas(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handlePageChange = (PageNumber) => {
    setCurrentPage(PageNumber);
  };

  const totalPage = Math.ceil(filterData.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filterData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />); // co van de
  };

  if (isLoading) {
    return <div>Loading room</div>;
  }
  if (error) {
    return <div className="text-danger">Error : {error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter
            data={datas}
            setFilteredData={setFilteredData}
          ></RoomFilter>
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          ></RoomPaginator>
        </Col>
      </Row>
      <Row>{renderRooms()}</Row>

      <Row>
        <Col md={6} className="d-flex align-items-center justify-content">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          ></RoomPaginator>
        </Col>
      </Row>
    </Container>
  );
}
