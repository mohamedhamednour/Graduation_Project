import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "reactstrap";
import "./Profile.css";
import Header from "../Header";
import { HashLink as Link } from "react-router-hash-link";
import AuthContext from "../Auth/Authcontext";
import { faUpload, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ButtonF from "./ButtonF";

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

const Profile = (props) => {
  document.title = "Profile Page";
  const { user, loginUser } = useContext(AuthContext);

  const [posts, setCount] = useState(null);
  const [postid, setpostid] = useState([]);
  const [profilee, setProfile] = useState([]);
  const { id } = useParams();
  const [following, setfollowing] = useState([]);
  const [follower, setfollowers] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const idProfile = (profilee.bio)


  const [followers, serfollower] = useState([]);
  const user_from = user.user_id;
  let user_to = posts?.id;

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    IDpost();
    IDuser().then((r) => {});
    IDprofile();
    IDfollowing();
    IDfollowers();
  }, []);

  const IDuser = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/userid/${id}`
    );

    console.log(data);
    setCount(data);
    console.log(posts);
    console.log("********************");
    console.log(user.user_id);

    user_to = data.id;
    setDefaultFollow(data.id);
  };
  const IDpost = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getp/${id}`
    );

    console.log(data);
    setpostid(data);
  };

  const IDprofile = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getprofile/${id}`
    );
    console.log(data);
    setProfile(data);
  };

  const [profile_pic, setProfilepic] = useState(null);
  const [profile, setPhone] = useState(user.user_id);
  let navigate = useNavigate();

  // Add Profile
  const addmyphoto = async () => {
    let formField = new FormData();
    formField.append("user", profile);

    if (profile_pic !== null) {
      formField.append("profile_pic", profile_pic);
    }

    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/instgram/addphoto/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate("/home");
      console.log("************************************");
      console.log(user.user_id);
    });
  };

  // Add Followers
  const IDfollowing = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getfollowing/${id}`
    );
    console.log(data);
    setfollowing(data);
  };

  const IDfollowers = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getfollowers/${id}`
    );

    console.log(data);
    setfollowers(data);
  };

  // Button Follow
  const addNewfollow = async () => {
    let formField = new FormData();
    formField.append("user_from", user_from);
    formField.append("user_to", user_to);
    formField.append("username_from", posts?.username);
    formField.append("username_to", posts?.username);

    console.log("add new follow");

   return await axios({
      method: "post",
      url: "http://localhost:8000/instgram/follow/",
      data: formField,
    });
  
  };


  const delfollowers = async () => {
    
   return await axios.delete(`http://127.0.0.1:8000/instgram/delfollowers/`, {
      data: { user_from: user.user_id, user_to: posts?.id },
    });
  };


  // Model Of Following
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };



  // set default value of follow on laod
  const setDefaultFollow = (id) => {
    let arr = JSON.parse(localStorage.getItem("myFollowingArray"));
    if (arr?.find((element) => element == id)) {
      setIsFollowed(true);
    }
    console.log("setDefaultFollow: ", id);
  };

  const setMyFollowing = () => {
    let arr = JSON.parse(localStorage.getItem("myFollowingArray"));
    const userID = user_to;
    console.log(user_to);
    if (arr) {
      const id = arr.find((element) => {
        return element == userID;
      });
      if (id) {
        arr = arr.filter((ele) => ele !== id);
      } else {
        arr.push(userID);
      }
    } else {
      arr = [userID];
    }

    localStorage.setItem("myFollowingArray", JSON.stringify(arr));
  };

  const handleButtonClick = async (event) => {
    if (isFollowed) {
      // let btn = document.getElementById("btn1");
      delfollowers().then((response) => {
        console.log(follower);
        console.log(response);
        navigate('/home')

      });
      setIsFollowed(false);
      setMyFollowing();
      const followers = [...follower];
      const newFollowers = [
        ...followers.splice(
          followers.find((f) => f.id === user.id),
          1
        ),
      ];
      setfollowers(newFollowers);

      // btn.innerText = "Follow";
    } else {
      let btn = document.getElementById("btn1");
      addNewfollow().then(
        (response) => {
          console.log(response);
          setIsFollowed(true);
          setMyFollowing();
          const newFollowers = [...follower];
          newFollowers.push(user);
          setfollowers(newFollowers);
          console.log(follower);
          navigate('/home')
        },
        (error) => {
          console.log("error", error);
        }
      );
      // btn.innerText = "UnFollow";
    }
  };


  return (
    <>
      <Container fluid>
        <Row>
          <Header />
        </Row>
        {posts?.id === user.user_id ? (
          <Row className="profile_div">
            <Col xs={3}>
              <div className="my_photo">
                <input type="hidden" />
                {profilee
                  ? profilee.map((pro) => [
                      <img
                        className="myimage"
                        src={`http://127.0.0.1:8000${pro.profile_pic}`}
                        alt="myphoto"
                      />,
                    ])
                  : "no data"}
              </div>
            </Col>

            <Col xs={2}>
              <div className="d-center">
                <label htmlFor="profile_pic">Please Choose Your Photo</label>
                <input
                  type="file"
                  id="profile_pic"
                  onChange={(e) => setProfilepic(e.target.files[0])}
                />

                {posts?.id === user.user_id ? (
                  <input
                    type="hidden"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Name"
                    name="user"
                    value={profile}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <input
                    type="hidden"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Name"
                    name="user"
                    value={profile}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled
                  />
                )}

                <button
                  type="button"
                  className="btn btn-primary btn-floating"
                  onClick={addmyphoto}
                >
                  Upload &nbsp;{" "}
                  <FontAwesomeIcon
                    icon={faUpload}
                    size="1x"
                    style={{ color: "#fff" }}
                  />
                </button>
              </div>
            </Col>
            <Col xs={4} className="my_data">
              <div className="data_edit">
                <h2>{posts?.first_name}</h2> &nbsp;
                <h2>{posts?.last_name}</h2>
                <h4>{posts?.username}</h4>
                <h5>{posts?.email}</h5>
                <div className="counts">
                  <span>{postid.length} Posts</span>
                  <span>
                    <span>{follower.length}</span>{" "}
                    <a href="#" onClick={handleOpen}>
                      Followers
                    </a>
                  </span>
                  <span>
                    <span>{following.length}</span>{" "}
                    <a href="#" onClick={handleOpen2}>
                      {" "}
                      Following
                    </a>
                  </span>
                </div>
                <div
                  className="horizon progress-bar progress-bar-striped bg-dark"
                  role="progressbar"
                ></div>
                {profilee
                  ? profilee.map((pro) => [
                      <p className="bio_account">{pro.bio}</p>,
                    ])
                  : "no data"}
              </div>
            </Col>
            <Col xs={3} className="my_data">
              <div className="data_follow">
                <div className="follow_btns">
                  <button className="btn_hidden">Ayaaa</button> :
                </div>
              </div>

              <div id="root"></div>
              <div id="modal-root"></div>
            </Col>
          </Row>
        ) : (
          <Row className="profile_div">
            <Col xs={2}> </Col>
            <Col xs={3}>
              <div className="my_photo">
                <input type="hidden" />
                {profilee
                  ? profilee.map((pro) => [
                      <img
                        className="myimage"
                        src={`http://127.0.0.1:8000${pro.profile_pic}`}
                        alt="myphoto"
                      />,
                    ])
                  : "no data"}
              </div>
            </Col>

            <Col xs={4} className="my_data">
              <div className="data_edit">
                <h2>{posts?.first_name}</h2> &nbsp;
                <h2>{posts?.last_name}</h2>
                <h4>{posts?.username}</h4>
                <h5>{posts?.email}</h5>
                <div className="counts">
                  <span>{postid.length} Posts</span>
                  <span>
                    <span>{follower.length}</span>{" "}
                    <a href="#" onClick={handleOpen}>
                      Followers
                    </a>
                  </span>
                  <span>
                    <span>{following.length}</span>{" "}
                    <a href="#" onClick={handleOpen2}>
                      {" "}
                      Following
                    </a>
                  </span>
                </div>
                <div
                  className="horizon progress-bar progress-bar-striped bg-dark"
                  role="progressbar"
                ></div>
                {profilee
                  ? profilee.map((pro) => [
                      <p className="bio_account">{pro.bio}</p>,
                    ])
                  : "no data"}
              </div>
            </Col>
            <Col xs={3} className="my_data">
              <div className="data_follow">
                <div className="follow_btns">
                  {posts?.id === user.user_id ? (
                    <button className="btn_hidden">Ayaaa</button>
                  ) : (
                    <div className="App">
                      <ButtonF
                        onClick={handleButtonClick}
                        btnText={isFollowed ? "UnFollow" : "Follow"}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div id="root"></div>
              <div id="modal-root"></div>
            </Col>
          </Row>
        )}

        <Row className="horizontal">
          <Col xs={1}></Col>
          <Col xs={10}>
            {" "}
            <hr></hr>
          </Col>
          <Col xs={1}></Col>
        </Row>

        <Row>
          <Col xs={1}></Col>
          <Col xs={10}>
            <div className="img_post">
              {postid
                ? postid.map((p) => [
                    <img
                      className="myimage"
                      key={p.id}
                      src={`http://127.0.0.1:8000${p.image}`}
                    />,
                  ])
                : "no data"}
            </div>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
      <div className="modal_following">
        <Modal open={open2} onClose={handleClose2}>
          <div style={modalStyle} className={classes.paper}>
            <h2>Following Users</h2> <br></br> <br></br>
            {following.map((p) => (
              <Link to={`/profile/${p.user_to}`}>
                <h3
                  id="data_ff"
                  className="btn-hidden"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={p.username_to}
                >
                  {p.username_to}
                </h3>
              </Link>
            ))}
          </div>
        </Modal>
      </div>

      <div className="modal_followers">
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <h2>Followers Users</h2> <br></br> <br></br>
            {follower.map((p) => (
              <Link to={`/profile/${p.user_from}`}>
                <h3
                  id="data_ff"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={p.username_from}
                >
                  {p.username_from}
                </h3>
              </Link>
            ))}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
