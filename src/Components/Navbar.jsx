import axios from "axios";
import { NavLink } from "react-router-dom";

function Navbar({ currentUser, setisAuth, setcurrentUser }) {
  function logout() {
    axios.get("http://localhost:3001/logout");
    setisAuth(false);
    setcurrentUser("");
    window.location.pathname = "/";
    localStorage.clear();
  }

  return (
    <div className="navbar">
      <li> Search</li>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>My pets</li>
      <li>
        <NavLink to="/profilesetting">Profile setting</NavLink>
      </li>
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
export default Navbar;
