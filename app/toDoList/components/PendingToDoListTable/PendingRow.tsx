// component is each row in the to do list of pending items
import React from "react";
import PendingToDoTextField from "./PendingToDoTextField";
import ModifiedCheckbox from "./ModifiedCheckbox";
import PopUp from "../Rewards/PopUp";
// arguments: subject, task, deadline, date checkbox was ticked

function PendingRow({ subject, task, deadline }) {
  const today = new Date();

  return (
    <tr className="hover">
      <th>{/* <PopUp /> */}</th>

      <td id="Subject">
        <tr className="hover">
          <th></th>
          <td>
            <div className="flex items-center gap-3"></div>
            <div>
              <PendingToDoTextField text={subject} />
            </div>
          </td>
        </tr>
      </td>

      <td id="Task">
        <tr className="hover">
          <td>
            <div className="flex items-center gap-3"></div>
            <div>
              <PendingToDoTextField text={task} />
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
              <PendingToDoTextField text={deadline} />
            </div>
          </td>
        </tr>
      </td>
    </tr>
  );
}

export default PendingRow;
