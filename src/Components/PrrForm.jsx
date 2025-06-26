// import { Button } from "@/Components/ui/button";
// import React, { useEffect, useState } from "react";
// import { DataTable, BaseCell } from "./DataTable";
// import { useMemo } from "react";
// import { ADD_PRR_URL, GET_PROJECT_DATA_URL } from "@/URL";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function PrrForm({ projectList, selectedDate, showPrr = false, prrInfo }) {
//   const [selectedProject, setSelectedProject] = useState();
//   const [taskData, setTaskData] = useState([]); //useMemo(() => {}, []);
//   const [tableList, setTableList] = useState([]);
//   const [prrData, setPrrData] = useState();
//   const [selectedMilestone, setSelectedMilestone] = useState();
//   const [delayedValue, setDelayedValue] = useState();
//   const [targetValue, setTargetValue] = useState();
//   const [revisedValue, setRevisedValue] = useState();

//   const navigate = useNavigate();
//   console.log(prrInfo, prrData);

//   useEffect(() => {
//     getProjectData();
//   }, [selectedProject, selectedMilestone, prrData]);

//   const getProjectData = async () => {
//     try {
//       const projectResponse = await axios.get(
//         `${GET_PROJECT_DATA_URL}/${selectedProject.project_id}`
//       );
//       console.log(projectResponse.data);
//       setTaskData(() => [...projectResponse.data.tasks]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addToList = (e) => {
//     e.preventDefault();
//     const formData = new FormData(document.getElementById("listItem"));
//     const tempData = {};
//     for (let [key, value] of formData.entries()) {
//       if (key === "key_milestone") {
//         const selectedTask = taskData.find(({ taskid }) => {
//           return taskid.toString() === value;
//         });
//         tempData["taskid"] = selectedTask.taskid;
//         tempData["key_milestone"] = selectedTask.key_milestone;
//       } else tempData[key] = value;
//     }
//     console.log(tempData);
//     tempData["project_id"] = selectedProject.project_id;
//     setTableList(() => [...tableList, tempData]);
//     //const projectType = formData.get("projectType");
//     // console.log(projectType);
//     // for (let [key, value] of formData.entries()) {
//     //   console.log({ key, value });
//     // }
//     e.currentTarget.reset();
//     setSelectedProject();
//     setTaskData([]);
//   };

//   const addPrr = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(document.getElementById("prrDetails"));
//     const tempData = {};
//     for (let [key, value] of formData.entries()) {
//       tempData[key] = value;
//     }
//     console.log(tempData);
//     setPrrData(() => ({
//       prr_details: { prr_date: selectedDate, ...tempData },
//       prr_list: tableList,
//     }));
//     try {
//       const response = await axios.post(ADD_PRR_URL, {
//         prr_details: { prr_date: selectedDate, ...tempData },
//         prr_list: tableList,
//       });
//       console.log(response);
//       alert("PRR Created");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const taskColumns = useMemo(() => [
//     {
//       header: "Project Code",
//       accessorKey: "project_code",
//       meta: {
//         type: "text",
//       },
//     },
//     {
//       header: "Project Name",
//       accessorKey: "project_name",
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
//       // cell: ({ getValue }) => {
//       //   // const dateValue = new Date(getValue());
//       //   // if (!isNaN(dateValue)) {
//       //   //   return format(new Date(dateValue), "dd/MM/yyyy");
//       //   // }
//       //   const value = getValue();
//       //   console.log(taskData,value);
//       //   const selected = taskData.find(({ taskid }) => {
//       //     return value === taskid.toString();
//       //   });
//       //   console.log(selected);
//       //   if (selected) {
//       //     return selected.key_milestone;
//       //   }
//       //   return "";
//       // },
//     },
//     {
//       header: "Target Date",
//       accessorKey: "targetDate",
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
//       header: "No. Of Days Delayed",
//       accessorKey: "delayedDays",
//       meta: {
//         type: "number",
//         // options: [
//         //   { value: "done", label: "Done" },
//         //   { value: "pending", label: "Pending" },
//         //   { value: "not_applicable", label: "Not Applicable" },
//         //   { value: "not_required", label: "Not Required" },
//         // ],
//       },
//       cell: BaseCell,
//     },
//     {
//       header: "Reason For Delay",
//       accessorKey: "delayReason",
//       meta: {
//         type: "text",
//       },
//       cell: BaseCell,
//     },
//     {
//       header: "Impacted Milestones / Recovery Plan",
//       accessorKey: "remarks",
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

//   const handleProjectCodeChange = (e) => {
//     const selected = projectList.find(
//       ({ project_code }) => project_code === e.target.value
//     );
//     console.log(selected);
//     setSelectedProject(selected);
//   };

//   const handleMilestoneChange = (e) => {
//     console.log(taskData);
//     const selected = taskData.find(({ taskid }) => {
//       return e.target.value === taskid;
//     });
//     console.log(selected);
//     setSelectedMilestone(selected.key_milestone);
//   };

//   return (
//     <div>
//       {showPrr ? (
//         <></>
//       ) : (
//         <form
//           id="listItem"
//           className="grid grid-cols-4 gap-6 m-6"
//           onSubmit={addToList}
//         >
//           <div className="flex flex-wrap">
//             <label htmlFor="project_code" className="w-2/3">
//               Project Code:
//             </label>
//             {/* <input
//           name="projectNumber"
//           type="text"
//           className="rounded-xl w-4/5"
//         /> */}
//             <select
//               onChange={handleProjectCodeChange}
//               name="project_code"
//               className="rounded-xl w-4/5"
//               required
//             >
//               <option value="">Select Code</option>
//               {projectList.map((project) => {
//                 return (
//                   <option value={project.project_code}>
//                     {project.project_code}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>
//           <div className="flex flex-wrap">
//             <label htmlFor="project_name" className="w-2/3">
//               Project Name:
//             </label>
//             <input
//               value={selectedProject?.project_name}
//               name="project_name"
//               type="text"
//               className="rounded-xl w-4/5"
//               // disabled
//               required
//             />
//           </div>
//           <div className="flex flex-wrap">
//             <label htmlFor="key_milestone" className="w-2/3">
//               Milestone:
//             </label>
//             {/* <input
//           name="key_milestone"
//           type="text"
//           className="rounded-xl w-4/5"
//         /> */}
//             <select
//               onChange={handleMilestoneChange}
//               name="key_milestone"
//               className="rounded-xl w-4/5"
//               required
//             >
//               <option value={""}>Select Task</option>
//               {taskData.map((task) => {
//                 return (
//                   <option value={task.taskid}>{task.key_milestone}</option>
//                 );
//               })}
//             </select>
//           </div>
//           <div className="flex flex-wrap">
//             <label htmlFor="targetDate" className="w-2/3">
//               Target Date:
//             </label>
//             <input
//               name="targetDate"
//               type="date"
//               className="rounded-xl w-4/5"
//               required
//             />
//           </div>
//           <div className="flex flex-wrap">
//             <label htmlFor="revisedDate" className="w-2/3">
//               Revised Date:
//             </label>
//             <input
//               name="revisedDate"
//               type="date"
//               className="rounded-xl w-4/5"
//               required
//             />
//           </div>
//           <div className="flex flex-wrap">
//             <label htmlFor="delayedDays" className="w-2/3">
//               Number Of Days Delayed:
//             </label>
//             <input
//               name="delayedDays"
//               type="number"
//               className="rounded-xl w-4/5"
//               required
//             />
//           </div>
//           <div className="flex flex-wrap">
//             <label htmlFor="delayReason" className="w-2/3">
//               Reason For Delay:
//             </label>
//             <input
//               name="delayReason"
//               type="text"
//               className="rounded-xl w-4/5"
//               required
//             />
//           </div>
//           <div className="flex flex-wrap">
//             <label htmlFor="remarks" className="w-2/3">
//               Impacted Milestones / Recovery Plan:
//             </label>
//             <input
//               name="remarks"
//               type="text"
//               className="rounded-xl w-4/5"
//               required
//             />
//           </div>
//           <Button
//             type="submit"
//             className="bg-teal-theme w-4/5 rounded-xl text-black"
//           >
//             Add To List
//           </Button>
//         </form>
//       )}
//       <div className="max-w-[100%] overflow-x-auto">
//         <DataTable
//           tData={showPrr ? prrInfo.prr_list : tableList}
//           tColumns={taskColumns}
//           pagination={false}
//           search={false}
//         />
//       </div>
//       <form
//         id="prrDetails"
//         className="grid grid-cols-3 gap-6 m-6"
//         onSubmit={addPrr}
//       >
//         <div className="flex flex-wrap">
//           <label htmlFor="initiatedBy" className="w-2/3">
//             Initiated By:
//           </label>
//           <input
//             name="initiatedBy"
//             type="text"
//             className="rounded-xl w-4/5"
//             required
//             value={prrInfo?.prr_details?.initiatedBy}
//           />
//         </div>
//         <div className="flex flex-wrap">
//           <label htmlFor="name_sign" className="w-2/3">
//             Name & Sign:
//           </label>
//           <input
//             name="name_sign"
//             type="text"
//             className="rounded-xl w-4/5"
//             required
//             value={prrInfo?.prr_details?.name_sign}
//           />
//         </div>
//         <div className="flex flex-wrap">
//           <label htmlFor="department" className="w-2/3">
//             Department:
//           </label>
//           <input
//             name="department"
//             type="text"
//             className="rounded-xl w-4/5"
//             required
//             value={prrInfo?.prr_details?.department}
//           />
//         </div>
//         <div className="flex flex-wrap">
//           <label htmlFor="approvedBy" className="w-2/3">
//             Approved By:
//           </label>
//           <input
//             name="approvedBy"
//             type="text"
//             className="rounded-xl w-4/5"
//             required
//             value={prrInfo?.prr_details?.approvedBy}
//           />
//         </div>
//         <div className="flex flex-wrap">
//           <label htmlFor="departmentHead" className="w-2/3">
//             Department Head:
//           </label>
//           <input
//             name="departmentHead"
//             type="text"
//             className="rounded-xl w-4/5"
//             required
//             value={prrInfo?.prr_details?.departmentHead}
//           />
//         </div>
//         <div className="flex flex-wrap">
//           <label htmlFor="consolidatedHead" className="w-2/3">
//             Consolidated Head:
//           </label>
//           <input
//             name="consolidatedHead"
//             type="text"
//             className="rounded-xl w-4/5"
//             required
//             value={prrInfo?.prr_details?.consolidatedHead}
//           />
//         </div>
//         {showPrr ? (
//           <></>
//         ) : (
//           <Button
//             type="submit"
//             className="bg-teal-theme w-4/5 rounded-xl text-black"
//           >
//             Generate PRR
//           </Button>
//         )}
//       </form>
//     </div>
//   );
// }

// export default PrrForm;

import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";
import { DataTable, BaseCell } from "./DataTable";
import { useMemo } from "react";
import { ADD_PRR_URL, GET_PROJECT_DATA_URL } from "@/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PrrForm({ projectList, selectedDate, showPrr = false, prrInfo }) {
  const [selectedProject, setSelectedProject] = useState();
  const [taskData, setTaskData] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [prrData, setPrrData] = useState();
  const [selectedMilestone, setSelectedMilestone] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getProjectData();
  }, [selectedProject, selectedMilestone, prrData]);

  const getProjectData = async () => {
    try {
      const projectResponse = await axios.get(
        `${GET_PROJECT_DATA_URL}/${selectedProject?.project_id}`
      );
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
    tempData["project_id"] = selectedProject.project_id;
    setTableList(() => [...tableList, tempData]);
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
    setPrrData(() => ({
      prr_details: { prr_date: selectedDate, ...tempData },
      prr_list: tableList,
    }));
    try {
      const response = await axios.post(ADD_PRR_URL, {
        prr_details: { prr_date: selectedDate, ...tempData },
        prr_list: tableList,
      });
      if (response.status === 200) {
        alert("PRR Created");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const taskColumns = useMemo(() => [
    {
      header: "Project Code",
      accessorKey: "project_code",
      meta: { type: "text" },
    },
    {
      header: "Project Name",
      accessorKey: "project_name",
      meta: { type: "text" },
    },
    {
      header: "Milestone",
      accessorKey: "key_milestone",
      meta: { type: "text" },
    },
    {
      header: "Target Date",
      accessorKey: "targetDate",
      meta: { type: "date" },
      cell: BaseCell,
    },
    {
      header: "Revised Date",
      accessorKey: "revisedDate",
      meta: { type: "date" },
      cell: BaseCell,
    },
    {
      header: "No. Of Days Delayed",
      accessorKey: "delayedDays",
      meta: { type: "number" },
      cell: BaseCell,
    },
    {
      header: "Reason For Delay",
      accessorKey: "delayReason",
      meta: { type: "text" },
      cell: BaseCell,
    },
    {
      header: "Impacted Milestones / Recovery Plan",
      accessorKey: "remarks",
      meta: { type: "text" },
      cell: BaseCell,
    },
  ]);

  const handleProjectCodeChange = (e) => {
    const selected = projectList.find(
      ({ project_code }) => project_code === e.target.value
    );
    setSelectedProject(selected);
  };

  const handleMilestoneChange = (e) => {
    const selected = taskData.find(({ taskid }) => {
      return e.target.value === taskid;
    });
    setSelectedMilestone(selected?.key_milestone);
  };

  return (
    <div className="p-6">
      {!showPrr && (
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Add Project Details
            </h2>
          </div>

          <form
            id="listItem"
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
            onSubmit={addToList}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Project Code */}
              <div className="space-y-2">
                <label
                  htmlFor="project_code"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Project Code *
                </label>
                <select
                  onChange={handleProjectCodeChange}
                  name="project_code"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Code</option>
                  {projectList.map((project, index) => (
                    <option key={index} value={project.project_code}>
                      {project.project_code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Name */}
              <div className="space-y-2">
                <label
                  htmlFor="project_name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Project Name *
                </label>
                <input
                  value={selectedProject?.project_name || ""}
                  name="project_name"
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  readOnly
                />
              </div>

              {/* Milestone */}
              <div className="space-y-2">
                <label
                  htmlFor="key_milestone"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Milestone *
                </label>
                <select
                  onChange={handleMilestoneChange}
                  name="key_milestone"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Task</option>
                  {taskData.map((task, index) => (
                    <option key={index} value={task.taskid}>
                      {task.key_milestone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Date */}
              <div className="space-y-2">
                <label
                  htmlFor="targetDate"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Target Date *
                </label>
                <input
                  name="targetDate"
                  type="date"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Revised Date */}
              <div className="space-y-2">
                <label
                  htmlFor="revisedDate"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Revised Date *
                </label>
                <input
                  name="revisedDate"
                  type="date"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Days Delayed */}
              <div className="space-y-2">
                <label
                  htmlFor="delayedDays"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Days Delayed *
                </label>
                <input
                  name="delayedDays"
                  type="number"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Reason for Delay */}
              <div className="space-y-2">
                <label
                  htmlFor="delayReason"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Reason For Delay *
                </label>
                <input
                  name="delayReason"
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Recovery Plan */}
              <div className="space-y-2">
                <label
                  htmlFor="remarks"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Recovery Plan *
                </label>
                <input
                  name="remarks"
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add To List
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Data Table Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Project Details Overview
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <DataTable
            tData={showPrr ? prrInfo.prr_list : tableList}
            tColumns={taskColumns}
            pagination={false}
            search={false}
          />
        </div>
      </div>

      {/* PRR Details Form */}
      <div>
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Authorization Details
          </h2>
        </div>

        <form
          id="prrDetails"
          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
          onSubmit={addPrr}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Initiated By */}
            <div className="space-y-2">
              <label
                htmlFor="initiatedBy"
                className="block text-sm font-semibold text-gray-700"
              >
                Initiated By *
              </label>
              <input
                name="initiatedBy"
                type="text"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                value={prrInfo?.prr_details?.initiatedBy}
              />
            </div>

            {/* Name & Sign */}
            <div className="space-y-2">
              <label
                htmlFor="name_sign"
                className="block text-sm font-semibold text-gray-700"
              >
                Name & Sign *
              </label>
              <input
                name="name_sign"
                type="text"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                value={prrInfo?.prr_details?.name_sign}
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label
                htmlFor="department"
                className="block text-sm font-semibold text-gray-700"
              >
                Department *
              </label>
              <input
                name="department"
                type="text"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                value={prrInfo?.prr_details?.department}
              />
            </div>

            {/* Approved By */}
            <div className="space-y-2">
              <label
                htmlFor="approvedBy"
                className="block text-sm font-semibold text-gray-700"
              >
                Approved By *
              </label>
              <input
                name="approvedBy"
                type="text"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                value={prrInfo?.prr_details?.approvedBy}
              />
            </div>

            {/* Department Head */}
            <div className="space-y-2">
              <label
                htmlFor="departmentHead"
                className="block text-sm font-semibold text-gray-700"
              >
                Department Head *
              </label>
              <input
                name="departmentHead"
                type="text"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                value={prrInfo?.prr_details?.departmentHead}
              />
            </div>

            {/* Consolidated Head */}
            <div className="space-y-2">
              <label
                htmlFor="consolidatedHead"
                className="block text-sm font-semibold text-gray-700"
              >
                Consolidated Head *
              </label>
              <input
                name="consolidatedHead"
                type="text"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                value={prrInfo?.prr_details?.consolidatedHead}
              />
            </div>
          </div>

          {!showPrr && (
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Generate PRR
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PrrForm;
