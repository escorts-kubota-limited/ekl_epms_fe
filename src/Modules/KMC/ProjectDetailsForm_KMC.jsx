// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import SelectTeam from "@/Components/SelectTeam";
// import { useAuth } from "@/AuthProvider";
// import axios from "axios";
// import {
//   USER_LIST_URL,
//   GET_RESPONSIBILITIES_LIST,
//   GET_PMO_NAME,
//   ADD_DRAFT,
// } from "@/URL";
// import { Textarea } from "@/components/ui/textarea";
// const ProjectDetailsForm_KMC = ({
//   projectDetails,
//   //   handleSaveProject,
//   //   handleProjectTypeChange,
//   //   handleProjectSubtypeChange,
//   //   handleGsetPmo,
//   //   handleProjectTemplateChange,
//   userList,
//   teamList,
//   setUserList,
//   setTeamList,
//   userResponsibilityList,
//   setUserResponsibilityList,
//   teamResponsibility,
//   setTeamResponsibility,
//   setProjectDetails,
//   setActiveTab,
//   setDraftId,
//   draftId,
//   //   pmoName,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       project_type: projectDetails?.project_type || "",
//       project_subtype: projectDetails?.project_subtype || "",
//       market: projectDetails?.market || "",
//       project_platform: projectDetails?.project_platform || "",
//       platform_segment: projectDetails?.platform_segment || "",
//       project_name: projectDetails?.project_name || "",
//       start_date: projectDetails?.start_date || "",
//       projected_date: projectDetails?.projected_date || "",
//       priority: projectDetails?.priority || "",
//       project_template: projectDetails?.project_template || "",
//       development_code: projectDetails?.development_code || "",
//       pmo_id: projectDetails?.pmo_id || "",
//       pmo: projectDetails?.pmo || "",
//       project_description: projectDetails?.project_description || "",
//     },
//   });

//   const [projectSubType, setProjectSubType] = useState("");
//   // Watch form values for conditional rendering
//   const projectType = watch("project_type");
//   //   const projectTemplate = watch("project_template");
//   //   const [projectType, setProjectType] = useState("");
//   const [projectPlatform, setProjectPlatform] = useState("");
//   const [pmoName, setPmoName] = useState(projectDetails?.pmo);
//   const [pmoId, setPmoId] = useState(projectDetails?.pmo_id);
//   const [projectTemplate, setProjectTemplate] = useState(
//     projectDetails?.project_template
//   );
//   const [pmoList, setPmoList] = useState([]);

//   // Handle form submission
//   const onSubmit = (data) => {
//     handleSaveProject(data);
//     console.log(data);
//   };
//   useEffect(() => {
//     // if (userList?.length === 0) {
//     getUserAndResponsibilityList();
//     // }
//     if (projectType && projectSubType && projectPlatform) {
//       getPmoName();
//       // console.log("xyz")
//     }
//     // console.log(projectDetails)
//   }, [projectPlatform, projectDetails, projectTemplate]);
//   console.log(draftId);

//   //Adding project details in draft
//   const addProjectToDraft = async (data) => {
//     try {
//       const res = await axios.post(ADD_DRAFT, {
//         project: data,
//         tasks: [],
//         teamList: teamResponsibility,
//         step: "1",
//         draft_id: draftId === "" ? "" : draftId,
//         flag: "create",
//       });
//       // console.log(res)
//       setDraftId(res.data.draft_id);
//       console.log(draftId)
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   // Dynamic project subtype options based on project type
//   const renderProjectSubtypeOptions = () => {
//     if (projectType === "New Products") {
//       return (
//         <>
//           <option value="New Model">New Model</option>
//           <option value="Variant Upgrade">Variant Upgrade</option>
//         </>
//       );
//     } else if (projectType === "Current Products") {
//       return (
//         <>
//           <option value="4M">4M</option>
//           <option value="CPI">CPI</option>
//           <option value="FSC">FSC</option>
//           <option value="VE">VE</option>
//         </>
//       );
//     }
//     return null;
//   };
//   //   const renderProjectSubtypeOptions = () => {
//   //     if (projectType === "New Products") {
//   //       return (
//   //         <>
//   //           <option value="new_model">New Model</option>
//   //           <option value="variant_upgrade">Variant Upgrade</option>
//   //         </>
//   //       );
//   //     } else if (projectType === "Current Products") {
//   //       return (
//   //         <>
//   //           <option value="4M">4M</option>
//   //           <option value="CPI">CPI</option>
//   //           <option value="FSC">FSC</option>
//   //           <option value="VE">VE</option>
//   //         </>
//   //       );
//   //     }
//   //     return null;
//   //   };
//   const handleProjectSubtypeChange = (e) => {
//     setProjectSubType(e.target.value);
//   };
//   const handleGetPmo = (e) => {
//     if (projectType && projectSubType) {
//       setProjectPlatform(e.target.value);
//     } else alert("Enter Project Type & Subtype");
//   };
//   const handleProjectTemplateChange = (e) => {
//     setProjectTemplate(e.target.value);
//   };
//   //   const handleProjectTypeChange = (e) => {
//   //     setProjectType(e.target.value);
//   //   };

//   const { data } = useAuth();
//   const handleSaveProject = (d) => {
//     // e.preventDefault();
//     console.log(d);
//     const formData = new FormData(document.getElementById("project_details"));
//     console.log(formData.entries());
//     const tempData = {};
//     for (let [key, value] of formData.entries()) {
//       // console.log(key, "##", value);
//       // if (key === "pmo") {
//       //   console.log(userList)
//       //   console.log(value)
//       //   const selectedPmo = userList.find(({ username }) => username === value);
//       //   console.log(selectedPmo);
//       //   tempData["pmo_id"] = selectedPmo.user_id;
//       //   // tempData["pmo"]=pmoName
//       //   // console.log(selectedPmo)
//       //   // value = selectedPmo.username;
//       // }
//       tempData[key] = value;
//     }
//     tempData["pmo"] = pmoName;
//     tempData["pmo_id"] = pmoId;
//     tempData["keyword"] = data.user_info.keyword;

//     //handling empty project details;
//     // let flag = false;
//     // for (const  value of Object.entries(tempData)) {
//     //   if (value === "") {
//     //     flag = true;
//     //   }
//     // }
//     // if (flag) {
//     //   alert("Please fill all the required details.");
//     // } else {
//     addProjectToDraft(tempData);
//     setProjectDetails(tempData);
//     console.log("#project");
//     console.log(tempData);
//     alert("Project details have been saved");
//     setActiveTab("task_details");
//     // }
//   };
//   const getUserAndResponsibilityList = async () => {
//     try {
//       const [userListResponse, responsibilitiesListResponse] =
//         await Promise.all([
//           axios.get(USER_LIST_URL),
//           axios.get(`${GET_RESPONSIBILITIES_LIST}/${projectTemplate}`),
//         ]);
//       console.log(userListResponse.data);
//       console.log(responsibilitiesListResponse.data);
//       // setTaskUserList(response.data);
//       // const list = "list";
//       //console.log(userList);
//       //const taskUserList = {};
//       //taskUserList[list] = response.data;
//       // console.log(taskUserList);

//       const userListData = userListResponse.data;
//       const userResponsibilityData = responsibilitiesListResponse.data;
//       // console.log(userListData)
//       setUserList(userListData);
//       setUserResponsibilityList(userResponsibilityData);
//       // console.log(userList+"#########USER");
//       //console.log(taskUserList);
//       //userList = taskUserList.list;
//       console.log(userList);
//       console.log(userResponsibilityList);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const getPmoName = async () => {
//     try {
//       const response = await axios.get(GET_PMO_NAME, {
//         params: {
//           project_type: projectType,
//           project_subtype: projectSubType,
//           project_platform: projectPlatform,
//         },
//       });
//       const data = response.data;
//       console.log(data[0]);
//       // if (data.length === 1) {
//       //   console.log("xyzxyz");
//       //   setPmoName(data[0].PROJECT_MANAGER_NAME);
//       //   setPmoId(data[0].MANAGER_USERINDEX);
//       // } else {
//       setPmoList(() => [...data]);
//       // }

//       // console.log(selectedPmo)
//       // console.log(projectDetails)
//       // setProjectDetails(()=>({...projectDetails,pmo: pmoName}))
//       // console.log(projectDetails);
//       // response.data
//       // let pmoId = ""
//       // const selectedPmo = userList.find(
//       //   ({ user_id }) => user_id.toString() === pmoName
//       // );
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const handlePmoChange = () => {};

//   return (
//     <form
//       id="project_details"
//       className="grid grid-cols-3 gap-6 m-6"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       {/* Project Type */}
//       <div className="flex flex-wrap">
//         <label htmlFor="project_type" className="w-2/3">
//           Project Type:<span className="text-red-600"> *</span>
//         </label>
//         <select
//           {...register("project_type", {
//             required: "Project Type is required",
//             onChange: (e) => {
//               //   handleProjectTypeChange(e);
//               setValue("project_subtype", ""); // Reset subtype when type changes
//               // handleGetPmo
//             },
//           })}
//           className="rounded-xl w-4/5"
//         >
//           <option value="" disabled hidden>
//             Select Project Type
//           </option>
//           <option value="New Products">New Products</option>
//           <option value="Current Products">Current Products</option>
//         </select>
//         {errors.project_type && (
//           <span className="text-red-600 text-sm">
//             {errors.project_type.message}
//           </span>
//         )}
//       </div>

//       {/* Project Sub Type */}
//       <div className="flex flex-wrap">
//         <label htmlFor="project_subtype" className="w-2/3">
//           Project Sub Type:<span className="text-red-600"> *</span>
//         </label>
//         <select
//           {...register("project_subtype", {
//             required: "Project Sub Type is required",
//             onChange: handleProjectSubtypeChange,
//           })}
//           className="rounded-xl w-4/5"
//           disabled={!projectType}
//         >
//           <option value="" disabled hidden>
//             Select Project Sub Type
//           </option>
//           {renderProjectSubtypeOptions()}
//         </select>
//         {errors.project_subtype && (
//           <span className="text-red-600 text-sm">
//             {errors.project_subtype.message}
//           </span>
//         )}
//       </div>

//       {/* Market (Only for New Products) */}
//       {projectType === "New Products" && (
//         <div className="flex flex-wrap">
//           <label htmlFor="market" className="w-2/3">
//             Market:<span className="text-red-600"> *</span>
//           </label>
//           <select
//             {...register("market", { required: "Market is required" })}
//             className="rounded-xl w-4/5"
//             placeholder=""
//           >
//             <option value="" disabled hidden>
//               Select Project Market
//             </option>
//             <option value="DNP">DNP</option>
//             <option value="ENP">ENP</option>
//             <option value="TNP">TNP</option>
//           </select>
//           {errors.market && (
//             <span className="text-red-600 text-sm">
//               {errors.market.message}
//             </span>
//           )}
//         </div>
//       )}

//       {projectType !== "New Products" && <div></div>}

//       {/* Project Platform */}
//       <div className="flex flex-wrap">
//         <label htmlFor="project_platform" className="w-2/3">
//           Project Platform:<span className="text-red-600"> *</span>
//         </label>
//         <select
//           {...register("project_platform", {
//             required: "Project Platform is required",
//             onChange: handleGetPmo,
//           })}
//           className="rounded-xl w-4/5"
//         >
//           <option value="" disabled hidden>
//             Select Project Platform
//           </option>
//           <option value="Farmtrac">Farmtrac</option>
//           <option value="Powertrac">Powertrac</option>
//           <option value="Compact">Compact</option>
//           <option value="Exports - New >50HP">{`Exports - New >50HP`}</option>
//           <option value="FT NETS">FT NETS</option>
//           <option value="BT 5">BT 5</option>
//           <option value="BS 5">BS 5</option>
//           <option value="EAB">EAB</option>
//           <option value="New EV">New EV</option>
//           <option value="FT PT">FT PT</option>
//         </select>
//         {errors.project_platform && (
//           <span className="text-red-600 text-sm">
//             {errors.project_platform.message}
//           </span>
//         )}
//       </div>

//       {/* Platform Segment */}
//       <div className="flex flex-wrap">
//         <label htmlFor="platform_segment" className="w-2/3">
//           Platform Segment:<span className="text-red-600"> *</span>
//         </label>
//         <select
//           {...register("platform_segment", {
//             required: "Platform Segment is required",
//           })}
//           className="rounded-xl w-4/5"
//         >
//           <option value="" disabled hidden>
//             Select Project Segment
//           </option>
//           <option value="FT">FT</option>
//           <option value="PT">PT</option>
//           <option value="FT-PT">FT-PT</option>
//           <option value="E 75">E 75</option>
//         </select>
//         {errors.platform_segment && (
//           <span className="text-red-600 text-sm">
//             {errors.platform_segment.message}
//           </span>
//         )}
//       </div>

//       {/* Project Name */}
//       <div className="flex flex-wrap">
//         <label htmlFor="project_name" className="w-2/3">
//           Project Name:<span className="text-red-600"> *</span>
//         </label>
//         <input
//           {...register("project_name", {
//             required: "Project Name is required",
//           })}
//           placeholder="Project Name"
//           type="text"
//           className="rounded-xl w-4/5"
//         />
//         {errors.project_name && (
//           <span className="text-red-600 text-sm">
//             {errors.project_name.message}
//           </span>
//         )}
//       </div>

//       {/* Start Date */}
//       <div className="flex flex-wrap">
//         <label htmlFor="start_date" className="w-2/3">
//           Start Date:<span className="text-red-600"> *</span>
//         </label>
//         <input
//           {...register("start_date", {
//             required: "Start Date is required",
//             // validate:
//             //  (value) => {
//             //   const today = new Date().toISOString().split("T")[0];
//             //   return (
//             //     value >= projectDetails?.projected_date ||
//             //     "Start date cannot be after projected date"
//             //   );
//             // },
//             //   (value) => {
//             //     const endDate = document.querySelector(
//             //       'input[name="projected_date"]'
//             //     ).value;
//             //     return (
//             //       new Date(value) <= new Date(endDate) ||
//             //       "Start date must be projected end date"
//             //     );
//             //   },
//           })}
//           type="date"
//           className="rounded-xl w-4/5"
//         />
//         {errors.start_date && (
//           <span className="text-red-600 text-sm">
//             {errors.start_date.message}
//           </span>
//         )}
//       </div>

//       {/* Projected Date */}
//       {/* <div className="flex flex-wrap">
//         <label htmlFor="projected_date" className="w-2/3">
//           Projected Date:<span className="text-red-600"> *</span>
//         </label>
//         <input
//           {...register("projected_date", {
//             required: "Projected Date is required",
//             validate: (value) => {
//               const startDate = watch("start_date");
//               return (
//                 !startDate ||
//                 value >= startDate ||
//                 "Projected date must be after start date"
//               );
//             },
//           })}
//           type="date"
//           className="rounded-xl w-4/5"
//         />
//         {errors.projected_date && (
//           <span className="text-red-600 text-sm">
//             {errors.projected_date.message}
//           </span>
//         )}
//       </div> */}

//       {/* Priority */}
//       <div className="flex flex-wrap">
//         <label htmlFor="priority" className="w-2/3">
//           Priority:<span className="text-red-600"> *</span>
//         </label>
//         <select
//           {...register("priority", { required: "Priority is required" })}
//           className="rounded-xl w-4/5"
//         >
//           <option value="" disabled hidden>
//             Set Priority
//           </option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//           <option value="Low">Low</option>
//         </select>
//         {errors.priority && (
//           <span className="text-red-600 text-sm">
//             {errors.priority.message}
//           </span>
//         )}
//       </div>

//       {/* Project Template */}
//       <div className="flex flex-wrap">
//         <label htmlFor="project_template" className="w-2/3">
//           Project Template:<span className="text-red-600"> *</span>
//         </label>
//         <select
//           {...register("project_template", {
//             required: "Project Template is required",
//             onChange: handleProjectTemplateChange,
//           })}
//           className="rounded-xl w-4/5"
//         >
//           <option value="" disabled hidden>
//             Select Project Template
//           </option>
//           <option value="Major">Major</option>
//           <option value="Minor">Minor</option>
//         </select>
//         {errors.project_template && (
//           <span className="text-red-600 text-sm">
//             {errors.project_template.message}
//           </span>
//         )}
//       </div>

//       {/* PMO */}
//       <div className="flex flex-col">
//         <label htmlFor="pmo" className="w-2/3">
//           PMO:
//         </label>
//         {pmoName ? (
//           <div className="rounded-xl w-4/5 border-2 border-gray-400 p-2 h-10">
//             {pmoName}
//           </div>
//         ) : (
//           <select
//             {...register("pmo_id", {
//               required: "PMO is required",
//               placeholder: "Select PMO",
//               // value:pmoName,
//               onChange: (e) => {
//                 setPmoId(e.target.value);
//                 // console.log(e.target.value)
//                 const pmo_name = pmoList.find(
//                   (pmo) => pmo.MANAGER_USERINDEX === Number(e.target.value)
//                 );
//                 console.log(pmo_name.PROJECT_MANAGER_NAME);
//                 setPmoName(String(pmo_name.PROJECT_MANAGER_NAME));
//                 // setPmoName()
//               },
//             })}
//             className="rounded-xl w-4/5"
//           >
//             <option value="" disabled selected>
//               Select PMO
//             </option>
//             {pmoList.map((pmo) => {
//               return (
//                 <option value={pmo.MANAGER_USERINDEX}>
//                   {pmo.PROJECT_MANAGER_NAME}
//                 </option>
//               );
//             })}
//           </select>
//         )}
//       </div>
//       <div className="col-span-2 flex flex-col">
//         <label htmlFor="project_description" className="w-2/3">
//           Project Description:<span className="text-red-600"> *</span>
//         </label>
//         <Textarea
//           {...register("project_description", { required: true })}
//           className="rounded-xl"
//         />
//         {errors.description && (
//           <span className="text-red-600 text-sm">This field is required</span>
//         )}
//       </div>

//       {/* Development Code */}
//       <div className="flex flex-wrap">
//         <label htmlFor="development_code" className="w-2/3">
//           Development Code:
//         </label>
//         <input
//           {...register("development_code")}
//           type="text"
//           placeholder="Development Code"
//           className="rounded-xl w-4/5"
//         />
//       </div>

//       {/* Select Team */}
//       <div className="flex flex-wrap">
//         <div className="w-2/3"></div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <button
//               type="button"
//               className="rounded-xl w-4/5 bg-gray-600 text-white"
//             >
//               Select Team
//             </button>
//           </DialogTrigger>
//           <DialogContent className="bg-white overflow-y-auto max-w-4xl">
//             <DialogTitle></DialogTitle>
//             <SelectTeam
//               userList={userList}
//               userResponsibilityList={userResponsibilityList}
//               setUserResponsibilityList={setUserResponsibilityList}
//               forKmc={true}
//               teamResponsibility={teamResponsibility}
//               setTeamResponsibility={setTeamResponsibility}
//               setTeamList={setTeamList}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Save Button */}
//       <div className="mt-6 items-center">
//         <Button
//           type="submit"
//           className="bg-teal-theme w-4/5 rounded-xl text-white"
//         >
//           Save Details & Next
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ProjectDetailsForm_KMC;

import React, { useState, useEffect, useRef } from "react";
import { useForm, useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Users,
  FileText,
  Settings,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import SelectTeam from "@/Components/SelectTeam";
import axios from "axios";

import {
  USER_LIST_URL,
  GET_RESPONSIBILITIES_LIST,
  GET_PMO_NAME,
  ADD_DRAFT,
} from "@/URL";
import { useAuth } from "@/AuthProvider";

const ProjectDetailsForm_KMC = ({
  projectDetails = {},
  userList = [],
  teamList = [],
  setUserList = () => {},
  setTeamList = () => {},
  userResponsibilityList = [],
  setUserResponsibilityList = () => {},
  teamResponsibility = [],
  setTeamResponsibility = () => {},
  setProjectDetails = () => {},
  setActiveTab = () => {},
  setDraftId = () => {},
  draftId = "",
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    resetField,
    setFocus,
    getValues,
  } = useForm({
    defaultValues: {
      project_type: projectDetails?.project_type || "",
      project_subtype: projectDetails?.project_subtype || "",
      market: projectDetails?.market || "",
      project_platform: projectDetails?.project_platform || "",
      platform_segment: projectDetails?.platform_segment || "",
      project_name: projectDetails?.project_name || "",
      start_date: projectDetails?.start_date || "",
      projected_date: projectDetails?.projected_date || "",
      priority: projectDetails?.priority || "",
      project_template: projectDetails?.project_template || "",
      development_code: projectDetails?.development_code || "",
      pmo_id: projectDetails?.pmo_id || "",
      pmo: projectDetails?.pmo || "",
      project_description: projectDetails?.project_description || "",
      project_code: projectDetails?.project_code || "",
    },
  });

  const [projectSubType, setProjectSubType] = useState("");
  const [projectPlatform, setProjectPlatform] = useState("");
  const [pmoName, setPmoName] = useState(projectDetails?.pmo);
  const [pmoId, setPmoId] = useState(projectDetails?.pmo_id);
  const [projectTemplate, setProjectTemplate] = useState(
    projectDetails?.project_template
  );
  const [pmoList, setPmoList] = useState([
    // { MANAGER_USERINDEX: 1, PROJECT_MANAGER_NAME: "Alice Johnson" },
    // { MANAGER_USERINDEX: 2, PROJECT_MANAGER_NAME: "Bob Smith" },
    // { MANAGER_USERINDEX: 3, PROJECT_MANAGER_NAME: "Carol Davis" },
  ]);

  const projectType = watch("project_type");
  // const projectCode = watch("project_code");
  const [showPopup, setShowPopup] = useState(false);
  const [projectCodeMode, setProjectCodeMode] = useState(null); // 'manual' or 'auto'
  const [shouldFocus, setShouldFocus] = useState(false);

  const { data } = useAuth();

  // const inputRef = useRef(null);

  // const selectRef = useRef(null);

  useEffect(() => {
    if (projectCodeMode === "manual") {
      // console.log(projectCodeMode)
      // inputRef.current.focus();
      setFocus("project_code");
      // setShouldFocus(false);
    }
  }, [projectCodeMode]);

  useEffect(() => {
    getUserAndResponsibilityList();
  }, [projectTemplate]);

  useEffect(() => {
    if (projectType && projectSubType && projectPlatform) {
      getPmoName();
    }
  }, [projectPlatform, projectDetails]);

  const addProjectToDraft = async (data) => {
    console.log("Adding project to draft:", data);
    // setDraftId("mock-draft-" + Date.now());
    try {
      const res = await axios.post(ADD_DRAFT, {
        project: data,
        tasks: [],
        teamList: teamResponsibility,
        step: "1",
        draft_id: draftId === "" ? "" : draftId,
        flag: "create",
      });
      // console.log(res)
      setDraftId(res.data.draft_id);
      console.log(draftId);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserAndResponsibilityList = async () => {
    console.log("Fetching user and responsibility lists");
    try {
      const [userListResponse, responsibilitiesListResponse] =
        await Promise.all([
          axios.get(USER_LIST_URL),
          axios.get(`${GET_RESPONSIBILITIES_LIST}/${projectTemplate}`),
        ]);
      console.log(userListResponse.data);
      console.log(responsibilitiesListResponse.data);

      const userListData = userListResponse.data;
      const userResponsibilityData = responsibilitiesListResponse.data;
      setUserList(userListData);
      setUserResponsibilityList(userResponsibilityData);
      console.log(userList);
      console.log(userResponsibilityList);
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(userResponsibilityList)

  const getPmoName = async () => {
    console.log("Fetching PMO data");
    try {
      const response = await axios.get(GET_PMO_NAME, {
        params: {
          project_type: projectType,
          project_subtype: projectSubType,
          project_platform: projectPlatform,
        },
      });
      const data = response.data;
      console.log(data[0]);
      setPmoList(() => [...data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProject = (projData) => {
    const tempData = { ...projData };
    tempData["pmo"] = pmoName;
    tempData["pmo_id"] = pmoId;
    tempData["keyword"] = data.user_info.keyword;
    // if(projectCodeMode==="auto"){
    //   tempData[project]
    // }
    console.log("projectCodeMode", projectCodeMode);

    addProjectToDraft(tempData);
    setProjectDetails(tempData);
    alert("Project details have been saved");
    setActiveTab("task_details");
  };

  const onSubmit = (data) => {
    handleSaveProject(data);
  };

  const handleInputClick = () => {
    // Only show popup if input is empty or in auto mode
    if (
      !getValues("project_code") ||
      getValues("project_code") === "AUTO_GENERATED" ||
      projectCodeMode === "auto"
    ) {
      setShowPopup(true);
    }
  };
  const handleOptionSelect = (selectedMode) => {
    setProjectCodeMode(selectedMode);
    setShowPopup(false);

    if (selectedMode === "auto") {
      setProjectCodeMode("auto");
      // onChange && onChange("AUTO_GENERATED");
    } else {
      setProjectCodeMode("manual");
      // onChange && onChange(projectCode === "AUTO_GENERATED" ? "" : value);
      // Set flag to focus input after re-render
      setShouldFocus(true);
    }
  };
  // console.log(mode)

  const renderProjectSubtypeOptions = () => {
    if (projectType === "New Products") {
      return (
        <>
          <option value="New Model">New Model</option>
          <option value="Variant Upgrade">Variant Upgrade</option>
        </>
      );
    } else if (projectType === "Current Products") {
      return (
        <>
          <option value="4M">4M</option>
          <option value="CPI">CPI</option>
          <option value="FSC">FSC</option>
          <option value="VE">VE</option>
        </>
      );
    }
    return null;
  };

  const FormField = ({
    label,
    children,
    error,
    required = false,
    className = "",
  }) => (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center space-x-1 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );

  const SelectInput = ({
    register,
    name,
    options,
    placeholder,
    disabled = false,
    onChange,
    // selectRef,
  }) => (
    <select
      {...register(name)}
      onChange={onChange}
      disabled={disabled}
      // ref={selectRef}
      // onFocus={shouldFocus}
      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:border-gray-300 dark:hover:border-gray-500"
    >
      <option value="" disabled hidden className="text-gray-400">
        {placeholder}
      </option>
      {options}
    </select>
  );

  const TextInput = ({
    register,
    name,
    type = "text",
    placeholder,
    className = "",
  }) => (
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                  transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                  hover:border-gray-300 dark:hover:border-gray-500 ${className}`}
      onClick={() => {
        if (name === "project_code") {
          handleInputClick();
        }
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="mb-8"> */}
        {/* <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-blue-600 rounded-xl text-white">
              <FileText className="w-6 h-6" />
            </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Project Details
              </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your project settings and team assignments
            </p>
          </div>
        </div> */}

        {/* Progress indicator */}
        {/* <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-medium">
              Step 1
            </span>
            <ChevronRight className="w-4 h-4" />
            <span>Project Details</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400">Task Details</span>
          </div> */}
        {/* </div> */}

        {/* Form */}
        <form
          id="project_details"
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-8">
            {/* Basic Information Section */}
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Settings className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="Project Type"
                  required
                  error={errors.project_type}
                >
                  <SelectInput
                    register={register}
                    name="project_type"
                    placeholder="Select Project Type"
                    options={
                      <>
                        <option value="New Products">New Products</option>
                        <option value="Current Products">
                          Current Products
                        </option>
                      </>
                    }
                    {...register("project_type", {
                      required: "Project Type is required",
                      onChange: (e) => {
                        setValue("project_subtype", "");
                      },
                    })}
                  />
                </FormField>

                <FormField
                  label="Project Sub Type"
                  required
                  error={errors.project_subtype}
                >
                  <SelectInput
                    register={register}
                    name="project_subtype"
                    placeholder="Select Project Sub Type"
                    disabled={!projectType}
                    options={renderProjectSubtypeOptions()}
                    {...register("project_subtype", {
                      required: "Project Sub Type is required",
                      onChange: (e) => setProjectSubType(e.target.value),
                    })}
                  />
                </FormField>

                {projectType === "New Products" && (
                  <FormField label="Market" required error={errors.market}>
                    <SelectInput
                      register={register}
                      name="market"
                      placeholder="Select Project Market"
                      options={
                        <>
                          <option value="DNP">DNP</option>
                          <option value="ENP">ENP</option>
                          <option value="TNP">TNP</option>
                        </>
                      }
                      {...register("market", {
                        required: "Market is required",
                      })}
                    />
                  </FormField>
                )}

                <FormField
                  label="Project Platform"
                  required
                  error={errors.project_platform}
                >
                  <SelectInput
                    register={register}
                    name="project_platform"
                    // selectRef={selectRef}
                    placeholder="Select Project Platform"
                    options={
                      <>
                        <option value="Farmtrac">Farmtrac</option>
                        <option value="Powertrac">Powertrac</option>
                        <option value="Compact">Compact</option>
                        <option value="Exports - New >50HP">
                          Exports - New &gt;50HP
                        </option>
                        <option value="FT NETS">FT NETS</option>
                        <option value="BT 5">BT 5</option>
                        <option value="BS 5">BS 5</option>
                        <option value="EAB">EAB</option>
                        <option value="New EV">New EV</option>
                        <option value="FT PT">FT PT</option>
                      </>
                    }
                    {...register("project_platform", {
                      required: "Project Platform is required",
                      onChange: (e) => {
                        if (projectType && projectSubType) {
                          setProjectPlatform(e.target.value);
                        } else {
                          alert("Enter Project Type & Subtype");
                          resetField("project_platform"); // reset in form state
                          // if (selectRef.current) {
                          //   selectRef.current.value = ""; // reset in UI
                          // }
                        }
                      },
                    })}
                  />
                </FormField>

                <FormField
                  label="Platform Segment"
                  required
                  error={errors.platform_segment}
                >
                  <SelectInput
                    register={register}
                    name="platform_segment"
                    placeholder="Select Project Segment"
                    options={
                      <>
                        <option value="FT">FT</option>
                        <option value="PT">PT</option>
                        <option value="FT-PT">FT-PT</option>
                        <option value="E 75">E 75</option>
                      </>
                    }
                    {...register("platform_segment", {
                      required: "Platform Segment is required",
                    })}
                  />
                </FormField>

                <FormField
                  label="Project Name"
                  required
                  error={errors.project_name}
                >
                  <TextInput
                    register={register}
                    name="project_name"
                    placeholder="Enter project name"
                    {...register("project_name", {
                      required: "Project Name is required",
                    })}
                  />
                </FormField>
              </div>
            </div>

            {/* Timeline & Priority Section */}
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Timeline & Priority
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  label="Start Date"
                  required
                  error={errors.start_date}
                >
                  <TextInput
                    register={register}
                    name="start_date"
                    type="date"
                    {...register("start_date", {
                      required: "Start Date is required",
                    })}
                  />
                </FormField>

                <FormField label="Priority" required error={errors.priority}>
                  <SelectInput
                    register={register}
                    name="priority"
                    placeholder="Set Priority"
                    options={
                      <>
                        <option value="High">🔴 High</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="Low">🟢 Low</option>
                      </>
                    }
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                  />
                </FormField>

                <FormField
                  label="Project Template"
                  required
                  error={errors.project_template}
                >
                  <SelectInput
                    register={register}
                    name="project_template"
                    placeholder="Select Project Template"
                    options={
                      <>
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                      </>
                    }
                    {...register("project_template", {
                      required: "Project Template is required",
                      onChange: (e) => setProjectTemplate(e.target.value),
                    })}
                  />
                </FormField>
              </div>
            </div>

            {/* Team & Management Section */}
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Team & Management
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Project Manager">
                  {pmoName ? (
                    <div
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                                    bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {pmoName.charAt(0)}
                      </div>
                      <span>{pmoName}</span>
                    </div>
                  ) : (
                    <SelectInput
                      register={register}
                      name="pmo_id"
                      placeholder="Select Project Manager"
                      options={pmoList.map((pmo) => (
                        <option
                          key={pmo.MANAGER_USERINDEX}
                          value={pmo.MANAGER_USERINDEX}
                        >
                          {pmo.PROJECT_MANAGER_NAME}
                        </option>
                      ))}
                      {...register("pmo_id", {
                        required: "PMO is required",
                        onChange: (e) => {
                          setPmoId(e.target.value);
                          const pmo_name = pmoList.find(
                            (pmo) =>
                              pmo.MANAGER_USERINDEX === Number(e.target.value)
                          );
                          if (pmo_name) {
                            setPmoName(String(pmo_name.PROJECT_MANAGER_NAME));
                          }
                        },
                      })}
                    />
                  )}
                </FormField>

                {/* <FormField label="Team Selection"> */}
                <div className="space-y-2 ">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Team Selection
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600
                                   hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20
                                   transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Users className="w-5 h-5" />
                        <span>Select Team Members</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 overflow-y-auto max-w-4xl max-h-[80vh]">
                      <DialogTitle className="text-xl font-semibold"></DialogTitle>
                      <SelectTeam
                        userList={userList}
                        userResponsibilityList={userResponsibilityList}
                        setUserResponsibilityList={setUserResponsibilityList}
                        forKmc={true}
                        teamResponsibility={teamResponsibility}
                        setTeamResponsibility={setTeamResponsibility}
                        setTeamList={setTeamList}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                {/* </FormField> */}
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Additional Details
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex flex-col space-y-1 gap-6">
                  <FormField label="Project Code" className="lg:col-span-1">
                    {projectCodeMode === "auto" ? (
                      <div
                        onClick={handleInputClick}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span>Auto Generated</span>
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <TextInput
                        register={register}
                        name="project_code"
                        placeholder="Enter or Generate Project Code"
                        {...register("project_code")}
                      />
                    )}
                  </FormField>

                  {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Select Project Code Method
                        </h3>

                        <div className="space-y-3">
                          <button
                            onClick={() => handleOptionSelect("auto")}
                            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                                <svg
                                  className="w-4 h-4 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-900">
                                  Generate Code
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Automatically generate a project code
                                </p>
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => handleOptionSelect("manual")}
                            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors group"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200">
                                <svg
                                  className="w-4 h-4 text-green-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-900">
                                  Manual Entry
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Enter project code manually
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={() => setShowPopup(false)}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <FormField label="Development Code" className="lg:col-span-1">
                    <TextInput
                      register={register}
                      name="development_code"
                      placeholder="Enter development code"
                      {...register("development_code")}
                    />
                  </FormField>
                </div>
                <FormField
                  label="Project Description"
                  required
                  error={errors.project_description}
                  className="lg:col-span-2"
                >
                  <Textarea
                    {...register("project_description", {
                      required: "Project description is required",
                    })}
                    placeholder="Describe your project objectives, scope, and key deliverables..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
                               transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                               hover:border-gray-300 dark:hover:border-gray-500 min-h-[160px] resize-none"
                  />
                </FormField>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                           text-white font-medium rounded-xl shadow-lg hover:shadow-xl
                           transform hover:scale-105 transition-all duration-200
                           flex items-center space-x-2"
              >
                <span>Save Details & Continue</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetailsForm_KMC;
