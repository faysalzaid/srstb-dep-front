import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import axios from '../../config/axiosConfig'
import { ErrorAlert, SuccessAlert } from "components/Alert";  
import ReactQuill from "react-quill";
import "../../assets/css/requestPages.css";
import "../../assets/css/quill.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";
// import "../../../node_modules/react-quill"
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
import { EditIcon, EyeIconOne, TrashIcon } from "../../icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import { url } from "../../config/urlConfig";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../hooks/authContext";
import useAuth from "hooks/useAuth";
import TitleChange from "components/Title/Title";
import { FaCloudUploadAlt } from "react-icons/fa";




function BlogList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // const [companyData,setCompanyData] = useState([])
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    date: "",
    user: "",
    BlogCategoryId: "",
    image: "",
  });

  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedResult, setFetchedResult] = useState([]);
  const [showModal, setShowModal] = useState({show:false,id:""});
  const {authState,settings} = useAuth(AuthContext)
  const [blogData,setBlogData] = useState([])
  const [category,setCatogory] = useState([])


  useEffect(() => {
    const getData =async()=>{
      await axios.get(`${url}/blog`,{withCredentials: true}).then((resp) => {
        if(resp.data.error){
          console.log(resp.data.error);
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
         
          setBlogData(resp.data);
  
        }
      });


      await axios.get(`${url}/blogCategory`,{withCredentials: true}).then((resp) => {
        if(resp.data.error){
          console.log(resp.data.error);
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
         
          setCatogory(resp.data);
  
        }
      });


    }

    getData()
    
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    if(blogForm.image==="" || blogForm.image ===undefined) return setOpenError({open:true,message:"Please Provide Image"})
    const formData = new FormData();
    formData.append("title", blogForm.title);
    formData.append("description", blogForm.description);
    formData.append("user", authState.username);
    formData.append("image", blogForm.image);
    formData.append("BlogCategoryId",blogForm.BlogCategoryId)

    // console.log(formData);
    await axios.post(`${url}/blog`, formData,{withCredentials:true}).then((resp) => {
      if (resp.data.error) {
        setOpenError({open:true,message:`${resp.data.error}`})
      } else {
        setBlogData([...blogData, resp.data]);
        closeModal();
        setOpenSuccess({open:true,message:"Successfully Added"})
      }
    });
  };

  const deleteBlog = async(ids) => {
    await axios.delete(`${url}/blog/${ids}`).then((resp) => {
      if (resp.data.error) {
        setOpenError({open:true,message:`${resp.data.error}`})
      }
      const newdata = blogData.filter((d) => d.id !== ids);
      setBlogData(newdata);
      closeModal();
      setShowModal({show:false,id:""})
      setOpenSuccess({open:true,message:"Successfully Deleted"})
    });
  };

  useEffect(() => {
    setFetchedResult(searchTerm.length < 1 ? blogData : searchResult);
  }, [blogData, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newProjectData = blogData.filter((prj) => {
        return Object.values(prj)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      // console.log(newProjectData);
      setSearchResult(newProjectData);
    } else {
      setSearchResult(blogData);
    }
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





const handleChange = (e) => {
  setBlogForm({...blogForm,description:e})
  // console.log('This is e',e);
};

  return (
    <>
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
      
    <TitleChange name={`Users | ${settings.name}`} />
      <link
        rel="stylesheet"
        href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
      />
      <PageTitle>List of Blog</PageTitle>
         {/* Delete MOdal section  */}
         {showModal.show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete Confirm
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal({show:false,id:""})}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                   Are You sure you want to Delete This
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal({show:false,id:""})}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleteBlog(showModal.id)}
                    style={{backgroundColor:'darkred'}}
                  >
                    Continue Deleting
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* End of Delete Modal Section */}


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
      {authState.role==='admin'||authState.role==="manager"||authState.role==="hr" ?
      <div>
        <Button size="small" onClick={openModal}>Create Blog</Button>
      </div>
      :<p>Read Only</p>}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>Create Blog</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          
          <Label>
            <span>Title</span>
            <Input
            //   type="date"
              className="mt-1"
            //   value={timesheetForm.date}
              name="title"
              onChange={(e)=>setBlogForm({...blogForm,title:e.target.value})}
              required
            />
          </Label>


   

          <ReactQuill
          placeholder="Write Something Here...."
          className=" mb-6"
          modules={BlogList.modules}
          value={blogForm.description}
          onChange={handleChange}
          />

          <Label className="mt-6">
            {/* <span>Category</span> */}
            <Select
              className="mt-6"
              name="BlogCategoryId"
              // value={formValues.ProjectId}
              onChange={(e)=>setBlogForm({...blogForm,BlogCategoryId:e.target.value})}
              required
            >
              <option value="" >Select Category</option>
              {category.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
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
                // required
                onChange={(e)=>setBlogForm({...blogForm,image:e.target.files[0]})}
              />


              
        </div>
        <Button className="mt-6 lg:block" type="submit">Submit</Button>
    
          
      
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

    

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {fetchedResult.map((blog, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{blog.title}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <img style={{ width: 30 }} src={blog.image} />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{blog.user}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{blog.date}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={{ pathname: `/app/bloglist/${blog.id}` }}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setShowModal({show:true,id:blog.id})}
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


BlogList.modules = {
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


export default BlogList;
