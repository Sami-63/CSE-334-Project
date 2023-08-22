import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Col md={4} key={room.id} style={{ marginBottom: "40px" }}>
      <Card style={{ height: "100%" }}>
        <Card.Img variant='top' src={room.imgUrl} />
        <Card.Body>
          <Card.Title>{room.title}</Card.Title>
          <Card.Text style={{ maxHeight: "100px", overflow: "hidden" }}>
            {room.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer className='text-center'>
          <Link to={`/room/${room.id}`}>
            <Button variant='primary'>View Details</Button>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default RoomCard;
