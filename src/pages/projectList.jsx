import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
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
import { EditIcon, EyeIconOne, TrashIcon,TablesIcon,HomeIcon,OutlineCogIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import {ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons' 
import InfoCard from '../components/Cards/InfoCard'   
import RoundIcon from '../components/RoundIcon'
import * as Yup from 'yup'
import  Alert  from '@windmill/react-ui'
import response from '../utils/demo/tableData'
import { url } from '../config/urlConfig'
import { useRef } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'
// make a copy of the data, for the second table
const response2 = response.concat([])

function ProjectList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */


    //COMAPNY DATA STATES

  
    const [ProjectFormData,setProjectFormData] = useState({ })
    const [errorMessage,setErrorMessage] = useState('')
    const [successMsg,setSuccessMsg] = useState('')
    const [projectData,setProjectData] = useState([])
    const [bidData,setBidData] = useState([])
    let [allProjects,setAllProjects] = useState(0)
    let [completedProjects,setCompletedProjects] = useState(0)
    let [pendingProjects,setPendingProjects] = useState(0)
    let [activeProjects,setActiveProjects] = useState(0)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    //ENDOF COMPANY DATA
  // setup pages control for every table
  // const [pageTable1, setPageTable1] = useState(1)
  // const [pageTable2, setPageTable2] = useState(1)

  // // setup data for every table
  // const [dataTable1, setDataTable1] = useState([])
  // const [dataTable2, setDataTable2] = useState([])

  // // pagination setup
  // const resultsPerPage = 10
  // const totalResults = response.length

  // // pagination change control
  // function onPageChangeTable1(p) {
  //   setPageTable1(p)
  // }

  // // pagination change control
  // function onPageChangeTable2(p) {
  //   setPageTable2(p)
  // }

  // on page change, load new sliced data
  // here you would make another server request for new data
  // useEffect(() => {
  //   setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  // }, [pageTable1])

  // // on page change, load new sliced data
  // // here you would make another server request for new data
  // useEffect(() => {
  //   setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  // }, [pageTable2])
  const [authState] = useContext(AuthContext)

  useEffect(()=>{
    if(authState.state!==true){
      props.history.push('/login')
    }
  },[])


  useEffect(()=>{
    
        const response = axios.get(`${url}/projects`).then((resp)=>{
          // console.log(resp.data);
          if(resp.data.error){
            setErrorMessage(resp.data.error)
          }else{
            // console.log('data',resp.data);
            setProjectData(resp.data.projects)
            setAllProjects(resp.data.count)
            setCompletedProjects(resp.data.completed)
            setActiveProjects(resp.data.active)
            setPendingProjects(resp.data.pending)
          }
          
        })
        
        // console.log(response.data);
    
  },[])


  useEffect(()=>{
    axios.get(`${url}/bids`).then((resp)=>{
      // console.log(resp.data.bid);
      if(resp.data.error){
        setErrorMessage(resp.data.error)
      }else{
        setBidData(resp.data.bid)
      }
        
    })
  },[])


  const addProject =async(e)=>{
    e.preventDefault()
    // console.log(e.data);
    if(ProjectFormData.name==="" || ProjectFormData.place===""|| ProjectFormData.status===""|| ProjectFormData.description===""|| ProjectFormData.starttime===""|| ProjectFormData.endtime===""){
      setErrorMessage('Please Provide all data')
      setTimeout(() => {
        setErrorMessage("")
      }, 2000);
    }else{
      // console.log('This is from projectformdata',ProjectFormData.BidId);
      const grappedBid = await axios.get(`${url}/bids/name/${ProjectFormData.BidId}`)
      console.log('grapped bid',grappedBid.data);
      const request = {
        name:ProjectFormData.name,
        status:ProjectFormData.status,
        place:ProjectFormData.place,
        description:ProjectFormData.description,
        starttime:ProjectFormData.starttime,
        endtime:ProjectFormData.endtime,
        percentage:ProjectFormData.percentage,
        BidId:grappedBid.data.id
      }
      const response = await axios.post(`${url}/projects`,request).then((resp)=>{
        if(resp.data.error){
          setErrorMessage(resp.data.error)
          setTimeout(() => {
            setErrorMessage("")
          }, 2000);
        }else{
          setProjectData([...projectData,resp.data])
          setProjectFormData({})
          setSuccessMsg("Successfully Registered")
          setTimeout(() => {
            setSuccessMsg("")
          }, 2000);
          closeModal()
        }
      })
    }

}

useEffect(()=>{
  setFetchedResult(searchTerm.length<1?projectData:searchResult)
},[projectData,searchTerm])




const searchHandler = async(search)=>{
  setSearchTerm(search)
  if(search!==0){
    const newProjectData = projectData.filter((prj)=>{
      return Object.values(prj).join(" ").toLowerCase().includes(search.toLowerCase())
    })
    // console.log(newProjectData);
    setSearchResult(newProjectData)
  }else{
    setSearchResult(projectData)
  }
}




  return (
    <>
      <PageTitle>List of Projects Registered</PageTitle>
                  {/* Search section */}
      <div className='mb-5'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Project Name, Date..." required />
        </div>
            
        </div>
        {/* End of search List */}

{/* Card Icons */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Projects" value={allProjects}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Completed Projects" value={completedProjects}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending Projects" value={pendingProjects}>
          <RoundIcon
            icon={TablesIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Active Projects" value={activeProjects}>
          <RoundIcon
            icon={OutlineCogIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
{/* End of Card Icons */}



      <div>
        <Button onClick={openModal}>Add Project</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Company Info</ModalHeader>
        <span style={{color:'red'}}>{errorMessage}</span>
        <ModalBody>
          
        <form onSubmit={addProject}>
        <Label>
          <span>Project Name</span>
            <Input type="text" className="mt-1" name="name" placeholder="Project Name"  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, name:e.target.value})}/>
        </Label>
       
        <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" onChange={e=>setProjectFormData({...ProjectFormData, status:e.target.value})}>
          <option>Select</option>
            <option>Pending</option>
            <option>Active</option>
            <option>Completed</option>
            
          </Select>
        </Label>
        
        <Label>
          <span>Place</span>
            <Input type="text" className="mt-1" name="place" placeholder="Project Place"  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, place:e.target.value})}/>
        </Label>
        
        <Label>
          <span>description</span>
            <Textarea type="text" className="mt-1" name="description" placeholder="Description"  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, description:e.target.value})}/>
        </Label>
        
        <Label>
          <span>Percentage Of Completion</span>
            <Input type="number" className="mt-1" name="percentage"  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, percentage:e.target.value})}/>
        </Label>
        <Label>
          <span>Start Time</span>
          <Input type="date" className="mt-1" name="starttime"   onChange={e=>setProjectFormData({...ProjectFormData,starttime:e.target.value})}/>
        </Label>
        <Label>
          <span>End Time</span>
          <Input type="date" className="mt-1" name="endtime"   onChange={e=>setProjectFormData({...ProjectFormData,endtime:e.target.value})}/>
        </Label>
        <Label className="mt-4">
          <span>Bid From</span>
          <Select className="mt-1" name="BidId" onChange={e=>setProjectFormData({...ProjectFormData, BidId:e.target.value})}>
          <option>Select</option>
          {bidData.map((bid)=>
            <option key={bid.id}>{bid.fullname}</option>
          )}
            
            
          </Select>
        </Label>
        <Button type="submit">Save</Button>
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
          
        </ModalFooter>
      </Modal>

      <SectionTitle>      
      {successMsg?
        <div className="mt-3 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMsg}.</p>
      </div>:''}</SectionTitle>




<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">





           {fetchedResult.map((project)=>(
               <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-8" key={project.id}>
               <span
                 className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
               ></span>
 
               <div className="justify-between sm:flex">
                 <div>
                  <Link to={`/app/projects/${project.id}`}>
                  <h4 className="text-sm font-bold text-gray-900">
                     {project.name} 
                   </h4>
 
                  </Link>
                  
                   <p className="mt-1 text-xs font-medium text-gray-600">Client<Badge>{bidData.map((bid)=>{ return bid.id===project.BidId?bid.fullname:""})}</Badge></p>
                   
                 </div>
                
                 <div className="ml-3 hidden flex-shrink-0 sm:block">
                  
                   <img
                     alt="Project"
                     src="/uploads/project.png"
                     className="h-16 w-16 rounded-lg object-cover shadow-sm"
                   />
                 </div>
               </div>
 
               <div className="mt-1 sm:pr-8">
                 <p className="text-sm text-gray-500">
                   {project.description}
                 </p>
               </div>
 
               <dl className="mt-4 flex">
                 <div className="flex flex-col-reverse">
                   <dt className="ml-2 text-sm font-medium text-gray-600">Start Time</dt>
                   <dd className="text-xs text-gray-500"><Badge type="success">{project.starttime}</Badge> </dd>
                 </div>
 
                 <div className="ml-3 flex flex-col-reverse sm:ml-6">
                   <dt className="ml-2 text-sm font-medium text-gray-600">End Time</dt>
                   <dd className="text-xs text-gray-500"><Badge type="danger">{project.endtime}</Badge></dd>
                 </div>
                 
               </dl>
               
             </div>
           ))}
           












  
</div>








    </> 
  )
}

export default ProjectList
