import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function ButtonsForStatus({ pet, currentUser, setStatus }) {
  const [savedPets, setSavedPets] = useState([]);
  const [renderOfSaved, setRenderOfSaved] = useState([]);
  const [email, setEmail] = useState(currentUser.email);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pets/user/${currentUser.email}`)
      .then((res) => {
        setSavedPets([...res.data.savedPetResult]);
      })
      .catch((err) => alert(err.response.data.message));
  }, [renderOfSaved]);

  async function adoptIt(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/adopt`,
        email
      );
      setRenderOfSaved(response);
      setStatus(response)

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
      setRenderOfSaved(response);
      setStatus(response)

    } catch (e) {
        alert(e.response.data.message);
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
      setStatus(response)      
      setRenderOfSaved(response);

    } catch (e) {
        alert(e.response.data.message);
    }
  }

  async function fosteredIt(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/fostered`,
        email
      );

      setRenderOfSaved(response);
      setStatus(response)
    } catch (e) {
        alert(e.response.data.message);
    }
  }
  async function saveIt(pet) {
    try {
      const response = await axios.post(
        `http://localhost:3001/pet/${pet.petsId}/save`,
        email
      );
      setRenderOfSaved(response);
 
    } catch (e) {
        alert(e.response.data.message);
    }
  }

  return (
    <div className="social">
      <>
        {savedPets.find((val) => val.petsId == pet.petsId) != null ? (
          <Button variant="danger" size="sm" onClick={() => unSaveIt(pet)}>
            unsave it
          </Button>
        ) : (
          <Button variant="success" size="sm" onClick={() => saveIt(pet)}>
            Save it
          </Button>
        )}

        {pet.adoptionStatus === "Avaiable" ? (
          <>
            <Button variant="success" size="sm" onClick={() => fosteredIt(pet)}>Foster it</Button>
            <Button variant="success" size="sm" onClick={() => adoptIt(pet)}>Adopt it</Button>
          </>
        ) : (
          ""
        )}

        {pet.adoptionStatus === "Adopted" && currentUser.email === pet.owner ? (
          <>
            <Button variant="danger" size="sm" onClick={() => returnAgency(pet)}>Cancell Adoption</Button>
          </>
        ) : (
          ""
        )}

        {pet.adoptionStatus === "Fostered" && 
        currentUser.email === pet.owner ? (
          <>
            <Button variant="danger" size="sm" onClick={() => returnAgency(pet)}>Cancell foster</Button>
            <Button variant="success" size="sm" onClick={() => adoptIt(pet)}>Adopt it</Button>
          </>
        ) : (
          ""
        )}
      </>
    </div>
  );
}
