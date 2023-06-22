import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "../../assets/css/requestPages.css";
import "../../assets/css/quill.css";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { url } from "config/urlConfig";
import {Button } from '@windmill/react-ui'
import { AuthContext } from "hooks/authContext";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "components/Alert";  
export default function OthersRequest(props) {
  const [value, setValue] = useState("");
  const {authState} = useContext(AuthContext)

  const handleChange = (e) => {
    setValue(e);
    // console.log('This is e',e);
  };



    
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




  const handleSubmit =async()=>{
    const request = {
      UserId:authState.id,
      letter:value
    }
    await axios.post(`${url}/requestLetter`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
      setOpenSuccess({open:true,message:"Successfully Saved"})
      setTimeout(() => {
        props.history.goBack()
      }, 1000);
    })
    // console.log(request);
      
  }



  

  return (
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
          modules={OthersRequest.modules}
          value={value}
          onChange={handleChange}
        />
        <p className=" font-semibold text-center text-2xl py-8">
          Letter request preview
        </p>

        <div className="flex justify-center mb-6">
          <button
            className=" rounded-md px-16 py-2 border border-gray-300"
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
            save
          </Button>
        </div>
      </section>
     
      <section className=" quill-preview px-8 py-8 w-full " >
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </section>
    
    </div>
  );
}

OthersRequest.modules = {
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



