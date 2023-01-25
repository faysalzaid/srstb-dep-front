import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
function UsersDetail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  const { id } = useParams();
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
  const [usersData, setUsersData] = useState({});

  const validation = Yup.object().shape({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().min(5).required("Email is required"),
  });
  const initialValues = {
    name: usersData.name,
    email: usersData.email,
    password: "",
    role: usersData.role,
    image: usersData.image,
  };

  useEffect(() => {
    axios.get(`${url}/users/${id}`,{withCredentials:true}).then((resp) => {
      if(resp.data.error){
        setUsersData({})
        console.log(resp.data.error);
      }else{

        setUsersData(resp.data);
      }
    });
  }, []);

  const updateUser = async (data) => {
    console.log('data is ',data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("password", data.password);
    formData.append("image", userForm.image);
    console.log("this is the data from formik", formData);
    await axios.post(`${url}/users/${id}`, formData,{withCredentials:true}).then((resp) => {
      // console.log();
      if (resp.data.error) {
        setErrorMessage(resp.data.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      } else {
        setUsersData(resp.data);
        closeModal();
        setSuccessMessage("Successfully Updated");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    });
  };

  const deleteUser = () => {
    axios.get(`${url}/users/delete/${id}`,{withCredentials:true}).then((resp) => {
      if (resp.data.error) {
        setErrorMessage(resp.data.error);
      }
      setUsersData({});
      closeModal();
      setSuccessMessage("Successfully Deleted");
      setTimeout(() => {
        setSuccessMessage("");
        props.history.push("/app/users");
      }, 1000);
    });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
      />
      <PageTitle>{usersData.name}</PageTitle>
      <p></p>
      <div>
        <Button onClick={openModal}>Update User</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Client Info</ModalHeader>
        <span style={{ color: "red" }}>{errorMessage}</span>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={updateUser}
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
                <span>
                  Password{" "}
                  <small style={{ color: "red" }}>
                    (write new password if you want to update it )
                  </small>
                </span>
                <Field
                  name="password"
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                  type="password"
                />
              </Label>

              <Label className="mt-4">
                <span>Role</span>
                <Field
                  as="select"
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  name="role"
                >
             
                  <option>admin</option>
                  <option>finance</option>
                  <option>engineer</option>
                  <option>employee</option>
                  <option>bidadminstration</option>
                  <option>planning</option>
                  <option>client</option>
                </Field>
              </Label>

              <Label className="mt-4">
                <span>Update Image</span>
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
                Update account
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
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">{usersData.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">{usersData.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">{usersData.role}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={deleteUser}
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

export default UsersDetail;
