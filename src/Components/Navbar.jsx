import { NavLink } from "react-router-dom";


function Navbar({currentUser, setisAuth ,  setcurrentUser}) {

    
    function logout(){
        setisAuth(false)
        setcurrentUser("")
    }

    return(
        <div className="navbar">
           <li> Search</li>
           <li><NavLink to="/home">Home</NavLink></li>
           <li>My pets</li>
           <li><NavLink to="/profilesetting">Profile setting</NavLink></li>
           <button onClick={logout}>Log out</button>
        </div>
    )
}
export default Navbar;