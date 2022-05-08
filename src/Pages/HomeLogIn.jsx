function HomeLogIn({ currentUser }) {
  return (
    <div className="containertwo">
      <h1>Start adopting now and find your new best friend</h1>
      <h4>
        Welcome {currentUser.firstname} {currentUser.lastname}
      </h4>
    </div>
  );
}

export default HomeLogIn;
