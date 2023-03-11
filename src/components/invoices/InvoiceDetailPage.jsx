
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
  
  
    // console.log('data from app',authState);
      useEffect(()=>{

        axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            console.log(resp.data.error);
          }else{
            setProject(resp.data.projects)
          }
        })

        axios.get(`${url}/invoice/${id}`).then((resp)=>{
          if(resp.data.error){

          }else{
            setInvoiceData(resp.data)
        
          }
        })


      axios.get(`${url}/paymentmode`,{withCredentials:true}).then((resp)=>{
        setMode(resp.data)
       })


      },[])
  
  

  
    // pagination setup

    // pagination change control
 
    
    const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible((prevState) => !prevState);
  };


   
// Invoice Data  
const invoiceList = [
  {
    id: 1,
    totalAmount: 500,
    date: '2022-05-01',
    customer: 'ACME Inc.',
    project: 'Web Development Project',
    status: 'Paid',
  },
  {
    id: 2,
    totalAmount: 750,
    date: '2022-05-15',
    customer: 'XYZ Corporation',
    project: 'Mobile App Development',
    status: 'PartiallyPaid',
  },
  {
    id: 3,
    totalAmount: 1000,
    date: '2022-06-01',
    customer: 'ABC Corp.',
    project: 'Data Analysis Project',
    status: 'Overdue',
  },
  {
    id: 4,
    totalAmount: 250,
    date: '2022-06-15',
    customer: '123 Inc.',
    project: 'Marketing Campaign',
    status: 'Paid',
  },
];

// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data
  

  
    return (
      <>
  
        <PageTitle>Invoice- <Button size="small"><span onClick={()=>isTableVisible?setIsTableVisible(false):setIsTableVisible(true)}>Payments</span></Button></PageTitle>
  
        {/* <CTA /> */}
  
        {/* <!-- Cards --> */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
         
        </div>
  
        <TableContainer>
        {/* Calendar section */}
  
        
        <NewInvoice invoiceData={invoiceData} mode={mode} project={project}/>
        {/* <NewList /> */}
  
        {/* end of calendar section */}
        </TableContainer>
  
       

     
        
 

    <div className="dropdown overflow-hidden" >
 
      {isTableVisible && (
           <TableContainer className="mb-8">
           <Table>
             <TableHeader>
               <tr>
                 <TableCell>Invoice Id</TableCell>
                 <TableCell>Total Amount</TableCell>
                 <TableCell>Date</TableCell>
                 <TableCell>Customer</TableCell>
                 <TableCell>Project</TableCell>
                 <TableCell>Status</TableCell>
                 <TableCell>Actions</TableCell>
               </tr>
             </TableHeader>
             {invoiceList.map((bid, i) => (
             <TableBody key={i}>
               
                 <TableRow>
                   <TableCell>
                     <div className="flex items-center text-sm">
                       
                       <div>
                         <p className="font-semibold">{bid.id}</p>
                         <p className="text-xs text-gray-600 dark:text-gray-400">{bid.job}</p>
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <div className="flex items-center text-sm">
                       
                       <div>
                         <p className="font-semibold">{bid.totalAmount}</p>
                         {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                      
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <div className="flex items-center text-sm">
                       
                       <div>
                         <p className="font-semibold">{bid.date}</p>
                         {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                      
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <span className="text-sm">{bid.customer}</span>
                   </TableCell>
                   <TableCell>
                     <span className="text-sm">{bid.project}</span>
                   </TableCell>
                   
                   <TableCell>
                   <Badge type={bid.status==='approved'?"success":"danger"}>{bid.status}</Badge>
                 </TableCell>
                   
                   <TableCell>
                     <div className="flex items-center space-x-4">
                       <Link to={{pathname:`/app/invoice/${bid.id}`}}>
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
             {/* <Pagination
               // totalResults={totalResults}
               // resultsPerPage={resultsPerPage}
               // onChange={onPageChangeTable2}
               // label="Table navigation"
             /> */}
           </TableFooter>
         </TableContainer>
      )}
    </div>

      </>
    )


   

}




export default InvoiceDetailPage