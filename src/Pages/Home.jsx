import ModalSignin from '../Components/ModalSignin'
import ModalSignup from '../Components/ModalSignup';
import {useState} from 'react'

function Home({setcurrentUser,setisAuth,isAuth}) {
    const [modalShow, setModalShow] = useState(false);
    const [modalopen, setmodalopen] = useState(false);
    return(
        <div>
          <h1> Find your new best friend</h1>
          <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, rem, officiis nihil nobis, voluptas culpa perspiciatis ea corrupti qui eos temporibus atque enim perferendis ab? Reiciendis est ad nobis ab?</h4>
          <div className='modalButton'>         
    <ModalSignin show={modalShow}
        onHide={() => setModalShow(false)} setcurrentUser = {setcurrentUser} setisAuth ={setisAuth} isAuth={isAuth}/>
    <ModalSignup show={modalopen} setisAuth ={setisAuth} setcurrentUser={setcurrentUser}
        onHide={() => setmodalopen(false)}/>
        </div>
          <div className="containerimg">
              <div className="divimg"> <img className="imghome" src="" alt="" /> </div>
              <div className="divimg"><img className="imghome" src="" alt="" /> </div>
              <div className="divimg"> <img className="imghome" src="" alt="" /> </div>
          </div>
        </div>
    )
}
export default Home;