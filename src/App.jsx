import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  addTitle,
  handleChangeTitle,
  handleAddModal,
  deleteData,
  idx,
  handleDelModal,
  handleEditModal,
  editTitle,
  completedData,
  filterData,
  searchData,
} from "./reducers/todos";
function App() {
  const todos = useSelector(({ todos }) => todos.todos);
  const titleEl = useSelector((store) => store.todos.title);
  const ModalAdd = useSelector(({ todos }) => todos.addModal);
  const ModalDel = useSelector(({ todos }) => todos.delModal);
  const ModalEdit = useSelector(({ todos }) => todos.editModal);
  const filter = useSelector(({ todos }) => todos.filterTodo);
  const search = useSelector(({ todos }) => todos.search);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center justify-center bg-[#4da1f4] h-screen">
        <div className="w-[500px] bg-[#ececec] p-[20px] rounded-[15px]">
          <div className="flex items-start justify-end">
            <Button
              onClick={() => dispatch(handleAddModal(true))}
              variant="contained"
              sx={{
                backgroundColor: "#257ff4",
                color: "#FFF",
                paddingX: "25px",
                paddingY: "10px",
              }}
            >
              Add
            </Button>
          </div>
          <div className="flex items-stretch justify-between py-[20px]">
            <input value={search} onChange={(e)=>dispatch(searchData(e.target.value))} type="text" className="w-[60%] px-[10px] outline-none border-2 rounded-[10px] border-[#c2c2c2] bg-[#ececec]" placeholder="seacrh"/>
            <FormControl sx={{width:"120px"}}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Category"
                onChange={(e)=>dispatch(filterData(e.target.value))}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Uncompleted">Uncompleted</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="py-[10px] flex flex-col gap-y-[10px]">
            {todos.filter((e)=>e.title.toLowerCase().includes(search.trim().toLowerCase())).filter((e)=>{
               if(filter=="Completed"){
                  return e.completed
               }else if(filter=="Uncompleted"){
                  return !e.completed
               }else  {
                  return e
               }
            }).map((e) => {
              return (
                <div className="py-[5px] px-[10px] rounded-[8px] flex items-center justify-between border-2 border-[#c2c2c2] bg-[#e2f7f7]">
                  <h1 className="font-[500] flex items-center  gap-x-[10px]">
                    <input
                      type="checkbox"
                      checked={e.completed}
                      onChange={() => dispatch(completedData(e.id))}
                      className="w-[20px] h-[20px]"
                    />
                    {e.completed ? <s>{e.title}</s> : <span>{e.title}</span>}{" "}
                  </h1>
                  <div className="flex items-center gap-x-[10px]">
                    <IconButton
                      aria-label="delete"
                      color="default"
                      sx={{ padding: "10px", borderRadius: "10px" }}
                      onClick={() => {
                        dispatch(handleChangeTitle(e.title));
                        dispatch(handleEditModal(true));
                        dispatch(idx(e.id));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="default"
                      onClick={() => {
                        dispatch(idx(e.id));
                        dispatch(handleDelModal(true));
                      }}
                      aria-label="delete"
                      sx={{ padding: "10px", borderRadius: "10px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <Dialog
          open={ModalAdd}
          onClose={() => dispatch(handleAddModal(false))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"ADD NEW TASK"}</DialogTitle>
          <DialogContent className="w-[400px]">
            <DialogContentText
              id="alert-dialog-description"
              className="py-[20px]"
            >
              <TextField
                id="outlined-basic"
                value={titleEl}
                label="Title"
                variant="outlined"
                className="w-full"
                onChange={(e) => dispatch(handleChangeTitle(e.target.value))}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                dispatch(handleAddModal(false));
                dispatch(handleChangeTitle(""));
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => dispatch(addTitle())} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={ModalDel}
          onClose={() => dispatch(handleDelModal(false))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete the task"}</DialogTitle>
          <DialogContent className="w-[400px]">
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(handleDelModal(false))}>
              Cancel
            </Button>
            <Button onClick={() => dispatch(deleteData())} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={ModalEdit}
          onClose={() => dispatch(handleEditModal(false))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"EDIT TASK"}</DialogTitle>
          <DialogContent className="w-[400px]">
            <DialogContentText
              id="alert-dialog-description"
              className="py-[20px]"
            >
              <TextField
                id="outlined-basic"
                value={titleEl}
                label="Title"
                variant="outlined"
                className="w-full"
                onChange={(e) => dispatch(handleChangeTitle(e.target.value))}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                dispatch(handleEditModal(false));
                dispatch(handleChangeTitle(""));
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => dispatch(editTitle())} autoFocus>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default App;
