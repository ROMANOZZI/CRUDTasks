import React, { useState } from "react";
import { alpha } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import Task from "./components/Task";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { Button, TextField } from "@mui/material";
import Form from "./components/Form";
function App() {
  const [Tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    dueDate: Date,
    isCompleted: false,
    tag: "",
  });
  const [filter, setFilter] = useState("");
  const [filterDate, setFilterDate] = useState([]);

  const [edit, setEdit] = React.useState(true);
  console.log(JSON.stringify(import.meta.env.VITE_API_URL));
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
        setFilterDate(data);
      });
  }, [update]);

  const header = {
    fontSize: "2em",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "#404040",
    marginBottom: "10px",
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  type Order = "asc" | "desc";
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("isCompleted");
  const [openOrderBy, setOpenOrderBy] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Tasks.length) : 0;

  const visibleRows: any[] = React.useMemo(
    () =>
      stableSort(filterDate, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filterDate]
  );
  function handleClose() {
    setOpenOrderBy(false);
  }
  const handleMenuItemClick = (item: string) => {
    setOrderBy(item); // Update the selected item when a menu item is clicked
    handleClose();
  };
  const handleFilterChange = (event: Event) => {
    setFilter(event.target.value);

    setFilterDate(() =>
      Tasks.filter((task) => task.taskName.includes(event.target.value))
    );
  };
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "max-content",
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
        <Paper
          sx={{
            width: "70vw",

            margin: "auto",
            overflow: "hidden",

            borderRadius: "10px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <ToggleButtonGroup
              color="primary"
              value={order}
              exclusive
              onChange={(e: React.MouseEvent<HTMLElement>, value: string) => {
                setOrder(value);
              }}
              aria-label="Platform"
            >
              <ToggleButton value="desc">descinding</ToggleButton>
              <ToggleButton value="asc">Ascending</ToggleButton>
            </ToggleButtonGroup>
            <Button
              id="basic-button"
              aria-controls={openOrderBy ? "basic-menu" : undefined}
              sx={{
                fontSize: "1em",
                position: "relative",
                color: "#404040",
                margin: "10px",
              }}
              aria-haspopup="true"
              aria-expanded={openOrderBy ? true : undefined}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setOpenOrderBy(true);
              }}
            >
              order by
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openOrderBy}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleMenuItemClick("dueDate")}>
                dueDate
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("isCompleted")}>
                isCompleted
              </MenuItem>
            </Menu>{" "}
            <TextField
              label="Filter"
              value={filter}
              onChange={handleFilterChange}
              sx={{
                display: "inline-block",
                fontSize: "1.5em",
                margin: "10px",
              }}
              defaultValue={"filter"}
            />
          </Box>

          <Table
            sx={{
              width: "100%",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={header}>Done</TableCell>
                <TableCell sx={header}>ID</TableCell>
                <TableCell sx={header}>Name</TableCell>
                <TableCell sx={header}>Tag</TableCell>
                <TableCell sx={header}>Description</TableCell>
                <TableCell sx={header}>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map(
                (task: {
                  _id: string;
                  taskName: string;
                  description: string;
                  dueDate: Date;
                  isCompleted: boolean;
                  tag: string;
                }) => (
                  <Task
                    key={task._id}
                    _id={task._id}
                    taskName={task.taskName}
                    description={task.description}
                    dueDate={task.dueDate}
                    setOpen={setOpen}
                    isCompleted={task.isCompleted}
                    setUpdate={setUpdate}
                    setFormData={setFormData}
                    setTasks={setTasks}
                    tag={task.tag}
                  />
                )
              )}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            sx={{
              fontSize: "1.5rem",
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
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
              isCompleted: false,
              tag: "",
            });
          }}
        >
          Add Task
        </Button>
        //Form
        <Form
          open={open}
          setOpen={setOpen}
          edit={edit}
          setEdit={setEdit}
          formData={formData}
          setFormData={setFormData}
          setUpdate={setUpdate}
        ></Form>
      </Box>
    </>
  );
}

export default App;
