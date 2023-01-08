import React from 'react';
import { Grid } from '@mui/material';
import ProjectUI from './ProjectUI';
import "./projects.scss";

const Projects = () => {
  const statuses = {not_started: "Not Started", ongoing: "Ongoing", done: "Done"}
  
  const projects = [
    {
      id: 1,
      name: "Angular JS",
      category: "Frontend Development",
      description: "Master Angular 5 from the basics to building an advanced application with Firebase's Firestore as well",
      progress: 65,
      status: statuses.ongoing,
      added_by: {
        name: "Ousman Seid",
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
  )
}

export default Projects