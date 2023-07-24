
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
import { FaPlusCircle } from "react-icons/fa";
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
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'

import NewInvoice from './SingleInvoice'
import { useRef } from 'react'
import useAuth from 'hooks/useAuth'
import TitleChange from 'components/Title/Title'




const InvoiceList = () => {
    const {authState,settings} = useAuth()
    const [users, setUsers] = useState([])
    const [mode,setMode] = useState([])
    const [invoices, setInvoices] = useState([])
    const [projects,setProject] = useState([])
    const [modeModel,setModeModel] = useState(false)
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [formValues,setFormValues] = useState({date:"",notes:"",totalPaid:"",total:0,UserId:"",ProjectId:"",PaymentModeId:"",sequential:""})
    const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})
    const modeInput = useRef()
    let amountRef = useRef()

    const closeDelete = ()=>{
      setIsDeleteOpen({open:false})
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
  


  const addMode =async(e)=>{
    e.preventDefault()

    // console.log();
    const request = {
      mode:modeInput.current.value
    }
    await axios.post(`${url}/paymentmode`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        setMode([...mode,resp.data])
        closeModeModel()
        setOpenSuccess({open:true,message:"Successfully Added"})
      }
    }).catch((error)=>{
      setOpenError({open:true,message:`${error.response.data.error}`})
    })
    
  }


  function closeModeModel(){
    setModeModel(false)
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

        const getData =async()=>{
          await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              // console.log(resp.data.error);
            }else{
              const data = resp.data.projects.filter((pr)=>pr.approved)
              setProject(data)
            }
          })
          await axios.get(`${url}/invoice`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
    
              }else{
                setInvoices(resp.data)
              }
          })
    
          await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
            }else{
              // const filteredClients = resp.data.filter((cl)=>cl.role==="client")
              setUsers(resp.data)
            }
          })
          await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
            const data = resp.data
            setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
          })
    
          await axios.get(`${url}/paymentmode`,{withCredentials:true}).then((resp)=>{
           setMode(resp.data)
          })
        }

        getData()
     

  
  
  },[])

  // END OF USE EFFECT
  
  
  useEffect(()=>{
      const newPr = projects.filter((pr)=>pr.id===formValues.ProjectId)
      setFormValues({...formValues,total:newPr[0]?.totalCost})
      // console.log('hitted');
  },[formValues.ProjectId])
  

  
  
const handleSubmit = async(e)=>{
  e.preventDefault();
  // console.log(formValues);
  const request = {
    ProjectId:formValues.ProjectId,
    UserId:authState.id,
    date:formValues.date,
    total:formValues.total,
    totalPaid:formValues.totalPaid,
    notes:formValues.notes,
    PaymentModeId:formValues.PaymentModeId,
    sequential:formValues.sequential
  }
  await axios.post(`${url}/invoice`,request,{withCredentials:true}).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      setInvoices([...invoices,resp.data])
      setOpenSuccess({open:true,message:"Succesfully Added"})
      closeModal()
    }
  }).catch((error)=>{
    if (error.response && error.response.data && error.response.data.error) {
        setOpenError({open:true,message:`${error.response.data.error}`});
      } else {
        setOpenError({open:true,message:"An unknown error occurred"});
      }
})
}

const handleDelete = async()=>{
  await axios.delete(`${url}/invoice/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      const newData = invoices.filter((inv)=>inv.id!==isDeleteOpen.id)
      setInvoices(newData)
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

}
  
const captureProject = ()=>{

}
// Invoice Data  


// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data
  
  
    return (
      <>
        <TitleChange name={`Invoices | ${settings.name}`} />
        <PageTitle>Invoices</PageTitle>
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

          {/* Payment MOde section */}
      <Modal isOpen={modeModel} onClose={closeModeModel}>
      <ModalHeader>Add Mode</ModalHeader>
      <ModalBody>
      <form onSubmit={addMode}>
        <div className="grid grid-cols-1 gap-4">
          <Label>
            <span>Mode</span>
            <Input
              type="text"
              ref={modeInput}
              className="mt-1"
              name="totalPaid"
              onChange={(e)=>setFormValues({...formValues,totalPaid:e.target.value})}
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
            <Button layout="outline" onClick={closeModeModel}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModeModel}>
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


        {/* End of Payment Mode Section */}


{/* Main Model */}
        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Add Invoice</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="ProjectId"
              value={formValues.ProjectId}
              onChange={(e)=>setFormValues({...formValues,ProjectId:e.target.value})}
              required
            >
              <option>Select a Project type</option>
              {projects.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>

          <Label>
            <span>Total Amount</span>
            <Input
              // ref={amountRef}
              htmlFor='total'
              className="mt-1"
              name="totalPaid"
              value={formValues.total}
              required
              disabled
            />
          </Label>

          <Label>
            <span>Total Paid</span>
            <Input
            type="number"
              className="mt-1"
              step="0.001"
              name="totalPaid"
              value={formValues.totalPaid}
              onChange={(e)=>setFormValues({...formValues,totalPaid:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Notes</span>
            <Textarea
              className="mt-1"
              name="notes"
              value={formValues.notes}
              onChange={(e)=>setFormValues({...formValues,notes:e.target.value})}
              required
            />
          </Label>

         

          <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              name="startDate"
              value={formValues.date}
              onChange={(e)=>setFormValues({...formValues,date:e.target.value})}
              required
            />
          </Label>

          <Label>
              
            <span className="flex">  
              <FaPlusCircle className='mt-1 mr-1' onClick={()=>setModeModel(true)}/>
              PaymentMode 
            </span>

            <Select
              className="mt-1"
              name="PaymentModeId"
              value={formValues.PaymentModeId}
              onChange={(e)=>setFormValues({...formValues,PaymentModeId:e.target.value})}
              required
            >
              <option>Select a Mode type</option>
              {mode.map((md,i)=>(
                <option key={i} value={md.id}>{md.mode}</option>
              ))}
              
              
            </Select>
          </Label>

          <Label>
            <span>Sequential</span>
            <Select
              className="mt-1"
              name="sequential"
              // value={formValues.ProjectId}
              onChange={(e)=>setFormValues({...formValues,sequential:e.target.value})}
              required
            >
              <option disabled>Select Voucher</option>
              <option>Payment Voucher</option>
              <option>Receipt Voucher</option>
              <option>Journal Voucher</option>
              
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
  
        <Button className="mb-4" onClick={openModal}>New Invoice</Button>
  
        {/* end of calendar section */}
        </TableContainer>
  
        


        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Total Paid</TableCell>
                <TableCell>Amount Due</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            {invoices?.map((invoice, i) => (
            <TableBody key={i}>
              
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{invoice.date}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{invoice.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{parseFloat(invoice.totalPaid).toLocaleString()}</p>
                        {/* <p className='font-semibold'>{invoice.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{parseFloat(invoice.amountDue).toLocaleString({maximumFractionDigits:2})} ETB</p>
                        {/* <p className='font-semibold'>{invoice.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">{parseFloat(invoice.total).toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">{projects.map((pr)=>pr.id==invoice.ProjectId?pr.name:"")}</span>
                  </TableCell>
                  
                  <TableCell>
                  <Badge type={invoice.status==='Paid'?"success":"danger"}>{invoice.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/invoice/${invoice.id}`}}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                      <Button  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={()=>openDelete(invoice.id)}/>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
          
            </TableBody>
                ))}
          </Table>
          <TableFooter>
            {/* <Pagination
              // totalResults={totalResults}
              // resultsPerPage={resultsPerPage}
              // onChange={onPageChangeTable2}
              // label="Table navigation"
            /> */}
          </TableFooter>
        </TableContainer>



      </>
    )


   

}




export default InvoiceList