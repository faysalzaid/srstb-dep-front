import { useState, useRef, useEffect } from "react";
import "./editable_input.scss";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import {MdClose, MdCheck} from 'react-icons/md';
import { IconButton } from "@mui/material";

export const EditableTextField = ({
  formData,
  setFormData,
  label,
  labelText,
  placeholder,
  callBackFun=()=>{},
  width="100%",
  margin="0px"
}) => {
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  return (
    <div className="editable-text-field-container">
      {!edit && (
        <div style={{
            width: width,
            margin: margin,
        }}>
        <div 
          onClick={()=>{
             if(!edit) {
                inputRef.current?.focus();
                setEdit(true);
             }
          }}         
          style={{
             width: '100%'
          }}
          className="detail-title text-[#172b4d] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
        >
          {formData[label].value}
        </div>
        
        </div>
        
      )}
      {edit && (
        <form onSubmit={(e)=>{
            e.preventDefault();
            callBackFun(e);
            setEdit((prev)=>false);
        }}>
        <div className="textfield-container">
          <input
            type="text"
            className="input-text-field dark:bg-gray-800 dark:text-gray-200"
            value={formData[label]?.value ?? ""}
            placeholder={placeholder ? placeholder : labelText}
            ref={inputRef}
            style={{
              border:
                (formData[label]?.error ?? "") &&
                (!formData[label]?.optional ?? false)
                  ? "1px solid red"
                  : "",
              outline:
                (formData[label]?.error ?? "") &&
                (!formData[label]?.optional ?? false)
                  ? "0px solid red"
                  : "",
            }}
            onChange={(e) => {
              const fd = {
                ...formData,
                [label]: {
                  ...formData[label],
                  value: e.target.value,
                  error: e.target.value ? "" : "error",
                },
              };
              setFormData((prev) => fd);
            }}
          />
          {(formData[label]?.error ?? "") &&
            (!formData[label]?.optional ?? false) && (
              <label className="validate-error">
                {labelText + " is required"}
              </label>
            )}
        </div>
        </form>
      )}
    </div>
  );
};

export const EditableTextContent = ({
  formData,
  setFormData,
  label,
  labelText,
  placeholder,
  callBackFun=()=>{},
  width="100%",
  margin="0px"
}) => {
  const inputRef = useRef(null);
  const editableRef = useRef(null);
  const [editable, setEditable] = useState(false);

  const submitEdit = (text) => {
    
    const fd = {...formData, [label]: {...formData[label], value: text}}
    setFormData((prev)=>fd);
    callBackFun(text, label);
    setEditable((prev)=>false);
  }
  return (
    <div className="editable-text-field-container">
      
        <div style={{
            width: width,
            margin: margin,
        }}>
        <div 
          contentEditable={editable}
          ref={editableRef}
          onClick={()=>{
            setEditable(true)
          }}
          onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                submitEdit(e.target.innerText)
                setEditable(false)
              }
              else if(e.key === "Escape") {
                  editableRef.current.innerText = formData[label].value;
                  setEditable(false);
              }
              
          }}
          style={{
             outline: !editable ? "none" : '2px solid green',
             width: '100%'
          }}
          className="detail-title text-[#172b4d] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
        >
          {formData[label].value}
        </div>
        {editable && <div className="flex justify-end">
        <IconButton>
            <MdClose 
               onClick={()=>{
                  editableRef.current.innerText = formData[label].value;
                  setEditable(false);
               }}
               className="bg-red-500 rounded-md text-white" style={{padding: 2, fontSize: 25}}/>
        </IconButton>
        <IconButton>
            <MdCheck
               onClick={()=>{
                  submitEdit(editableRef.current?.innerText);
                  editableRef.current.innerText = "";
               }}
               className="bg-green-500 rounded-md text-white" style={{padding: 2, fontSize: 25}}/>
        </IconButton>
        </div>}
        </div>
      
    </div>
  );
};