import Navbar from "../Components/Navbar";


function HomeLogIn({currentUser}){



return (
    <div>
     <p>Welcome {currentUser.firstname} {currentUser.lastname}</p>
    </div>
)

}

export default HomeLogIn;