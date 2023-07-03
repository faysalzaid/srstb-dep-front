import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Badge,
  TableContainer,
  Label,
  Select,
  Input
} from "@windmill/react-ui";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  TrashIcon,
  EditIcon,
} from "../../icons";
import { AiFillEye } from "react-icons/ai";
import { FaCloudUploadAlt, FaDownload, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "config/urlConfig";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";

import PageTitle from "components/Typography/PageTitle";
import { ErrorAlert, SuccessAlert } from "components/Alert";
import { useContext } from "react";
import { AuthContext } from "hooks/authContext";
import { BsCheckCircleFill,BsXCircleFill,BsFillQuestionCircleFill } from "react-icons/bs";

function ReportSection({ bid, project, users, setBids, setProject }) {
  const [bidSelect, setBidSelect] = useState({ open: false, id: "" });
  const [reportForm,setReportForm] = useState({ProjectId:"",createdBy:"",file:"",data:"",prId:""})
  const [projectReportData,setProjectReportData] = useState([])
  const {authState} = useContext(AuthContext)
    useEffect(()=>{
        setProjectReportData(project.projectReports)
    },[])
  const onBidSelect = () => {
    setBidSelect({ open: true });
  };

  const onBidClose = () => {
    setBidSelect({ open: false });
  };

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

  const [isOpen,setIsOpen] = useState(false)


  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };



  const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('file',reportForm.file)
        formData.append('ProjectId',project.id)
        formData.append('date',reportForm.date)
        formData.append('createdBy',authState.username)

        // console.log(formData);
        await axios.post(`${url}/projectReport`,formData,{withCredentials:true}).then((resp)=>{
            if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
            // console.log(resp.data);
            setProjectReportData([...projectReportData,resp.data])
            setOpenSuccess({open:true,message:"Successfully Added"})
            onClose()
        }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })

  }


  const handlApprove = async(id)=>{
   
    const request = {
        approvedBy:authState.username,
        ProjectId:project.id,
        id
    }
    // console.log('request is ',request);
    await axios.post(`${url}/projectReport/approve`,request,{withCredentials:true}).then((resp)=>{
        // console.log(resp.data);
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setProjectReportData(resp.data)
        setOpenSuccess({open:true,message:`Successfully Updated`})
    }).catch((error)=>{
      if (error.response && error.response.data && error.response.data.error) {
          setOpenError({open:true,message:`${error.response.data.error}`});
        } else {
          setOpenError({open:true,message:"An unknown error occurred"});
        }
  })
  }


  return (
    <section className="contracts-section p-4 bg-white rounded-md shadow-md dark:bg-gray-700 dark:text-gray-300">
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
          <Button className="" size="small" onClick={onOpen}>
            add Report
          </Button>

      <PageTitle>
        Report
       
      </PageTitle>

    {/* REPORT MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Upload Report</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          

          <Label>
            <span>Date</span>
            <Input
               type="date"
              className="mt-1"
              name="date"
              // value={formValues.ProjectId}
              onChange={(e)=>setReportForm({...reportForm,date:e.target.value})}
              required
            />
             
          
          </Label>

            <label htmlFor="file" className="w-full p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Upload File</span>
            </label>
              <input
                type="file"
                id="file"
                className="hidden"
                name="attach"
                onChange={(e)=>setReportForm({...reportForm,file:e.target.files[0]})}
              />


              
        </div>
        <div className="hidden sm:block">

        <Button className="mt-6" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block  sm:hidden">
            <Button block size="large" type="submit">
              Accept
            </Button>
          </div>
      
        </form>
      </ModalBody>
      <ModalFooter>
      <div className="hidden sm:block">
            <Button layout="outline" onClick={()=>setIsOpen(false)}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={()=>setIsOpen(false)}>
              Cancel
            </Button>
          </div>
      </ModalFooter>
    </Modal>

    {/* END OF REPORT MODAL */}

      <TableContainer className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>status</TableCell>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectReportData?.length>0&&projectReportData?.map((pr) => (
              <TableRow key={pr.id}>
                
                <TableCell>
                  <span className="text-sm">
                    {pr?.date}
                  </span>
                </TableCell>
                <TableCell>
                <p className="text-sm font-semibold">
                    <a href={`${pr?.file}`} target='_blank'>
                     <FaDownload className=''/>
                  </a>
                </p>
                </TableCell>
                <TableCell>
                <span className="text-sm">
                    {pr.createdBy}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4 ml-4">
                  {pr.approved?<Button
                        layout="link"
                        size="icon"
                        aria-label="View"
                        style={{ color: "green" }}
                        onClick={()=>handlApprove(pr.id)}
                      >
                          <BsCheckCircleFill className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      :
                      <Button
                      layout="link"
                      size="icon"
                      aria-label="View"
                      style={{ color: "red" }}
                      onClick={()=>{
                        handlApprove(pr.id)
                      }}
                      >
                      <BsFillQuestionCircleFill className="w-5 h-5" aria-hidden="true" />
                      </Button>}
                      
                  
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default ReportSection;
