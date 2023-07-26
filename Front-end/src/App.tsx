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

function App() {
  const [Tasks, setTasks] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);
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
  const row = {
    fontSize: "1.5em",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "black",
    marginBottom: "10px",
    opacity: "0.6",
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
            {Tasks.map((task: any) => (
              <TableRow
                key={task.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                  backgroundColor: "#e9ebf0",
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox color="primary"></Checkbox>
                </TableCell>
                <TableCell sx={row}>{task._id}</TableCell>
                <TableCell sx={row}>{task.taskName}</TableCell>
                <TableCell sx={row}>{task.description}</TableCell>
                <TableCell sx={row}>{task.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default App;
