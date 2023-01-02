import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import axios from 'axios'

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
import { EditIcon, EyeIconOne, TrashIcon } from '../icons'    
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../config/urlConfig'
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'

function EmployeeDetail(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    // const [companyData,setCompanyData] = useState([]) 
    const [desForm,setDestForm] = useState({name:"",DepartmentId:""}) 
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState("")
    const [designationData,setDesignationData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    const [employeeData,setEmployeeData] = useState({})
    const [emplForm,setEmplForm] = useState({name:"",email:"",phone:"",status:"",image:"",DepartmentId:"",DesignationId:""}) 
    const[grappedDep,setGrappedDep] = useState({})  
    const[grappedDes,setGrappedDes] = useState({})    

    const {id} = useParams()


    const [authState] = useContext(AuthContext)

    


    useEffect(()=>{
      const getData = async()=>{
        await axios.get(`${url}/departments/${employeeData.DepartmentId}`).then((resp)=>{
          setGrappedDep(resp.data)
        })
      }
      getData()

    },[employeeData])

    useEffect(()=>{
      const getData = async()=>{
        await axios.get(`${url}/designations/${employeeData.DesignationId}`).then((resp)=>{
          setGrappedDes(resp.data)
        })
      }
      getData()

    },[employeeData])



    useEffect(()=>{
        axios.get(`${url}/employees/${id}`).then((resp)=>{
            // console.log('Employees',resp.data);
            if(resp.data.error){
              setErrorMessage(resp.data.error)
            }else{
              const d = resp.data
              setEmployeeData(resp.data)
              setEmplForm({name:d.name,email:d.email,phone:d.phone,status:d.status,image:d.image,DepartmentId:d.DepartmentId,DesignationId:d.DesignationId})
            }
            
        })
    },[])


    useEffect(()=>{
      axios.get(`${url}/departments`).then((resp)=>{
        setDepartmentData(resp.data)
      })
    },[])

    useEffect(()=>{
        axios.get(`${url}/designations`).then((resp)=>{
          setDesignationData(resp.data)
        })
      },[])





    const updateEmployee = async(e)=>{
      e.preventDefault()
      // console.log('This is from bid data',bidFormData);
      let depId = emplForm.DepartmentId
      let desId = emplForm.DesignationId
     
      if(emplForm.name==="" || emplForm.email===""||emplForm.phone===""||emplForm.status===""||emplForm.image===""||emplForm.DepartmentId===""||emplForm.DesignationId===""){
        setErrorMessage('Please Provide all data')
      }else{
        if(emplForm.DepartmentId!==employeeData.DepartmentId && emplForm.DesignationId!==employeeData.DesignationId){
          const grappedDepartment = await axios.get(`${url}/departments/name/${emplForm.DepartmentId}`)
          const grappedDesignation = await axios.get(`${url}/designations/name/${emplForm.DesignationId}`)
          desId = grappedDesignation.data.id
          depId = grappedDepartment.data.id
        }else if(emplForm.DepartmentId!==employeeData.DepartmentId){
          const grappedDepartment = await axios.get(`${url}/departments/name/${emplForm.DepartmentId}`)
          depId = grappedDepartment.data.id
        }else if(emplForm.DesignationId!==employeeData.DesignationId){
          const grappedDesignation = await axios.get(`${url}/designations/name/${emplForm.DesignationId}`)
          desId = grappedDesignation.data.id
        }

        
        const formData = new FormData()
        formData.append('name',emplForm.name)
        formData.append('email',emplForm.email)
        formData.append('phone',emplForm.phone)
        formData.append('status',emplForm.status)
        formData.append('image',emplForm.image)
        formData.append('DepartmentId',depId)
        formData.append('DesignationId',desId)
        console.log('data from formdata',formData);
         axios.post(`http://localhost:4000/employees/${id}`,formData).then((resp)=>{
          if(resp.data.error){
            setErrorMessage(resp.data.error)
          }else{
              const d = resp.data
              setEmployeeData(resp.data)
              setEmplForm({name:d.name,email:d.email,phone:d.phone,status:d.status,image:d.image,DepartmentId:d.DepartmentId,DesignationId:d.DesignationId})
            closeModal()
            setSuccessMessage("Successfully Updated")
            setTimeout(() => {
              setSuccessMessage("")
           }, 2000)
          }
        })  
      }
     

    }

    const deleteEmployee = ()=>{
      axios.get(`${url}/employees/delete/${id}`).then((resp)=>{
        if(resp.data.error){
            setErrorMessage(resp.data.error)
        }
        setEmployeeData({})
        closeModal()
        setSuccessMessage("Successfully Deleted")
        setTimeout(() => {
          setSuccessMessage("")
          props.history.push('/app/Employees')
        }, 1000);
      })
    }




    return ( 
    <>
     <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
    
       <PageTitle></PageTitle>
       <div>
        <form>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative mb-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        </div>
    </form>          
        </div>
       <div className='mb-5'>
          <Button onClick={openModal}>Update Employee</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Update Employee Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          
          <ModalBody>
            
        {/* Atart of the form */}
        <form onSubmit={updateEmployee} encType="multipart/form-data">
        {/* <div className="flex-auto px-4 lg:px-10 py-10 pt-0"> */}

        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
            <span>Name</span>
              <Input  className="mt-1"  name="name"   value={emplForm.name} onChange={e=>setEmplForm({...emplForm,name:e.target.value})}/>
          </Label>
          <Label>
            <span>Email</span>
              <Input type="text" className="mt-1" name="email" value={emplForm.email} placeholder="Empl Email"   autoComplete='off' onChange={e=>setEmplForm({...emplForm,email:e.target.value})}/>
          </Label>
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Empl Phone" value={emplForm.phone}  autoComplete='off' onChange={e=>setEmplForm({...emplForm,phone:e.target.value})}/>
          </Label>
          <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" value={emplForm.status} onChange={e=>setEmplForm({...emplForm,status:e.target.value})}>
          <option>Select</option>
            <option>active</option>
            <option>disabled</option>
            
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Department</span>
          <Select className="mt-1" name="DepartmentId"  onChange={e=>setEmplForm({...emplForm,DepartmentId:e.target.value})}>
            <option>Change</option>
          {departmentData.map((dep)=>
          <option key={dep.id}>{dep.name}</option>
          )}
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Designation</span>
          <Select className="mt-1" name="DesignationId"  onChange={e=>setEmplForm({...emplForm,DesignationId:e.target.value})}>
            <option>Change</option>
          {designationData.map((des)=>
          <option key={des.id}>{des.name}</option>
          )}
            
          </Select>
        </Label>

        <Label>
        <span>Image</span>
              <Input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-1 
              file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
              file:bg-white-50 file:text-blue-700 hover:file:bg-white-100" id="file_input" name="image"  autoComplete='off' onChange={e=>setEmplForm({...emplForm,image:e.target.files[0]})}/>
          </Label>
          
          
        <Label className="mt-4">
          <Button type="submit">Save</Button>
        </Label>
        
      </div>

        {/* </div> */}
        </form>

        {/* End of the form */}
          </ModalBody>
          <ModalFooter>

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

          </ModalFooter>
        </Modal>

       
  
        <SectionTitle></SectionTitle>
       
      {successMessage?
        <div className="mb-12 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMessage}.</p>
      </div>:''}



<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>


<div className="mt-12 bg-white w-full justify-top items-center">
  <div className="card w-50 bg-white  shadow-xl hover:shadow">
     <img className="w-32 -mt-20 border-8 border-white" src={`/uploads/employees/${employeeData.image}`} alt="" />
     <div className="ml-6 mt-2 text-3xl font-medium">{employeeData.name}</div>
     <div className="ml-6 font-normal text-lg">Position <Badge>{designationData.map((des)=>des.id===employeeData.DesignationId?des.name:"")}</Badge></div>
     <div className="px-6 mt-1 font-light text-sm">
       <p>
         Department:<Badge>{departmentData.map((dep)=>dep.id===employeeData.DepartmentId?dep.name:"")}</Badge>
       </p>
       <p>
         Email:<Badge>{employeeData.email}</Badge>
       </p>
       <p>
         Phone:<Badge>{employeeData.phone}</Badge>
       </p>
       <p>
         Status <Badge>{employeeData.status}</Badge>
       </p>
     </div>
     <hr className="mt-8"/>
     <div className="flex p-4">
       
       <div className="w-0 border border-gray-300">
         
       </div>
       
     </div>
  </div>
</div>



<div className="pl-0 transition-all mb-40">
      <div className="p-4">
        <div className="flex items-center gap-4 mt-4">
          <image
            src={"/uploads/project1.png"}
            class="object-cover rounded-full"
            width={100}
            height={100}
            alt="No image"
          />
          <div>
            <h2 className="text-xl font-semibold mb-2">Faysal dev</h2>
            <span class="text-md Itext-gray-500">Software Developer</span>
          </div>
          <button className="py-2 px-4 rounded bg-blue-600 flex items-center gap-2 text-white text-sm hover:bg-blue-700 ml-auto">
            {/* <PencilAltIcon className="w-4 h-4 text-white font-thin" /> */}
            Edit Profile
          </button>
        </div>
        <p class=" text-gray-500 text-md mt-4 mb-8 ">
          faysal has experience with Angular, React, and other frameworks. Great
          understanding of OOP principles, Data Structures, Algorithms, Design
          Patterns.
        </p>
      </div>
      <div>
        <div className="flex items-center gap-8 tab-indicator border-b border-gray-200 mx-5">
          <span className="active">General</span>
          <span>General</span>
          <span>General</span>
        </div>
      </div>
      <div class=" m-4 px-2 py-5">
        <div class="overflow-auto shadow bg-gray">
          <h1 class="text-xl my-2 mx-2">Employee Information</h1>
          <table class="w-max">
            
            <tbody>
              <tr class="bg-white">
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  First name
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap pl-32">
                 Faysal
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  Middle name
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap pl-32">
                  Dev
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  Last name
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap pl-32">
                  eloper
                </td>
              </tr>
              <tr class="bg-white">
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  Last name
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap pl-32">
                  eloper
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    </>
      
     );
}

export default EmployeeDetail;


