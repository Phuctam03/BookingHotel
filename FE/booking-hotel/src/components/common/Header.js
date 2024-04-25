import React from "react";

export default function Header({ title }) {
  return (
    <header className="header">
      <div className="overlay"></div>
      <div className="container">
        <h1 className="header-title text-center">{title}</h1>
      </div>
    </header>
  );
}
