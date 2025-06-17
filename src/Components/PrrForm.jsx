import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";
import { DataTable, BaseCell } from "./DataTable";
import { useMemo } from "react";
import { ADD_PRR_URL, GET_PROJECT_DATA_URL } from "@/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PrrForm({ projectList, selectedDate, showPrr = false, prrInfo }) {
  const [selectedProject, setSelectedProject] = useState();
  const [taskData, setTaskData] = useState([]); //useMemo(() => {}, []);
  const [tableList, setTableList] = useState([]);
  const [prrData, setPrrData] = useState();
  const [selectedMilestone, setSelectedMilestone] = useState();
  const [delayedValue, setDelayedValue] = useState();
  const [targetValue, setTargetValue] = useState();
  const [revisedValue, setRevisedValue] = useState();

  const navigate = useNavigate();
  console.log(prrInfo, prrData);

  useEffect(() => {
    getProjectData();
  }, [selectedProject, selectedMilestone, prrData]);

  const getProjectData = async () => {
    try {
      const projectResponse = await axios.get(
        `${GET_PROJECT_DATA_URL}/${selectedProject.project_id}`
      );
      console.log(projectResponse.data);
      setTaskData(() => [...projectResponse.data.tasks]);
    } catch (err) {
      console.error(err);
    }
  };

  const addToList = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("listItem"));
    const tempData = {};
    for (let [key, value] of formData.entries()) {
      if (key === "key_milestone") {
        const selectedTask = taskData.find(({ taskid }) => {
          return taskid.toString() === value;
        });
        tempData["taskid"] = selectedTask.taskid;
        tempData["key_milestone"] = selectedTask.key_milestone;
      } else tempData[key] = value;
    }
    console.log(tempData);
    tempData["project_id"] = selectedProject.project_id;
    setTableList(() => [...tableList, tempData]);
    //const projectType = formData.get("projectType");
    // console.log(projectType);
    // for (let [key, value] of formData.entries()) {
    //   console.log({ key, value });
    // }
    e.currentTarget.reset();
    setSelectedProject();
    setTaskData([]);
  };

  const addPrr = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("prrDetails"));
    const tempData = {};
    for (let [key, value] of formData.entries()) {
      tempData[key] = value;
    }
    console.log(tempData);
    setPrrData(() => ({
      prr_details: { prr_date: selectedDate, ...tempData },
      prr_list: tableList,
    }));
    try {
      const response = await axios.post(ADD_PRR_URL, {
        prr_details: { prr_date: selectedDate, ...tempData },
        prr_list: tableList,
      });
      console.log(response);
      alert("PRR Created");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const taskColumns = useMemo(() => [
    {
      header: "Project Code",
      accessorKey: "project_code",
      meta: {
        type: "text",
      },
    },
    {
      header: "Project Name",
      accessorKey: "project_name",
      meta: {
        type: "text",
      },
    },
    {
      header: "Milestone",
      accessorKey: "key_milestone",
      meta: {
        type: "text",
      },
      // cell: ({ getValue }) => {
      //   // const dateValue = new Date(getValue());
      //   // if (!isNaN(dateValue)) {
      //   //   return format(new Date(dateValue), "dd/MM/yyyy");
      //   // }
      //   const value = getValue();
      //   console.log(taskData,value);
      //   const selected = taskData.find(({ taskid }) => {
      //     return value === taskid.toString();
      //   });
      //   console.log(selected);
      //   if (selected) {
      //     return selected.key_milestone;
      //   }
      //   return "";
      // },
    },
    {
      header: "Target Date",
      accessorKey: "targetDate",
      meta: {
        type: "date",
      },
      cell: BaseCell,
    },
    {
      header: "Revised Date",
      accessorKey: "revisedDate",
      meta: {
        type: "date",
      },
      cell: BaseCell,
    },
    {
      header: "No. Of Days Delayed",
      accessorKey: "delayedDays",
      meta: {
        type: "number",
        // options: [
        //   { value: "done", label: "Done" },
        //   { value: "pending", label: "Pending" },
        //   { value: "not_applicable", label: "Not Applicable" },
        //   { value: "not_required", label: "Not Required" },
        // ],
      },
      cell: BaseCell,
    },
    {
      header: "Reason For Delay",
      accessorKey: "delayReason",
      meta: {
        type: "text",
      },
      cell: BaseCell,
    },
    {
      header: "Impacted Milestones / Recovery Plan",
      accessorKey: "remarks",
      meta: {
        type: "text",
      },
      cell: BaseCell,
    },
    // {
    //   id: "edit",
    //   cell: EditCell,
    // },
  ]);

  const handleProjectCodeChange = (e) => {
    const selected = projectList.find(
      ({ project_code }) => project_code === e.target.value
    );
    console.log(selected);
    setSelectedProject(selected);
  };

  const handleMilestoneChange = (e) => {
    console.log(taskData);
    const selected = taskData.find(({ taskid }) => {
      return e.target.value === taskid;
    });
    console.log(selected);
    setSelectedMilestone(selected.key_milestone);
  };

  return (
    <div>
      {showPrr ? (
        <></>
      ) : (
        <form
          id="listItem"
          className="grid grid-cols-4 gap-6 m-6"
          onSubmit={addToList}
        >
          <div className="flex flex-wrap">
            <label htmlFor="project_code" className="w-2/3">
              Project Code:
            </label>
            {/* <input
          name="projectNumber"
          type="text"
          className="rounded-xl w-4/5"
        /> */}
            <select
              onChange={handleProjectCodeChange}
              name="project_code"
              className="rounded-xl w-4/5"
              required
            >
              <option value="">Select Code</option>
              {projectList.map((project) => {
                return (
                  <option value={project.project_code}>
                    {project.project_code}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="project_name" className="w-2/3">
              Project Name:
            </label>
            <input
              value={selectedProject?.project_name}
              name="project_name"
              type="text"
              className="rounded-xl w-4/5"
              // disabled
              required
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="key_milestone" className="w-2/3">
              Milestone:
            </label>
            {/* <input
          name="key_milestone"
          type="text"
          className="rounded-xl w-4/5"
        /> */}
            <select
              onChange={handleMilestoneChange}
              name="key_milestone"
              className="rounded-xl w-4/5"
              required
            >
              <option value={""}>Select Task</option>
              {taskData.map((task) => {
                return (
                  <option value={task.taskid}>{task.key_milestone}</option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="targetDate" className="w-2/3">
              Target Date:
            </label>
            <input
              name="targetDate"
              type="date"
              className="rounded-xl w-4/5"
              required
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="revisedDate" className="w-2/3">
              Revised Date:
            </label>
            <input
              name="revisedDate"
              type="date"
              className="rounded-xl w-4/5"
              required
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="delayedDays" className="w-2/3">
              Number Of Days Delayed:
            </label>
            <input
              name="delayedDays"
              type="number"
              className="rounded-xl w-4/5"
              required
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="delayReason" className="w-2/3">
              Reason For Delay:
            </label>
            <input
              name="delayReason"
              type="text"
              className="rounded-xl w-4/5"
              required
            />
          </div>
          <div className="flex flex-wrap">
            <label htmlFor="remarks" className="w-2/3">
              Impacted Milestones / Recovery Plan:
            </label>
            <input
              name="remarks"
              type="text"
              className="rounded-xl w-4/5"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-teal-theme w-4/5 rounded-xl text-black"
          >
            Add To List
          </Button>
        </form>
      )}
      <div className="max-w-[100%] overflow-x-auto">
        <DataTable
          tData={showPrr ? prrInfo.prr_list : tableList}
          tColumns={taskColumns}
          pagination={false}
          search={false}
        />
      </div>
      <form
        id="prrDetails"
        className="grid grid-cols-3 gap-6 m-6"
        onSubmit={addPrr}
      >
        <div className="flex flex-wrap">
          <label htmlFor="initiatedBy" className="w-2/3">
            Initiated By:
          </label>
          <input
            name="initiatedBy"
            type="text"
            className="rounded-xl w-4/5"
            required
            value={prrInfo?.prr_details?.initiatedBy}
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="name_sign" className="w-2/3">
            Name & Sign:
          </label>
          <input
            name="name_sign"
            type="text"
            className="rounded-xl w-4/5"
            required
            value={prrInfo?.prr_details?.name_sign}
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="department" className="w-2/3">
            Department:
          </label>
          <input
            name="department"
            type="text"
            className="rounded-xl w-4/5"
            required
            value={prrInfo?.prr_details?.department}
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="approvedBy" className="w-2/3">
            Approved By:
          </label>
          <input
            name="approvedBy"
            type="text"
            className="rounded-xl w-4/5"
            required
            value={prrInfo?.prr_details?.approvedBy}
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="departmentHead" className="w-2/3">
            Department Head:
          </label>
          <input
            name="departmentHead"
            type="text"
            className="rounded-xl w-4/5"
            required
            value={prrInfo?.prr_details?.departmentHead}
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="consolidatedHead" className="w-2/3">
            Consolidated Head:
          </label>
          <input
            name="consolidatedHead"
            type="text"
            className="rounded-xl w-4/5"
            required
            value={prrInfo?.prr_details?.consolidatedHead}
          />
        </div>
        {showPrr ? (
          <></>
        ) : (
          <Button
            type="submit"
            className="bg-teal-theme w-4/5 rounded-xl text-black"
          >
            Generate PRR
          </Button>
        )}
      </form>
    </div>
  );
}

export default PrrForm;
