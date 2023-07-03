
import React, { useState, useEffect,Fragment } from 'react'

import CTA from '../../components/CTA'
import InfoCard from '../../components/Cards/InfoCard'
import ChartCard from '../../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../../components/Chart/ChartLegend'
import PageTitle from '../../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import response from '../../utils/demo/tableData'
import { PlusCircleIcon } from "@heroicons/react/outline";
import { DocumentAddIcon } from '@heroicons/react/outline';
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { ErrorAlert, SuccessAlert } from "components/Alert";


import {
  TableBody,
  TableContainer, 
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
} from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'
import TitleChange from 'components/Title/Title'
import { FilledInput } from '@mui/material'
import { FaArchive, FaChevronDown, FaFile, FaFileArchive, FaRegFileArchive, FaTrash } from 'react-icons/fa'




const ArchivesList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [departmentData,setDepartmentData] = useState([])
    const [archiveData,setArchiveData] = useState([])
    const [depFilter,setDepFilter] = useState(0)
    const [dateFilter,setDateFilter] = useState(0)
    const [ allData,setAllData ]=  useState([])
    const [holdData,setHoldData] = useState([])
    const [archiveForm,setArchiveForm] = useState({
        date:"",
        filename:"",
        DepartmentId:"",
        fileUrl:""

    })


    // Notifications
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

    // End of notifications
    const [isOpen,setIsOpen] = useState(false)
    function closeModal(){
        setIsOpen(false)
    }
    function openModal(){
        setIsOpen(true)
    }



      useEffect(()=>{
        const getData=async()=>{
            await axios.get(`${url}/archive`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
              }else{
                setArchiveData(resp.data)
                setHoldData(resp.data)
                setAllData(resp.data)
              }
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          
            await axios.get(`${url}/departments`,{withCredentials:true}).then((resp)=>{
                setDepartmentData(resp.data)
            }).catch((error)=>{
              if (error.response && error.response.data && error.response.data.error) {
                  setOpenError({open:true,message:`${error.response.data.error}`});
                } else {
                  setOpenError({open:true,message:"An unknown error occurred"});
                }
          })
      
           

          
            await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
              const data = resp.data
              setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
        
        }

        getData()
    
    },[])

      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
      //  console.log(archiveForm);
       const formData = new FormData()
       formData.append('filename',archiveForm.filename)
       formData.append('fileUrl',archiveForm.fileUrl)
       formData.append('date',archiveForm.date)
       formData.append('DepartmentId',archiveForm.DepartmentId)
       
        await axios.post(`${url}/archive`,formData,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setArchiveData((prev)=>[...prev,resp.data])
            setOpenSuccess({open:true,message:"Successfully Added"})
            closeModal();   
          }

        }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })

       
      };

      
      useEffect(()=>{
        setFetchedResult(searchTerm.length<1?archiveData:searchResult)
      },[archiveData,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = archiveData?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(archiveData)
      }
    }







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/archive/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){  
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        const data = archiveData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setArchiveData(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()

      }
        
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
}



  const filterByDep = async()=>{
    if(depFilter==0){
      // console.log(depFilter);
      setArchiveData(allData)
    }else{
      // console.log('else part',depFilter);
      let newData = holdData.filter((ar)=>ar.DepartmentId===depFilter)
      setArchiveData(newData)
    }
  }


  const filterByDate = async()=>{
    if(depFilter===0){
      // console.log('dep is 0');
      let newData = holdData.filter((ar)=>ar.date===dateFilter)
      setArchiveData(newData)
    }else{
      let newData = archiveData.filter((ar)=>ar.date===dateFilter)
      setArchiveData(newData)
    }


  }



  
    return (
      <>
        <TitleChange name={`Archives | ${settings.name}`} />
        <PageTitle>Archives</PageTitle>
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
                    <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleDelete}>
                      Confirm
                    </button>
                  </ModalFooter>
              </Modal>
        {/* End of delete Section */}
      
      {/* Search section */}
        <div className='mb-5'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Companies, Locations..." required />
        </div>
            
        </div>
        {/* End of search List */}

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Projects " value={countsData.projectCount}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Bids Registered" value={countsData.bidCount}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Active Projects" value={countsData.activeProjects}>
            <RoundIcon
              icon={CartIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Completed Projects" value={countsData.completedProjects}>
            <RoundIcon
              icon={ChatIcon}
              iconColorClass="text-teal-500 dark:text-teal-100"
              bgColorClass="bg-teal-100 dark:bg-teal-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
  



        <TableContainer>
      {/* Delete Confirm section */}
        <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleDelete}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}
        
        <Button className="items-center" size="small" onClick={openModal}>New File</Button>
  

          {/* Data section */}
          <h2 className="text-lg font-medium m-2">Filter</h2>
       <div className="flex relative inline-flex dark:bg-gray-700">
        <select onChange={(e)=>setDepFilter(e.target.value)} className="flex-2 mt-1 w-48 h-10 pl-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value={0}>All Departments</option>
          {departmentData?.map((pr)=> <option value={pr.id} key={pr.id}>{pr.name}</option>)}
         
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 ">
          <FaChevronDown className="text-gray-400" />
        </div>
      </div>
      <Button size="small" onClick={()=>filterByDep()} className="ml-3 mr-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={depFilter===0?true:false}>
        Generate
      </Button>

      <div className=" flex relative inline-flex">
        <input type='date' onChange={(e)=>setDateFilter(e.target.value)} className="flex-2 mt-1 w-48 h-10 pl-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
        </div>
      </div>
      <Button size="small" onClick={()=>filterByDate()} className="ml-3 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={dateFilter===0?true:false}>
        Generate
      </Button>
      
          {/* End of data section */}

        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register File</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-4 ">
          
          <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              name="date"
              onChange={(e)=>setArchiveForm({...archiveForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>File Name</span>
            <Input
            //   type="number"
              className="mt-1"
              name="name"
              onChange={(e)=>setArchiveForm({...archiveForm,filename:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Department</span>
            <Select
              className="mt-1"
              name="status"
              // value={formValues.ProjectId}
              onChange={(e)=>setArchiveForm({...archiveForm,DepartmentId:e.target.value})}
              required
            >
              <option value="" >Choose Department</option>
                {departmentData.map((dep)=> <option key={dep.id} value={dep.id}>{dep.name}</option>)}
               
              
              
            </Select>
          </Label>

          <Label>
            <span>File</span>
              <Input type="file" className="mt-1" name="performa" onChange={(e)=>setArchiveForm({...archiveForm,fileUrl:e.target.files[0]})} required/>
          </Label>

       
  


        </div>
        <div className="hidden sm:block">

        <Button className="mt-6" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block  sm:hidden">
            <Button block size="large" type="submit">
              Submit
            </Button>
          </div>
      
        </form>
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

          {/* <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div> */}
      </ModalFooter>
    </Modal>


    <div className="bg-gray-50 grid grid-cols-3 gap-4 mt-4 mb-4 dark:bg-gray-700">

  
  {fetchedResult.map((ar)=>
  
  <div className="flex flex-col items-left" key={ar.id}>
    <div className="p-4 rounded-lg" style={{background:`${ar.bcolor}`,opacity:0.6}}>
      <i className="ri-file-line text-3xl" style={{color:`${ar.color}`}}>
        <a href={`${ar.fileUrl}`} target='_blank'>
        <BsFillFileEarmarkArrowDownFill/>
        </a>
        
      </i>
      <FaTrash className='ml-auto text-red-900 text-xl mt-2' onClick={()=>openDelete(ar.id)}/>
      
    </div>
    <p className="m-2 text-sm font-medium text-gray-900 dark:text-gray-300" >{ar.filename}</p>
  </div>
  
  )}

    <div className='inline-block align-baseline '>
    {archiveData.length==0&&<h2 className='font-bold'>No Archive Data</h2>}
    </div>


 
</div>




      </>
    )


   

}




export default ArchivesList