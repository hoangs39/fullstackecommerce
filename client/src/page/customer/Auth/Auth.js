// src/components/AuthPage.js
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
// import RegistrationForm from "./RegistrationForm";
import Register from "./Register";
import { useNavigate } from "react-router";
import { isLoggedIn } from "../../../service/authService";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

const Auth = () => {
  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();
  const handleFormChange = (formType) => {
    setActiveForm(formType);
  };
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  });

  return (
    <div className="container-fluid p-0">
      <div
        className="row justify-content-center align-items-center g-0 p-0"
        style={{ backgroundColor: "#dee3e0", minHeight: "80vh" }}
      >
        <div className="col-md-7 rounded-3 p-0" >
          <Card>
            <Card.Header className="text-center p-0">
              <Nav justify variant="tabs" className="text-center w-100 m-0">
                <Nav.Item>
                  <Nav.Link
                    className={` ${activeForm === "login" ? "active" : ""}`}
                    onClick={() => handleFormChange("login")}
                    style={{
                      fontSize: "32px",
                      color: "#333",
                      fontWeight: "bold",
                      paddingBottom: "10px",
                    }}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={`${
                      activeForm === "registration" ? "active" : ""
                    }`}
                    onClick={() => handleFormChange("registration")}
                    style={{
                      fontSize: "32px",
                      color: "#333",
                      fontWeight: "bold",
                      paddingBottom: "10px",
                    }}
                  >
                    Register
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              {activeForm === "login" && <LoginForm />}
              {activeForm === "registration" && <Register />}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
