// import { useState } from "react";
// import {
//   PlusCircle,
//   Trash2,
//   Edit,
//   Check,
//   X,
//   ArrowRightCircle,
//   ArrowLeftCircle,
//   FileEdit,
//   ChevronRight,
//   ChevronDown
// } from "lucide-react";

// // Generate unique IDs for tasks and subtasks
// const generateId = () => Math.random().toString(36).substring(2, 9);

// export default function GeneralTaskAddition({ assigneeOptions = [] }) {
//   const [step, setStep] = useState(1);
//   const [tasks, setTasks] = useState([]);
//   const [subtasks, setSubtasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Not Started",
//   });
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [newSubtask, setNewSubtask] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     assignee: "",
//   });
//   const [isEditingTask, setIsEditingTask] = useState(null);
//   const [isEditingSubtask, setIsEditingSubtask] = useState(null);
//   const [editRowData, setEditRowData] = useState({});
//   const [expandedTasks, setExpandedTasks] = useState({});

//   const priorityOptions = ["Low", "Medium", "High", "Critical"];
//   const statusOptions = ["Not Started", "In Progress", "On Hold", "Completed"];

//   // Task table header definitions
//   const taskHeaders = [
//     { id: "title", label: "Task Title" },
//     { id: "description", label: "Description" },
//     { id: "priority", label: "Priority" },
//     { id: "status", label: "Status" },
//     { id: "actions", label: "Actions" },
//   ];

//   // Subtask table header definitions
//   const subtaskHeaders = [
//     { id: "title", label: "Subtask Title" },
//     { id: "description", label: "Description" },
//     { id: "dueDate", label: "Due Date" },
//     { id: "assignee", label: "Assignee" },
//     { id: "actions", label: "Actions" },
//   ];

//   // Task management functions
//   const addTask = () => {
//     if (!newTask.title.trim()) return;

//     const task = {
//       id: generateId(),
//       ...newTask,
//     };

//     setTasks([...tasks, task]);
//     setNewTask({
//       title: "",
//       description: "",
//       priority: "Medium",
//       status: "Not Started",
//     });
//   };

//   const removeTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//     setSubtasks(subtasks.filter((subtask) => subtask.parentTaskId !== id));

//     if (selectedTaskId === id) {
//       setSelectedTaskId(null);
//     }
//   };

//   const startEditingTask = (id) => {
//     const task = tasks.find((task) => task.id === id);
//     setEditRowData({ ...task });
//     setIsEditingTask(id);
//   };

//   const saveTaskEdit = (id) => {
//     setTasks(
//       tasks.map((task) => (task.id === id ? { ...task, ...editRowData } : task))
//     );
//     setIsEditingTask(null);
//     setEditRowData({});
//   };

//   const cancelTaskEdit = () => {
//     setIsEditingTask(null);
//     setEditRowData({});
//   };

//   // Subtask management functions
//   const addSubtask = () => {
//     if (!newSubtask.title.trim() || !selectedTaskId) return;

//     const subtask = {
//       id: generateId(),
//       parentTaskId: selectedTaskId,
//       ...newSubtask,
//     };

//     setSubtasks([...subtasks, subtask]);
//     setNewSubtask({ title: "", description: "", dueDate: "", assignee: "" });
//   };

//   const removeSubtask = (id) => {
//     setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
//   };

//   const startEditingSubtask = (id) => {
//     const subtask = subtasks.find((subtask) => subtask.id === id);
//     setEditRowData({ ...subtask });
//     setIsEditingSubtask(id);
//   };

//   const saveSubtaskEdit = (id) => {
//     setSubtasks(
//       subtasks.map((subtask) =>
//         subtask.id === id ? { ...subtask, ...editRowData } : subtask
//       )
//     );
//     setIsEditingSubtask(null);
//     setEditRowData({});
//   };

//   const cancelSubtaskEdit = () => {
//     setIsEditingSubtask(null);
//     setEditRowData({});
//   };

//   // Navigation functions
//   const goToNextStep = () => {
//     if (tasks.length === 0) {
//       alert("Please add at least one task before proceeding.");
//       return;
//     }
//     setStep(2);
//     if (tasks.length > 0 && !selectedTaskId) {
//       setSelectedTaskId(tasks[0].id);
//     }
//   };

//   const goToPreviousStep = () => {
//     setStep(1);
//   };

//   const selectTask = (id) => {
//     setSelectedTaskId(id);
//   };

//   // Get task by ID helper function
//   const getTaskById = (id) => {
//     return tasks.find((task) => task.id === id);
//   };

//   // Get subtask count by task ID
//   const getSubtaskCount = (taskId) => {
//     return subtasks.filter((subtask) => subtask.parentTaskId === taskId).length;
//   };

//   // Helper function to render task cell content
//   const renderTaskCell = (task, column) => {
//     const rowId = task.id;

//     if (column.id === "title") {
//       if (isEditingTask === rowId) {
//         return (
//           <input
//             value={editRowData.title || task.title}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, title: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           />
//         );
//       }
//       return task.title;
//     }

//     if (column.id === "description") {
//       if (isEditingTask === rowId) {
//         return (
//           <input
//             value={editRowData.description || task.description}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, description: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           />
//         );
//       }
//       return task.description;
//     }

//     if (column.id === "priority") {
//       if (isEditingTask === rowId) {
//         return (
//           <select
//             value={editRowData.priority || task.priority}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, priority: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           >
//             {priorityOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         );
//       }
//       return (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             task.priority === "Low"
//               ? "bg-blue-100 text-blue-800"
//               : task.priority === "Medium"
//               ? "bg-green-100 text-green-800"
//               : task.priority === "High"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {task.priority}
//         </span>
//       );
//     }

//     if (column.id === "status") {
//       if (isEditingTask === rowId) {
//         return (
//           <select
//             value={editRowData.status || task.status}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, status: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           >
//             {statusOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         );
//       }
//       return (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             task.status === "Not Started"
//               ? "bg-gray-100 text-gray-800"
//               : task.status === "In Progress"
//               ? "bg-blue-100 text-blue-800"
//               : task.status === "On Hold"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-green-100 text-green-800"
//           }`}
//         >
//           {task.status}
//         </span>
//       );
//     }

//     if (column.id === "actions") {
//       return isEditingTask === rowId ? (
//         <div className="flex gap-2">
//           <button
//             onClick={() => saveTaskEdit(rowId)}
//             className="p-1 text-green-600 hover:text-green-800"
//           >
//             <Check size={18} />
//           </button>
//           <button
//             onClick={cancelTaskEdit}
//             className="p-1 text-red-600 hover:text-red-800"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       ) : (
//         <div className="flex gap-2">
//           <button
//             onClick={() => startEditingTask(rowId)}
//             className="p-1 text-blue-600 hover:text-blue-800"
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             onClick={() => removeTask(rowId)}
//             className="p-1 text-red-600 hover:text-red-800"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       );
//     }

//     return null;
//   };

//   // Helper function to render subtask cell content
//   const renderSubtaskCell = (subtask, column) => {
//     const rowId = subtask.id;

//     if (column.id === "title") {
//       if (isEditingSubtask === rowId) {
//         return (
//           <input
//             value={editRowData.title || subtask.title}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, title: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           />
//         );
//       }
//       return subtask.title;
//     }

//     if (column.id === "description") {
//       if (isEditingSubtask === rowId) {
//         return (
//           <input
//             value={editRowData.description || subtask.description}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, description: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           />
//         );
//       }
//       return subtask.description;
//     }

//     if (column.id === "dueDate") {
//       if (isEditingSubtask === rowId) {
//         return (
//           <input
//             type="date"
//             value={editRowData.dueDate || subtask.dueDate}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, dueDate: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           />
//         );
//       }
//       return subtask.dueDate;
//     }

//     if (column.id === "assignee") {
//       if (isEditingSubtask === rowId) {
//         return (
//           <input
//             value={editRowData.assignee || subtask.assignee}
//             onChange={(e) =>
//               setEditRowData({ ...editRowData, assignee: e.target.value })
//             }
//             className="w-full p-1 border border-gray-300 rounded"
//           />
//         );
//       }
//       return subtask.assignee;
//     }

//     if (column.id === "actions") {
//       return isEditingSubtask === rowId ? (
//         <div className="flex gap-2">
//           <button
//             onClick={() => saveSubtaskEdit(rowId)}
//             className="p-1 text-green-600 hover:text-green-800"
//           >
//             <Check size={18} />
//           </button>
//           <button
//             onClick={cancelSubtaskEdit}
//             className="p-1 text-red-600 hover:text-red-800"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       ) : (
//         <div className="flex gap-2">
//           <button
//             onClick={() => startEditingSubtask(rowId)}
//             className="p-1 text-blue-600 hover:text-blue-800"
//           >
//             <Edit size={18} />
//           </button>
//           <button
//             onClick={() => removeSubtask(rowId)}
//             className="p-1 text-red-600 hover:text-red-800"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       );
//     }

//     return null;
//   };

//   // Filter subtasks for the selected task
//   const filteredSubtasks = selectedTaskId
//     ? subtasks.filter((subtask) => subtask.parentTaskId === selectedTaskId)
//     : [];

//   function toggleTaskExpansion(taskId) {
//     setExpandedTasks({
//       ...expandedTasks,
//       [taskId]: !expandedTasks[taskId],
//     });
//   }
//   const renderOverviewStep = () => (
//     <div className="space-y-4">
//       {/* <div className="flex justify-between items-center">
//         <h2 className="text-lg font-bold">Project Overview</h2>
//         <button
//           onClick={prevStep}
//           className="px-4 py-2 bg-gray-500 text-white rounded flex items-center"
//         >
//           <ArrowLeft className="h-4 w-4 mr-1" /> Back to Edit
//         </button>
//       </div> */}

//       <div className="space-y-4">
//         {tasks.map((task) => (
//           <div
//             key={task.id}
//             className="border rounded-lg shadow-sm overflow-hidden"
//           >
//             <div
//               className="bg-gray-50 p-4 border-b flex justify-between items-center cursor-pointer"
//               onClick={() => toggleTaskExpansion(task.id)}
//             >
//               <div className="flex items-center">
//                 {expandedTasks[task.id] ? (
//                   <ChevronDown className="h-5 w-5 mr-2 text-gray-500" />
//                 ) : (
//                   <ChevronRight className="h-5 w-5 mr-2 text-gray-500" />
//                 )}
//                 <div>
//                   <h3 className="text-lg font-medium">{task.title}</h3>
//                   <p className="text-sm text-gray-500">{task.description}</p>
//                 </div>
//               </div>
//               <div className="flex space-x-4 text-sm">
//                 <div className="flex flex-col items-center">
//                   <span className="text-gray-500">Status</span>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       task.status === "Completed"
//                         ? "bg-green-100 text-green-800"
//                         : task.status === "In Progress"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {task.status}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <span className="text-gray-500">Priority</span>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       task.priority === "High"
//                         ? "bg-red-100 text-red-800"
//                         : task.priority === "Medium"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-blue-100 text-blue-800"
//                     }`}
//                   >
//                     {task.priority}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <span className="text-gray-500">Assignee</span>
//                   <span>
//                     {assigneeOptions.find((a) => a.value === task.assignee)
//                       ?.label || task.assignee}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <span className="text-gray-500">Timeline</span>
//                   <span>
//                     {task.startDate} - {task.dueDate}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {expandedTasks[task.id] && (
//               <div className="p-4 bg-white">
//                 <h4 className="text-sm font-medium text-gray-500 mb-2">
//                   Subtasks
//                 </h4>
//                 {subtasks.filter((subtask) => subtask.taskId === task.id)
//                   .length > 0 ? (
//                   <div className="space-y-2">
//                     {subtasks
//                       .filter((subtask) => subtask.taskId === task.id)
//                       .map((subtask) => (
//                         <div
//                           key={subtask.id}
//                           className="border rounded p-3 bg-gray-50"
//                         >
//                           <div className="flex justify-between">
//                             <div>
//                               <h5 className="font-medium">{subtask.title}</h5>
//                               <p className="text-sm text-gray-500">
//                                 {subtask.description}
//                               </p>
//                             </div>
//                             <div className="flex space-x-4 text-sm">
//                               <div className="flex flex-col items-center">
//                                 <span className="text-gray-500">Status</span>
//                                 <span
//                                   className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                     subtask.status === "Completed"
//                                       ? "bg-green-100 text-green-800"
//                                       : subtask.status === "In Progress"
//                                       ? "bg-yellow-100 text-yellow-800"
//                                       : "bg-gray-100 text-gray-800"
//                                   }`}
//                                 >
//                                   {subtask.status}
//                                 </span>
//                               </div>
//                               <div className="flex flex-col items-center">
//                                 <span className="text-gray-500">Assignee</span>
//                                 <span>
//                                   {assigneeOptions.find(
//                                     (a) => a.value === subtask.assignee
//                                   )?.label || subtask.assignee}
//                                 </span>
//                               </div>
//                               <div className="flex flex-col items-center">
//                                 <span className="text-gray-500">Timeline</span>
//                                 <span>
//                                   {subtask.startDate} - {subtask.dueDate}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500">No subtasks defined</p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <div className="mb-8">
//         <div className="flex items-center mb-4">
//           <div className="w-full">
//             <div className="flex justify-between">
//               {/* <h1 className="text-2xl font-bold text-gray-800">Project Management Solution</h1> */}
//               <div className="text-sm font-medium text-gray-500">
//                 Step {step} of 2
//               </div>
//             </div>
//             <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
//                 style={{ width: `${step * 50}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {step === 1 ? (
//         <div className="space-y-6">
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
//               <FileEdit className="mr-2" size={20} />
//               Create Tasks
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Task Title
//                 </label>
//                 <input
//                   type="text"
//                   value={newTask.title}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, title: e.target.value })
//                   }
//                   placeholder="Enter task title"
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   value={newTask.description}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, description: e.target.value })
//                   }
//                   placeholder="Enter description"
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Priority
//                 </label>
//                 <select
//                   value={newTask.priority}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, priority: e.target.value })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {priorityOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={newTask.status}
//                   onChange={(e) =>
//                     setNewTask({ ...newTask, status: e.target.value })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {statusOptions.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={addTask}
//               className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               <PlusCircle size={16} className="mr-1" />
//               Add Task
//             </button>
//           </div>

//           {tasks.length > 0 && (
//             <div className="mt-8">
//               <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                 Tasks List ({tasks.length})
//               </h3>
//               <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       {taskHeaders.map((header) => (
//                         <th
//                           key={header.id}
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           {header.label}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {tasks.map((task) => (
//                       <tr key={task.id} className="hover:bg-gray-50">
//                         {taskHeaders.map((header) => (
//                           <td
//                             key={`${task.id}-${header.id}`}
//                             className="px-6 py-4 whitespace-nowrap"
//                           >
//                             {renderTaskCell(task, header)}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-end mt-6">
//             <button
//               onClick={goToNextStep}
//               disabled={tasks.length === 0}
//               className={`flex items-center justify-center ${
//                 tasks.length === 0
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               } text-white py-2 px-4 rounded-md transition-colors`}
//             >
//               Define Subtasks
//               <ArrowRightCircle size={18} className="ml-2" />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <div className="flex gap-6">
//             <div className="w-1/4 bg-gray-50 p-4 rounded-lg shadow-sm max-h-96 overflow-y-auto">
//               <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                 Tasks
//               </h3>
//               <div className="space-y-2">
//                 {tasks.map((task) => (
//                   <div
//                     key={task.id}
//                     onClick={() => selectTask(task.id)}
//                     className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
//                       selectedTaskId === task.id
//                         ? "bg-blue-100 border-l-4 border-blue-600"
//                         : "bg-white border hover:bg-gray-50"
//                     }`}
//                   >
//                     <div>
//                       <div className="font-medium">{task.title}</div>
//                       <div className="text-xs text-gray-500">
//                         {getSubtaskCount(task.id)} subtasks
//                       </div>
//                     </div>
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         task.priority === "Low"
//                           ? "bg-blue-500"
//                           : task.priority === "Medium"
//                           ? "bg-green-500"
//                           : task.priority === "High"
//                           ? "bg-yellow-500"
//                           : "bg-red-500"
//                       }`}
//                     ></div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="w-3/4">
//               {selectedTaskId ? (
//                 <div className="space-y-6">
//                   <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//                     <h2 className="text-xl font-semibold mb-2 text-gray-700">
//                       Subtasks for: {getTaskById(selectedTaskId)?.title}
//                     </h2>
//                     <p className="text-gray-500 mb-4">
//                       {getTaskById(selectedTaskId)?.description}
//                     </p>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Subtask Title
//                         </label>
//                         <input
//                           type="text"
//                           value={newSubtask.title}
//                           onChange={(e) =>
//                             setNewSubtask({
//                               ...newSubtask,
//                               title: e.target.value,
//                             })
//                           }
//                           placeholder="Enter subtask title"
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Description
//                         </label>
//                         <input
//                           type="text"
//                           value={newSubtask.description}
//                           onChange={(e) =>
//                             setNewSubtask({
//                               ...newSubtask,
//                               description: e.target.value,
//                             })
//                           }
//                           placeholder="Enter description"
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Due Date
//                         </label>
//                         <input
//                           type="date"
//                           value={newSubtask.dueDate}
//                           onChange={(e) =>
//                             setNewSubtask({
//                               ...newSubtask,
//                               dueDate: e.target.value,
//                             })
//                           }
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Assignee
//                         </label>
//                         <input
//                           type="text"
//                           value={newSubtask.assignee}
//                           onChange={(e) =>
//                             setNewSubtask({
//                               ...newSubtask,
//                               assignee: e.target.value,
//                             })
//                           }
//                           placeholder="Enter assignee"
//                           className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>
//                     </div>

//                     <button
//                       onClick={addSubtask}
//                       className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
//                     >
//                       <PlusCircle size={16} className="mr-1" />
//                       Add Subtask
//                     </button>
//                   </div>

//                   <div className="mt-6">
//                     {filteredSubtasks.length > 0 ? (
//                       <div className="overflow-x-auto bg-white rounded-lg shadow">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead className="bg-gray-50">
//                             <tr>
//                               {subtaskHeaders.map((header) => (
//                                 <th
//                                   key={header.id}
//                                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                 >
//                                   {header.label}
//                                 </th>
//                               ))}
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {filteredSubtasks.map((subtask) => (
//                               <tr key={subtask.id} className="hover:bg-gray-50">
//                                 {subtaskHeaders.map((header) => (
//                                   <td
//                                     key={`${subtask.id}-${header.id}`}
//                                     className="px-6 py-4 whitespace-nowrap"
//                                   >
//                                     {renderSubtaskCell(subtask, header)}
//                                   </td>
//                                 ))}
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     ) : (
//                       <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                         <p className="text-gray-500">
//                           No subtasks added yet for this task.
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                   <p className="text-gray-500">
//                     Select a task from the list to add subtasks
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-between mt-6">
//             <button
//               onClick={goToPreviousStep}
//               className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
//             >
//               <ArrowLeftCircle size={18} className="mr-2" />
//               Back to Tasks
//             </button>

//             <button
//               onClick={() =>
//                 {alert("Project management data saved successfully!")
//                 console.log(tasks)
//                 console.log(subtasks)}
//               }
//               className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
//             >
//               Complete Setup
//               <Check size={18} className="ml-2" />
//             </button>
//           </div>
//         </div>
//       )}
//       {renderOverviewStep()}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import {
  PlusCircle,
  Trash2,
  Edit,
  Check,
  X,
  ArrowRightCircle,
  ArrowLeftCircle,
  FileEdit,
  ChevronDown,
  ChevronRight,
  Save,
} from "lucide-react";
import axios from "axios";
import { ADD_TASK_TO_DRAFT, ADD_TO_INBOX, DELETE_TASK_SUBTASK } from "@/URL";

// Generate unique IDs for tasks and subtasks
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default assignee options if not provided by props
const DEFAULT_ASSIGNEE_OPTIONS = [
  "Default User 1",
  "Default User 2",
  "Unassigned",
];

export default function GeneralTaskAddition({
  assigneeOptions = [],
  setTaskData,
  taskData,
  subtaskData,
  setSubtaskData,
  projectId,
  projectDetails,
}) {
  console.log("parent",subtaskData);

  const [step, setStep] = useState(1);
  const [tasks, setTasks] = useState([...taskData]);
  const [subtasks, setSubtasks] = useState([...subtaskData]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Not Started",
    startDate: "",
    dueDate: "",
  });
  // Removed status from newSubtask initial state
  const [newSubtask, setNewSubtask] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    assignee: assigneeOptions[0] || "",
  });
    console.log("subtasks",subtasks);


  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [updatedTaskId, setUpdatedTaskId] = useState(null);
  const [updatedSubtaskId, setUpdatedSubtaskId] = useState(null);

  const [showSummaryView, setShowSummaryView] = useState(false);
  const [expandedSummaryTasks, setExpandedSummaryTasks] = useState({});

  const taskFormRef = useRef(null);
  const subtaskFormRef = useRef(null);

  const priorityOptions = ["Low", "Medium", "High", "Critical"];
  const statusOptions = ["Not Started", "In Progress", "On Hold", "Completed"]; // Still needed for Tasks

  const taskHeaders = [
    { id: "title", label: "Task Title" },
    { id: "description", label: "Description" },
    { id: "startDate", label: "Start Date" },
    { id: "dueDate", label: "Due Date" },
    { id: "priority", label: "Priority" },
    { id: "status", label: "Status" },
    { id: "user_responsibility_name", label: "Assignee" },
    { id: "actions", label: "Actions" },
  ];

  const subtaskHeaders = [
    { id: "title", label: "Subtask Title" },
    { id: "description", label: "Description" },
    { id: "startDate", label: "Start Date" },
    { id: "dueDate", label: "Due Date" },
    // { id: 'status', label: 'Status' }, // Removed
    { id: "user_responsibility_name", label: "Assignee" },
    { id: "actions", label: "Actions" },
  ];

  useEffect(() => {
    if (editingTaskId && taskFormRef.current) {
      taskFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingTaskId]);

  useEffect(() => {
    if (editingSubtaskId && subtaskFormRef.current) {
      subtaskFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingSubtaskId]);

  useEffect(() => {
    console.log(tasks, subtasks);
    setTaskData(tasks);
    setSubtaskData(subtasks);
  }, [tasks, subtasks]);

  useEffect(() => {
    if (!updatedTaskId) return;
    const updatedTask = tasks.find((task) => {
      return task.id === updatedTaskId;
    });
    console.log(updatedTaskId);
    updateTask(updatedTask);
  }, [updatedTaskId]);

  useEffect(() => {
    if (!updatedSubtaskId) return;
    const updatedSubtask = subtasks.find((subtask) => {
      return subtask.id === updatedSubtaskId;
    });
    console.log(updatedSubtaskId);
    updateSubtask(updatedSubtask);
  }, [updatedSubtaskId]);

  const updateTask = async (updatedTask) => {
    const update = await addTasksToDraft(updatedTask, false);
    return update;
  };

  const updateSubtask = async (updatedSubtask) => {
    const update = await addTasksToDraft(updatedSubtask, true);
    return update;
  };

  const addTasksToDraft = async (data, forSubtask) => {
    try {
      console.log(data);
      // debugger
      const payload = {
        draft_id: projectId,
        project: projectDetails,
        teamList: assigneeOptions,
        step: forSubtask ? "3" : "2",
        flag: "create",
      };

      if (forSubtask) {
        payload.subtasks = data;
      } else {
        payload.tasks = data;
      }
      const response = await axios.post(ADD_TO_INBOX, payload);
      const newTaskSubtaskId = forSubtask
        ? response.data.data.id
        : response.data.data.taskid;
      // const newSubtaskId = response.data.data.id;
      // console.log(newTaskId);
      // debugger
      return newTaskSubtaskId;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTaskFromDraft = async (task_id, forSubtask) => {
    try {
      const payload = {
        id: task_id,
        flag: forSubtask ? "subtask" : "task",
      };
      const response = await axios.post(DELETE_TASK_SUBTASK, payload);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskFormSubmit = async () => {
    if (!newTask.title.trim()) return;

    if (editingTaskId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...newTask, id: editingTaskId } : task
        )
      );
      // console.log(editingTaskId)

      // console.log(currentTask);
      // console.log(editingTaskId);
      // console.log(tasks);
      setUpdatedTaskId(editingTaskId);
      setEditingTaskId(null);
    } else {
      console.log(newTask);
      const newTaskId = await addTasksToDraft(newTask, false);
      const taskToAdd = { id: newTaskId, ...newTask };
      setTasks([...tasks, taskToAdd]);
    }
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "Not Started",
      startDate: "",
      dueDate: "",
      user_responsibility_id: assigneeOptions[0].ein,
      user_responsibility_name: assigneeOptions[0].firstname,
    });
  };

  const removeTask = (id) => {
    if (editingTaskId === id) {
      cancelTaskEdit();
    }
    setTasks(tasks.filter((task) => task.id !== id));
    setSubtasks(subtasks.filter((subtask) => subtask.parentTaskId !== id));
    deleteTaskFromDraft(id);
    if (selectedTaskId === id) {
      setSelectedTaskId(null);
    }
  };
  const removeSubtask = (id) => {
    if (editingSubtaskId === id) {
      cancelSubtaskEdit();
    }
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
    deleteTaskFromDraft(id, true);
    if (selectedTaskId === id) {
      setSelectedTaskId(null);
    }
  };

  const prepareEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    // console.log(id);
    if (taskToEdit) {
      setNewTask({ ...taskToEdit });
      setEditingTaskId(id);
    }
  };

  const cancelTaskEdit = () => {
    setEditingTaskId(null);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "Not Started",
      startDate: "",
      dueDate: "",
      user_responsibility_id: "", //assigneeOptions[0].ein||"",
      user_responsibility_name: "", // assigneeOptions[0].firstname||"",
    });
  };

  const handleSubtaskFormSubmit = async () => {
    if (!newSubtask.title.trim() || !selectedTaskId) return;

    if (editingSubtaskId) {
      setSubtasks(
        subtasks.map((subtask) =>
          subtask.id === editingSubtaskId
            ? {
                ...newSubtask,
                id: editingSubtaskId,
                parentTaskId: selectedTaskId,
              }
            : subtask
        )
      );
      setUpdatedSubtaskId(editingSubtaskId);
      setEditingSubtaskId(null);
    } else {
      const subtaskWithParent = {
        parentTaskId: selectedTaskId,
        ...newSubtask,
      };
      const newSubtaskId = await addTasksToDraft(subtaskWithParent, true);
      const subtaskToAdd = {
        id: newSubtaskId,
        // parentTaskId: selectedTaskId,
        ...subtaskWithParent,
      };
      setSubtasks([...subtasks, subtaskToAdd]);
    }
    // Reset form, removed status
    setNewSubtask({
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      // assignee: assigneeOptions[0] || "",
      user_responsibility_id: "",
      user_responsibility_name: "",
    });
  };

  const prepareEditSubtask = (id) => {
    console.log(id);
    const subtaskToEdit = subtasks.find((subtask) => subtask.id === id);
    if (subtaskToEdit) {
      // Ensure status is not carried over if it somehow exists from old data
      const { status, ...restOfSubtask } = subtaskToEdit;
      setNewSubtask({ ...restOfSubtask });
      setEditingSubtaskId(id);
    }
  };

  const cancelSubtaskEdit = () => {
    setEditingSubtaskId(null);
    // Reset form, removed status
    setNewSubtask({
      title: "",
      description: "",
      startDate: "",
      dueDate: "",
      // assignee: assigneeOptions[0] || "",
      user_responsibility_id: "",
      user_responsibility_name: "",
    });
  };

  const goToNextStep = () => {
    if (tasks.length === 0) {
      alert("Please add at least one task before proceeding.");
      return;
    }
    cancelTaskEdit();
    setStep(2);
    if (tasks.length > 0 && !selectedTaskId) {
      setSelectedTaskId(tasks[0].id);
    }
  };

  const goToPreviousStep = () => {
    cancelSubtaskEdit();
    setStep(1);
    setShowSummaryView(false);
  };

  const selectTask = (id) => {
    if (editingSubtaskId) {
      cancelSubtaskEdit();
    }
    setSelectedTaskId(id);
  };

  const getTaskById = (id) => tasks.find((task) => task.id === id);
  const getSubtaskCount = (taskId) =>
    subtasks.filter((subtask) => subtask.parentTaskId === taskId).length;

  const renderTaskCell = (task, column) => {
    // console.log(task)
    if (column.id === "title") return task.title || task.task_name;
    if (column.id === "description")
      return (
        <div className="whitespace-pre-wrap">
          {task.description || task.task_description}
        </div>
      );
    if (["startDate", "dueDate"].includes(column.id))
      return (
        task[column.id] ||
        (column.id === "startDate" ? task.plan_date : task.actual_date)
      );
    if (column.id === "user_responsibility_name")
      return (
        <div className="px-2 py-1 text-xs font-medium">
          {task.user_responsibility_name}
        </div>
      );

    if (column.id === "priority") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.priority === "Low"
              ? "bg-blue-100 text-blue-800"
              : task.priority === "Medium"
              ? "bg-green-100 text-green-800"
              : task.priority === "High"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {task.priority || task.task_priority}
        </span>
      );
    }

    if (column.id === "status") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.status === "Not Started"
              ? "bg-gray-100 text-gray-800"
              : task.status === "In Progress"
              ? "bg-blue-100 text-blue-800"
              : task.status === "On Hold"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {task.status}
        </span>
      );
    }

    if (column.id === "actions") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => prepareEditTask(task.id)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => removeTask(task.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      );
    }
    return null;
  };

  // renderSubtaskCell: Removed handling for 'status' column
  const renderSubtaskCell = (subtask, column) => {
    if (column.id === "title") return subtask.title || subtask.task_name;
    if (column.id === "description")
      return (
        <div className="whitespace-pre-wrap">
          {subtask.description || subtask.task_description}
        </div>
      );
    if (["startDate", "dueDate"].includes(column.id))
      return (
        subtask[column.id] ||
        (column.id === "startDate" ? subtask.start_date : subtask.due_date)
      );
    if (column.id === "user_responsibility_name")
      return (
        <div className="px-2 py-1 text-xs font-medium">
          {subtask.user_responsibility_name}
        </div>
      );
    // Removed: 'status' column handling for subtasks
    // if (column.id === 'status') { ... }

    if (column.id === "actions") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => prepareEditSubtask(subtask.id)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => removeSubtask(subtask.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      );
    }
    return null;
  };

  const filteredSubtasks = selectedTaskId
    ? subtasks.filter((subtask) => subtask.parentTaskId === selectedTaskId)
    : [];
  const handleCompleteSetup = () => {
    setShowSummaryView(true);
    cancelSubtaskEdit();
    alert("Project management data saved! Viewing summary.");
  };
  const toggleSummaryTaskExpansion = (taskId) =>
    setExpandedSummaryTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));

  // if (showSummaryView) {
  //   return (
  //     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  //       <div className="flex justify-between items-center mb-6">
  //         <h1 className="text-2xl font-bold text-gray-800">Project Summary</h1>
  //         <button
  //           onClick={goToPreviousStep}
  //           className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
  //         >
  //           <ArrowLeftCircle size={18} className="mr-2" /> Back to Edit
  //         </button>
  //       </div>
  //       {tasks.length === 0 ? (
  //         <p className="text-gray-500 text-center">No tasks to display.</p>
  //       ) : (
  //         <div className="space-y-4">
  //           {tasks.map((task) => (
  //             <div key={task.id} className="bg-gray-50 rounded-lg shadow-sm">
  //               <div
  //                 className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
  //                 onClick={() => toggleSummaryTaskExpansion(task.id)}
  //               >
  //                 <div className="flex items-center">
  //                   {expandedSummaryTasks[task.id] ? (
  //                     <ChevronDown size={20} className="mr-2" />
  //                   ) : (
  //                     <ChevronRight size={20} className="mr-2" />
  //                   )}
  //                   <h2 className="text-lg font-semibold text-gray-700">
  //                     {task.title}
  //                   </h2>
  //                 </div>
  //                 <span
  //                   className={`px-2 py-1 rounded-full text-xs font-medium ${
  //                     task.priority === "Low"
  //                       ? "bg-blue-100 text-blue-800"
  //                       : task.priority === "Medium"
  //                       ? "bg-green-100 text-green-800"
  //                       : task.priority === "High"
  //                       ? "bg-yellow-100 text-yellow-800"
  //                       : "bg-red-100 text-red-800"
  //                   }`}
  //                 >
  //                   {task.priority}
  //                 </span>
  //               </div>
  //               {expandedSummaryTasks[task.id] && (
  //                 <div className="p-4 border-t border-gray-200">
  //                   <div className="mb-3 text-sm">
  //                     <strong>Description:</strong>{" "}
  //                     <div className="whitespace-pre-wrap mt-1 p-2 bg-white border rounded">
  //                       {task.description || "N/A"}
  //                     </div>
  //                   </div>
  //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mb-3 text-sm">
  //                     <div>
  //                       <strong>Status:</strong> {task.status}
  //                     </div>
  //                     <div>
  //                       <strong>Start Date:</strong> {task.startDate || "N/A"}
  //                     </div>
  //                     <div>
  //                       <strong>Due Date:</strong> {task.dueDate || "N/A"}
  //                     </div>
  //                   </div>
  //                   <h4 className="text-md font-semibold text-gray-600 mt-4 mb-2">
  //                     Subtasks ({getSubtaskCount(task.id)}):
  //                   </h4>
  //                   {subtasks.filter((st) => st.parentTaskId === task.id)
  //                     .length > 0 ? (
  //                     <ul className="space-y-2 text-sm">
  //                       {subtasks
  //                         .filter((st) => st.parentTaskId === task.id)
  //                         .map((subtask) => (
  //                           <li
  //                             key={subtask.id}
  //                             className="bg-white p-3 rounded border border-gray-200 shadow-sm"
  //                           >
  //                             <div className="flex justify-between items-start">
  //                               <p className="font-semibold">{subtask.title}</p>
  //                               {/* Removed status display for subtask in summary */}
  //                             </div>
  //                             <div className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">
  //                               {subtask.description || "No description"}
  //                             </div>
  //                             <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 text-xs mt-2 pt-1 border-t border-gray-100">
  //                               <span>Start: {subtask.startDate || "N/A"}</span>
  //                               <span>Due: {subtask.dueDate || "N/A"}</span>
  //                               <span>
  //                                 Assignee: {subtask.assignee || "N/A"}
  //                               </span>
  //                             </div>
  //                           </li>
  //                         ))}
  //                     </ul>
  //                   ) : (
  //                     <p className="text-sm text-gray-500">
  //                       No subtasks for this task.
  //                     </p>
  //                   )}
  //                 </div>
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-full">
            <div className="flex justify-between">
              {/* <h1 className="text-2xl font-bold text-gray-800">
                Project Management Solution
              </h1> */}
              <div className="text-sm font-medium text-gray-500">
                Step {step} of 2
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${step * 50}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {step === 1 ? (
        // STEP 1: TASK CREATION/EDITING
        <div className="space-y-6">
          <div
            ref={taskFormRef}
            className="bg-gray-50 p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <FileEdit className="mr-2" size={20} />
              {editingTaskId ? "Edit Task" : "Create Task"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Enter description (supports multiple lines)"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                  rows="3"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newTask.startDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, startDate: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <select
                  defaultValue={newTask.user_responsibility_id}
                  onChange={(e) => {
                    setNewTask({
                      ...newTask,
                      user_responsibility_id: e.target.value,
                    });
                    const selected = assigneeOptions.find(
                      (option) => option.ein === e.target.value
                    );
                    console.log(e.target.value, selected.firstname);
                    setNewTask({
                      ...newTask,
                      user_responsibility_name: selected.firstname,
                    });
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" selected disabled>
                    Select
                  </option>

                  {assigneeOptions?.length > 0 &&
                    assigneeOptions.map((option) => (
                      <option key={option.ein} value={option.ein}>
                        {option.firstname}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleTaskFormSubmit}
                className={`flex items-center justify-center text-white py-2 px-4 rounded-md transition-colors ${
                  editingTaskId
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editingTaskId ? (
                  <>
                    <Save size={16} className="mr-1" /> Update Task
                  </>
                ) : (
                  <>
                    <PlusCircle size={16} className="mr-1" /> Add Task
                  </>
                )}
              </button>
              {editingTaskId && (
                <button
                  onClick={cancelTaskEdit}
                  className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <X size={16} className="mr-1" /> Cancel
                </button>
              )}
            </div>
          </div>
          {tasks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Tasks List ({tasks.length})
              </h3>
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {taskHeaders.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        {taskHeaders.map((header) => (
                          <td
                            key={`${task.id}-${header.id}`}
                            className="px-6 py-4 whitespace-normal text-sm align-top"
                          >
                            {renderTaskCell(task, header)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <button
              onClick={goToNextStep}
              disabled={tasks.length === 0}
              className={`flex items-center justify-center ${
                tasks.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white py-2 px-4 rounded-md transition-colors`}
            >
              Define Subtasks <ArrowRightCircle size={18} className="ml-2" />
            </button>
          </div>
        </div>
      ) : (
        // STEP 2: SUBTASK CREATION/EDITING
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4 bg-gray-50 p-4 rounded-lg shadow-sm max-h-[calc(100vh-200px)] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Tasks
              </h3>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => selectTask(task.id)}
                    className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                      selectedTaskId === task.id
                        ? "bg-blue-100 border-l-4 border-blue-600"
                        : "bg-white border hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-xs text-gray-500">
                        {getSubtaskCount(task.id)} subtasks
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        task.priority === "Low"
                          ? "bg-blue-500"
                          : task.priority === "Medium"
                          ? "bg-green-500"
                          : task.priority === "High"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-3/4">
              {selectedTaskId ? (
                <div className="space-y-6">
                  <div
                    ref={subtaskFormRef}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm"
                  >
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">
                      {editingSubtaskId
                        ? "Edit Subtask for: "
                        : "Add Subtask for: "}{" "}
                      {getTaskById(selectedTaskId)?.title}
                    </h2>
                    <div className="text-gray-500 mb-4 whitespace-pre-wrap">
                      {getTaskById(selectedTaskId)?.description}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subtask Title
                        </label>
                        <input
                          type="text"
                          value={newSubtask.title}
                          onChange={(e) =>
                            setNewSubtask({
                              ...newSubtask,
                              title: e.target.value,
                            })
                          }
                          placeholder="Enter subtask title"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={newSubtask.description}
                          onChange={(e) =>
                            setNewSubtask({
                              ...newSubtask,
                              description: e.target.value,
                            })
                          }
                          placeholder="Enter description"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={newSubtask.startDate}
                            onChange={(e) =>
                              setNewSubtask({
                                ...newSubtask,
                                startDate: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={newSubtask.dueDate}
                            onChange={(e) =>
                              setNewSubtask({
                                ...newSubtask,
                                dueDate: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assignee
                        </label>
                        <select
                          defaultValue={newSubtask.user_responsibility_id}
                          onChange={(e) => {
                            const selected = assigneeOptions.find(
                              (option) => option.ein === e.target.value
                            );
                            console.log(selected.firstname, e.target.value);
                            setNewSubtask({
                              ...newSubtask,
                              user_responsibility_id: e.target.value,
                              user_responsibility_name: selected.firstname,
                            });
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="" selected disabled>
                            Select
                          </option>
                          {assigneeOptions.map((option) => (
                            <option key={option.ein} value={option.ein}>
                              {option.firstname}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Removed Status select for subtasks here */}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSubtaskFormSubmit}
                        className={`flex items-center justify-center text-white py-2 px-4 rounded-md transition-colors ${
                          editingSubtaskId
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {editingSubtaskId ? (
                          <>
                            <Save size={16} className="mr-1" /> Update Subtask
                          </>
                        ) : (
                          <>
                            <PlusCircle size={16} className="mr-1" /> Add
                            Subtask
                          </>
                        )}
                      </button>
                      {editingSubtaskId && (
                        <button
                          onClick={cancelSubtaskEdit}
                          className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                        >
                          <X size={16} className="mr-1" /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  {filteredSubtasks.length > 0 && (
                    <div className="mt-6">
                      <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {subtaskHeaders.map((header) => (
                                <th
                                  key={header.id}
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  {header.label}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSubtasks.map((subtask) => (
                              <tr key={subtask.id} className="hover:bg-gray-50">
                                {subtaskHeaders.map((header) => (
                                  <td
                                    key={`${subtask.id}-${header.id}`}
                                    className="px-6 py-4 whitespace-normal text-sm align-top"
                                  >
                                    {renderSubtaskCell(subtask, header)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500">
                    Select a task from the list to add subtasks
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={goToPreviousStep}
              className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
            >
              <ArrowLeftCircle size={18} className="mr-2" />
              Back to Tasks
            </button>
            {/* <button
              onClick={handleCompleteSetup}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Complete Setup & View Summary
              <Check size={18} className="ml-2" />
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
