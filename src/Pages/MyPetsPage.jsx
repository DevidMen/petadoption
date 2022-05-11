import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import MyPetsCards from "../Components/MyPetsCards";
import axios from "axios";


function MyPetsPage({ isAuth, currentUser, setPet}) {
  const [savedPets, setSavedPets] = useState([]);
  const [status , setStatus] = useState([])
  const [ownerPets, setOwnerPets] = useState([]);
  const [fosteredPets, setFosteredPets] = useState([]);


  useEffect(() => {

    axios
      .get(`http://localhost:3001/pets/user/${currentUser.email}`)
      .then((res) => {

        setSavedPets([...res.data.savedPetResult]);
        setOwnerPets([...res.data.ownerPetResult]);
        setFosteredPets([...res.data.fosteredPetResult]);
      }).catch((e)=>{
        alert(e.response.data.message);
      })
  }, [status]);

  return (
    <div className="container">
      <>
        {savedPets.length ? (
          <>
            {<h1>Saved pets</h1>}
            <div className="petscontainer">
              {savedPets.map((pet, index) => (
                <MyPetsCards
                setPet={setPet}
                pet={pet}
                  index={index}
                  isAuth={isAuth}
                  key={index}
                  currentUser={currentUser}
                  setStatus={setStatus}
                  saved={savedPets.find((val)=> val.petsId == pet.petsId) != null}

                />
              ))}
            </div>
          </>
        ) : (
          ""
        )}
        {!(ownerPets.length || fosteredPets.length) ? (
          <Alert className="m-5" variant="success">
            <Alert.Heading>
              You currently do not own or foster any pets!
            </Alert.Heading>
          </Alert>
        ) : (
          <>
            {ownerPets.length ? (
              <>
                {<h1>Adopted</h1>}
                <div className="petscontainer">
                  {ownerPets.map((pet, index) => (
                    <MyPetsCards
                    setPet={setPet}
                    pet={pet}
                      index={index}
                      key={index}
                      currentUser={currentUser}
                      isAuth={isAuth}
                      setStatus={setStatus}
                      saved={savedPets.find((val)=> val.petsId == pet.petsId) != null}
                    />
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
            {fosteredPets.length ? (
              <>
                {<h1>Fostered</h1>}
                <div className="petscontainer">
                  {fosteredPets.map((pet, index) => (
                    <MyPetsCards
                    setPet={setPet}
                    pet={pet}
                      index={index}
                      key={index}
                      isAuth={isAuth}
                      currentUser={currentUser}
                      setStatus={setStatus}
                      saved={savedPets.find((val)=> val.petsId == pet.petsId) != null}
                    />
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </>
    </div>
  );
}

export default MyPetsPage;