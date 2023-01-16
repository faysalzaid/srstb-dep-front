import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { IconButton, Divider } from "@mui/material";
import Draggable from "react-draggable";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField, TextArea, Dropdown, DateInput } from "./Inputs/Inputs";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import * as constants from "constants.js";
import Loader from 'components/Loader';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#add-project"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddProject = ({ open, handleClose, callBackFunction, setOpenError, setOpenSuccess }) => {
  const [formData, setFormData] = useState({
    name: {value: "", error: "", optional: false},
    description: {value: "", error: "", optional: false},
    descriptionError: {value: "", error: "", optional: false},
    status:  {value: 0, error: "", optional: false},
    startDate:  {value: "", error: "", optional: false},
    endDate:  {value: "", error: "", optional: false},
  });
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

      data.append("project[name]", formData.name);
      data.append("project[description]", formData.description);
      data.append("project[startDate]", formData.startDate);
      data.append("project[endDate]", formData.endDate);
      data.append("project[status]", formData.status);
      
      if(validate()) {
        submitToAPI(data);
      }
      else {
        setLoading(false);
      }
  }

  function submitToAPI(data) {
      fetch(constants.url+"/api/projects", {
          method:"POST",
          body: data
      }).then(response=>response.json()).then(data=>{
          if(data.status??"" === "created") {
            setLoading((prev)=>false)
            setFormData(
              {
                name: "",
                description: "",
                status: 0,
                startDate: "",
                endDate: "",
              }
            );
            const successMessage = {open:true, message:"Successfully Added!"}
            setOpenSuccess((prev)=>successMessage)
            callBackFunction();
            handleClose();
          }
          else {
            setLoading((prev)=>false);
            const errorMessage = {open:true, message:"Return Mismatch"}
            setOpenError((prev)=>errorMessage)
          }
      }).catch((error)=>{
        console.error(error);
        setLoading((prev)=>false);
        setOpenError({open:true, message:"Something went wrong!"})
      });
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="add-project"
        style={{ backgroundColor: "rgba(0,0,0,.2)"}}
        TransitionComponent={Transition}
        //keepMounted
        fullScreen={fullScreen}
      >
        <div className="bg-white dark:bg-gray-700" style={{ minWidth: 500, resize: "both", overflow:'auto' }}>
          
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            style={{ cursor: "move", fontFamily: "ubuntu" }}
            id="add-project"
            className="text-gray-600 dark:text-gray-200"
          >
            Add Project
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
          <Divider />
          <DialogContent>
          {loading && <div><Loader /></div>}
          
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
          <Divider />
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
          </DialogActions>
         
        </div>
      </Dialog>
    </div>
  );
};

export default AddProject;
