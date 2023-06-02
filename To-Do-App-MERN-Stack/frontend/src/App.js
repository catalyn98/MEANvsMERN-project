import React, { useEffect, useState } from "react";
import ToDo from "../src/components/ToDoItem";
import {
  getAllToDoItems,
  addToDoItem,
  updateToDoItem,
  deleteToDoItem,
} from "../src/utils/HandleAPI";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDoItems(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To do list</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add item"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDoItem(
                      toDoId,
                      text,
                      setToDo,
                      setText,
                      setIsUpdating
                    )
                : () => addToDoItem(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDoItem(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/licenseproject-c2773.appspot.com/o/MERN%20stack.png?alt=media&token=da29aa9e-8035-4c12-b495-cb48525378f4"
        alt="logo"
        className="image"
      />
    </div>
  );
}

export default App;
