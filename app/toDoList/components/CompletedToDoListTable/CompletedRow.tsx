import React from "react";
import CompletedToDoTextField from "./CompletedToDoTextField";

// arguments: subject, task, deadline, date checkbox was ticked

function CompletedRow({ subject, task, deadline, completionDate, hours }) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return (
    <tr>
      <th></th>

      <td id="Subject" className="w-1/5">
        <tr className="border-none">
          <td>
            <div className="flex items-center gap-3 cursor-default">
              <CompletedToDoTextField text={subject} />
            </div>
          </td>
        </tr>
      </td>

      <td id="Task" className="w-1/5">
        <tr className="border-none">
          <td>
            <div className="flex items-center gap-3 cursor-default">
              <CompletedToDoTextField text={task} />
            </div>
          </td>
        </tr>
      </td>

      <td id="Deadline" className="w-1/5">
        <tr className="border-none">
          <td>
            <div className="flex items-center gap-3 cursor-default">
              <CompletedToDoTextField
                text={`${new Date(Date.parse(deadline)).getDate()}/${
                  new Date(Date.parse(deadline)).getMonth() + 1
                }/${new Date(Date.parse(deadline)).getFullYear()}`}
              />
            </div>
          </td>
        </tr>
      </td>

      <td id="Date of Completion" className="w-1/5">
        <tr className="border-none">
          <td>
            <div className="flex items-center gap-3 cursor-default">
              <CompletedToDoTextField text={completionDate} />
            </div>
          </td>
        </tr>
      </td>

      <td id="Hours Spent" className="w-1/5">
        <tr className="border-none">
          <td>
            <div className="flex items-center gap-3 cursor-default">
              <CompletedToDoTextField text={hours} />
            </div>
          </td>
        </tr>
      </td>
    </tr>
  );
}

export default CompletedRow;
