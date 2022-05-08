import ModalSignin from "../Components/ModalSignin";
import ModalSignup from "../Components/ModalSignup";
import { useState } from "react";

function Home({ setcurrentUser, setisAuth, isAuth, setisAdmin }) {
  const [modalShow, setModalShow] = useState(false);
  const [modalopen, setmodalopen] = useState(false);
  return (
    <div className="container">
      <h1> Find your new best friend now</h1>
      <h4>
        Give for a Better Life Today,from the comfort of your personal computer
        pet lovers can search for a pet that best matches their needs, we are an
        online, searchable database of animals who need homes.Our mission is to
        use internet technology and the resources it can generate to increase
        public awareness of the availability of high-quality adoptable
        pets,increase the overall effectiveness of pet adoption.
      </h4>
      <div className="modalButton">
        <ModalSignin
          show={modalShow}
          onHide={() => setModalShow(false)}
          setcurrentUser={setcurrentUser}
          setisAuth={setisAuth}
          isAuth={isAuth}
          setisAdmin={setisAdmin}
        />
        <ModalSignup
          show={modalopen}
          setisAuth={setisAuth}
          setcurrentUser={setcurrentUser}
          onHide={() => setmodalopen(false)}
        />
      </div>
    </div>
  );
}
export default Home;
