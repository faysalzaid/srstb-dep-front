import React, { useState, useEffect, useContext, useRef } from 'react';
import PageTitle from '../Typography/PageTitle';
import SectionTitle from '../Typography/SectionTitle';
import axios from 'axios';
import { ErrorAlert, SuccessAlert } from "components/Alert";
import { SelectorIcon } from '@heroicons/react/solid';
import { FaCheckCircle, FaChevronDown, FaEdit, FaEye, FaFilePdf, FaPlusCircle, FaRegMoneyBillAlt } from 'react-icons/fa';
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, TableFooter, Avatar, Badge, Pagination, Button } from '@windmill/react-ui';
import { url } from '../../config/urlConfig';
import { AiFillDelete } from 'react-icons/ai';
import { FiChevronDown, FiChevronsUp, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from 'hooks/authContext';
import useAuth from 'hooks/useAuth';
import TitleChange from 'components/Title/Title';

function ReportsComponent(props) {
  const { settings } = useAuth(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedAll, setIsExpandedAll] = useState({ open: false, id: "" });
  const [foundProject, setFoundProject] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [getAllprojects, setGetAllProjects] = useState([]);
  const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });
  const [openError, setOpenError] = useState({ open: false, message: "" });
  const printSectionRef = useRef(null);

  const getTheProject = async () => {
    // console.log(projectId);
    if (parseInt(projectId) === 0) {
      setProjectData(allProjects);
    } else {
      const data = allProjects.filter((pr) => pr.id == projectId);
      setProjectData(data);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      await axios.get(`${url}/projects`, { withCredentials: true }).then((resp) => {
        if (resp.data.error) {
        } else {
          setProjectData(resp.data.projects);
          setAllProjects(resp.data.projects);
          
        }
      }).catch((error) => {
        console.log(error);
      });
    };
    getProjects();
  }, []);

  const [isDeleteOpen, setIsDeleteOpen] = useState({ open: false, id: "" });

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const openDelete = (id) => {
    setIsDeleteOpen({ open: true, id });
  };

  const printSection = () => {
    const printContents = printSectionRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      <section className="contracts-section p-4 rounded-md shadow-md">
        <div className="container mx-auto">
          <PageTitle>Generate Reports</PageTitle>
          <TitleChange name={`Reports | ${settings.name}`} />
          <SectionTitle></SectionTitle>

          {/* Data section */}
          <h2 className="text-lg font-medium mb-2">Generate</h2>
          <div className="flex relative inline-flex">
            <select
              onChange={(e) => setProjectId(e.target.value)}
              className="flex-2 mt-1 w-48 h-10 pl-3 pr-8 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={0}>All Projects</option>
              {allProjects?.map((pr) => <option value={pr.id} key={pr.id}>{pr.name}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <FaChevronDown className="text-gray-400" />
            </div>
          </div>
          <Button
            onClick={() => getTheProject()}
            className="ml-4 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={projectId === 0 ? true : false}
          >
            Generate
          </Button>
          {/* End of data section */}

          <div className="flex items-center mt-4">
            <PageTitle>Report</PageTitle>
            <FaFilePdf className="ml-6 cursor-pointer" onClick={printSection} />
          </div>

          {/* All Projects Section */}
          <div className="container mx-auto">
            <div className="max-w-full overflow-x-auto" ref={printSectionRef}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="font-semibold">Name</TableCell>
                    <TableCell className="font-semibold">Status</TableCell>
                    <TableCell className="font-semibold">Start Time</TableCell>
                    <TableCell className="font-semibold">End Time</TableCell>
                    <TableCell className="font-semibold">Percentage</TableCell>
                    <TableCell className="font-semibold">Consultant</TableCell>
                    <TableCell className="font-semibold">TotalCost</TableCell>
                    <TableCell className="font-semibold">Utilized Cost</TableCell>
                    <TableCell className="font-semibold">View</TableCell>
                    
                    <TableCell className="font-semibold">Expand</TableCell>
                    <TableCell className="font-semibold">
                      <span className="sr-only">View details</span>
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectData?.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      <TableRow>
                        <TableCell className="font-bold text-sm">{row.name}</TableCell>
                        <TableCell className="font-bold text-sm">{row.status}</TableCell>
                        <TableCell className="font-bold text-sm">{row.starttime}</TableCell>
                        <TableCell className="font-bold text-sm">{row.endtime}</TableCell>
                        <TableCell className="font-bold text-sm">{row.physicalPerformance} %</TableCell>
                        <TableCell className="font-bold text-sm">{row.consultant}</TableCell>
                        <TableCell className="font-bold text-sm">{parseFloat(row.totalCost).toLocaleString({ maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="font-bold text-sm">{parseFloat(row.utilizedCost).toLocaleString({ maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="font-bold text-sm" style={{ color: "blue" }}>
                          <Link to={`/app/pglist/${row.id}`}>
                            <FaEye className="ml-3" />
                          </Link>
                        </TableCell>
                      
                        <TableCell className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                            onClick={() => setIsExpanded({ open: !(isExpanded.open), id: row.id })}
                          >
                            {isExpandedAll.open && isExpandedAll.id === row.id ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                        </TableCell>
                      </TableRow>
                      {isExpanded.open && isExpanded.id === row.id && (
                        <TableRow>
                          <TableCell colSpan="11" className="px-6 py-4 whitespace-nowrap">
                            <div className="overflow-x-auto">
                              <Table className="min-w-full divide-y divide-gray-200">
                                <TableHeader>
                                  <TableRow>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Alo.Budget</TableCell>
                                    <TableCell>Uti.Budget</TableCell>
                                    <TableCell>Rem.Budget</TableCell>
                                  
                                   
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {row.yearlyBudgets?.map((budget, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{budget.year}</TableCell>
                                      <TableCell>ETB {parseFloat(budget.allocatedBudget).toLocaleString({ maximumFractionDigits: 2 })}</TableCell>
                                      <TableCell>ETB {parseFloat(budget.utilizedBudget).toLocaleString({ maximumFractionDigits: 2 })}</TableCell>
                                      <TableCell>ETB {parseFloat(budget.remainingBudget).toLocaleString({ maximumFractionDigits: 2 })}</TableCell>
                                      <TableCell style={{ color: "red" }} className="mr-6 px-6">
                                        
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {/* End of All Projects Section */}
        </div>
      </section>
    </>
  );
}

export default ReportsComponent;
