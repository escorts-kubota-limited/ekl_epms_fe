import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import CalendarComponent from "../../Components/CalenderComponent";
import { Card } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  ArrowRightCircleIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  PencilSquareIcon,
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
  // const [open, setOpen] = useState(false);
  // const [projectPlatform, setProjectPlatform] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();

  const { data } = useAuth();
  const handleTabChange = (e) => {
    setActiveTab(e);
  };
  // useEffect(() => {
  //   const fetchProjectListData = async () => {
  //     try {
  //       const response = await axios.get(FILTER_DASHBOARD_DATA_URL);
  //       //const taskResponse = await axios.get(FILTER_TASKS_DASHBOARD_DATA_URL);
  //       const projectList = response.data.projectlist;
  //       setProjectNumber(response.data.total_projects);
  //       setInProgressProjects(response.data.project_in_progress);
  //       setTasksOpen(response.data.pending_tasks);
  //       setProjectData(projectList);
  //       console.log(response.data)
  //       console.log(projectData)

  //       //setTaskData(taskList)
  //       //console.log(projectList);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchProjectListData();
  // }, []);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const projectColumns = useMemo(() => [
    {
      header: "Project Platform",
      accessorKey: "project_platform",
      meta: {
        type: "text",
      },
      // cell: info => info.getValue(),
    },
    {
      header: "PMO",
      accessorKey: "pmo",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    {
      header: "Project Code",
      accessorKey: "project_code",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    {
      header: "Project Name",
      accessorKey: "project_name",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    {
      header: "Current Phase",
      accessorKey: "current_phase",
      meta: {
        type: "text",
      },
      //cell: NavCell,
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

      //cell: NavCell,
    },
    {
      header: " ",
      accessorKey: "",
      meta: {
        type: "button",
      },

      //cell: NavCell,
    },
    // {
    //   id: "edit",
    //   cell: EditCell,
    // },
  ]);

  // const taskData = []//useMemo(() => mTaskData, []);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const taskColumns = useMemo(() => [
    {
      header: "Project",
      accessorKey: "project_name",
      meta: {
        type: "text",
      },
      //id:"tbl_project"
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
      // cell: TableCell,
    },
    {
      header: "Revised Date",
      accessorKey: "revised_date",
      meta: {
        type: "date",
      },
      // cell: TableCell,
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
      // cell: TableCell,
    },
    {
      header: "Responsibility",
      accessorKey: "responsibility",
      meta: {
        type: "text",
      },
      // cell: TableCell,
    },
    {
      header: " ",
      accessorKey: "",
      meta: {
        type: "button",
      },

      //cell: NavCell,
    },
    // {
    //   id: "edit",
    //   cell: EditCell,
    // },
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
      // cell: ({ getValue }) => {
      //   const dateValue = new Date(getValue());
      //   if (!isNaN(dateValue)) {
      //     return format(new Date(dateValue), "dd/MM/yyyy");
      //   }
      //   return "";
      // },
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
      // cell: BaseCell,
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
      // cell: BaseCell,
    },
    {
      header: " ",
      accessorKey: "",
      meta: {
        type: "button",
      },

      //   //cell: NavCell,
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

      //   //cell: NavCell,
    },

    // {
    // }
  ]);

  const now = new Date();
  const eventsL = [
    {
      id: 1,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      // start: now,
      // end: now
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
  return (
    <div className="flex flex-col">
      <div className="container mt-4">
        <div className="grid grid-cols-3">
          <div className="flex flex-col m-4">
            <Card className="flex flex-col h-36 bg-teal-theme bg-opacity-60">
              <div className="grid grid-cols-2 h-28 m-3">
                <div className="flex flex-col font-semibold">
                  <div className="text-3xl">{projectNumber}</div>
                  <div className="pt-3 text-xl">All Projects</div>
                </div>
                <div className="w-28 h-28 ml-8">
                  <FolderIcon />
                </div>
              </div>
            </Card>
            <Card className="order-last h-10 content-center text-center">
              <nav className="">
                <NavLink>
                  <div className="flex flex-wrap justify-center">
                    More Info{" "}
                    <ArrowRightCircleIcon className="w-6 h-6 mt-0.5 ml-2 content-center" />
                  </div>
                </NavLink>
              </nav>
            </Card>
          </div>

          <div className="flex flex-col m-4">
            <Card className="flex flex-col h-36 bg-teal-theme bg-opacity-60">
              <div className="grid grid-cols-2 h-28 m-3">
                <div className="flex flex-col font-semibold">
                  <div className="text-3xl">{tasksOpen}</div>
                  <div className="pt-3 text-xl">Pending Tasks</div>
                </div>
                <div className="w-28 h-28 ml-8">
                  <PencilSquareIcon />
                </div>
              </div>
            </Card>
            <Card className="order-last h-10 content-center text-center">
              <nav className="">
                <NavLink>
                  <div className="flex flex-wrap justify-center">
                    More Info{" "}
                    <ArrowRightCircleIcon className="w-6 h-6 mt-0.5 ml-2 content-center" />
                  </div>
                </NavLink>
              </nav>
            </Card>
          </div>
          <div className="flex flex-col m-4">
            <Card className="flex flex-col h-36 bg-teal-theme bg-opacity-60">
              <div className="grid grid-cols-2 h-28 m-3">
                <div className="flex flex-col font-semibold">
                  <div className="text-3xl">{inProgressProjects}</div>
                  <div className="pt-3 text-xl">In-Progress Projects</div>
                </div>
                <div className="w-28 h-28 ml-8">
                  <ClipboardDocumentListIcon />
                </div>
              </div>
            </Card>
            <Card className="order-last h-10 content-center text-center">
              <nav className="">
                <NavLink>
                  <div className="flex flex-wrap justify-center">
                    More Info{" "}
                    <ArrowRightCircleIcon className="w-6 h-6 mt-0.5 ml-2 content-center" />
                  </div>
                </NavLink>
              </nav>
            </Card>
          </div>
        </div>

        {data.user_info.isAdmin ? (
          <FilterComponent
            activeTab={activeTab}
            setProjectData={setProjectData}
            setTaskData={setTaskData}
            setInProgressProjects={setInProgressProjects}
            setTasksOpen={setTasksOpen}
            setProjectNumber={setProjectNumber}
            // forKmc={true}
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
        <div className="m-5">
          <Tabs
            defaultValue="projects"
            className=""
            onValueChange={handleTabChange}
          >
            <div className="flex justify-between ">
              <TabsList className="bg-teal-theme bg-opacity-70 rounded-xl">
                <TabsTrigger
                  value="projects"
                  className="text-black m-4 font-semibold rounded-xl"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="tasks"
                  className="text-black m-4 font-semibold rounded-xl"
                >
                  Tasks
                </TabsTrigger>
                {/* <TabsTrigger
                  value="calender"
                  className="text-black m-4 font-semibold rounded-xl"
                >
                  Calender
                </TabsTrigger> */}
              </TabsList>
              {/* {activeTab == "tasks" ? (
                <select
                  name="projectType"
                  className="rounded-xl h-auto border-teal-theme bg-slate-100 border-opacity-60 border-doubleS"
                  onChange={handleProjectTypeChange}
                >
                  <option name="" disabled selected hidden>
                    Filter Tasks
                  </option>
                  <option name="next7Days">Next 7 Days</option>
                  <option name="next30Days">Next 30 Days</option>
                  <option name="last30Days">Last 30 Days</option>
                </select>
              ) : (
                <></>
              )} */}
              {
                //needs conditions
              }
              <div className="">
                {data.user_info.division === "Escorts Agri Machinery" && (
                  <Button
                    type="primary"
                    className="bg-red-theme bg-opacity-80 w-44 rounded-xl text-black text-xl"
                    onClick={() => {
                      navigate("/generateprr");
                    }}
                  >
                    Generate PRR
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="projects">
              {/* {console.log(projectData,"#####", projectColumns)} */}
              {data.user_info.isAdmin ? (
                <div className="flex-col">
                  <DataTableForLog
                    tData={projectData}
                    tColumns={generalProjectColumns}
                    rowClick={true}
                    forProject={true}
                    events={events}
                    setEvents={setEvents}
                  />
                </div>
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
                <>
                  <DataTableForLog
                    tData={projectData}
                    tColumns={generalProjectColumns}
                    rowClick={true}
                    forProject={true}
                    events={events}
                    setEvents={setEvents}
                  />
                </>
              )}
              {console.log(projectData)}
              {/* <DataTableForLog
                tData={projectData}
                tColumns={projectColumns}
                rowClick={true}
                forProject={true}
                events={events}
                setEvents={setEvents}
              /> */}
              {/* <CalendarComponent eventsList={events} /> */}
            </TabsContent>
            <TabsContent value="tasks">
              {data.user_info.isAdmin ? (
                <div className="flex-col">
                  <DataTableForLog
                    tData={taskData}
                    tColumns={generalTaskColumns}
                    events={events}
                    setEvents={setEvents}
                  />
                </div>
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
                <>
                  <DataTableForLog
                    tData={taskData}
                    tColumns={generalTaskColumns}
                    events={events}
                    setEvents={setEvents}
                  />
                </>
              )}
            </TabsContent>
            {/* <CalendarComponent eventsList={events} /> */}

            {/* <TabsContent value="calender">
              <div className="col-md-12  mx-auto py-4">
                <CalendarComponent />
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
