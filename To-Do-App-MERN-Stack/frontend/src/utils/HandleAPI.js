import axios from "axios";

export const getAllToDoItems = (setToDo) => {
  axios.get("http://localhost:8000/api/getAllItems").then(({ data }) => {
    setToDo(data);
  });
};

export const addToDoItem = (text, setText, setToDo) => {
  axios
    .post("http://localhost:8000/api/addItem", { text })
    .then(() => {
      setText("");
      getAllToDoItems(setToDo);
    })
    .catch((err) => console.log(err));
};

export const updateToDoItem = (_id, text, setToDo, setText, setIsUpdating) => {
  axios
    .put(`http://localhost:8000/api/updateItem/${_id}`, { text })
    .then(() => {
      setText("");
      setIsUpdating(false);
      getAllToDoItems(setToDo);
    })
    .catch((err) => console.log(err));
};

export const deleteToDoItem = (_id, setToDo) => {
  axios
    .delete(`http://localhost:8000/api/deleteItem/${_id}`)
    .then(() => {
      getAllToDoItems(setToDo);
    })
    .catch((err) => console.log(err));
};
