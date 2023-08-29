import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { LinkContainer } from "react-router-bootstrap";
import "./Description.css";

const Description = () => {
  const { user } = useAuthContext();

  return (
    <section className='description-section bg-light py-5'>
      <Container>
        <Row className='align-items-center'>
          <Col md={6} className='mb-4'>
            <h2 className='mb-3 font-weight-bold'>Welcome to Our Hotel</h2>
            <p className='mb-4'>
              Welcome to our prestigious hotel, where luxury and comfort meet.
              With a renowned reputation and impeccable service, we provide an
              unforgettable stay. Our elegant rooms, attentive staff, exquisite
              dining, spa, and modern facilities ensure a memorable experience,
              whether for business or leisure.
            </p>
            {!user && (
  <LinkContainer to='/register'>
    <a style={{ fontSize: '48px' }}>Get Started &raquo;</a>
  </LinkContainer>
)}
          </Col>
          <Col md={6} className='text-center'>
            <img
              src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/8e/c3/fb/vous-cherchez-des-infos.jpg?w=700&h=-1&s=1'
              alt='Hotel'
              className='img-fluid rounded'
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Description;
