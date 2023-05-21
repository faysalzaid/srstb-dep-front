import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Badge,
  TableContainer,
} from "@windmill/react-ui";
import { Modal, ModalHeader, ModalBody, ModalFooter,Textarea } from "@windmill/react-ui";
import { ErrorAlert, SuccessAlert } from "components/Alert";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  TrashIcon,
  EditIcon,
} from "../../icons";
import { AiFillEye } from "react-icons/ai";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "config/urlConfig";
import PageTitle from "components/Typography/PageTitle";
import { AuthContext } from "hooks/authContext";
import { FiDownload } from "react-icons/fi";


function ProcurementSection({ project, id }) {
  const [comment, setComment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {authState} = useContext(AuthContext)
  const [commentForm,setCommentForm] = useState({comment:"",user:"",image:"",ProjectId:""})
  const options = { timeZone: 'Africa/Addis_Ababa', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric' };
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${url}/comment`, { withCredentials: true })
        .then((resp) => {
        
          if (resp.data.error) {
          } else {
            // console.log(resp.data);
            const data = resp.data.filter((dt) => dt.ProjectId === id);
            setComment(data);
          }
        });
    };
    getData();
  }, [id]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()  
    const request ={
      comment:commentForm.comment,
      user:authState.username,
      image:authState.image,
      ProjectId:id
    }
    await axios.post(`${url}/comment`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:false,message:`${resp.data.error}`})
      }else{
        setComment((prev)=>[...prev,resp.data])
        setOpenSuccess({open:true,message:"Successfully Added"})
        onClose()
      }
    })

  }

  const handleApprove = async(ids)=>{
    // console.log(id);
      axios.post(`${url}/comment/approve/${ids}`,{pId:id},{withCredentials:true}).then((resp)=>{
        // console.log('this is it',resp.data);
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          setComment(resp.data)
          setOpenSuccess({open:true,message:"Successfully Done"})
        }
      }).catch((error)=>{
        // console.log(error);
      })
  }

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


  return (
    
    <section className="contracts-section p-4 bg-white rounded-md shadow-md dark:bg-gray-700">
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
       {/* Modal section */}

        {/* Modal section */}

     
      <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-700 dark:text-gray-300">
  <h2 className="text-lg font-bold mb-4 dark:text-gray-300">Procurement for {project.name}</h2>
{project?.Procurement&&
  <div className="border-t border-gray-200 dark:border-gray-590 py-4  dark:bg-gray-700 dark:text-gray-300">
    


    <div className="bg-white-100  py-8  dark:bg-gray-700 dark:text-gray-300">
      <div className="max-w-8xl  dark:bg-gray-700 dark:text-gray-300">
        <div className="bg-white shadow rounded-lg p-6  dark:bg-gray-700 dark:text-gray-300 ">
          <h1 className="text-1xl font-bold mb-4 dark:text-gray-300">Budget From | {project?.Procurement.budgetFrom}</h1>
          <p className="text-gray-600 mb-2 dark:text-gray-300">Time To Sell |  {project?.Procurement.timeToSell}</p>
          <Link to={`/app/procurement/${project?.Procurement.id}`} className="flex items-center text-blue-500 underline dark:gray-300" rel="noopener noreferrer">
            <FaEye className="mr-1" />
           View
          </Link>
        </div>
      </div>
    </div>
  </div>
}
  

  
</div>

    </section>
  );
}

export default ProcurementSection;
