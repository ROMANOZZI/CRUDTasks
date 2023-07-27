import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Task from "./components/Task";
import Dialog from "@mui/material/Dialog";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  Button,
  DialogTitle,
  TextField,
  TextareaAutosize,
} from "@mui/material";

function App() {
  const [Tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    dueDate: Date,
    isCompleted: false,
  });
  const [edit, setEdit] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [update]);
  /** 
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "dueDate", headerName: "Due Date", width: 200 },
  ];*/
  const header = {
    fontSize: "2em",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "#404040",
    marginBottom: "10px",
  };
  const input = {
    width: "80%",
    height: "3em",

    fontSize: "1.5em",
    position: "relative",
    margin: "10px",
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#FFFFFF",

          position: "absolute",
          top: "0px",
        }}
      >
        <Box
          sx={{
            fontSize: "8rem",
            fontWeight: "bold",
            lineHeight: "28px",
            color: "#404040",
            marginBottom: "10px",

            margin: "7rem",
          }}
        >
          Tasks
        </Box>
        <Table
          sx={{
            width: "70vw",

            margin: "auto",
            overflow: "hidden",
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            padding: "10px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary"></Checkbox>
              </TableCell>
              <TableCell sx={header}>ID</TableCell>
              <TableCell sx={header}>Name</TableCell>
              <TableCell sx={header}>Description</TableCell>
              <TableCell sx={header}>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Tasks.map(
              (task: {
                _id: string;
                taskName: string;
                description: string;
                dueDate: Date;
              }) => (
                <Task
                  key={task._id}
                  _id={task._id}
                  taskName={task.taskName}
                  description={task.description}
                  dueDate={task.dueDate}
                  setOpen={setOpen}
                  setUpdate={setUpdate}
                  setFormData={setFormData}
                  setTasks={setTasks}
                />
              )
            )}
          </TableBody>
        </Table>

        <Button
          variant="contained"
          color="primary"
          sx={{
            margin: "auto",
            marginTop: "2em",
            display: "block",

            width: "10em",
            fontSize: "1.5em",
          }}
          onClick={() => {
            setOpen(true);
            setEdit(false);
            setFormData({
              taskName: "",
              description: "",
              dueDate: "",
            });
          }}
        >
          Add Task
        </Button>

        <Dialog open={open}>
          <DialogTitle
            sx={{
              margin: "auto",
              fontSize: "2rem",
              fontWeight: "bold",
              lineHeight: "28px",
              color: "#404040",
              marginY: "0.5em",
            }}
          >
            {edit ? "Edit Task" : "Add Task"}
          </DialogTitle>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginLeft: "1em",
              marginRight: "1em",
              display: "inline",
              position: "absolute",
              right: "0px",
              top: "10px",
            }}
            onClick={() => {
              setOpen(false);
              setEdit(true);
            }}
          >
            Close
          </Button>

          <Box sx={{ width: "500px", height: "500px" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5em",
                fontWeight: "bold",
              }}
            >
              <TextField
                sx={input}
                margin="none"
                type="text"
                label="Task Name"
                name="taskName"
                value={formData.taskName}
                inputProps={{
                  style: { fontSize: "1.5em" },
                }}
                onChange={(e) => {
                  setFormData({ ...formData, taskName: e.target.value });
                }}
              />

              <TextField
                sx={input}
                margin="dense"
                inputProps={{
                  style: { fontSize: "1.5em" },
                }}
                label="Description"
                name="description"
                multiline
                maxRows={3}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={input}
                  label="Due Date"
                  type="date"
                  name="dueDate"
                  lang=" ar-EG"
                  inputProps={{
                    style: { fontSize: "1.5em" },
                  }}
                  value={formData.dueDate}
                  onChange={(e) => {
                    setFormData({ ...formData, dueDate: e });
                  }}
                />
              </LocalizationProvider>
              <button
                onClick={(e) => {
                  if (edit) {
                    e.preventDefault();
                    fetch(`http://localhost:3000/updatetask`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(formData),
                    }).then((data) => {
                      console.log(data);
                      setUpdate((prev: any) => !prev);
                      setOpen(false);
                    });
                  } else {
                    e.preventDefault();
                    console.log(formData);
                    fetch(`http://localhost:3000/addtask`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ...formData,
                        dueDate: formData.dueDate.format("YYYY-MM-DD"),
                        isCompleted: false,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        console.log(data);
                        setUpdate((prev: any) => !prev);
                        setOpen(false);
                      });
                  }
                }}
              >
                Submit
              </button>
            </form>
          </Box>
        </Dialog>
      </Box>
    </>
  );
}

export default App;
