import React, { useState, useEffect } from "react";
import axios from "axios";
import { TASK_URL } from "@/URL";
import { Button } from "@/Components/ui/button";
import { format, differenceInDays, addDays, add, isValid } from "date-fns";
import IndividualTask from "./IndividualTask";
import { Accordion } from "./ui/accordion";
import { Form } from "react-router-dom";

function TaskListForm({
  projectTemplate,
  setProjectTaskDetails,
  projectTaskDetails,
  //setTrue = false,
  //setUpdatedTaskDetails,
  setOnTaskEdit,
  forUpdateTask = false,
  setUpdateFlag,
  setActiveTab,
  userList,
  setTaskDetails,
  onUpdateTask,
}) {
  const [taskData, setTaskData] = useState([]);
  const [submitData, setSubmitData] = useState(null);
  const [taskFormData, setTaskFormData] = useState([]);
  const [userOptions, setUserOptions] = useState({});
  const [listEntries, setListEntries] = useState([]);

  useEffect(() => {
    if (projectTaskDetails.length > 0) {
      console.log(projectTaskDetails);
      setTaskData(projectTaskDetails);
      console.log(taskData + "already saved tasks");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${TASK_URL}${projectTemplate}`);
          const resData = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setTaskData(resData);
          // console.log(resData);
          // console.log(taskData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, []);

  // const handleStatusChange = (task_num, e) => {
  //   setProjectTaskDetails(e.target.value);
  // };

  const handleSubmitTasks = (e) => {
    e.preventDefault();
    if (setProjectTaskDetails) {
      setProjectTaskDetails(taskData);
    }
    alert("Task details have been saved");
    if (setActiveTab) {
      setActiveTab("review_details");
    }
    if (forUpdateTask) {
      setOnTaskEdit(false);
      setUpdateFlag(true);
      setProjectTaskDetails(taskData);
    }
  };

  const handleGapDurationChange = (index, field, value) => {
    //input validation

    if (/^\d*$/.test(value)) {
      const updatedTasks = [...taskData];
      const currentTaskPlanDate = new Date(updatedTasks[index].plan_date);

      // plan date validation
      // console.log(isValid(currentTaskPlanDate));
      if (isValid(currentTaskPlanDate)) {
        updatedTasks[index] = {
          ...updatedTasks[index],
          [field]: value,
        };
        //update the next plan date
        if (field === "gap") {
          const currentActualDate = new Date(updatedTasks[index].actual_date);
          const gap = parseInt(updatedTasks[index].gap, 10) || 0;
          if (!isNaN(currentActualDate.getTime())) {
            const nextUpdatedPlanDate = new Date(currentActualDate);
            const newNextUpdatedPlanDate = addDays(
              nextUpdatedPlanDate,
              gap + 1
            );
            updatedTasks[index + 1].plan_date = newNextUpdatedPlanDate
              .toISOString()
              .split("T")[0];
          }
        } else if (field === "duration") {
          const currentPlanDate = new Date(updatedTasks[index].plan_date);
          const duration = parseInt(updatedTasks[index].duration, 10) || 0;
          if (!isNaN(currentPlanDate.getTime())) {
            const currentEndDate = new Date(currentPlanDate);
            const newCurrentEndDate = addDays(currentEndDate, duration);
            updatedTasks[index].actual_date = newCurrentEndDate
              .toISOString()
              .split("T")[0];
          }
        }
        setTaskData(updatedTasks);
      } else {
        alert(
          "Plan date does not exist for the current task. Please enter a plan date before adding duration/gap for the task."
        );
      }
    }
  };
  const handleTaskDetailsUpdate = (index, field, value) => {
    const updatedTasks = [...taskData];
    if (
      field === "user_responsibility_id" ||
      field === "secondary_responsibility_id" ||
      field === "tertiary_responsibility_id"
    ) {
      console.log(field);
      const userName = field.substring(0, field.length - 3) + "_name";
      const selectedOption = userList.find(
        ({ user_id }) => user_id.toString() === value
      );
      console.log(selectedOption);
      updatedTasks[index] = {
        ...updatedTasks[index],
        [field]: value,
        [userName]: selectedOption.username,
      };
    } else {
      updatedTasks[index] = {
        ...updatedTasks[index],
        [field]: value,
      };
      // if (field === "gap" || field === "duration") {
      //   handleGapDurationChange(index, field, value, updatedTasks);
      // }
    }
    setTaskData(updatedTasks);
    console.log(updatedTasks);
    console.log(taskData);
  };

  const handleEndDateChange = (index, field, value) => {
    const updatedTasks = [...taskData];
    //update current end date
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    };

    // plan date check
    const currentPlanDate = new Date(updatedTasks[index].plan_date);
    if (isValid(currentPlanDate)) {
      //update duration
      const currentEndDate = new Date(updatedTasks[index].actual_date);
      const currentDuration =
        Math.abs(currentEndDate - currentPlanDate) / (1000 * 60 * 60 * 24);
      updatedTasks[index] = {
        ...updatedTasks[index],
        ["duration"]: currentDuration,
      };
      console.log(currentDuration);
      setTaskData(updatedTasks);
    } else {
      alert("Plan date does not exist. Please fill the required details");
    }
  };
  const handleRevisedDateChange = (
    index,
    field,
    value
    // setRevisedDateChange,
    // revisedDateChange
  ) => {
    const updatedTasks = [...taskData];

    //only in update tasks
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    };
    const currentRevisedDate = new Date(updatedTasks[index].revised_date);

    //update current end date
    updatedTasks[index].actual_date = currentRevisedDate
      .toISOString()
      .split("T")[0];
    setTaskData(updatedTasks);
    for (let i = index; !isNaN(parseInt(updatedTasks[i].gap)); i = i + 1) {
      const currentGap = parseInt(updatedTasks[i].gap, 10) || 0;
      const newCurrentEndDate = new Date(updatedTasks[i].actual_date);

      //update current duration
      const currentPlanDate = new Date(updatedTasks[i].plan_date);
      const newDuration =
        Math.abs(newCurrentEndDate - currentPlanDate) / (1000 * 60 * 60 * 24);

      updatedTasks[i] = {
        ...updatedTasks[i],
        ["duration"]: newDuration,
      };
      setTaskData(updatedTasks);

      //update next plan date & then next end date
      console.log(i);
      const nextPlanDate = new Date(updatedTasks[i].actual_date);
      const newNextPlanDate = addDays(nextPlanDate, currentGap + 1);
      updatedTasks[i + 1] = {
        ...updatedTasks[i + 1],
        ["plan_date"]: newNextPlanDate.toISOString().split("T")[0],
      };
      const nextEndDate = new Date(updatedTasks[i + 1].plan_date);
      const nextDuration = parseInt(updatedTasks[i + 1].duration, 10) || 0;
      console.log(newNextPlanDate.toISOString().split("T")[0]);
      const newNextEndDate = addDays(nextEndDate, nextDuration);
      console.log(newNextEndDate.toISOString().split("T")[0]);
      updatedTasks[i + 1] = {
        ...updatedTasks[i + 1],
        ["actual_date"]: newNextEndDate.toISOString().split("T")[0],
      };
      console.log(updatedTasks);
      setTaskData(updatedTasks);
    }
  };

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
  // const changeHandler = (e) => {
  //   setEnteredData({
  //     ...enteredData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  //console.log(userList);

  return (
    <form id="task_list" onSubmit={handleSubmitTasks}>
      <div className="flex justify-start">
        <div className="flex place-content-center">
          <Button
            type="submit"
            className="bg-teal-theme w-56 mt-2 ml-6 rounded-full border-2 border-black text-black "
            // onClick={handleSubmitTasks}
            //form="task_list"
          >
            Save Tasks
          </Button>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="grid grid-cols-10 gap-2 items-center w-full text-center bg-green-300 mt-4 pr-7 font-semibold rounded-full">
        {projectTemplate === "Major" ? (
          <div className="col-span-2">Phase</div>
        ) : (
          <></>
        )}
        <div
          className={`${
            projectTemplate === "Minor" ? "col-span-3" : "col-span-1"
          }`}
        >
          Stage
        </div>
        <div className="col-span-2">Milestone</div>
        {/* <div className=""></div> */}
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Responsibility</div>
        {/* <div className="col-span-1">Duration</div> */}
        <div className="col-span-1">Start Date</div>
        {/* <div className="col-span-1">Gap</div> */}
        <div className="col-span-1">End Date</div>

      </div>

      <div>
        <Accordion type="single" collapsible className="w-full">
          {taskData?.map((rowData, index) => {
            return (
              <>
                <IndividualTask
                  rowData={rowData}
                  projectTemplate={projectTemplate}
                  userList={userList}
                  index={index}
                  handleTaskDetailsUpdate={handleTaskDetailsUpdate}
                  handleGapDurationChange={handleGapDurationChange}
                  onUpdateTask={forUpdateTask}
                  handleRevisedDateChange={handleRevisedDateChange}
                  handleEndDateChange={handleEndDateChange}
                />
              </>
            );
          })}
        </Accordion>

        {/* {console.log(taskData)} */}
      </div>
    </form>
  );
}

export default TaskListForm;
