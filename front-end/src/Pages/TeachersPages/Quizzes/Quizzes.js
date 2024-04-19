import React, { useEffect, useState } from "react";
import "./Quizzes.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import Setquise from "./Component/Setquise";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Quizzes() {
  const [quise, setquise] = useState([]);

  useEffect(() => {
    const fetchQuse = async () => {
      try {
        const token = localStorage.getItem("MERN_AUTH_TOKEN");
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;

        const response = await axios.get(`/api/user/getsubjectreg`);
        const filtersubject = response.data.data.filter(
          (quessubject) => quessubject.email === userEmail
        );
        setquise(filtersubject);
        console.log(filtersubject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchQuse();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
            {quise.map((quises) => (
              <div key={quises._id}>
                <Setquise subject={quises} />
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
