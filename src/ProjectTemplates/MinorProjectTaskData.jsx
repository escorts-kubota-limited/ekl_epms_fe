// import { useMemo, useState, useEffect } from "react";
// import mTaskData from "../../MOCK_TASKS.json";
// import { DataTable, BaseCell, EditCell } from "@/Components/DataTable";
// import axios from "axios";
// import { GET_PROJECT_DATA_URL, TASK_URL } from "@/URL";

// export const MinorProjectTaskData = ({
//   saveTasks,
//   onEdit = false,
//   projectDetails = {},
// }) => {
//   //const taskData = useMemo(() => mTaskData, []);
//   const [taskData, setTaskData] = useState([]);
//   const [taskStatus, setTaskStatus] = useState();
//   const [formData, setFormData] = useState({
//     plan_date: "",
//     revised_date: "",
//     status: "",
//   });

//   const [taskPlanDate, setTaskPlanDate] = useState(null);
//   const [taskRevisedDate, setTaskRevisedDate] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //console.log(projectDetails+"######");
//         const response =
//           projectDetails.project_code === null
//             ? await axios.get(`${TASK_URL}minor`)
//             : await axios.post(
//                 `${GET_PROJECT_DATA_URL}/${projectDetails.project_id}`
//               );
//         const resData =
//           projectDetails.project_code === null
//             ? response.data
//             : response.data.tasks;
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

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get(`${TASK_URL}minor`);
//   //       const resData = Array.isArray(response.data)
//   //         ? response.data
//   //         : response.data.results || [];

//   //       setTaskData(resData);
//   //       console.log("##");
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

//   const onAction = () => {
//     console.log("##Minor");
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     saveTasks(FormData);
//   };
//   return (
//     <div className="p-5 container mx-auto">
//       {onEdit ? (
//         <div>
//           <div className="grid grid-cols-10 m-2 gap-2 ">
//             <div className="col-span-2">Stage</div>
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
//             onSubmit={handleSubmit}
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
//                     <div className="col-span-2">{rowData.stage}</div>
//                     <p className="col-span-2">{rowData.key_milestone}</p>
//                     <div className="col-span-3 grid grid-cols-2 gap-2">
//                       <input
//                         type="date"
//                         className="rounded-full"
//                         name={"plan_date_" + rowData.task_number}
//                         value={rowData.plan_date}
//                         onChange={handleInputChange}
//                       />
//                       <input
//                         type="date"
//                         className="rounded-full"
//                         name={"revised_date_" + rowData.task_number}
//                         value={rowData.revised_date}
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="col-span-3 grid grid-cols-[70%_30%] gap-1">
//                       <select
//                         name={"status_" + rowData.task_number}
//                         id=""
//                         className="rounded-full w-4/5"
//                         value={rowData.status}
//                         onChange={handleInputChange}
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
