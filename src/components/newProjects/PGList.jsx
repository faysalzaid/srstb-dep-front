
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




const PgList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [users, setUsers] = useState(null);
    const [companies, setCompanies] = useState([])
    const [projectForm, setProjectForm] = useState({})
    const [projects,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
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
          setOpenError({open:true,message:`${error.response.data.error}`})
        })
        // handle form submission here
        // e.g. make an API call to save the form data
      
      };

      

  
    // console.log('data from app',authState);
      useEffect(()=>{
        const getData =async()=>{
          await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              console.log(resp.data.error);
            }
          setProject(resp.data.projects)
          console.log(resp.data);
      
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




  const handleDelete = async() => {
   await axios.get(`${url}/projects/delete/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){

    }else{
      const data = projects.filter((pr)=>pr.id!==isDeleteOpen.id)
      setProject(data)
      setOpenSuccess({open:true,message:"Successfully Deleted"})
      closeDelete()
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
   
   
          {authState.role==="admin" || authState.role==="engineer" || authState.role==="manager" || authState.role==="planning" ?
        <Button size="small" onClick={openModal}>New Project</Button>
        :<span>Read Only</span>}

      
  
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

  
        


    <TableContainer className="mb-8">
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
            {projects?.map((project) => (
              <TableRow key={project.id}>
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
                  <span className="text-sm">{project.endtime}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">ETB {(parseFloat(project.totalCost).toLocaleString('en-Us',{maximumFractionDigits:2}))}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">ETB {parseFloat(project.utilizedCost).toLocaleString('en-Us',{maximumFractionDigits:2})}</span>
                </TableCell>
             
                <TableCell>
                  <Badge type={project.approved?"success":"danger"}>{project.approved?"Approved":"Un Approved"}</Badge>
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