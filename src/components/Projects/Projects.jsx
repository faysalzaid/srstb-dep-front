import React from 'react';
import {useState, useEffect} from 'react';
import { Grid, Button } from '@mui/material';
import ProjectUI from './ProjectUI';
import ProjectUIList from './ProjectUIList';
import "./projects.scss";
import {BsGrid, BsList} from 'react-icons/bs';
import {BiSearch, BiAddToQueue} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';
import ShowPhoto from './ShowPhoto';
import {MdClose} from 'react-icons/md';

const Projects = () => {
  const statuses = {not_started: "Not Started", ongoing: "Ongoing", done: "Done"}
  
  const [list, setList] = useState(true);
  const [search, setSearch] = useState("");

  const startProjects = [
    {
      id: 1,
      name: "Angular JS",
      category: "Frontend Development",
      description: "Master Angular 5 from the basics to building an advanced application with Firebase's Firestore as well",
      progress: 65,
      status: statuses.ongoing,
      added_by: {
        name: "Ousman Seid",
        url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        job: "Main Director",
        phone: "+251921114160",
        email: "ousmanseid333@gmail.com",
        address: "Jigjiga city"
      }
    },
    {
      id: 2,
      name: "Codeigniter",
      category: "Backend Development",
      description: "Learn Php Codeigniter and understand working with MVC and HMVC from zero to nero",
      progress: 80,
      status: statuses.done,
      added_by: {
        name: "Ousman Seid",
        url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        job: "Main Director",
        phone: "+251921114160",
        email: "ousmanseid333@gmail.com",
        address: "Jigjiga city"
      }
    }
  ];
  const [projects, setProjects] = useState(startProjects);

  const handleCloseProfile = () => {
    setProfile({title: "", url: "", open: false})
  };

  const [profile, setProfile] = useState({title: "", url: "", open: false});

  return (
  <>
      <ShowPhoto open={profile.open??false} handleClose={handleCloseProfile} profile={profile}/>
      <div className='header'>
        <div className='start dark:text-gray-100'>
          All Projects
        </div>
       
        <div className='end'>
          <div className='search'>
            <input placeholder="Search" 
               value={search}
               onChange={(e)=>{
                  let s = e.target.value;
                  let pr = startProjects.filter((p)=>p.name.toLocaleLowerCase().startsWith(s));
                  setProjects((prev)=>pr);
                  setSearch((prev)=>s);
               }} />
            <BiSearch className='icon'/>
            <MdClose 
              onClick={()=>{
                  setProjects((prev)=>startProjects);
                  setSearch((prev)=>"");
              }}
              className='close'/>
          </div>
          <div className={list? "icon-div-list" : "icon-div"} onClick={()=>setList(true)}><BsList style={{fontSize: 22}}/></div>
          <div className={!list? "icon-div-list" : "icon-div"} onClick={()=>setList(false)}><BsGrid style={{fontSize: 20}}/></div>
          {/* <div className={!list? "icon-div-list" : "icon-div"} onClick={()=>setList(false)}><BiAddToQueue style={{fontSize: 22}}/></div> */}
          <Button variant="contained" size="small" style={{borderRadius: 3, backgroundColor: '#0052cc', textTransform: 'capitalize', fontSize: 14}} color="success" startIcon={<AiOutlinePlus />}>
                <p style={{marginTop: 0}}>Add Project</p>
          </Button>
        </div>
      </div>
    {!list &&
      <div className='container-div'>
        <Grid container spacing={2}>
          {
            projects.map((pro,index) => {
              return (
                <Grid key={"pro"+index+"-"+pro.id} item xs={12} sm={6} lg={4} xl={3}>
                    <ProjectUI pr={pro} key={"pro-item"+index+"-"+pro.id} setProfile={setProfile}/>
                </Grid>
              )
            })
          
          }
        </Grid>
      </div>
    }

   {list &&
      <div className='container-div'>
        <Grid container spacing={0.5}>
          {
            projects.map((pro,index) => {
              return (
                <Grid key={"pro"+index+"-"+pro.id} item xs={12}>
                    <ProjectUIList pr={pro} key={"pro-item"+index+"-"+pro.id} setProfile={setProfile} />
                </Grid>
              )
            })
          
          }
        </Grid>
      </div>
    }
  </>
  )
}

export default Projects