"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { purple, pink } from "@mui/material/colors";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function ToDoTable() {
  const [todo, setTodo] = useState({ Task: "", Time: "", Subject: "" });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th className="text-2xl">Task</th>
            <th className="text-2xl">Estimated Time</th>
            <th className="text-2xl">Subject</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3"></div>
              <div>
                <div>
                  <TextField
                    fullWidth
                    label="Task"
                    value={todo.Task}
                    onChange={(e) => setTodo({ ...todo, Task: e.target.value })}
                  ></TextField>
                </div>
              </div>
            </td>
            <td>
              <div>
                <TextField
                  fullWidth
                  label="Time"
                  value={todo.Time}
                  onChange={(e) => setTodo({ ...todo, Time: e.target.value })}
                ></TextField>
              </div>
            </td>
            <td>
              <div>
                <TextField
                  fullWidth
                  label="Subject"
                  value={todo.Subject}
                  onChange={(e) =>
                    setTodo({ ...todo, Subject: e.target.value })
                  }
                ></TextField>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        variant="contained"
        sx={{ backgroundColor: purple[300], mt: 3, ml: 70 }}
      >
        Add Task
      </Button>
    </div>
  );
}
export default ToDoTable;
