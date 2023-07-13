import { createSlice } from "@reduxjs/toolkit";

export const todos = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: 1,
        title: "sacsm",
        completed: true,
      },
      {
        id: 2,
        title: "scbshj",
        completed: false,
      },
    ],
    addModal: false,
    editModal: false,
    delModal: false,
    title: "",
    idx: null,
    filterTodo: "All",
    search: "",
  },
  reducers: {
    filterData: (state, action) => {
      state.filterTodo = action.payload;
    },
    searchData: (state, action) => {
      state.search = action.payload;
    },
    idx: (state, action) => {
      state.idx = action.payload;
    },
    handleChangeTitle: (state, action) => {
      state.title = action.payload;
    },
    handleAddModal: (state, action) => {
      state.addModal = action.payload;
    },
    handleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    handleDelModal: (state, action) => {
      state.delModal = action.payload;
    },
    addTitle: (state) => {
      let obj = {
        id: new Date().getTime(),
        title: state.title,
        completed: false,
      };
      state.todos.push(obj);
      state.title = "";
      state.addModal = false;
    },
    editTitle: (state) => {
      state.todos = state.todos.map((e) => {
        if (e.id == state.idx) {
          e.title = state.title;
        }
        return e;
      });
      state.editModal = false;
      state.title = "";
    },
    deleteData: (state) => {
      state.todos = state.todos.filter((e) => e.id !== state.idx);
      state.delModal = false;
    },
    completedData: (state, action) => {
      state.todos = state.todos.filter((e) => {
        if (e.id == action.payload) {
          e.completed = !e.completed;
        }
        return e;
      });
    },
  },
});
export const {
  handleChangeTitle,
  addTitle,
  handleAddModal,
  handleEditModal,
  handleDelModal,
  deleteData,
  idx,
  editTitle,
  completedData,
  searchData,
  filterData
} = todos.actions;
export default todos.reducer;
