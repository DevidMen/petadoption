import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  ListGroupItem,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { nanoid } from "nanoid";
import ModalShowpet from "../Components/ModalShowpet";
import { useNavigate } from "react-router-dom";

function Search({ isAuth, currentUser, setPet }) {
  const [modalShow, setModalShow] = useState(false);
  const [modalopen, setmodalopen] = useState(false);
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
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3001/pets/user/${currentUser.email}`)
      .then((res) => {
        setSavedPets([...res.data.savedPetResult]);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, [status]);

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

  async function adoptIt(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/adopt`,
        email
      );
      setAllPets([...response.data]);
    } catch (e) {
      console.log(e);
    }
  }
  async function returnAgency(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/return`,
        email
      );
      setAllPets([...response.data]);
    } catch (e) {
      console.log(e);
    }
  }

  async function fosteredIt(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/fostered`,
        email
      );
      setAllPets([...response.data]);
    } catch (e) {
      console.log(e);
    }
  }
  async function saveIt(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/save`,
        email
      );
      setStatus(response);
    } catch (e) {
      console.log(e);
    }
  }
  async function unSaveIt(pet) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/pet/${pet.petsId}/save`,
        {
          data: { email },
        }
      );
      setStatus(response);
    } catch (e) {
      console.log(e);
    }
  }
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
              <div>
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
                      <ModalShowpet
                        onClick={() => showMore(pet)}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        pet={pet}
                      />
                      {isAuth ? (
                        <>
                          {savedPets.find((val) => val.petsId == pet.petsId) !=
                          null ? (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => unSaveIt(pet)}
                            >
                              Unsave
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => saveIt(pet)}
                            >
                              Save
                            </Button>
                          )}

                          {pet.adoptionStatus === "Avaiable" ? (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => fosteredIt(pet)}
                              >
                                Foster
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => adoptIt(pet)}
                              >
                                Adopt
                              </Button>
                            </>
                          ) : (
                            ""
                          )}

                          {pet.adoptionStatus === "Adopted" &&
                          currentUser.email === pet.owner ? (
                            <>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => returnAgency(pet)}
                              >
                                Cancell Adoption
                              </Button>
                            </>
                          ) : (
                            ""
                          )}

                          {pet.adoptionStatus === "Fostered" &&
                          currentUser.email === pet.owner ? (
                            <>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => returnAgency(pet)}
                              >
                                Cancell foster
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => adoptIt(pet)}
                              >
                                Adopt
                              </Button>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
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
