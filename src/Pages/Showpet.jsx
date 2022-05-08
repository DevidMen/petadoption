import React from "react";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
function GetPets({ setPet, pet }) {
  useEffect(() => {
    async function showPets() {
      try {
        const response = await axios.get(
          `http://localhost:3001/showpet/${pet.petsId}`
        );

        setPet({ ...response.data.result[0] });
      } catch (e) {
        alert(e.response.data.message);
      }
    }
    showPets();
  }, []);

  return (
    <div className="container">
      <div className="petscontainer">
        <ListGroup horizontal>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={pet.image} className="image" />
            <Card.Body>
              <Card.Title><strong>Name:</strong> {pet.namePets}</Card.Title>
              <Card.Text><strong>Biography:</strong> {pet.biography}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <strong>Type:</strong> {pet.type}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Dietary Restriction:</strong> {pet.dietary}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Breed:</strong> {pet.breed}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Height:</strong> {pet.height}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Wheight:</strong> {pet.weight}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Hypoallergenic?:</strong> {pet.hypo}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Color:</strong> {pet.color}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Adoption Status:</strong> {pet.adoptionStatus}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </ListGroup>
      </div>
    </div>
  );
}

export default GetPets;
