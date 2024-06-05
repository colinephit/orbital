import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function ModifiedCheckbox({ onChangeAction, inputProps }) {
  return (
    <Checkbox
      {...label}
      edge="start"
      tabIndex={-1}
      onChange={onChangeAction}
      sx={{
        "& .MuiSvgIcon-root": { fontSize: 28 },
        color: pink[800],
        "&.Mui-checked": { color: pink[400] },
      }}
      inputProps={inputProps}
    />
  );
}

export default ModifiedCheckbox;

// OLD CHECKBOX
{
  /* <Checkbox
                edge="start"
                tabIndex={-1}
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
              /> */
}
