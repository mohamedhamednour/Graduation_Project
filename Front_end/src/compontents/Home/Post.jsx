import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";
import "./Home.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Auth/Authcontext";
import { HashLink as Link } from "react-router-hash-link";
import { faComment, faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Imges from "../ProfileImage";

function Post(props) {
  const { user } = useContext(AuthContext);
  const myuser = user.user_id;
  console.log(myuser);
  let navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [image_name, setName] = useState(null);
  const [profile, setPhone] = useState(user.user_id);

  const addNewPost2 = async () => {
    let formField = new FormData();
    formField.append("image_name", image_name);
    formField.append("profile", profile);

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

  const [post, setpost] = useState([]);
  const [posts, setCount] = useState([]);

  useEffect(() => {
    IDlike();
    IDpost();
    IDlimit();
    IDLoginPost();
    IDpostid();
    IDuser();
  }, []);

  const IDpost = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/viewfollowers/${myuser}`
    );
    console.log('Posts' , data);
    setpost(data);
  };

  const baseURL2 = "http://127.0.0.1:8000/instgram/get";
  const [customercomment, setCustomercomment] = useState({
    comment: "",
  });

  React.useEffect(() => {
    axios.get(`${baseURL2}`).then((response) => {
      setCustomercomment(response.data);
    });
  }, []);
  const handleChange2 = (event) => {
    setCustomercomment({
      ...customercomment,
      [event.target.name]: event.target.value,
    });
  };
  function createcomment() {
    axios.post(baseURL2, customercomment).then((response) => {
      setCustomercomment(response.data);
    });
  }

  // Add Limit Users
  const [limituser, setlimituser] = useState([]);

  const IDlimit = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/limitusers`
    );
    console.log(data);
    setlimituser(data);
  };

  // Get Posts to Login User
  const [ownuser, setownuser] = useState([]);

  const IDLoginPost = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getp/${user.user_id}`
    );
    console.log(data);
    setownuser(data);
    console.log("**************************************");
    console.log(user.user_id);
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
  const IDpostid = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/postid/${id}`
    );

    console.log(data);
    setpostid(data);
  };

  // Get  Likes
  const [like, setlike] = useState([]);
  const [postid, setpostid] = useState([]);
  const { id } = useParams();

  const addNewlike = async (postid) => {
    let formField = new FormData();
    formField.append("user_like", user.user_id);
    formField.append("post_like", postid);
    formField.append("username", user.username);

    try {
      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/instgram/like/",
        data: formField,
      }).then((response) => {
        console.log(response.data);
      });
      navigate("/home");
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



  return (
    <>
      <Container fluid>
        <Row className="post_div">
          <Col xs={1}> </Col>
          <Col xs={6}>
            {ownuser.map((puser) => (
              <div className="post">
                <div className="post_header">
                  <Imges id_image={puser.profile} />

                  <h2 className="post_user"> {puser.username}</h2>
                </div>
                <img
                  className="post_image"
                  src={`http://127.0.0.1:8000${puser.image}`}
                  alt="post"
                />

                <div className="post_like">
          
                  <Link to={`/postid/${puser.id}`}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      style={{ color: "red" }}
                      className="icons2"
                      onClick={() => addNewlike(puser.id) }
                    />
                  </Link>

                  <Link to={`/postid/${puser.id}`}>
                    <FontAwesomeIcon
                      icon={faComment}
                      size="lg"
                      style={{ color: "gray" }}
                      className="icons_comment"
                    />
                  </Link>

                
                </div>
                <h5 className="post_text"> {puser.image_caption}</h5>
                <span className="p-2">
                  <FontAwesomeIcon
                    icon={faClock}
                    size="1x"
                    style={{ color: "gray" }}
                  />{" "}
                  : &nbsp;
                  {puser.created_at}
                </span>
                <div className="comments_div">
                  <h5 className="show_comments">Show Comments</h5>
                  <div>
                    {puser.comment
                      ? puser.comment.map((com) => [
                          // Name Of User
                          <span> {com.username} : </span>,
                          <span> {com.comment}</span>,
                          <span>
                            {" "}
                            <br></br>{" "}
                          </span>,
                        ])
                      : "no data"}
                  </div>
                </div>
              </div>
            ))}

            {post.map((p) => (
              <div className="post">
                <div className="post_header">
                  <Imges id_image={p.profile} />

                  <h2 className="post_user"> {p.username}</h2>
                </div>
                <img
                  className="post_image"
                  src={`http://127.0.0.1:8000${p.image}`}
                  alt="post"
                />

                <div className="post_like">
                  <Link to={`/postid/${p.id}`}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      style={{ color: "red" }}
                      className="icons2"
                    />
                  </Link>

                  <Link to={`/postid/${p.id}`}>
                    <FontAwesomeIcon
                      icon={faComment}
                      size="lg"
                      style={{ color: "gray" }}
                      className="icons_comment"
                    />
                  </Link>
                </div>
                <h5 className="post_text"> {p.image_caption}</h5>
                <span className="p-2">
                  <FontAwesomeIcon
                    icon={faClock}
                    size="1x"
                    style={{ color: "gray" }}
                  />{" "}
                  : &nbsp;
                  {p.created_at}
                </span>

                <div className="comments_div">
                  <h5 className="show_comments">Show Comments</h5>
                  <div>
                    {p.comment
                      ? p.comment.map((c) => [
                          // Name Of User
                          <span> {c.username} :</span>,
                          <span> {c.comment}</span>,
                          <span>
                            <br></br>
                          </span>,
                        ])
                      : "no data"}
                  </div>
                </div>
              </div>
            ))}
          </Col>

          {/* Follow Suggestions */}
          <Col xs={4}>
            <div className="followers">
              <p className="p_inline">Suggestions For You</p>
              <Link to="/follow">
                {" "}
                <a href="#" className="a_link">
                  View All
                </a>
              </Link>

              {limituser.map((limituser) => (
                <Link to={`/profile/${limituser.id}`} className="link_follow">
                  {limituser.id === user.user_id ? (
                    <button className="hide_me">Hello</button>
                  ) : (
                    <div className="follow_account">
                      <div className="avatar">
                        <Imges id_image={limituser.id} />
                      </div>
                      <h6>{limituser.username}</h6>
                      <span className="btn_follow">View Profile</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Post;
