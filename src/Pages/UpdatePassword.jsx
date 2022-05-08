import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

function UpdatePassword({ currentUser }) {
  const [password, setPassward] = useState("");
  const [email, setEmail] = useState(currentUser.email);
  const [confirmpass, setConfirmpass] = useState("");

  let navigate = useNavigate();

  async function update(email) {
    try {
      const response = await axios.put(
        `http://localhost:3001/updatepassword/${currentUser.email}`,
        { password, confirmpass: confirmpass, email }
      );

      alert(response.data.message);
      navigate("/home");
    } catch (err) {
      if (err.response.data[0]) {
        alert(
          `${err.response.data[0].instancePath} ${err.response.data[0].message}`
        );
      } else {
        alert(err.response.data.message);
      }
    }
  }

  return (
    <div className="container">
      <h1>Update Password</h1>
      <Form className="m-5">
        <Form.Group className="mb-3" md="4" as={Col} controlId="formGridEmail">
          <Form.Label className="mb-3">Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassward(e.target.value)}
            type="password"
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" md="4" as={Col} controlId="formGridEmail">
          <Form.Label className="mb-3">Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmpass(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
      </Form>
      <Button
        onClick={() => {
          update(email);
        }}
        variant="success"
      >
        Update Password
      </Button>
    </div>
  );
}

export default UpdatePassword;
