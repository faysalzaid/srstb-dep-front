
import React, { useState, useEffect,Fragment } from 'react'

import CTA from '../CTA'
import InfoCard from '../Cards/InfoCard'
import ChartCard from '../Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../Chart/ChartLegend'
import PageTitle from '../Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import response from '../../utils/demo/tableData'
import { PlusCircleIcon } from "@heroicons/react/outline";
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
import { FaChevronDown } from 'react-icons/fa'




const PgList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [users, setUsers] = useState(null);
    const [companies, setCompanies] = useState([])
    const [allProjects, setAllProjects] = useState({})
    const [projects,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [searchResult,setSearchResult] = useState([])
    const [isOpen,setIsOpen] = useState(false)





    const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

    const closeDelete = ()=>{
      setIsDeleteOpen(false)
  }
    const openDelete = (id)=>{
      setIsDeleteOpen({open:true,id:id})
  }


    
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



    function closeModal(){
        setIsOpen(false)
    }
    function openModal(){
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

      const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = e => {
        e.preventDefault();
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
        console.log(request);
        axios.post(`${url}/projects`,request,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              setOpenError({open:true,message:`${resp.data.error}`})
            }else{
              setProject([...projects,resp.data])
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
        // handle form submission here
        // e.g. make an API call to save the form data
      
      };



      useEffect(()=>{
        setSearchResult(searchTerm.length<1?projects:searchResult)
      },[projects,searchTerm])




      const searchHandler = async(search)=>{
        setSearchTerm(search)
        if(search!==0){
          const newBidList = projects.filter((bid)=>{
            return Object.values(bid).join(" ").toLowerCase().includes(search.toLowerCase())
          })
          // console.log(newBidList);
          setSearchResult(newBidList)
        }else{
          setSearchResult(projects)
        }
      }

      



      function isEndTimeReached(project) {
        const endTime = new Date(project.endtime);
        // console.log('runned');
        return endTime < new Date();
      }

      function getDaysPassed(endtime) {
        const endTime = new Date(endtime);
        // console.log('endtime',endTime.getTime());
        // console.log('The endTime',endTime);
        const currentDate = new Date();
        // console.log('currentTime',currentDate);
        const timeDifference = currentDate.getTime() - endTime.getTime();
        // console.log('Time Difference', timeDifference);
        const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
        // console.log('The days passed',daysPassed); // Milliseconds to days conversion
        // console.log(daysPassed);
        return daysPassed;
      }


      

  
    // console.log('data from app',authState);
      useEffect(()=>{
        const getData =async()=>{
          await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              console.log(resp.data.error);
            }
          setProject(resp.data.projects)
          setAllProjects(resp.data.projects)
          const nD = resp.data.projects[0].endtime
          getDaysPassed(nD)
          // console.log(resp.data);
      
          })
    
          await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
            const data = resp.data
            setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
          })
    
    
          await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              
            }else{
              const data = resp.data.filter((usr)=>usr.role=="client")
              setUsers(data)
        
            }
          })
    
          await axios.get(`${url}/companies`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              
            }else{
              setCompanies(resp.data.company)
              
              
            }
          })
        }
      getData()
  
  },[])
  

  
    // pagination setup

  
    // pagination change control

  
// Invoice Data  



  const filterByStatus = async(e)=>{
    // console.log(e.target.value);
    if(e.target.value==='all'){
      setProject(allProjects)
    }else{
      const data = allProjects.filter((pr)=>pr.status===e.target.value)
      setProject(data)
    }
  }




  const filterByYear = async(e)=>{
    // console.log(e.target.value);
    if(e.target.value==='all'){
      // setProject(allProjects)
    }else{
      const data = allProjects.filter((pr)=>pr.year.slice(0,4)===e.target.value)
      setProject(data)
    }
  }



  const filterByApproval = async(e)=>{
    // console.log(e.target.value);
    if(e.target.value==='all'){
      // setProject(allProjects)
    }else if(e.target.value==='false'){
      // console.log('in the false');
      const data = allProjects.filter((pr)=>!(pr.approved))
      setProject(data)
    }else if(e.target.value==='true'){
      // console.log('in the true');
      const data = allProjects.filter((pr)=>pr.approved)
      setProject(data)
    }
  }


  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = currentYear; i >= currentYear - 4; i--) {
      yearOptions.push(
        <option key={i} value={i}>{i}</option>
      );
    }
    return yearOptions;
  }

  
  const handleDelete = async() => {
   await axios.delete(`${url}/projects/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){
      setOpenError({open:true,message: `${resp.data.error}`})
    }else{
      const data = projects.filter((pr)=>pr.id!==isDeleteOpen.id)
      setProject(data)
      setOpenSuccess({open:true,message:"Successfully Deleted"})
      closeDelete()
    }
   }).catch((error)=>{
    if (error.response && error.response.data && error.response.data.error) {
        setOpenError({open:true,message:`${error.response.data.error}`});
      } else {
        setOpenError({open:true,message:"An unknown error occurred"});
      }
})
  };


  
    return (
      <>
      
      <TitleChange name={`Projects | ${settings.name}`} />
        <PageTitle>Projects</PageTitle>
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

                      {/* Search section */}
                      <div className='mb-5'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Project Full-Name..." required />
        </div>
            
        </div>
        {/* End of search List */}
        

        
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
   
          {authState.role==="admin" || authState.role==="engineer" || authState.role==="manager" || authState.role==="planning" || authState.role==="finance" ?
        <Button size="small" onClick={openModal}>New Project</Button>
        :<span>Read Only</span>}


<div className="max-w-screen-lg flex flex-col sm:flex-row">
  {/* Data section 1 */}
  <div className="flex flex-col sm:flex-row mb-4">
    <div className="flex relative inline-flex">
      <select className="w-full flex-2 mt-1 w-48 h-10 pl-3 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={filterByStatus}>
        <option value="all">All Projects (status)</option>
        <option value="open">Open</option>
        <option value="pending">Pending</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      
    </div>
  </div>
  {/* End of Data section 1 */}

  {/* Data section 2 */}
  <div className="flex flex-col sm:flex-row mb-4">
   
    <div className="flex relative inline-flex lg:ml-4">
      <select className="w-full flex-2 mt-1 w-48 h-10 pl-3 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={filterByApproval}>
        <option value="all">Choose Approval</option>
        <option value='true'>Approved</option>
        <option value='false'>Not Approved</option>
      </select>
    
    </div>
  </div>
  {/* End of Data section 2 */}

  {/* Data section 3 */}
  <div className="flex flex-col sm:flex-row mb-4">

  <div className="flex relative inline-flex lg:ml-4">
    <select className="w-full flex-2 mt-1 w-48 h-10 pl-3 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={filterByYear}>
      <option value={'all'}>Choose(Year)</option>
      {generateYearOptions()}
    </select>
  </div>
</div>

  {/* End of Data section 3 */}
</div>

      
  
        </TableContainer>
        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Add Project</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
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
              <option value="" disabled>Select a Company</option>
              {companies.map((cp,i)=>(
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

  
        


    <TableContainer className="mb-8 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Contractor</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>T.Cost</TableCell>
              <TableCell>Utiliz.Cost</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Edit / Delete</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchResult?.map((project) => (
              <TableRow key={project.id} className={`${isEndTimeReached(project)?'bg-red-200 text-gray-600':''}`}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{project.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{companies.map((cp)=>cp.id===project.CompanyId?cp.name:"")}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.starttime}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.endtime}{getDaysPassed(project.endtime)>0? <Badge className="text-sm ml-2" type='danger'>{getDaysPassed(project.endtime)} days passed</Badge>:''}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">ETB {(parseFloat(project.totalCost).toLocaleString('en-Us',{maximumFractionDigits:2}))}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">ETB {parseFloat(project.utilizedCost).toLocaleString('en-Us',{maximumFractionDigits:2})}</span>
                </TableCell>
             
                <TableCell>
                  <Badge type={project.approved?"success":"danger"}>{project.approved?"Approved":"Not Approved"}</Badge>
                </TableCell>
             
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/pglist/${project.id}`}>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      title="Edit"
                      
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <EditIcon />
                      </svg>
                    </Button>
                    </Link>
                    <Button 
                    onClick={()=>openDelete(project.id)}
                     layout="link"
                     size="icon"
                     aria-label="Delete"
                     title="Delete"
                     style={{color:'red'}}
                     >
                       <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <TrashIcon />

                      </svg>
                      
                    </Button>
                    </div>
                    </TableCell>
                    </TableRow>
            ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
                    


      </>
    )


   

}




export default PgList