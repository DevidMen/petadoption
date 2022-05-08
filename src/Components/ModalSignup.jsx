import React, { useState } from "react";
import { Row, Button, Col, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModalSignup({ setisAuth, setcurrentUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassward] = useState("");
  const [firstname, setName] = useState("");
  const [lastname, setlastName] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [phone, setPhone] = useState("");

  let navigate = useNavigate();

  async function register() {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        confirmpass: confirmpass,
      });

      setcurrentUser({ ...response.data });
      setEmail("");
      setName("");
      setlastName("");
      setPassward("");
      setConfirmpass("");
      setPhone("");
      setisAuth(true);
      navigate("/home");
    } catch (err) {
      if (err.response.data[0]) {
        alert(
          `${err.response.data[0].instancePath} ${err.response.data[0].message}`
        );
      } else {
        alert(err.response.data.message);
      }
      setEmail("");
      setName("");
      setlastName("");
      setPassward("");
      setConfirmpass("");
      setPhone("");
    }
  }

  return (
    <>

      <Button className='m-5' variant="primary" size="sm" onClick={handleShow}>
      Sign Up
    </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassward(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword1">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  onChange={(e) => setConfirmpass(e.target.value)}
                  value={confirmpass}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridName" required>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={firstname}
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={(e) => setlastName(e.target.value)}
                value={lastname}
                placeholder="Last Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress22">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
                placeholder="Phone Number"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => register()}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSignup;
