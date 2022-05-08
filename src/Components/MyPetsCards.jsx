import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
export default function MyPetsCards({
  setStatus,
  pet,
  currentUser,
  isAuth,
  saved,
}) {
  console.log(saved);
  const [email] = useState(currentUser.email);

  async function adoptIt(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/adopt`,
        email
      );
      setStatus(response);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  async function returnAgency(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/return`,
        email
      );
      setStatus(response);
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
      setStatus(response);
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
    <div className="petscontainer">
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
                <strong>Dietary:</strong> {pet.dietary}
              </h4>
              <h4>
                <strong>Breed:</strong> {pet.breed}
              </h4>
              <h4>
                <strong>Hypoallergenic:</strong> {pet.hypo}
              </h4>
              <h4>
                <strong>Color:</strong> {pet.color}
              </h4>
              <h4>
                <strong>Biography:</strong> {pet.biography}
              </h4>
              <h4>
                <strong>Status:</strong> {pet.adoptionStatus}
              </h4>
            </div>
            <div class="social">
              {isAuth ? (
                <>
                  {saved ? (
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
    </div>
  );
}
