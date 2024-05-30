/*
"use client"

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import * as React from "react";
import { useState } from "react";
import Todo from "./Todo";

function ListGroup() {

  const [todos, setTodo] = useState([]);

  React.useEffect( () => {
    const collectionRef = collection(db, "todos")

    const q = query(collectionRef, orderBy("Deadline", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTodo(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id, Deadline: doc.data()
        .Deadline?.toDate().getTime()})))
    });
    return unsubscribe;

  }, [])
  
  return (
    <div>
      {todos.map(todo => <Todo key={todo.id}
        Subject={todo.Subject}
        Task={todo.Task}
        Deadline={todo.Deadline}
      />)}
    </div>
  );
}
export default ListGroup;
*/
