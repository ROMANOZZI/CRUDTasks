import React from "react";
import Dialog from "@mui/material/Dialog";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DialogTitle } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface Props {
  open: boolean;
  edit: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}
const Form = ({
  open,
  edit,
  setOpen,
  setEdit,
  formData,
  setFormData,
  setUpdate,
}: Props) => {
  const input = {
    width: "80%",
    height: "3em",

    fontSize: "1.5em",
    position: "relative",
    margin: "10px",
  };
  return (
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
            required
            error={
              formData.taskName != "" &&
              (formData.taskName.match(/^[a-zA-Z0-9\s-_()]{3,50}$/)
                ? false
                : true)
            }
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
            error={
              formData.description != "" &&
              (formData.description.match(/^[a-zA-Z0-9\s.,!?'"():;_-]*$/)
                ? false
                : true)
            }
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
          <FormControlLabel
            sx={{
              fontSize: "1.5em",
              fontWeight: "bold",
              position: "relative",
              bottom: "1em",
              right: "3.75em",
            }}
            control={
              <Checkbox
                checked={formData.isCompleted}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    isCompleted: e.target.checked,
                  });
                }}
                name="isCompleted"
                color="primary"
              />
            }
            label="is Completd "
          />

          <button
            onClick={(e) => {
              if (formData.taskName && edit) {
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
  );
};

export default Form;
