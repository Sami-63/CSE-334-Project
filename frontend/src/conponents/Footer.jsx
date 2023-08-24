import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className='bg-dark text-light py-4'>
      <Container>
        <Row>
          <Col md={4} className='mb-4'>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              cursus lectus in ex hendrerit, sit amet ultrices leo tempus.
            </p>
          </Col>
          <Col md={4} className='mb-4'>
            <h5>Contact Us</h5>
            <ul className='list-unstyled'>
              <li>Email: info@company.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </Col>
          <Col md={4} className='mb-4'>
            <h5>Follow Us</h5>
            <ul className='list-inline'>
              <li className='list-inline-item'>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  Facebook
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  Twitter
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='text-center'>
            <p className='m-0'>
              &copy; {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
