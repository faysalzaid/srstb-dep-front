import * as React from 'react';
import {useState, useEffect} from 'react';
import "./projects.scss";
import { BiDotsVerticalRounded } from 'react-icons/bi'; 
import { Divider, Button } from '@mui/material';
import {Avatar} from '@mui/material';
import {MdOutlineTaskAlt} from 'react-icons/md';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import {MdModeEditOutline, MdOutlineDeleteOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';

const ProjectUI = ({pr, setProfile,openDetail}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);  
  };
  const handleClose = () => {
      setAnchorEl(null);
  };
  

  return (
    <>
      <div class="max-w-sm rounded overflow-hidden shadow-2xl bg-green-50 dark:bg-gray-700 project">
        <div className='project-header'>
            <div className='project-icon'>{pr.name[0]}</div>
            <div className='right'>
              <div className='project-status'>{pr.status}</div>
              <BiDotsVerticalRounded className="hover: cursor-pointer dark:text-gray-300 three-dot" style={{fontSize: 20}} onClick={handleClick}/>
              <Menu
                id="fade-menu"
                MenuListProps={{
                 'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={()=>openDetail({id:pr.id})} autoFocus={false}><MdModeEditOutline style={{fontSize: 20, marginRight: 10}}/><p style={{fontFamily: 'ubuntu'}}>Edit Project</p></MenuItem>
                <MenuItem onClick={handleClose} autoFocus={false}><MdOutlineDeleteOutline style={{fontSize: 20, marginRight: 10}} /><p style={{fontFamily: 'ubuntu'}}>Delete Project</p></MenuItem>
              </Menu>
            </div>
        </div>
        <Divider style={{marginTop: 10}}/>
        <div className='title dark:text-gray-100'>
            {pr.name}
        </div>
        <div className='underscore'>
            ----
        </div>
        <div className='category'>
            {pr.category}
        </div>
        <div className='description dark:text-gray-300'>
            {pr.description}
        </div>

        <progress id="file" value={pr.percentage} max="100" className='progress'></progress>
        <p className='percentage dark:text-gray-300'>{pr.percentage}% complete</p>

        <Divider style={{marginTop: 10}}/>
        <div className='project-footer'>
            <div className='user'>
                <Avatar sx={{ width: 32, height: 32 }} src={''} />
                <div style={{ marginLeft: 5, fontFamily: 'ubuntu', fontSize: 15 }} className="name dark:text-gray-300">{pr.Bids?.map((bid)=>bid.id===pr.BidId?bid.fullname:"")}</div>
            </div>
            <Button variant="outlined" size="small" color="success" startIcon={<MdOutlineTaskAlt />}>
                Tasks
            </Button>
             
        </div>
        
      </div>
    </>
  );
}

export default ProjectUI;