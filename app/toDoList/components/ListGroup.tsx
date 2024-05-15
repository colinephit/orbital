"use client";

import Checkboxes from "./Checkbox,";

function ListGroup() {
  // let items = [
  //   "CS2030S lab",
  //   "CS2040S tutorial",
  //   "Math tutorial",
  //   "Write Essay",
  // ];

  return (
    <>
      <h1>To Do List</h1>
      <ul>
        <Checkboxes></Checkboxes>{" "}
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </ul>
    </>
  );
}

export default ListGroup;
