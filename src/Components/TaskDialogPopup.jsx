import { format } from "date-fns";
import React from "react";

function TaskDialogPopup({ rowData, taskHistory }) {
  const revisedDatesHistory = taskHistory;
  // revisedDatesHistory.map((e) => {
  //   console.log(e);
  // });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row">
        Revised Date Changes:
        {revisedDatesHistory?.map((revDate) => {
          if (revDate.revised_date === "") {
            return <></>;
          }
          const dateValue = new Date(revDate.revised_date);
          const formattedRevisedDate = format(
            new Date(dateValue),
            "dd/MM/yyyy"
          );
          return (
            <div>
              {formattedRevisedDate}
              {`->`}
            </div>
          );
        })}
      </div>
      {/* <div className="flex gap-4 justify-between">
        <div className="font-bold">Date:</div>
        <input type="date" />
      </div>
      <div className="flex gap-4 justify-between">
        <div className="font-bold">Project Name:</div>
        <input />
      </div>
      <div className="flex gap-4 justify-between">
        <div className="font-bold">Task Name:</div>
        <input />
      </div>
      <div className="flex gap-4 justify-between">
        <div className="font-bold">Time:</div>
        <input />
      </div>
      <div className="flex gap-4 justify-between">
        <div className="font-bold">Notes:</div>
        <input className="w-64"/>
      </div>*/}
    </div>
  );
}

export default TaskDialogPopup;
