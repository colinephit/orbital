// each additional row to be added into the completed to do list table

import React from "react";
import CompletedToDoTextField from "./CompletedToDoTextField";

// arguments: subject, task, deadline, date checkbox was ticked

function CompletedRow({ subject, task, deadline, completionDate, hours }) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return (
    <tr className="hover">
      <th></th>

      <td id="Subject">
        <tr className="hover">
          <th></th>
          <td>
            <div className="flex items-center gap-3"></div>
            <div>
              <CompletedToDoTextField text={subject} />
            </div>
          </td>
        </tr>
      </td>

      <td id="Task">
        <tr className="hover">
          <th></th>
          <td>
            <div className="flex items-center gap-3"></div>
            <div>
              <CompletedToDoTextField text={task} />
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
              <CompletedToDoTextField
                text={`${new Date(Date.parse(deadline)).getDate()}/${
                  new Date(Date.parse(deadline)).getMonth() + 1
                }/${new Date(Date.parse(deadline)).getFullYear()}`}
              />
            </div>
          </td>
        </tr>
      </td>
      <td id="Date of Completion">
        <tr className="hover">
          <th></th>
          <td>
            <div className="flex items-center gap-3"></div>
            <div>
              <CompletedToDoTextField text={completionDate} />
            </div>
          </td>
        </tr>
      </td>
      <td id="Hours Spent">
        <tr className="hover">
          <th></th>
          <td>
            <div className="flex items-center gap-3"></div>
            <div>
              <CompletedToDoTextField text={hours} />
            </div>
          </td>
        </tr>
      </td>
    </tr>
  );
}

export default CompletedRow;
