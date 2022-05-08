import React, { useState, useEffect } from "react";
import {  Button,  Modal,  } from "react-bootstrap";
import axios from "axios";

function ModalShowpet({ pet, setPet }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    async function showPets() {
      try {
        const response = await axios.get(
          `http://localhost:3001/showpet/${pet.petsId}`
        );

        setPet({ ...response.data.result[0] });
      } catch (e) {
        console.log(e);
      }
    }
    showPets();
  }, []);

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Show more
      </Button>
      <Modal className="modal" show={show} onHide={handleClose} centered>

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
            </div>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalShowpet;
