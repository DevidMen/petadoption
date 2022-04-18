import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react"


function HomeLogIn({currentUser,setcurrentUser,setisAuth}){
  
  /*  let navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3001/login').then((response) => {
           if(response.data.isAuth === true){
             setcurrentUser({...response.data.currentUser[0]})
               }
            })
            },[])
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
     <p>Welcome {currentUser.firstname} {currentUser.lastname}</p>
    </div>
)

}

export default HomeLogIn;