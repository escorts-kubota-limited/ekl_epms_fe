// import { Button } from "@/Components/ui/button";
// import React, { useState, useMemo, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { PencilSquareIcon } from "@heroicons/react/24/solid";
// import ProjectDetails from "../../Components/ProjectDetails";
// import TaskListForm from "../../Components/TaskListForm";
// import {
//   GET_PROJECT_DATA_URL,
//   UPDATE_PROJECT_DATA_URL,
//   USER_LIST_URL,
//   GET_APPROVAL_HISTORY,
//   GET_RESPONSIBILITIES_LIST,
// } from "@/URL";
// import axios, { Axios } from "axios";
// import TaskTable from "../../Components/TaskTable";
// // import ProjectForm from "../../Components/ProjectForm";
// import { Trigger } from "@radix-ui/react-dialog";
// import { useAuth } from "@/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/Components/ui/dialog";
// import ShowApprovalHistory from "@/Components/ShowApprovalHistory";
// import ProjectDetails_IT from "../IT/ProjectDetails_IT";

// const IndividualProjectDetails = () => {
//   const { data } = useAuth();
//   const [isAdmin, setIsAdmin] = useState(data.user_info.isAdmin);

//   const location = useLocation();
//   // console.log((location))
//   const { rowData } = location.state || {};
//   const [projectType, setProjectType] = useState(rowData?.project_type);
//   const [projectTemplate, setProjectTemplate] = useState();
//   // rowData.project_template
//   const [onProjectEdit, setOnProjectEdit] = useState(false);
//   const [onTaskEdit, setOnTaskEdit] = useState(false);
//   const [taskDetails, setTaskDetails] = useState([]);
//   const [projectDetails, setProjectDetails] = useState();
//   const [updatedProjectDetails, setUpdatedProjectDetails] = useState({});
//   // const [updatedTaskDetails, setUpdatedTaskDetails] = useState([]);
//   // const [updatedDetails, setUpdatedDetails] = useState({});
//   const [userList, setUserList] = useState([]);
//   const [userResponsibilityList, setUserResponsibilityList] = useState([]);
//   const [teamResponsibility, setTeamResponsibility] = useState({});
//   const [history, setHistory] = useState([]);
//   const [updateFlag, setUpdateFlag] = useState(false);
//   const navigate = useNavigate();

//   // const demoRoles = [
//   //   {hasAccess:}
//   // ]

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           response,
//           userListData,
//           approvalHistory,
//           userResponsibilityData,
//         ] = await Promise.all([
//           axios.get(`${GET_PROJECT_DATA_URL}/${rowData.project_id}`),
//           axios.get(USER_LIST_URL),
//           axios.get(`${GET_APPROVAL_HISTORY}/${rowData.project_id}`),
//           // axios.get(`${GET_RESPONSIBILITIES_LIST}/${rowData.project_template}`),
//           // axios.get(  )
//         ]);
//         const resData = response.data;
//         setTaskDetails(resData.tasks);
//         setProjectDetails(resData.project);
//         setTeamResponsibility(resData.teamList);
//         // console.log(userResponsibilityData.data)
//         // setUserResponsibilityList
//         // setProjectTemplate(projectDetails.project_template)
//         setUpdateFlag(false);
//         setIsAdmin(data.user_info.isAdmin);
//         setHistory(() => [...approvalHistory.data]);
//         const userListDataResponse = userListData.data;
//         setUserList(userListDataResponse);
//         // console.log(resData)
//         setTeamList(resData.teamList);
//       } catch (err) {
//         console.error(err);
//       }

//       // if
//       try {
//         const response = await axios.get(
//           `${GET_RESPONSIBILITIES_LIST}/${rowData.project_template}`
//         );
//         // console.log(response.data)
//         const resData = response.data;
//         console.log(resData);
//         setUserResponsibilityList(() => [...resData]);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(projectDetails);
//   const handleProjectEdit = () => {
//     setOnProjectEdit(!onProjectEdit);
//     console.log(onProjectEdit);
//   };
//   const handleTaskEdit = () => {
//     setOnTaskEdit(!onTaskEdit);
//   };

//   const handleUpdateTaskDetails = () => {
//     const updateData = async () => {
//       try {
//         const response = await axios.put(UPDATE_PROJECT_DATA_URL, {
//           project: projectDetails,
//           tasks: taskDetails,
//           // teamList: teamList,
//         });
//         if (response === "") {
//         }
//         alert("Details have been updated");
//         navigate("/dashboard");
//       } catch (err) {
//         console.error(err);
//         alert("Error in updating details");
//       }
//     };

//     updateData();
//   };

//   const handleViewHistory = () => {};
//   const handleSaveTasks = (formData) => {
//     //e.preventDefault();
//     //const formData= new FormData(e.currentTarget)
//     //console.log(formData);
//   };
//   const pendingApprovalAction = () => {};
//   console.log(projectDetails);

//   // debugger
//   return (
//     <>
//       <div className="grid grid-cols-[80%_20%] mt-4">
//         <div className="">
//           {/* {console.log(teamList)} */}
//           {console.log(teamResponsibility)}

//           {data.user_info.isAdmin ? (
//             <div className="flex-col">
//               <ProjectDetails_IT
//                 showProjectCode={true}
//                 userResponsibilityList={userResponsibilityList}
//                 setUserResponsibilityList={setUserResponsibilityList}
//                 projectDetails={projectDetails}
//                 setProjectDetails={setProjectDetails}
//                 setOnProjectEdit={setOnProjectEdit}
//                 setUpdatedProjectDetails={setUpdatedProjectDetails}
//                 setUpdateFlag={setUpdateFlag}
//                 onProjectEdit={onProjectEdit}
//                 forUpdateTask={true}
//                 userList={userList}
//                 teamList={teamList}
//                 setTeamList={setTeamList}
//                 setUserList={setUserList}
//               />
//               {/* <ProjectForm
//                   setProjectDetails={setProjectDetails}
//                   projectDetails={projectDetails}
//                   setActiveTab={setActiveTab}
//                   setUserList={setUserList}
//                   userList={userList}
//                   userResponsibilityList={userResponsibilityList}
//                   setUserResponsibilityList={setUserResponsibilityList}
//                   teamList={teamList}
//                   setTeamList={setTeamList}
//                 /> */}
//             </div>
//           ) : data.user_info.division === "Escorts Agri Machinery" ? (
//             <ProjectDetails
//               showProjectCode={true}
//               userResponsibilityList={userResponsibilityList}
//               setUserResponsibilityList={setUserResponsibilityList}
//               projectDetails={projectDetails}
//               setProjectDetails={setProjectDetails}
//               setOnProjectEdit={setOnProjectEdit}
//               setUpdatedProjectDetails={setUpdatedProjectDetails}
//               setUpdateFlag={setUpdateFlag}
//               onProjectEdit={onProjectEdit}
//               forUpdateTask={true}
//               userList={userList}
//               teamResponsibility={teamResponsibility}
//               setTeamResponsibility={setTeamResponsibility}
//               setUserList={setUserList}
//               forKmc={true}
//             />
//           ) : data.user_info.division === "Corporate" ? (
//             <ProjectDetails_IT
//               showProjectCode={true}
//               userResponsibilityList={userResponsibilityList}
//               setUserResponsibilityList={setUserResponsibilityList}
//               projectDetails={projectDetails}
//               setProjectDetails={setProjectDetails}
//               setOnProjectEdit={setOnProjectEdit}
//               setUpdatedProjectDetails={setUpdatedProjectDetails}
//               setUpdateFlag={setUpdateFlag}
//               onProjectEdit={onProjectEdit}
//               forUpdateTask={true}
//               userList={userList}
//               // teamList={teamList}
//               // setTeamList={setTeamList}
//               setUserList={setUserList}
//             />
//           ) : (
//             <>
//               <ProjectDetails_IT
//                 showProjectCode={true}
//                 userResponsibilityList={userResponsibilityList}
//                 setUserResponsibilityList={setUserResponsibilityList}
//                 projectDetails={projectDetails}
//                 setProjectDetails={setProjectDetails}
//                 setOnProjectEdit={setOnProjectEdit}
//                 setUpdatedProjectDetails={setUpdatedProjectDetails}
//                 setUpdateFlag={setUpdateFlag}
//                 onProjectEdit={onProjectEdit}
//                 forUpdateTask={true}
//                 userList={userList}
//                 // teamList={teamList}
//                 // setTeamList={setTeamList}
//                 setUserList={setUserList}
//               />
//             </>
//           )}

//           {console.log(userList)}

//           {/* <ProjectDetails
//             projectDetails={projectDetails}
//             setUserList={setUserList}
//             userList={userList}
//             userResponsibilityList={userResponsibilityList}
//             setUserResponsibilityList={setUserResponsibilityList}
//             teamList={teamList}
//             setTeamList={setTeamList}
//           /> */}
//         </div>
//         {true ? (
//           <div className="flex flex-col items-center content-center">
//             <Button
//               type="primary"
//               className="bg-red-theme w-4/5 rounded-lg mt-10  border-spacing-2 font-serif "
//               onClick={handleProjectEdit}
//             >
//               Edit Project
//               <PencilSquareIcon className="mx-2 h-4 w-4" />
//             </Button>
//             {/* <Button
//               type="primary"
//               className="bg-red-theme w-4/5 rounded-lg mt-10 font-serif "
//               onClick={handleTaskEdit}
//             >
//               Edit Tasks
//               <PencilSquareIcon className="mx-2 h-4 w-4" />
//             </Button> */}
//             {projectDetails?.approval_status !== "Pending" ? (
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button
//                     type="primary"
//                     className="bg-gray-500 w-4/5 rounded-lg mt-10  font-serif text-center content-center h-10 text-black"
//                     // onClick={pendingApprovalAction}
//                   >
//                     {projectDetails?.project_status}
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-2xl bg-white">
//                   <DialogHeader className="">Pending Approvals</DialogHeader>
//                   <ShowApprovalHistory history={history} />
//                 </DialogContent>
//               </Dialog>
//             ) : (
//               <div
//                 type="primary"
//                 className="bg-green-500 w-4/5 rounded-lg mt-10  font-serif text-center content-center h-10 text-black"
//               >
//                 {projectDetails?.approval_status}
//               </div>
//             )}

//             {/* {onProjectEdit ? (
//             <Button
//               type="primary"
//               className="bg-teal-theme w-4/5 rounded-lg mt-10 border-black border-4 border-spacing-2 font-serif text-black"
//               onClick={handleUpdateProjectDetails}
//             >
//               Update Project
//             </Button>
//           ) : (
//             <></>
//           )} */}
//             {updateFlag ? (
//               <Button
//                 type="primary"
//                 className="bg-teal-theme w-4/5 rounded-lg mt-10 font-serif text-black"
//                 onClick={handleUpdateTaskDetails}
//               >
//                 Update Details
//               </Button>
//             ) : (
//               <></>
//             )}
//             {/* <Button
//               type="primary"
//               className="bg-green-600 w-4/5 rounded-lg mt-10 border-black border-4 border-spacing-2 font-serif "
//               onClick={handleViewHistory}
//             >
//               View History
//             </Button> */}
//           </div>
//         ) : (
//           <></>
//         )}{" "}
//       </div>
//       <div>
//         {/* {onTaskEdit ? (
//           <TaskListForm
//             projectTaskDetails={taskDetails}
//             projectTemplate={projectDetails?.project_template}
//             setProjectTaskDetails={setTaskDetails}
//             setOnTaskEdit={setOnTaskEdit}
//             forUpdateTask={true}
//             setUpdateFlag={setUpdateFlag}
//             userList={userList}
//             setTaskDetails={setTaskDetails}
//           />
//         ) : ( */}
//         <TaskTable
//           forProjectDetails={true}
//           data={taskDetails}
//           template={projectDetails?.project_template}
//           setUpdateFlag={setUpdateFlag}
//           setTaskDetails={setTaskDetails}
//           forKMC={
//             data.user_info.division === "Escorts Agri Machinery" ? true : false
//           }
//           taskDetails={taskDetails}
//         />
//         {/* )} */}
//       </div>
//     </>
//   );
// };

// export default IndividualProjectDetails;

import { Button } from "@/Components/ui/button";
import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  PencilSquareIcon,
  ArrowLeftIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import ProjectDetails from "../../Components/ProjectDetails";
import TaskListForm from "../../Components/TaskListForm";
import {
  GET_PROJECT_DATA_URL,
  UPDATE_PROJECT_DATA_URL,
  USER_LIST_URL,
  GET_APPROVAL_HISTORY,
  GET_RESPONSIBILITIES_LIST,
  GET_PROJECT_PRR,
} from "@/URL";
import axios, { Axios } from "axios";
import TaskTable from "../../Components/TaskTable";
import { Trigger } from "@radix-ui/react-dialog";
import { useAuth } from "@/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import ShowApprovalHistory from "@/Components/ShowApprovalHistory";
import ProjectDetails_IT from "../IT/ProjectDetails_IT";

const IndividualProjectDetails = () => {
  const { data } = useAuth();
  const [isAdmin, setIsAdmin] = useState(data.user_info.isAdmin);

  const location = useLocation();
  const { rowData } = location.state || {};
  const [projectType, setProjectType] = useState(rowData?.project_type);
  const [projectTemplate, setProjectTemplate] = useState();
  const [onProjectEdit, setOnProjectEdit] = useState(false);
  const [onTaskEdit, setOnTaskEdit] = useState(false);
  const [taskDetails, setTaskDetails] = useState([]);
  const [projectDetails, setProjectDetails] = useState();
  const [updatedProjectDetails, setUpdatedProjectDetails] = useState({});
  const [userList, setUserList] = useState([]);
  const [userResponsibilityList, setUserResponsibilityList] = useState([]);
  const [teamResponsibility, setTeamResponsibility] = useState({});
  const [history, setHistory] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectPrrList, setProjectPrrList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectCode = rowData.project_code;
        const encoded = encodeURIComponent(projectCode);
        const [response, userListData, approvalHistory, prrData] =
          await Promise.all([
            axios.get(`${GET_PROJECT_DATA_URL}/${rowData.project_id}`),
            axios.get(USER_LIST_URL),
            axios.get(`${GET_APPROVAL_HISTORY}/${rowData.project_id}`),
            axios.get(`${GET_PROJECT_PRR}?project_code=${encoded}`),
          ]);
        const resData = response.data;
        setTaskDetails(resData.tasks);
        setProjectDetails(resData.project);
        setTeamResponsibility(resData.teamList);
        setUpdateFlag(false);
        setIsAdmin(data.user_info.isAdmin);
        setHistory(() => [...approvalHistory.data]);
        setProjectPrrList(() => [...prrData.data]);
        const userListDataResponse = userListData.data;
        setUserList(userListDataResponse);
        setTeamList(resData.teamList);
      } catch (err) {
        console.error(err);
      }

      try {
        const response = await axios.get(
          `${GET_RESPONSIBILITIES_LIST}/${rowData.project_template}`
        );
        const resData = response.data;
        console.log(resData);
        setUserResponsibilityList(() => [...resData]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProjectEdit = () => {
    setOnProjectEdit(!onProjectEdit);
    console.log(onProjectEdit);
  };

  const handleTaskEdit = () => {
    setOnTaskEdit(!onTaskEdit);
  };

  const handleUpdateTaskDetails = () => {
    const updateData = async () => {
      try {
        const response = await axios.put(UPDATE_PROJECT_DATA_URL, {
          project: projectDetails,
          tasks: taskDetails,
        });
        if (response === "") {
        }
        alert("Details have been updated");
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        alert("Error in updating details");
      }
    };

    updateData();
  };

  const handleViewHistory = () => {};
  const handleSaveTasks = (formData) => {};
  const pendingApprovalAction = () => {};

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <CheckCircleIcon className="w-5 h-5" />;
      case "pending":
        return <ClockIcon className="w-5 h-5" />;
      case "rejected":
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  const renderProjectComponent = () => {
    if (data.user_info.isAdmin) {
      return (
        <ProjectDetails_IT
          showProjectCode={true}
          userResponsibilityList={userResponsibilityList}
          setUserResponsibilityList={setUserResponsibilityList}
          projectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
          setOnProjectEdit={setOnProjectEdit}
          setUpdatedProjectDetails={setUpdatedProjectDetails}
          setUpdateFlag={setUpdateFlag}
          onProjectEdit={onProjectEdit}
          forUpdateTask={true}
          userList={userList}
          teamList={teamList}
          setTeamList={setTeamList}
          setUserList={setUserList}
        />
      );
    } else if (data.user_info.division === "Escorts Agri Machinery") {
      return (
        <ProjectDetails
          showProjectCode={true}
          userResponsibilityList={userResponsibilityList}
          setUserResponsibilityList={setUserResponsibilityList}
          projectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
          setOnProjectEdit={setOnProjectEdit}
          setUpdatedProjectDetails={setUpdatedProjectDetails}
          setUpdateFlag={setUpdateFlag}
          onProjectEdit={onProjectEdit}
          forUpdateTask={true}
          userList={userList}
          teamResponsibility={teamResponsibility}
          setTeamResponsibility={setTeamResponsibility}
          setUserList={setUserList}
          forKmc={true}
        />
      );
    } else {
      return (
        <ProjectDetails_IT
          showProjectCode={true}
          userResponsibilityList={userResponsibilityList}
          setUserResponsibilityList={setUserResponsibilityList}
          projectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
          setOnProjectEdit={setOnProjectEdit}
          setUpdatedProjectDetails={setUpdatedProjectDetails}
          setUpdateFlag={setUpdateFlag}
          onProjectEdit={onProjectEdit}
          forUpdateTask={true}
          userList={userList}
          setUserList={setUserList}
        />
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 my-4 rounded-lg m-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {projectDetails?.project_name || "Project Details"}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  projectDetails?.project_status
                )}`}
              >
                {getStatusIcon(projectDetails?.project_status)}
                <span className="ml-2">
                  {projectDetails?.project_status || "Unknown"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-2">
          {/* Main Content */}
          <div className="xl:col-span-3">{renderProjectComponent()}</div>

          {/* Sidebar */}
          <div className="xl:col-span-1 -mt-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4 sticky top-8">
              <h3 className="text-lg text-gray-900 dark:text-white mb-6 text-center font-bold">
                Actions
              </h3>

              {/* Edit Project Button */}
              <Button
                onClick={handleProjectEdit}
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg px-2 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <PencilSquareIcon className="w-5 h-5 mr-2" />
                {onProjectEdit ? "Cancel Edit" : "Edit Project"}
              </Button>

              {/* Project Status */}
              {projectDetails?.project_status !== "Pending" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full justify-center font-medium rounded-lg px-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg ${getStatusColor(
                        projectDetails?.project_status
                      )}`}
                    >
                      <EyeIcon className="w-5 h-5 mr-2" />
                      View Status
                      {/* {projectDetails?.project_status} */}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-white dark:bg-gray-800 max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        Approval History
                      </DialogTitle>
                    </DialogHeader>
                    <ShowApprovalHistory history={history} />
                  </DialogContent>
                </Dialog>
              ) : (
                <div
                  className={`w-full text-center font-medium rounded-lg px-4 py-3 ${getStatusColor(
                    projectDetails?.project_status
                  )}`}
                >
                  <div className="flex items-center justify-center">
                    {getStatusIcon(projectDetails?.project_status)}
                    <span className="ml-2">
                      {projectDetails?.project_status}
                    </span>
                  </div>
                </div>
              )}

              {/* Update Details Button */}
              {updateFlag && (
                <Button
                  onClick={handleUpdateTaskDetails}
                  className="w-full justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg px-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Update Details
                </Button>
              )}
              {data.user_info.division === "Escorts Agri Machinery" && (
                <Button
                  
                  className="w-full justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg px-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  PRR Details
                </Button>
              )}

              {/* Project Info Cards */}
              {/* <div className="pt-6 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Type
                  </h4>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {projectDetails?.project_type || "Not specified"}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    projectDetails?.priority === 'high' ? 'bg-red-100 text-red-800' :
                    projectDetails?.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    projectDetails?.priority === 'low' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {projectDetails?.priority || "Not set"}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </h4>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {projectDetails?.start_date || "Not set"}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tasks
                  </h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {taskDetails?.length || 0}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total tasks
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {/* <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Project Tasks
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage and track project tasks and milestones
              </p>
            </div> */}
            {/* <div className="p-6"> */}
            <TaskTable
              forProjectDetails={true}
              data={taskDetails}
              template={projectDetails?.project_template}
              setUpdateFlag={setUpdateFlag}
              setTaskDetails={setTaskDetails}
              forKMC={data.user_info.division === "Escorts Agri Machinery"}
              taskDetails={taskDetails}
              editFlag={onProjectEdit}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProjectDetails;
