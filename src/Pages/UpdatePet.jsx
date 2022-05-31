import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdatePet({ currentUser, editPet }) {
  const navigate = useNavigate();
  const [type, setType] = useState(editPet.type);
  const [namePets, setName] = useState(editPet.namePets);
  const [height, setHeight] = useState(editPet.height);
  const [weight, setWeight] = useState(editPet.weight);
  const [color, setColor] = useState(editPet.color);
  const [hypo, setHypo] = useState(editPet.hypo);
  const [breed, setBreed] = useState(editPet.breed);
  const [dietary, setDietary] = useState(editPet.dietary);
  const [adoptionStatus, setAdoptionStatus] = useState(editPet.adoptionStatus);
  const [biography, setbiography] = useState(editPet.biography);
  const [petsId, setpetsId] = useState(editPet.petsId);
  const [email, setEmail] = useState(currentUser.email);
  const [image, setImage] = useState(editPet.image);

  async function updatePet() {
    try {
      const formData = new FormData();

      formData.append("type", type);
      formData.append("namePets", namePets);
      formData.append("height", height);
      formData.append("weight", weight);
      formData.append("color", color);
      formData.append("hypo", hypo);
      formData.append("breed", breed);
      formData.append("dietary", dietary);
      formData.append("adoptionStatus", adoptionStatus);
      formData.append("biography", biography);
      formData.append("email", email);
      formData.append("image", image);
      formData.append("petsId", petsId);

      const response = await axios.put(
        `http://localhost:3001/updatepet/${editPet.petsId}`,
        formData
      );

      alert(response.data.message);
      setType("");
      setName("");
      setHeight("");
      setWeight("");
      setColor("");
      setHypo("");
      setBreed("");
      setDietary("");
      setAdoptionStatus("");
      setbiography("");
      navigate("/");
    } catch (err) {
      if (err.response.data[0]) {
        alert(
          `${err.response.data[0].instancePath} ${err.response.data[0].message}`
        );
      } else {
        alert(err.response.data.message);
      }
    }
  }

  return (
    <div className="container">
      <h1>Update pet</h1>
      <Form className="m-5">
        <Row>
          <Form.Group
            as={Col}
            className="mb-3"
            md="4"
            controlId="formGridName"
            required
          >
            <Form.Label className="mb-3">Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              defaultValue={editPet.namePets}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Height</Form.Label>
            <Form.Control
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height"
              type="number"
              required
              defaultValue={editPet.height}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Weight</Form.Label>
            <Form.Control
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              placeholder="Weight"
              required
              defaultValue={editPet.weight}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Color</Form.Label>
            <Form.Control
              onChange={(e) => setColor(e.target.value)}
              type="text"
              placeholder="Color"
              required
              defaultValue={editPet.color}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Breed</Form.Label>
            <Form.Control
              onChange={(e) => setBreed(e.target.value)}
              type="text"
              placeholder="Breed"
              required
              defaultValue={editPet.breed}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Type</Form.Label>
            <Form.Control
              onChange={(e) => setType(e.target.value)}
              type="text"
              placeholder="Type"
              required
              defaultValue={editPet.type}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            className="mb-3"
            md="4"
            as={Col}
            controlId="formGridEmail"
          >
            <Form.Label className="mb-3">Adoption Status</Form.Label>
            <Form.Select
              size="sm"
              onChange={(e) => setAdoptionStatus(e.target.value)}
              defaultValue={editPet.adoptionStatus}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              <option>Adopted</option>
              <option>Forester</option>
              <option>Avaiable</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3" as={Col} md="4">
            <Form.Label className="mb-3">Picture</Form.Label>
            <Form.Control
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              accept="image/jpg,image/png,image/jif,image/jpeg"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            md="4"
            as={Col}
            controlId="formGridEmail"
          >
            <Form.Label className="mb-3">Hypoallergenic</Form.Label>
            <Form.Select
              size="sm"
              onChange={(e) => setHypo(e.target.value)}
              defaultValue={editPet.hypo}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              <option>True</option>
              <option>False</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" md="6" controlId="formGridName">
            <Form.Label>Biography</Form.Label>
            <Form.Control
              className="pb-5"
              onChange={(e) => setbiography(e.target.value)}
              placeholder="Text"
              required
              defaultValue={editPet.biography}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="6" controlId="formGridName">
            <Form.Label>Dietary restriction</Form.Label>
            <Form.Control
              className="pb-5"
              onChange={(e) => setDietary(e.target.value)}
              placeholder="Text"
              required
              defaultValue={editPet.dietary}
            />
          </Form.Group>

          <Card.Img variant="top" src={editPet.image} className="image" />
          <></>
        </Row>
      </Form>
      <Button
        onClick={() => {
          updatePet();
        }}
        variant="success"
      >
        Update pet
      </Button>
    </div>
  );
}

export default UpdatePet;