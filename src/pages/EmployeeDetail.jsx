import React, { useState, useEffect, useContext,createContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'

import axios from 'axios'
import { ErrorAlert, SuccessAlert } from "components/Alert";

import { Card, CardBody } from "@windmill/react-ui";
import {
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, EyeIconOne, TrashIcon } from '../icons'    
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../config/urlConfig'
import TitleChange from 'components/Title/Title';
import { AuthContext } from 'hooks/authContext';
import useAuth from 'hooks/useAuth';
import { FaTrashAlt } from 'react-icons/fa';









function EmployeeDetail(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)



    const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" })
    const [openError, setOpenError] = useState({ open: false, message: "" });
    const {settings} = useAuth()
  


    const handleCloseSuccess = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenSuccess({ open: false, message: "" });
    };
  
  
    const handleCloseError = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenError({ open: false, message: "" });
    };



  
    function closeModal() {
      setIsModalOpen(false)
    }





    const [imagePreview, setImagePreview] = useState(null);

    // const [companyData,setCompanyData] = useState([]) 
    const date = new Date()
    const [emplForm,setEmplForm] = useState({name:"",email:"",phone:"",status:"",image:"",DepartmentId:"",DesignationId:"", AreaId: "",
          hiredDate:"",
          ssn: "",
          passportNo: "",
          contactPhone: "",
          nationality: "Ethiopian",
          address: "",
          birthday:"",
          postCode:"",})
    
    

    const [designationData,setDesignationData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    const [employeeData,setEmployeeData] = useState({})
    const [areaData,setAreaData] = useState([])

    
    const {id} = useParams()

    useEffect(()=>{
      const getData =async()=>{
        let isMounted = true
        if(isMounted){
          await axios.get(`${url}/employees/${id}`,{withCredentials:true}).then((resp)=>{
            // console.log('Employees',resp.data);
            if(resp.data.error){
              setOpenError({open:true, message:`${resp.data.error}`})
            }else{
              setEmployeeData(resp.data)
              setEmplForm(resp.data)
              setImagePreview(resp.data.image)
            }
            
        })
        await axios.get(`${url}/departments`,{withCredentials:true}).then((resp)=>{
          setDepartmentData(resp.data)
        })
  
        await axios.get(`${url}/designations`,{withCredentials:true}).then((resp)=>{
          setDesignationData(resp.data)
        })

        await axios.get(`${url}/area`,{withCredentials:true}).then((resp)=>{
          setAreaData(resp.data.area)
        })
  
        }
        return ()=>{
          isMounted=false
        }
      }

      getData()
     
       
    },[])



    const handleImageChange = (e) => {
      // setLogo(e.target.files[0]);
      setEmplForm({...emplForm,image:e.target.files[0]})
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };



    const addEmployee =async(e)=>{
      e.preventDefault()
      if(emplForm.name==="" || emplForm.email===""||emplForm.phone===""||emplForm.status===""||emplForm.image===""||emplForm.DepartmentId===null||emplForm.DesignationId===null||emplForm.AreaId===null){
        setOpenError({open:true,message:"Please provide Dep,Des,Area and others  "})
      }else{

        
        const formData = new FormData()
        formData.append('name',emplForm.name)
        formData.append('email',emplForm.email)
        formData.append('phone',emplForm.phone) 
        formData.append('status',emplForm.status)
        formData.append('image',emplForm.image)
        formData.append('DepartmentId',emplForm.DepartmentId)
        formData.append('DesignationId',emplForm.DesignationId)
        formData.append('AreaId',emplForm.AreaId)
        formData.append('hiredDate',emplForm.hiredDate)
        formData.append('ssn',emplForm.ssn)
        formData.append('passportNo',emplForm.passportNo)
        formData.append('contactPhone',emplForm.contactPhone)
        formData.append('address',emplForm.address) 
        formData.append('birthday',emplForm.birthday)
        formData.append('postCode',emplForm.postCode)
        formData.append('nationality',emplForm.nationality)
        console.log(formData);
         axios.post(`${url}/employees/${id}`,formData,{withCredentials:true}).then((resp)=>{
          // console.log('from server',resp.data);
          if(resp.data.error){
            setOpenError({open:true, message:`${resp.data.error}`})
          }else{
              setEmployeeData((prev)=>(resp.data))
            closeModal()
            setOpenSuccess({open:true,message:"Successfully Updated"})
          
          }
        })  
      }
  }



  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = ()=>{
    setIsDeleteOpen({open:true})
}

// 



//



    const deleteEmployee = ()=>{
      axios.get(`${url}/employees/delete/${id}`).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true, message:`${resp.data.error}`})
        }
        setOpenSuccess({open:true,message:"Successfully Deleted"})
        setTimeout(() => {
          props.history.goBack()
        }, 1000);
        closeModal()
       
       setOpenSuccess({open:true,message:"Deleted Successfully"})
       closeDelete()
      })
    }



    return ( 
       <>
       <TitleChange name={`${employeeData.name} |${settings.name}`}/>
         {/* Delete Confirm section */}
         <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteEmployee}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}


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

       <PageTitle>Employee Detail</PageTitle>




          {/* Data section */}
    

    <div className="flex mt-6">



      {/* <Sidebar /> */}
      <div className="bg-white-800 text-gray-100 flex flex-col w-64 mt-6">
      <Input
            type="file"
            accept="image/*"
        
            className="hidden"
            id="file_input"
            onChange={handleImageChange}
            // value={settingsForm.logo}
          
          />
           <Label
            htmlFor="file_input"
            className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold cursor-pointer">
            Update Image
          </Label>
        {imagePreview && (
          <Card>
            <CardBody>
            <img
              className="h-200 mt-2 mb-4 object-contain"
              src={imagePreview}
              alt="Logo preview"
            
            />
            </CardBody>
            </Card>
          )}

    </div>

      <div className="flex-grow ml-6">
      <div className="mb-6">
        <div className='flex'>
        <h2 className="text-2xl font-bold mb-6 mt-3">Employee</h2>
        <FaTrashAlt className='mt-4 ml-auto text-3xl ml-2 text-red-600' onClick={openDelete}/>
        </div>
      
      <Card className='w-full'>
      <CardBody>
      <form onSubmit={addEmployee} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-2">
          <Label>
            <span>Name</span>
              <Input type="text" className="mt-1" name="name" placeholder="Empl Name"  autoComplete='off' value={emplForm.name} onChange={(e)=>setEmplForm({...emplForm,name:e.target.value})}/>
          </Label>
          <Label>
            <span>Email</span>
              <Input type="text" className="mt-1" name="email" placeholder="Empl Email"  autoComplete='off' value={emplForm.email} onChange={(e)=>setEmplForm({...emplForm,email:e.target.value})}/>
          </Label>
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Empl Phone"  autoComplete='off' value={emplForm.phone} onChange={(e)=>setEmplForm({...emplForm,phone:e.target.value})}/>
          </Label>
          <Label className="mt-1">
          <span>Status</span>
          <Select className="mt-1" name="status"  value={emplForm.status} onChange={(e)=>setEmplForm({...emplForm,status:e.target.value})}>
          <option>Select</option>
            <option>active</option>
            <option>disabled</option>
            
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Department</span>
          <Select className="mt-1" name="DepartmentId"  value={emplForm.DepartmentId} onChange={(e)=>setEmplForm({...emplForm,DepartmentId:e.target.value})} required>
          <option>Select</option>
          {departmentData.map((dep)=>
          <option key={dep.id} value={dep.id}>{dep.name}</option>
          )}
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Designation</span>
          <Select className="mt-1" name="DesignationId"  value={emplForm.DesignationId} onChange={(e)=>setEmplForm({...emplForm,DesignationId:e.target.value})} required>
          <option>Select</option>
          {designationData.map((des)=>
          <option key={des.id} value={des.id}>{des.name}</option>
          )}
            
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Area</span>
          <Select  className="mt-1" name="AreaId"  value={emplForm.AreaId} onChange={(e)=>setEmplForm({...emplForm,AreaId:e.target.value})} required>
          <option>Select</option>
          {areaData.map((des)=>
          <option key={des.id} value={des.id}>{des.name}</option>
          )} 
            
          </Select>
        </Label>

          <Label>
            <span>Hired Date</span>
              <Input type="Date" className="mt-1" name="hiredDate" placeholder="Empl Hired Date"  autoComplete='off' value={emplForm.hiredDate} onChange={(e)=>setEmplForm({...emplForm,hiredDate:e.target.value})}/>
          </Label>
          <Label>

            <span>SSN</span>
              <Input type="text" className="mt-1" name="ssn" placeholder="Empl ssn"  autoComplete='off' value={emplForm.ssn} onChange={(e)=>setEmplForm({...emplForm,ssn:e.target.value})}/>
          </Label>

          <Label>
            <span>Passport Number</span>
              <Input type="text" className="mt-1" name="passportNo" placeholder="Empl passportNo"  autoComplete='off' value={emplForm.passportNo} onChange={(e)=>setEmplForm({...emplForm,passportNo:e.target.value})}/>
          </Label>

          <Label>
            <span>Contact Phone</span>
              <Input type="text" className="mt-1" name="contactPhone" placeholder="Empl contactPhone"  autoComplete='off' value={emplForm.contactPhone} onChange={(e)=>setEmplForm({...emplForm,contactPhone:e.target.value})}/>
          </Label>

          <Label>
            <span>Nationality</span>
              <Input type="text" className="mt-1" name="nationality" placeholder="Empl nationality"  autoComplete='off' value={emplForm.nationality} onChange={(e)=>setEmplForm({...emplForm,nationality:e.target.value})}/>
          </Label>
          <Label>
            <span>Address</span>
              <Input type="text" className="mt-1" name="address" placeholder="Empl address"  autoComplete='off' value={emplForm.address} onChange={(e)=>setEmplForm({...emplForm,address:e.target.value})}/>
          </Label>

          <Label>
            <span>BirthDate</span>
              <Input type="date" className="mt-1" name="birthday" placeholder="Empl birthday"  autoComplete='off' value={emplForm.birthday} onChange={(e)=>setEmplForm({...emplForm,birthday:e.target.value})}/>
          </Label>
          <Label>
            <span>PostCode</span>
              <Input type="text" className="mt-1" name="postCode" placeholder="Empl Postcode"  autoComplete='off' value={emplForm.postCode} onChange={(e)=>setEmplForm({...emplForm,postCode:e.target.value})}/>
          </Label>

      
          
          
        <Label className="mt-6 text-2xl w-full">
          <Button type="submit">Save</Button>
        </Label>
        </div>
          </form>
              
          </CardBody>
          </Card>
          </div>







        </div>
    </div>
        
          {/* End of data section */}



      </>
     );
}

export default EmployeeDetail;

