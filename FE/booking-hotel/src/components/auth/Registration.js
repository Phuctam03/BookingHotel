import React, { useState } from "react";
import * as apiFunction from "../utils/ApiFuntion";

export default function Registration() {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegistration({ ...registration, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFunction.registration(registration);
      setSuccessMessage(data);
      setErrorMessage("");
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
  };

  setTimeout(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, 4000);

  return (
    <section className="container col mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div className="row mb-3">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            first name
          </label>
          <div>
            <input
              id="firstName"
              type="text"
              name="firstName"
              className="form-control"
              value={registration.firstName}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            last name
          </label>
          <div>
            <input
              id="lastName"
              type="text"
              name="lastName"
              className="form-control"
              value={registration.lastName}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              value={registration.email}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            password
          </label>
          <div>
            <input
              id="email"
              type="password"
              name="password"
              className="form-control"
              value={registration.password}
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{ marginRight: "10px" }}
          >
            register
          </button>
        </div>
      </form>
    </section>
  );
}
