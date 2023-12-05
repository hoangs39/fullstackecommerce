// src/components/LoginForm.js
import React, { useState } from "react";
import { login } from "../../../api/auth";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { setToken, setUser } from "../../../service/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPerson } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [userType, setUserType] = useState("customer");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginErr, setLoginError] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const userData = {
      username: account,
      password,
    };


    const res = await login(userType, userData);

    if (res && res?.token) {
      setToken(res.token);
      setUser(res.user);
      navigate("/");
      window.location.reload()
    }
    setLoginError(
      "Your name or password is invalid. Please double check them!"
    );
  };

  const handleUserTypeChange = (event) => {
    console.log(event.target.value);
    setUserType(event.target.value);
  };
  return (
    <>
      {loginErr !== "" && (
        <div className="text-center text-danger">{loginErr}</div>
      )}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mt-3 mb-3"
      >
        <Form.Group controlId="validationCustom01">
          <Form.Label>Your Role:</Form.Label>
          <Form.Select
            aria-label="Your Role:"
            required
            value={userType}
            onChange={handleUserTypeChange}
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="validationCustomUsername" className="mt-3 mb-3">
          <Form.Label>Phone or Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">
              <FontAwesomeIcon icon={faPerson} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Account"
              aria-describedby="inputGroupPrepend"
              required
              value={account}
              onChange={(event) => setAccount(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an Account's Name.
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mt-3 mb-3" style={{ color: "#049cb9" }}>
          <Form.Check
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

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
            Log In
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default LoginForm;
