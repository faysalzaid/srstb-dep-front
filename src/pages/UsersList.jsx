import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { EditIcon, EyeIconOne, TrashIcon } from "../icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import { url } from "../config/urlConfig";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { AuthContext } from "../hooks/authContext";
function UsersList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // const [companyData,setCompanyData] = useState([])
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedResult, setFetchedResult] = useState([]);

  const validation = Yup.object().shape({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().min(5).required("Email is required"),
    password: Yup.string().min(8).max(25).required(),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  useEffect(() => {
    axios.get(`${url}/users`,{withCredentials: true}).then((resp) => {
      if(resp.data.error){
        setUsersData([])
        console.log(resp.data.error);
        setErrorMessage(resp.data.error)
      }else{
        console.log("users data ", resp.data);
        setUsersData(resp.data);

      }
    });
  }, []);

  const addUser = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("password", data.password);
    formData.append("image", userForm.image);
    console.log("this is the data from form", formData);
    await axios.post(`${url}/users`, formData).then((resp) => {
      if (resp.data.error) {
        console.log("error: ", resp.data.error);
        setErrorMessage(resp.data.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      } else {
        setUsersData([...usersData, resp.data]);
        closeModal();
        setSuccessMessage("Successfully registerd");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    });
  };

  const deleteUser = (ids) => {
    axios.get(`${url}/users/delete/${ids}`).then((resp) => {
      if (resp.data.error) {
        setErrorMessage(resp.data.error);
      }
      const newdata = usersData.filter((d) => d.id !== ids);
      setUsersData(newdata);
      closeModal();
      setSuccessMessage("Successfully Deleted");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    });
  };

  useEffect(() => {
    setFetchedResult(searchTerm.length < 1 ? usersData : searchResult);
  }, [usersData, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newProjectData = usersData.filter((prj) => {
        return Object.values(prj)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      // console.log(newProjectData);
      setSearchResult(newProjectData);
    } else {
      setSearchResult(usersData);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
      />
      <PageTitle>List of Users</PageTitle>

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
            placeholder="Search By Name, Role, Email..."
            required
          />
        </div>
      </div>
      {/* End of search List */}

      <p></p>
      <div>
        <Button onClick={openModal}>Register User</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Client Info</ModalHeader>
        <span style={{ color: "red" }}>{errorMessage}</span>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={addUser}
          >
            <Form>
              <Label className="mt-4">
                <span>Name</span>
                <Field
                  name="name"
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                  type="text"
                  placeholder="Your Name"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  name="name"
                  component="p"
                />
              </Label>
              <Label className="mt-4">
                <span>Email</span>
                <Field
                  name="email"
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                  type="email"
                  placeholder="YourEmal@gmail.com"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  name="email"
                  component="p"
                />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Field
                  name="password"
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                  type="password"
                  placeholder="******************"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  name="password"
                  component="p"
                />
              </Label>

              <Label className="mt-4">
                <span>Role</span>
                <Field
                  as="select"
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  name="role"
                >
                  <option>Select</option>
                  <option>admin</option>
                  <option>manager</option>
                  <option>client</option>
                  <option>employee</option>
                </Field>
              </Label>
              <Label className="mt-4">
                <span>Image</span>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setUserForm({ ...userForm, image: e.target.files[0] })
                  }
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                />
              </Label>

              <Button type="submit" block className="mt-4">
                Create account
              </Button>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
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
        </ModalFooter>
      </Modal>

      <SectionTitle>Table with actions</SectionTitle>
      {successMessage ? (
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="text-sm">{successMessage}.</p>
        </div>
      ) : (
        ""
      )}
       {errorMessage ? (
        <div
          className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
          role="alert"
        >
          <p className="text-sm">{errorMessage}.</p>
        </div>
      ) : (
        ""
      )}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {fetchedResult.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <img style={{ width: 30 }} src={user.image} />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.role}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={{ pathname: `/app/users/${user.id}` }}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => deleteUser(user.id)}
                      style={{ color: "red" }}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
  );
}

export default UsersList;
