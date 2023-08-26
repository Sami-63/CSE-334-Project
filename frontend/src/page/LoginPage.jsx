import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { HiOutlineMail, HiOutlineLock } from "react-icons/hi";
import React, { useEffect } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="email">
        <Form.Label className="form-label">
          <HiOutlineMail className="form-icon" /> Email Address
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label className="form-label">
          <HiOutlineLock className="form-icon" /> Password
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </Form.Group>

      <Row className="py-3">
        <Col>
          New User?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
