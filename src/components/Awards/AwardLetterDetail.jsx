
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
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { date } from 'faker/lib/locales/az'
import TitleChange from 'components/Title/Title'
import { FiDownload } from 'react-icons/fi'




const AwardLetterDetail = () => {
    const {authState,settings} = useContext(AuthContext)
    const [awardData,setAwardData] = useState({})
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [awardForm,setAwardForm] = useState({file:"",BidId:""})
    const [bidData,setBidData] = useState([])
  
    const {id} = useParams()

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


            await axios.get(`${url}/awardletter/${id}`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
              if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
              }else{
                
                setAwardData(resp.data)
                setAwardForm({file:resp.data.file,BidId:resp.data.BidId})
              }
            })
          

            await axios.get(`${url}/bids`,{withCredentials:true}).then((resp)=>{
                // if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
                const data = resp.data.bid.filter((bd)=>bd.selected)
                setBidData(data)
                // console.log(resp.data);
              }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
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
        // console.log(timesheetForm);
        const formData = new FormData()
        formData.append('BidId',awardForm.BidId)
        formData.append('file',awardForm.file)
        // console.log(formData);
        await axios.put(`${url}/awardletter/${id}`,formData,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
            }else{
                setAwardData(resp.data)
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

      







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/awardletter/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = awardData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setAwardData(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
}



  
    return (
      <>
        <TitleChange name={`Awards | ${settings.name}`} />
        <PageTitle>Awards</PageTitle>
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

  
        {/* <CTA /> */}
        
        {/* <!-- Cards --> */}
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

        <Button size="small" onClick={openModal}>Update Award Letter</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update Awards</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          
        

          <Label>
            <span>Bidder</span>
            <Select
              className="mt-1"
              name="EmployeeId"
              value={awardForm.BidId}
              onChange={(e)=>setAwardForm({...awardForm,BidId:e.target.value})}
              required
            >
              <option value="" >Select Bidder To Award</option>
              {bidData.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.fullname} | Bid:{pr.id.slice(0,4)}</option>
              ))}
              
              
            </Select>
          </Label>

          <label htmlFor="file" className="w-full p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Change File</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                name="attach"
                onChange={(e)=>setAwardForm({...awardForm,file:e.target.files[0]})}
              />


              
        </div>
        <div className="hidden sm:block">

        <Button className="mt-6" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block  sm:hidden">
            <Button block size="large">
              Accept
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


  
        


    <div className="bg-white-100  py-8">
      <div className="max-w-8xl ">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{bidData?.map((empl)=>empl.id==awardData?.BidId?empl.fullname:"")}</h1>
          <p className="text-gray-600 mb-2">Date: {awardData?.date}</p>
          <a href={awardData.file} target='_blank' className="flex items-center text-blue-500 underline" rel="noopener noreferrer">
            <FiDownload className="mr-1" />
            Download Award Letter
          </a>
        </div>
      </div>
    </div>

      </>
    )


   

}




export default AwardLetterDetail