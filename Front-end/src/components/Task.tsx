import React from "react";
import { TableRow, TableCell, Checkbox, Button } from "@mui/material";
const row = {
  fontSize: "1.5em",
  fontWeight: "bold",
  lineHeight: "28px",
  color: "black",
  marginBottom: "10px",
  opacity: "0.6",
};
const Task = (task: {
  _id: string;
  taskName: string;
  description: string;
  dueDate: Date;
  setOpen: any;
  setUpdate: any;
  setFormData: any;
  setTasks: any;
}) => {
  const Date = task.dueDate.split("T")[0];
  return (
    <TableRow
      key={task._id}
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
      <TableCell sx={row}>{Date}</TableCell>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: "10px" }}
        onClick={() => {
          task.setOpen(true);
          task.setUpdate((prev: any) => !prev);
          task.setFormData({
            _id: task._id,
            taskName: task.taskName,
            description: task.description,
            dueDate: task.dueDate,
          });
        }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          console.log(task._id);
          fetch(
            `http://localhost:3000/deletetask/${JSON.stringify({
              id: task._id,
            })}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((data) => {
            task.setUpdate((prev: any) => !prev);
          });
        }}
      >
        Delete
      </Button>
    </TableRow>
  );
};

export default Task;
