import React, {useState,useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

function ProfileSettings({currentUser,setcurrentUser}){

    const [email, setEmail] = useState(currentUser.email)
    const [loginemail, setloginemail] = useState(currentUser.email)
    const [password, setPassward] = useState(currentUser.password)
    const [newfirstname, setnewName] = useState(currentUser.firstname)
    const [newlastname, setnewlastName] = useState(currentUser.lastname)
    const [confirmpass, setConfirmpass] = useState(currentUser.password)
    const [newphone, setnewPhone] = useState(currentUser.phone)
    const [biography, setbiography] = useState(currentUser.biography || "")
    let navigate = useNavigate()
  //  axios.defaults.withCredentials = true
async function update  (email) {
  try{ 
    const response = await axios.put(`http://localhost:3001/update/${currentUser.email}`,
     {lastname:newlastname, email, firstname:newfirstname,password, phone:newphone,loginemail ,confirmpass:confirmpass, biography:biography })
   
    setcurrentUser({...response.data})

    setloginemail(response.data.email)
    alert(response.data.message)
    navigate("/home")

  }
  catch(err){
    if(err.response.data[0]){
     alert(`${err.response.data[0].instancePath} ${err.response.data[0].message}` )
      }else{
       alert(err.response.data.message)
         }
       } 
}
/*
useEffect(() => {
  axios.get(`http://localhost:3001/update/${currentUser.email}`).then((response) => {
     if(response.data.isAuth === true){
       setcurrentUser({...response.data.currentUser[0]})

         }
      })
      },[])
*/
    return (
        <div>
       <h1>
           Profile Settings
       </h1>
       <Form className="m-5">
         <Row >
              <Form.Group className="mb-3" md="4" as={Col} controlId="formGridEmail">
                <Form.Label className="mb-3">Email</Form.Label>
                <Form.Control onChange={(e)=>setEmail(e.target.value)} defaultValue = {currentUser.email} type="email" placeholder="Enter email" required/>
              </Form.Group>
              </Row>
              <Row>
            <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName" required>
              <Form.Label className="mb-3">Name</Form.Label>
              <Form.Control onChange={(e)=>setnewName(e.target.value)} defaultValue = {currentUser.firstname} placeholder="Name" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
              <Form.Label className="mb-3">Last Name</Form.Label>
              <Form.Control onChange={(e)=>setnewlastName(e.target.value)} defaultValue = {currentUser.lastname} placeholder="Last Name" required/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" md="4" controlId="formGridName">
              <Form.Label className="mb-3">Phone Number</Form.Label>
              <Form.Control onChange={(e)=>setnewPhone(e.target.value)} defaultValue = {currentUser.phone} type="number" placeholder="Phone Number" required/>
            </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3" md="12" controlId="formGridName">
              <Form.Label >Biography</Form.Label>
              <Form.Control  className="pb-5" onChange={(e)=>setbiography(e.target.value)} defaultValue = {currentUser.biography} placeholder="Text" required/>
            </Form.Group>
          </Form>
          <Button onClick={()=>{
              update(email)}} variant="secondary">
            Update Profile
          </Button>
          <Button variant="secondary"><NavLink to="/updatepassword">Update Password</NavLink></Button>
        </div>
    )
}

export default ProfileSettings;