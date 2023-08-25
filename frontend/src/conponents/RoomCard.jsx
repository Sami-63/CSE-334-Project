import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Col md={4} key={room.id} style={{ marginBottom: "40px" }}>
      <Card style={{ height: "100%" }}>
        <Card.Img
          variant='top'
          src={room.imgUrl}
          style={{ objectFit: "cover", height: "200px" }} // Adjust the height as needed
        />
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          <Card.Title>{room.title}</Card.Title>
          <Card.Text style={{ flex: "1", overflow: "hidden" }}>
            {room.description}
          </Card.Text>
          <div className='mt-auto'>
            <Link to={`/room/${room.id}`} style={{ textDecoration: "none" }}>
              <Button variant='primary'>View Details</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
