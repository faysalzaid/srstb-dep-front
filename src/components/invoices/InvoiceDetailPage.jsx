
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




const InvoiceDetailPage = () => {
    const {authState} = useContext(AuthContext)
    const [showPayments, setShowPayments] = useState(false);
    const [invoiceData, setInvoiceData] = useState({})
    const [mode,setMode] = useState([])
    const [data, setData] = useState([])
    const [project,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
    const {id} = useParams()
  
    const [isShowingPayments, setIsShowingPayments] = useState(false);

    function togglePayments() {
    setIsShowingPayments(!isShowingPayments);
  }

    // console.log('data from app',authState);
      useEffect(()=>{

        axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            console.log(resp.data.error);
          }else{
            setProject(resp.data.projects)
          }
        })

        axios.get(`${url}/invoice/${id}`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){

          }else{
            setInvoiceData(resp.data)
        
          }
        })


      axios.get(`${url}/paymentmode`,{withCredentials:true}).then((resp)=>{
        setMode(resp.data)
       })


      },[])
  
  


 
    
  const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible((prevState) => !prevState);
  };


   



  
    return (
      <>

       
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
  
        <TableContainer>

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
                         <p className="font-semibold">ETB {pay.amountReceived.toLocaleString()}</p>
                      
                      
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