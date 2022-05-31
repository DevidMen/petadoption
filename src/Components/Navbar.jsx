import axios from "axios";
import {
  Navbar,
  Nav,
  Button,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

export default function NavbarGeneral({  setcurrentUser, setisAuth , isAuth , admin})
{
    function logout(){
        axios.get("http://localhost:3001/logout")
        setcurrentUser("")
        setisAuth(false)
    }
  return (
    <div className="mb-5">
      
        <Navbar className="navbar" bg="light" expand="lg">
          <Container fluid>
            {isAuth?<>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav 
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link to="/" as={Link} >
                  Home
                </Nav.Link>
                <Nav.Link to="/search" as={Link} >
                Search
                </Nav.Link>
                <Nav.Link to="/mypets" as={Link} >
                My pets
                </Nav.Link>
               
                <Nav.Link to="/profilesetting" as={Link} >
                Profile Settings
                </Nav.Link>
                {admin ?
                <>
                <Nav.Link to="/users" as={Link} >
                  Users
                </Nav.Link>
                <Nav.Link to="/getpets" as={Link} >
                Pets
                </Nav.Link>
                <Nav.Link to="/addpet" as={Link} >
                  Add Pet
                </Nav.Link>
                </>
                :""}
              </Nav>
              
              <Button
                variant="danger"
                onClick={()=>logout()}
              >
                Logout
              </Button>{" "}
            </Navbar.Collapse>
            </>:<>
            
          
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >

                <Nav.Link to="/" as={Link} >
                  Home
                </Nav.Link>
                
               
                <Nav.Link to="/search" as={Link} >
                Search
                </Nav.Link>
              </Nav>
              
            </Navbar.Collapse>


            </>}
          </Container>
        </Navbar>
      
      
    </div>
  );
}