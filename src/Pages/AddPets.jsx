import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addpets({ currentUser }) {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [namePets, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [hypo, setHypo] = useState("");
  const [breed, setBreed] = useState("");
  const [dietary, setDietary] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [biography, setbiography] = useState("");
  const [email, setEmail] = useState(currentUser.email);
  const [image, setImage] = useState();
  async function addPets() {
    try {
      const formData = new FormData();
      formData.append("image", image);
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

      const response = await axios.post(
        `http://localhost:3001/addpets`,

        formData,
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
      navigate("/home");
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
      <h1>Add pets</h1>
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
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Height</Form.Label>
            <Form.Control
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height"
              type="number"
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Weight</Form.Label>
            <Form.Control
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              placeholder="Weight"
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Color</Form.Label>
            <Form.Control
              onChange={(e) => setColor(e.target.value)}
              type="text"
              placeholder="Color"
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Breed</Form.Label>
            <Form.Control
              onChange={(e) => setBreed(e.target.value)}
              type="text"
              placeholder="Breed"
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
            <Form.Label className="mb-3">Type</Form.Label>
            <Form.Control
              onChange={(e) => setType(e.target.value)}
              type="text"
              placeholder="Type"
              required
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
          <Form.Group
            className="mb-3"
            md="4"
            as={Col}
            controlId="formGridEmail"
          >
            <Form.Label className="mb-3">Hypoallergenic</Form.Label>
            <Form.Select size="sm" onChange={(e) => setHypo(e.target.value)}>
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              <option>True</option>
              <option>False</option>
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
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" md="6" controlId="formGridName">
            <Form.Label>Biography</Form.Label>
            <Form.Control
              className="pb-5"
              onChange={(e) => setbiography(e.target.value)}
              placeholder="Text"
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" md="6" controlId="formGridName">
            <Form.Label>Dietary restriction</Form.Label>
            <Form.Control
              className="pb-5"
              onChange={(e) => setDietary(e.target.value)}
              placeholder="Text"
              required
            />
          </Form.Group>
          <></>
        </Row>
      </Form>
      <Button
        onClick={() => {
          addPets();
        }}
        variant="success"
      >
        Add Pet
      </Button>
    </div>
  );
}

export default Addpets;
