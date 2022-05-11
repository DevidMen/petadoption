import React from "react";
import {Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GetPets({ currentUser, setEditPet, setPet }) {
  const [allPets, setAllPets] = useState([]);
  const [email, setEmail] = useState(currentUser.email);

  let navigate = useNavigate();

  function updatePet(pet) {
    navigate("/updatepet");
    setEditPet(pet);
  }
  function showMore(pet) {
    setPet(pet);
    navigate("/showpet");
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
      setAllPets([...response.data.result]);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  return (
    <div className="container">
      <div  className="petscontainer">
      {!allPets.length ? (
        <Alert className="m-5" variant="success">
          <Alert.Heading>No pets to show</Alert.Heading>
        </Alert>
      ) : (
        <>
          {allPets &&
            allPets.map((pet, index) => {
              return (
                
                    <div key={index} className="main-cont">
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
                        <div className="social">
                          <Button
                          onClick={()=>showMore(pet)}
                          variant="primary"
                          size="sm"
                            pet={pet}
                          >Show More</Button>
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
            
              );
            })}
        </>
      )}
      </div>
    </div>
  );
}

export default GetPets;