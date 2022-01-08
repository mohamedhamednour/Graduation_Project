import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Auth/Authcontext";
import { HashLink as Link } from "react-router-hash-link";
import Header from "../Header";
import Imges from "../ProfileImage";

const Followers = () => {
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
        <Row>
          <Header />
        </Row>

        <Row className="follow_div">
          <Col xs={3}> </Col>
          <Col xs={6}>
            {/* Follow Suggestions */}

            <div className="followers_to">
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
                      <span className="btn_follow">Send Message</span>
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
                Back to Home
              </button>{" "}
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Followers;
