import React from "react";
import { Card, ListGroupItem, ListGroup, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalShowpet from "../Components/ModalShowpet";
function GetPets({ currentUser, setEditPet, setPet }) {
  const [allPets, setAllPets] = useState([]);
  const [email, setEmail] = useState(currentUser.email);
  const [modalShow, setModalShow] = useState(false);
  const [modalopen, setmodalopen] = useState(false);
  const [status, setStatus] = useState([]);
  let navigate = useNavigate();

  function updatePet(pet) {
    navigate("/updatepet");
    setEditPet(pet);
  }
  function showMore(pet) {
    setPet(pet);
  }

  useEffect(() => {
    async function showPets() {
      try {
        const response = await axios.get(`http://localhost:3001/getpets`, {
          params: { email },
        });
        setAllPets([...response.data.result]);
      } catch (e) {
        alert(e.response.data.message);
      }
    }
    showPets();
  }, []);
  async function deletePet(pet) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/pet/${pet.petsId}/delete`,
        {
          data: { email },
        }
      );
      alert(response.data.message);
      console.log({ ...response });
      setAllPets([...response.data.result]);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="container">
      {!allPets.length ? (
        <Alert className="m-5" variant="success">
          <Alert.Heading>No pets to show</Alert.Heading>
        </Alert>
      ) : (
        <>
          {allPets &&
            allPets.map((pet, index) => {
              return (
                <div className="petscontainer">
                  <div>
                    <div className="main-cont">
                      <div className="card">
                        <img src={pet.image} />
                        <div className="descp">
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
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => updatePet(pet)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deletePet(pet)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default GetPets;
