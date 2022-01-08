import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../Auth/Authcontext";
import Header from "../Header/index";
import { useNavigate } from "react-router-dom";
import "../Postid/Postid.css";
import { HashLink as Link } from "react-router-hash-link";
import {
  faCommentDots,
  faHeart,
  faClock,
  faTrash,
  faPaperPlane,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Imges from "../ProfileImage";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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

function Postid() {
  document.title = "Post Details";

  const { user } = useContext(AuthContext);
  const [postid, setpostid] = useState([]);
  const [comment, setcomment] = useState(null);
  const [getcomment, setgetcomment] = useState("");
  const [posts, setCount] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const Profile = user.user_id;
  const image = postid.id;
  console.log(image);

  useEffect(() => {
    IDuser();
    IDpostid();
    IDgetcomment();
    IDlike();
  }, []);

  const IDpostid = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/postid/${id}`
    );

    console.log(data);
    setpostid(data);
  };

  const addNewcomment = async () => {
    let formField = new FormData();
    formField.append("comment", comment);
    formField.append("image", image);
    formField.append("profile", Profile);
    formField.append("username", posts.username);

    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/instgram/addcomment/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate("/home");
    });
  };

  const IDgetcomment = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getcomment/${id}`
    );
    console.log(data);
    setgetcomment(data);
  };

  // Get Users
  const IDuser = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/userid/${id}`
    );

    console.log(data);
    setCount(data);
    console.log("********************");
    console.log(user.user_id);
  };

  // Delete Post
  const delpost = async () => {
    await axios
      .delete(`http://127.0.0.1:8000/instgram/delpost/`, {
        data: { id: postid.id, profile: user.user_id },
      })
      .then((response) => {
        console.log(response.data);
      });
    navigate("/home");
  };

  // Delete Comment
  const delcomment = async (x) => {
    await axios
      .delete(`http://127.0.0.1:8000/instgram/delcomment/`, {
        data: { id: x, profile: user.user_id, image: postid.id },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  // Get  Likes
  const [like, setlike] = useState([]);
  const addNewlike = async () => {
    let formField = new FormData();
    formField.append("user_like", user.user_id);
    formField.append("post_like", postid.id);
    formField.append("username", user.username);
    formField.append("profile", Profile);

   try {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/instgram/like/",
      data: formField,
    }).then((response) => {
      console.log(response.data);

    });
    console.log(postid.username)
    console.log(user.username)
    // 
   } catch (error) {
     
   }
   
  };

  const IDlike = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getlike/${id}`
    );

    console.log(data);
    setlike(data);
  };

  // Delete Like
  const dellike = async () => {
    await axios
      .delete(`http://127.0.0.1:8000/instgram/dellike/`, {
        data: { user_like: user.user_id, post_like: postid.id },
      })
      .then((response) => {
        console.log(response.data);
      });
  };


  //    view who reacted like
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Header />
          </Col>
        </Row>
        <Row className="pro_div">
          <Col xs={1}> </Col>
          <Col xs={6}>
            <div className="comment_post">
              <div className="post_header">
                <Imges id_image={postid.profile} /> &nbsp;
                <h2 className="post_user"> {postid.username}</h2>
              </div>
              <img className="post_image" src={postid.image} alt="post" />

              <div className="post_like">
                <a href="#" onClick={handleOpen}>
                  {" "}
                  <span className="len_likes">{like.length}</span>{" "}
                </a>{" "}
                &nbsp;
                <Link to="/home">
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="lg"
                    style={{ color: "red" }}
                    className="icons2"
                    onClick={addNewlike}
                  />
                </Link>
                <Link to="/home">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    size="lg"
                    style={{ color: "gray" }}
                    className="icons_comment"
                  />
                </Link>
                {postid.profile === user.user_id ? (
                  <Link to="/home">
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      style={{ color: "gray" }}
                      className="icons_delete"
                      onClick={delpost}
                    />
                  </Link>
                ) : (
                  <button className="btn_hidden">Ayaaa</button>
                )}
              </div>

              <h5 className="post_text"> {postid.image_caption}</h5>

              <div className="d-flex detail_comment ">
                <input
                  className="form-control text_add"
                  type="text"
                  placeholder="Add Comment"
                  name="comment"
                  onChange={(e) => setcomment(e.target.value)}
                />

                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="lg"
                  style={{ color: "#000" }}
                  className="icons_send m-2"
                  onClick={addNewcomment}
                />
              </div>
            </div>
          </Col>

          <Col xs={4}>
            <Link to="/home">
              {" "}
              <h5 className="show_btn">Back to Home</h5>
            </Link>
            <h5 className="show_btn">Show Comments</h5>
            <div className="comments">
              {getcomment
                ? getcomment.map((p) => [
                    <table width={380}>
                      <tr>
                        <td width={370}>
                          {" "}
                          <h4 className="pro_comment">
                            {" "}
                            {p.username} : {p.comment}{" "}
                          </h4>{" "}
                        </td>
                        <td width={10}>
                          {p.profile === user.user_id ? (
                            <Link to="/home">
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                size="1x"
                                style={{ color: "#000" }}
                                className="comment_trash"
                                onClick={() => delcomment(p.id)}
                              />
                            </Link>
                          ) : (
                            <button className="btn_hidden">Ayaaa</button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <FontAwesomeIcon
                            icon={faClock}
                            size="1x"
                            style={{ color: "gray" }}
                          />
                          &nbsp; &nbsp;: &nbsp;
                          {p.created_at}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <hr></hr>
                        </td>
                      </tr>
                    </table>,
                  ])
                : "no data"}
            </div>
          </Col>

          <Col xs={1}></Col>
        </Row>
      </Container>


      <div className="modal_lovers">
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <h2>Users who Loved the Post:</h2> <br></br> <br></br>
            {like.map((p) => (
              <table width={500}>
                <tr>
                  <td> <h3 title={p.username}>{p.username}</h3></td>
              
                  <td width={10}>
           
     {p.username === postid.username ?
         <Link to={'/home'}>
               <FontAwesomeIcon
              icon={faTrashAlt}
              size="1x"
              style={{ color: "#000" }}
              className="comment_trash"
              onClick={dellike}
            /> 

          </Link> 
             
                  : 
                   <button className="btn_hidden">Ayaaa</button> }
                   
                   </td>
                </tr>
              </table>
             
            ))}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Postid;
