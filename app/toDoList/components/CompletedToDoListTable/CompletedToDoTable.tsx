// header of the completed to do list table
// argument: take in all the completed tasks, do the mapping here

import React from "react";
import CompletedRow from "./CompletedRow";
import moment from "moment";

function convertTimestamp (timestamp) {
		//extract the seconds and nanos values from your Firestore timestamp object
		const { seconds, nanos } = timestamp;
    console.log("seconds: ", seconds, "nanos: ", nanos)
		//combine the seconds and nanos values into a single timestamp in milliseconds
		const milliseconds = seconds * 1000 + nanos / 1e6;
		//use Moment.js to convert the timestamp to a date
		return moment(milliseconds).toDate();
}


function CompletedToDoListTable({ emptyables }) {
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
        {emptyables.map((completed) => (
          <CompletedRow
            subject={completed.Subject}
            task={completed.Task}
            deadline={completed.Deadline}
            completionDate={`${completed.createdAt.toDate().getDate()}/${completed.createdAt.toDate().getMonth() + 1}/${completed.createdAt.toDate().getFullYear()}`}
            hours={completed.Hours}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CompletedToDoListTable;