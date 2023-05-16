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
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "config/urlConfig";
import PageTitle from "components/Typography/PageTitle";
import { AuthContext } from "hooks/authContext";


function CommentSection({ project, id }) {
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
       <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <span className="text-lg font-medium text-gray-700">
                Add New Comment
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <label
                  className="mt-2 block text-gray-700 font-bold mb-2"
                  htmlFor="year"
                >
                  <span>Comment</span>
                </label>
                <Textarea
                  className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  type="date"
                  name="comment"
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, comment: e.target.value })
                  }
                  required
                />
              
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
               
              >
              
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        {/* Modal section */}

          <Button className="" size="small" onClick={onOpen}>
            add Comment
          </Button>

      <h2 className="text-xl font-medium mb-4 mt-2">Comments</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
  <h2 className="text-lg font-bold mb-4">Comments</h2>
{comment?.map((cm)=>
  <div key={cm.id} className="border-t border-gray-200 py-4">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full">
        <img src={cm.image} alt="User picture" />
      </div>
      <div className="ml-4">
        <p className="text-gray-800 font-bold">{cm.user}</p>
        <p className="text-gray-500 text-sm">{new Date(cm.date).toLocaleString('en-US',options)}</p>
      </div>
      <div className="ml-auto">
        {cm.approved? 
        <span className='px-2 py-1 rounded-full bg-green-500 text-white text-xs' onClick={()=>handleApprove(cm.id)}>UnApprove</span>:
        <span className='px-2 py-1 rounded-full bg-red-500 text-white text-xs' onClick={()=>handleApprove(cm.id)}>Approved</span>
        }
      </div>
    </div>
    <p className="text-gray-700">{cm.comment}.</p>
  </div>
)}
  

  
</div>

    </section>
  );
}

export default CommentSection;
