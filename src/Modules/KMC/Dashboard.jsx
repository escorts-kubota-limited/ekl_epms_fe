// import React, { useState, useEffect } from "react";
// import { Button } from "@/Components/ui/button";
// import CalendarComponent from "../../Components/CalenderComponent";
// import { Card } from "@/Components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
// import {
//   ArrowRightCircleIcon,
//   ClipboardDocumentListIcon,
//   FolderIcon,
//   PencilSquareIcon,
// } from "@heroicons/react/24/solid";
// import { NavLink } from "react-router-dom";
// import { useMemo } from "react";
// import { DataTable, EditCell, NavCell, BaseCell } from "@/Components/DataTable";
// import { useNavigate } from "react-router-dom";
// import {
//   ALL_TASKS_URL,
//   FILTER_DASHBOARD_DATA_URL,
//   FILTER_TASKS_DASHBOARD_DATA_URL,
//   PROJECT_LIST_URL,
// } from "@/URL";
// import axios from "axios";
// import FilterComponent from "@/Components/FilterComponent";
// import { DataTableForLog } from "@/Components/DataTableForLog";
// import { useAuth } from "@/AuthProvider";
// import { format } from "date-fns";

// const Dashboard = () => {
//   const [projectNumber, setProjectNumber] = useState();
//   const [inProgressProjects, setInProgressProjects] = useState();
//   const [tasksOpen, setTasksOpen] = useState();
//   const [activeTab, setActiveTab] = useState("");
//   // const [open, setOpen] = useState(false);
//   // const [projectPlatform, setProjectPlatform] = useState("");
//   const [projectData, setProjectData] = useState([]);
//   const [taskData, setTaskData] = useState([]);
//   const navigate = useNavigate();

//   const { data } = useAuth();
//   const handleTabChange = (e) => {
//     setActiveTab(e);
//   };
//   // useEffect(() => {
//   //   const fetchProjectListData = async () => {
//   //     try {
//   //       const response = await axios.get(FILTER_DASHBOARD_DATA_URL);
//   //       //const taskResponse = await axios.get(FILTER_TASKS_DASHBOARD_DATA_URL);
//   //       const projectList = response.data.projectlist;
//   //       setProjectNumber(response.data.total_projects);
//   //       setInProgressProjects(response.data.project_in_progress);
//   //       setTasksOpen(response.data.pending_tasks);
//   //       setProjectData(projectList);
//   //       console.log(response.data)
//   //       console.log(projectData)

//   //       //setTaskData(taskList)
//   //       //console.log(projectList);
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //   };
//   //   fetchProjectListData();
//   // }, []);

//   /**@type import('@tanstack/react-table').ColumnDef@<any>*/
//   const projectColumns = useMemo(() => [
//     {
//       header: "Project Platform",
//       accessorKey: "project_platform",
//       meta: {
//         type: "text",
//       },
//       // cell: info => info.getValue(),
//     },
//     {
//       header: "PMO",
//       accessorKey: "pmo",
//       meta: {
//         type: "text",
//       },
//       //cell: NavCell,
//     },
//     {
//       header: "Project Code",
//       accessorKey: "project_code",
//       meta: {
//         type: "text",
//       },
//       //cell: NavCell,
//     },
//     {
//       header: "Project Name",
//       accessorKey: "project_name",
//       meta: {
//         type: "text",
//       },
//       //cell: NavCell,
//     },
//     {
//       header: "Current Phase",
//       accessorKey: "current_phase",
//       meta: {
//         type: "text",
//       },
//       //cell: NavCell,
//     },
//     {
//       header: "Project Status",
//       accessorKey: "project_status",
//       meta: {
//         type: "select",
//         options: [
//           { value: "active", label: "Active" },
//           { value: "hold", label: "Hold" },
//           { value: "drop", label: "Drop" },
//           { value: "implemented", label: "Implemented" },
//         ],
//       },

//       //cell: NavCell,
//     },
//     {
//       header: " ",
//       accessorKey: "",
//       meta: {
//         type: "button",
//       },

//       //cell: NavCell,
//     },
//     // {
//     //   id: "edit",
//     //   cell: EditCell,
//     // },
//   ]);

//   // const taskData = []//useMemo(() => mTaskData, []);

//   /**@type import('@tanstack/react-table').ColumnDef@<any>*/
//   const taskColumns = useMemo(() => [
//     {
//       header: "Project",
//       accessorKey: "project_name",
//       meta: {
//         type: "text",
//       },
//       //id:"tbl_project"
//     },
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
//       accessorKey: "plan_date",
//       meta: {
//         type: "date",
//       },
//       // cell: TableCell,
//     },
//     {
//       header: "Revised Date",
//       accessorKey: "revised_date",
//       meta: {
//         type: "date",
//       },
//       // cell: TableCell,
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
//       // cell: TableCell,
//     },
//     {
//       header: "Responsibility",
//       accessorKey: "responsibility",
//       meta: {
//         type: "text",
//       },
//       // cell: TableCell,
//     },
//     {
//       header: " ",
//       accessorKey: "",
//       meta: {
//         type: "button",
//       },

//       //cell: NavCell,
//     },
//     // {
//     //   id: "edit",
//     //   cell: EditCell,
//     // },
//   ]);

//   /**@type import('@tanstack/react-table').ColumnDef@<any>*/
//   const generalTaskColumns = useMemo(() => [
//     {
//       header: "Task Name",
//       accessorKey: "task_name",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//     },
//     {
//       header: "Project Name",
//       accessorKey: "project_name",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//     },
//     {
//       header: "Start Date",
//       accessorKey: "plan_date",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//     },
//     {
//       header: "End Date",
//       accessorKey: "actual_date",
//       meta: {
//         type: "date",
//         editable: false,
//       },
//       // cell: ({ getValue }) => {
//       //   const dateValue = new Date(getValue());
//       //   if (!isNaN(dateValue)) {
//       //     return format(new Date(dateValue), "dd/MM/yyyy");
//       //   }
//       //   return "";
//       // },
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
//         editable: false,
//       },
//       // cell: BaseCell,
//     },
//     {
//       header: "Priority",
//       accessorKey: "task_priority",
//       meta: {
//         type: "text",
//       },
//     },
//     {
//       header: "Assigned To",
//       accessorKey: "user_responsibility_name",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//       // cell: BaseCell,
//     },
//     {
//       header: " ",
//       accessorKey: "",
//       meta: {
//         type: "button",
//       },

//       //   //cell: NavCell,
//     },
//   ]);

//   /**@type import('@tanstack/react-table').ColumnDef@<any>*/
//   const generalProjectColumns = useMemo(() => [
//     {
//       header: "Project Name",
//       accessorKey: "project_name",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//     },
//     {
//       header: "Project Status",
//       accessorKey: "project_status",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//     },
//     {
//       header: "Project Manager",
//       accessorKey: "pmo",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//     },
//     {
//       header: "Start Date",
//       accessorKey: "start_date",
//       meta: {
//         type: "text",
//         editable: false,
//       },
//     },
//     {
//       header: "End Date",
//       accessorKey: "projected_date",
//       meta: {
//         type: "date",
//         editable: false,
//       },
//     },

//     {
//       header: " ",
//       accessorKey: "",
//       meta: {
//         type: "button",
//       },

//       //   //cell: NavCell,
//     },

//     // {
//     // }
//   ]);

//   const now = new Date();
//   const eventsL = [
//     {
//       id: 1,
//       title: "Today",
//       start: new Date(new Date().setHours(new Date().getHours() - 3)),
//       // start: now,
//       // end: now
//       end: new Date(new Date().setHours(new Date().getHours() + 3)),
//     },
//     {
//       id: 2,
//       title: "Point in Time Event",
//       start: now,
//       end: now,
//     },
//     {
//       id: 3,
//       title: "Point in Time Event",
//       start: now,
//       end: now,
//     },
//   ];
//   const [events, setEvents] = useState([...eventsL]);
//   return (
//     <div className="flex flex-col">
//       <div className="container mt-4">
//         <div className="grid grid-cols-3">
//           <div className="flex flex-col m-4">
//             <Card className="flex flex-col h-36 bg-teal-theme bg-opacity-60">
//               <div className="grid grid-cols-2 h-28 m-3">
//                 <div className="flex flex-col font-semibold">
//                   <div className="text-3xl">{projectNumber}</div>
//                   <div className="pt-3 text-xl">All Projects</div>
//                 </div>
//                 <div className="w-28 h-28 ml-8">
//                   <FolderIcon />
//                 </div>
//               </div>
//             </Card>
//             <Card className="order-last h-10 content-center text-center">
//               <nav className="">
//                 <NavLink>
//                   <div className="flex flex-wrap justify-center">
//                     More Info{" "}
//                     <ArrowRightCircleIcon className="w-6 h-6 mt-0.5 ml-2 content-center" />
//                   </div>
//                 </NavLink>
//               </nav>
//             </Card>
//           </div>

//           <div className="flex flex-col m-4">
//             <Card className="flex flex-col h-36 bg-teal-theme bg-opacity-60">
//               <div className="grid grid-cols-2 h-28 m-3">
//                 <div className="flex flex-col font-semibold">
//                   <div className="text-3xl">{tasksOpen}</div>
//                   <div className="pt-3 text-xl">Pending Tasks</div>
//                 </div>
//                 <div className="w-28 h-28 ml-8">
//                   <PencilSquareIcon />
//                 </div>
//               </div>
//             </Card>
//             <Card className="order-last h-10 content-center text-center">
//               <nav className="">
//                 <NavLink>
//                   <div className="flex flex-wrap justify-center">
//                     More Info{" "}
//                     <ArrowRightCircleIcon className="w-6 h-6 mt-0.5 ml-2 content-center" />
//                   </div>
//                 </NavLink>
//               </nav>
//             </Card>
//           </div>
//           <div className="flex flex-col m-4">
//             <Card className="flex flex-col h-36 bg-teal-theme bg-opacity-60">
//               <div className="grid grid-cols-2 h-28 m-3">
//                 <div className="flex flex-col font-semibold">
//                   <div className="text-3xl">{inProgressProjects}</div>
//                   <div className="pt-3 text-xl">In-Progress Projects</div>
//                 </div>
//                 <div className="w-28 h-28 ml-8">
//                   <ClipboardDocumentListIcon />
//                 </div>
//               </div>
//             </Card>
//             <Card className="order-last h-10 content-center text-center">
//               <nav className="">
//                 <NavLink>
//                   <div className="flex flex-wrap justify-center">
//                     More Info{" "}
//                     <ArrowRightCircleIcon className="w-6 h-6 mt-0.5 ml-2 content-center" />
//                   </div>
//                 </NavLink>
//               </nav>
//             </Card>
//           </div>
//         </div>

//         {data.user_info.isAdmin ? (
//           <FilterComponent
//             activeTab={activeTab}
//             setProjectData={setProjectData}
//             setTaskData={setTaskData}
//             setInProgressProjects={setInProgressProjects}
//             setTasksOpen={setTasksOpen}
//             setProjectNumber={setProjectNumber}
//             // forKmc={true}
//           />
//         ) : data.user_info.division === "Escorts Agri Machinery" ? (
//           <FilterComponent
//             activeTab={activeTab}
//             setProjectData={setProjectData}
//             setTaskData={setTaskData}
//             setInProgressProjects={setInProgressProjects}
//             setTasksOpen={setTasksOpen}
//             setProjectNumber={setProjectNumber}
//             forKmc={true}
//           />
//         ) : data.user_info.division === "Corporate" ? (
//           <FilterComponent
//             activeTab={activeTab}
//             setProjectData={setProjectData}
//             setTaskData={setTaskData}
//             setInProgressProjects={setInProgressProjects}
//             setTasksOpen={setTasksOpen}
//             setProjectNumber={setProjectNumber}
//           />
//         ) : (
//           <FilterComponent
//             activeTab={activeTab}
//             setProjectData={setProjectData}
//             setTaskData={setTaskData}
//             setInProgressProjects={setInProgressProjects}
//             setTasksOpen={setTasksOpen}
//             setProjectNumber={setProjectNumber}
//           />
//         )}
//         <div className="m-5">
//           <Tabs
//             defaultValue="projects"
//             className=""
//             onValueChange={handleTabChange}
//           >
//             <div className="flex justify-between ">
//               <TabsList className="bg-teal-theme bg-opacity-70 rounded-xl">
//                 <TabsTrigger
//                   value="projects"
//                   className="text-black m-4 font-semibold rounded-xl"
//                 >
//                   Projects
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="tasks"
//                   className="text-black m-4 font-semibold rounded-xl"
//                 >
//                   Tasks
//                 </TabsTrigger>
//                 {/* <TabsTrigger
//                   value="calender"
//                   className="text-black m-4 font-semibold rounded-xl"
//                 >
//                   Calender
//                 </TabsTrigger> */}
//               </TabsList>
//               {/* {activeTab == "tasks" ? (
//                 <select
//                   name="projectType"
//                   className="rounded-xl h-auto border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
//                   onChange={handleProjectTypeChange}
//                 >
//                   <option name="" disabled selected hidden>
//                     Filter Tasks
//                   </option>
//                   <option name="next7Days">Next 7 Days</option>
//                   <option name="next30Days">Next 30 Days</option>
//                   <option name="last30Days">Last 30 Days</option>
//                 </select>
//               ) : (
//                 <></>
//               )} */}
//               {
//                 //needs conditions
//               }
//               <div className="">
//                 {data.user_info.division === "Escorts Agri Machinery" && (
//                   <Button
//                     type="primary"
//                     className="bg-red-theme bg-opacity-80 w-44 rounded-xl text-black text-xl"
//                     onClick={() => {
//                       navigate("/generateprr");
//                     }}
//                   >
//                     Generate PRR
//                   </Button>
//                 )}
//               </div>
//             </div>

//             <TabsContent value="projects">
//               {/* {console.log(projectData,"#####", projectColumns)} */}
//               {data.user_info.isAdmin ? (
//                 <div className="flex-col">
//                   <DataTableForLog
//                     tData={projectData}
//                     tColumns={generalProjectColumns}
//                     rowClick={true}
//                     forProject={true}
//                     events={events}
//                     setEvents={setEvents}
//                   />
//                 </div>
//               ) : data.user_info.division === "Escorts Agri Machinery" ? (
//                 <DataTableForLog
//                   tData={projectData}
//                   tColumns={projectColumns}
//                   rowClick={true}
//                   forProject={true}
//                   events={events}
//                   setEvents={setEvents}
//                 />
//               ) : data.user_info.division === "Corporate" ? (
//                 <DataTableForLog
//                   tData={projectData}
//                   tColumns={generalProjectColumns}
//                   rowClick={true}
//                   forProject={true}
//                   events={events}
//                   setEvents={setEvents}
//                 />
//               ) : (
//                 <>
//                   <DataTableForLog
//                     tData={projectData}
//                     tColumns={generalProjectColumns}
//                     rowClick={true}
//                     forProject={true}
//                     events={events}
//                     setEvents={setEvents}
//                   />
//                 </>
//               )}
//               {console.log(projectData)}
//               {/* <DataTableForLog
//                 tData={projectData}
//                 tColumns={projectColumns}
//                 rowClick={true}
//                 forProject={true}
//                 events={events}
//                 setEvents={setEvents}
//               /> */}
//               {/* <CalendarComponent eventsList={events} /> */}
//             </TabsContent>
//             <TabsContent value="tasks">
//               {data.user_info.isAdmin ? (
//                 <div className="flex-col">
//                   <DataTableForLog
//                     tData={taskData}
//                     tColumns={generalTaskColumns}
//                     events={events}
//                     setEvents={setEvents}
//                   />
//                 </div>
//               ) : data.user_info.division === "Escorts Agri Machinery" ? (
//                 <DataTableForLog
//                   tData={taskData}
//                   tColumns={taskColumns}
//                   events={events}
//                   setEvents={setEvents}
//                 />
//               ) : data.user_info.division === "Corporate" ? (
//                 <DataTableForLog
//                   tData={taskData}
//                   tColumns={generalTaskColumns}
//                   events={events}
//                   setEvents={setEvents}
//                 />
//               ) : (
//                 <>
//                   <DataTableForLog
//                     tData={taskData}
//                     tColumns={generalTaskColumns}
//                     events={events}
//                     setEvents={setEvents}
//                   />
//                 </>
//               )}
//             </TabsContent>
//             {/* <CalendarComponent eventsList={events} /> */}

//             {/* <TabsContent value="calender">
//               <div className="col-md-12  mx-auto py-4">
//                 <CalendarComponent />
//               </div>
//             </TabsContent> */}
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import CalendarComponent from "../../Components/CalenderComponent";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  ArrowRightCircleIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  PencilSquareIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { DataTable, EditCell, NavCell, BaseCell } from "@/Components/DataTable";
import { useNavigate } from "react-router-dom";
import {
  ALL_TASKS_URL,
  FILTER_DASHBOARD_DATA_URL,
  FILTER_TASKS_DASHBOARD_DATA_URL,
  PROJECT_LIST_URL,
} from "@/URL";
import axios from "axios";
import FilterComponent from "@/Components/FilterComponent";
import { DataTableForLog } from "@/Components/DataTableForLog";
import { useAuth } from "@/AuthProvider";
import { format } from "date-fns";

const Dashboard = () => {
  const [projectNumber, setProjectNumber] = useState();
  const [inProgressProjects, setInProgressProjects] = useState();
  const [tasksOpen, setTasksOpen] = useState();
  const [activeTab, setActiveTab] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();

  const { data } = useAuth();
  
  const handleTabChange = (e) => {
    setActiveTab(e);
  };

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const projectColumns = useMemo(() => [
    {
      header: "Project Platform",
      accessorKey: "project_platform",
      meta: {
        type: "text",
      },
    },
    {
      header: "PMO",
      accessorKey: "pmo",
      meta: {
        type: "text",
      },
    },
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
      header: "Current Phase",
      accessorKey: "current_phase",
      meta: {
        type: "text",
      },
    },
    {
      header: "Project Status",
      accessorKey: "project_status",
      meta: {
        type: "select",
        options: [
          { value: "active", label: "Active" },
          { value: "hold", label: "Hold" },
          { value: "drop", label: "Drop" },
          { value: "implemented", label: "Implemented" },
        ],
      },
    },
    {
      header: " ",
      accessorKey: "",
      meta: {
        type: "button",
      },
    },
  ]);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const taskColumns = useMemo(() => [
    {
      header: "Project",
      accessorKey: "project_name",
      meta: {
        type: "text",
      },
    },
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
    },
    {
      header: "Revised Date",
      accessorKey: "revised_date",
      meta: {
        type: "date",
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
      },
    },
    {
      header: "Responsibility",
      accessorKey: "responsibility",
      meta: {
        type: "text",
      },
    },
    {
      header: " ",
      accessorKey: "",
      meta: {
        type: "button",
      },
    },
  ]);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const generalTaskColumns = useMemo(() => [
    {
      header: "Task Name",
      accessorKey: "task_name",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "Project Name",
      accessorKey: "project_name",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "Start Date",
      accessorKey: "plan_date",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "End Date",
      accessorKey: "actual_date",
      meta: {
        type: "date",
        editable: false,
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
        editable: false,
      },
    },
    {
      header: "Priority",
      accessorKey: "task_priority",
      meta: {
        type: "text",
      },
    },
    {
      header: "Assigned To",
      accessorKey: "user_responsibility_name",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: " ",
      accessorKey: "",
      meta: {
        type: "button",
      },
    },
  ]);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const generalProjectColumns = useMemo(() => [
    {
      header: "Project Name",
      accessorKey: "project_name",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "Project Status",
      accessorKey: "project_status",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "Project Manager",
      accessorKey: "pmo",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "Start Date",
      accessorKey: "start_date",
      meta: {
        type: "text",
        editable: false,
      },
    },
    {
      header: "End Date",
      accessorKey: "projected_date",
      meta: {
        type: "date",
        editable: false,
      },
    },
    {
      header: " ",
      accessorKey: "",
      meta: {
        type: "button",
      },
    },
  ]);

  const now = new Date();
  const eventsL = [
    {
      id: 1,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
      id: 2,
      title: "Point in Time Event",
      start: now,
      end: now,
    },
    {
      id: 3,
      title: "Point in Time Event",
      start: now,
      end: now,
    },
  ];
  const [events, setEvents] = useState([...eventsL]);

  // Stats card component for better reusability
  const StatsCard = ({ title, value, icon: Icon, gradient, href }) => (
    <div className="group">
      <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${gradient}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white/90 uppercase tracking-wide">
                {title}
              </p>
              <p className="text-4xl font-bold text-white">
                {value || 0}
              </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-white/10 animate-pulse"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 translate-y-8 -translate-x-8"></div>
        </CardContent>
        
        <div className="px-6 pb-4">
          <NavLink to={href} className="group-hover:text-white/90 transition-colors">
            <div className="flex items-center text-white/80 text-sm font-medium hover:text-white transition-colors">
              View Details
              <ArrowRightCircleIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </NavLink>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 ">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
              {/* <p className="text-sm text-slate-600 mt-1">Welcome back! Here's what's happening with your projects.</p> */}
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <CalendarDaysIcon className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="All Projects"
            value={projectNumber}
            icon={FolderIcon}
            gradient="bg-gradient-to-br from-teal-400 to-teal-500"
            href="/projects/projectlist"
          />
          <StatsCard
            title="Pending Tasks"
            value={tasksOpen}
            icon={PencilSquareIcon}
            gradient="bg-gradient-to-br from-amber-300 to-orange-400"
            href="/dashboard"
          />
          <StatsCard
            title="In-Progress Projects"
            value={inProgressProjects}
            icon={ClipboardDocumentListIcon}
            gradient="bg-gradient-to-br from-blue-400 to-indigo-500"
            href="/dashboard"
          />
        </div>

        {/* Filter Component */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              {data.user_info.isAdmin ? (
                <FilterComponent
                  activeTab={activeTab}
                  setProjectData={setProjectData}
                  setTaskData={setTaskData}
                  setInProgressProjects={setInProgressProjects}
                  setTasksOpen={setTasksOpen}
                  setProjectNumber={setProjectNumber}
                />
              ) : data.user_info.division === "Escorts Agri Machinery" ? (
                <FilterComponent
                  activeTab={activeTab}
                  setProjectData={setProjectData}
                  setTaskData={setTaskData}
                  setInProgressProjects={setInProgressProjects}
                  setTasksOpen={setTasksOpen}
                  setProjectNumber={setProjectNumber}
                  forKmc={true}
                />
              ) : data.user_info.division === "Corporate" ? (
                <FilterComponent
                  activeTab={activeTab}
                  setProjectData={setProjectData}
                  setTaskData={setTaskData}
                  setInProgressProjects={setInProgressProjects}
                  setTasksOpen={setTasksOpen}
                  setProjectNumber={setProjectNumber}
                />
              ) : (
                <FilterComponent
                  activeTab={activeTab}
                  setProjectData={setProjectData}
                  setTaskData={setTaskData}
                  setInProgressProjects={setInProgressProjects}
                  setTasksOpen={setTasksOpen}
                  setProjectNumber={setProjectNumber}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs
              defaultValue="projects"
              className="w-full"
              onValueChange={handleTabChange}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200/50 p-1 rounded-xl shadow-sm">
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm text-slate-600 font-medium px-6 py-2.5 rounded-lg transition-all duration-200"
                  >
                    <FolderIcon className="w-4 h-4 mr-2" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="tasks"
                    className="data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm text-slate-600 font-medium px-6 py-2.5 rounded-lg transition-all duration-200"
                  >
                    <ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
                    Tasks
                  </TabsTrigger>
                </TabsList>

                {data.user_info.division === "Escorts Agri Machinery" && (
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    onClick={() => {
                      navigate("/generateprr");
                    }}
                  >
                    <ChartBarIcon className="w-4 h-4 mr-2" />
                    Generate PRR
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <TabsContent value="projects" className="mt-0">
                  <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
                    {data.user_info.isAdmin ? (
                      <DataTableForLog
                        tData={projectData}
                        tColumns={generalProjectColumns}
                        rowClick={true}
                        forProject={true}
                        events={events}
                        setEvents={setEvents}
                      />
                    ) : data.user_info.division === "Escorts Agri Machinery" ? (
                      <DataTableForLog
                        tData={projectData}
                        tColumns={projectColumns}
                        rowClick={true}
                        forProject={true}
                        events={events}
                        setEvents={setEvents}
                      />
                    ) : data.user_info.division === "Corporate" ? (
                      <DataTableForLog
                        tData={projectData}
                        tColumns={generalProjectColumns}
                        rowClick={true}
                        forProject={true}
                        events={events}
                        setEvents={setEvents}
                      />
                    ) : (
                      <DataTableForLog
                        tData={projectData}
                        tColumns={generalProjectColumns}
                        rowClick={true}
                        forProject={true}
                        events={events}
                        setEvents={setEvents}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tasks" className="mt-0">
                  <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
                    {data.user_info.isAdmin ? (
                      <DataTableForLog
                        tData={taskData}
                        tColumns={generalTaskColumns}
                        events={events}
                        setEvents={setEvents}
                      />
                    ) : data.user_info.division === "Escorts Agri Machinery" ? (
                      <DataTableForLog
                        tData={taskData}
                        tColumns={taskColumns}
                        events={events}
                        setEvents={setEvents}
                      />
                    ) : data.user_info.division === "Corporate" ? (
                      <DataTableForLog
                        tData={taskData}
                        tColumns={generalTaskColumns}
                        events={events}
                        setEvents={setEvents}
                      />
                    ) : (
                      <DataTableForLog
                        tData={taskData}
                        tColumns={generalTaskColumns}
                        events={events}
                        setEvents={setEvents}
                      />
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
