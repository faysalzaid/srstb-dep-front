import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
// import { EditIcon,EyeIcon,EyeIconOne, TrashIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import * as Yup from 'yup'
// import response from '../utils/demo/tableData'
import { useContext } from 'react'
import { AuthContext } from '../../hooks/authContext'
import { url } from 'config/urlConfig'
import { ErrorAlert, SuccessAlert } from "components/Alert";
import useAuth from 'hooks/useAuth'

// make a copy of the data, for the second table







function ProfilePage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {settings,authState,setAuthState} = useAuth(AuthContext)
//   console.log(authState);
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }


  
  const {id} = useParams()



  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}






    
    //COMAPNY DATA STATES
    const [companyData,setCompanyData] = useState([])
    const [companyFormData,setCompanyFormData] = useState({name:"",location:"",UserId:""})
    const [errorMessage,setErrorMessage] = useState('')
    const [frontErrorMessage,setFrontErrorMessage] = useState('')
    const [showModal, setShowModal] = useState({show:false,id:""});
    const [users,setUsers] = useState([])

    //ENDOF COMPANY DATA

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





  useEffect(()=>{
    const companyFetch = async()=>{
        const response = await axios.get(`${url}/companies/${id}`,{withCredentials:true})
        if(response.data.error) setFrontErrorMessage(response.data.error)
        setCompanyData(response.data)
        setCompanyFormData({name:response.data.name,location:response.data.location,UserId:response.data.UserId})
        // console.log(response.data);
        // console.log('this is from params',id);
    }

    axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){

      }else{
        const data = resp.data.filter((usr)=>usr.role=="client")
        setUsers(data)
      }
    })
    companyFetch()
  },[])


  const updateCompany =async(e)=>{
    e.preventDefault()
    // console.log(e.data);
    if(companyFormData.name==="" || companyFormData.location===""){
      setErrorMessage('Please Provide all data')  
    }else{
      const response = await axios.post(`${url}/companies/${id}`,companyFormData,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setErrorMessage(resp.data.error)
        }else{
          setCompanyData(resp.data)
          setOpenSuccess({open:true,message:"Successfully Added"})
          closeModal()
        }
      // console.log(companyFormData);
      })
    }

}
const deleteCompany =async()=>{
  const response = await axios.get(`${url}/companies/delete/${id}`,{withCredentials:true}).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      setOpenSuccess({open:true,message:"Successfully Deleted"})
      closeDelete()
      props.history.push('/app/companies')
      
    }
  })
}
  return (
    <>
      <PageTitle>{authState.username} | Profile Page</PageTitle>
        {/* Notification Section */}
        <ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
        horizontal="right"
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
        horizontal="right"
      />

      {/* Delete Confirm section */}
      <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteCompany}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}
     

      <div>
        <Button onClick={openModal} style={{backgroundColor:'green'}}>Update Data</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Update Company Info</ModalHeader>
        <span style={{color:'red'}}>{errorMessage}</span>
        <ModalBody>
          
        <form onSubmit={e=>{updateCompany(e)}}>
        <Label>
          <span>Name</span>
            <Input type="text" className="mt-1" name="name" placeholder="Company Name" value={companyFormData.name} autoComplete='off' onChange={e=>setCompanyFormData({...companyFormData, name:e.target.value})}/>
        </Label>
        <Label>
          <span>Location</span>
          <Input type="text" className="mt-1" name="location" placeholder="Jijiga"  value={companyFormData.location} onChange={e=>setCompanyFormData({...companyFormData,location:e.target.value})}/>
        </Label>
        <Label>
            <span>Customer</span>
            <Select
              className="mt-1"
              name="contractType"
              value={companyFormData.UserId}
              onChange={(e)=>setCompanyFormData({...companyFormData,UserId:e.target.value})}
              required
            >
              <option >Select a Customer type</option>
              {users.map((usr,i)=>(
                <option key={i} value={usr.id}>{usr.name}</option>
              ))}
              
            </Select>
          </Label>

        <Button className="mt-4" type="submit">Save</Button>
        </form>
            
   
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
         
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

  




                {/* Profile Detail */}

<div className="bg-gray-50  flex flex-col justify-center py-12 sm:px-9 lg:px-8">
  <div className="w-full">
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex justify-between items-center">
          <div className=" items-center">
            <img src={authState.image} alt="Company Logo" style={{width:200}} className=" mr-2" />
            <h2 className="text-lg font-medium text-gray-900">{'contracts.subject'}</h2>
          </div>
         
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900">User Information</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-medium text-gray-500">UserName:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{authState.username}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">Email:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{authState.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900">Project Information</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-medium text-gray-500">Role Info:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{authState.role}</p>
            </div>
         
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900"> Status</h3>
          <div className="mt-2">
            
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">Status:</p>
              <p className="ml-2 text-sm font-medium text-gray-900"><span className='text-teal-500 dark:text-teal-100'>{authState.status}</span></p>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              



                {/* Endof Profiel detail */}
    </>
  )
}

export default ProfilePage
