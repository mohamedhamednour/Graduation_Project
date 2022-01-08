import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../Auth/Authcontext";
import "./ProfileImage.css";
import Avatar from "@material-ui/core/Avatar";

const Imges = (props) => {
  const [profileid, setProfile] = useState([]);
  const { user } = useContext(AuthContext);
  const profile = user.user_id;
  const id_image = props.id_image;
  console.log(id_image);

  const IDprofile = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/instgram/getprofile/${id_image}`
    );
    console.log(data);
    setProfile(data);
  };

  useEffect(() => {
    IDprofile();
  }, [props.id_image]);

  return (
    <div>
      {profileid
        ? profileid.map((p) => [
            <Avatar
              className="photo_sm post_avatar"
              alt="Avatar"
              key={p.id}
              src={`http://127.0.0.1:8000${p.profile_pic}`}
            />,

            ,
            console.log("fgjfgj", p.id),
          ])
        : "no data"}
    </div>
  );
};

export default Imges;
