// header of the completed to do list table
// argument: take in all the completed tasks, do the mapping here

import React from "react";
import CompletedRow from "./CompletedRow";

function CompletedToDoListTable({ emptyables }) {
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th className="text-2xl cursor-default w-1/5">Subject</th>
          <th className="text-2xl cursor-default w-1/5">Task</th>
          <th className="text-2xl cursor-default w-1/5">Deadline</th>
          <th className="text-2xl cursor-default w-1/5">Date of Completion</th>
          <th className="text-2xl cursor-default w-1/5">Hours Spent</th>
        </tr>
      </thead>
      <tbody>
        {/* map all the rows here */}
        {emptyables.map((completed) => (
          <CompletedRow
            subject={completed.Subject}
            task={completed.Task}
            deadline={completed.Deadline}
            completionDate={`${completed.createdAt.toDate().getDate()}/${
              completed.createdAt.toDate().getMonth() + 1
            }/${completed.createdAt.toDate().getFullYear()}`}
            hours={completed.Hours}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CompletedToDoListTable;
