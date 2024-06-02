"use client";
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { purple, pink } from "@mui/material/colors";
import { useEffect, useState, createContext } from "react";
import TextField from "@mui/material/TextField";
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
async function addCompletedToFirebase(Subject, Task, Deadline) {
  try {
    const docRef = await addDoc(collection(db, "completed"), {
      Subject: Subject,
      Task: Task,
      Deadline: Deadline,
      createdAt: serverTimestamp(),
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

function ToDoTable() {
  const [Subject, setSubject] = useState("");
  const [Task, setTask] = useState("");
  const [Deadline, setDeadline] = useState("");
  const currentUser = useSession();

  //state to hold the list of todos
  const [todos, setTodos] = useState([]);

  //state to hold the list of completed
  const [completeds, setCompleted] = useState([]);

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
                  <div>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={Subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      autoComplete="off"
                    ></TextField>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <TextField
                    fullWidth
                    label="Task"
                    value={Task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                    autoComplete="off"
                  ></TextField>
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
            backgroundColor: purple[300],
            mt: 3,
            ml: 70,
            margin: "0 auto",
            display: "flex",
            hover: purple[300],
          }}
        >
          {isUpdateMode ? "Update Task" : "Add Task"}
        </Button>
      </form>

      {/* Todo list */}
      <div>
        <h2 className="text-center font-bold">To-do List</h2>
        {todos.map((todo) => (
          <ListItem
            sx={{ mt: 3 }}
            secondaryAction={
              <>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => handleUpdateClick(todo)}
                  sx={{
                    backgroundColor: purple[300],
                    mt: 3,
                    ml: 70,
                    margin: "0 auto",
                    display: "flex",
                    hover: purple[300],
                  }}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  onClick={async () => {
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
                  sx={{
                    backgroundColor: purple[300],
                    mt: 3,
                    ml: 70,
                    margin: "0 auto",
                    display: "flex",
                    hover: purple[300],
                  }}
                >
                  Delete
                </Button>
              </>
            }
            disablePadding
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={false}
                onChange={async () => {
                  const addedCompletedId = await addCompletedToFirebase(
                    todo.Subject,
                    todo.Task,
                    todo.Deadline
                  );
                  const deletedTodoId = await deleteTodosFromFirestore(todo.id);
                  if (deletedTodoId) {
                    const updatedTodos = todos.filter(
                      (t) => t.id !== deletedTodoId
                    );
                    setTodos(updatedTodos);
                  }
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={todo.Subject + ": " + todo.Task}
              secondary={todo.Deadline}
            />
          </ListItem>
        ))}
      </div>

      {/* Completed List */}
      <div>
        <h2 className="text-center font-bold">Completed To-dos</h2>
        <Button
          type="button"
          variant="contained"
          onClick={() => deleteCompletedFromFirestore()}
          sx={{
            backgroundColor: purple[300],
            mt: 3,
            ml: 70,
            margin: "0 auto",
            display: "flex",
            hover: purple[300],
          }}
        >
          Clear All
        </Button>
        {completeds.map((completed) => (
          <ListItem sx={{ mt: 3 }}>
            <ListItemText
              primary={completed.Subject + ": " + completed.Task}
              secondary={completed.Deadline}
            />
          </ListItem>
        ))}
      </div>
    </div>
  );
}
export default ToDoTable;
