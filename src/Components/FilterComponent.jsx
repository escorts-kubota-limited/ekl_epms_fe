// import { MenuItem, TextField } from "@mui/material";
// import { Select, Option } from "@material-tailwind/react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FILTER_DASHBOARD_DATA_URL,
//   FILTER_TASKS_DASHBOARD_DATA_URL,
//   GET_TEAM_HIERARCHY,
// } from "@/URL";
// import { Button } from "./ui/button";
// import { XMarkIcon } from "@heroicons/react/24/solid";
// import { useAuth } from "@/AuthProvider";

// const FilterComponent = ({
//   activeTab,
//   setProjectData,
//   setTaskData,
//   setProjectNumber,
//   setInProgressProjects,
//   setTasksOpen,
//   forKmc,
// }) => {
//   const [filterProjectType, setfilterProjectType] = useState();
//   const [filterProjectSubtype, setfilterProjectSubtype] = useState();
//   const [filterProjectTemplate, setfilterProjectTemplate] =
//     useState("All Projects");
//   const [filterProjectPlatform, setfilterProjectPlatform] = useState();

//   const [filterDashboardTask, setFilterDashboardTask] = useState();
//   const [filterStartDate, setFilterStartDate] = useState();
//   const [filterEndDate, setFilterEndDate] = useState();
//   const [removeFilterFlag, setRemoveFilterFlag] = useState(false);
//   const [teamHierarchy, setTeamHierarchy] = useState([]);

//   const [filterSectionName, setFilterSectionName] = useState("all");
//   const [filterPriority, setFilterPriority] = useState("");
//   const [filterPmo, setFilterPmo] = useState("");

//   const { data } = useAuth();
//   useEffect(() => {
//     const filterDashboardData = async () => {
//       try {
//         if (forKmc) {
//           const [taskResponse, projectResponse] = await Promise.all([
//             axios.get(FILTER_TASKS_DASHBOARD_DATA_URL, {
//               params: {
//                 project_type: filterProjectType,
//                 project_subtype: filterProjectSubtype,
//                 project_template: filterProjectTemplate,
//                 project_platform: filterProjectPlatform,
//                 // task_range: filterDashboardTask,
//                 start_date: filterStartDate,
//                 end_date: filterEndDate,
//               },
//             }),
//             axios.get(FILTER_DASHBOARD_DATA_URL, {
//               params: {
//                 project_type: filterProjectType,
//                 project_subtype: filterProjectSubtype,
//                 project_template: filterProjectTemplate,
//                 project_platform: filterProjectPlatform,
//                 start_date: filterStartDate,
//                 end_date: filterEndDate,
//               },
//             }),
//           ]);
//           const filteredTaskData = taskResponse.data;
//           //console.log(taskResponse);
//           //console.log(projectResponse.data)
//           setTaskData(filteredTaskData);
//           const filteredProjectData = projectResponse.data.projectlist;
//           setProjectNumber(projectResponse.data.total_projects);
//           setInProgressProjects(projectResponse.data.project_in_progress);
//           setTasksOpen(projectResponse.data.pending_tasks);
//           console.log(filteredProjectData);
//           setProjectData(filteredProjectData);
//         } else {
//           const hierarchyResponse = await axios.get(
//             `${GET_TEAM_HIERARCHY}/${data.user_info.userIndex}`
//           );
//           setTeamHierarchy(hierarchyResponse.data);

//           const [taskResponse, projectResponse] = await Promise.all([
//             axios.get(FILTER_TASKS_DASHBOARD_DATA_URL, {
//               params: {
//                 section_name: filterSectionName,
//                 start_date: filterStartDate,
//                 end_date: filterEndDate,
//                 priority: filterPriority,
//                 pmo: filterPmo,
//               },
//             }),
//             axios.get(FILTER_DASHBOARD_DATA_URL, {
//               params: {
//                 section_name: filterSectionName,
//                 start_date: filterStartDate,
//                 end_date: filterEndDate,
//                 priority: filterPriority,
//                 pmo: filterPmo,
//               },
//             }),
//           ]);
//           const filteredTaskData = taskResponse.data;
//           //console.log(taskResponse);
//           //console.log(projectResponse.data)
//           setTaskData(filteredTaskData);
//           const filteredProjectData = projectResponse.data.projectlist;
//           setProjectNumber(projectResponse.data.total_projects);
//           setInProgressProjects(projectResponse.data.project_in_progress);
//           setTasksOpen(projectResponse.data.pending_tasks);
//           console.log(filteredProjectData);
//           setProjectData(filteredProjectData);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     filterDashboardData();
//     // const filterDashboardProjectData = async () => {
//     //   try {
//     //     const projectResponse = await axios.get(FILTER_DASHBOARD_DATA_URL, {
//     //       params: {
//     //         project_type: filterProjectType,
//     //         project_subtype: filterProjectSubtype,
//     //         project_template: filterProjectTemplate,
//     //         project_platform: filterProjectPlatform,
//     //       },
//     //     });
//     //     const filteredProjectData = projectResponse.data;
//     //     setProjectNumber(response.data.total_projects);
//     //     setInProgressProjects(response.data.project_in_progress);
//     //     setTasksOpen(response.data.pending_tasks);
//     //     console.log(filteredProjectData);
//     //     setProjectData(filteredProjectData);
//     //   } catch (err) {
//     //     console.error(err);
//     //   }
//     // };
//     // filterDashboardProjectData();
//   }, [
//     filterProjectPlatform,
//     filterProjectSubtype,
//     filterProjectTemplate,
//     filterProjectType,
//     filterDashboardTask,
//     filterEndDate,
//     filterStartDate,
//     filterPriority,
//     filterPmo,
//     filterSectionName,
//     //activeTab,
//   ]);

//   const handlefilterProjectTypeChange = (e) => {
//     setfilterProjectType(e.target.value);
//   };
//   const handlefilterProjectPlatformChange = (e) => {
//     setfilterProjectPlatform(e.target.value);
//   };
//   const handlefilterProjectSubtypeChange = (e) => {
//     setfilterProjectSubtype(e.target.value);
//   };
//   const handlefilterProjectTemplateChange = (e) => {
//     setfilterProjectTemplate(e.target.value);
//   };
//   const handleFilterDashboardTasks = (e) => {
//     setFilterDashboardTask(e.target.value);
//   };

//   const handleFilterStartDateChange = (e) => {
//     setFilterStartDate(e.target.value);
//   };
//   const handleFilterEndDateChange = (e) => {
//     setFilterEndDate(e.target.value);
//   };

//   const handleSectionNameChange = (e) => {
//     setFilterSectionName(e.target.value);
//   };

//   const handlePriorityChange = (e) => {
//     setFilterPriority(e.target.value);
//   };

//   const handlePmoChange = (e) => {
//     setFilterPmo(e.target.value);
//   };

//   // const removeFilters = () => {
//   //   //setfilterProjectSubtype();
//   //   setfilterProjectSubtype("Select Project Sub Type");
//   //   //console.log(filterProjectSubtype);
//   //   setfilterProjectPlatform("Select Project Platform");
//   //   //console.log(filterProjectPlatform);
//   //   setfilterProjectTemplate("All Projects");
//   //   //console.log(filterProjectTemplate);
//   //   // setfilterProjectType();
//   //   setfilterProjectType("Select Project Type");

//   //   console.log(filterProjectType);
//   //   if (activeTab === "tasks") {
//   //     setFilterDashboardTask("Next 7 Days");
//   //   }
//   //   setRemoveFilterFlag(true);
//   // };
//   return forKmc ? (
//     <form>
//       <div className="flex flex-row justify-between m-5 gap-3">
//         <select
//           name="filterProjectTemplate"
//           className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-double"
//           value={filterProjectTemplate}
//           onChange={handlefilterProjectTemplateChange}
//         >
//           <option name="all" selected>
//             All Projects
//           </option>
//           <option name="major">Major</option>
//           <option name="minor">Minor</option>
//         </select>

//         <select
//           name="filterProjectType"
//           className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//           defaultValue={filterProjectType}
//           value={filterProjectType}
//           onChange={handlefilterProjectTypeChange}
//         >
//           <option name="" selected hidden>
//             Select Project Type
//           </option>
//           <option name="newProducts">New Products</option>
//           <option name="currentProducts">Current Products</option>
//         </select>
//         <select
//           name="filterProjectSubtype"
//           className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//           onChange={handlefilterProjectSubtypeChange}
//           value={filterProjectSubtype}
//         >
//           <option name="" selected hidden>
//             Select Project Sub Type
//           </option>
//           {filterProjectType === "New Products" && (
//             <>
//               <option name="newModel">New Model</option>
//               <option name="variantUpgrade">Variant Upgrade</option>
//             </>
//           )}

//           {filterProjectType === "Current Products" && (
//             <>
//               <option name="4M">4M</option>
//               <option name="CPI">CPI</option>
//               <option name="FSC">FSC</option>
//               <option name="VE">VE</option>
//             </>
//           )}
//         </select>
//         <select
//           name="filterProjectPlatform"
//           className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//           onChange={handlefilterProjectPlatformChange}
//           value={filterProjectPlatform}
//         >
//           <option name="" selected hidden>
//             Select Project Platform
//           </option>
//           <option name="farmtrac">Farmtrac</option>
//           <option name="powertrac">Powertrac</option>
//           <option name="compact">Compact</option>
//           <option name="exports - New >50HP">{`Exports - New >50HP`}</option>
//           <option name="ftNets">FT NETS</option>
//           <option name="bt5">BT 5</option>
//           <option name="bs5">BS 5</option>
//           <option name="eab">EAB</option>
//           <option name="newEV">New EV</option>
//         </select>

//         {/* {activeTab == "tasks" ? (
//       <select
//         name="filterProjectTask"
//         className="rounded-xl h-auto border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//         onChange={handleFilterDashboardTasks}
//       > */}
//         {/* <option name="" disabled selected hidden>
//           Filter Tasks
//         </option> */}
//         {/* <option name="next7Days" selected>
//           Next 7 Days
//         </option>
//         <option name="next30Days">Next 30 Days</option>
//         <option name="last30Days">Last 30 Days</option>
//       </select>
//     ) : (
//       <></>
//     )} */}
//         {/* <div className="items-center content-center" onClick={removeFilters}>
//       <XMarkIcon className="w-4 h-4" />
//     </div> */}
//       </div>
//       <div className="flex flex-row justify-between m-5 gap-5">
//         <div className="flex flex-row ml-1">
//           <label className="w-32 content-center font-bold text-sm">
//             Start Date
//           </label>
//           <input
//             type="date"
//             placeholder="Start Date"
//             className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//             onChange={handleFilterStartDateChange}
//             value={filterStartDate}
//           />
//         </div>
//         <div className="flex flex-row ml-1">
//           <label className="w-32 content-center font-bold text-sm">
//             End Date
//           </label>
//           <input
//             type="date"
//             placeholder="End Date"
//             className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//             onChange={handleFilterEndDateChange}
//             value={filterEndDate}
//           />
//         </div>
//       </div>
//     </form>
//   ) : (
//     <form>
//       <div className="flex flex-row justify-between m-5 gap-3">
//         {(data.user_info.profile === "Head" || data.user_info.isAdmin) && (
//           <select
//             name="project_type"
//             className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-double"
//             // value={filterSectionName}
//             onChange={handleSectionNameChange}
//             // defaultValue={projectDetails?.project_type}
//             required
//           >
//             <option name="all" disabled selected hidden>
//               Select Section Name:
//             </option>
//             {/* <option></option> */}
//             <option name="oracle">Oracle</option>
//             <option name="business_application">Business Application</option>
//             <option name="power_bi">Power BI</option>
//             <option name="erp">ERP</option>
//             <option name="infra">Infra</option>
//           </select>
//         )}

//         {/* <div className="flex flex-wrap"> */}
//         {/* <label htmlFor="priority" className="w-2/3">
//             Priority:<span className="text-red-600"> *</span>
//           </label> */}
//         <select
//           name="priority"
//           className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-double"
//           // defaultValue={projectDetails?.priority}
//           onChange={handlePriorityChange}
//           // value={filterPriority}
//           required
//         >
//           <option name="" disabled selected hidden>
//             Select Priority:
//           </option>
//           <option name="medium">Medium</option>
//           <option name="high">High</option>
//           <option name="low">Low</option>
//         </select>
//         {/* </div> */}
//         <select
//           name="pmo"
//           className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-double"
//           // defaultValue={projectDetails?.pmo}
//           required
//           value={filterPmo}
//           onChange={(e) => handlePmoChange(e)}
//         >
//           <option key="" value="" selected disabled>
//             Select Project Manager
//           </option>
//           {teamHierarchy?.map((pmo) => (
//             <option key={pmo.userIndex} value={pmo.userIndex}>
//               {pmo.firstname}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="flex flex-row justify-between m-5 gap-5">
//         <div className="flex flex-row ml-1">
//           <label className="w-32 content-center font-bold text-sm">
//             Start Date
//           </label>
//           <input
//             type="date"
//             placeholder="Start Date"
//             className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//             onChange={handleFilterStartDateChange}
//             value={filterStartDate}
//           />
//         </div>
//         <div className="flex flex-row ml-1">
//           <label className="w-32 content-center font-bold text-sm">
//             End Date
//           </label>
//           <input
//             type="date"
//             placeholder="End Date"
//             className="rounded-xl w-4/5 border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//             onChange={handleFilterEndDateChange}
//             value={filterEndDate}
//           />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default FilterComponent;



import { MenuItem, TextField } from "@mui/material";
import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FILTER_DASHBOARD_DATA_URL,
  FILTER_TASKS_DASHBOARD_DATA_URL,
  GET_TEAM_HIERARCHY,
} from "@/URL";
import { Button } from "./ui/button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/AuthProvider";

const FilterComponent = ({
  activeTab,
  setProjectData,
  setTaskData,
  setProjectNumber,
  setInProgressProjects,
  setTasksOpen,
  forKmc,
}) => {
  const [filterProjectType, setfilterProjectType] = useState();
  const [filterProjectSubtype, setfilterProjectSubtype] = useState();
  const [filterProjectTemplate, setfilterProjectTemplate] =
    useState("All Projects");
  const [filterProjectPlatform, setfilterProjectPlatform] = useState();

  const [filterDashboardTask, setFilterDashboardTask] = useState();
  const [filterStartDate, setFilterStartDate] = useState();
  const [filterEndDate, setFilterEndDate] = useState();
  const [removeFilterFlag, setRemoveFilterFlag] = useState(false);
  const [teamHierarchy, setTeamHierarchy] = useState([]);

  const [filterSectionName, setFilterSectionName] = useState("all");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterPmo, setFilterPmo] = useState("");

  const { data } = useAuth();
  
  useEffect(() => {
    const filterDashboardData = async () => {
      try {
        if (forKmc) {
          const [taskResponse, projectResponse] = await Promise.all([
            axios.get(FILTER_TASKS_DASHBOARD_DATA_URL, {
              params: {
                project_type: filterProjectType,
                project_subtype: filterProjectSubtype,
                project_template: filterProjectTemplate,
                project_platform: filterProjectPlatform,
                start_date: filterStartDate,
                end_date: filterEndDate,
              },
            }),
            axios.get(FILTER_DASHBOARD_DATA_URL, {
              params: {
                project_type: filterProjectType,
                project_subtype: filterProjectSubtype,
                project_template: filterProjectTemplate,
                project_platform: filterProjectPlatform,
                start_date: filterStartDate,
                end_date: filterEndDate,
              },
            }),
          ]);
          const filteredTaskData = taskResponse.data;
          setTaskData(filteredTaskData);
          const filteredProjectData = projectResponse.data.projectlist;
          setProjectNumber(projectResponse.data.total_projects);
          setInProgressProjects(projectResponse.data.project_in_progress);
          setTasksOpen(projectResponse.data.pending_tasks);
          console.log(filteredProjectData);
          setProjectData(filteredProjectData);
        } else {
          const hierarchyResponse = await axios.get(
            `${GET_TEAM_HIERARCHY}/${data.user_info.userIndex}`
          );
          setTeamHierarchy(hierarchyResponse.data);

          const [taskResponse, projectResponse] = await Promise.all([
            axios.get(FILTER_TASKS_DASHBOARD_DATA_URL, {
              params: {
                section_name: filterSectionName,
                start_date: filterStartDate,
                end_date: filterEndDate,
                priority: filterPriority,
                pmo: filterPmo,
              },
            }),
            axios.get(FILTER_DASHBOARD_DATA_URL, {
              params: {
                section_name: filterSectionName,
                start_date: filterStartDate,
                end_date: filterEndDate,
                priority: filterPriority,
                pmo: filterPmo,
              },
            }),
          ]);
          const filteredTaskData = taskResponse.data;
          setTaskData(filteredTaskData);
          const filteredProjectData = projectResponse.data.projectlist;
          setProjectNumber(projectResponse.data.total_projects);
          setInProgressProjects(projectResponse.data.project_in_progress);
          setTasksOpen(projectResponse.data.pending_tasks);
          console.log(filteredProjectData);
          setProjectData(filteredProjectData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    filterDashboardData();
  }, [
    filterProjectPlatform,
    filterProjectSubtype,
    filterProjectTemplate,
    filterProjectType,
    filterDashboardTask,
    filterEndDate,
    filterStartDate,
    filterPriority,
    filterPmo,
    filterSectionName,
  ]);

  const handlefilterProjectTypeChange = (e) => {
    setfilterProjectType(e.target.value);
  };
  const handlefilterProjectPlatformChange = (e) => {
    setfilterProjectPlatform(e.target.value);
  };
  const handlefilterProjectSubtypeChange = (e) => {
    setfilterProjectSubtype(e.target.value);
  };
  const handlefilterProjectTemplateChange = (e) => {
    setfilterProjectTemplate(e.target.value);
  };
  const handleFilterDashboardTasks = (e) => {
    setFilterDashboardTask(e.target.value);
  };

  const handleFilterStartDateChange = (e) => {
    setFilterStartDate(e.target.value);
  };
  const handleFilterEndDateChange = (e) => {
    setFilterEndDate(e.target.value);
  };

  const handleSectionNameChange = (e) => {
    setFilterSectionName(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handlePmoChange = (e) => {
    setFilterPmo(e.target.value);
  };

  return forKmc ? (
    <div className="bg-white rounded-2xl mb-6">
      <div className="space-y-6">
        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Project Template
            </label>
            <select
              name="filterProjectTemplate"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              value={filterProjectTemplate}
              onChange={handlefilterProjectTemplateChange}
            >
              <option value="All Projects">All Projects</option>
              <option value="major">Major</option>
              <option value="minor">Minor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Project Type
            </label>
            <select
              name="filterProjectType"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              value={filterProjectType || ""}
              onChange={handlefilterProjectTypeChange}
            >
              <option value="" disabled>
                Select Project Type
              </option>
              <option value="New Products">New Products</option>
              <option value="Current Products">Current Products</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Project Sub Type
            </label>
            <select
              name="filterProjectSubtype"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              onChange={handlefilterProjectSubtypeChange}
              value={filterProjectSubtype || ""}
            >
              <option value="" disabled>
                Select Project Sub Type
              </option>
              {filterProjectType === "New Products" && (
                <>
                  <option value="newModel">New Model</option>
                  <option value="variantUpgrade">Variant Upgrade</option>
                </>
              )}
              {filterProjectType === "Current Products" && (
                <>
                  <option value="4M">4M</option>
                  <option value="CPI">CPI</option>
                  <option value="FSC">FSC</option>
                  <option value="VE">VE</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Project Platform
            </label>
            <select
              name="filterProjectPlatform"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              onChange={handlefilterProjectPlatformChange}
              value={filterProjectPlatform || ""}
            >
              <option value="" disabled>
                Select Project Platform
              </option>
              <option value="farmtrac">Farmtrac</option>
              <option value="powertrac">Powertrac</option>
              <option value="compact">Compact</option>
              <option value="exports - New >50HP">Exports - New &gt;50HP</option>
              <option value="ftNets">FT NETS</option>
              <option value="bt5">BT 5</option>
              <option value="bs5">BS 5</option>
              <option value="eab">EAB</option>
              <option value="newEV">New EV</option>
            </select>
          </div>
        </div>

        {/* Date Range Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              onChange={handleFilterStartDateChange}
              value={filterStartDate || ""}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              onChange={handleFilterEndDateChange}
              value={filterEndDate || ""}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-2xl mb-6">
      <div className="space-y-6">
        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data.user_info.profile === "Head" || data.user_info.isAdmin) && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Section Name 
              </label>
              <select
                name="project_type"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                onChange={handleSectionNameChange}
                required
              >
                <option value="" disabled selected>
                  Select Section Name
                </option>
                <option value="oracle">Oracle</option>
                <option value="business_application">Business Application</option>
                <option value="power_bi">Power BI</option>
                <option value="erp">ERP</option>
                <option value="infra">Infra</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Priority 
            </label>
            <select
              name="priority"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              onChange={handlePriorityChange}
              required
            >
              <option value="" disabled selected>
                Select Priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Project Manager
            </label>
            <select
              name="pmo"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              required
              value={filterPmo}
              onChange={handlePmoChange}
            >
              <option value="" disabled>
                Select Project Manager
              </option>
              {teamHierarchy?.map((pmo) => (
                <option key={pmo.userIndex} value={pmo.userIndex}>
                  {pmo.firstname}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Range Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              onChange={handleFilterStartDateChange}
              value={filterStartDate || ""}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
              onChange={handleFilterEndDateChange}
              value={filterEndDate || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;