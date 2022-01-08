import React, { useState, useContext, useParams, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Navbar } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";
import {
  faSearch,
  faHome,
  faPaperPlane,
  faPlusSquare,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import AuthContext from "../Auth/Authcontext";
import { useNavigate } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 700,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Header = () => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // const { id } = useParams();

  const handleOpen = () => {
    setOpen(true);
    document.title = "Add Post";
  };

  const handleClose = () => {
    setOpen(false);
  };

  const baseURL = "http://127.0.0.1:8000/instgram/Posts";

  const { logoutUser } = useContext(AuthContext);

  // Add Post
  let navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [image_caption, setCaption] = useState(null);
  const [profile, setProfile] = useState(user.user_id);
  const [posts, setCount] = useState([]);

  // Info Of User
  const IDuser = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/userid/${user.user_id}`
    );

    console.log(data);
    setCount(data);
    console.log("********************");
    console.log(user.user_id);
  };

  useEffect(() => {
    IDuser();
  }, []);

  const addNewPost = async () => {
    let formField = new FormData();
    formField.append("image_caption", image_caption);
    formField.append("profile", profile);
    formField.append("username", posts.username);

    if (image !== null) {
      formField.append("image", image);
    }

    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/instgram/Posts/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate("/home");
    });
  };

  //   Add Search Button
  ////////////////////////////////////////////////////////////////////
  const [users, setusers] = useState([]);
  const [text, settext] = useState("");
  const [suggestion, setsuggestion] = useState([]);
  useEffect(() => {
    const loadusers = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/instgram/limitusers/`
      );
      console.log(response.data);
      setusers(response.data);
    };
    loadusers();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((users) => {
        const regex = new RegExp(`${text}`, "gi");
        return users.username.match(regex);
      });
    }
    console.log("matches", matches);
    setsuggestion(matches);
    settext();
  };


  // Notification 
  const [Follow, setFollow] = useState([]);
    
 useEffect(() => {
      const interval = setInterval(() => {
        IdFollow()
        
        
      }, 10000);
      return () => clearInterval(interval);
    }, []);

    const IdFollow = async() =>{
      const {data} =  await axios.get(`http://127.0.0.1:8000/instgram/getfollower/${user.user_id}`)
    
      console.log("datanew",data)
      setFollow(data)
     

    }

  return (
    <>
      <Container fluid>
        <Row id="header">
          <Navbar fixed="top" className="navbar">
            {/* <Col xs={1}>
                    </Col> */}
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

                <input
                  type="search"
                  placeholder="Search"
                  name="search"
                  onChange={(e) => onChangeHandler(e.target.value)}
                  value={text}
                />

                <div className="search_div">
                  {suggestion &&
                    suggestion.map((suggestion, i) => (
                      <Link to={`/profile/${suggestion.id}`} className="sug">
                        <div key={i}>{suggestion.username}</div>
                      </Link>
                    ))}
                </div>
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
              <Link to="/followers">
                {" "}
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="lg"
                  style={{ color: "gray" }}
                  className="icons"
                />
              </Link>
              <Button onClick={handleOpen}>
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
                  <Link to={`/profile/${user.user_id}`} className="li_user">
                    <li className="dropdown-item">My Profile</li>
                  </Link>
                  <Link to={`/edit/${user.user_id}`} className="li_user">
                    <li className="dropdown-item">Edit My Profile</li>
                  </Link>
                  <Link to="/" className="li_user">
                    <li className="dropdown-item" onClick={logoutUser}>
                      Logout
                    </li>
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
      </Container>
      <div>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <h2>Create New Post</h2>
            <form className="form_post">
              <label htmlFor="image">Select An Image:</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />{" "}
              <br></br>
              <br></br>
              <textarea
                className="form-control"
                rows="7"
                placeholder="Enter Your Caption"
                name="image_caption"
                value={image_caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
              <input
                type="hidden"
                className="form-control form-control-lg"
                placeholder="Enter Your Name"
                name="profile"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
              <button
                className="btn btn-dark"
                type="submit"
                onClick={addNewPost}
              >
                Create your post
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Header;
