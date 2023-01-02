import React, {useState} from 'react'
import {MdKeyboardArrowDown} from 'react-icons/md';
import {Menu, MenuItem} from '@mui/material';

const FromChat = ({avatar, chats, setChats, chat, url, to}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const deleteChat = (e) => {
     fetch(url+"/chat/delete/"+chat.id+"/"+to,{
         credentials: 'include',
         method: 'DELETE',
     }).then((res)=>res.json()).then((resp)=>{
        let chts = [];
        resp.map((val)=>{
          chts.push({id: val.id, message:val.message, type: val.type})
        });
        setChats((_)=>chts)
     })
  }
  console.log(avatar)

  return (
    <div className='chat-div'>
        <img src={avatar} className="chat-ui-avatar-from" />
        <div className='chatFrom'>
            <div className='message bg-black bg-opacity-10 dark:bg-blue-300'><p>{chat.message}<span className="editChat" onClick={handleClick}><MdKeyboardArrowDown/></span></p></div>
        </div>
        <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
        >
            {/* <MenuItem onClick={handleClose}>Reply</MenuItem> */}
            <MenuItem 
            onClick={()=>{
                deleteChat();
                handleClose();
            }}>Delete Chat</MenuItem>
        </Menu>
    </div>
  )
}

export default FromChat;