import React, { useState, useEffect } from "react";
import { Row, Button, Col, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function ModalSignin({ setisAuth, setcurrentUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassward] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("access-token");

  let navigate = useNavigate();
  axios.defaults.withCredentials = true;

  async function login() {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      setcurrentUser({ ...response.data.user[0] });
      setisAuth(true);
      navigate("/home");
      setEmail("");
      setPassward("");
    } catch (err) {
      if (err.response.data[0]) {
        alert(
          `${err.response.data[0].instancePath} ${err.response.data[0].message}`
        );
      } else {
        alert(err.response.data.message);
      }
      setEmail("");
      setPassward("");
    }
  }

  useEffect(() => {
    console.log(token);
    if (token) {
      axios.get(`http://localhost:3001/login/${token}`).then((res) => {
        if (res) {
          setcurrentUser({ ...res.data.user[0] });
          setisAuth({ ...res.data.auth });
          navigate("/home");
        }
      });
    }
  });

  return (
    <>
      <button onClick={handleShow}>Login</button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassward(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalSignin;
