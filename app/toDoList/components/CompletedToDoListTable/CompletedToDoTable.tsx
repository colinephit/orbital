// header of the completed to do list table
// argument: take in all the completed tasks, do the mapping here

import React from "react";
import CompletedRow from "./CompletedRow";

function CompletedToDoListTable({ completeds }) {
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th className="text-2xl">Subject</th>
          <th className="text-2xl">Task</th>
          <th className="text-2xl">Deadline</th>
          <th className="text-2xl">Date of Completion</th>
          <th className="text-2xl">Hours Spent</th>
        </tr>
      </thead>
      <tbody>
        {/* map all the rows here */}
        {completeds.map((completed) => (
          <CompletedRow
            subject={completed.Subject}
            task={completed.Task}
            deadline={completed.Deadline}
            hours={completed.Hours}
          />
        ))}

        {/* <CompletedRow text={"hi"} deadline={13 / 4 / 2023} /> */}
      </tbody>
    </table>
  );
}

export default CompletedToDoListTable;