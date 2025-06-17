import React, { useEffect, useState } from "react";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";
import { format } from "date-fns";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import TaskDialogPopup from "./TaskDialogPopup";
import axios from "axios";
// import { TASK_HISTORY } from "@/URL";
function IndividualTask({
  rowData,
  projectTemplate,
  userList,
  onUpdateTask = false,
  index,
  handleTaskDetailsUpdate,
  handleGapDurationChange,
  handleRevisedDateChange,
  handleEndDateChange,
}) {
  // useEffect(() => {}, [taskData]);
  // const handleTaskUserSelect = (rowTaskNumber, e) => {
  //   const selectedUserId = e.target.value;
  //   console.log(selectedUserId);
  //   setTaskData((prevRows) =>
  //     prevRows.map((row) => {
  //       if (row.task_number === rowTaskNumber) {
  //         const responsibility = row.responsibility;
  //         //console.log(userList[responsibility]);
  //         const selectedOption = userList.find(
  //           ({ user_id }) => user_id.toString() === selectedUserId
  //         );
  //         console.log(row);
  //         console.log(selectedOption);
  //         // const user_responsibility = {
  //         //   user_responsibility_name: selectedOption.username,
  //         //   user_responsibility_id: selectedOption.user_id,
  //         // };
  //         row = {
  //           ...row,
  //           user_responsibility_name: selectedOption.username,
  //           user_responsibility_id: selectedOption.user_id,
  //         };
  //         console.log(row);
  //         return {
  //           ...row,
  //         };
  //       }
  //       return row;
  //     })
  //   );
  // };
  // const updateAccordionData = (id, field, value, isExpanded = false) => {
  //   setTaskFormData((prev) =>
  //     prev.map((accordion) => {
  //       if (accordion.id === id) {
  //         if (isExpanded) {
  //           return {
  //             ...accordion,
  //             expandedInputs: {
  //               ...accordion.expandedInputs,
  //               [field]: value,
  //             },
  //           };
  //         }
  //         return {
  //           ...accordion,
  //           closedInput: value,
  //         };
  //       }
  //       return accordion;
  //     })
  //   );
  // };
  // const toggleAccordion = (id) => {
  //   setTaskFormData((prev) =>
  //     prev.map((accordion) =>
  //       accordion.id === id
  //         ? { ...accordion, isOpen: !accordion.isOpen }
  //         : accordion
  //     )
  //   );
  // };
  const [rowTaskHistory, setRowTaskHistory] = useState([]);
  const onInfoClick = async () => {
    try {
      const response = await axios.get(`${TASK_HISTORY}/${rowData.taskid}`);
      const taskHistoryData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setRowTaskHistory(taskHistoryData);
      console.log(rowTaskHistory);
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col">
      <AccordionItem
        value={`item-${index}`}
        className="mt-4 mr-4 ml-4 rounded-lg bg-teal-200"
        key={index}
        name={`acc-${index}`}
      >
        <AccordionTrigger>
          <div className="grid grid-cols-10  gap-2 items-center p-1 w-full">
            <input
              hidden
              name={`task_number_${index}`}
              defaultValue={rowData.task_number}
            />
            {projectTemplate === "Major" ? (
              <div className="col-span-2">{rowData.task_phase}</div>
            ) : (
              <></>
            )}
            <div
              className={`${
                projectTemplate === "Minor" ? "col-span-3" : "col-span-1"
              }`}
            >
              {rowData.stage}
            </div>
            <p className="col-span-2">{rowData.key_milestone}</p>

            <select
              name={`status-${index}`}
              onChange={(e) =>
                handleTaskDetailsUpdate(index, "status", e.target.value)
              }
              className={`col-span-2 rounded-full`}
              defaultValue={rowData.status}
              onClick={(e) => e.stopPropagation()}
            >
              <option name="pending">Pending</option>
              <option name="done">Done</option>
              <option name="not_applicable">Not Applicable</option>
              <option name="not_required">Not Required</option>
            </select>
            <div className="content-center col-span-1">
              {rowData.responsibility}
            </div>

            {onUpdateTask ? (
              <div className="content-center col-span-1">
                {rowData.duration}
              </div>
            ) : (
              <input
                type="number"
                name={`duration-${index}`}
                id={`duration-${index}`}
                placeholder="0"
                min="0"
                defaultValue={rowData.duration}
                className="col-span-1 rounded-full"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleGapDurationChange(index, "duration", e.target.value)
                }
              />
            )}
            {onUpdateTask ? (
              <div className="content-center col-span-1">{rowData.gap}</div>
            ) : (
              <input
                type="number"
                className="col-span-1 rounded-full"
                id={`gap-${index}`}
                name={`gap-${index}`}
                placeholder="0"
                min="0"
                defaultValue={rowData.gap}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleGapDurationChange(index, "gap", e.target.value)
                }
              />
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-teal-100 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="gap-2 flex flex-row justify-around">
              <div className="flex flex-wrap ">
                <label
                  className="w-4/5 text-center"
                  htmlFor={`plan_date-${index}`}
                >
                  Plan Date
                </label>
                <input
                  name={`plan_date-${index}`}
                  id={`plan_date-${index}`}
                  type="date"
                  onChange={(e) =>
                    handleTaskDetailsUpdate(index, "plan_date", e.target.value)
                  }
                  className="rounded-full w-4/5"
                  defaultValue={rowData.plan_date}
                />
              </div>

              {rowData.revised_date === "" && onUpdateTask ? (
                <div className="flex flex-wrap ">
                  <label className="w-4/5 text-center">End Date</label>
                  <div className="rounded-full w-4/5 border-1 border-black content-center bg-white text-center">
                    {rowData.actual_date}
                  </div>
                </div>
              ) : onUpdateTask ? (
                <div className="flex flex-wrap ">
                  <label className="w-4/5 text-center">End Date</label>
                  <div className="rounded-full w-4/5 border-2 border-black content-center bg-white text-center">
                    {rowData.revised_date}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {onUpdateTask ? (
                <></>
              ) : (
                <div className="flex flex-wrap ">
                  <label className="w-4/5 text-center">End Date</label>
                  <input
                    type="date"
                    className="rounded-full w-4/5"
                    name={`actual_date-${index}`}
                    id={`actual_date-${index}`}
                    onChange={(e) =>
                      handleEndDateChange(index, "actual_date", e.target.value)
                    }
                    defaultValue={rowData.actual_date}
                  />
                </div>
              )}
              {onUpdateTask ? (
                <div className="flex flex-wrap">
                  <label
                    className="w-4/5 text-center"
                    htmlFor={`revised_date-${index}`}
                  >
                    Revised Date
                  </label>
                  <input
                    type="date"
                    className="rounded-full w-4/5"
                    name={"revised_date-" + rowData.task_number}
                    defaultValue={rowData.revised_date}
                    id={`revised_data-${index}`}
                    onChange={(e) =>
                      handleRevisedDateChange(
                        index,
                        "revised_date",
                        e.target.value
                      )
                    }
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="flex flex-row ml-4"> */}
              {/* <div className="flex flex-wrap ">
                <label className="w-4/5 text-center">
                  Primary Responsibility
                </label>
                <select
                  id={`user_responsibility_name-${index}`}
                  name={`user_responsibility_name-${index}`}
                  className="rounded-full w-4/5"
                  defaultValue={rowData.user_responsibility_id}
                  onChange={(e) =>
                    handleTaskDetailsUpdate(
                      index,
                      "user_responsibility_id",
                      e.target.value
                    )
                  }
                >
                  <option name="" selected>
                    Select User
                  </option>

                  {userList?.map((user) => {
                    return (
                      <option
                        key={user.user_id}
                        value={user.user_id}
                        className="bg-gray-300"
                        // label={user.username}
                      >
                        {user.username}({user.email})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-wrap ">
                <label className="w-4/5 text-center">
                  Secondary Responsibility
                </label>
                <select
                  id={`secondary_responsibility_name-${index}`}
                  name={`secondary_responsibility_name-${index}`}
                  className="rounded-full w-4/5"
                  defaultValue={rowData.secondary_responsibility_id}
                  onChange={(e) =>
                    handleTaskDetailsUpdate(
                      index,
                      "secondary_responsibility_id",
                      e.target.value
                    )
                  }
                >
                  <option name="" selected>
                    Select User
                  </option>

                  {userList?.map((user) => {
                    return (
                      <option
                        key={user.user_id}
                        value={user.user_id}
                        className="bg-gray-300"
                        // label={user.username}
                      >
                        {user.username}({user.email})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-wrap ">
                <label className="w-4/5 text-center">
                  Tertiary Responsibility
                </label>
                <select
                  id={`tertiary_responsibility_name-${index}`}
                  name={`tertiary_responsibility_name-${index}`}
                  className="rounded-full w-4/5"
                  defaultValue={rowData.tertiary_responsibility_id}
                  onChange={(e) =>
                    handleTaskDetailsUpdate(
                      index,
                      "tertiary_responsibility_id",
                      e.target.value
                    )
                  }
                >
                  <option name="" selected>
                    Select User
                  </option>

                  {userList?.map((user) => {
                    return (
                      <option
                        key={user.user_id}
                        value={user.user_id}
                        className="bg-gray-300"
                      >
                        {user.username}({user.email})
                      </option>
                    );
                  })}
                </select>
              </div> */}
            {/* </div> */}
            <div className="flex flex-row items-center content-center gap-4 ml-4">
              {onUpdateTask ? (
                <></>
              ) : (
                <div>
                  <label>Attachment Needed? </label>
                  {/* {console.log(rowData.attachmentflag)} */}
                  <input
                    type="checkbox"
                    id={`attachmentflag-${index}`}
                    name={`attachmentflag`}
                    className="rounded-full"
                    value="yes"
                    // defaultValue={rowData.attachmentflag}
                    onChange={(e) => {
                      {
                        console.log(e.target.value);
                      }
                      handleTaskDetailsUpdate(
                        index,
                        "attachmentflag",
                        e.target.value
                      );
                    }}
                  />
                </div>
              )}
              <label className="ml-8">Remarks</label>
              <input
                type="text"
                id={`remarks-${index}`}
                name={`remarks-${index}`}
                defaultValue={rowData.remarks}
                onChange={(e) =>
                  handleTaskDetailsUpdate(index, "remarks", e.target.value)
                }
                className="rounded-xl"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* {console.log("$$$$$$$$$$")} */}
      {/* {onUpdateTask ? (
        <div className="flex flex-row-reverse pr-4">
          <Dialog>
            <DialogTrigger asChild>
              <InformationCircleIcon
                className="h-5 w-5 "
                onClick={onInfoClick}
              />
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader className="">Task Details</DialogHeader>
              <TaskDialogPopup rowData={rowData} taskHistory={rowTaskHistory} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
}

export default IndividualTask;
