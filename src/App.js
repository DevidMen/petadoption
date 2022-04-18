import './App.css';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import React from 'react';
import HomeLogIn from './Pages/HomeLogIn';
import {useState, useEffect} from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import ProfileSettings from './Pages/ProfileSettings';
import UpdatePassword from './Pages/UpdatePassword';

function App() {
  const [isAuth, setisAuth] = useState(false)
  const [currentUser , setcurrentUser] = useState('')

 
  useEffect(() => {
    if(!isAuth && window.location.pathname !== ('/')){
          window.location.pathname = ('/')
    }
  },[isAuth])

  return (

    <div className='main'>
      {isAuth?
     <Navbar setisAuth = {setisAuth} isAuth={isAuth} setcurrentUser = {setcurrentUser } />:"" }
     <Routes>
{!isAuth?
     <Route path="/" element={ <Home setisAuth = {setisAuth} isAuth={isAuth} setcurrentUser = {setcurrentUser }  />}/>
     :<>
     <Route path='/home' element= {<HomeLogIn currentUser = {currentUser} setcurrentUser={setcurrentUser}  />}/>

     <Route path='/profilesetting' element= {<ProfileSettings currentUser = {currentUser} setcurrentUser={setcurrentUser}  />}/>
     <Route path='/updatepassword' element= {<UpdatePassword currentUser = {currentUser} setcurrentUser={setcurrentUser}  />}/>
     </>
}
     </Routes>
    </div>

  );
}
export default App;