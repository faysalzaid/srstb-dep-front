
import React, { useState, useEffect } from 'react'

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
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { ErrorAlert, SuccessAlert } from "components/Alert";
import { FaPlusCircle,FaPrint } from "react-icons/fa";
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
  Button
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'

// import NewInvoice from './SingleInvoice'
import { useRef } from 'react'
import useAuth from 'hooks/useAuth'




const LetterRequestDetail = () => {
    const {authState} = useAuth()
    const [users, setUsers] = useState([])
    const [mode,setMode] = useState([])
    const [invoices, setInvoices] = useState([])
    const [slipData,setSlipData] = useState({})
    const [projects,setProject] = useState([])
    const [modeModel,setModeModel] = useState(false)
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [formValues,setFormValues] = useState({date:"",notes:"",totalPaid:"",total:0,UserId:"",ProjectId:"",PaymentModeId:""})
    const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})
    const [letterForm,setLetterForm] = useState({to:"",subject:"",message:"",ProjectId:"",UserId:"",createdBy:"",date:"",status:""})
    const modeInput = useRef()
    let amountRef = useRef()


    let {id} = useParams()
    const closeDelete = ()=>{
      setIsDeleteOpen(false)
  }
    const openDelete = (id)=>{
      setIsDeleteOpen({open:true,id:id})
  }

  const [isOpen,setIsOpen] = useState(false)
  function closeModal(){
      setIsOpen(false)
  }
  function openModal(){
    setIsOpen(true)
  }
  





  
  //  Notifications
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

    // USE EFFECT 
      useEffect(()=>{
      axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          console.log(resp.data.error);
        }else{
          setProject(resp.data.projects)
        }
      })
      axios.get(`${url}/invoice`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){

          }else{
            setInvoices(resp.data)
          }
      })

      axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
        }else{
          // const filteredClients = resp.data.filter((cl)=>cl.role==="client")
          setUsers(resp.data)
        }
      })
      axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
        const data = resp.data
        setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
      })

      axios.get(`${url}/paymentmode`,{withCredentials:true}).then((resp)=>{
       setMode(resp.data)
      })

      axios.get(`${url}/slip/${id}`,{withCredentials:true}).then((resp)=>{
        setSlipData(resp.data.slip)
        setLetterForm({to:resp.data.to,subject:resp.data.subject,message:resp.data.message,
          ProjectId:resp.data.ProjectId,UserId:resp.data.UserId,createdBy:resp.data.createdBy,
          date:resp.data.date,status:resp.data.status})
       })

  
  
  },[])

  // END OF USE EFFECT
  
  
  

  
  
const handleSubmit = async(e)=>{
  e.preventDefault();
  // console.log(formValues);
  const request = {
    ProjectId:letterForm.ProjectId,
    UserId:authState.id,
    to:letterForm.to,
    subject:letterForm.subject,
    message:letterForm.message,
    date:letterForm.date,
    createdBy:authState.username,
    status:letterForm.status

  }
  console.log(request);
  await axios.post(`${url}/slip/${id}`,request,{withCredentials:true}).then((resp)=>{
    console.log(resp.data);
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      setSlipData((prev)=>resp.data)
      setOpenSuccess({open:true,message:"Succesfully Updated"})
      closeModal()
    }
  }).catch((error)=>{
    setOpenError({open:true,message:`${error.error}`})
 
  })
}

const handleDelete = ()=>{

}
  
const printSectionRef = useRef(null);

function printSection() {
  const printContents = printSectionRef.current.innerHTML;
//   console.log(printContents);
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
//   document.body.innerHTML = originalContents;
};

// Invoice Data  


// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data
  
  
    return (
      <>
  
        <PageTitle>Letter | Requests</PageTitle>
        {/* Notifications */}
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

        {/* End of Notification */}
  
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



{/* Main Model */}
        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Request Letter</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">



        <Label>
            <span>To</span>
            <Input
              type="text"
              ref={modeInput}
              className="mt-1"
              value={letterForm.to}
              name="to"
              onChange={(e)=>setLetterForm({...letterForm,to:e.target.value})}
              required
            />
          </Label>

        <Label>
            <span>Date</span>
            <Input
              type="date"
              ref={modeInput}
              className="mt-1"
              value={letterForm.date}
              name="date"
              onChange={(e)=>setLetterForm({...letterForm,date:e.target.value})}
              required
            />
          </Label>
          <Label>
            <span>Subject</span>
            <Input
              type="text"
              ref={modeInput}
              className="mt-1"
              value={letterForm.subject}
              name="subject"
              onChange={(e)=>setLetterForm({...letterForm,subject:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
             
              name="ProjectId"
              value={letterForm.ProjectId}
              onChange={(e)=>setLetterForm({...letterForm,ProjectId:e.target.value})}
              required
            >
              <option>Select a Project type</option>
              {projects.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>



          <div className='rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-gray'>
          <Label>
            <span className='font-medium'>Notes</span>
            <Textarea
              className="mt-1 block w-full h-40 px-4 py-2 resize-none border-gray-10 outline-none"
              name="notes"
              value={letterForm.message}
              onChange={(e)=>setLetterForm({...letterForm,message:e.target.value})}
              required
            />
          </Label>
          </div>
              
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


{/* End Of Main Modle */}

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Projects " value={countsData.projectCount}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorclassName="text-orange-500 dark:text-orange-100"
              bgColorclassName="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Bids Registered" value={countsData.bidCount}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorclassName="text-green-500 dark:text-green-100"
              bgColorclassName="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Active Projects" value={countsData.activeProjects}>
            <RoundIcon
              icon={CartIcon}
              iconColorclassName="text-blue-500 dark:text-blue-100"
              bgColorclassName="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Completed Projects" value={countsData.completedProjects}>
            <RoundIcon
              icon={ChatIcon}
              iconColorclassName="text-teal-500 dark:text-teal-100"
              bgColorclassName="bg-teal-100 dark:bg-teal-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
  
        <TableContainer>
        {/* Calendar section */}
          <div className='flex'>
        <Button className="mb-4" onClick={openModal}>Update Request</Button>
        <FaPrint className='mt-2 ml-4' onClick={printSection}/>
        </div>
  
        {/* end of calendar section */}
        </TableContainer>
  
     
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
  <div class="mb-4">
    <label for="to" class="block text-gray-700 font-bold mb-2">To:</label>
    <input type="text" id="to" name="to" class="w-full px-3 py-2 border border-gray-400 rounded" placeholder="Enter recipient's email address" />
  </div>
  <div class="mb-4">
    <label for="subject" class="block text-gray-700 font-bold mb-2">Subject:</label>
    <input type="text" id="subject" name="subject" class="w-full px-3 py-2 border border-gray-400 rounded" placeholder="Enter email subject" />
  </div>
  <div class="mb-4">
    <label for="message" class="block text-gray-700 font-bold mb-2">Message:</label>
    <textarea id="message" name="message" class="w-full px-3 py-2 border border-gray-400 rounded" placeholder="Enter message"></textarea>
  </div>
  <div class="mb-4 flex justify-between">
    <div>
      <label for="date" class="block text-gray-700 font-bold mb-2">Date:</label>
      <input type="date" id="date" name="date" class="px-3 py-2 border border-gray-400 rounded" />
    </div>
    <div>
      <label for="written-by" class="block text-gray-700 font-bold mb-2">Written by:</label>
      <input type="text" id="written-by" name="written-by" class="w-full px-3 py-2 border border-gray-400 rounded" placeholder="Enter your name" />
    </div>
  </div>
  <div class="mb-4">
    <label for="project" class="block text-gray-700 font-bold mb-2">Project:</label>
    <select id="project" name="project" class="w-full px-3 py-2 border border-gray-400 rounded">
      <option value="">Select a project</option>
      <option value="project-1">Project 1</option>
      <option value="project-2">Project 2</option>
      <option value="project-3">Project 3</option>
    </select>
  </div>
  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Send Request
  </button>
</div>

       



      </>
    )


   

}




export default LetterRequestDetail