import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ADD_TO_INBOX, TASK_URL } from "@/URL";
import ExpandableSubtaskTable from "@/Components/ExpandableSubtaskTable";
// import { Button } from "./ui/button";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import ExpandableEditableTable from "@/Components/ExapndableEditableTable";
import CrudExpandableTable from "@/Components/CrudExpandableTable";
import { EditTable } from "@/Components/EditTable";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { format } from "date-fns";
import ExampleTable from "@/Components/ExapndableEditableTable";
import GeneralTaskAddition from "@/Components/GeneralTaskAddition";
function TaskForm_IT({
  setProjectTaskDetails,
  projectTaskDetails,
  setActiveTab,
  generalTeam,
  draftId,
  projectDetails,
  projectSubtaskDetails,
  setProjectSubtaskDetails,
}) {
  // /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  //   const taskEntryColumns = useMemo(() => [
  //     {
  //       header: "Name",
  //       accessorKey: "task_name",
  //       meta: {
  //         type: "text",
  //         editable: false,
  //       },
  //     },
  //     {
  //       header: "Stage",
  //       accessorKey: "stage",
  //       meta: {
  //         type: "text",
  //         editable: false,
  //       },
  //     },
  //     {
  //       header: "Milestone",
  //       accessorKey: "key_milestone",
  //       meta: {
  //         type: "text",
  //         editable: false,
  //       },
  //     },
  //     {
  //       header: "Plan Date",
  //       accessorKey: "plan_date",
  //       meta: {
  //         type: "date",
  //         editable: true,
  //       },
  //       cell: ({ getValue }) => {
  //         const dateValue = new Date(getValue());
  //         if (!isNaN(dateValue)) {
  //           return format(new Date(dateValue), "dd/MM/yyyy");
  //         }
  //         return "";
  //       },
  //     },
  //     {
  //       header: "End Date",
  //       accessorKey: "actual_date",
  //       meta: {
  //         type: "date",
  //         editable: true,
  //       },
  //       cell: ({ getValue }) => {
  //         const dateValue = new Date(getValue());
  //         if (!isNaN(dateValue)) {
  //           return format(new Date(dateValue), "dd/MM/yyyy");
  //         }
  //         return "";
  //       },
  //     },
  //     // {
  //     //   header: "Revised Date",
  //     //   accessorKey: "revised_date",
  //     //   meta: {
  //     //     type: "date",
  //     //   },
  //     // },
  //     {
  //       header: "Status",
  //       accessorKey: "status",
  //       meta: {
  //         type: "select",
  //         options: [
  //           { value: "done", label: "Done" },
  //           { value: "pending", label: "Pending" },
  //           { value: "not_applicable", label: "Not Applicable" },
  //           { value: "not_required", label: "Not Required" },
  //         ],
  //         editable: true,
  //       },
  //       //   cell: BaseCell,
  //     },
  //     // {
  //     //   header: "Duration",
  //     //   accessorKey: "duration",
  //     //   meta: {
  //     //     type: "number",
  //     //     editable: true,
  //     //   },
  //     // },

  //     // {
  //     //   header: "Gap",
  //     //   accessorKey: "gap",
  //     //   meta: {
  //     //     type: "number",
  //     //   },
  //     // },
  //     // {
  //     //   accessorKey: "actions",
  //     //   header: () => <div className="text-right">Actions</div>,
  //     //   cell: ({ row }) => (
  //     //     <div className="flex justify-end gap-2">
  //     //       <Button
  //     //         variant="ghost"
  //     //         size="icon"
  //     //         onClick={() => toggleEdit(row.original.id)}
  //     //       >
  //     //         {editingRows.has(row.original.id) ? (
  //     //           <Save className="h-4 w-4" />
  //     //         ) : (
  //     //           <Edit className="h-4 w-4" />
  //     //         )}
  //     //       </Button>
  //     //       <Button
  //     //         variant="ghost"
  //     //         size="icon"
  //     //         onClick={() => toggleExpand(row.original.id)}
  //     //       >
  //     //         {expandedRows.has(row.original.id) ? (
  //     //           <ChevronUp className="h-4 w-4" />
  //     //         ) : (
  //     //           <ChevronDown className="h-4 w-4" />
  //     //         )}
  //     //       </Button>
  //     //     </div>
  //     //   ),
  //     // },
  //   ]);
  // const columnHelper = createColumnHelper();

  // const columns = useMemo(
  //   () => [
  //     columnHelper.accessor("name", {
  //       header: "Name",
  //       cell: ({ row, getValue }) => {
  //         const value = getValue();
  //         return editingRows.has(row.original.id) ? (
  //           <Input
  //             value={value}
  //             onChange={(e) =>
  //               handleCellChange(row.original.id, "name", e.target.value)
  //             }
  //             className="w-full"
  //           />
  //         ) : (
  //           value
  //         );
  //       },
  //     }),
  //     columnHelper.accessor("role", {
  //       header: "Role",
  //       cell: ({ row, getValue }) => {
  //         const value = getValue();
  //         return editingRows.has(row.original.id) ? (
  //           <Input
  //             value={value}
  //             onChange={(e) =>
  //               handleCellChange(row.original.id, "role", e.target.value)
  //             }
  //             className="w-full"
  //           />
  //         ) : (
  //           value
  //         );
  //       },
  //     }),
  //     columnHelper.accessor("department", {
  //       header: "Department",
  //       cell: ({ row, getValue }) => {
  //         const value = getValue();
  //         return editingRows.has(row.original.id) ? (
  //           <Input
  //             value={value}
  //             onChange={(e) =>
  //               handleCellChange(row.original.id, "department", e.target.value)
  //             }
  //             className="w-full"
  //           />
  //         ) : (
  //           value
  //         );
  //       },
  //     }),
  //     columnHelper.display({
  //       id: "actions",
  //       header: () => <div className="text-right">Actions</div>,
  //       cell: ({ row }) => (
  //         <div className="flex justify-end gap-2">
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             onClick={() => toggleEdit(row.original.id)}
  //           >
  //             {editingRows.has(row.original.id) ? (
  //               <Save className="h-4 w-4" />
  //             ) : (
  //               <Edit className="h-4 w-4" />
  //             )}
  //           </Button>
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             onClick={() => toggleExpand(row.original.id)}
  //           >
  //             {expandedRows.has(row.original.id) ? (
  //               <ChevronUp className="h-4 w-4" />
  //             ) : (
  //               <ChevronDown className="h-4 w-4" />
  //             )}
  //           </Button>
  //         </div>
  //       ),
  //     }),
  //   ],
  //   []
  // );

  // const taskExpandedContent = (rowData, isEditing, handleCellChange) => (
  //   <div className="p-4">
  //     <div className="grid grid-cols-1 gap-4">
  //       <div>
  //         <p className="font-medium mb-1">Task Description</p>
  //         {isEditing ? (
  //           <Textarea
  //             value={rowData.details?.description || ""}
  //             onChange={(e) =>
  //               handleCellChange(
  //                 rowData.id,
  //                 "details.description",
  //                 e.target.value
  //               )
  //             }
  //             className="w-full"
  //             placeholder="Enter task description"
  //           />
  //         ) : (
  //           rowData.details?.description || (
  //             <span className="text-muted-foreground italic">
  //               No description available
  //             </span>
  //           )
  //         )}
  //       </div>

  //       <div>
  //         <p className="font-medium mb-1">Dependencies</p>
  //         {isEditing ? (
  //           <Textarea
  //             value={rowData.details?.dependencies || ""}
  //             onChange={(e) =>
  //               handleCellChange(
  //                 rowData.id,
  //                 "details.dependencies",
  //                 e.target.value
  //               )
  //             }
  //             className="w-full"
  //             placeholder="Enter task dependencies"
  //           />
  //         ) : (
  //           rowData.details?.dependencies || (
  //             <span className="text-muted-foreground italic">
  //               No dependencies defined
  //             </span>
  //           )
  //         )}
  //       </div>

  //       <div>
  //         <p className="font-medium mb-1">Notes</p>
  //         {isEditing ? (
  //           <Textarea
  //             value={rowData.details?.notes || ""}
  //             onChange={(e) =>
  //               handleCellChange(rowData.id, "details.notes", e.target.value)
  //             }
  //             className="w-full"
  //             placeholder="Add any notes about this task"
  //           />
  //         ) : (
  //           rowData.details?.notes || (
  //             <span className="text-muted-foreground italic">
  //               No notes available
  //             </span>
  //           )
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  const [taskData, setTaskData] = useState([...projectTaskDetails]);
  console.log(projectSubtaskDetails)
  const [subtaskData,setSubtaskData] = useState([...projectSubtaskDetails]);
  //   [
  //   {
  //     id: "1",
  //     task_name: "Complete project proposal",
  //     status: "In Progress",
  //     priority: "High",
  //     plan_date: "2025-03-01",
  //     actual_date: "2025-03-05",
  //     assignee: "John Doe",
  //     details:
  //       "This task involves creating a comprehensive project proposal document with budget estimates and timeline.",
  //   },
  //   {
  //     id: "2",
  //     task_name: "Design UI components",
  //     status: "To Do",
  //     priority: "Medium",
  //     plan_date: "2025-03-05",
  //     actual_date: "",
  //     assignee: "Jane Smith",
  //     details:
  //       "Create all necessary UI components according to the provided design system guidelines.",
  //   },
  //   {
  //     id: "3",
  //     task_name: "Review code changes",
  //     status: "Completed",
  //     priority: "Low",
  //     plan_date: "2025-02-28",
  //     actual_date: "2025-02-28",
  //     assignee: "Mike Johnson",
  //     details:
  //       "Review pull requests and provide feedback on code quality and performance.",
  //   },
  // ]

  const handleSubmitTasks = () => {
    console.log(taskData);
    setProjectTaskDetails(() => [...taskData]);
    setProjectSubtaskDetails(()=>[...subtaskData]);
    alert("Project tasks are saved");
    setActiveTab("review_details");
    // addTasksToDraft(taskData);
  };
  // const addTasksToDraft = async (taskData) => {
  //   try {
  //     const response = await axios.post(ADD_TO_INBOX, {
  //       project: projectDetails,
  //       tasks: taskData,
  //       teamList: generalTeam,
  //       step: "2",
  //       draft_id: draftId,
  //       flag: "create",
  //     });
  //     console.log(response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    console.log(draftId);
  }, [draftId]);

  return (
    <div className="flex-col">
      {/* <CrudExpandableTable/> */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl ml-4">Project Tasks</div>
        <Button
          className="rounded-xl w-1/5 mb-4 mr-6 bg-teal-theme"
          onClick={handleSubmitTasks}
        >
          Save All Tasks
        </Button>
      </div>
      {/* <ExpandableEditableTable
        setTaskData={setTaskData}
        taskData={taskData}
        generalTeam={generalTeam}
      /> */}
      <GeneralTaskAddition
        setTaskData={setTaskData}
        setSubtaskData={setSubtaskData}
        assigneeOptions={generalTeam}
        projectId={draftId}
        projectDetails={projectDetails}
        taskData={projectTaskDetails}
        subtaskData={projectSubtaskDetails}
      />
      {/* <ExpandableSubtaskTable
         setTaskData={setTaskData}
         taskData={taskData}
         generalTeam={generalTeam}
      /> */}
      {/* {console.log(projectTaskDetails)} */}
      {/* <ExampleTable/> */}
    </div>
  );
}

export default TaskForm_IT;
