import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
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

  const images = [
    "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
    "https://img.freepik.com/free-photo/beautiful-silhouette-palm-tree-with-umbrella-chair_74190-2099.jpg?w=360",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf7SDYpiNXfebX1h2_wNgCYAXh-wig0E7FQ9nFMrsNWDvfel-Id_D4WMPMDqtw3ZpGv6E&usqp=CAU",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='login-container'>
      <div className='image-container'>
        {images.map((imageUrl, index) => (
          <img
            src={imageUrl}
            alt={`Image ${index}`}
            className={activeImageIndex === index ? "active" : ""}
            key={index}
          />
        ))}
      </div>
      <div className='form-container'>
        <h1>Sign In</h1>
        {error && <Alert variant='danger'>{error}</Alert>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label className='form-label'>
              <IoMailOutline className='form-icon' /> Email Address
            </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label className='form-label'>
              <IoLockClosedOutline className='form-icon' /> Password
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='login-button'
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New User?{" "}
            <Link to='/register' className='register-link'>
              Register
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
