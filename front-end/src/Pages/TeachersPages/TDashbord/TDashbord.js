import React from "react";
import "./Dashbord.css";
import { Grid, Box } from "@mui/material";
import Sidebar from "../TeacherSidebar/SideBar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import Footer from "../../../Component/Footer/Footer";
import { Link } from "react-router-dom";




export default function Dashbord() {


  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item md={0.75} sm={1.5} xs={2.2}>
          <Sidebar />
        </Grid>
        <Grid item md={11.25} sm={10.5} xs={9.8}>
          <Box>
         <Link to="/Chat">
          <img
              alt="This is Chatapp icon"
              src="data:image/png;base64,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"
              style={{float: "right", marginRight: "50px", marginTop: "20px"}}
           />
           </Link>
         
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}