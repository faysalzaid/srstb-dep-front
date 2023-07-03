import React, { useEffect, useState } from "react";
import { RiSettings3Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import "./overview.css";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { EditIcon, EyeIcon, EyeIconOne } from "icons";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { url } from "config/urlConfig";
import Line_Chart from "global/recharts/Line_Chart";
import Bar_Chart2 from "global/recharts/Bar_Chart2";
import ChartBudgetLegend from "components/Chart/ChartBudgetLegend";

function OverView({ project, setProject, companyData, id }) {
  let companyUrl = companyData.map((cp) =>
    cp.id === project.CompanyId ? `/app/companies/${cp.id}` : ``
  );
  const [invoiceData, setInvoiceData] = useState({
    total: "",
    totalPaid: "",
    amountDue: "",
    id: "",
  });

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${url}/invoice`, { withCredentials: true })
        .then((resp) => {
          if (resp.data.error) {
            return
          } else {
            const data = resp.data.filter((inv) => inv.ProjectId === id);
            setInvoiceData(data[0]);
          }
        });
    };

    getData();
  }, []);


  


  const projectBudgetGraph = {
    data: {
      datasets: [
        {
          data: project?.yearlyBudgets?.map((pr) => pr?.financialPerformance),
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: project?.yearlyBudgets?.map((pr) => pr?.color),
          label: "Financial Performance",
        },
      ],
      labels: project?.yearlyBudgets?.map((pr) => pr?.year?.slice(0,4)) || [], // Add a default empty array if yearlyBudgets is undefined
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };


  const projectAmountUtilized = {
    data: {
      datasets: [
        {
          data: project?.yearlyBudgets?.map((pr) =>
            parseFloat(pr?.utilizedBudget)
          ),
          backgroundColor: project?.yearlyBudgets?.map((pr) => pr?.color),
          label: "Amount Utilized",
        },
      ],
      labels: project?.yearlyBudgets?.map((pr) => pr?.year?.slice(0,4)) || [],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
      tooltips: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.yLabel;
            return value.toLocaleString();
          },
        },
      },
    },
    legend: {
      display: true,
    },
  };
  



    
  return (
    <section className=" max-w-full overview-section show bg-white show p-4 rounded-md rounded-t-none shadow-md dark:bg-gray-700 mb-6 overflow-hidden">
      <div className="left-overview dark:text-gray-200">
        <div>
          <span id="overview-title" className="text-lg font-bold">
            OVERVIEW
          </span>
        </div>
        <div className="project-overview mb-5">
          <div className="project-title">
            <ul>
              <li>
                <div className="project-title-div">
                  <p className="font-medium">Project #</p>
                  <p className="font-bold">{project.name}</p>
                </div>
              </li>
              <li>
                <div className="project-title-div">
                  <p className="font-medium">Customer</p>

                  <p id="customer" className="font-bold">
                    {" "}
                    <Link to={`${companyUrl[0]}`}>
                      {companyData.map((cp) =>
                        cp.id === project.CompanyId ? cp.name : ""
                      )}{" "}
                    </Link>
                  </p>
                </div>
              </li>

              <li>
                <div className="project-title-div">
                  <p className="font-medium">Total Rate</p>
                  <p className="font-bold">
                    ETB{" "}
                    {parseFloat(project?.totalCost)?.toLocaleString({
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </li>
              <li>
                <div className="project-title-div">
                  <p className="font-medium">Status</p>
                  <p className="font-bold">{project?.status}</p>
                </div>
              </li>
              <li>
                <div className="project-title-div">
                  <p className="font-medium">Date Created</p>
                  <p className="font-bold">{project?.starttime}</p>
                </div>
              </li>
              <li>
                <div className="project-title-div">
                  <p className="font-medium">Started Date</p>
                  <p className="font-bold">{project?.starttime}</p>
                </div>
              </li>
              <li>
                <div className="project-title-div">
                  <p className="font-medium">Deadline</p>
                  <p className="font-bold">{project?.endtime}</p>
                </div>
              </li>

              <li>
                <div className="project-title-div">
                  <p className="font-medium">Financial Performance</p>
                  <p className="font-bold">{project?.financialPerformance}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="project-progress ">
            <p className="font-medium">Project Progress</p>
            <div className="progress-container">
              <div
                className="circle-progress text-black"
                style={{
                  background: `conic-gradient(#80c617 ${
                    project.physicalPerformance * 3.6
                  }deg, #f5f5f5 0deg)`,
                }}
              >
                <div className="progress-value">
                  {project.physicalPerformance}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-div">
          <span id="description-title" className="text-lg font-bold">
            Description
          </span>
          <p className="text-gray-500">{project?.description}</p>
        </div>
        <div className="members-div">
          <div className="members-title flex items-center justify-between">
            <span className="text-lg font-bold">Members</span>
            <RiSettings3Fill id="setting-icon" className="text-gray-500" />
          </div>
          <div className="member-card-container">
            <div className="member flex items-center justify-between">
              <div className="member-left flex items-center">
                <div className="user-image w-10 h-10 rounded-full bg-gray">
                  <span className="font-semibold">Faysal Ali</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-overview overflow-scroll  ">
        {invoiceData && (
          <div className="specific-width ">
            <div className="expenses-div-container flex justify-between gap-2 ">
              <div className="expenses-div h-full">
                <p id="total-expenses">INVOICE</p>
                <p className="expenses-cost dark:text-white">
                  ETB {parseFloat(invoiceData?.total).toLocaleString()}
                </p>
              </div>

              <div className="expenses-div h-full">
                <p id="billabe-expenses">PAID</p>
                <p className="expenses-cost dark:text-white">
                  ETB {parseFloat(invoiceData?.totalPaid).toLocaleString()}
                </p>
              </div>

              <div className="expenses-div h-full">
                <p id="billed-expenses">REMAINING</p>
                <p className="expenses-cost dark:text-white">
                  ETB {parseFloat(invoiceData?.amountDue).toLocaleString()}
                </p>
              </div>

              <div className="expenses-div h-full">
                <p id="unbilled-expenses">VIEW</p>
                <Link to={`/app/invoice/${invoiceData?.id}`}>
                  <p className="expenses-cost dark:text-white">
                    <FiEdit />
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
        <section className=" specific-width w-fit h-full flex justify-center">
          <div className="right-overview-chart ">
           
      
            <ChartCard title="Budget Financial Performance (Year Based)">
              <Line {...projectBudgetGraph} />
              <ChartBudgetLegend legends={project} />
            </ChartCard>

            <ChartCard title="Budget Utilized Amount (Year Based)">
              <Line {...projectAmountUtilized} />
              <ChartBudgetLegend legends={project} />
            </ChartCard>


          </div>
        </section>
      </div>
    </section>
  );
}

export default OverView;
