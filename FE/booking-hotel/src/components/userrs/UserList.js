import React, { useEffect, useState } from "react";
import * as UserService from "../utils/ApiFuntion";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
export default function UserList() {
  const [users, setUsers] = useState([
    {
      email: "",
      firstName: "",
      lastName: "",
      roles: [
        {
          id: "",
          name: "",
        },
      ],
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filterEmail, setFilterEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setFilterEmail({ ...filterEmail, [name]: value });
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await UserService.getAllUser();
      console.log(result);
      setUsers(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateTotalPages = (filterds, PerPage, users) => {
    const totalUser = filterds.length > 0 ? filterds.length : users.length;
    return Math.ceil(totalUser / PerPage);
  };

  const handleDelete = async (userId) => {
    try {
      const result = await UserService.deleteUser(userId);
      if (result === "") {
        setSuccessMessage(`User No ${userId} was delete`);
        fetchUsers();
      } else {
        console.error(`Error deleting user:${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };
  return (
    <div className="container col-md-8 col-lg-6">
      {successMessage && (
        <p className="alert alert-success mt-5">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="alert alert-danger mt-5">{errorMessage}</p>
      )}

      {isLoading ? (
        <p>Loading user lists</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content between mb-3 mt-5">
              <h2>User List</h2>
            </div>
            <Row>
              <Col md={6} className="mb-3 mb-md-0"></Col>
            </Row>
          </section>
        </>
      )}
    </div>
  );
}
