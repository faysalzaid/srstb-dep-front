
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




const InvoiceList = () => {
    const {authState} = useContext(AuthContext)

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [projects,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
  
  
  
    // console.log('data from app',authState);
      useEffect(()=>{
      axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          console.log(resp.data.error);
        }
      setProject(resp.data.projects)
  
      },[])
  
  
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
  
    useEffect(() => {
      setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
    }, [page])
  
    return (
      <>
  
        <PageTitle>Invoices</PageTitle>
  
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
                    <span className="text-sm font-semibold">{bid.customer}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">{bid.project}</span>
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

      </>
    )


   

}




export default InvoiceList