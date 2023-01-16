import React from "react";
import { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ProjectUI from "./ProjectUI";
import ProjectUIList from "./ProjectUIList";
import "./projects.scss";
import { BsGrid, BsList } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "config/urlConfig";
import { BiSearch, BiAddToQueue } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import ShowPhoto from "./ShowPhoto";
import { MdClose } from "react-icons/md";

import AddProject from "./AddProject";
import { ErrorAlert, SuccessAlert } from "components/Alert";

const Projects = () => {
  const statuses = {
    not_started: "Not Started",
    ongoing: "Ongoing",
    done: "Done",
  };

  const [list, setList] = useState(true);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const { isLoading, data } = useQuery(["project-list"], async () => {
    const resp = await axios.get(`${url}/projects`);
    return resp.data;
  });

  let startProjects  = [];

  const loadProjects = () => {
     const resp = axios.get(`${url}/projects`,{withCredentials: true}).then((dt)=>{
      let prjs = [];
      dt?.data?.projects.map((pr)=>{
          let p = {};
          p.id = pr.id;
          p.name = pr.name;
          p.cateogry = "Category Name";
          p.description = pr.description;
          p.progress = pr.percentage;
          p.status = pr.status;
          p.startTime = pr.starttime;
          p.endtime = pr.endtime;
          p.BidId = pr.BidId;
          p.added_by = {
            name: "Ousman Seid",
            url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            job: "Main Director",
            phone: "+251921114160",
            email: "ousmanseid333@gmail.com",
            address: "Jigjiga city"
          };
          prjs.push(p);

      });
        startProjects = prjs;
        //setProjects(prjs);
     });
  }

  useEffect(()=>{
    loadProjects();
  },[])

  // const searchHandler = async (search) => {
  //   setSearchTerm(search);
  //   let query = projects;
  //   if (search !== 0) {
  //     const newProjectList = query.filter((pr) => {
  //       return Object.values(pr)
  //         .join(" ")
  //         .toLowerCase()
  //         .includes(search.toLowerCase());
  //     });
  //     // console.log(newEmployeeList);
  //     setSearchResult(newProjectList);
  //   } else {
  //     setSearchResult(query);
  //   }
  // };

  //const [projects, setProjects] = useState(startProjects);

  const handleCloseProfile = () => {
    setProfile({ title: "", url: "", open: false });
  };

  const [profile, setProfile] = useState({ title: "", url: "", open: false });

  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess({ open: false, message: "" });
  };

  const [openError, setOpenError] = useState({ open: false, message: "" });

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError({ open: false, message: "" });
  };

  return (
    <>
      <ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
      />
      <AddProject
        open={openAdd}
        handleClose={handleCloseAdd} 
        successCallback={()=>{}}
        setOpenError={setOpenError}
        setOpenSuccess={setOpenSuccess}
      />

      <ShowPhoto
        open={profile.open ?? false}
        handleClose={handleCloseProfile}
        profile={profile}
      />
      <div className="header">
        <div className="start dark:text-gray-100">All Projects</div>

        <div className="end">
          <div className="search">
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                let s = e.target.value;
                let pr = startProjects.filter((p) =>
                  p.name.toLocaleLowerCase().startsWith(s)
                );
                setProjects((prev) => pr);
                setSearch((prev) => s);
              }}
            />
            <BiSearch className="icon" />
            <MdClose
              onClick={() => {
                setProjects((prev) => startProjects);
                setSearch((prev) => "");
              }}
              className="close"
            />
          </div>
          <div
            className={list ? "icon-div-list" : "icon-div"}
            onClick={() => setList(true)}
          >
            <BsList style={{ fontSize: 22 }} />
          </div>
          <div
            className={!list ? "icon-div-list" : "icon-div"}
            onClick={() => setList(false)}
          >
            <BsGrid style={{ fontSize: 20 }} />
          </div>
          {/* <div className={!list? "icon-div-list" : "icon-div"} onClick={()=>setList(false)}><BiAddToQueue style={{fontSize: 22}}/></div> */}
          <Button
            variant="contained"
            size="small"
            style={{
              borderRadius: 3,
              backgroundColor: "#0052cc",
              textTransform: "capitalize",
              fontSize: 14,
            }}
            onClick={handleClickOpenAdd}
            color="success"
            startIcon={<AiOutlinePlus />}
          >
            <p style={{ marginTop: 0 }}>Add Project</p>
          </Button>
        </div>
      </div>
      {!list && (
        <div className="container-div">
          <Grid container spacing={2}>
            {projects.map((pro, index) => {
              return (
                <Grid
                  key={"pro" + index + "-" + pro.id}
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  xl={3}
                >
                  <ProjectUI
                    pr={pro}
                    key={"pro-item" + index + "-" + pro.id}
                    setProfile={setProfile}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}

      {list && (
        <div className="container-div">
          <Grid container spacing={0.5}>
            {projects.map((pro, index) => {
              return (
                <Grid key={"pro" + index + "-" + pro.id} item xs={12}>
                  <ProjectUIList
                    pr={pro}
                    key={"pro-item" + index + "-" + pro.id}
                    setProfile={setProfile}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      {(projects.length <= 0) && 
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 150,
        height: 80,
      }}>
        <p
          style={{
            color: 'white',
            borderRadius: 30,
            background: "green",
            padding: "10px 30px",
            fontFamily: 'ubuntu',
            fontSize: 20,
            boxShadow: "2px 4px rgba(0,0,0,.1)"
          }}
        >No project added!</p>
      </div>}
    </>
  );
};

export default Projects;
