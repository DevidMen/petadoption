import React from "react";
import { Table } from "react-bootstrap";
import { nanoid } from "nanoid";
function getUsers({ item }) {
  return (
    <div key={nanoid()}>
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
          <tr>
            <td>{item.email}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.phone}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default getUsers;
