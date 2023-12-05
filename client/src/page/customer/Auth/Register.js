// src/components/RegistrationForm.js
import React, { useState } from "react";
import { register } from "../../../api/auth";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("customer"); // Default to customer registration
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUserTypeChange = (event) => {
    console.log(event.target.value);
    setUserType(event.target.value);
  };
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const userData = {
      userType,
      email,
      phone,
      password,
      address,
      businessName,
    };
    register(userType, userData);
    // uploadRFile(email);

    setMsg("Congratulation!, You just successfully created a new account!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mt-3 mb-3"
      >
        {msg && <div className="text-success text-center">{msg}</div>}

        <Form.Group controlId="validationCustom01">
          <Form.Label>User type:</Form.Label>
          <Form.Select
            aria-label="User's type:"
            required
            value={userType}
            onChange={handleUserTypeChange}
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </Form.Select>
        </Form.Group>
        {userType === "seller" && (
          <Form.Group
            controlId="validationCustomUsername"
            className="mt-3 mb-3"
          >
            <Form.Label>Business Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Business Name"
                required
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a Business Name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        )}

        <Form.Group controlId="validationCustomUsername" className="mt-3 mb-3">
          <Form.Label>Email </Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">
              <FontAwesomeIcon icon={faPerson} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              required
              aria-describedby="inputGroupPrepend"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an Email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="validationCustomUsername" className="mt-3 mb-3">
          <Form.Label>Phone</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Phone"
              value={phone}
              required
              onChange={(event) => setPhone(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an phone number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="validationCustomUsername" className="mt-3 mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text
              id="inputGroupPrepend"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </InputGroup.Text>
            <Form.Control
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              aria-describedby="inputGroupPrepend"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {userType === "customer" && (
          <Form.Group
            controlId="validationCustomUsername"
            className="mt-3 mb-3"
          >
            <Form.Label>Address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Addresss"
                value={address}
                required
                onChange={(event) => setAddress(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter an Address.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        )}

        <Row className="justify-content-center">
          <Button
            type="submit"
            style={{
              backgroundColor: "#d0611e",
              color: "#fff",
              borderColor: "transparent",
              margin: "1.5rem 0.5rem auto",
              height: "48px",
              lineHeight: "46px",
              padding: "0 50px",
              fontSize: "1rem",
              borderWidth: "1px",
              width: "50%",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            SIGnup
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default Register;
