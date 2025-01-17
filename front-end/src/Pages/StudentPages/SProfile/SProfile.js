import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./SProfile.css";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../firebase";
import { jwtDecode } from "jwt-decode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Sidebar from "../../../Component/SSidebar/Ssidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";

function SProfile() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");



  // Function to handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;

    const checkImageExists = async () => {
      const imageRef = ref(storage, `studentProfile/${userID}/profile_pic`);
      try {
        const imageUrl = await getDownloadURL(imageRef);
        setUrl(imageUrl);
      } catch (error) {
        console.log("Error checking image existence:", error.message);
      }
    };

    checkImageExists();
  }, []);

  const handleSave = () => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;
    const imageRef = ref(storage, `studentProfile/${userID}/profile_pic`);

    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            window.alert("Image uploaded successfully!");
          })
          .catch((error) => {
            console.log(error.message, "error getting image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const token = localStorage.getItem("MERN_AUTH_TOKEN");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;
  // getting users name
  useEffect(() => {
    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    const userID = decodedToken._id;

    axios
      .get(`api/user/userProfile/${userID}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("MERN_AUTH_TOKEN");
    const decodedToken = jwtDecode(token);
    const userID = decodedToken._id;
    setUser(decodedToken);

    const updatedUser = {
      ...user,
      name: name,
      email: email,
      mobileNo: mobileNo,
      uEmail: userEmail,
      id: userID,
    };
    console.log("======");
console.log(updatedUser);
    axios
      .post(`/api/user/guardian`, updatedUser)
      .then((response) => {
        setName((pre) => (pre.length > 0 ? "" : pre));
        setEmail((pre) => (pre.length > 0 ? "" : pre));
        setMobileNo((pre) => (pre.length > 0 ? "" : pre));
        window.alert(response.data.msg);
        console.log(response.data.msg);
      })
      .catch((error) => {
        window.alert(error.response.data.msg);
        console.log(error.response.data.msg);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="head">
        <div className="container2">
          <Sidebar />
        </div>
        <div className="container3">
          <div className="container1">
            <div className="profile_pic">
              <div className="picture">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <Avatar
                  alt="profile_pic"
                  src={url}
                  sx={{ width: 90, height: 90 }}
                />
                <button onClick={() => fileInputRef.current.click()}>
                  Change
                </button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
            <div className="student_info">
              <div className="name">
                <p>{user.firstname + " " + user.lastname}</p>
              </div>
            </div>
          </div>

          <div className="personal_details">
            <div className="details">
               <form onSubmit={handleSubmit}> 

                <lebel htmlFor="Parent/Guardian Full Name">
                  <span style={{ color: "red" }}>*</span>Parent/Guardian Full Name
                </lebel>
                <br></br>
                <input
                  type="text"
                  value={name}
                  className="name1"
                  placeholder="Enter here"
                  onChange={(e) => setName(e.target.value)}
                />

                <br></br>
                <lebel htmlFor="email">
                  <span style={{ color: "red" }}>*</span>Parent/Guardian Email
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="degree"
                  placeholder="Enter here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <br></br>
                <lebel htmlFor="mobile">
                  <span style={{ color: "red" }}>*</span>Mobile Number
                </lebel>
                <br></br>
                <input
                  type="text"
                  className="exp"
                  placeholder="Enter here"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                ></input>

                <div className="btn-2">
                  <button type="submit" value="saveDetails">
                    Save
                  </button>
                  <br />
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SProfile;
