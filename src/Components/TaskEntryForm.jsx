import { useState, useEffect, useMemo } from "react";
import { EditTable } from "./EditTable";
import axios from "axios";
import { ADD_DRAFT, TASK_URL } from "@/URL";
import { Button } from "./ui/button";
import ExpandableEditableTable from "./ExapndableEditableTable";
import { EditableTaskListTable } from "./EditableTaskListTable";

function TaskEntryForm({
  projectTemplate,
  setProjectTaskDetails,
  setActiveTab,
  userList,
  projectDetails,
  projectTaskDetails,
  teamList,
  draftId,
  responsibilityList,
}) {
  console.log(projectTemplate);
  const [taskData, setTaskData] = useState([]);
  let responsibilityOptionList = [];
  const [resOptionList, setResOptionList] = useState([]);

  useEffect(() => {
    if (projectTaskDetails.length > 0) {
      console.log(projectTaskDetails);
      setTaskData(projectTaskDetails);
      console.log(taskData + "already saved tasks");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${TASK_URL}${projectTemplate}`);
          //   const resData = Array.isArray(response.data)
          //     ? response.data
          //     : [response.data];
          setTaskData(() => [...response.data]);
          // console.log(response);
          //   console.log(taskData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
    responsibilityOptionList = convertResponsibilities(responsibilityList);
    console.log(responsibilityOptionList);
    setResOptionList(responsibilityOptionList);
  }, []);



  function convertResponsibilities(data) {
    return data
      .filter((item) => item.responsibility.trim() !== "") 
      .map((item) => {
        const trimmedValue = item.responsibility.trim();
        return {
          value: item.responsibility,
          label: trimmedValue,
        };
      });
  }
  console.log(taskData);
  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const majorTaskColumns_project_creation = useMemo(() => [
    {
      header: "S.No",
      accessorKey: "task_number",
      meta: {
        type: "text",
        editable: false,
      },
      cell: () => {},
    },

    {
      header: "Phase",
      accessorKey: "task_phase",
      meta: {
        type: "text",
        editable: false,
      },
      cell: () => {},
    },
    {
      header: "Stage",
      accessorKey: "stage",
      meta: {
        type: "text",
        editable: false,
      },
      cell: () => {},
    },
    {
      header: "Milestone",
      accessorKey: "key_milestone",
      meta: {
        type: "text",
        editable: false,
      },
      cell: () => {},
    },
    {
      header: "Target Date",
      accessorKey: "plan_date",
      meta: {
        type: "date",
        editable: true,
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue());
        console.log(dateValue);
        if (!isNaN(dateValue)) {
          console.log(dateValue);
          return format(new Date(dateValue), "dd/MMM/yy");
        }
        return "";
      },
    },
    {
      header: "Actual Date",
      accessorKey: "actual_date",
      meta: {
        type: "date",
        editable: true,
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue());
        if (!isNaN(dateValue)) {
          return format(new Date(dateValue), "dd/MMM/yy");
        }
        return "";
      },
    },
    {
      header: "Responsibility",
      accessorKey: "responsibility",
      meta: {
        type: "select",
        editable: true,
        options: resOptionList,
      },
      cell: () => {},
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: {
        type: "select",
        options: [
          { value: "Done", label: "Done" },
          { value: "Pending", label: "Pending" },
          { value: "Not Applicable", label: "Not Applicable" },
          { value: "Not Required", label: "Not Required" },
        ],
        editable: true,
      },
      cell: () => {},
    },
    {
      header: "Duration",
      accessorKey: "duration",
      meta: {
        type: "number",
        editable: true,
      },
      cell: () => {},
    },
    {
      header: "Delay",
      accessorKey: "gap",
      meta: {
        type: "number",
        editable: true,
      },
      cell: () => {},
    },
  ]);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const minorTaskColumns_project_creation = useMemo(() => [
    {
      header: "S.No",
      accessorKey: "task_number",
      meta: {
        type: "text",
        editable: false,
      },
      // cell: () => {},
    },
    {
      header: "Stage",
      accessorKey: "stage",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "Milestone",
      accessorKey: "key_milestone",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "Target Date",
      accessorKey: "plan_date",
      meta: {
        type: "date",
        editable: true,
      },
      // cell: ({ getValue }) => {
      //   const dateValue = new Date(getValue());

      //   if (!isNaN(dateValue)) {
      //     return format(new Date(dateValue), "dd/MMM/yy");
      //   }
      //   return "";
      // },
    },
    {
      header: "Actual Date",
      accessorKey: "actual_date",
      meta: {
        type: "date",
        editable: true,
      },
      // cell: ({ getValue }) => {
      //   const dateValue = new Date(getValue());
      //   // console.log(dateValue)
      //   if (!isNaN(dateValue)) {
      //     return format(new Date(dateValue), "dd/MMM/yy");
      //   }
      //   return "";
      // },
    },
    {
      header: "Responsibility",
      accessorKey: "responsibility",
      meta: {
        type: "select",
        editable: true,
        options: resOptionList,
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: {
        type: "select",
        options: [
          { value: "Done", label: "Done" },
          { value: "Pending", label: "Pending" },
          { value: "Not Applicable", label: "Not Applicable" },
          { value: "Not Required", label: "Not Required" },
        ],
        editable: true,
      },
      //   cell: BaseCell,
    },
    // {
    {
      header: "Duration",
      accessorKey: "duration",
      meta: {
        type: "number",
        editable: true,
      },
    },
    {
      header: "Delay",
      accessorKey: "gap",
      meta: {
        type: "number",
        editable: true,
      },
    },
  ]);

  const handleSubmitTasks = () => {
    console.log(taskData);
    setProjectTaskDetails(() => [...taskData]);
    addTasksToDraft(taskData);
    alert("Project tasks are saved");
    setActiveTab("review_details");
  };

  const addTasksToDraft = async (taskData) => {
    try {
      const response = await axios.post(ADD_DRAFT, {
        project: projectDetails,
        tasks: taskData,
        teamList: teamList,
        step: "2",
        draft_id: draftId,
        flag: "create",
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-col  -mt-4 w-full  overflow-x-auto">
      <div className="flex justify-end p-2">
        <Button
          type="submit"
          className="bg-teal-theme w-56 mt-2 ml-6 rounded-lg border-2 border-black text-black "
          onClick={handleSubmitTasks}
          //form="task_list"
        >
          Save Tasks
        </Button>
      </div>
      {/* <EditTable
        editable={true}
        tData={taskData}
        // setUpdateFlag={setUpdateFlag}
        onSave={(updatedData) => {
          console.log("Custom save handler:", updatedData);
          // Add custom logic here
          // saveToAPI(updatedData);
        }}
        taskData={taskData}
        setTaskDetails={setTaskData}
        tColumns={
          projectTemplate === "Major"
            ? majorTaskColumns_project_creation
            : minorTaskColumns_project_creation
        }
        forProjectAddition={true}
      /> */}
      <EditableTaskListTable
        tColumns={
          projectTemplate === "Major"
            ? majorTaskColumns_project_creation
            : minorTaskColumns_project_creation
        }
        tData={taskData}
        setTaskData={setTaskData}
        forProjectAddition={true}
      />

      {/* <ExpandableEditableTable
        // editable={true}
        // tData={taskData}
        // setUpdateFlag={setUpdateFlag}
        // onSave={(updatedData) => {
        //   console.log("Custom save handler:", updatedData);
        //   // Add custom logic here
        //   // saveToAPI(updatedData);
        // }}
        // kmcData={task}
        taskData={taskData}
        setTaskData={setTaskData}
        // tColumns={
        //   projectTemplate === "Major"
        //     ? majorTaskColumns_project_creation
        //     : minorTaskColumns_project_creation
        // }
        // forProjectAddition={true}
        forKMC={true}
      /> */}
    </div>
  );
}

export default TaskEntryForm;
