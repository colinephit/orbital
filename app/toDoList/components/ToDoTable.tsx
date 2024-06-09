"use client";
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { purple, pink } from "@mui/material/colors";
import { useEffect, useState, createContext } from "react";
import TextField from "@mui/material/TextField";
import ToDoButton from "./ToDoButton";
import PendingToDoTextField from "./PendingToDoListTable/PendingToDoTextField";
import InputTextField from "./InputTextField";
import CompletedToDoListTable from "./CompletedToDoListTable/CompletedToDoTable";
import PopUp from "./Rewards/PopUp";
import {
  Checkbox,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../../firebase";
import { useSession } from "next-auth/react";
import { where } from "firebase/firestore";
import { SessionProvider } from "next-auth/react";
import { DatePicker } from "react-rainbow-components";

//function to add todos to firestore
async function addTodoToFirebase(Subject, Task, Deadline, Email) {
  try {
    //const session = await getServerSession(authOptions);
    const docRef = await addDoc(collection(db, "todos"), {
      Subject: Subject,
      Task: Task,
      Deadline: Deadline,
      createdAt: serverTimestamp(),
      Email: Email,
    });
    console.log("ToDo added with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding todo: ", error);
    return false;
  }
}

//function to fetch todos from firestore
async function fetchTodosFromFirestore(Email) {
  console.log(Email);
  const todosCollection = collection(db, "todos");
  const querySnapshot = await getDocs(
    query(
      todosCollection,
      where("Email", "==", Email),
      orderBy("Deadline", "desc")
    )
  );
  const todos = [];
  querySnapshot.forEach((doc) => {
    const todoData = doc.data();
    todos.push({ id: doc.id, ...todoData });
  });
  return todos;
}

//delete todos
async function deleteTodosFromFirestore(todoId) {
  try {
    console.log("Attempt to delete todo with ID: ", todoId);
    await deleteDoc(doc(db, "todos", todoId));
    return todoId;
  } catch (error) {
    console.error("Error deleting todo: ", error);
    return null;
  }
}

//function to add completed to firestore
async function addCompletedToFirebase(Subject, Task, Deadline, Hours) {
  try {
    const docRef = await addDoc(collection(db, "completed"), {
      Subject: Subject,
      Task: Task,
      Deadline: Deadline,
      createdAt: serverTimestamp(),
      Hours: Hours,
    });
    console.log("Completed added with ID: ", docRef.id);
    return true;
  } catch (error) {
    return false;
  }
}

//function to fetch completed from firestore
async function fetchCompletedFromFirestore() {
  const completedCollection = collection(db, "completed");
  const querySnapshot = await getDocs(
    query(completedCollection, orderBy("createdAt", "desc"))
  );
  const completed = [];
  querySnapshot.forEach((doc) => {
    const completedData = doc.data();
    completed.push({ id: doc.id, ...completedData });
  });
  return completed;
}

//delete all completed
async function deleteCompletedFromFirestore() {
  const completedsCollection = collection(db, "completed");
  const querySnapshot = await getDocs(query(completedsCollection));
  const completeds = [];
  querySnapshot.forEach((item) => {
    const ID = item.id;
    deleteDoc(doc(db, "completed", ID));
  });
}

//function to add emptyables to firestore
async function addEmptyableToFirebase(Subject, Task, Deadline, Hours) {
  try {
    const docRef = await addDoc(collection(db, "emptyable"), {
      Subject: Subject,
      Task: Task,
      Deadline: Deadline,
      createdAt: serverTimestamp(),
      Hours: Hours,
    });
    console.log("Emptyable added with ID: ", docRef.id);
    return true;
  } catch (error) {
    return false;
  }
}

//function to fetch emptyable from firestore
async function fetchEmptyableFromFirestore() {
  const emptyableCollection = collection(db, "emptyable");
  const querySnapshot = await getDocs(
    query(emptyableCollection, orderBy("createdAt", "desc"))
  );
  const emptyables = [];
  querySnapshot.forEach((doc) => {
    const completedData = doc.data();
    emptyables.push({ id: doc.id, ...completedData });
  });
  return emptyables;
}

//delete all emptyables
async function deleteEmptyableFromFirestore() {
  const completedsCollection = collection(db, "emptyable");
  const querySnapshot = await getDocs(query(completedsCollection));
  const completeds = [];
  querySnapshot.forEach((item) => {
    const ID = item.id;
    deleteDoc(doc(db, "emptyable", ID));
  });
}

function ToDoTable() {
  const [Subject, setSubject] = useState("");
  const [Task, setTask] = useState("");
  const [Deadline, setDeadline] = useState("");
  const currentUser = useSession();

  //state to hold the list of todos
  const [todos, setTodos] = useState([]);

  //state to hold the list of completed
  const [completeds, setCompleted] = useState([]);

  //state to hold the list of emptyables
  const [emptyables, setEmptyable] = useState([]);

  //state to hold the selected todo for update
  const [selectedTodo, setSelectedTodo] = useState(null);

  //state to track whether the form is in update mode
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      if (selectedTodo) {
        try {
          const updatedTodo = {
            Subject,
            Task,
            Deadline,
          };

          const todoRef = doc(db, "todos", selectedTodo.id);
          await updateDoc(todoRef, updatedTodo);

          //reset form fields
          setSubject("");
          setTask("");
          setDeadline("");
          setSelectedTodo(null);
          setIsUpdateMode(false);

          alert("Todo updates successfully!");
        } catch (error) {
          console.error("Error updating todo: ", error);
        }
      }
    } else {
      const added = await addTodoToFirebase(
        Subject,
        Task,
        Deadline,
        currentUser?.data?.user?.email
      );
      if (added) {
        setSubject("");
        setTask("");
        setDeadline("");

        alert("Todo added to firestore successfully!");
      }
    }
  };

  //fetch todos from firestore on component mount
  useEffect(() => {
    async function fetchTodos() {
      const todos = await fetchTodosFromFirestore(
        currentUser?.data?.user?.email
      );
      setTodos(todos);
    }
    fetchTodos();
  }, []);

  //fetch completed from firestore on component mount
  useEffect(() => {
    async function fetchCompleted() {
      const completed = await fetchCompletedFromFirestore();
      setCompleted(completed);
    }
    fetchCompleted();
  }, []);
  
  //fetch emptyable from firestore on component mount
  useEffect(() => {
    async function fetchEmptyable() {
      const emptyable = await fetchEmptyableFromFirestore();
      setEmptyable(emptyable);
    }
    fetchEmptyable();
  }, []);

  //function to handle "update button click"
  const handleUpdateClick = (todo) => {
    //set the selected todo's value to the form fields
    setSubject(todo.Subject || "");
    setTask(todo.Task || "");
    setDeadline(todo.Deadline || "");

    setSelectedTodo(todo);
    setIsUpdateMode(true);
  };

  if (!currentUser || !currentUser.data || !currentUser.data.user) {
    return <div>Loading...</div>; // Or another loading indicator
  }

  return (
    <div className="overflow-x-auto">
      <h1>Hello, {currentUser.data.user.name} </h1>

      {/*table for users to add a new task*/}
      <h2 className="text-center font-bold pt-10 underline">
        Add a new task here
      </h2>

      <form className="overflow-x-auto" onSubmit={handleSubmit}>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-2xl">Subject</th>
              <th className="text-2xl">Task</th>
              <th className="text-2xl">Deadline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th></th>
              <td>
                <div className="flex items-center gap-3"></div>
                <div>
                  <InputTextField
                    value={Subject}
                    label={"Subject"}
                    onChangeAction={(e) => setSubject(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <InputTextField
                    value={Task}
                    label={"Task"}
                    onChangeAction={(e) => setTask(e.target.value)}
                  />
                </div>
              </td>
              <td>
                <div>
                  <TextField
                    fullWidth
                    value={Deadline}
                    type="date"
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    autoComplete="off"
                  ></TextField>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: pink[300],
            mt: 3,
            ml: 70,
            margin: "0 auto",
            display: "flex",
            "&:hover": {
              backgroundColor: pink[400],
            },
          }}
        >
          {isUpdateMode ? "Update Task" : "Add Task"}
        </Button>
      </form>

      {/* Pending Todo list */}
      <div>
        <h2 className="text-center font-bold pt-20 underline">To-do List</h2>
        {/*to pass in: todos (all), update on click action, delete on click action, checkbox on change action 
        (add item to completed to do list when the confirm button is clicked), input props for checkbox */}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-2xl">Subject</th>
              <th className="text-2xl">Task</th>
              <th className="text-2xl">Deadline</th>
              <th className="text-2xl"></th>
            </tr>
          </thead>

          {/*map each to do item to the row */}
          {todos.map((todo) => (
            <tbody>
              <tr className="hover">
                <th>
                  <PopUp
                    // onClickAction contains the function that adds to do list to completed to do list
                    // after the "confirm" button is clicked on the pop up
                    onClickAction={ async (selectedHours) => {
                      const addedCompletedId = await addCompletedToFirebase(
                        todo.Subject,
                        todo.Task,
                        todo.Deadline,
                        selectedHours
                      );
                      const addedEmptyableId = await addEmptyableToFirebase(
                        todo.Subject,
                        todo.Task,
                        todo.Deadline,
                        selectedHours
                      );
                      const deletedTodoId = await deleteTodosFromFirestore(
                        todo.id
                      );
                      if (deletedTodoId) {
                        const updatedTodos = todos.filter(
                          (t) => t.id !== deletedTodoId
                        );
                        setTodos(updatedTodos);
                      }
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </th>

                <td id="Subject">
                  <tr className="hover">
                    <th></th>
                    <td>
                      <div className="flex items-center gap-3"></div>
                      <div>
                        <PendingToDoTextField text={todo.Subject} />
                      </div>
                    </td>
                  </tr>
                </td>

                <td id="Task">
                  <tr className="hover">
                    <td>
                      <div className="flex items-center gap-3"></div>
                      <div>
                        <PendingToDoTextField text={todo.Task} />
                      </div>
                    </td>
                  </tr>
                </td>
                <td id="Deadline">
                  <tr className="hover">
                    <th></th>
                    <td>
                      <div className="flex items-center gap-3"></div>
                      <div>
                        <PendingToDoTextField text={`${new Date(Date.parse(todo.Deadline)).getDate()}/${new Date(Date.parse(todo.Deadline)).getMonth() + 1}/${new Date(Date.parse(todo.Deadline)).getFullYear()}`} />
                      </div>
                    </td>
                  </tr>
                </td>
                <td>
                  <ListItem
                    sx={{ pl: 12 }}
                    secondaryAction={
                      <>
                        {/* // update button */}
                        <ToDoButton
                          text={"Update"}
                          onClickAction={() => handleUpdateClick(todo)}
                        />
                        {/* delete button */}
                        <ToDoButton
                          text={"Delete"}
                          onClickAction={async () => {
                            const deletedTodoId =
                              await deleteTodosFromFirestore(todo.id);
                            if (deletedTodoId) {
                              const updatedTodos = todos.filter(
                                (t) => t.id !== deletedTodoId
                              );
                              setTodos(updatedTodos);
                            }
                          }}
                        />
                      </>
                    }
                    //disablePadding
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Completed List */}
      <div>
        <>
          <h2 className="text-center font-bold pt-40 underline">
            Completed To-dos
          </h2>
        </>
        <ToDoButton
          text={"Clear All"}
          onClickAction={() => deleteEmptyableFromFirestore()}
        />
      </div>
      <>
        <CompletedToDoListTable emptyables={emptyables} />
      </>
    </div>
  );
}
export default ToDoTable;
