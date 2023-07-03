
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
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'
import TitleChange from 'components/Title/Title'




const ProcurementList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [Departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([])
    const [data, setData] = useState([])
    const [projects,setProject] = useState([])
    const [contracts,setContracts] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [procurementData,setProcurementData] = useState([])
    const [procurementForm,setProcurementForm] = useState({
        timeToSell: "",
        budgetFrom: "",
        procurementMethod: "",
        procurementType: "",
        ProjectId:"",
        DepartmentId:""
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
    const [formValues, setFormValues] = useState({
        UserId: "",
        ProjectId: "",
        subject: "",
        contractValue: "",
        ContractTypeId: "",
        startDate: "",
        endDate: ""
      });



      useEffect(()=>{
        const getData = async()=>{


          await axios.get(`${url}/procurement`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              setOpenError({open:true,message:true})
            }else{
              setProcurementData(resp.data)
            //   console.log(resp.data);
            }
          })
          await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              // console.log(resp.data.error);
            }
          const data = resp.data.projects.filter((pr)=>pr.approved)  
          setProject(data)
      
          })
    
          await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
    
            }else{
              const filteredClients = resp.data.filter((cl)=>cl.role==="client")
              setUsers(filteredClients)
            }
          })
    
    
          await axios.get(`${url}/departments`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
    
            }else{
              setDepartments(resp.data)
            }
          })
    
          await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
            const data = resp.data
            setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
          })
    
          
        }

        getData()
       
    
    },[])

      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(procurementForm);
        await axios.post(`${url}/procurement`,procurementForm,{withCredentials:true}).then((resp)=>{
          // console.log(resp.data);
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            setProcurementData([...procurementData,resp.data])
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

      







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/procurement/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
        // console.log(resp.data);
      }else{
        const data = procurementData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setProcurementData(data)
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



    function isTimeToSellReached(prcrmnt) {
      const tTSell = new Date(prcrmnt.timeToSell);
      // console.log('runned');
      // console.log(tTSell);
      return tTSell <= new Date();
    }



// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data

  
    return (
      <>
        <TitleChange name={`Procurements | ${settings.name}`} />
        <PageTitle>Procurements</PageTitle>
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

        <Button onClick={openModal}>New Procurement</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Add Procurement</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          
          <Label>
            <span>TimeTo Sell</span>
            <Input
              type="date"
              className="mt-1"
              name="contractType"
            //   value={procurementForm.UserId}
              onChange={(e)=>setProcurementForm({...procurementForm,timeToSell:e.target.value})}
              required
            >
              
            </Input>
          </Label>

          <Label>
            <span>Budget From</span>
            <Input
              className="mt-1"
              name="ProjectId"
            //   value={procurementForm.ProjectId}
              onChange={(e)=>setProcurementForm({...procurementForm,budgetFrom:e.target.value})}
              required
            >
            </Input>
          </Label>

          <Label>
            <span>Procurement Method</span>
            <Input
              className="mt-1"
              name="subject"
            //   value={procurementForm.subject}
              onChange={(e)=>setProcurementForm({...procurementForm,procurementMethod:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Procurement Type</span>
            <Input
              className="mt-1"
              name="contractValue"
            //   value={procurementForm.contractValue}
              onChange={(e)=>setProcurementForm({...procurementForm,procurementType:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Project |<span className='text-sm italic text-purple-500'>(approved projects only)</span></span>
            <Select
              className="mt-1"
              name="ContractTypeId"
            //   value={procurementForm.ContractTypeId}
              onChange={(e)=>setProcurementForm({...procurementForm,ProjectId:e.target.value})}
              required
            >
              <option value="">Select a Related Project</option>
              {projects.map((ctr,i)=>(
                <option key={i} value={ctr.id}>{ctr.name}</option>
              ))}
              
            </Select>
          </Label>



          <Label>
            <span>Department</span>
            <Select
              className="mt-1"
              name="ContractTypeId"
            //   value={procurementForm.ContractTypeId}
              onChange={(e)=>setProcurementForm({...procurementForm,DepartmentId:e.target.value})}
              required
            >
              <option value="">Select a Department</option>
              {Departments.map((ctr,i)=>(
                <option key={i} value={ctr.id}>{ctr.name}</option>
              ))}
              
            </Select>
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


  
        


        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Time To Sell</TableCell>
            <TableCell className="font-semibold">Budget From</TableCell>
            <TableCell className="font-semibold">Procur.Method</TableCell>
            <TableCell className="font-semibold">Department</TableCell>
            <TableCell className="font-semibold">Procur.Type</TableCell>
            <TableCell className="font-semibold">Project</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {procurementData?procurementData.map((row, i) => (
            <Fragment key={i}>
              <TableRow className={`${isTimeToSellReached(row)?'bg-red-200':''}`}>
                <TableCell><span className="text-sm font-semibold">{row.timeToSell}{isTimeToSellReached(row)?<Badge className="ml-2">Time To Sell Reached</Badge>:''}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.budgetFrom}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.procurementMethod}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{Departments.map((dp)=>dp.id===row.DepartmentId?dp.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.procurementType}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{projects.map((pr)=>pr.id===row.ProjectId?pr.name:"")}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/procurement/${row.id}`}>
                  <Button layout="link" size="small">
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                  </Link>
                  <Button layout="link" size="small" onClick={() => openDelete(row.id)}>
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            </Fragment>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>

      </>
    )


   

}




export default ProcurementList