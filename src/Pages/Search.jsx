import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import ButtonsForStatus from "../Components/ButtonsForStatus";


function Search({ isAuth, currentUser, setPet }) {

  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchHeigth, setSearchHeigth] = useState("");
  const [searchWeigth, setSearchWeigth] = useState("");
  const [searchAdoptionStatus, setSearchAdoptionStatus] = useState("");
  const [advancedSearch, setAdvancendSearch] = useState();
  const [allPets, setAllPets] = useState([]);
  const [email, setEmail] = useState(currentUser.email);
  const [savedPets, setSavedPets] = useState([]);
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();

  function showMore(pet) {
    setPet(pet);
    navigate("/showpet");

  }

  const handleSearch = () => {
    axios
      .get("http://localhost:3001/searchpet", {
        params: {
          searchType,
          searchName,
          searchHeigth,
          searchWeigth,
          searchAdoptionStatus,
        },
      })
      .then((res) => setAllPets([...res.data]))
      .catch((error) => {
        alert(error.response.data.message);
        setAllPets([]);
      });
  };

 
  return (
    <div className="container">
      <Form className="mb-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            onChange={(e) => setSearchType(e.target.value)}
          />
        </Form.Group>
        {advancedSearch ? (
          <>
            <Row>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBaspicPassword"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasjicPassword"
              >
                <Form.Label>Adoption Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adoption Status"
                  onChange={(e) => setSearchAdoptionStatus(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicPasosword"
              >
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Height"
                  onChange={(e) => setSearchHeigth(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBaskicPasswordk"
                as={Col}
              >
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Weight"
                  onChange={(e) => setSearchWeigth(e.target.value)}
                />
              </Form.Group>
            </Row>
          </>
        ) : (
          ""
        )}
        <Button
          className="mb-3"
          variant="primary"
          type="Button"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Advanced"
            onChange={(e) => setAdvancendSearch(e.target.checked)}
          />
        </Form.Group>
      </Form>
      <div className="petscontainer">
        {allPets &&
          allPets.map((pet, index) => {
            return (
              <div key={index}>
                <div class="main-cont">
                  <div class="card">
                    <img src={pet.image} />
                    <div class="descp">
                      <h4>
                        <strong>Name:</strong> {pet.namePets}
                      </h4>
                      <h4>
                        <strong>Type:</strong> {pet.type}
                      </h4>
                      <h4>
                        <strong>Height:</strong> {pet.height}
                      </h4>
                      <h4>
                        <strong>Weight:</strong> {pet.weight}
                      </h4>
                      <h4>
                        <strong>Status:</strong> {pet.adoptionStatus}
                      </h4>
                    </div>
                    <div class="social">
                      <Button
                        onClick={() => showMore(pet)}
                        variant="primary"
                        size="sm"
                        pet={pet}
                        isAuth={isAuth}
                        currentUser={currentUser}
                      >Show More</Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Search;