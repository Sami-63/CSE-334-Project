import { Alert, Button, Col, Form, Row } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../conponents/FormContainer";
import { useEffect, useState } from "react";

import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const submitHandler = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <FormContainer>
      <h1 className='text-center'>Sign In</h1>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          disabled={isLoading}
          className='my-3'
        >
          Sign In
        </Button>
      </Form>

      <Row>
        <Col>
          New User? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
