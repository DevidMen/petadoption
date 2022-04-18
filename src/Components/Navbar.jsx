import { NavLink } from "react-router-dom";


function Navbar({currentUser, setisAuth ,  setcurrentUser}) {

    
    function logout(){
        setisAuth(false)
        setcurrentUser("")
        window.location.pathname = "/";
        localStorage.clear()
    }

    return(
        <div className="navbar">
           <li> Search</li>
           <li><NavLink to="/home">Home</NavLink></li>
           <li>My pets</li>
           <li><NavLink to="/profilesetting">Profile setting</NavLink></li>
           <form action="/logout" method="POST">
           <button onClick={logout}>Log out</button>
           </form>
        </div>
    )
}
export default Navbar;