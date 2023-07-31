import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import dayjs from "dayjs";
import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
  tag: string;
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
          : new Date(Date1) < now
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
      <TableCell sx={row}>
        <FormControl fullWidth sx={{ width: "5em" }}>
          <InputLabel id="demo-simple-select-label" sx={{ width: "4em" }}>
            Tag
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={task.tag ? task.tag : "N"}
            onChange={(e: SelectChangeEvent) => {
              fetch(`http://localhost:3000/addtag`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  _id: task._id,
                  tag: e.target.value as string,
                }),
              })
                .then((data) => {
                  task.setUpdate((prev: any) => !prev);
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <MenuItem value={"N"}>None</MenuItem>
            <MenuItem value={"study"}>study</MenuItem>
            <MenuItem value={"home"}>home</MenuItem>
            <MenuItem value={"work"}>Work</MenuItem>
            <MenuItem value={"entertainment"}>entertainment</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
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
