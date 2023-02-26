
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

import { VscFiles } from 'react-icons/vsc'
import { FaCommentDots } from 'react-icons/fa'
import { GrTextAlignLeft } from 'react-icons/gr'
import { AiFillFile, AiOutlineFile } from 'react-icons/ai'


import {
  TableBody,
  TableContainer, 
  Button,

} from '@windmill/react-ui'
import { Card, CardBody } from '@windmill/react-ui';
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
import { FadeLoader } from 'react-spinners'
import OverView from 'components/overview/OverView'




const PgDetail = () => {
    const [preview, setPreview] = useState(null);
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [projects,setProject] = useState({})
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [showContract,setShowContract] = useState(false)
    const [showOverview,setShowOverview] = useState(true)
    const [showBid,setShowBid] = useState(false)
    const [isOpen,setIsOpen] = useState(false)


    const {id} = useParams()
    const closeModal = ()=>{
        setIsOpen(false)
    }
    const openModal = ()=>{
        setIsOpen(true)
    }
    const [formValues, setFormValues] = useState({
        customer: "",
        project: "",
        subject: "",
        contractValue: "",
        contractType: "",
        startDate: "",
        description: ""
      });

      const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        // handle form submission here
        // e.g. make an API call to save the form data
        closeModal();
      };

      

  
    // console.log('data from app',authState);
      useEffect(()=>{
      axios.get(`${url}/projects/${id}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          console.log(resp.data.error);
        }
      setProject(resp.data)
      console.log(resp.data);
  
      })

      axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
        const data = resp.data
        setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
      })
  
  
  },[])
  
  

  
    // pagination setup

  
    // pagination change control

  
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
setShowOverview(true)
setShowContract(false)
}

function handleTask(){

}



function handleContracts(){

setShowContract(true)
setShowOverview(false)
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




  const projectPercentileGraph = {
    data: {
        datasets: [{
            data: '34',
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: 'green',
            label: 'Percentage',
        }, ],
        labels: 'Cellu-project',
    },
    options: {
        responsive: true,
        cutoutPercentage: 80,
    },
    legend: {
        display: false,
    },
  }





  const handleEdit = (index) => {
    // Implement your own edit logic here
    console.log(`Edit row ${index}`);
  };

  const handleFile = (e) => {
    if (e.target.files.length) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  // Delete row


// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data

  
    return (
      <>

   
  
        <PageTitle>Contracts</PageTitle>
  
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
        {/* Calendar section */}
  
        <Button className="ml-0" onClick={openModal}>New Project</Button>
  
        {/* end of calendar section */}
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Add Contract</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          
          <Label>
            <span>Customer</span>
            <Select
              className="mt-1"
              name="contractType"
              value={formValues.UserId}
              onChange={(e)=>setFormValues({...formValues,UserId:e.target.value})}
              required
            >
              {/* <option value="" disabled>Select a Customer type</option>
              {users.map((usr,i)=>(
                <option key={i} value={usr.id}>{usr.name}</option>
              ))} */}
              
            </Select>
          </Label>

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="ProjectId"
              // value={formValues.ProjectId}
              // onChange={(e)=>setFormValues({...formValues,ProjectId:e.target.value})}
              required
            >
              {/* <option value="" disabled>Select a Project type</option>
              {projects.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))} */}
              
              
            </Select>
          </Label>

          <Label>
            <span>Subject</span>
            <Input
              className="mt-1"
              name="subject"
              // value={formValues.subject}
              // onChange={(e)=>setFormValues({...formValues,subject:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Contract Value</span>
            <Input
              className="mt-1"
              name="contractValue"
              // value={formValues.contractValue}
              // onChange={(e)=>setFormValues({...formValues,contractValue:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Contract Type</span>
            <Select
              className="mt-1"
              name="ContractTypeId"
              // value={formValues.ContractTypeId}
              // onChange={(e)=>setFormValues({...formValues,ContractTypeId:e.target.value})}
              required
            >
              {/* <option value="" disabled>Select a Contract type</option>
              {contracTypes.map((ctr,i)=>(
                <option key={i} value={ctr.id}>{ctr.type}</option>
              ))} */}
              
            </Select>
          </Label>

          <Label>
            <span>Start Date</span>
            <Input
              type="date"
              className="mt-1"
              name="startDate"
              // value={formValues.startDate}
              // onChange={(e)=>setFormValues({...formValues,startDate:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>End Date</span>
            <Input
              type="date"
              className="mt-1"
              name="endDate"
              value={formValues.endDate}
              onChange={(e)=>setFormValues({...formValues,endDate:e.target.value})}
              required
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



    <nav className='nav-one'>
      <div className='nav-list-wrapper'>
        <ul className='nav-list-ul'>
            <li className='nav-link active' onClick={()=>{handleOverview(); hideNav()}}><CgMenuGridR/>Overview</li>
            <li className='nav-link' onClick={()=>{handleTask(); hideNav()}}><BiCheckCircle/> Tasks</li>
            <li className='nav-link' onClick={()=>{handleContracts(); hideNav()}}><VscFiles />Bids</li>
            
            <li className='nav-link' onClick={()=>{handleContracts(); hideNav()}}><AiFillFile />Contracts</li>

        </ul>
      </div>
      <div className='menu' onClick={handleMenu}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
    </nav>       
          
          {showOverview?<OverView projects={projects} setProject={setProject} />:""}
          {showContract?<ContractSection project={projects} id={id}/>:""}



      </>
    )


   

}




export default PgDetail