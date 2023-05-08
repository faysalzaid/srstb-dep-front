import React, { useState, useEffect } from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import { AuthContext } from "../hooks/authContext";
import { useContext } from "react";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";
import UnAuthorized from "components/UnAuthorized/UnAuthorized";
import TitleChange from "components/Title/Title";

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
import Line_Chart from "recharts/Line_Chart";
import Area_Chart from "recharts/Area_Chart";

function Dashboard(props) {
  const { authState, settings } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
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
        })
        .catch((err) => {
          setAuthorization(true);
        });
    };

    getData();
    // console.log(favicon);
  }, []);

  useEffect(() => {
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

    getCounts();
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

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <>
      <TitleChange name={`Dashboard | ${settings.name}`} />
      {authorization ? (
        <UnAuthorized />
      ) : (
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
        </>
      )}
    </>
  );
}

export default withRouter(Dashboard);
