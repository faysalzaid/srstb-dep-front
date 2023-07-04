import React, { useState, useEffect, Fragment } from "react";

import CTA from "../../components/CTA";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import { AuthContext } from "../../hooks/authContext";
import { useContext } from "react";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  TrashIcon,
  EditIcon,
} from "../../icons";
import RoundIcon from "../RoundIcon";
import response from "../../utils/demo/tableData";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { DocumentAddIcon } from "@heroicons/react/outline";

import { ErrorAlert, SuccessAlert } from "components/Alert";

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
  Button,
} from "@windmill/react-ui";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";
import { Link, withRouter } from "react-router-dom";
import { url } from "config/urlConfig";
import axios from '../../config/axiosConfig'
import TitleChange from "components/Title/Title";

const CandidateList = () => {
  const { authState, settings } = useContext(AuthContext);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedResult, setFetchedResult] = useState([]);
  const [countsData, setCountsData] = useState({
    projectCount: "",
    bidCount: "",
    activeProjects: "",
    completedProjects: "",
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [candidateForm, setCandidateForm] = useState({
    date: "",
    name: "",
    qualification: "",
    yearsOfExperience: "",
    organizationWorkedBefore: "",
    address: "",
    location: "",
    vacancy: "",
    status: "",
  });

  // Notifications
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
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${url}/candidates`, { withCredentials: true })
        .then((resp) => {
          setCandidateData(resp.data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          } else {
            setOpenError({ open: true, message: "An unknown error occurred" });
          }
        });

      await axios
        .get(`${url}/employees`, { withCredentials: true })
        .then((resp) => {
          setEmployeeData(resp.data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          } else {
            setOpenError({ open: true, message: "An unknown error occurred" });
          }
        });
      await axios
        .get(`${url}/departments`, { withCredentials: true })
        .then((resp) => {
          setDepartmentData(resp.data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          } else {
            setOpenError({ open: true, message: "An unknown error occurred" });
          }
        });

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
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          } else {
            setOpenError({ open: true, message: "An unknown error occurred" });
          }
        });
    };

    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${url}/candidates`, candidateForm, { withCredentials: true })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          // console.log(resp.data);
          setCandidateData((prev) => [...prev, resp.data]);
          setOpenSuccess({ open: true, message: "Successfully Added" });
          closeModal();
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: "An unknown error occurred" });
        }
      });
  };

  useEffect(() => {
    setFetchedResult(searchTerm.length < 1 ? candidateData : searchResult);
  }, [candidateData, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newPayroll = candidateData?.filter((empl) => {
        return Object.values(empl)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      // console.log(newEmployeeList);
      setSearchResult(newPayroll);
    } else {
      setSearchResult(candidateData);
    }
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState({ open: false, id: "" });

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };
  const openDelete = (id) => {
    setIsDeleteOpen({ open: true, id });
  };

  // Delete row
  const handleDelete = async () => {
    await axios
      .delete(`${url}/candidates/${isDeleteOpen.id}`, { withCredentials: true })
      .then((resp) => {
        const data = candidateData.filter((dt) => dt.id !== isDeleteOpen.id);
        setCandidateData(data);
        setOpenSuccess({ open: true, message: "deleted Successfully" });
        closeDelete();
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: "An unknown error occurred" });
        }
      });
  };

  return (
    <>
      <TitleChange name={`Candidates | ${settings.name}`} />
      <PageTitle>Candidates</PageTitle>
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

      {/* Search section */}
      <div className="mb-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              strokeWidth="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <Input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={(e) => searchHandler(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Companies, Locations..."
            required
          />
        </div>
      </div>
      {/* End of search List */}

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
        {/* Delete Confirm section */}
        <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>

        {/* End of delete Section */}

        <Button onClick={openModal}>New Candidate</Button>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalHeader>Register Candidate</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Label>
                <span>Date</span>
                <Input
                  type="date"
                  className="mt-1"
                  name="date"
                  onChange={(e) =>
                    setCandidateForm({ ...candidateForm, date: e.target.value })
                  }
                  required
                />
              </Label>

              <Label>
                <span>Full Name</span>
                <Input
                  //   type="number"
                  className="mt-1"
                  name="name"
                  onChange={(e) =>
                    setCandidateForm({ ...candidateForm, name: e.target.value })
                  }
                  required
                />
              </Label>

              <Label>
                <span>status</span>
                <Select
                  className="mt-1"
                  name="status"
                  // value={formValues.ProjectId}
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      status: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Status</option>

                  <option>pending</option>
                  <option>shortlisted</option>
                  <option>selected</option>
                  <option>rejected</option>
                </Select>
              </Label>

              <Label>
                <span>Qualification</span>
                <Input
                  // type="number"
                  className="mt-1"
                  name="qualification"
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      qualification: e.target.value,
                    })
                  }
                  required
                />
              </Label>

              <Label>
                <span>Years Of Experience</span>
                <Input
                  type="number"
                  className="mt-1"
                  name="yearsOfExperience"
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      yearsOfExperience: e.target.value,
                    })
                  }
                  required
                />
              </Label>

              <Label>
                <span>Organization Worked Before</span>
                <Input
                  // type="number"
                  className="mt-1"
                  name="organizationWorkedBefore"
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      organizationWorkedBefore: e.target.value,
                    })
                  }
                  required
                />
              </Label>

              <Label>
                <span>Adress</span>
                <Input
                  // type="number"
                  className="mt-1"
                  name="address"
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </Label>

              <Label>
                <span>Location</span>
                <Input
                  // type="number"
                  className="mt-1"
                  name="location"
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </Label>

              <Label>
                <span>Vacancy</span>
                <Input
                  // type="number"
                  className="mt-1"
                  name="vacancy"
                  onChange={(e) =>
                    setCandidateForm({
                      ...candidateForm,
                      vacancy: e.target.value,
                    })
                  }
                  required
                />
              </Label>
            </div>
            <div className="hidden sm:block">
              <Button className="mt-6" type="submit">
                Submit
              </Button>
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
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
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

      <section className=" w-full overflow-hidden mt-6 border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold">Date</TableCell>
              <TableCell className="font-semibold">Full Name</TableCell>
              <TableCell className="font-semibold">Qualification</TableCell>
              <TableCell className="font-semibold">Experience(Years)</TableCell>
              <TableCell className="font-semibold">Worked Before</TableCell>
              <TableCell className="font-semibold">Address</TableCell>
              <TableCell className="font-semibold">Location</TableCell>
              <TableCell className="font-semibold">Vacancy</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold text-center">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchedResult
              ? fetchedResult.map((row, i) => (
                  <Fragment key={i}>
                    <TableRow>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.date}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.qualification}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.yearsOfExperience}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.organizationWorkedBefore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.address}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.location}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.vacancy}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-semibold">
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell className="flex justify-center space-x-2">
                        <Link to={`/app/candidates/${row.id}`}>
                          <Button layout="link" size="small">
                            <EditIcon className="h-5 w-5 text-blue-600" />
                          </Button>
                        </Link>
                        <Button
                          layout="link"
                          size="small"
                          onClick={() => openDelete(row.id)}
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))
              : ""}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default CandidateList;
