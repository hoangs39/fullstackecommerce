import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  isLoggedIn,
  logout,
  getUsers,
  getRole,
} from "../../service/authService";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faHome,
  faHomeUser,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleSearchName, setShowCart }) => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");

  return (
    <Navbar bg="light" expand="sm" className="p-0 m-0 mt-1">
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex flex-row justify-content-end"
      >
        <Nav className="mx-5">
          <Nav.Link
            to="/"
            className="mx-5"
            onClick={() => {
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faHome} className="mx-1" />
            Home
          </Nav.Link>
        </Nav>
        <div className=" d-flex" style={{ marginRight: "10rem" }}>
          <input
            placeholder="Search in Lazada"
            className="mr-sm-2 p-3"
            style={{
              border: "0.1px solid #000",
              borderTopLeftRadius: "5px",
              borderStartEndRadius: "5px",
              width: "40rem",
            }}
            onChange={(e) => setSearchName(e.target.value)}
          ></input>
          <button
            className="p-3 text-white bg-warning "
            style={{
              border: "none",
              borderTopRightRadius: "5px",
              borderEndEndRadius: "5px",
            }}
            onClick={() => {
              handleSearchName(searchName);
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <Nav style={{ marginRight: "10rem" }}>
          {getRole() === "customer" && (
            <>
              <Nav.Link>
                <Link to="/cus/order">Order Management</Link>
              </Nav.Link>
            </>
          )}
          <div className="rounded-3 mx-2" onClick={() => setShowCart(true)}>
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
          </div>
          {isLoggedIn() && (
            <NavDropdown title="Account" id="account-dropdown" className="mx-1">
              <NavDropdown.Item
                onClick={() => {
                  logout();
                  navigate("/");
                  window.location.reload();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {!isLoggedIn() && (
            <Nav.Link className="mx-1">
              <Link
                to="/auth"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <FontAwesomeIcon icon={faLock} className="mx-1" />
                Login
              </Link>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
