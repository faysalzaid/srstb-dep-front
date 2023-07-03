
import React, { useState, useEffect } from 'react'

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
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { FaList } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'


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
import NewInvoice from './SingleInvoice'
import { ErrorAlert, SuccessAlert } from "components/Alert";



const InvoiceDetailPage = () => {
    const {authState,settings} = useContext(AuthContext)
    const [showPayments, setShowPayments] = useState(false);
    const [invoiceData, setInvoiceData] = useState({})
    const [mode,setMode] = useState([])
    const [data, setData] = useState([])
    const [project,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
    const {id} = useParams()
  
    const [isShowingPayments, setIsShowingPayments] = useState(false);
    const [formValues,setFormValues] = useState({date:"",notes:"",totalPaid:"",total:0,UserId:"",ProjectId:"",PaymentModeId:"",sequential:""})
    function togglePayments() {
    setIsShowingPayments(!isShowingPayments);
  }

    // console.log('data from app',authState);
      useEffect(()=>{
        const getData = async()=>{
          await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              // console.log(resp.data.error);
            }else{
              setProject(resp.data.projects)
            }
          })
  
          await axios.get(`${url}/invoice/${id}`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              // setopenerr
            }else{
              setInvoiceData(resp.data)
              setFormValues({date:resp.data.date,notes:resp.data.notes,sequential:resp.data.sequential,totalPaid:"",total:resp.data.total,UserId:resp.data.UserId,ProjectId:resp.data.ProjectId,PaymentModeId:resp.data.PaymentModeId,})

          
            }
          })
  
  
        await axios.get(`${url}/paymentmode`,{withCredentials:true}).then((resp)=>{
          setMode(resp.data)
         })
        }

       getData()


      },[])
  
  


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


    const [openModal,setOpenModal] = useState(false)
    function onOpen(){
      setOpenModal(true)
    }

    function onClose(){
      setOpenModal(false)
    }

 
    
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
  await axios.put(`${url}/invoice/${id}`,request,{withCredentials:true}).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      setInvoiceData(resp.data)
      setOpenSuccess({open:true,message:"Succesfully Updated"})
      onClose()
    }
  }).catch((error)=>{
    if (error.response && error.response.data && error.response.data.error) {
        setOpenError({open:true,message:`${error.response.data.error}`});
      } else {
        setOpenError({open:true,message:"An unknown error occurred"});
      }
})
}


  const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible((prevState) => !prevState);
  };


   



  
    return (
      <>


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

       
        <PageTitle >Invoice</PageTitle>
        <span className='flex'>
        <Badge onClick={()=>isTableVisible?setIsTableVisible(false):setIsTableVisible(true)} style={{color:'green'}} className="text-2xl ml-2">

        <div  onClick={togglePayments} className="cursor-pointer flex">
         
          {isShowingPayments ? (
            <IoIosEyeOff className="w-6 h-6" /> 
          ) : (
            <IoIosEye className="w-6 h-6" />
          )}
          <span className='ml-2'>Payments</span>
        </div>
        </Badge>
        </span>
       
        {/* <CTA /> */}
  
        {/* <!-- Cards --> */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
         
        </div>



      <Modal isOpen={openModal} onClose={onclose}>
      <ModalHeader>Update Invoice</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <Label>
            <span>date</span>
            <Input
              type="date"
              value={formValues.date}
              className="mt-1"
              name="totalPaid"
              onChange={(e)=>setFormValues({...formValues,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Notes</span>
            <Textarea
              type="text"
              // ref={modeInput}
              value={formValues.notes}
              className="mt-1"
              name="totalPaid"
              onChange={(e)=>setFormValues({...formValues,notes:e.target.value})}
              required
            />
          </Label>

          
          <Label>
            <span>Sequential</span>
            <Select
              className="mt-1"
              name="sequential"
              value={formValues.sequential}
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
            <Button layout="outline" onClick={onClose}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={onClose}>
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
  
        <TableContainer>
        <Button className="mb-4" onClick={onOpen}>Update Invoice</Button>
        </TableContainer>
  
       

     
        
 

    <div className="dropdown overflow-hidden" >
 
      {isShowingPayments && (
           <TableContainer className="mb-8">
           <Table>
             <TableHeader>
               <tr>
                 <TableCell>Invoice Id</TableCell>
                 <TableCell>Amount Received</TableCell>
                 <TableCell>Date</TableCell>
                 <TableCell>Invoiced</TableCell>
                 <TableCell>Created By</TableCell>     
                 <TableCell>Actions</TableCell>
               </tr>
             </TableHeader>
             {invoiceData?.payments?.map((pay, i) => (
             <TableBody key={i}>
               
                 <TableRow>
                   <TableCell>
                     <div className="flex items-center text-sm">
                       
                       <div>
                         <p className="font-semibold">{pay.id.slice(0,5)}</p>
                         <p className="text-xs text-gray-600 dark:text-gray-400">{pay.job}</p>
                       </div>
                     </div>
                   </TableCell>
            
                   <TableCell>
                     <div className="flex items-center text-sm">
                       
                       <div>
                         <p className="font-semibold">ETB {parseFloat(pay.amountReceived).toLocaleString()}</p>
                      
                      
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <span className="text-sm">{pay.date}</span>
                   </TableCell>
                   <TableCell>
                    <Badge type={pay.invoiced?"success":"danger"}>{pay.invoiced?'Yes':'No'}</Badge>
                   </TableCell>
                   
                   <TableCell>
                   <Badge >{pay.createdBy}</Badge>
                 </TableCell>
                   
                   <TableCell>
                     <div className="flex items-center space-x-4">
                       <Link to={{pathname:`/app/payment/${pay.id}`}}>
                       <Button layout="link" size="icon" aria-label="Edit">
                         <EditIcon className="w-5 h-5" aria-hidden="true" />
                       </Button>
                       </Link>
                       <Button  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                         <TrashIcon className="w-5 h-5" aria-hidden="true" />
                       </Button>
                     </div>
                   </TableCell>
                 </TableRow>
           
             </TableBody>
                 ))}
           </Table>
           <TableFooter>

           </TableFooter>
           
         </TableContainer>

         
      )}

        <NewInvoice invoiceData={invoiceData} mode={mode} project={project}/>
    </div>

      </>
    )


   

}




export default InvoiceDetailPage