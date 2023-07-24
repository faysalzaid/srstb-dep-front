
import React, { useState, useEffect,Fragment } from 'react'
import './navbar.css'
import CTA from '../../components/CTA'
import InfoCard from '../../components/Cards/InfoCard'
import PageTitle from '../../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import ContractSection from 'components/ContractSection/ContractSection'
import { CgMenuGridR } from 'react-icons/cg'
import { BiCheckCircle, BiTime } from 'react-icons/bi'
import { Doughnut, Line } from "react-chartjs-2";
import { VscFiles } from 'react-icons/vsc'
import { FaAward, FaCircleNotch, FaCommentDot,FaCommentDots } from 'react-icons/fa'
import { GrTextAlignLeft } from 'react-icons/gr'
import { AiFillFile, AiOutlineFile,AiFillAlert,AiOutlineAlert } from 'react-icons/ai'
import { ErrorAlert, SuccessAlert } from "components/Alert";  

import {
  TableBody,
  TableContainer, 
  Button,

} from '@windmill/react-ui'
import { Card, CardBody } from '@windmill/react-ui';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea,Badge } from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'
import OverView from 'components/overview/OverView'
import BudgetList from 'components/Budgets/BudgetSection'
import BidSection from 'components/Bids/BidsSection'
import CommentSection from 'components/Comments/CommentSection'
import { useContext } from 'react'
import { AuthContext } from 'hooks/authContext'
import TitleChange from 'components/Title/Title'
import AwardSection from 'components/AwardSection/AwardSection'
import ProcurementSection from 'components/Procurement/ProcurementSection'
import ReportSection from 'components/ReportSection/ReportSection'





const PgDetail = () => {
    
    const [companyData, setCompanyData] = useState([])
    const [usersData, setUsersData] = useState([])
    const [bids, setBids] = useState([])
    const [project,setProject] = useState({})
    const [budgets,setBudgets] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [showContract,setShowContract] = useState(false)
    const [showOverview,setShowOverview] = useState(true)
    const [showBudget,setShowBudget] = useState(false)
    const [showProcurement,setShowProcurement] = useState(false)
    const [showComments,setShowComments] = useState(false)
    const [showBid,setShowBid] = useState(false)
    const [showAwards,setShowAwards] = useState(false)
    const [showReport,setShowReport] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const {authState,settings} = useContext(AuthContext)
// Alert logic and initialization
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
// alert logic and initialization

    const {id} = useParams()
    const closeModal = ()=>{
        setIsOpen(false)
    }
    const openModal = ()=>{
        setIsOpen(true)
    }

    const [formValues, setFormValues] = useState({
      CompanyId: "",
      name: "",
      status: "open",
      place: "",
      consultant: "",
      description: "",
      starttime: "",
      endtime: "",
      year: "",
      utilizedCost:0,
      totalCost:0,
      physicalPerformance:0,
      percentage:0,
      distance:0
    });



  
    // console.log('data from app',authState);
      useEffect(()=>{
        const getDatas = async()=>{
          await axios.get(`${url}/projects/${id}`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              setOpenError({open:true,message:`${resp.data.error}`})
            }
            // console.log(resp.data);
          setProject(resp.data)
          setBudgets(resp.data.yearlyBudgets)
          // console.log(resp.data.Invoice.length);
          const data = resp.data.Bids.filter((bd)=>bd.evaluationStatus==='YES')
          setBids(data)
          setFormValues({
            CompanyId: resp.data.CompanyId,
            name: resp.data.name,
            status: resp.data.status,
            place: resp.data.place,
            consultant: resp.data.consultant,
            description: resp.data.description,
            starttime: resp.data.starttime,
            endtime: resp.data.endtime,
            year: resp.data.year,
            utilizedCost:resp.data.utilizedCost,
            totalCost:resp.data.totalCost,
            physicalPerformance:resp.data.physicalPerformance,
            percentage:resp.data.percentage,
            distance:resp.data.distance
          })
       
      
          })
    
          await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
            const data = resp.data
            setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
          })
    
          await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
    
            }else{
              setUsersData(resp.data)
            }
          })
    
          await axios.get(`${url}/companies`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
    
            }else{
              setCompanyData(resp.data.company)
            }
          })
  
          // await axios.get(`${url}/budget`,{withCredentials:true}).then((resp)=>{
          //   if(resp.data.error){
    
          //   }else{
          //     setBudgets(resp.data)
          //   }
          // })
        }


       getDatas()
    

  },[])
  
  

  
    // pagination setup

  
    // pagination change control




    // Project APproval

    const projectApproval =async()=>{
      await axios.post(`${url}/projects/approve/${id}`).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          setProject(resp.data)
          setOpenSuccess({open:true,message:"Operation Success"})
        }
      })
    }
    // End of Project Approval
  
// Invoice Data  
function handleActiveLink() {
  let navLink = document.querySelectorAll('.nav-link')

  navLink.forEach(link => {
      link.addEventListener('click', function(){
          navLink.forEach(li => li.classList.remove('active'))
          this.classList.add('active')
      })
  })
}
setTimeout(() => {
  handleActiveLink()
}, 1000);

function handleOverview(){
setShowProcurement(false)
setShowAwards(false)
setShowOverview(true)
setShowContract(false)
setShowBudget(false)
setShowBid(false)
setShowComments(false)
setShowReport(false)
}

function handleTask(){

}

function handleBids(){
  setShowProcurement(false)
  setShowAwards(false)
  setShowContract(false)
  setShowOverview(false)
  setShowBudget(false)
  setShowBid(true)
  setShowComments(false)
  setShowReport(false)

  }


function handleBudgets(){
  setShowProcurement(false)
  setShowAwards(false)
  setShowContract(false)
  setShowOverview(false)
  setShowBudget(true)
  setShowBid(false)
  setShowComments(false)
  setShowReport(false)
  }

function handleContracts(){
  setShowProcurement(false)
setShowAwards(false)
setShowContract(true)
setShowOverview(false)
setShowBudget(false)
setShowBid(false)
setShowComments(false)
setShowReport(false)
}

function handleComments(){
  setShowProcurement(false)
  setShowAwards(false)
  setShowContract(false)
  setShowOverview(false)
  setShowBudget(false)
  setShowBid(false)
  setShowComments(true)
  setShowReport(false)
  }


  function handleAwards(){
    setShowProcurement(false)
    setShowAwards(true)
    setShowContract(false)
    setShowOverview(false)
    setShowBudget(false)
    setShowBid(false)
    setShowComments(false)
    setShowReport(false)
    }


    function handleProcurement(){
      setShowProcurement(true)
      setShowAwards(false)
      setShowContract(false)
      setShowOverview(false)
      setShowBudget(false)
      setShowBid(false)
      setShowComments(false)
      setShowReport(false)
   
      }



    function handleReports(){
      setShowReport(true)
      setShowProcurement(false)
      setShowAwards(false)
      setShowContract(false)
      setShowOverview(false)
      setShowBudget(false)
      setShowBid(false)
      setShowComments(false)
   
      }

const handleMenu = () => {
let menu = document.querySelector('.menu')
let navWrapper = document.querySelector('.nav-list-wrapper')
menu.classList.toggle('active')
navWrapper.classList.toggle('active')
}

const hideNav = () => {
let menu = document.querySelector('.menu')
let navWrapper = document.querySelector('.nav-list-wrapper')
menu.classList.remove('active')
navWrapper.classList.remove('active')
}







  const handleEdit = async(e) => {
    
    e.preventDefault()
    // Implement your own edit logic here
    const request = {
      CompanyId: formValues.CompanyId,
      name: formValues.name,
      status: formValues.status,
      place: formValues.place,
      consultant: formValues.consultant,
      description: formValues.description,
      starttime: formValues.starttime,
      endtime: formValues.endtime,
      year: formValues.year,  
      utilizedCost:parseFloat(formValues.utilizedCost),
      totalCost:parseFloat(formValues.totalCost),
      physicalPerformance:parseFloat(formValues.physicalPerformance),
      percentage:parseFloat(formValues.percentage),
      distance:parseFloat(formValues.distance)
    }
    // console.log(formValues.totalCost.toLocaleString('en-US',{maximumFractionDigits:2}));

    await axios.post(`${url}/projects/${id}`,request,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          setProject(resp.data)
          // console.log('resp form server:',resp.data);
          setOpenSuccess({open:true,message:"Successfully Added"})
          closeModal()
        }
    })
  };



  // Delete row



  
    return (
      <>

   
  
        <PageTitle>Project | {project.name}</PageTitle>
        <TitleChange name={`Project Detail | ${settings.name}`}/>
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
        {/* Calendar section */}
        <div className='flex mb-2'>
        {authState.role==="admin" || authState.role==="engineer" || authState.role==="manager" || authState.role==="planning" || authState.role==="finance" ?
        <Button size="small" className="ml-0" onClick={openModal}>Update Project</Button>
        :<Badge className="mt-2">Read Only</Badge>}

        {project?.Invoice?.ProjectId===project.id?
        <Badge className='ml-2 mt-2'> <AiFillAlert  className='ml-2 mt-1'/>This Project is invoiced</Badge> 
        :<Link to={'/app/invoice'}> <Badge className='ml-2 mt-2' type="danger"> <AiOutlineAlert  className='ml-2 mt-1'/>This Project is Not Invoiced</Badge></Link>
        }
        </div>
        <div className=''>
        <Badge type={project.approved?"success":"danger"}>{project.approved?"Approved By Planning":"Didn't Get Approved By Planning"}</Badge>
        {authState.role==='planning' || authState.role==='admin' || authState.role==="manager" || authState.role==="finance"?
        <Button onClick={projectApproval} size="small" className="ml-4" style={{background:project.approved?'green':'red'}} >{project.approved?"UnApprove":"Approve"}</Button>
        :""}
        </div>
  
        {/* end of calendar section */}
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update Project</ModalHeader>
      <ModalBody>
      <form onSubmit={handleEdit}>
        <div className="grid grid-cols-2 gap-4">

        <Label>
            <span>Name</span>
            <Input
              className="mt-1"
              name="name"
              value={formValues.name}
              onChange={(e)=>setFormValues({...formValues,name:e.target.value})}
              required
            />
          </Label>
          <Label>
            <span>Company</span>
            <Select
              className="mt-1"
              name="CompanyId"
              value={formValues.CompanyId}
              onChange={(e)=>setFormValues({...formValues,CompanyId:e.target.value})}
              required
            >
              <option>Select a Company</option>
              {companyData?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Status</span>
            <Select
              className="mt-1"
              name="status"
              value={formValues.status}
              onChange={(e)=>setFormValues({...formValues,status:e.target.value})}
              required
            >
              <option  >Select a Status</option>
                <option>open</option>
                <option>pending</option>
                <option>active</option>
                <option>completed</option>    
            </Select>
          </Label>

          <Label>
            <span>place</span>
            <Input
              className="mt-1"
              name="place"
              value={formValues.place}
              onChange={(e)=>setFormValues({...formValues,place:e.target.value})}
              required
            />
          </Label>
          <Label>
            <span>Distance(KM)</span>
            <Input
              className="mt-1"
              name="distance"
              value={formValues.distance}
              onChange={(e)=>setFormValues({...formValues,distance:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Consultant</span>
            <Input
              className="mt-1"
              name="consultant"
              value={formValues.consultant}
              onChange={(e)=>setFormValues({...formValues,consultant:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>description</span>
            <Textarea
              className="mt-1"
              name="description"
              value={formValues.description}
              onChange={(e)=>setFormValues({...formValues,description:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Start Date</span>
            <Input
              type="date"
              className="mt-1"
              name="starttime"
              value={formValues.starttime}
              onChange={(e)=>setFormValues({...formValues,starttime:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>End Date</span>
            <Input
              type="date"
              className="mt-1"
              name="endtime"
              value={formValues.endtime}
              onChange={(e)=>setFormValues({...formValues,endtime:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Physical Performance</span>
            <Input
              type="number"
              className="mt-1"
              name="physicalPerformance"
              value={formValues.physicalPerformance}
              onChange={(e)=>setFormValues({...formValues,physicalPerformance:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Year</span>
            <Input
              type="date"
              className="mt-1"
              name="year"
              value={formValues.year}
              onChange={(e)=>setFormValues({...formValues,year:e.target.value})}
              required
            />
          </Label>
          
          <Label>
            <span>Total Cost</span>
            <Input
              type="number"
              className="mt-1"
              name="totalCost"
              value={formValues.totalCost}
              onChange={(e)=>setFormValues({...formValues,totalCost:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Utilized Cost</span>
            <Input
              type="number"
              className="mt-1"
              name="utilizedCost"
              value={formValues.utilizedCost}
              onChange={(e)=>setFormValues({...formValues,utilizedCost:e.target.value})}
        
            />
          </Label>
              
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

    <nav className='nav-one bg-white shadow-md mt-6 rounded-t-md dark:bg-gray-700'>
      <div className='nav-list-wrapper'>
        <ul className='nav-list-ul'>
            <li className='nav-link active dark:text-gray-300' onClick={()=>{handleOverview(); hideNav()}}><CgMenuGridR/>Overview</li>
            
            <li className='nav-link dark:text-gray-300' onClick={()=>{handleBids(); hideNav()}}><VscFiles />Bids</li>
            <li className='nav-link dark:text-gray-300' onClick={()=>{handleBudgets(); hideNav()}}><GrTextAlignLeft />Budgets</li>
            <li className='nav-link dark:text-gray-300' onClick={()=>{handleContracts(); hideNav()}}><AiFillFile />Contracts</li>
            <li className='nav-link dark:text-gray-300' onClick={()=>{handleReports(); hideNav()}}><BiCheckCircle/> Reports</li>
            <li className='nav-link dark:text-gray-300' onClick={()=>{handleComments(); hideNav()}}><FaCommentDots/> Comments</li>
            <li className='nav-link dark:text-gray-300' onClick={()=>{handleAwards(); hideNav()}}><FaAward/> Awards</li>
            <li className='nav-link dark:text-gray-300' onClick={()=>{handleProcurement(); hideNav()}}><FaCircleNotch/> Procurement</li>
        </ul>
      </div>
      <div className='menu' onClick={handleMenu}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
    </nav>       
          
          {showOverview&&<OverView project={project} setProject={setProject} companyData={companyData} id={id} setOpenSuccess={setOpenSuccess}/>}
          {showContract&&<ContractSection project={project} id={id}/>}
          {showBudget&&<BudgetList id={id} budgets={budgets} setBudgets={setBudgets} invoiceIds={project?.Invoice?.id} project={project}/>}
          {showBid&&<BidSection bid={bids} project={project} users={usersData} setBids={setBids} setProject={setProject}/>}
          {showComments&&<CommentSection project={project} id={id}/>}
          {showAwards&&<AwardSection bid={bids} project={project} users={usersData} setBids={setBids} setProject={setProject}/>}
          {showReport&&<ReportSection bid={bids} project={project} users={usersData} setBids={setBids} setProject={setProject}/>}
          {showProcurement&&<ProcurementSection bid={bids} project={project} users={usersData} setBids={setBids} setProject={setProject}/>}



      </>
    )


   

}




export default PgDetail