import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { ADD_PROJECT_URL, GET_DRAFT_DATA, GET_REQUESTED_FROM } from "@/URL";
import AddProjectPopup from "@/Components/AddProjectPopup";
import { Add } from "@mui/icons-material";
import Popup from "reactjs-popup";
import ProjectForm from "./ProjectForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import TaskListForm from "./TaskListForm";
import ProjectDetails from "./ProjectDetails";
import TaskTable from "./TaskTable";
import { useLocation, useNavigate } from "react-router-dom";
import TaskEntryForm from "@/Components/TaskEntryForm";
import ProjectForm_IT from "../Modules/IT/ProjectForm_IT";
import { useAuth } from "@/AuthProvider";
import TaskForm_IT from "../Modules/IT/TaskForm_IT";
import { EditTable } from "@/Components/EditTable";
import ProjectDetails_IT from "../Modules/IT/ProjectDetails_IT";
import ProjectDetailsForm from "@/Modules/IT/ProjectDetailsForm_IT";
import ProjectDetailsForm_KMC from "@/Modules/KMC/ProjectDetailsForm_KMC";
import ExpandableSubtaskTable from "./ExpandableSubtaskTable";
import GeneralTaskAddition from "./GeneralTaskAddition";
import TaskSummary from "./TaskSummary";
import ImportProjects from "@/pages/ImportPlan/ImportProjects";

// const demoUserList = [
//   {
//     user_id: 122,
//     username: "Atul Bhandari",
//   },
//   {
//     user_id: 126,
//     username: "Animesh Kumar",
//   },
//   {
//     user_id: 128,
//     username: "Pragati Sharma",
//   },
//   {
//     user_id: 131,
//     username: "Raju Kumar",
//   },
//   {
//     user_id: 136,
//     username: "Aditya",
//   },
//   {
//     user_id: 147,
//     username: "Lalit",
//   },
//   {
//     user_id: 160,
//     username: "Sudhanshu Gupta",
//   },
//   {
//     user_id: 170,
//     username: "Pooja Kumari",
//   },
//   {
//     user_id: 177,
//     username: "Tushar",
//   },
// ];

const CreateProject = ({
  forDraft = false,
  forEdit = false,
  forCreation = true,
}) => {
  const location = useLocation();
  let rowData = null;
  let draftData = null;
  let projData = null;
  if (forDraft && location.state) {
    rowData = location.state.rowData
      ? JSON.parse(location.state.rowData)
      : null;
    draftData = location.state.draftData
      ? JSON.parse(location.state.draftData)
      : null;
  }

  if (forEdit && location.state) {
    rowData = location.state.rowData
      ? JSON.parse(location.state.rowData)
      : null;
    projData = rowData;
  }
  // useEffect(() => {
  //   console.log(forEdit);
  //   if (forEdit) {
  //     setActiveTab("review_details");
  //   }
  // }, []);
  const [projectType, setProjectType] = useState("");
  const [projectTemplate, setProjectTemplate] = useState("");
  const [projectDetails, setProjectDetails] = useState(() => {
    if (forDraft && draftData) {
      return draftData.project;
    } else if (forEdit && projData) {
      return projData.project;
    }
    return {};
  });
  const [isProjectDetails, setIsProjectDetails] = useState(false);
  const [isProjectTaskDetails, setIsProjectTaskDetails] = useState(false);
  const [projectTaskDetails, setProjectTaskDetails] = useState(() => {
    if (forDraft && draftData) {
      return draftData.tasks;
    } else if (forEdit && projData) {
      return projData.tasks;
    }
    return [];
  });
  const [projectSubtaskDetails, setProjectSubtaskDetails] = useState(() => {
    if (forEdit && projData) {
      console.log(projData.subtasks);
      return projData.subtasks;
    }
    return [];
  });
  const [isProjectTemplate, setIsProjectTemplate] = useState(false);
  const [onEdit, setOnEdit] = useState(true);
  const [activeTab, setActiveTab] = useState(
    forEdit ? "review_details" : "project_details"
  );
  const [userList, setUserList] = useState();
  const [userResponsibilityList, setUserResponsibilityList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [teamResponsibility, setTeamResponsibility] = useState(() => {
    if (forDraft && draftData) {
      return draftData.teamList;
    }
    return {};
  });
  const [generalTeam, setGeneralTeam] = useState(() => {
    if (forEdit && projData) {
      return projData.teamList;
    }
    return [];
  });
  const [divisionList, setDivisionList] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [orgList, setOrgList] = useState([{ org_id: "EKL", org_name: "EKL" }]);
  const [draftId, setDraftId] = useState(() => {
    if (forDraft && draftData) {
      return draftData.project.draft_id;
    } else if (forEdit && projData) {
      return projData.project.project_id;
    }
    return "";
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useAuth();

  console.log(location.state);
  console.log(data.user_info);
  const setDraftDetails = () => {
    // setProjectDetails(()=>JSON.parse(draftData).tasks);
    // setProjectTaskDetails(()=>JSON.parse(draftData).tasks);
    // setTeamResponsibility(()=>JSON.parse(draftData).teamList);
  };

  useEffect(() => {
    getDivisonDeptList();
  }, []);

  const handleTabChange = (e) => {
    setActiveTab(e);
  };
  const navigate = useNavigate();

  // const getDraftData = async () => {
  //   try {
  //     const response = await axios.get(`${GET_DRAFT_DATA}/${JSON.parse(rowData).draft_id}`);
  //     // console.log(response.data);
  //     const draftData = response.data;
  //     setProjectDetails(draftData.project);
  //     setProjectTaskDetails(draftData.tasks);
  //     setTeamResponsibility(draftData.teamList);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  console.log(projectDetails, projectTaskDetails, teamResponsibility);

  // const refreshData = ()=>{
  //   getDraftData();
  // }

  //  useEffect(()=>{
  //    console.log("draft id at parent compoenent ",draftId);
  //    debugger;
  //   },[draftId]);

  const getDivisonDeptList = async () => {
    try {
      const response = await axios.get(GET_REQUESTED_FROM);
      console.log(response.data);
      setDivisionList(response.data.divisions);
      setDeptList(response.data.departments);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(divisionList, deptList);

  const handleProjectAddition = async () => {
    console.log(teamList);
    console.log(isProjectDetails + "##" + isProjectTaskDetails);
    if (projectDetails && projectTaskDetails) {
      // setProjectDetails((prev)=>({...prev,keyword:data.user_info.keyword}))
      // console.log(
      //   projectDetails,
      //   "########",
      //   projectTaskDetails,
      //   "33333333",
      //   teamList
      // );
      try {
        const res = await axios.post(`${ADD_PROJECT_URL}`, {
          project: projectDetails,
          tasks: projectTaskDetails,
          teamList: teamList,
          draft_id: draftId || "",
        });
        console.log(res);
        alert("New project is added !!");
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        alert("Error in adding new project");
      }
      // console.log(projectDetails, projectTaskDetails);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Tabs
          defaultValue="project_details"
          onValueChange={handleTabChange}
          value={activeTab}
        >
          {/* Header: Tabs + Button */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 pl-4 pr-4">
            <TabsList className="bg-teal-theme bg-opacity-70 rounded-xl flex-wrap content-center">
              <TabsTrigger
                value="project_details"
                className="text-black px-4 py-2 font-semibold rounded-xl"
              >
                Project Details
              </TabsTrigger>
              <TabsTrigger
                value="task_details"
                className="text-black px-4 py-2 font-semibold rounded-xl"
              >
                Task Details
              </TabsTrigger>
              <TabsTrigger
                value="review_details"
                className="text-black px-4 py-2 font-semibold rounded-xl"
              >
                Review Details
              </TabsTrigger>
            </TabsList>

            {/* Conditional Button */}
            <ImportProjects/>
            {activeTab === "review_details" && (
              <div className="flex justify-end w-full lg:w-auto">
                {data.user_info.division === "Corporate" ? (
                  <Button
                    type="button"
                    className="bg-green-500 bg-opacity-60 w-full lg:w-44 rounded-xl text-black text-lg border-2 border-black"
                    // onClick={handleProjectAddition}
                  >
                    Added To Inbox
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleProjectAddition}
                    className="bg-teal-theme bg-opacity-80 w-full lg:w-44 rounded-xl text-black text-lg border-2 border-black"
                  >
                    Add Project
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Tab: Project Details */}
          <TabsContent value="project_details">
            {data.user_info.isAdmin ? (
              <div className="flex flex-col">
                {/* Admin-specific forms commented */}
              </div>
            ) : data.user_info.division === "Escorts Agri Machinery" ? (
              <ProjectDetailsForm_KMC
                {...{
                  setProjectDetails,
                  projectDetails,
                  setActiveTab,
                  setUserList,
                  userList,
                  userResponsibilityList,
                  setUserResponsibilityList,
                  teamList,
                  setTeamList,
                  teamResponsibility,
                  setTeamResponsibility,
                  setDraftId,
                  draftId,
                }}
              />
            ) : data.user_info.division === "Corporate" ? (
              <ProjectDetailsForm
                {...{
                  setProjectDetails,
                  setActiveTab,
                  userResponsibilityList,
                  projectDetails,
                  setTeamList,
                  teamList,
                  setUserResponsibilityList,
                  teamResponsibility: generalTeam,
                  setTeamResponsibility: setGeneralTeam,
                  divisionList,
                  deptList,
                  orgList,
                  setDraftId,
                  draftId,
                }}
              />
            ) : (
              <ProjectForm_IT
                {...{
                  setProjectDetails,
                  setActiveTab,
                  userResponsibilityList,
                  projectDetails,
                  setTeamList,
                  teamList,
                  setUserResponsibilityList,
                  teamResponsibility: generalTeam,
                  setTeamResponsibility: setGeneralTeam,
                  divisionList,
                  deptList,
                  orgList,
                  setDraftId,
                  draftId,
                }}
              />
            )}
          </TabsContent>

          {/* Tab: Task Details */}
          <TabsContent value="task_details">
            <div className="p-4">
              {data.user_info.isAdmin ? (
                <>
                  <TaskForm_IT
                    {...{
                      setProjectTaskDetails: setIsProjectTaskDetails,
                      projectTaskDetails,
                      setActiveTab,
                      generalTeam,
                      projectDetails,
                      projectSubtaskDetails,
                      setProjectSubtaskDetails,
                    }}
                  />
                </>
              ) : data.user_info.division === "Escorts Agri Machinery" ? (
                <TaskEntryForm
                  {...{
                    projectTemplate: projectDetails?.project_template || "",
                    setProjectTaskDetails,
                    setActiveTab,
                    userList,
                    projectTaskDetails,
                    teamList: teamResponsibility,
                    projectDetails,
                    draftId,
                    responsibilityList: userResponsibilityList,
                  }}
                />
              ) : data.user_info.division === "Corporate" ? (
                <TaskForm_IT
                  {...{
                    setProjectTaskDetails,
                    projectTaskDetails,
                    setActiveTab,
                    generalTeam,
                    draftId,
                    projectDetails,
                    setProjectSubtaskDetails,
                    projectSubtaskDetails,
                  }}
                />
              ) : (
                <TaskForm_IT
                  {...{
                    setProjectTaskDetails,
                    projectTaskDetails,
                    setActiveTab,
                    generalTeam,
                    draftId,
                    projectDetails,
                  }}
                />
              )}
            </div>
          </TabsContent>

          {/* Tab: Review Details */}
          <TabsContent value="review_details">
            <div className="p-4 space-y-4">
              {data.user_info.isAdmin ? (
                <>
                  <ProjectDetails_IT
                    {...{
                      projectDetails,
                      setUserList,
                      userList,
                      userResponsibilityList,
                      setUserResponsibilityList,
                      teamList: generalTeam,
                      setTeamList: setGeneralTeam,
                    }}
                  />
                  <TaskTable
                    data={projectTaskDetails}
                    project_creation
                    forKMC={
                      data.user_info.division === "Escorts Agri Machinery"
                    }
                  />
                </>
              ) : data.user_info.division === "Escorts Agri Machinery" ? (
                <>
                  <ProjectDetails
                    {...{
                      projectDetails,
                      setUserList,
                      userList,
                      userResponsibilityList,
                      setUserResponsibilityList,
                      teamResponsibility,
                      setTeamList,
                      setTeamResponsibility: setTeamList,
                      forKmc: true,
                    }}
                  />
                  <TaskTable
                    data={projectTaskDetails}
                    template={projectDetails.project_template}
                    project_creation
                    forKMC={true}
                  />
                </>
              ) : data.user_info.division === "Corporate" ? (
                <>
                  <ProjectDetails_IT
                    {...{
                      projectDetails,
                      setUserList,
                      userList,
                      userResponsibilityList,
                      setUserResponsibilityList,
                      teamList,
                      setTeamList,
                    }}
                  />
                  <TaskSummary
                    tasks={projectTaskDetails}
                    subtasks={projectSubtaskDetails}
                  />
                </>
              ) : (
                <>
                  <ProjectDetails_IT
                    {...{
                      projectDetails,
                      setUserList,
                      userList,
                      userResponsibilityList,
                      setUserResponsibilityList,
                      teamList: generalTeam,
                      setTeamList: setGeneralTeam,
                    }}
                  />
                  <TaskTable
                    data={projectTaskDetails}
                    template={projectDetails.project_template}
                    project_creation
                    forKMC={
                      data.user_info.division === "Escorts Agri Machinery"
                    }
                  />
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CreateProject;
