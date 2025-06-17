import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import React, { useEffect, useState } from "react";
import SelectTeam from "@/Components/SelectTeam";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/Components/ui/select";
import axios from "axios";
import FileAttachment from "@/Components/FileAttachment";
// import RequestedFrom from "./RequestedFrom";
import { ArrowDownLeftIcon } from "@heroicons/react/24/solid";
import {
  GET_PMO_NAME,
  GET_TEAMLIST,
  GET_TEAM_HIERARCHY,
  ADD_TO_INBOX,
} from "@/URL";

const ProjectDetailsForm = ({
  projectDetails,
  divisionList,
  deptList,
  orgList,
  teamList,
  setTeamList,
  userResponsibilityList,
  setUserResponsibilityList,
  teamResponsibility,
  setTeamResponsibility,
  setProjectDetails,
  setActiveTab,
  setDraftId,
  draftId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      project_type: projectDetails?.project_type || "",
      project_name: projectDetails?.project_name || "",
      requested_from: projectDetails?.requested_from || "",
      priority: projectDetails?.priority || "",
      start_date: projectDetails?.start_date || "",
      projected_date: projectDetails?.projected_date || "",
      project_owner: projectDetails?.projectOwnerName || "",
      pmo: projectDetails?.pmo_id || "",
      project_description: projectDetails?.project_description || "",
    },
  });

  // State for requested from popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(
    projectDetails?.requested_from_type
  );
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [finalSelection, setFinalSelection] = useState(() => {
    if (projectDetails?.requested_from) {
      const type = extractActualType(projectDetails.requested_from);
      const value = extractActualValue(projectDetails.requested_from);
      return { type, value };
    }
    return { type: selectedType, value: "" };
  });
  const [projectType, setProjectType] = useState(projectDetails?.project_type);
  const [projectOwnerName, setProjetOwnerName] = useState(
    projectDetails["section_owner"]
  );
  const [pmo, setPmo] = useState(projectDetails?.pmo || "");
  const [pmoId, setPmoId] = useState(projectDetails.pmo_id);
  const [projectOwnerId, setProjetOwnerId] = useState();

  useEffect(() => {
    getOwnerName();
    getTeamHierarchy();
  }, [projectType, pmoId, finalSelection]);

  const handleProjectTypeChange = (e) => {
    // console.log(e.target.value)
    setProjectType(e.target.value);
  };
  console.log(projectOwnerName);
  console.log(projectDetails.pmo);

  // useEffect(()=>{

  // },[draftId])

  const getOwnerName = async () => {
    try {
      console.log(projectType);
      const projectOwnerResponse = await axios.get(GET_PMO_NAME, {
        params: {
          project_type: projectType,
          project_subtype: "",
          project_platform: "",
        },
      });
      const data = projectOwnerResponse.data;
      console.log(data[0]);
      const teamListResponse = axios.get(
        `${GET_TEAMLIST}/${data[0].MANAGER_USERINDEX}`
      );
      const teamListData = (await teamListResponse).data;
      console.log(data[0]);
      setProjetOwnerName(data[0].PROJECT_MANAGER_NAME);
      setProjetOwnerId(data[0].MANAGER_USERINDEX);
      setTeamList(teamListData);
    } catch (err) {
      console.error(err);
    }
  };
  const getTeamHierarchy = async () => {
    try {
      const response = await axios.get(`${GET_TEAM_HIERARCHY}/${pmoId}`);
      console.log(response.data);
      const resData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setUserResponsibilityList(resData);
    } catch (err) {
      console.error(err);
    }
  };
  const handlePmoChange = (e) => {
    setPmoId(e.target.value);
    const selectedPmoName = teamList.find(
      ({ userIndex }) => userIndex.toString() === e.target.value
    );
    setPmo(selectedPmoName.firstname);
  };

  const handleSaveProject = (data) => {
    // e.preventDefault;
    console.log(data);
    const formData = new FormData(document.getElementById("project_details"));
    // console.log(formData.entries())
    const tempData = {};
    for (let [key, value] of formData.entries()) {
      tempData[key] = value;
    }

    const normalizedRequestedFrom = {
      type: extractActualType(finalSelection),
      value: extractActualValue(finalSelection),
    };

    // Set the normalized structure
    tempData["requested_from"] = normalizedRequestedFrom;
    tempData["pmo_id"] = pmoId;
    tempData["pmo"] = pmo;
    tempData["section_owner"] = projectOwnerName;
    tempData["pmo_ein"] = teamList.find(
      ({ userIndex }) => userIndex.toString() === pmoId
    );
    console.log("first");
    setProjectDetails(tempData);
    console.log("#project");
    console.log(tempData);
    sendDataForDraftAndInbox(tempData);
    alert("Project details have been saved");
    setActiveTab("task_details");
    // }
  };

  // Extract the actual type regardless of nesting level
  function extractActualType(selection) {
    if (!selection) return "";

    // If value is an object that has type, it's nested
    if (
      selection.value &&
      typeof selection.value === "object" &&
      selection.value.type
    ) {
      return selection.value.type;
    }

    return selection.type || "";
  }

  // Extract the actual value regardless of nesting level
  function extractActualValue(selection) {
    if (!selection) return "";

    // If value is an object that has value, it's nested
    if (
      selection.value &&
      typeof selection.value === "object" &&
      selection.value.value
    ) {
      return selection.value.value;
    }

    return selection.value || "";
  }

  // useEffect(()=>{
  //   console.log("draft id at child compoenent ",draftId);
  //   debugger;
  // },[draftId]);

  const sendDataForDraftAndInbox = async (projectData) => {
    try {
      const res = await axios.post(ADD_TO_INBOX, {
        project: projectData,
        tasks: [],
        teamList: teamList,
        step: "1",
        draft_id: draftId === "" ? "" : draftId,
        flag: "create",
      });
      // console.log(res.data);
      setDraftId(res.data.data.project_id);
      return res.data.data.project_id;
    } catch (err) {
      console.error(err);
    }
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setSelectedDepartment("");
    setSelectedDivision("");
    setSelectedOrg("");
  };
  const handleValueSelection = (value) => {
    if (selectedType === "department") {
      setSelectedDepartment(value);
    } else if (selectedType === "division") {
      setSelectedDivision(value);
    } else if (selectedType === "org") {
      setSelectedOrg(value);
    }
  };

  const confirmSelection = () => {
    let selectedValue = "";
    if (selectedType === "department") {
      selectedValue = selectedDepartment;
    } else if (selectedType === "division") {
      selectedValue = selectedDivision;
    } else if (selectedType === "org") {
      selectedValue = selectedOrg;
    }

    setFinalSelection({ type: selectedType, value: selectedValue });
    setValue("requested_from", selectedValue);
    closePopup();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    handleSaveProject(data);
  };

  return (
    <form
      id="project_details"
      className="grid grid-cols-3 gap-6 m-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap">
        <label htmlFor="project_type" className="w-2/3">
          Section Name:<span className="text-red-600"> *</span>
        </label>
        <select
          {...register("project_type", { required: true })}
          className="rounded-xl w-4/5"
          onChange={(e) => {
            handleProjectTypeChange(e);
            setValue("project_type", e.target.value);
          }}
        >
          <option value="" disabled hidden>
            Select Project Type
          </option>
          <option value="Oracle">Oracle</option>
          <option value="Business Application">Business Application</option>
          <option value="Power BI">Power BI</option>
          <option value="ERP">ERP</option>
          <option value="Infra">Infra</option>
        </select>
        {errors.project_type && (
          <span className="text-red-600 text-sm">This field is required</span>
        )}
      </div>

      <div className="flex flex-wrap">
        <label htmlFor="project_name" className="w-2/3">
          Project Name:<span className="text-red-600"> *</span>
        </label>
        <input
          {...register("project_name", { required: true })}
          placeholder="Project Name"
          type="text"
          className="rounded-xl w-4/5"
        />
        {errors.project_name && (
          <span className="text-red-600 text-sm">This field is required</span>
        )}
      </div>

      <div className="">
        <label className="w-2/3">
          Requested From:<span className="text-red-600"> *</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            {...register("requested_from", { required: true })}
            value={finalSelection?.value}
            disabled
            // onChange={(e) => {
            //     setValue("requested_from", e.target.value);
            //   }}
            className="rounded-xl w-4/5 border-2 border-gray-400 p-2 h-10"
          />
          <button
            type="button"
            className="rounded-xl w-1/5"
            onClick={(e) => {
              e.stopPropagation();
              setIsPopupOpen(true);
            }}
          >
            <ArrowDownLeftIcon className="w-4 h-4" />
          </button>
        </div>
        {errors.requested_from && (
          <span className="text-red-600 text-sm">This field is required</span>
        )}

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Select Requested From</h2>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="radio"
                    id="department"
                    name="request_type"
                    value="department"
                    checked={selectedType === "department"}
                    onChange={() => handleTypeSelection("department")}
                    className="focus:ring-blue-500"
                  />
                  <label htmlFor="department">Department</label>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="radio"
                    id="division"
                    name="requestType"
                    value="division"
                    checked={selectedType === "division"}
                    onChange={() => handleTypeSelection("division")}
                    className="focus:ring-blue-500"
                  />
                  <label htmlFor="division">Division</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="org"
                    name="requestType"
                    value="org"
                    checked={selectedType === "org"}
                    onChange={() => handleTypeSelection("org")}
                    className="focus:ring-blue-500"
                  />
                  <label htmlFor="org">Organization</label>
                </div>
              </div>

              {selectedType === "department" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => handleValueSelection(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    {deptList?.map((dept) => (
                      <option
                        key={dept.department_id}
                        value={dept.department_name}
                      >
                        {dept.dept_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedType === "division" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Division
                  </label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => handleValueSelection(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    {divisionList?.map((div) => (
                      <option
                        key={div.division_id}
                        value={div.division_fullname}
                      >
                        {div.division_fullname}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedType === "org" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Organization
                  </label>
                  <select
                    value={selectedOrg}
                    onChange={(e) => handleValueSelection(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    {orgList?.map((org) => (
                      <option key={org.org_id} value={org.org_name}>
                        {org.org_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmSelection}
                  disabled={
                    !selectedType ||
                    (selectedType === "department" && !selectedDepartment) ||
                    (selectedType === "division" && !selectedDivision) ||
                    (selectedType === "org" && !selectedOrg)
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap">
        <label htmlFor="priority" className="w-2/3">
          Priority:<span className="text-red-600"> *</span>
        </label>
        <select
          {...register("priority", { required: true })}
          className="rounded-xl w-4/5"
          // value={projectDetails?.priority}
        >
          <option value="" disabled hidden>
            Set Priority
          </option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
        {errors.priority && (
          <span className="text-red-600 text-sm">This field is required</span>
        )}
      </div>

      <div className="flex flex-wrap">
        <label htmlFor="start_date" className="w-2/3">
          Start Date:<span className="text-red-600"> *</span>
        </label>
        <input
          {...register("start_date", {
            required: true,
            validate: (value) => {
              const endDate = document.querySelector(
                'input[name="projected_date"]'
              ).value;
              return (
                new Date(value) <= new Date(endDate) ||
                "Start date must be before end date"
              );
            },
          })}
          type="date"
          placeholder="Start Date"
          className="rounded-xl w-4/5"
        />
        {errors.start_date && (
          <span className="text-red-600 text-sm">
            {errors.start_date.message || "This field is required"}
          </span>
        )}
      </div>

      <div className="flex flex-wrap">
        <label htmlFor="projected_date" className="w-2/3">
          End Date:<span className="text-red-600"> *</span>
        </label>
        <input
          {...register("projected_date", {
            required: true,
            validate: (value) => {
              const startDate = document.querySelector(
                'input[name="start_date"]'
              ).value;
              return (
                new Date(value) >= new Date(startDate) ||
                "End date must be after start date"
              );
            },
          })}
          type="date"
          placeholder="End Date"
          className="rounded-xl w-4/5"
        />
        {errors.projected_date && (
          <span className="text-red-600 text-sm">
            {errors.projected_date.message || "This field is required"}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="project_owner" className="w-2/3">
          Section Owner:
        </label>
        <div className="rounded-xl w-4/5 border-2 border-gray-400 p-2 h-10">
          {projectOwnerName}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="pmo" className="w-2/3">
          Project Manager:
        </label>
        <select
          {...register("pmo", { required: true })}
          className="rounded-xl w-4/5"
          onChange={(e) => {
            handlePmoChange(e);
            setValue("pmo", e.target.value);
          }}
          defaultValue={pmo}
          // value={projectDetails?.pmo}
        >
          <option value="" disabled hidden>
            Select Project Manager
          </option>
          {teamList?.map((pmo) => (
            <option key={pmo.userIndex} value={pmo.userIndex}>
              {pmo.firstname}
            </option>
          ))}
        </select>
        {errors.pmo && (
          <span className="text-red-600 text-sm">This field is required</span>
        )}
      </div>

      <div className="col-span-2 flex flex-col">
        <label htmlFor="project_description" className="w-2/3">
          Project Description:<span className="text-red-600"> *</span>
        </label>
        <Textarea
          {...register("project_description", { required: true })}
          className="rounded-xl"
        />
        {errors.description && (
          <span className="text-red-600 text-sm">This field is required</span>
        )}
      </div>

      <div className="flex flex-wrap">
        <div className="w-2/3"></div>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="rounded-xl w-4/5 bg-gray-600 text-white"
            >
              Select Team
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white overflow-y-auto max-w-[500px]">
            <DialogTitle></DialogTitle>
            <SelectTeam
              userResponsibilityList={userResponsibilityList}
              setUserResponsibilityList={setUserResponsibilityList}
              teamList={teamList}
              setTeamList={setTeamList}
              teamResponsibility={teamResponsibility}
              setTeamResponsibility={setTeamResponsibility}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="col-span-2 h-4">
        <FileAttachment />
      </div>

      <div className="mt-6 items-center">
        <Button
          type="submit"
          className="bg-teal-theme w-4/5 rounded-xl text-white"
        >
          Save Details & Next
        </Button>
      </div>
    </form>
  );
};

export default ProjectDetailsForm;

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import SelectTeam from "@/Components/SelectTeam";
// import axios from "axios";
// import FileAttachment from "@/Components/FileAttachment";
// import {
//   ArrowDownLeftIcon,
//   CalendarIcon,
//   UserIcon,
//   BuildingOfficeIcon,
//   ClipboardDocumentListIcon,
// } from "@heroicons/react/24/solid";
// import {
//   GET_PMO_NAME,
//   GET_TEAMLIST,
//   GET_TEAM_HIERARCHY,
//   ADD_TO_INBOX,
// } from "@/URL";
// import {
//   Calendar,
//   Users,
//   FileText,
//   Settings,
//   ChevronRight,
//   AlertCircle,
// } from "lucide-react";

// const ProjectDetailsForm = ({
//   projectDetails,
//   divisionList,
//   deptList,
//   orgList,
//   teamList,
//   setTeamList,
//   userResponsibilityList,
//   setUserResponsibilityList,
//   teamResponsibility,
//   setTeamResponsibility,
//   setProjectDetails,
//   setActiveTab,
//   setDraftId,
//   draftId,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       project_type: projectDetails?.project_type || "",
//       project_name: projectDetails?.project_name || "",
//       requested_from: projectDetails?.requested_from || "",
//       priority: projectDetails?.priority || "",
//       start_date: projectDetails?.start_date || "",
//       projected_date: projectDetails?.projected_date || "",
//       project_owner: projectDetails?.projectOwnerName || "",
//       pmo: projectDetails?.pmo_id || "",
//       project_description: projectDetails?.project_description || "",
//     },
//   });

//   // State for requested from popup
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedType, setSelectedType] = useState(
//     projectDetails?.requested_from_type
//   );
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState("");
//   const [selectedOrg, setSelectedOrg] = useState("");
//   const [finalSelection, setFinalSelection] = useState(() => {
//     if (projectDetails?.requested_from) {
//       const type = extractActualType(projectDetails.requested_from);
//       const value = extractActualValue(projectDetails.requested_from);
//       return { type, value };
//     }
//     return { type: selectedType, value: "" };
//   });
//   const [projectType, setProjectType] = useState();
//   const [projectOwnerName, setProjetOwnerName] = useState(
//     projectDetails["section_owner"]
//   );
//   const [pmo, setPmo] = useState("");
//   const [pmoId, setPmoId] = useState(projectDetails.pmo_id);
//   const [projectOwnerId, setProjetOwnerId] = useState();
//   // const projectType = watch("project_type");

//   useEffect(() => {
//     getOwnerName();
//   }, [projectType, finalSelection]);

//   useEffect(() => {
//     getTeamHierarchy();
//   }, [pmoId]);

//   const handleProjectTypeChange = (e) => {
//     setProjectType(e.target.value);
//   };

//   const getOwnerName = async () => {
//     try {
//       console.log(projectType);
//       const projectOwnerResponse = await axios.get(GET_PMO_NAME, {
//         params: {
//           project_type: projectType,
//           project_subtype: "",
//           project_platform: "",
//         },
//       });
//       const data = projectOwnerResponse.data;
//       console.log(data[0]);
//       const teamListResponse = axios.get(
//         `${GET_TEAMLIST}/${data[0].MANAGER_USERINDEX}`
//       );
//       const teamListData = (await teamListResponse).data;
//       console.log(data[0]);
//       setProjetOwnerName(data[0].PROJECT_MANAGER_NAME);
//       setProjetOwnerId(data[0].MANAGER_USERINDEX);
//       setTeamList(teamListData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getTeamHierarchy = async () => {
//     try {
//       const response = await axios.get(`${GET_TEAM_HIERARCHY}/${pmoId}`);
//       console.log(response.data);
//       const resData = Array.isArray(response.data)
//         ? response.data
//         : [response.data];
//       setUserResponsibilityList(resData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePmoChange = (e) => {
//     setPmoId(e.target.value);
//     const selectedPmoName = teamList.find(
//       ({ userIndex }) => userIndex.toString() === e.target.value
//     );
//     setPmo(selectedPmoName.firstname);
//   };

//   const handleSaveProject = (data) => {
//     console.log(data);
//     const formData = new FormData(document.getElementById("project_details"));
//     const tempData = {};
//     for (let [key, value] of formData.entries()) {
//       tempData[key] = value;
//     }

//     const normalizedRequestedFrom = {
//       type: extractActualType(finalSelection),
//       value: extractActualValue(finalSelection),
//     };

//     tempData["requested_from"] = normalizedRequestedFrom;
//     tempData["pmo_id"] = pmoId;
//     tempData["pmo"] = pmo;
//     tempData["section_owner"] = projectOwnerName;
//     tempData["pmo_ein"] = teamList.find(
//       ({ userIndex }) => userIndex.toString() === pmoId
//     );
//     console.log("first");
//     setProjectDetails(tempData);
//     console.log("#project");
//     console.log(tempData);
//     sendDataForDraftAndInbox(tempData);
//     alert("Project details have been saved");
//     setActiveTab("task_details");
//   };

//   function extractActualType(selection) {
//     if (!selection) return "";
//     if (
//       selection.value &&
//       typeof selection.value === "object" &&
//       selection.value.type
//     ) {
//       return selection.value.type;
//     }
//     return selection.type || "";
//   }

//   function extractActualValue(selection) {
//     if (!selection) return "";
//     if (
//       selection.value &&
//       typeof selection.value === "object" &&
//       selection.value.value
//     ) {
//       return selection.value.value;
//     }
//     return selection.value || "";
//   }

//   const sendDataForDraftAndInbox = async (projectData) => {
//     try {
//       const res = await axios.post(ADD_TO_INBOX, {
//         project: projectData,
//         tasks: [],
//         teamList: teamList,
//         step: "1",
//         draft_id: draftId === "" ? "" : draftId,
//         flag: "create",
//       });
//       setDraftId(res.data.data.project_id);
//       return res.data.data.project_id;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleTypeSelection = (type) => {
//     setSelectedType(type);
//     setSelectedDepartment("");
//     setSelectedDivision("");
//     setSelectedOrg("");
//   };

//   const handleValueSelection = (value) => {
//     if (selectedType === "department") {
//       setSelectedDepartment(value);
//     } else if (selectedType === "division") {
//       setSelectedDivision(value);
//     } else if (selectedType === "org") {
//       setSelectedOrg(value);
//     }
//   };

//   const confirmSelection = () => {
//     let selectedValue = "";
//     if (selectedType === "department") {
//       selectedValue = selectedDepartment;
//     } else if (selectedType === "division") {
//       selectedValue = selectedDivision;
//     } else if (selectedType === "org") {
//       selectedValue = selectedOrg;
//     }

//     setFinalSelection({ type: selectedType, value: selectedValue });
//     setValue("requested_from", selectedValue);
//     closePopup();
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const onSubmit = (data) => {
//     console.log(data);
//     handleSaveProject(data);
//   };

//   const FormField = ({ children, className = "" }) => (
//     <div className={` ${className}`}>{children}</div>
//   );

//   const Label = ({ children, required = false }) => (
//     <label className="block text-sm font-semibold text-gray-700 mb-1">
//       {children}
//       {required && <span className="text-red-500 ml-1">*</span>}
//     </label>
//   );

//   const Input = ({ icon: Icon, className = "", ...props }) => (
//     <div className="relative">
//       {Icon && (
//         <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//       )}
//       <input
//         className={`
//           w-full px-4 py-3 ${Icon ? "pl-11" : ""}
//           border border-gray-200 rounded-xl
//           focus:ring-2 focus:ring-blue-500 focus:border-transparent
//           transition-all duration-200
//           bg-white shadow-sm hover:shadow-md
//           placeholder-gray-400
//           ${className}
//         `}
//         {...props}
//       />
//     </div>
//   );

//   const Select = ({ icon: Icon, children, className = "", ...props }) => (
//     <div className="relative">
//       {Icon && (
//         <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
//       )}
//       <select
//         className={`
//           w-full px-4 py-3 ${Icon ? "pl-11" : ""}
//           border border-gray-200 rounded-xl
//           focus:ring-2 focus:ring-blue-500 focus:border-transparent
//           transition-all duration-200
//           bg-white shadow-sm hover:shadow-md
//           appearance-none
//           ${className}
//         `}
//         {...props}
//       >
//         {children}
//       </select>
//       <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//         {/* <svg
//           className="w-4 h-4 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg> */}
//       </div>
//     </div>
//   );

//   const ErrorMessage = ({ children }) => (
//     <p className="text-red-500 text-xs mt-1 flex items-center">
//       <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//         <path
//           fillRule="evenodd"
//           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//           clipRule="evenodd"
//         />
//       </svg>
//       {children}
//     </p>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-4 lg:p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-xl shadow-xl border-0 overflow-hidden">
//           {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 sm:px-8"> */}
//           {/* <h1 className="text-2xl sm:text-3xl font-bold text-white">
//               Project Details
//             </h1> */}
//           {/* <p className="text-blue-100 mt-2">
//               Configure your project settings and team assignments
//             </p> */}
//           {/* </div> */}

//           <form
//             id="project_details"
//             className="p-6 sm:p-8 space-y-8"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             {/* Basic Information Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
//                   <Settings className="w-5 h-5 text-green-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Basic Information
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <FormField>
//                   <Label required>Section Name</Label>
//                   <select
//                     icon={BuildingOfficeIcon}
//                     {...register("project_type", { required: true })}
//                     onChange={(e) => {
//                       handleProjectTypeChange(e);
//                       // console.log(e.target.value)
//                       setValue("project_type", e.target.value);
//                     }}
//                     className={`
//           w-full px-4 py-3 }
//           border border-gray-200 rounded-xl
//           focus:ring-2 focus:ring-blue-500 focus:border-transparent
//           transition-all duration-200
//           bg-white shadow-sm hover:shadow-md
//           appearance-none`}
//                   >
//                     <option value="" disabled hidden>
//                       Select Project Type
//                     </option>
//                     <option value="Oracle">Oracle</option>
//                     <option value="Business Application">
//                       Business Application
//                     </option>
//                     <option value="Power BI">Power BI</option>
//                     <option value="ERP">ERP</option>
//                     <option value="Infra">Infra</option>
//                   </select>
//                   {errors.project_type && (
//                     <ErrorMessage>This field is required</ErrorMessage>
//                   )}
//                 </FormField>

//                 <FormField>
//                   <Label required>Project Name</Label>
//                   <Input
//                     icon={ClipboardDocumentListIcon}
//                     {...register("project_name", { required: true })}
//                     placeholder="Enter project name"
//                     type="text"
//                   />
//                   {errors.project_name && (
//                     <ErrorMessage>This field is required</ErrorMessage>
//                   )}
//                 </FormField>

//                 <FormField>
//                   <Label required>Requested From</Label>
//                   <div className="flex space-x-2">
//                     <Input
//                       {...register("requested_from", { required: true })}
//                       value={finalSelection?.value || ""}
//                       disabled
//                       className="flex-1 bg-gray-50"
//                       placeholder="Select source"
//                     />
//                     <button
//                       type="button"
//                       className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 border border-gray-200 shadow-sm"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsPopupOpen(true);
//                       }}
//                     >
//                       <ArrowDownLeftIcon className="w-5 h-5 text-gray-600" />
//                     </button>
//                   </div>
//                   {errors.requested_from && (
//                     <ErrorMessage>This field is required</ErrorMessage>
//                   )}
//                 </FormField>
//               </div>
//             </div>

//             {/* Timeline & Priority Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
//                   <Calendar className="w-5 h-5 text-purple-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Timeline & Priority
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <FormField>
//                   <Label required>Priority</Label>
//                   <Select {...register("priority", { required: true })}>
//                     <option value="" disabled hidden>
//                       Set Priority
//                     </option>
//                     <option value="low">🟢 Low</option>
//                     <option value="medium">🟡 Medium</option>
//                     <option value="high">🔴 High</option>
//                   </Select>
//                   {errors.priority && (
//                     <ErrorMessage>This field is required</ErrorMessage>
//                   )}
//                 </FormField>

//                 <FormField>
//                   <Label required>Start Date</Label>
//                   <Input
//                     icon={CalendarIcon}
//                     {...register("start_date", {
//                       required: true,
//                       validate: (value) => {
//                         const endDate = document.querySelector(
//                           'input[name="projected_date"]'
//                         )?.value;
//                         return (
//                           !endDate ||
//                           new Date(value) <= new Date(endDate) ||
//                           "Start date must be before end date"
//                         );
//                       },
//                     })}
//                     type="date"
//                   />
//                   {errors.start_date && (
//                     <ErrorMessage>
//                       {errors.start_date.message || "This field is required"}
//                     </ErrorMessage>
//                   )}
//                 </FormField>

//                 <FormField>
//                   <Label required>End Date</Label>
//                   <Input
//                     icon={CalendarIcon}
//                     {...register("projected_date", {
//                       required: true,
//                       validate: (value) => {
//                         const startDate = document.querySelector(
//                           'input[name="start_date"]'
//                         )?.value;
//                         return (
//                           !startDate ||
//                           new Date(value) >= new Date(startDate) ||
//                           "End date must be after start date"
//                         );
//                       },
//                     })}
//                     type="date"
//                   />
//                   {errors.projected_date && (
//                     <ErrorMessage>
//                       {errors.projected_date.message ||
//                         "This field is required"}
//                     </ErrorMessage>
//                   )}
//                 </FormField>
//               </div>
//             </div>

//             {/* Team Management Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
//                   <Users className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Team & Management
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField>
//                   <Label>Section Owner</Label>
//                   <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 flex items-center">
//                     <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
//                     {projectOwnerName || "Not assigned"}
//                   </div>
//                 </FormField>

//                 <FormField>
//                   <Label required>Project Manager</Label>
//                   <Select
//                     icon={UserIcon}
//                     {...register("pmo", { required: true })}
//                     onChange={(e) => {
//                       handlePmoChange(e);
//                       setValue("pmo", e.target.value);
//                     }}
//                   >
//                     <option value="" disabled hidden>
//                       Select Project Manager
//                     </option>
//                     {teamList?.map((pmo) => (
//                       <option key={pmo.userIndex} value={pmo.userIndex}>
//                         {pmo.firstname}
//                       </option>
//                     ))}
//                   </Select>
//                   {errors.pmo && (
//                     <ErrorMessage>This field is required</ErrorMessage>
//                   )}
//                 </FormField>
//               </div>
//             </div>

//             {/* Project Description Section */}
//             <div className="space-y-6 flex">
//               {/* <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
//                 Project Description
//               </h2> */}
//               <div>
//                 <Label>Team Selection</Label>
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <button
//                       type="button"
//                       className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
//                     >
//                       Select Team Members
//                     </button>
//                   </DialogTrigger>
//                   <DialogContent className="bg-white overflow-y-auto max-w-[500px] rounded-2xl">
//                     <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
//                       Team Selection
//                     </DialogTitle>
//                     <SelectTeam
//                       userResponsibilityList={userResponsibilityList}
//                       setUserResponsibilityList={setUserResponsibilityList}
//                       teamList={teamList}
//                       setTeamList={setTeamList}
//                       teamResponsibility={teamResponsibility}
//                       setTeamResponsibility={setTeamResponsibility}
//                     />
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </div>

//             {/* Actions Section */}
//             <div className="space-y-6">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
//                   <FileText className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Additional Details
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField>
//                   <Label required>Project Description</Label>
//                   <Textarea
//                     {...register("project_description", { required: true })}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md min-h-[120px] resize-y"
//                     placeholder="Describe your project goals, scope, and key requirements..."
//                   />
//                   {errors.project_description && (
//                     <ErrorMessage>This field is required</ErrorMessage>
//                   )}
//                 </FormField>

//                 <FormField>
//                   <Label>File Attachments</Label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-gray-400 transition-colors duration-200">
//                     <FileAttachment />
//                   </div>
//                 </FormField>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-6 border-t border-gray-200">
//               <Button
//                 type="submit"
//                 className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
//               >
//                 Save Details & Continue
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Requested From Modal */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Select Requested From
//               </h2>
//               <p className="text-gray-600 text-sm mt-1">
//                 Choose the source of this request
//               </p>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className="space-y-3">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                   Request Type
//                 </label>

//                 {[
//                   { id: "department", label: "Department", icon: "🏢" },
//                   { id: "division", label: "Division", icon: "🏛️" },
//                   { id: "org", label: "Organization", icon: "🌐" },
//                 ].map(({ id, label, icon }) => (
//                   <div
//                     key={id}
//                     className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     <input
//                       type="radio"
//                       id={id}
//                       name="request_type"
//                       value={id}
//                       checked={selectedType === id}
//                       onChange={() => handleTypeSelection(id)}
//                       className="w-4 h-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     <label
//                       htmlFor={id}
//                       className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-gray-700"
//                     >
//                       <span className="text-lg">{icon}</span>
//                       <span>{label}</span>
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {selectedType === "department" && (
//                 <FormField>
//                   <Label>Select Department</Label>
//                   <Select
//                     value={selectedDepartment}
//                     onChange={(e) => handleValueSelection(e.target.value)}
//                   >
//                     <option value="">Choose a department...</option>
//                     {deptList?.map((dept) => (
//                       <option
//                         key={dept.department_id}
//                         value={dept.department_name}
//                       >
//                         {dept.dept_name}
//                       </option>
//                     ))}
//                   </Select>
//                 </FormField>
//               )}

//               {selectedType === "division" && (
//                 <FormField>
//                   <Label>Select Division</Label>
//                   <Select
//                     value={selectedDivision}
//                     onChange={(e) => handleValueSelection(e.target.value)}
//                   >
//                     <option value="">Choose a division...</option>
//                     {divisionList?.map((div) => (
//                       <option
//                         key={div.division_id}
//                         value={div.division_fullname}
//                       >
//                         {div.division_fullname}
//                       </option>
//                     ))}
//                   </Select>
//                 </FormField>
//               )}

//               {selectedType === "org" && (
//                 <FormField>
//                   <Label>Select Organization</Label>
//                   <Select
//                     value={selectedOrg}
//                     onChange={(e) => handleValueSelection(e.target.value)}
//                   >
//                     <option value="">Choose an organization...</option>
//                     {orgList?.map((org) => (
//                       <option key={org.org_id} value={org.org_name}>
//                         {org.org_name}
//                       </option>
//                     ))}
//                   </Select>
//                 </FormField>
//               )}
//             </div>

//             <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={closePopup}
//                 className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={confirmSelection}
//                 disabled={
//                   !selectedType ||
//                   (selectedType === "department" && !selectedDepartment) ||
//                   (selectedType === "division" && !selectedDivision) ||
//                   (selectedType === "org" && !selectedOrg)
//                 }
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
//               >
//                 Confirm Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectDetailsForm;
