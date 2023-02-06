import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { RichTextLight, TextField, Dropdown } from 'components/Projects/Inputs/Inputs';
import {A1, A2, A3, A4, A5, A6} from './avatars';
import { BsPersonPlus } from 'react-icons/bs';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewMessageDialog = ({open, handleClose, messages, setMessages}) => {
 
  const [formData, setFormData] = useState({
      to: {value: "", error: "", optional: false},
      subject: {value: "", error: "", optional: false},
      message: {value: "", error: "", optional: false},
  })

  const [users, setUsers] = useState([
    {
      id: 1, 
      name: 'Ousman Seid',
      url: A1
    },
    {
      id: 2,
      name: "Faysal Ali",
      url: A2
    },
    {
      id: 3,
      name: "Khadar Baxar",
      url: A3,
    }
  ])

  const handleSend = () => {
    if(!formData.to.value || !formData.message.value || !formData.subject.value)
      return
     let msgs = messages;
     let user = {}
     users.map((usr)=>{
       if(usr.id === formData.to.value) {
          user = {
            id: usr.id,
            name: usr.name,
            url: usr.url,
            email: usr.email
          }
       }
     })
     msgs.push(
        {
          id: messages.length+1,
          to: user,
          subject: formData.subject.value,
          message: formData.message.value,
          time: "feb 2",
          read: false,
        }
     )
     setMessages((prev)=>msgs)
     const emp = {
      to: {value: "", error: "", optional: false},
      subject: {value: "", error: "", optional: false},
      message: {value: "", error: "", optional: false},
     }
     setFormData((prev)=>emp)
     handleClose();
  }
  return (
    <div style={{minWidth: 300}}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="new-message"
        fullWidth="lg"
      >
        {/* {background: '#f2f6fc', color: '#041e49',} */}
        <DialogTitle style={{fontFamily: 'ubuntu'}} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {"New Message"}
        </DialogTitle>
        <DialogContent className='dark:bg-gray-800'>
          <DialogContentText id="new-message" className='pt-4'>
            <div className=''>
                <Dropdown
                    formData={formData}
                    setFormData={setFormData}
                    label="to"
                    options={users}
                    labelText="Send to"
                    open={open}
                    startIcon={<BsPersonPlus/>}
                    //selectText="Not Selected"
                    style={{
                      marginBottom: 30
                    }}
                />
                <TextField
                    formData={formData}
                    setFormData={setFormData}
                    label="subject"
                    labelText="Subject"
                    placeholder="Enter subject"
                    containerStyle={{
                       marginBottom: 30
                    }}
                />
                <RichTextLight
                    formData={formData}
                    setFormData={setFormData}
                    label="message"
                    labelText="Message"
                    isDark={false}
                />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='mb-2'>
          <Button 
            onClick={handleClose}
            variant="contained" 
            color="error"
            size="small"
            style={{
                backgroundColor: '#747475',
                fontFamily: 'ubuntu'
            }}
          >Cancel</Button>
          <Button 
            onClick={()=>{
                handleSend()
            }}
            variant="contained" 
            color="success"
            size="small"
           
            style={{
                fontFamily: 'ubuntu',
                marginLeft: 20,
                marginRight: 15
            }}
          >Send message</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewMessageDialog;