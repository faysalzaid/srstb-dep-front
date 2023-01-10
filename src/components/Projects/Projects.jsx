import React from 'react';
import {useState, useEffect} from 'react';
import { Grid } from '@mui/material';
import ProjectUI from './ProjectUI';
import ProjectUIList from './ProjectUIList';
import "./projects.scss";
import {BsGrid, BsList} from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { url } from 'config/urlConfig';

const Projects = () => {
  const statuses = {not_started: "Not Started", ongoing: "Ongoing", done: "Done"}
  
  const [list, setList] = useState(true);

  
  const {isLoading,data} = useQuery('project-list',()=>{
    return axios.get(`${url}/projects`).then((resp)=>resp.data)
  })

  const query = []
  if(!isLoading){
    query = data
  }

  const projects = [
    {
      id: 1,
      name: "Angular JS",
      category: "Frontend Development",
      description: "Master Angular 5 from the basics to building an advanced application with Firebase's Firestore as well",
      progress: 65,
      status: statuses.ongoing,
      added_by: {
        name: "Ousman Seid Mahmud Zein Mahmud",
        url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
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
        url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
      }
    }
  ]
  return (
  <>
   
      <div className='header'>
          <div className={list? "icon-div-list" : "icon-div"} onClick={()=>setList(true)}><BsList style={{fontSize: 24}}/></div>
          <div className={!list? "icon-div-list" : "icon-div"} onClick={()=>setList(false)}><BsGrid style={{fontSize: 20}}/></div>
      </div>
    {!list &&
      <div className='container-div'>
        <Grid container spacing={2}>
          {
            projects.map((pro,index) => {
              return (
                <Grid key={"pro"+index+"-"+pro.id} item xs={12} sm={6} lg={4} xl={3}>
                    <ProjectUI pr={pro} key={"pro-item"+index+"-"+pro.id}/>
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
                    <ProjectUIList pr={pro} key={"pro-item"+index+"-"+pro.id} />
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