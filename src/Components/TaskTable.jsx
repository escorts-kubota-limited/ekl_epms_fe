import { DataTable, BaseCell } from "@/Components/DataTable";
import React, { useMemo, useState, useEffect } from "react";
import { format, formatDate } from "date-fns";
import { EditTable } from "./EditTable";
import { EditableTaskListTable } from "./EditableTaskListTable";

function TaskTable({
  data,
  template,
  project_creation = false,
  setUpdateFlag,
  setTaskDetails,
  taskDetails,
  forProjectDetails = false,
  forKMC = false,
  editFlag = true,
}) {
  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const majorTaskColumns_project_creation = useMemo(() => [
    {
      header: "Phase",
      accessorKey: "task_phase",
      meta: {
        type: "text",
      },
    },
    {
      header: "Stage",
      accessorKey: "stage",
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
    },
    {
      header: "Plan Date",
      accessorKey: "plan_date",
      meta: {
        type: "date",
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue());
        if (!isNaN(dateValue)) {
          return format(new Date(dateValue), "dd/MM/yyyy");
        }
        return "";
      },
    },
    {
      header: "End Date",
      accessorKey: "actual_date",
      meta: {
        type: "date",
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue());
        if (!isNaN(dateValue)) {
          return format(new Date(dateValue), "dd/MM/yyyy");
        }
        return "";
      },
    },
    // {
    //   header: "Revised Date",
    //   accessorKey: "revised_date",
    //   meta: {
    //     type: "date",
    //   },
    // },
    {
      header: "Status",
      accessorKey: "status",
      // meta: {
      //   type: "select",
      //   options: [
      //     { value: "done", label: "Done" },
      //     { value: "pending", label: "Pending" },
      //     { value: "not_applicable", label: "Not Applicable" },
      //     { value: "not_required", label: "Not Required" },
      //   ],
      // },
      cell: BaseCell,
    },
    {
      header: "Duration",
      accessorKey: "duration",
      meta: {
        type: "number",
      },
    },
    // {
    //   header: "Gap",
    //   accessorKey: "gap",
    //   meta: {
    //     type: "number",
    //   },
    // },
  ]);
  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const majorTaskColumns = useMemo(() => [
    {
      header: "Phase",
      accessorKey: "task_phase",
      meta: {
        type: "text",
        editable: false,
      },
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
        editable: true && project_creation,
      },
      cell: ({ getValue }) => {
        const rawValue = getValue();

        // Check if value is empty or invalid
        if (!rawValue) return "";

        const dateValue = new Date(rawValue);

        // Guard against invalid date
        if (isNaN(dateValue.getTime())) return "";

        return format(dateValue, "dd/MMM/yy");
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
        const rawValue = getValue();

        // Check if value is empty or invalid
        if (!rawValue) return "";

        const dateValue = new Date(rawValue);

        // Guard against invalid date
        if (isNaN(dateValue.getTime())) return "";

        return format(dateValue, "dd/MMM/yy");
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: {
        type: "select",
        options: [
          { value: "done", label: "Done" },
          { value: "pending", label: "Pending" },
          { value: "not_applicable", label: "Not Applicable" },
          { value: "not_required", label: "Not Required" },
        ],
        editable: true,
      },
      cell: BaseCell,
    },
    {
      header: "Duration",
      accessorKey: "duration",
      meta: {
        type: "number",
        editable: false,
      },
    },
    {
      header: "Responsibility",
      accessorKey: "responsibility",
      meta: {
        type: "text",
        editable: false,
      },
      cell: BaseCell,
    },
    {
      header: "Delay",
      accessorKey: "gap",
      meta: {
        type: "text",
        editable: false,
      },
      cell: BaseCell,
    },
    // {
    //   header: "Gap",
    //   accessorKey: "gap",
    //   meta: {
    //     type: "number",
    //   },
    // },
  ]);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const minorTaskColumns_project_creation = useMemo(() => [
    {
      header: "Stage",
      accessorKey: "stage",
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
    },
    {
      header: "Plan Date",
      accessorKey: "plan_date",
      meta: {
        type: "date",
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue());
        if (!isNaN(dateValue)) {
          return format(new Date(dateValue), "dd/MM/yyyy");
        }
        return "";
      },
    },
    {
      header: "End Date",
      accessorKey: "actual_date",
      meta: {
        type: "date",
      },
      cell: ({ getValue }) => {
        const dateValue = new Date(getValue());
        if (!isNaN(dateValue)) {
          return format(new Date(dateValue), "dd/MM/yyyy");
        }
        return "";
      },
    },
    // {
    //   header: "Revised Date",
    //   accessorKey: "revised_date",
    //   meta: {
    //     type: "date",
    //   },
    //   cell: BaseCell,
    // },
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   meta: {
    //     type: "select",
    //     options: [
    //       { value: "done", label: "Done" },
    //       { value: "pending", label: "Pending" },
    //       { value: "not_applicable", label: "Not Applicable" },
    //       { value: "not_required", label: "Not Required" },
    //     ],
    //   },
    //   cell: BaseCell,
    // },
    // {
    {
      header: "Duration",
      accessorKey: "duration",
      meta: {
        type: "number",
      },
    },
    // {
    //   header: "Gap",
    //   accessorKey: "gap",
    //   meta: {
    //     type: "number",
    //   },
    // },
  ]);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const minorTaskColumns = useMemo(() => [
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
        editable: true && project_creation,
      },
      cell: ({ getValue }) => {
        const rawValue = getValue();

        // Check if value is empty or invalid
        if (!rawValue) return "";

        const dateValue = new Date(rawValue);

        // Guard against invalid date
        if (isNaN(dateValue.getTime())) return "";

        return format(dateValue, "dd/MMM/yy");
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
        const rawValue = getValue();

        // Check if value is empty or invalid
        if (!rawValue) return "";

        const dateValue = new Date(rawValue);

        // Guard against invalid date
        if (isNaN(dateValue.getTime())) return "";

        return format(dateValue, "dd/MMM/yy");
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      meta: {
        type: "select",
        options: [
          { value: "done", label: "Done" },
          { value: "pending", label: "Pending" },
          { value: "not_applicable", label: "Not Applicable" },
          { value: "not_required", label: "Not Required" },
        ],
        editable: true,
      },
      cell: ({ getValue, row }) => {
        const statusValue = getValue();
        const rowData = row.original;
        console.log(rowData.stage)
        if(rowData?.stage==="No. of Parts (UPL)"){
          return ""
        }
        else return statusValue
      },
    },
    {
      header: "Responsibility",
      accessorKey: "responsibility",
      meta: {
        type: "text",
        editable: false,
      },
      cell: BaseCell,
    },
    {
      header: "Duration",
      accessorKey: "duration",
      meta: {
        type: "number",
        editable: false,
      },
    },
    {
      header: "Delay",
      accessorKey: "gap",
      meta: {
        type: "text",
        editable: false,
      },
      cell: BaseCell,
    },
    {
      header: "",
      accessorKey: "upl_number",
      meta: {
        type: "text",
        editable: false,
      },
      cell: BaseCell,

    }
    // {
    //   header: "User",
    //   accessorKey: "user_responsibility_name",
    //   meta: {
    //     type: "text",
    //     editable: false,
    //   },
    // },
  ]);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/

  console.log(data);
  const generalTaskColumns = useMemo(() => [
    {
      header: "Task Name",
      accessorKey: "task_name",
      meta: {
        type: "text",
        editable: true,
      },
    },
    {
      header: "Start Date",
      accessorKey: "plan_date",
      meta: {
        type: "text",
        editable: false,
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
      header: "End Date",
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
      header: "Status",
      accessorKey: "status",
      meta: {
        type: "select",
        options: [
          { value: "done", label: "Done" },
          { value: "pending", label: "Pending" },
          { value: "not_applicable", label: "Not Applicable" },
          { value: "not_required", label: "Not Required" },
        ],
        editable: true,
      },
      // cell: BaseCell,
    },
    {
      header: "Priority",
      accessorKey: "task_priority",
      meta: {
        type: "select",
        options: [
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        editable: true,
      },
    },
    {
      header: "Assigned To",
      accessorKey: "user_responsibility_name",
      meta: {
        type: "text",
        editable: true,
      },
      // cell: BaseCell,
    },
  ]);

  return (
    <>
      {project_creation ? (
        <div>
          {/* {console.log(forKMC)} */}
          <DataTable
            tData={data}
            tColumns={
              // template === "Major" ? majorTaskColumns : minorTaskColumns
              forKMC
                ? template === "Major"
                  ? majorTaskColumns
                  : minorTaskColumns
                : generalTaskColumns
            }
          />
        </div>
      ) : (
        <div>
          {console.log(data)}
          {/* <EditTable
            editable={true}
            tData={data}
            tColumns={
              forKMC
                ? template === "Major"
                  ? majorTaskColumns
                  : minorTaskColumns
                : generalTaskColumns
            }
            onSave={(updatedData) => {
              console.log("Custom save handler:", updatedData);
              // Add custom logic here
              // saveToAPI(updatedData);
            }}
            setUpdateFlag={setUpdateFlag}
            setTaskDetails={setTaskDetails}
            taskData={taskDetails}
          /> */}
          <EditableTaskListTable
            tColumns={
              forKMC
                ? template === "Major"
                  ? majorTaskColumns
                  : minorTaskColumns
                : generalTaskColumns
            }
            tData={data}
            setTaskData={setTaskDetails}
            editFlag={editFlag && !project_creation}
            setUpdateFlag={setUpdateFlag}
          />
        </div>
      )}
    </>
  );
}

export default TaskTable;
