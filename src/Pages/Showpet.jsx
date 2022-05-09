import React, { useState } from "react";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import ButtonsForStatus from "../Components/ButtonsForStatus";
function Showpet({ pet, currentUser, setSavedPets, isAuth }) {
  const [email, setEmail] = useState(currentUser.email);
  const [currentPet, setCurrentPet] = useState(pet);
  const [status, setStatus] = useState("");
  useEffect(() => {
    async function showPets() {
      try {
        const response = await axios.get(
          `http://localhost:3001/showpet/${pet.petsId}`
        );

        setCurrentPet({ ...response.data.result[0] });
      } catch (e) {
        console.log(e.response.data.message);
      }
    }
    showPets();
  }, [status]);
  useEffect(() => {
    if(isAuth){
    axios
      .get(`http://localhost:3001/pets/user/${currentUser.email}`)
      .then((res) => {
        setSavedPets([...res.data.savedPetResult]);
      })
      .catch((e) => {
        console.log(e.response);
      });
    }
  }, [status]);

  return (
    <div className="container">
      <div className="petscontainer">
        <div className="petscontainer">
          <div>
            <div className="main-cont">
              <div className="card">
                <img src={currentPet.image} />
                <div className="descp">
                  <h4>
                    <strong>Name:</strong> {currentPet.namePets}
                  </h4>
                  <h4>
                    <strong>Type:</strong> {currentPet.type}
                  </h4>
                  <h4>
                    <strong>Height:</strong> {currentPet.height}
                  </h4>
                  <h4>
                    <strong>Weight:</strong> {currentPet.weight}
                  </h4>
                  <h4>
                    <strong>Dietary:</strong> {currentPet.dietary}
                  </h4>
                  <h4>
                    <strong>Breed:</strong> {currentPet.breed}
                  </h4>
                  <h4>
                    <strong>Hypoallergenic:</strong> {currentPet.hypo}
                  </h4>
                  <h4>
                    <strong>Color:</strong> {currentPet.color}
                  </h4>
                  <h4>
                    <strong>Biography:</strong> {currentPet.biography}
                  </h4>
                  <h4>
                    <strong>Status:</strong> {currentPet.adoptionStatus}
                  </h4>
                </div>
                <div class="social">
                  {isAuth ? (
                    <ButtonsForStatus
                      setStatus={setStatus}
                      isAuth={isAuth}
                      currentUser={currentUser}
                      pet={currentPet}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Showpet;
