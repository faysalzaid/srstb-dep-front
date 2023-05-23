import React, { useState, useEffect } from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import { AuthContext } from "../hooks/authContext";
import { useContext } from "react";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, EyeIcon, TrashIcon, EditIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";
import UnAuthorized from "components/UnAuthorized/UnAuthorized";
import TitleChange from "components/Title/Title";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";
import { withRouter } from "react-router-dom";
import { url } from "config/urlConfig";
import axios from "axios";
import Line_Chart from "global/recharts/Line_Chart";
import Area_Chart from "global/recharts/Area_Chart";

import { Button } from "@mui/material";

function Dashboard(props) {
  const { authState, settings } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [procurement, setProcurement] = useState([]);
  const [deadlineProjects,setDeadlineProjects] = useState([])
  const [projects, setProject] = useState([]);
  const [countsData, setCountsData] = useState({
    projectCount: "",
    bidCount: "",
    activeProjects: "",
    completedProjects: "",
  });
  const [authorization, setAuthorization] = useState(false);

  // console.log('data from app',authState);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${url}/projects`, { withCredentials: true })
        .then((resp) => {
          if (resp.data.error) {
            console.log(resp.data.error);
          }
          setProject(resp.data.projects);
          const ddata = resp.data.projects.filter((pr)=>{
            const currentDate = new Date();
            const endTime = new Date(pr.endtime);
            return endTime.getTime() <= currentDate.getTime();
          })
          console.log(ddata);
          setDeadlineProjects(ddata)
        })
        .catch((err) => {
          setAuthorization(true);
        });
    };

    const getCounts = async () => {
      await axios
        .get(`${url}/counts`, { withCredentials: true })
        .then((resp) => {
          const data = resp.data;
          setCountsData({
            projectCount: data.projectsCount,
            bidCount: data.countBids,
            activeProjects: data.activeProjectsCount,
            completedProjects: data.completedProjects,
          });
        });
    };


    const getProcurements = async()=>{
      await axios.get(`${url}/procurement`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){

          }else{
            const data = resp.data.filter((pr)=>{
              const currentDate = new Date();
              const endTime = new Date(pr.endtime);
              return endTime.getTime() <= currentDate.getTime();
            })
            setProcurement(resp.data)
          }
      })
    }

    getCounts();

    getData();

    // console.log(favicon);
  }, []);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const projectPercentileGraph = {
    data: {
      datasets: [
        {
          data: projects?.map((pr) => pr.physicalPerformance),
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: projects?.map((pr) => pr.color),
          label: "Percentage",
        },
      ],
      labels: projects?.map((pr) => pr.name),
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };

  // on page change, load new sliced data
  // here you would make another server request for new data



  return (
    <>
      <TitleChange name={`Dashboard | ${settings.name}`} />

        <>
          <PageTitle>Dashboard welcome {authState.username}</PageTitle>

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

            <InfoCard
              title="Completed Projects"
              value={countsData.completedProjects}
            >
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
              <ChartLegend legends={projects} />
            </ChartCard>

            <ChartCard title="Lines">
              <Line {...projectPercentileGraph} />
              <ChartLegend legends={projects} />
            </ChartCard>
          </div>


          <section className="grid gap-6 mb-8 md:grid-cols-2">
            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Deadlined Projects
              </p>


              <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>P.Cost</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            
            <TableBody>
            {deadlineProjects.map((project, i) => (  
                <TableRow key={i} className="bg-red-200">
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{project.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  
                  <TableCell>
                    <span className="text-sm">{project.totalCost}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{project.starttime}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{project.endtime}</span>
                  </TableCell>
                  
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/projects/${project.id}`}}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                    
                    </div>
                  </TableCell>
                </TableRow>
          ))}
            </TableBody>
                
          </Table>
          <TableFooter>
          </TableFooter>
        </TableContainer>


            </div>

            <div className=" p-4 pb-0 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll">
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Deadlined Procurements
              </p>
              {/* <OngoingProjects /> */}
            </div>
          </section>

          <section className=" w-full overflow-x-hidden flex flex-col gap-6 mb-6 ">
            <ChartCard title="Yearly Data Comparison">
              <div style={{ height: "260px" }}>
                <Line_Chart />
              </div>
            </ChartCard>

            <ChartCard title="Yearly Data Comparison">
              <div style={{ height: "260px" }}>
                <Area_Chart />
              </div>
            </ChartCard>
          </section>


         
          {/* <section className=" grid gap-6 md:grid-cols-1"> */}
          <div className=" p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 overflow-scroll mb-6">
            <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
              Our Emplooyees
            </p>
       
          </div>
          {/* </section> */}
        </>

    </>
  );
}

export default withRouter(Dashboard);
