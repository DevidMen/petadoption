import { useState } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function MyPetsCards({
  setStatus,
  status,
  pet,
  currentUser,
  isAuth,
  saved,
  setPet,
  setAllPets,
  allPets,
}) {
  const [email] = useState(currentUser.email);
  const navigate = useNavigate();
  function showMore(pet) {
    setPet(pet);
    navigate("/showpet");
  }

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
                <strong>Status:</strong> {pet.adoptionStatus}
              </h4>
            </div>
            <div className="social">
              <Button
                onClick={() => showMore(pet)}
                variant="primary"
                size="sm"
                pet={pet}
                setPet={setPet}
                setAllPets={setAllPets}
                allPets={allPets}
                currentUser={currentUser}
                isAuth={isAuth}
                setStatus={setStatus}
                status={status}
                saved={saved}
              >
                Show more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
