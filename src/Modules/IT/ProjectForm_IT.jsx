import React, { useEffect, useState } from "react";
// import { Label } from "@/Components/ui/label";
// import { Input } from "@/Components/ui/input";
import axios from "axios";
import {
  // ADD_PROJECT_URL,
  // USER_LIST_URL,
  // GET_RESPONSIBILITIES_LIST,
  GET_PMO_NAME,
  GET_TEAMLIST,
  GET_TEAM_HIERARCHY,
} from "@/URL";
import { Button } from "@/Components/ui/button";
// import ProjectDetails from "@/Components/ProjectDetails";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  // DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import SelectTeam from "@/Components/SelectTeam";
import { Textarea } from "@/Components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/Components/ui/select";
import FileAttachment from "@/Components/FileAttachment";
// import RequestedFrom from "./RequestedFrom";
import { ArrowDownLeftIcon } from "@heroicons/react/24/solid";
// import { Value } from "@radix-ui/react-select";
// import { useAuth } from "@/AuthProvider";
// import { GET_REQUESTED_FROM } from "@/URL";

function ProjectForm_IT({
  setProjectDetails,
  projectDetails = null,
  setTrue = false,
  inEditWindow = false,
  setActiveTab,
  setUserList,
  // userList,
  teamResponsibility,
  setTeamResponsibility,
  userResponsibilityList,
  setUserResponsibilityList,
  teamList,
  setTeamList,
  divisionList,
  deptList,
  orgList,
}) {
  console.log(divisionList, deptList, orgList, teamList);
  const [projectType, setProjectType] = useState();
  const [projectOwnerName, setProjetOwnerName] = useState(
    projectDetails["section_owner"]
  );
  const [projectOwnerId, setProjetOwnerId] = useState();
  const [requestedFrom, setRequestedFrom] = useState({
    type: "",
    value: "",
  });

  const [formData, setFormData] = useState({
    sectionName: "",
    projectName: "",
    priority: "",
    startDate: "",
    endDate: "",
    sectionOwner: "",
    projectManager: "",
    requestedFrom: {
      type: "",
      value: "",
    },
  });
  // const departments = [...deptList];
  // const divisions = [...divisionList];
  // const orgs = [...orgList];

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showRequestedFromPopup, setShowRequestedFromPopup] = useState(false);

  // State to track selected values
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [pmo, setPmo] = useState("");
  const [pmoId, setPmoId] = useState(projectDetails["pmo_id"]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  cosnt [draftId,setDraftId] = useState(null);

  // State to track which type is currently selected (department, division, or org)
  const [selectedType, setSelectedType] = useState("");

  // console.log(projectDetails.requestedFrom);
  // State to store the final selected value
  const [finalSelection, setFinalSelection] = useState({
    type: "",
    value: "",
  });

  useEffect(() => {
    // if (projectType) {
    // if (startDate && endDate) {
    //   if(endDate<startDate){
    //     alert("Please enter valid start/end date.");
    //   }

    // }
    getOwnerName();
    // }
    // if (pmo) {
    // console.log("yes");
    getTeamHierarchy();
    // }
    // setProjectDetails(() => ({
    //   ...projectDetails,
    //   requested_from: requestFrom,
    // }));
  }, [projectType, pmoId, finalSelection]);

  const handleProjectTypeChange = (e) => {
    setProjectType(e.target.value);
  };
  const handleSaveProject = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("project_details"));
    // console.log(formData.entries())
    const tempData = {};
    for (let [key, value] of formData.entries()) {
      tempData[key] = value;
    }

    //handling empty project details;
    let flag = false;
    for (const [key, value] of Object.entries(tempData)) {
      if (value === "") {
        flag = true;
      }
    }
    if (flag) {
      alert("Please fill all the required details.");
    } else {
      tempData["requested_from"] = finalSelection;
      tempData["pmo_id"] = pmoId;
      tempData["pmo"] = pmo;
      tempData["section_owner"] = projectOwnerName;
      console.log("first");
      setProjectDetails(tempData);
      console.log("#project");
      console.log(tempData);
      alert("Project details have been saved");
      setActiveTab("task_details");
      
    }
  };

 
  console.log(projectDetails, teamResponsibility);
  // const handleFormChange = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(document.getElementById("project_details"));
  //   const tempData = {};
  //   for (let [key, value] of formData.entries()) {
  //     if (key === "pmo") {
  //       const selectedUser = userList.find((user_id) => {
  //         user_id.toString() === value;
  //       });
  //       tempData[key] = selectedUser.username;
  //     } else {
  //       tempData[key] = value;
  //     }
  //   }
  //   setProjectDetails(tempData);
  //   // console.log(projectDetails);
  // };

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
  console.log(teamList);
  const handleSaveDraft = (e) => {
    e.preventDefault();
  };
  // const handleGetPmo = (e) => {
  //   // e.preventDefault();
  //   // const formData = new FormData(document.getElementById("project_details"));
  //   // console.log(formData["project_platform"])
  //   if (projectType && projectSubType) {
  //     setProjectPlatform(e.target.value);
  //   } else alert("Enter Project Type & Subtype");
  //   // console.log(pmoName);

  // };

  const handleRequestedFromSelect = (type, value) => {
    setFormData({
      ...formData,
      requestedFrom: { type, value },
    });

    setRequestedFrom({
      type: type,
      value: value,
    });
    // setProjectDetails(() => ({
    //   ...projectDetails,
    //   requested_from: formData.requestedFrom,
    // }));
    setShowRequestedFromPopup(false);
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

  console.log(userResponsibilityList);

  const handlePmoChange = (e) => {
    setPmoId(e.target.value);
    const selectedPmoName = teamList.find(
      ({ userIndex }) => userIndex.toString() === e.target.value
    );
    setPmo(selectedPmoName.firstname);
  };

  console.log(teamList);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleValueSelection = (value) => {
    switch (selectedType) {
      case "department":
        setSelectedDepartment(value);
        break;
      case "division":
        setSelectedDivision(value);
        break;
      case "org":
        setSelectedOrg(value);
        break;
      default:
        break;
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const confirmSelection = () => {
    let value = "";

    switch (selectedType) {
      case "department":
        value = selectedDepartment;
        break;
      case "division":
        value = selectedDivision;
        break;
      case "org":
        value = selectedOrg;
        break;
      default:
        break;
    }

    setFinalSelection({
      type: selectedType,
      value: value,
    });

    closePopup();
  };

  // console.log(finalSelection);
  return (
    <div>
      <form
        id="project_details"
        className="grid grid-cols-3 gap-6 m-6"
        //onSubmit={handleSaveProject}
        // onChange={handleFormChange}
        //defaultValue={projectDataValues}
      >
        <div className="flex flex-wrap">
          <label htmlFor="project_type" className="w-2/3">
            Section Name:<span className="text-red-600"> *</span>
          </label>
          {/* <Select
            defaultValue={projectDetails.project_department}
            name="project_department"
            className="rounded-xl w-4/5"
          >
            <SelectTrigger className="h-8">
              <SelectValue
                placeholder={projectDetails.project_department}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem/>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <select
            name="project_type"
            className="rounded-xl w-4/5"
            //value={projectDetails?.project_type}
            onChange={handleProjectTypeChange}
            defaultValue={projectDetails?.project_type}
            required
          >
            <option name="" disabled selected hidden>
              Select Project Type
            </option>
            <option name="oracle">Oracle</option>
            <option name="business_application">Business Application</option>
            <option name="power_bi">Power BI</option>
            <option name="erp">ERP</option>
            <option name="infra">Infra</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="project_name" className="w-2/3">
            Project Name:<span className="text-red-600"> *</span>
          </label>
          <input
            placeholder="Project Name"
            type="text"
            name="project_name"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.project_name}
          />
        </div>
        <div className="">
          <label className="w-2/3">
            Requested From:<span className="text-red-600"> *</span>
          </label>
          <div className="flex items-center gap-2">
            {/* <div className="rounded-xl w-3/5 border-2 border-gray-400 p-2 h-10">
                {finalSelection.value}
              </div> */}
            <input
              name="requested_from"
              value={finalSelection.value}
              disabled
              className="rounded-xl w-4/5 border-2 border-gray-400 p-2 h-10"
            />
            {/* debugger */}
            {/* <Dialog>
                <DialogTrigger> */}
            <button
              className="rounded-xl w-1/5"
              onClick={(e) => {
                e.stopPropagation();
                setIsPopupOpen(true);
              }}
            >
              <ArrowDownLeftIcon className="w-4 h-4" />
            </button>
            {/* </DialogTrigger>
                <DialogContent>
                  <RequestedFrom
                    divisionList={divisionList}
                    deptList={deptList}
                    orgList={orgList}
                  />
                </DialogContent>
              </Dialog> */}
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                  Select Requested From
                </h2>

                {/* Selection Type Radio Buttons */}
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

                {/* Conditional Dropdowns */}
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

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
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
            name="priority"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.task_priority}
            required
          >
            <option name="" disabled selected hidden>
              Set Priority
            </option>
            <option name="medium">Medium</option>
            <option name="high">High</option>
            <option name="low">Low</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="start_date" className="w-2/3">
            Start Date:<span className="text-red-600"> *</span>
          </label>
          <input
            type="date"
            placeholder="Start Date"
            name="start_date"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.start_date}
            // onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="projected_date" className="w-2/3">
            End Date:<span className="text-red-600"> *</span>
          </label>
          <input
            type="date"
            placeholder="End Date"
            name="projected_date"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.projected_date}
            // onChange={(e) => {
            //   if(e.target.value<start){
            //     alert("Please enter valid end date.")
            //   }
            //   setEndDate(e.target.value);
            // }}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="project_owner" className="w-2/3">
            {/* Design Responsibility:<span className="text-red-600"> *</span> */}
            Section Owner:
          </label>
          <div className="rounded-xl w-4/5 border-2 border-gray-400 p-2 h-10">
            {projectOwnerName}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pmo" className="w-2/3">
            {/* Design Responsibility:<span className="text-red-600"> *</span> */}
            Project Manager:
          </label>
          {/* <Select
          // value={row.original[accessorKey] || ""}
          // onValueChange={(value) =>
          //   handleCellChange(row.original.id, accessorKey, value)
          // }
          >
            <SelectTrigger className="w-full">
              <SelectValue
              // placeholder={row.original[accessorKey] || "Select..."}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem>x</SelectItem>
                <SelectItem>x</SelectItem>
                <SelectItem>x</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <select
            name="pmo"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.pmo}
            required
            onChange={(e) => handlePmoChange(e)}
          >
            <option key="" value="" selected disabled>
              Select Project Manager
            </option>
            {teamList?.map((pmo) => (
              <option key={pmo.userIndex} value={pmo.userIndex}>
                {/* {console.log(pmo)} */}
                {pmo.firstname}
              </option>
            ))}
          </select>
        </div>
        {/* <div></div> */}
        <div className="flex flex-col">
          {/* <label htmlFor="" className="w-2/3">
            &nbsp;
          </label> */}
          {/* 
          <Dialog>
            <DialogTrigger>
              <Button
                // onClick={openPopup}
                // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                className="rounded-xl w-4/5"
              >
                Requested From
              </Button>{" "}
            </DialogTrigger>
            <DialogContent>
              <RequestedFrom
              // setRequestFrom={setRequestFrom}
              // requestFrom={requestFrom}
              />
            </DialogContent>
          </Dialog> */}
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="project_description" className="w-2/3">
            Project Description:<span className="text-red-600"> *</span>
          </label>
          <Textarea
            className="rounded-xl "
            name="description"
            defaultValue={projectDetails.description}
          />
        </div>
        <div className="flex flex-wrap">
          <div className="w-2/3"></div>
          <Dialog>
            <DialogTrigger asChild>
              {/* <Button
                type="submit"
                className="rounded-xl w-4/5"
                // onClick={pendingApprovalAction}
              > */}
              <button className="rounded-xl w-4/5 bg-gray-600 text-white">
                Select Team
              </button>
              {/* </Button> */}
            </DialogTrigger>
            <DialogContent className=" bg-white  overflow-y-auto max-w-[500px] ">
              <DialogTitle></DialogTitle>
              {/* <div className=""> */}
              <SelectTeam
                // userList={userList}
                userResponsibilityList={userResponsibilityList}
                setUserResponsibilityList={setUserResponsibilityList}
                teamList={teamList}
                setTeamList={setTeamList}
                teamResponsibility={teamResponsibility}
                setTeamResponsibility={setTeamResponsibility}
                // setUserList={setUserList}
                // forKmc={false}
              />
              {/* </div> */}
            </DialogContent>
          </Dialog>
        </div>

        <div className="col-span-2 h-4">
          <FileAttachment />
        </div>
        {/* <div className="mt-6 items-center"> */}
        {/* <Button
            //type="secondary"
            className="bg-gray-600 w-4/5 rounded-xl text-black"
          >
            Save As Draft
          </Button> */}
        {/* </div> */}
        <div className="mt-6 items-center">
          <Button
            type="submit"
            className="bg-teal-theme w-4/5 rounded-xl text-white"
            onClick={handleSaveProject}
          >
            Save Details & Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm_IT;
