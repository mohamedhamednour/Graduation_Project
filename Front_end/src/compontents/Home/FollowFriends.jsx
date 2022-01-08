import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Auth/Authcontext";
import { HashLink as Link } from "react-router-hash-link";
import Imges from "../ProfileImage";

const FollowFriends = () => {
  document.title = "Followers Page";

  const { user } = useContext(AuthContext);
  const myuser = user.user_id;
  console.log(myuser);
  let navigate = useNavigate();

  useEffect(() => {
    IDlimit();
  }, []);

  // Add Limit Users
  const [limituser, setlimituser] = useState([]);

  const IDlimit = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/limitusers`
    );
    console.log(data);
    setlimituser(data);
  };

  return (
    <>
      <Container fluid>
        <Row className="profile_div">
          <Col xs={3}> </Col>
          <Col xs={6}>
            {/* Follow Suggestions */}

            <div className="follower_to">
              <p>Suggestions For You</p>
              {limituser.map((limituser) => (
                <Link to={`/profile/${limituser.id}`} className="link_follow">
                  {limituser.id === user.user_id ? (
                    <button className="hide_me">Hello</button>
                  ) : (
                    <div className="follow_account">
                      <div className="avatar">
                        <Imges id_image={limituser.id} />

                        {/* <Avatar
                                    className="follow_avatar"
                                    alt="userphoto"
                                    src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" />
                           */}
                      </div>
                      <h6>{limituser.username}</h6>
                      <span className="btn_follow">View Profile</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </Col>
          <Col xs={3}></Col>
        </Row>
        <Row>
          <Col xs={7}> </Col>

          <Col xs={5} className="div_continue">
            <Link to="/home" className="link_home">
              {" "}
              <button type="submit" className="continue">
                Continue
              </button>{" "}
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FollowFriends;
