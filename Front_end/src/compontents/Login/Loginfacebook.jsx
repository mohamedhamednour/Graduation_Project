import React, { useState, useEffect, useParams } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookLogin from "react-facebook-login";
import { Row, Col, Container, Navbar } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faPaperPlane,
  faPlusSquare,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { HashLink as Link } from "react-router-hash-link";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

function Loginfacebook() {
  document.title = "Loginfacebook Page";

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <>
      {!login && (
        <FacebookLogin
          appId="452919822846635"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}
      {login && (
        <Container fluid>
          <Row id="header">
            <Navbar fixed="top" className="navbar">
              <Col xs={4} className="head1">
                <img
                  className="image"
                  src={require("././static/images/instlogo.png").default}
                  alt="logo"
                />
              </Col>
              <Col xs={3} className="head2">
                <form className="search" method="get">
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="sm"
                    style={{ color: "gray" }}
                  />

                  <input type="search" placeholder="Search" name="search" />
                </form>
              </Col>
              <Col xs={4} className="head3">
                <Link to="/home">
                  {" "}
                  <FontAwesomeIcon
                    icon={faHome}
                    size="lg"
                    style={{ color: "gray" }}
                    className="icons"
                  />{" "}
                </Link>
                <Link to="/home">
                  {" "}
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    size="lg"
                    style={{ color: "gray" }}
                    className="icons"
                  />
                </Link>
                <Button>
                  {" "}
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    size="lg"
                    style={{ color: "gray" }}
                    className="icons"
                  />
                </Button>
                <Link to="/home">
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="lg"
                    style={{ color: "gray" }}
                    className="icons"
                  />
                </Link>

                <div className="btn-group dropdown">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      size="lg"
                      style={{ color: "gray" }}
                      className="icons dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                  </button>
                  <ul className="dropdown-menu">
                    <Link to={"/home"} className="li_user">
                      <li className="dropdown-item">My Profile</li>
                    </Link>
                    <Link to={"/home"} className="li_user">
                      <li className="dropdown-item">Edit My Profile</li>
                    </Link>
                    <Link to="/" className="li_user">
                      <li className="dropdown-item">Logout</li>
                    </Link>
                  </ul>
                </div>
              </Col>
              <Col xs={1}>
                <div className="btn-group  dropleft">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Instgram
                  </button>
                  <ul className="dropdown-menu">
                    <li className="dropdown-header">WebSite Pages</li>
                    <li className="dropdown-item">Home</li>
                    <li className="dropdown-item">Contact</li>
                    <li className="dropdown-item">About</li>
                  </ul>
                </div>
              </Col>
            </Navbar>
          </Row>
          <Row className="m-4">
            <Col xs={2}></Col>
            <Col xs={3}>
              <div className="my_photo">
                <Avatar
                  className="myimage my_photo_facebook"
                  src={picture}
                  alt="logo"
                  size="giant"
                />
              </div>
            </Col>
            {login && (
              <Col xs={4} className="my_data">
                <h2>{data.name}</h2>
                <div className="counts">
                  <span>0 Posts</span>
                  <span>0 Followers</span>
                  <span>0 Following</span>
                </div>

                <h4></h4>
                <p>My bio</p>
              </Col>
            )}
            <Col xs={3}></Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={10}>
              {" "}
              <hr></hr>
            </Col>
            <Col xs={1}></Col>
          </Row>

          <Row>
            <Col xs={1}></Col>
            <Col xs={10}>{/* <Post /> */}</Col>
            <Col xs={1}></Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Loginfacebook;
