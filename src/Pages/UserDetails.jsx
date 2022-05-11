import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Card, ListGroupItem, ListGroup, Table } from "react-bootstrap";

function UserDetails({ currentUser, userComplete, index }) {
  const [petsOfUser, setPetsOfUser] = useState([]);
  const [email, setEmail] = useState(currentUser.email);
  useEffect(() => {
    async function showPetsOfUser() {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userComplete.email}/full`,
          { params: { email } }
        );
        setPetsOfUser([...response.data.result]);
      } catch (e) {
        alert(e.response.data.message);
      }
    }
    showPetsOfUser();
  }, []);
  return (
    <div className="container">
      <div key={index}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr key={index}>
              <td>{userComplete.email}</td>
              <td>{userComplete.firstname}</td>
              <td>{userComplete.lastname}</td>
              <td>{userComplete.phone}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {!petsOfUser.length ? (
        <Alert className="m-5" variant="success">
          <Alert.Heading>The user currently not owner any pets!</Alert.Heading>
        </Alert>
      ) : 
      
      (
        <div className="petscontainer">
        {
          petsOfUser.map((pet, index) => {
            return (
              <div>
                <div className="main-cont">
                  <div className="card">
                    <img src={pet.image} />
                    <div className="descp">
                    <h4><strong>Name:</strong> {pet.namePets}</h4>
                      <h4><strong>Type:</strong> {pet.type}</h4>
                      <h4><strong>Height:</strong> {pet.height}</h4>
                      <h4><strong>Weight:</strong> {pet.weight}</h4>
                      <h4><strong>Dietary:</strong>{pet.dietary}</h4>
                      <h4><strong>Breed:</strong> {pet.breed}</h4>
                      <h4><strong>Hypoallergenic:</strong> {pet.hypo}</h4>
                      <h4><strong>Color:</strong> {pet.color}</h4>
                      <h4><strong>Biography:</strong> {pet.biography}</h4>
                      <h4><strong>Status:</strong> {pet.adoptionStatus}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      )}
    </div>
  );
}
export default UserDetails;