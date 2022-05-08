import React from "react";
import { Table } from "react-bootstrap";
import { nanoid } from "nanoid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Users({ currentUser , index ,setUserComplete}) {
  const [users, setUser] = useState([]);
  const navigate = useNavigate()

  function userFull(user){
    navigate('/userdetails')
    setUserComplete(user)
  }
  useEffect(() => {
    async function showUsers() {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${currentUser.email}`
        );
        setUser([...response.data.result]);
      } catch (e) {
        alert(e.response.data.message);
      }
    }
    showUsers();
  }, []);

  return (
    <div className="container" key={index}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody >
          {users.length &&
            users.map((user, index) => {
              return (
                <tr key={index} onClick={()=>userFull(user)}>
                  <td>{index}</td>
                  <td>{user.email}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
