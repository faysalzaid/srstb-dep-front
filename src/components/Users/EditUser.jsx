import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { IconButton, Grid } from '@mui/material';
import { MdClose, MdCached, MdCancel, MdDateRange } from 'react-icons/md';

import { TextField, Dropdown, RichTextInput, DateInput } from 'components/Projects/Inputs/Inputs';
import { MdPhoneInTalk, MdPerson, MdOutlineMailOutline } from 'react-icons/md';
import {AiOutlineCheckCircle, AiOutlineMail} from 'react-icons/ai';
import { useEffect, useState } from 'react';

import {AiFillSetting, AiFillPlusCircle} from 'react-icons/ai';
import {BsFillPersonFill, BsFillShieldLockFill} from 'react-icons/bs';
import { TbColorPicker } from 'react-icons/tb';

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const EditUser = ({open, handleClose, user}) => {

  const [formData, setFormData] = useState({
    fullName: {value: user.name, error: "", optional: false},
    phone: {value: user.phone, error: "", optional: false},
    status: {value: "", error: "", optional: false},
    email: {value: "", error: "", optional: false},
    employeeId: {value: "", error: "", optional: false},
    department: {value: "", error: "", optional: false},
    position: {value: "", error: "", optional: false},
    employeeType: {value: "", error: "", optional: false},
    area: {value: "", error: "", optional: false},
    hiredDate: {value: "", error: "", optional: false},
    ssn: {value: "", error: "", optional: false},
    passportNo: {value: "", error: "", optional: false},
    contactTel: {value: "", error: "", optional: false},
    national: {value: "", error: "", optional: false},
    address: {value: "", error: "", optional: false},
    birthday: {value: "", error: "", optional: false},
    localname: {value: "", error: "", optional: false},
    automobileLicense: {value: "", error: "", optional: false},
    officeTel: {value: "", error: "", optional: false},
    religion: {value: "", error: "", optional: false},
    postcode: {value: "", error: "", optional: false},
    mobile: {value: "", error: "", optional: false},
    city: {value: "", error: "", optional: false},
    gender: {value: "", error: "", optional: false},
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  
  useEffect(()=>{

    setFormData({
      fullName: {value: user?.name, error: "", optional: false},
      phone: {value: user?.phone, error: "", optional: false},
      status: {value: user?.status, error: "", optional: false},
      email: {value: user?.email, error: "", optional: false},
    });

  },[user.id]);


  const statuses = [
    {
      id: "active",
      name: "Active"
    },
    {
      id: "disabled",
      name: "InActive"
    }
  ]
  const departmentOptions = [
    {
      id: 1,
      name: "Department 1"
    },
    {
      id: 2,
      name: "Department 2"
    }
  ]

  const positionOptions = [
    {
      id: 1,
      name: "Position 1"
    },
    {
      id: 2,
      name: "Position 2"
    }
  ]

  const employeeTypeOptions = [
    {
      id: 1,
      name: "Employee Type 1"
    },
    {
      id: 2,
      name: "Employee Type 2"
    }
  ]

  const areaOptions = [
    {
      id: 1,
      name: "Area 1"
    },
    {
      id: 2,
      name: "Area 2"
    }
  ]

  const genderOptions = [
    {
      id: 1,
      name: "Male"
    },
    {
      id: 2,
      name: "Female"
    }
  ]

  const submitUpdate = () => {
      //copy formData to new FormData object and then bla bla bla bla...
      //after sumbit.then((bla)=>{bla bla...}) then call handleClose(); and reload user info from parent
      handleClose();
  }

  const [tab, setTab]  = useState(1);
  
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
        fullWidth={true}
        fullScreen={fullScreen}
      >
            <div style={{minWidth: 500, fontFamily: 'ubuntu'}}>
   
                    <Grid container>
                        <Grid item xs={12} sm={4} style={{background: '#f1f1f1'}}>
                             <div className='flex  flex-col' style={{minHeight: '37vh'}}>
                                <div className='pt-6 w-full'>
                                    <div className='flex justify-center'>
                                        <div className='relative'>
                                            <img className="rounded-full border-4" style={{width: 110, height: 110}} src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"/>
                                            <IconButton
                                              style={{
                                                position: 'absolute',
                                                zIndex: 100,
                                                top: 0,
                                                right: -10,
                                                fontSize: 30,
                                                color: '#3fa6cf'
                                             }}
                                             onClick={()=>{

                                             }}
                                            >
                                                <AiFillPlusCircle />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <p className= 'text-center text-lg text-gray-600 font-bold mt-1' style={{}}>Faysal Ali</p>
                                </div>
                                <div className='w-full mt-10'>
                                    <div className={`flex justify-start items-center pb-1 pt-1 mb-4 ${tab==1 ? 'border-l-4': ''} cursor-pointer`} style={{borderColor: '#3fa6cf'}} onClick={()=>setTab(1)}>
                                       <AiFillSetting fontSize={17} color={tab==1 ? "#3fa6cf" : '#c7c7c7'} className='ml-5'/>
                                       <p className='ml-4 text-gray-500 text-lg' style={{color: tab==1 ? "#3fa6cf" : '', fontSize: 16}}>Account Settings</p>
                                    </div>
                                    <div className={`flex justify-start items-center pb-1 pt-1 mb-4 ${tab==2 ? 'border-l-4': ''} cursor-pointer`} style={{borderColor: '#3fa6cf'}} onClick={()=>setTab(2)}>
                                       <BsFillPersonFill fontSize={17} color={tab==2 ? "#3fa6cf" : '#c7c7c7'} className='ml-5'/>
                                       <p className='ml-4 text-gray-500' style={{color: tab==2 ? "#3fa6cf" : '', ontSize: 16}}>Personal Information</p>
                                    </div>
                                    <div className={`flex justify-start items-center pb-1 pt-1 mb-4 ${tab==3 ? 'border-l-4': ''} cursor-pointer`} style={{borderColor: '#3fa6cf'}} onClick={()=>setTab(3)}>
                                       <BsFillShieldLockFill fontSize={17} color={tab==3 ? "#3fa6cf" : '#c7c7c7'} className='ml-5'/>
                                       <p className='ml-4 text-gray-500' style={{color: tab==3 ? "#3fa6cf" : '', fontSize: 16}}>Privacy </p>
                                    </div>
                                </div>
                            </div>
                            
                        </Grid>
                        <Grid item xs={12} sm={8} className='bg-[#ffffff]' style={{marginBottom: 50}}>
                             {tab==1 && <div className='flex justify-start pl-10 pt-10 items-center w-full'>
                                    <Grid container spacing={2} style={{marginRight: 25}}>
                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                            <p className='text-xl'>Account Settings</p>
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="fullName"
                                                labelText={"Full Name"}
                                                placeholder="Enter name"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdPerson />}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="email"
                                                labelText={"Email"}
                                                placeholder="Enter email"
                                                style={{
                                                    marginBottom: 5,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdOutlineMailOutline />}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="phone"
                                                labelText={"Phone number"}
                                                placeholder="Enter phone number"
                                                style={{
                                                    marginBottom: 2,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10,
                                                }}
                                                className={``}
                                                startIcon={<MdPhoneInTalk fontSize = {19}/>}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="status"
                                                options={statuses}
                                                labelText="Status"
                                                open={open}
                                                selectText="Select Status"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                inputStyle={{
                                                
                                                }}
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="department"
                                                options={departmentOptions}
                                                labelText="Department"
                                                open={open}
                                                selectText="Select Department"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                inputStyle={{
                                                
                                                }}
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>

                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="position"
                                                options={positionOptions}
                                                labelText="Position"
                                                open={open}
                                                selectText="Select Position"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                inputStyle={{
                                                
                                                }}
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>

                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="area"
                                                options={areaOptions}
                                                labelText="Area"
                                                open={open}
                                                selectText="Select Area"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                inputStyle={{

                                                }}
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>
                                        
                                        <Grid item sm={12} lg={6}>
                                            <DateInput 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="hiredDate"
                                                labelText={"Hired Date"}
                                                type="desktop"
                                                inputStyle={{
                                                    marginBottom: 5,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdDateRange />}
                                                endIcon={<TbColorPicker />}
                                            />
                                        </Grid>

                                    </Grid>
                             </div>}


                             {tab==2 && <div className='flex justify-start pl-10 pt-10 items-center w-full'>
                                    <Grid container spacing={2} style={{marginRight: 25}}>
                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                            <p className='text-xl'>Personal Information</p>
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="ssn"
                                                labelText="SSN"
                                                placeholder="Enter ssn"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="passportNo"
                                                labelText="Passport number"
                                                placeholder="Enter passport no"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="contactTel"
                                                labelText="Contact Tel"
                                                placeholder="Enter contact phone"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="national"
                                                labelText="Nationality"
                                                placeholder="Enter nationality"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="address"
                                                labelText="Address"
                                                placeholder="Enter address"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <DateInput 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="birthday"
                                                labelText="Birthday"
                                                type="desktop"
                                                inputStyle={{
                                                    marginBottom: 5,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdDateRange />}
                                                endIcon={<TbColorPicker />}
                                            />
                                        </Grid>
                                    </Grid>
                              </div>}

                              {tab==3 && <div className='flex justify-start pl-10 pt-10 items-center w-full'>
                                    <Grid container spacing={2} style={{marginRight: 25}}>
                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                            <p className='text-xl'>Privacy</p>
                                        </Grid>

                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="postcode"
                                                labelText="Postcode"
                                                placeholder="Enter postcode"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>

                                    </Grid>
                              </div>}

                        </Grid>
                    </Grid>

            </div>
      </Dialog>
    </div>
  );
}

export default EditUser;