import React, { useState, useEffect } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'

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
} from '../utils/demo/chartsData'
import { withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'

function Dashboard(props) {
  const [authState] = useContext(AuthContext)

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [projects,setProject] = useState([])



    useEffect(()=>{
    axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        console.log(resp.data.error);
      }
    setProject(resp.data.projects)

    },[])


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



  // on page change, load new sliced data
  // here you would make another server request for new data

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>

      <PageTitle>Dashboard welcome  {authState.username}</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
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

      <PageTitle>Projects</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
      <ChartCard title="Project Percent Graph">
          <Doughnut {...projectPercentileGraph} />
          <ChartLegend legends={projects}/>
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...projectPercentileGraph} />
          <ChartLegend legends={projects}/>
        </ChartCard>
      </div>
    </>
  )
}

export default withRouter(Dashboard)
