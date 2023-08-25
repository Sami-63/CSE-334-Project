import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FacilityCard = ({ facility }) => {
  return (
    <Col md={4} key={facility.id} style={{ marginBottom: "40px" }}>
      <Card style={{ height: "100%" }}>
        <Card.Img
          variant='top'
          src={facility.imgUrl}
          style={{ objectFit: "cover", height: "200px" }} // Adjust the height as needed
        />
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          <Card.Title>{facility.title}</Card.Title>
          <Card.Text style={{ flex: "1", overflow: "hidden" }}>
            {facility.description}
          </Card.Text>
          <div className='mt-auto'>
            <Link
              to={`/facility/${facility.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button variant='primary'>View Details</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FacilityCard;
