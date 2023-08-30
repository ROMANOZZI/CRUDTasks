import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  TableRow,
  TableCell,
  Checkbox,
  Button,
  SelectChangeEvent,
  colors,
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
  setTasks: (tasks: string[]) => void;
  tag: string;
}) => {
  const now = new Date();
  const Date1 = JSON.stringify(task.dueDate).split("T")[0];
  const theme = useTheme();
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
            fetch(`${import.meta.env.VITE_API_URL}/taskCompleted/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: task._id,
                isCompleted: event.target.checked,
              }),
            }).then(() => {
              task.setUpdate((prev: any) => !prev);
            });
          }}
        ></Checkbox>
      </TableCell>

      <TableCell sx={row}>{task.taskName}</TableCell>
      <TableCell sx={row}>
        <FormControl fullWidth sx={{ width: "5em" }}>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1em" }}>
            Tag
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={task.tag ? task.tag : "N"}
            onChange={(e: SelectChangeEvent) => {
              fetch(`${import.meta.env.VITE_API_URL}/addtag`, {
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
            sx={{
              fontSize: "1.25em",
              width: "fit-content",
              borderRadius: "5px",
              border: "1px solid black",
              color:
                task.tag === "study"
                  ? colors.blue[900]
                  : task.tag === "home"
                  ? colors.green[900]
                  : task.tag === "work"
                  ? colors.yellow[900]
                  : task.tag === "entertainment"
                  ? colors.purple[900]
                  : colors.grey[900],
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
        margin={"auto"}
        flexDirection="row"
        alignItems={"center"}
      >
        <Button
          variant="contained"
          sx={{ margin: "10px", marginTop: "3em" }}
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
          sx={{ margin: "10px", marginTop: "3em" }}
          onClick={() => {
            fetch(
              `${import.meta.env.VITE_API_URL}/deletetask/${JSON.stringify({
                id: task._id,
              })}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            ).then(() => {
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
