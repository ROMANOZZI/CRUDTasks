import React from "react";
import { TableRow, TableCell, Checkbox, Button } from "@mui/material";
import dayjs from "dayjs";
import { Box } from "@mui/system";
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
  isCompleted: boolean;
  setOpen: any;
  setUpdate: any;
  setFormData: any;
  setTasks: any;
}) => {
  const now = new Date();
  const Date1 = task.dueDate.split("T")[0];

  return (
    <TableRow
      key={task._id}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
        backgroundColor: task.isCompleted
          ? "#b3ffb3"
          : new Date(Date1) > now
          ? "#ff9999"
          : "#ffffff",
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          sx={{ marginLeft: "2em" }}
          checked={task.isCompleted}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            fetch(`http://localhost:3000/taskCompleted/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: task._id,
                isCompleted: event.target.checked,
              }),
            }).then((data) => {
              task.setUpdate((prev: any) => !prev);
            });
          }}
        ></Checkbox>
      </TableCell>
      <TableCell sx={row}>{task._id}</TableCell>
      <TableCell sx={row}>{task.taskName}</TableCell>
      <TableCell sx={row}>{task.description}</TableCell>
      <TableCell sx={row}>{Date1}</TableCell>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        margin="10px"
      >
        <Button
          variant="contained"
          sx={{ margin: "10px" }}
          color="primary"
          onClick={() => {
            task.setOpen(true);
            task.setUpdate((prev: any) => !prev);
            task.setFormData({
              _id: task._id,
              taskName: task.taskName,
              description: task.description,
              dueDate: dayjs(task.dueDate),
            });
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ margin: "10px" }}
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
      </Box>
    </TableRow>
  );
};

export default Task;
