
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
import { Button } from '@mui/material'




const InvoiceDetailPage = () => {
    const {authState} = useContext(AuthContext)
    const [showPayments, setShowPayments] = useState(false);
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [projects,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
  
  
  
    // console.log('data from app',authState);
      useEffect(()=>{

  
      },[])
  
  
  useEffect(()=>{
    axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
      const data = resp.data
      setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
    })
  },[])
  
    // pagination setup
    const resultsPerPage = 10
    const totalResults = response.length
  
    // pagination change control
    function onPageChange(p) {  
      setPage(p)
    }
    
    const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible((prevState) => !prevState);
  };

  
  const projectPercentileGraph = {
    data: {
        datasets: [{
            data: projects?.map(pr=> pr.percentage),
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: projects?.map(pr=>pr.color),
            label: 'Percentage',
        }, ],
        labels: projects?.map((pr)=>pr.name),
    },
    options: {
        responsive: true,
        cutoutPercentage: 80,
    },
    legend: {
        display: false,
    },
  }
  
   
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
  
        <PageTitle></PageTitle>
  
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
  
  
  
        {/* end of calendar section */}
        </TableContainer>
  
       


        <div className="max-w-7xl  py-6 sm:px-6 lg:px-9">
      <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
        {/* Company Logo and Details */}
        <div className="flex items-center justify-between mb-6">
          
          <div className="flex items-center space-x-4">
            
            <img className="w-16 h-16" src="https://via.placeholder.com/150" alt="Company Logo" />
            <div>
              <h3 className="text-lg font-medium">Company Name</h3>
              <p className="text-sm">123 Main Street, Anytown USA</p>
            </div>
            
          </div>


      
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <h4 className="text-lg font-medium mb-6 font-semibold">Invoice Details</h4>
            <ul className="list-none">
              <li className="flex items-center mb-6 font-semibold">
                <span className="w-1/4 text-gray-600">Customer:</span>
                <span className="w-3/4">John Smith</span>
              </li>
              <li className="flex items-center mb-6 font-semibold">
                <span className="w-1/4 text-gray-600">Payment Mode:</span>
                <span className="w-3/4">Credit Card</span>
              </li>
              <li className="flex items-center mb-6 font-semibold">
                <span className="w-1/4 text-gray-600">Invoice Date:</span>
                <span className="w-3/4">May 1, 2022</span>
              </li>
              <li className="flex items-center mb-6 font-semibold">
                <span className="w-1/4 text-gray-600">Project:</span>
                <span className="w-3/4">Website Development</span>
              </li>
              <li className="flex items-center mb-6 font-semibold">
                <span className="w-1/4 text-gray-600">Invoice ID:</span>
                <span className="w-3/4">INV-001</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6 font-semibold">Payment Details</h4>
            <ul className="list-none">
              <li className="flex items-center mb-6 font-semibold">
                <span className="w-1/4 text-gray-600">Payment Amount:</span>
                <span className="w-3/4">$1,200.00</span>
              </li>
              <li className="flex items-center mb-6 font-semibold">
                <span className="w-1/4 text-gray-600">Total Amount:</span>
                <span className="w-3/4">$1,500.00</span>
              </li>
              <li className="flex items-center mb-2">
              <button className="dropdown-btn bg-purple-500 text-white px-2 py-2 mt-0 rounded-md flex items-center text-sm" onClick={toggleTableVisibility}>
          <FaList className="mr-2" />
          view Payments
      </button>
                </li>
                </ul>
                </div>
                </div>
                </div>
                </div>

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