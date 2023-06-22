
import React, { useState, useEffect } from 'react'

import ReactQuill from "react-quill";
import "../../assets/css/requestPages.css";
import "../../assets/css/quill.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";

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
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { ErrorAlert, SuccessAlert } from "components/Alert";
import { FaPlusCircle,FaPrint } from "react-icons/fa";
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
  Button
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'

// import NewInvoice from './SingleInvoice'
import { useRef } from 'react'
import useAuth from 'hooks/useAuth'




const LetterRequestDetail = (props) => {
    const [value, setValue] = useState("");
    const {authState} = useAuth()
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [letterUser,setLetterUser] = useState("")
    const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})
    const [letterForm,setLetterForm] = useState({to:"",subject:"",message:"",ProjectId:"",UserId:"",createdBy:"",date:"",status:""})
    const modeInput = useRef()
    let amountRef = useRef()


   
    const handleChange = (e) => {
      setValue(e);
      // console.log('This is e',e);
    };

    
    let {id} = useParams()
    const closeDelete = ()=>{
      setIsDeleteOpen(false)
  }
    const openDelete = (id)=>{
      setIsDeleteOpen({open:true,id:id})
  }

  const [isOpen,setIsOpen] = useState(false)
  function closeModal(){
      setIsOpen(false)
  }
  function openModal(){
    setIsOpen(true)
  }
  





  
  //  Notifications
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

    // USE EFFECT 
    useEffect(()=>{
        const getData =async()=>{

          await axios.get(`${url}/requestLetter/${id}`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
            // console.log(resp.data);
            setLetterUser(resp.data?.User?.name)
            setValue(resp.data.letter)
          })
        }

        // console.log('runned');

  getData()
},[])

  // END OF USE EFFECT
  
  
  

  
  

  const handleSubmit =async()=>{
    // console.log('clicked');
    const request = {
      UserId:authState.id,
      letter:value
    }
    await axios.put(`${url}/requestLetter/${id}`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
      setOpenSuccess({open:true,message:"Successfully Updateed"})
      setValue(resp.data.letter)
    })
    // console.log(request);
}
      

const handleDelete = async()=>{
  await axios.delete(`${url}/requestLetter/${id}`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){
      return setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      
      setOpenSuccess({open:true,message:"Successfully Deleted"})
      setTimeout(() => {
        props.history.goBack()
      }, 1000);
      closeDelete()
    }
   })
}
  
  
    return (
      <>
  
        <PageTitle>Letter By | {letterUser}</PageTitle>
        {/* Notifications */}
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

        {/* End of Notification */}
  
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




        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Projects " value={countsData.projectCount}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorclassName="text-orange-500 dark:text-orange-100"
              bgColorclassName="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Bids Registered" value={countsData.bidCount}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorclassName="text-green-500 dark:text-green-100"
              bgColorclassName="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Active Projects" value={countsData.activeProjects}>
            <RoundIcon
              icon={CartIcon}
              iconColorclassName="text-blue-500 dark:text-blue-100"
              bgColorclassName="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Completed Projects" value={countsData.completedProjects}>
            <RoundIcon
              icon={ChatIcon}
              iconColorclassName="text-teal-500 dark:text-teal-100"
              bgColorclassName="bg-teal-100 dark:bg-teal-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
  
        <TableContainer>
        {/* Calendar section */}

  
        {/* end of calendar section */}
        </TableContainer>
  
     
        

       
      <div className=" my-div mt-6 mb-16 dark:text-gray-200">
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

      <section className=" not_printable">
        <p className=" text-center font-semibold text-2xl my-5">
          SRS-RB Letter Request
        </p>
        <ReactQuill
          placeholder="Write Something Here...."
          modules={LetterRequestDetail.modules}
          value={value}
          onChange={handleChange}
        />
        <p className=" font-semibold text-center text-2xl py-8">
          Letter request preview
        </p>

        <div className="flex justify-center mb-6 gap-2 grid sm:grid-flow-row md:grid-cols-3">
          <button
            className=" rounded-md px-16 py-2 border border-gray-300 bg-gray-400"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </button>

            <Button
            className="ml-2 rounded-md px-16 py-2 border border-gray-300"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            className="ml-2 rounded-md px-16 py-2 border border-gray-300"
            style={{background:'darkred'}}
            type="submit"
            onClick={openDelete}
          >
            Delete
          </Button>
          
        </div>
      </section>

      <section className=" quill-preview px-8 py-8">
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </section>
    </div>



      </>
    )


    
  }
  
  
  LetterRequestDetail.modules = {
    toolbar: [
      [{ header: ["3", false] }, { header: 1 }, { header: 2 }],
      ["bold", "italic", "underline", "strike"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      [{ color: [] }],
      ["clean"],
    ],
  };
  
  
     



export default LetterRequestDetail