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
import { EditableTextContent, CustomDatePicker } from "./Inputs/EditableInputs";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import * as constants from "constants.js";
import Loader from 'components/Loader';

import Tasks from './Tasks/Tasks';
import Budgets from "./Tasks/Budgets";
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
const [budgetData, setBudgetData] = useState([]);

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
    axios.get(`${url}/projects/${id}`,{withCredentials:true}).then((resp)=>{
      const data = resp.data
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
  },[id])


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
        maxWidth='xl'
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
              
              <CustomDatePicker
                  labelText="Start Date"
                  formData={formData}
                  setFormData={setFormData}
                  label="startDate"
                  type="desktop"
                  //views={['year']}
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
              <CustomDatePicker
                  labelText="End Date"
                  formData={formData}
                  setFormData={setFormData}
                  label="endDate"
                  type="desktop"
                  //views={['year','month']}
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
                <label className="task-label" style={{color: '#1faaea', fontSize: 20, fontWeight: 'bold'}}>Budget Detail</label>
                <Budgets budget={budgetData} setBudget={setBudgetData}/>
             </div>
             <div className="tasks-container">
                <label className="task-label" style={{color: '#37c5ab', fontSize: 20, fontWeight: 'bold'}}>All Tasks</label>
                <Tasks task={taskData} setTask={setTaskData}/>
             </div>
            </Grid>
            <Grid item sm={12} md={12}>
              
            </Grid>
          </Grid>

          </DialogContent>      
         
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
