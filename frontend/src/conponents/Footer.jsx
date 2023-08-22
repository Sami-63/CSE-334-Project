import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className='bg-dark text-light'>
      <Container className='text-center'>
        <p className='m-0'>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
