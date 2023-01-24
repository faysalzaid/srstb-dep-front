import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { IconButton, Divider, Grid } from "@mui/material";
import Draggable from "react-draggable";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField, TextArea, Dropdown, DateInput } from "./Inputs/Inputs";
import { EditableTextContent, EditableDate } from "./Inputs/EditableInputs";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import * as constants from "constants.js";
import Loader from 'components/Loader';

import Tasks from './Tasks/Tasks';
import { useEffect } from "react";
import axios from "axios";
import { url } from "config/urlConfig";


function PaperComponent(props) {
  return (
      <Paper {...props} />
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectDetail = ({ open, handleClose, successCallback, setOpenError, setOpenSuccess,id }) => {
const [taskData,setTaskData] = useState([])
  const [formData, setFormData] = useState({
    name: {value: "Project Management", error: "", optional: false},
    description: {value: "Interactive project add, project detail with live edit and update and tasks list UI with full crud functionality", error: "", optional: false},
    descriptionError: {value: "", error: "", optional: false},
    status:  {value: 0, error: "", optional: false},
    startDate:  {value: "", error: "", optional: false},
    endDate:  {value: "", error: "", optional: false},
    percentage:{value:"",error:"",option:false},
    year:{value:"",error:"",option:false},
    totalCost:{value:"",error:"",option:false},
    utilizedCost:{value:"",error:"",option:false},
    remainingCost:{value:"",error:"",option:false},
    physicalPerformance:{value:"",error:"",option:false},
    financialPerformance:{value:"",error:"",option:false}
  });


  useEffect(()=>{
    axios.get(`${url}/projects/${id.id}`,{withCredentials:true}).then((resp)=>{
      const data = resp.data
      console.log(resp.data);
      setFormData(
        {
          name: {value: data.name, error: "", optional: false},
          description: {value: data.description, error: "", optional: false},
          descriptionError: {value: "", error: "", optional: false},
          status:  {value: data.status, error: "", optional: false},
          startDate:  {value:data.starttime, error: "", optional: false},
          endDate:  {value: data.endtime, error: "", optional: false},
          percentage:{value:data.percentage,error:"",optional:false},
          year:{value:data.year,error:"",option:false},
          totalCost:{value:data.totalCost,error:"",option:false},
          utilizedCost:{value:data.utilizedCost,error:"",option:false},
          remainingCost:{value:data.remainingCost,error:"",option:false},
          physicalPerformance:{value:data.physicalPerformance,error:"",option:false},
          financialPerformance:{value:data.financialPerformance,error:"",option:false}
        }
      );
      setTaskData(resp.data)
   
    })
  },[id.id])


  const [loading, setLoading] = useState(false);
  const statuses = [
    {
      id: 1,
      name: "Not Started",
    },
    {
      id: 2,
      name: "In Progress",
    },
    {
      id: 3,
      name: "In Review",
    },
    {
      id: 4,
      name: "Completed",
    },
  ];

  const validate = () => {
      let temp = [];
      temp.name = formData.name.value ? "" : "error";
      temp.description = formData.description.value ? "" : "error";
      temp.startDate = formData.startDate.value ? "" : "error";
      temp.endDate = formData.endDate.value ? "" : "error";
      
      let val = "error";
      statuses.map((op)=>{
          if(op.id === formData.status.value) {
              val = "";
          }
      });
      temp.status = val;
     
    
      setFormData({
        name: {...formData.name, error: temp.name},
        description: {...formData.description, error: temp.description},
        startDate: {...formData.startDate, error: temp.startDate},
        endDate: {...formData.endDate, error: temp.endDate},
        status: {...formData.status, error: temp.status},

      })
      return Object.values(temp).every((x) => x == "");
  };

  

  function handleSubmit(event) {
      event.preventDefault();
      const data = new FormData();

      setLoading(true);

      data.append("project[name]", formData.name.value);
      data.append("project[description]", formData.description.value);
      data.append("project[startDate]", formData.startDate.value);
      data.append("project[endDate]", formData.endDate.value);
      data.append("project[status]", formData.status.value);
      
      if(validate()) {
        submitToAPI(data);
      }
      else {
        setLoading(false);
      }
  }

  function submitToAPI(data) {
    console.log(data);
      // fetch(constants.url+"/api/projects", {
      //     method:"POST",
      //     body: data
      // }).then(response=>response.json()).then(data=>{
      //     if(data.status??"" === "created") {
      //       setLoading((prev)=>false)
      //       setFormData(
      //         {
      //           name: {value: "", error: "", optional: false},
      //           description: {value: "", error: "", optional: false},
      //           descriptionError: {value: "", error: "", optional: false},
      //           status:  {value: 0, error: "", optional: false},
      //           startDate:  {value: "", error: "", optional: false},
      //           endDate:  {value: "", error: "", optional: false},
      //         }
      //       );
      //       const successMessage = {open:true, message:"Successfully Added!"}
      //       setOpenSuccess((prev)=>successMessage)
      //       successCallback();
      //       handleClose();
      //     }
      //     else {
      //       setLoading((prev)=>false);
      //       const errorMessage = {open:true, message:"Return Mismatch"}
      //       setOpenError((prev)=>errorMessage)
      //     }
      // }).catch((error)=>{
      //   console.error(error);
      //   setLoading((prev)=>false);
      //   setOpenError({open:true, message:"Something went wrong!"})
      // });
  }

  function callBackFunc(text, label) {
      //console.log(text)
     // const fd = {...formData, [label]: {...formData[label], value: text}};
      //setFormData(formData)
      // console.log(formData)
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        //aria-labelledby="project-detail"
        style={{ backgroundColor: "rgba(0,50,255,.18)"}}
        TransitionComponent={Transition}
        //keepMounted
        fullWidth={true}
        fullScreen={fullScreen}
        maxWidth='md'
        disableEscapeKeyDown 
      >
        <div className="dialog-detail bg-white dark:bg-gray-700" style={{ minWidth: 300,height: '100%', minHeight: 500, overflow:'auto' }}>
          
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            //style={{ cursor: "move", fontFamily: "ubuntu" }}
            id="project-detail"
            className="relative"
          >
            
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <MdClose />
            </IconButton>
          </DialogTitle>
          {/* <Divider /> */}
          <DialogContent>
          {loading && <div><Loader /></div>}
          <Grid container style={{marginTop: 20}}>
            <Grid item>
              <EditableTextContent
                formData={formData}
                setFormData={setFormData}
                label="name"
                labelText="Project name"
                placeholder="Enter name"
                errorLabel="nameError"
                callBackFun={callBackFunc}
                width="90%"
                margin="0px 0px 0px 0px"
                fontSize={25}
                padding="5px 15px"
              />
              <EditableTextContent
                formData={formData}
                setFormData={setFormData}
                label="description"
                labelText="Project description"
                placeholder="Enter description"
                errorLabel="nameError"
                callBackFun={callBackFunc}
                width="90%"
                margin='0'
                padding="5px 15px"
                fontWeight="lighter"
                fontSize={20}
                fontFamily="ubuntu"
              />
              <EditableDate
                labelText="Start Date"
                
                formData={formData}
                setFormData={setFormData}
                callBackFun={callBackFunc}
                label="startDate"
                parentStyle={{
                  margin: "10px 15px"
                }}
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: 16,
                  fontFamily: 'ubuntu',
                }}
                inputStyle={{
                  marginLeft: 50,
                  fontFamily: 'ubuntu',
                  fontWeight: "bold",
                  fontSize: 15
                }}
              />
              <EditableDate
                labelText="End Date"
                formData={formData}
                setFormData={setFormData}
                label="endDate"
                parentStyle={{
                  margin: "10px 15px"
                }}
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: 16,
                  fontFamily: 'ubuntu',
                }}
                inputStyle={{
                  marginLeft: 60,
                  fontFamily: 'ubuntu',
                  fontWeight: "bold",
                  fontSize: 15
                }}
              />
             <div className="detail-progress-container">
                <progress value={formData.percentage.value} max="100" className='progress'></progress>
                <p className='percentage dark:text-gray-300'>{formData.percentage.value}%</p>
             </div>
             <div className="tasks-container">
                <label className="task-label">All Tasks</label>
                <Tasks task={taskData} setTask={setTaskData}/>
             </div>
            </Grid>
            <Grid item sm={12} md={12}>
              
            </Grid>
          </Grid>
          {!loading && <>
            <div className="left-content-container">
              <div className="form-label dark:text-gray-200">
                <div>B</div>
                Basic project detail
              </div>
              <div className="project-add-form-container">
                <div className="parent">
                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextField
                        formData={formData}
                        setFormData={setFormData}
                        label="name"
                        labelText="Project name"
                        placeholder="Enter name"
                        optional = {false}
                        errorLabel="nameError"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextArea
                        formData={formData}
                        setFormData={setFormData}
                        label="description"
                        labelText="Project description"
                        placeholder="Enter description"
                        optional={false}
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <DateInput
                        formData={formData}
                        setFormData={setFormData}
                        label="startDate"
                        labelText="Start date"
                        placeholder="Enter start date"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <DateInput
                        formData={formData}
                        setFormData={setFormData}
                        label="endDate"
                        labelText="End date"
                        placeholder="Enter end date"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <Dropdown
                        formData={formData}
                        setFormData={setFormData}
                        label="status"
                        options={statuses}
                        labelText="Project status"
                        open={open}
                        //selectText="Not Selected"
                      />
                    </div>
                  </div>
                </div>
                <div className="dot1" style={{ width: 10, height: 10 }}></div>
              </div>
            </div>
          </>}
          </DialogContent>
          {/* <Divider />
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 30px",
            }}
          >
            <Button
              autoFocus
              onClick={handleClose}
              style={{ fontFamily: "ubuntu" }}
              color="error"
              className="dark:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={(handleSubmit)}
              variant="outlined"
              style={{ borderRadius: 20, fontFamily: "ubuntu" }}
              className="dark:text-white dark:bg-green-400"
            >
              Create
            </Button>
          </DialogActions> */}
         
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
