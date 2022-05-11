import Home from "./Pages/HomeLogout";
import Search from './Pages/Search'
import NavbarGeneral from "./Components/Navbar";
import React from "react";
import HomeLogIn from "./Pages/HomeLogIn";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileSettings from "./Pages/ProfileSettings";
import UpdatePassword from "./Pages/UpdatePassword";
import Users from "./Pages/Users";
import AddPets from "./Pages/AddPets";
import GetPets from "./Pages/GetPets";
import UpdatePet from "./Pages/UpdatePet";
import Showpet from './Pages/Showpet'
import MyPetsPage from "./Pages/MyPetsPage";
import UserDetails from './Pages/UserDetails'
import "./App.css";

function App({returnAgency, saveIt ,adoptIt , fosteredIt}) {
  const [isAuth, setisAuth] = useState(false);
  const [currentUser, setcurrentUser] = useState("");
  const [admin, setisAdmin] = useState(false);
  const [editPet, setEditPet] = useState('')
  const [userComplete, setUserComplete] = useState([]);
  const [pet, setPet] = useState('')

  useEffect(() => {
    if (!isAuth && window.location.pathname !== "/") {
      window.location.pathname = "/";
    }
  }, [isAuth]);

  return (
    <div>
      
        <NavbarGeneral
          setisAuth={setisAuth}
          isAuth={isAuth}
          setcurrentUser={setcurrentUser}
          currentUser={currentUser}
          admin={admin}
        />

      <Routes>

        {!isAuth ? (
          <>
          <Route
            path="/"
            element={
              <Home
                setisAuth={setisAuth}
                isAuth={isAuth}
                setcurrentUser={setcurrentUser}
                admin={admin}
                setisAdmin={setisAdmin}
              />
            }
          />

        </>  
        ) 
        
        : (
          <>
                    
            <Route
              path="/home"
              element={
                <HomeLogIn
                  currentUser={currentUser}
        
                />
              }
            />
            <Route
              path="/mypets"
              element={
                <MyPetsPage
                  currentUser={currentUser}
                  isAuth = {isAuth}
                  setPet={setPet}
                />
              }
            />
            <Route
              path="/profilesetting"
              element={
                <ProfileSettings
                  currentUser={currentUser}
                  setcurrentUser={setcurrentUser}
                />
              }
            />
            <Route
              path="/updatepassword"
              element={
                <UpdatePassword
                  currentUser={currentUser}
                  setcurrentUser={setcurrentUser}
                />
              }
            />
             

            {admin ? (
              <>
                <Route
                  path="/users"
                  element={<Users currentUser={currentUser} userComplete={userComplete} setUserComplete={setUserComplete} pet={pet} setPet={setPet} />}
                />
                <Route
                  path="/userdetails"
                  element={<UserDetails currentUser={currentUser} userComplete={userComplete} setUserComplete={setUserComplete} pet={pet} setPet={setPet} />}
                />
                <Route
                  path="/addpet"
                  element={<AddPets currentUser={currentUser} />}
                />
                <Route path="/getpets" element={<GetPets currentUser={currentUser} pet={pet} setEditPet={setEditPet} setPet={setPet} />} />
                <Route
                  path="/updatepet"
                  element={<UpdatePet currentUser={currentUser} editPet={editPet}  />}
                />
              </>
            ) : (
              ""
            )}
          </>
        )}
          <Route
          path="/search"
          element={
            <Search
              setisAuth={setisAuth}
              isAuth={isAuth}
              currentUser={currentUser}
              admin={admin}
              setisAdmin={setisAdmin}
              saveIt = {saveIt}
              adoptIt = {adoptIt}
              fosteredIt = {fosteredIt}
              returnAgency = {returnAgency}
              pet={pet} setPet={setPet}
            />
          }
        />
          <Route
          path="/showpet"
          element={
            <Showpet
              setisAuth={setisAuth}
              isAuth={isAuth}
              currentUser={currentUser}
              saveIt = {saveIt}
              adoptIt = {adoptIt}
              fosteredIt = {fosteredIt}
              returnAgency = {returnAgency}
              pet={pet} 
              setPet={setPet}
            />
          }
        />
      </Routes>
    </div>
  );
}
export default App;