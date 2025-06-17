// import React, { useEffect, useState } from "react";
// import { Button } from "@/Components/ui/button";
// // import ShowTeam from "./ShowTeam";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/Components/ui/dialog";
// // import SelectTeam from "./SelectTeam";

// function ProjectDetails_IT({
//   projectDetails,
//   setProjectDetails,
//   showProjectCode = false,
//   onProjectEdit = false,
//   setUpdatedProjectDetails,
//   setUpdateFlag,
//   forUpdateTask = false,
//   setOnProjectEdit,
//   userList,
//   showTeamList = false,
//   userResponsibilityList,
//   setUserResponsibilityList,
//   teamList,
//   setTeamList,
//   setUserList,
// }) {
//   console.log(projectDetails);
//   // const [updatedStartDate, setUpdatedStartDate] = useState(
//   //   projectDetails?.start_date
//   // );
//   // const [updatedProjectedDate, setUpdatedProjectedDate] = useState(
//   //   projectDetails?.projected_date
//   // );
//   // const [updatedPriority, setUpdatedPriority] = useState(
//   //   projectDetails?.priority
//   // );
//   // const [updatedResponsibility, setUpdatedResponsibility] = useState(
//   //   projectDetails?.pmo
//   // );

//   const handleUpdatedProjectData = (e) => {
//     e.preventDefault();
//     // const formData = new FormData(e.currentTarget);
//     const formData = new FormData(
//       document.getElementById("project_details_update")
//     );
//     const tempData = {};
//     // console.log(formData);
//     // for (let [key, value] of formData.entries()) {
//     //   tempData[key] = value;
//     // }
//     for (let [key, value] of formData.entries()) {
//       if (key === "pmo") {
//         const selectedPmo = userList.find(
//           ({ user_id }) => user_id.toString() === value
//         );
//         tempData["pmo_id"] = value;
//         value = selectedPmo.username;
//       }
//       console.log(key, value);
//       tempData[key] = value;
//     }
//     console.log(tempData);
//     setProjectDetails(() => ({ ...projectDetails, ...tempData }));
//     if (forUpdateTask) {
//       setOnProjectEdit(false);
//       setUpdateFlag(true);
//     }
//     console.log(projectDetails);
//     console.log(tempData);
//     alert("Project details have been saved");
//   };
//   return (
//     <div className="flex-col">
//       <form
//         id="project_details_update"
//         className=" grid grid-cols-3 gap-6 m-6"
//         onSubmit={handleUpdatedProjectData}
//       >
//         <div className="flex flex-wrap">
//           <label htmlFor="projectType" className="w-2/3">
//             Project Name:
//           </label>

//           <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//             {projectDetails?.project_name}
//           </div>
//         </div>
//         {/* <div className="flex flex-wrap">
//           <label htmlFor="projectSubType" className="w-2/3">
//             Project Sub Type:
//           </label>

//           <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//             {projectDetails?.project_subtype}
//           </div>
//         </div> */}
//         {/* {projectDetails?.project_type === "New Products" ? (
//           <div className="flex flex-col">
//             <label htmlFor="market" className="w-2/3">
//               Market
//             </label>

//             <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//               {projectDetails?.market}
//             </div>
//           </div>
//         ) : (
//           <></>
//         )} */}
//         {showProjectCode ? (
//           <div className="flex flex-wrap">
//             <label htmlFor="projectCode" className="w-2/3">
//               Project Code:
//             </label>

//             <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//               {projectDetails?.project_code}
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//         {/* <div className="flex flex-wrap">
//           <label htmlFor="projectName" className="w-2/3">
//             Project Name:
//           </label>

//           <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//             {projectDetails?.project_name}
//           </div>
//         </div> */}
//         {/* {onProjectEdit ? ( */}
//           {/* <div className="flex flex-wrap">
//             <label htmlFor="project_type" className="w-2/3">
//               Project Type:<span className="text-red-600"> *</span>
//             </label>
//             <select
//               name="project_type"
//               className="rounded-lg w-4/5"
//               defaultValue={projectDetails?.project_type}
//               required
//             >
//               <option name="" disabled selected hidden>
//                 Select Project Type
//               </option>
//               <option name="oracle">Oracle</option>
//               <option name="business_application">Business Application</option>
//               <option name="power_bi">Power BI</option>
//               <option name="erp">ERP</option>
//               <option name="infra">infra</option>
//             </select>
//           </div> */}
//         {/* ) : ( */}
//           <div className="flex flex-wrap">
//             <label htmlFor="projectPlatform" className="w-2/3">
//               Section Name:
//             </label>

//             <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//               {projectDetails?.project_type}
//             </div>
//           </div>
//         {/* )} */}
//         {onProjectEdit ? (
//           <div className="flex flex-wrap">
//             <label htmlFor="start_date" className="w-2/3">
//               Start Date:<span className="text-red-600"> *</span>
//             </label>
//             <input
//               type="date"
//               placeholder="Start Date"
//               name="start_date"
//               className="rounded-lg w-4/5"
//               defaultValue={projectDetails.start_date}
//               //onChange={handleStartDateChange}
//               required
//             />
//           </div>
//         ) : (
//           <div className="flex flex-wrap">
//             <label htmlFor="startDate" className="w-2/3">
//               Start Date:
//             </label>

//             <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//               {projectDetails?.start_date}
//             </div>
//           </div>
//         )}
//         {onProjectEdit ? (
//           <div className="flex flex-wrap">
//             <label htmlFor="projected_date" className="w-2/3">
//               End Date:<span className="text-red-600"> *</span>
//             </label>
//             <input
//               type="date"
//               placeholder="Projected Date"
//               name="projected_date"
//               className="rounded-lg w-4/5"
//               defaultValue={projectDetails.projected_date}
//               //onChange={handleProjectedDateChange}
//               required
//             />
//           </div>
//         ) : (
//           <div className="flex flex-wrap">
//             <label htmlFor="projectedDate" className="w-2/3">
//               End Date:
//             </label>

//             <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//               {projectDetails?.projected_date}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-wrap">
//           <label htmlFor="projectPlatform" className="w-2/3">
//             Section Owner:
//           </label>

//           <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//             {projectDetails?.section_owner}
//           </div>
//         </div>

//         {onProjectEdit ? (
//           <div className="flex flex-wrap">
//             <label htmlFor="priority" className="w-2/3">
//               Priority:<span className="text-red-600"> *</span>
//             </label>
//             <select
//               name="priority"
//               className="rounded-lg w-4/5"
//               defaultValue={projectDetails.priority}
//               //onChange={handlePriorityChange}
//               required
//             >
//               <option name="" disabled hidden>
//                 Set Priority
//               </option>
//               <option name="medium">Medium</option>
//               <option name="high">High</option>
//               <option name="low">Low</option>
//             </select>
//           </div>
//         ) : (
//           <div className="flex flex-wrap">
//             <label htmlFor="priority" className="w-2/3">
//               Priority:
//             </label>
//             <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//               {projectDetails?.priority}
//             </div>
//           </div>
//         )}
//         <div className="flex flex-wrap">
//           <label htmlFor="designResponsibility" className="w-2/3">
//             Project Manager:
//           </label>

//           <div className="rounded-lg w-4/5 border-2 border-black content-center text-center">
//             {projectDetails?.pmo_ein?.firstname}
//           </div>
//         </div>
//         {/* )} */}

//         {onProjectEdit ? (
//           <div className="flex flex-wrap">
//             <span className="w-2/3"></span>
//             <Button
//               type="submit"
//               className="bg-teal-theme rounded-lg w-4/5 text-center mt-6 text-black"
//             >
//               Save Changes
//             </Button>
//           </div>
//         ) : (
//           <></>
//         )}
//       </form>
//       <div className="">
//         {/* <Dialog>
//           <DialogTrigger asChild>
//             {/* <Button
//                 type="primary"
//                 className="rounded-xl w-4/5"
//                 // onClick={pendingApprovalAction}
//               > */}
//         {/* <button className="rounded-xl w-40 h-10 m-2 ml-6 bg-gray-600 text-white">
//                {forUpdateTask?"View Team":"Select Team"}
//             </button> */}
//         {/* </Button> */}
//         {/* </DialogTrigger>
//           <DialogContent className=" bg-white max-h-fit max-w-4xl">
//             <DialogTitle></DialogTitle>
//             {/* {console.log(teamList)} */}
//         {/* <SelectTeam
//               userList={userList}
//               userResponsibilityList={userResponsibilityList}
//               teamList={teamList}
//               setTeamList={setTeamList}
//               showTeam={true}
//               template={projectDetails?.project_template}
//               setUserResponsibilityList={setUserResponsibilityList}
//               setUserList={setUserList} 
//             />
//           </DialogContent>
//         </Dialog> */}
//       </div>
//     </div>
//   );
// }

// export default ProjectDetails_IT;


import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, User, AlertTriangle, Target, Clock, Building2, Code, CheckCircle2 } from "lucide-react";

function ProjectDetails_IT({
  projectDetails,
  setProjectDetails,
  showProjectCode = false,
  onProjectEdit = false,
  setUpdatedProjectDetails,
  setUpdateFlag,
  forUpdateTask = false,
  setOnProjectEdit,
  userList,
  showTeamList = false,
  userResponsibilityList,
  setUserResponsibilityList,
  teamList,
  setTeamList,
  setUserList,
}) {
  const [formData, setFormData] = useState({
    start_date: projectDetails?.start_date || '',
    projected_date: projectDetails?.projected_date || '',
    priority: projectDetails?.priority || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdatedProjectData = (e) => {
    e.preventDefault();
    
    const tempData = { ...formData };
    
    // Handle PMO selection if needed
    if (tempData.pmo) {
      const selectedPmo = userList?.find(
        ({ user_id }) => user_id.toString() === tempData.pmo
      );
      if (selectedPmo) {
        tempData["pmo_id"] = tempData.pmo;
        tempData.pmo = selectedPmo.username;
      }
    }
    
    console.log(tempData);
    setProjectDetails(() => ({ ...projectDetails, ...tempData }));
    
    if (forUpdateTask) {
      setOnProjectEdit(false);
      setUpdateFlag(true);
    }
    
    console.log(projectDetails);
    console.log(tempData);
    alert("Project details have been saved");
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Target className="w-4 h-4" />;
      case 'low':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-2 ">
      <div className="bg-gray-100 rounded-lg shadow-lg  overflow-hidden">
        {/* Header */}
        {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-6"> */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {/* {projectDetails?.project_name || 'Project Details'} */}
              </h1>
              <p className="text-blue-100">
                {/* {onProjectEdit ? 'Edit project information' : 'View project details'} */}
              </p>
            </div>
            {showProjectCode && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 text-white">
                  <Code className="w-5 h-5" />
                  <span className="font-mono font-semibold text-sm sm:text-base">
                    {projectDetails?.project_code}
                  </span>
                </div>
              </div>
            )}
          </div>
        {/* </div> */}

        {/* Form Content */}
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Project Name */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Building2 className="w-4 h-4 text-blue-600" />
                Project Name
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 font-medium min-h-[52px] flex items-center">
                {projectDetails?.project_name}
              </div>
            </div>

            {/* Section Name */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Target className="w-4 h-4 text-green-600" />
                Section Name
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 font-medium min-h-[52px] flex items-center">
                {projectDetails?.project_type}
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-purple-600" />
                Start Date
                {onProjectEdit && <span className="text-red-500 ml-1">*</span>}
              </label>
              {onProjectEdit ? (
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 font-medium min-h-[52px] flex items-center">
                  {projectDetails?.start_date}
                </div>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-orange-600" />
                End Date
                {onProjectEdit && <span className="text-red-500 ml-1">*</span>}
              </label>
              {onProjectEdit ? (
                <input
                  type="date"
                  value={formData.projected_date}
                  onChange={(e) => handleInputChange('projected_date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 font-medium min-h-[52px] flex items-center">
                  {projectDetails?.projected_date}
                </div>
              )}
            </div>

            {/* Section Owner */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-indigo-600" />
                Section Owner
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 font-medium min-h-[52px] flex items-center">
                {projectDetails?.section_owner}
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                Priority
                {onProjectEdit && <span className="text-red-500 ml-1">*</span>}
              </label>
              {onProjectEdit ? (
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                >
                  <option value="" disabled>
                    Set Priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <div className="min-h-[52px] flex items-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium ${getPriorityColor(projectDetails?.priority)}`}>
                    {getPriorityIcon(projectDetails?.priority)}
                    <span className="capitalize">{projectDetails?.priority}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Project Manager */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-cyan-600" />
                Project Manager
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 font-medium min-h-[52px] flex items-center">
                {projectDetails?.pmo_ein?.firstname||projectDetails?.pmo}
              </div>
            </div>

            {/* Save Button */}
            {onProjectEdit && (
              <div className="md:col-span-2 xl:col-span-3 flex justify-center pt-6">
                <Button
                  onClick={handleUpdatedProjectData}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 sm:px-12 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Actions Section */}
        {/* <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
          <div className="text-center text-gray-500 text-sm"> */}
            {/* Dialog section can be uncommented and styled when needed */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200">
                  {forUpdateTask ? "View Team" : "Select Team"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white max-h-fit max-w-4xl rounded-2xl">
                <DialogTitle></DialogTitle>
              </DialogContent>
            </Dialog> */}
            {/* Additional team management features coming soon */}
          {/* </div>
        </div> */}
      </div>
    </div>
  );
}

export default ProjectDetails_IT;
