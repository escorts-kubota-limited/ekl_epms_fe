// import { useEffect, useMemo, useState } from "react";
// import mTaskData from "../../MOCK_TASKS.json";
// import { DataTable, EditCell, BaseCell } from "@/Components/DataTable";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { GET_PROJECT_DATA_URL, TASK_URL } from "@/URL";
// import { useAsyncError } from "react-router-dom";

// // export const handleSaveTasks = (e) => {
// //   e.preventDefault();
// //   const taskFormData = new FormData(e.currentTarget);
// //   console.log("##"+taskFormData);
// // };

// export const MajorProjectTaskData = ({
//   saveTasks,
//   onEdit = false,
//   projectDetails = {},
// }) => {
//   //const taskData = useMemo(() => mTaskData, []);
//   const [taskData, setTaskData] = useState([]);
//   const [taskStatus, setTaskStatus] = useState();
//   const [taskPlanDate, setTaskPlanDate] = useState(null);
//   const [taskRevisedDate, setTaskRevisedDate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [onSave, setOnSave] = useState(false);

//   // const computedTaskData = useMemo(() => mTaskData, []);

//   // console.log(computedTaskData);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //console.log(projectCode);
//         const response =
//           projectDetails.project_id === null
//             ? await axios.get(`${TASK_URL}major`)
//             : await axios.post(
//                 `${GET_PROJECT_DATA_URL}/${projectDetails.project_id}`
//               );
//         const resData =
//           projectDetails.project_code === null
//             ? response.data
//             : response.data.tasks;
//         console.log(resData);
//         setTaskData(resData);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   /**@type import('@tanstack/react-table').ColumnDef@<any>*/
//   const taskColumns = useMemo(() => [
//     {
//       header: "Phase",
//       accessorKey: "task_phase",
//       meta: {
//         type: "text",
//       },
//     },
//     {
//       header: "Stage",
//       accessorKey: "stage",
//       meta: {
//         type: "text",
//       },
//     },
//     {
//       header: "Milestone",
//       accessorKey: "key_milestone",
//       meta: {
//         type: "text",
//       },
//     },
//     {
//       header: "Plan Date",
//       accessorKey: "planDate",
//       meta: {
//         type: "date",
//       },
//       cell: BaseCell,
//     },
//     {
//       header: "Revised Date",
//       accessorKey: "revisedDate",
//       meta: {
//         type: "date",
//       },
//       cell: BaseCell,
//     },
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
//       },
//       cell: BaseCell,
//     },
//     {
//       header: "Responsibility",
//       accessorKey: "responsibility",
//       meta: {
//         type: "text",
//       },
//       cell: BaseCell,
//     },
//     // {
//     //   id: "edit",
//     //   cell: EditCell,
//     // },
//   ]);

//   // const handleStatusChange = (e) => {
//   //   setTaskStatus(e.target.value);
//   // };

//   // const handlePlanDateChange = (e) => {
//   //   setTaskPlanDate(e.target.value);
//   // };
//   // const handleRevisedDateChange = (e) => {
//   //   setTaskRevisedDate(e.target.value);
//   // };

//   const onAction = () => {
//     console.log("##Major");
//   };

//   // const handleSaveTasks=(e)=>{
//   //   e.preventDefault();
//   //   const taskFormData = new FormData(e.currentTarget);
//   //   console.log(taskFormData);
//   // }

//   return (
//     <div className="p-5 container mx-auto">
//       {onEdit ? (
//         <div>
//           <div className="grid grid-cols-10 m-2 gap-2">
//             {/* <div>S.No:</div> */}
//             <div>Phase</div>
//             <div>Stage</div>
//             <div className="col-span-2">Milestone</div>
//             <div className="col-span-3 grid grid-cols-2">
//               <div>Plan Date</div>
//               <div>Revised Date</div>
//             </div>
//             <div className="col-span-3 grid grid-cols-2">
//               <div>Status</div>
//               <div className="text-center">Responsibility</div>
//             </div>
//           </div>
//           <form
//             action={onAction}
//             id={projectDetails.project_id}
//             onSubmit={saveTasks}
//           >
//             {taskData.map((rowData, index) => {
//               return (
//                 <>
//                   <div className="grid grid-cols-10 m-2 gap-2 border-2 rounded-full items-center p-4">
//                     <input
//                       hidden
//                       name="task_number"
//                       value={rowData.task_number}
//                     />
//                     <div>{rowData.task_phase}</div>
//                     <div>{rowData.stage}</div>
//                     <p className="col-span-2">{rowData.key_milestone}</p>
//                     <div className="col-span-3 grid grid-cols-2 gap-2">
//                       <input
//                         type="date"
//                         className="rounded-full"
//                         name={"plan_date_" + rowData.task_number}
//                         //value={rowData.plan_date}
//                         //onChange={handlePlanDateChange}
//                       />
//                       <input
//                         type="date"
//                         className="rounded-full"
//                         name={"revised_date_" + rowData.task_number}
//                         //value={rowData.revised_date}
//                         //onChange={handleRevisedDateChange}
//                       />
//                     </div>
//                     <div className="col-span-3 grid grid-cols-[70%_30%] gap-1">
//                       <select
//                         name={"status_" + rowData.task_number}
//                         id="r"
//                         className="rounded-full w-4/5"
//                         //value={rowData.status}
//                         //onChange={handleStatusChange}
//                       >
//                         <option name="done">Done</option>
//                         <option name="pending">Pending</option>
//                         <option name="not_applicable">Not Applicable</option>
//                         <option name="not_required">Not Required</option>
//                       </select>
//                       <div className="content-center">
//                         {rowData.responsibility}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               );
//             })}
//           </form>
//         </div>
//       ) : (
//         <DataTable tData={taskData} tColumns={taskColumns} />
//       )}
//     </div>
//   );
// };
