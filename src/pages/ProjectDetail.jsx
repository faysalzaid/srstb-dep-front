import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'
// make a copy of the data, for the second table
const response2 = response.concat([])

function ProjectDetail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const{id} = useParams()
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

  
    const [ProjectFormData,setProjectFormData] = useState({name:"",place:"",status:"",description:"",starttime:"",endtime:"",BidId:""})
    const [errorMessage,setErrorMessage] = useState('')
    const [successMsg,setSuccessMsg] = useState('')
    const [projectData,setProjectData] = useState({})
    const [bidData,setBidData] = useState([])
    const [grappedBid,setGrappedBid] = useState({})
    //ENDOF COMPANY DATA

    const [authState] = useContext(AuthContext)

    
  useEffect(()=>{
        const getProjectData = async()=>{
          const response = await axios.get(`${url}/projects/${id}`).then((resp)=>{
            // console.log(resp.data);
            if(resp.data.error){
              setErrorMessage(resp.data.error)
            }else{
              setProjectData(resp.data)
              setProjectFormData(resp.data)  
            }
            
          })
        }
       getProjectData()
        
        // console.log(response.data);
    
  },[])


  useEffect(()=>{
    const getBids = async()=>{
      await axios.get(`${url}/bids/${projectData.BidId}`).then((resp)=>{
        // console.log('grapped bid',resp.data);
        setGrappedBid(resp.data)
      })
    }
    getBids()
  },[projectData])



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


  const editProject =async(e)=>{
    e.preventDefault()
    // console.log(e.data);
    if(ProjectFormData.name==="" || ProjectFormData.place===""|| ProjectFormData.status===""|| ProjectFormData.description===""|| ProjectFormData.starttime===""|| ProjectFormData.endtime===""||projectData.BidId===""){
      setErrorMessage('Please Provide all data')
      setTimeout(() => {
        setErrorMessage("")
      }, 2000);
    }else{
      // console.log('This is from projectformdata',ProjectFormData);
      let ProjectBidId = undefined
      if(projectData.BidId===ProjectFormData.BidId){
        axios.get(`${url}/bids/${ProjectFormData.BidId}`).then((resp)=>{
          ProjectBidId = resp.data.id
          const request = {
            name:ProjectFormData.name,
            status:ProjectFormData.status,
            place:ProjectFormData.place,
            description:ProjectFormData.description,
            starttime:ProjectFormData.starttime,
            endtime:ProjectFormData.endtime,
            percentage:ProjectFormData.percentage,
            BidId:ProjectBidId
          }
          const response =  axios.post(`${url}/projects/${id}`,request).then((resp)=>{
            if(resp.data.error){
              setErrorMessage(resp.data.error)
              setTimeout(() => {
                setErrorMessage("")
              }, 2000);
            }else{
              setProjectData(resp.data)
              setProjectFormData(resp.data)
              setSuccessMsg("Successfully Updated")
              setTimeout(() => {
                setSuccessMsg("")
              }, 2000);
              closeModal()
            }
          })
        })
        
        
      }else{
        axios.get(`${url}/bids/name/${ProjectFormData.BidId}`).then((resp)=>{
          ProjectBidId = resp.data.id
          const request = {
            name:ProjectFormData.name,
            status:ProjectFormData.status,
            place:ProjectFormData.place,
            description:ProjectFormData.description,
            starttime:ProjectFormData.starttime,
            endtime:ProjectFormData.endtime,
            percentage:ProjectFormData.percentage,
            BidId:ProjectBidId
          }
          const response = axios.post(`${url}/projects/${id}`,request).then((resp)=>{
            if(resp.data.error){
              setErrorMessage(resp.data.error)
              setTimeout(() => {
                setErrorMessage("")
              }, 2000);
            }else{
              setProjectData(resp.data)
              setProjectFormData(resp.data)
              setSuccessMsg("Successfully Updated")
              setTimeout(() => {
                setSuccessMsg("")
              }, 2000);
              closeModal()
            }
          })
          
        })
        
        
      }
     
      // const grappedBid = await axios.get(`${url}/bids/name/${ProjectFormData.BidId}`)
      // console.log('grapped bid',grappedBid.data);

    }

}
const deleteProject =async()=>{
  const response = await axios.get(`${url}/projects/delete/${id}`).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
      setTimeout(() => {
        setErrorMessage(" ")
      }, 1000);
    }else{
      
      setProjectData({})
      setSuccessMsg('Successfully deleted')
      setTimeout(() => {
        setSuccessMsg("")
        props.history.push('/app/projects')
      }, 1000);
      
    }
  })
}
// const startTime = projectData.starttime
// const date = new Date()
// console.log(startTime.slice(0,4)==date.getFullYear());


  return (
    <>
      <PageTitle>Project <Badge>{projectData.name}</Badge></PageTitle>




      <div>
        <Button onClick={openModal}>Edit Project</Button>
      </div>
      <button onClick={deleteProject} type="button" className="mt-3 py-2 px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Update Project Info</ModalHeader>
        <span style={{color:'red'}}>{errorMessage}</span>
        <ModalBody>
          
        <form onSubmit={editProject}>
        <Label>
          <span>Project Name</span>
            <Input type="text" className="mt-1" name="name" value={ProjectFormData.name} placeholder="Project Name"  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, name:e.target.value})}/>
        </Label>
       
        <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" value={ProjectFormData.status} onChange={e=>setProjectFormData({...ProjectFormData, status:e.target.value})}>
          <option>Select</option>
            <option>Pending</option>
            <option>Active</option>
            <option>Completed</option>
            
          </Select>
        </Label>
        
        <Label>
          <span>Place</span>
            <Input type="text" className="mt-1" name="place" value={ProjectFormData.place} placeholder="Project Place"  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, place:e.target.value})}/>
        </Label>
        
        <Label>
          <span>description</span>
            <Textarea type="text" className="mt-1" name="description" value={ProjectFormData.description} placeholder="Description"  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, description:e.target.value})}/>
        </Label>
        
        <Label>
          <span>Percentage Of Completion</span>
            <Input type="number" className="mt-1" name="percentage" value={ProjectFormData.percentage}  autoComplete='off' onChange={e=>setProjectFormData({...ProjectFormData, percentage:e.target.value})}/>
        </Label>
        <Label>
          <span>Start Time</span>
          <Input type="date" className="mt-1" name="starttime" value={ProjectFormData.starttime}   onChange={e=>setProjectFormData({...ProjectFormData,starttime:e.target.value})}/>
        </Label>
        <Label>
          <span>End Time</span>
          <Input type="date" className="mt-1" name="endtime" value={ProjectFormData.endtime}   onChange={e=>setProjectFormData({...ProjectFormData,endtime:e.target.value})}/>
        </Label>
        <Label className="mt-4">
          <span>Bid From | currently <Badge type="success">{bidData.map((bid)=>bid.id===projectData.BidId?bid.fullname:"")}</Badge></span>
          <Select className="mt-1"  name="BidId"  onChange={e=>setProjectFormData({...ProjectFormData, BidId:e.target.value})}>
          <option>Select</option>
          {bidData.map((bid)=>
            <option key={bid.id}>{bid.fullname}</option>
          )}
            
            
          </Select>
        </Label>
        <Label className="mt-4">
        <Button type="submit">Save</Button>
        </Label>
        
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

      <SectionTitle>      
        {successMsg?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMsg}.</p>
      </div>:''}
      
      {errorMessage?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{errorMessage}.</p>
      </div>:undefined}
      
      </SectionTitle>





        <div className="h-screen justify-center items-center bg-white-200">
          <div className="bg-white w-2/1 shadow-xl rounded-lg p-6">
            <div className="border-b-2 border-dashed pb-3">
              <div className="border-l-2 border-l-blue-400 pl-2 mb-3">Project {projectData.name}</div>
              <div className="flex justify-between">
                
                <div className="flex items-start">
                  <div className="w-52 h-28 rounded-xl bg-gray-200 mr-3"></div>
                  <div>
                    <div className="pb-2 font-bold">Client <Badge type="success">{bidData.map((bid)=>bid.id===projectData.BidId?bid.fullname:'')}</Badge></div>
                    <div className="text-xs text-gray-400 leading-6">{projectData.description}</div>
                    <div className="text-xs text-gray-400 leading-6 font-bold">Project Status | <Badge>{projectData.status}</Badge></div>
                    <div className="text-xs text-gray-400 leading-6 font-bold">Project Completion | <Badge>{projectData.percentage}%</Badge></div>
                  </div>
                </div>
                <div className="text-right text-sm leading-7">
                  <p>Start Time <Badge>{projectData.starttime}</Badge></p>
                  <p>End Time <Badge type="danger">{projectData.endtime}</Badge></p>
                  {/* <p>amount：6000</p>
                  <div>total ：<span className="text-red-500">-900</span></div> */}
                  <div className="font-bold">Bid Amount ：birr <Badge>{bidData.map((bid)=>bid.id===projectData.BidId?bid.amount:"")}.00</Badge> </div>
                </div>
              </div>
            </div>
            <div className="pt-4">

              <div className="border-l-2 border-l-blue-400 pl-2 mb-3">Documents of the project</div>
              
                    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                            {/* License */}
                            <div className="sm:flex sm:items-center py-4">
                                <a href={`/uploads/docs/${grappedBid.license}`}target="_blank">
                                    <div className="mt-4 mb-4">
                                        <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">license</button>
                                    </div>
                                    <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`/uploads/docs/${grappedBid.license}`} alt="Not found Img"/>
                                </a>
                                    <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                    </div>
                            </div>
                            {/* End of License */}

                            {/* Performa */}
                              <div className="sm:flex sm:items-center py-4">
                                <a href={`/uploads/docs/${grappedBid.performa}`} target="_blank">
                                    <div className="mt-4 mb-4">
                                        <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">Performa</button>
                                    </div>
                                    <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`/uploads/docs/${grappedBid.performa}`} alt="Not found Img"/>
                                </a>
                                    <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                    </div>
                                </div>
                          {/* End of performa */}

                          {/* Proposal */}
                          <div className="sm:flex sm:items-center py-4">
                                <a href={`/uploads/docs/${grappedBid.proposal}`} target="_blank">
                                    <div className="mt-4 mb-4">
                                        <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">Proposal</button>
                                    </div>
                                    <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`/uploads/docs/${grappedBid.proposal}`} alt="Not found Img"/>
                                </a>
                                    <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                    </div>
                                </div>
                          {/* End of Proposal */}

                          {/* Proposal */}
                          <div className="sm:flex sm:items-center py-4">
                                <a href={`/uploads/docs/${grappedBid.companydoc}`} target="_blank">
                                    <div className="mt-4 mb-4">
                                        <button className="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal">CompanyDocs</button>
                                    </div>
                                    <img className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24" src={`/uploads/docs/${grappedBid.companydoc}`} alt="Not found Img"/>
                                </a>
                                    <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                    </div>
                                </div>
                          {/* End of Proposal */}


                    </div>
              
            </div>
          </div>


        </div>




    </> 
  )
}

export default ProjectDetail
