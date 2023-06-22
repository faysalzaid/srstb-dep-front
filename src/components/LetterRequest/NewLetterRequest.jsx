import { Link, NavLink } from "react-router-dom";
import RequestButton from "./RequestButton";

import React, { useState, useEffect,Fragment } from 'react'

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
import { PlusCircleIcon } from "@heroicons/react/outline";
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
} from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import axios from "axios";
import { url } from "config/urlConfig";

let Container = "div";

const NewLetterRequest = () => {
  const [getLetter,setGetLetters] = useState([])
  useEffect(()=>{
    const getLetterFunc =async()=>{
      await axios.get(`${url}/requestLetter`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setGetLetters(resp.data)
        // console.log(resp.data);
      })
    }
    getLetterFunc()
  },[])


// Alert logic and initialization
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
// alert logic and initialization

 const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

 const closeDelete = ()=>{
   setIsDeleteOpen(false)
}
 const openDelete = (id)=>{
   setIsDeleteOpen({open:true,id:id})
}

const handleDelete = async() => {
  await axios.delete(`${url}/requestLetter/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
   if(resp.data.error){

   }else{
     const data = getLetter.filter((pr)=>pr.id!==isDeleteOpen.id)
     setGetLetters(data)
     setOpenSuccess({open:true,message:"Successfully Deleted"})
     closeDelete()
   }
  })
 };







  return (
    <Container className=" py-5 ">
        {/* Delete Confirm section */}
     <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleDelete}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}

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
      {/* Title */}
      <span className=" font-semibold text-2xl dark:text-gray-400">
        Letter Request
      </span>

      {/* Request Buttons */}
      <section className=" mt-6 grid sm:grid-flow-row md:grid-cols-1 gap-5 ">
        <RequestButton to="./others_request" title="Create Request Letter" />
      </section>

      <TableContainer className="mb-8 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Letter ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Edit / Delete</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getLetter?.map((letter) => (
              <TableRow key={letter.id} >
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{letter.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{letter.createdAt.slice(0,10)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{letter?.User?.name}</span>
                </TableCell>
             
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/requests/${letter.id}`}>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Edit"
                      title="Edit"
                      
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <EditIcon />
                      </svg>
                    </Button>
                    </Link>
                    <Button 
                     onClick={()=>openDelete(letter.id)}
                     layout="link"
                     size="icon"
                     aria-label="Delete"
                     title="Delete"
                     style={{color:'red'}}
                     >
                       <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <TrashIcon />

                      </svg>
                      
                    </Button>
                    </div>
                    </TableCell>
                    </TableRow>
            ))}
                    </TableBody>
                    </Table>
                    </TableContainer>


    </Container>
  );
};

export default NewLetterRequest;

{
  /* <NavLink to="./money_request">Money Request</NavLink> */
}
