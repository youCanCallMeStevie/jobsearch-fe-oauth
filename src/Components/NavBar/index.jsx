import React, {useEffect} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNetworkWired,
  faHeart,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import { connect,useDispatch, useSelector } from "react-redux";
import { logUserIn, logUserOut, resetResults } from "../../actions";


const mapStateToProps = (state) => {
    return state;
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      resetresults: () => dispatch(resetResults()),
    };
  };
  const NavBar = ({ favorites, resetresults }) => {
    console.log(favorites.length);
    const dispatch = useDispatch()
    const isLogged = useSelector(state=> state.user.isLogged)
    const user = useSelector(state=> state.user.profile)
  
  
    useEffect(() => {
      dispatch(logUserIn())
      console.log(isLogged)
    }, [dispatch])
   
  return (
    <>
      <Navbar className="navbar-container">
        <Link to={`/`}>
          <Navbar.Brand href="#home">
            <FontAwesomeIcon
              icon={faNetworkWired}
              style={{ color: "whitesmoke" }}
              className="icon-padding"
            />
          </Navbar.Brand>
        </Link>
        <Nav className="ml-auto">
          {!isLogged ? (
            <a href={`${process.env.REACT_APP_BE_URL}/api/users/auth/googleLogin`}>
              LOGIN
            </a>
          ) : (
            <>
              {" "}
              <Nav.Link className="">Hi {user?.firstName}</Nav.Link>{" "}
              <Nav.Link onClick={() => dispatch(logUserOut())}>LOGOUT</Nav.Link>
            </>
          )}
        </Nav>
        <Link to="/favorites">
        <FontAwesomeIcon
              icon={faHeart} />
          {favorites?.length}
        </Link>
      </Navbar>
    </>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
