import React, { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import axios, { Axios } from "axios";
import {
  ADD_PROJECT_URL,
  USER_LIST_URL,
  GET_RESPONSIBILITIES_LIST,
  GET_PMO_NAME,
} from "@/URL";
import { Button } from "@/Components/ui/button";
import ProjectDetails from "./ProjectDetails";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import SelectTeam from "./SelectTeam";
import { useAuth } from "@/AuthProvider";

function ProjectForm({
  setProjectDetails,
  projectDetails = null,
  setTrue = false,
  inEditWindow = false,
  setActiveTab,
  setUserList,
  userList,
  userResponsibilityList,
  setUserResponsibilityList,
  teamList,
  setTeamList,
  teamResponsibility,
  setTeamResponsibility
}) {
  const [projectType, setProjectType] = useState(
    projectDetails["project_type"]
  );
  const [projectSubType, setProjectSubType] = useState(
    projectDetails["project_subtype"]
  );
  const [projectPlatform, setProjectPlatform] = useState(
    projectDetails["project_platform"]
  );
  const [pmoName, setPmoName] = useState(projectDetails["pmo"]);
  const [pmoId,setPmoId]= useState(projectDetails["pmo_id"])
  const [projectTemplate, setProjectTemplate] = useState("");
  const [projectDataValues, setProjectDataValues] = useState();
  // const taskUserList = {};
  // console.log(teamList);

  const {data} = useAuth()
  const getUserAndResponsibilityList = async () => {
    try {
      const [userListResponse, responsibilitiesListResponse] =
        await Promise.all([
          axios.get(USER_LIST_URL),
          axios.get(`${GET_RESPONSIBILITIES_LIST}/${projectTemplate}`),
        ]);
      console.log(userListResponse.data);
      console.log(responsibilitiesListResponse.data);
      // setTaskUserList(response.data);
      // const list = "list";
      //console.log(userList);
      //const taskUserList = {};
      //taskUserList[list] = response.data;
      // console.log(taskUserList);

      const userListData = userListResponse.data;
      const userResponsibilityData = responsibilitiesListResponse.data;
      // console.log(userListData)
      setUserList(userListData);
      setUserResponsibilityList(userResponsibilityData);
      // console.log(userList+"#########USER");
      //console.log(taskUserList);
      //userList = taskUserList.list;
      console.log(userList);
      console.log(userResponsibilityList);
    } catch (err) {
      console.error(err);
    }
  };
  const getPmoName = async () => {
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
      setPmoName(data[0].PROJECT_MANAGER_NAME);
      setPmoId(data[0].MANAGER_USERINDEX)
      // console.log(selectedPmo)
      // console.log(projectDetails)
      // setProjectDetails(()=>({...projectDetails,pmo: pmoName}))
      // console.log(projectDetails);
      // response.data
      // let pmoId = ""
      // const selectedPmo = userList.find(
      //   ({ user_id }) => user_id.toString() === pmoName
      // );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    // if (userList?.length === 0) {
      getUserAndResponsibilityList();
    // }
    if (projectType && projectSubType && projectPlatform) {
      getPmoName();
      // console.log("xyz")
    }
    // console.log(projectDetails)
  }, [projectPlatform, projectDetails,projectTemplate]);

  const handleProjectTypeChange = (e) => {
    setProjectType(e.target.value);
  };

  // const onPmoSelect = (field, value) => {
  //   const selectedOption = userList.find(
  //     ({ user_id }) => user_id.toString() === value
  //   );
  //   projectDetails = {
  //     ...projectDetails,
  //     [field]: selectedOption.username,
  //   };
  // };

  const handleProjectTemplateChange = (e) => {
    setProjectTemplate(e.target.value);
    //setIsProjectTemplate(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("project_details"));
    console.log(formData.entries())
    const tempData = {};
    for (let [key, value] of formData.entries()) {
      // console.log(key, "##", value);
      // if (key === "pmo") {
      //   console.log(userList)
      //   console.log(value)
      //   const selectedPmo = userList.find(({ username }) => username === value);
      //   console.log(selectedPmo);
      //   tempData["pmo_id"] = selectedPmo.user_id;
      //   // tempData["pmo"]=pmoName
      //   // console.log(selectedPmo)
      //   // value = selectedPmo.username;
      // }
      tempData[key] = value;
    }
    tempData["pmo"]=pmoName
    tempData["pmo_id"]=pmoId
    tempData["keyword"] = data.user_info.keyword


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
      setProjectDetails(tempData);
      console.log("#project");
      console.log(tempData);
      alert("Project details have been saved");
      setActiveTab("task_details");
    }
  };
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

  const handleSaveDraft = (e) => {
    e.preventDefault();
  };
  const handleProjectSubtypeChange = (e) => {
    setProjectSubType(e.target.value);
  };
  const handleGetPmo = (e) => {
    // e.preventDefault();
    // const formData = new FormData(document.getElementById("project_details"));
    // console.log(formData["project_platform"])
    if (projectType && projectSubType) {
      setProjectPlatform(e.target.value);
    } else alert("Enter Project Type & Subtype");
    // console.log(pmoName);

    // if (projectType !== "" && projectSubType !== "") {
    //   // const getPmoName = async () => {
    //   //   try {
    //   //     const response = await axios.get(GET_PMO_NAME, {
    //   //       params: {
    //   //         project_type: projectType,
    //   //         project_subtype: projectSubType,
    //   //         project_platform: projectPlatform,
    //   //       },
    //   //     });
    //   //     console.log(response);
    //   //   } catch (err) {
    //   //     console.error(err);
    //   //   }
    //   // };
    //   // getPmoName();
    // } else {
    //   alert("Please give a valid Project Type and Sub Type");
    // }
  };
  const handlePmoChange = (e) => {};

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
            Project Type:<span className="text-red-600"> *</span>
          </label>
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
            <option name="new_products">New Products</option>
            <option name="current_products">Current Products</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="project_subtype" className="w-2/3">
            Project Sub Type:<span className="text-red-600"> *</span>
          </label>
          <select
            name="project_subtype"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.project_subtype}
            onChange={handleProjectSubtypeChange}
            required
          >
            <option name="" disabled selected hidden>
              Select Project Sub Type
            </option>
            {(projectType === "New Products" ||
              projectDetails?.project_type === "New Products") && (
              <>
                <option name="new_model">New Model</option>
                <option name="variant_upgrade">Variant Upgrade</option>
              </>
            )}
            {(projectType === "Current Products" ||
              projectDetails?.project_type === "Current Products") && (
              <>
                <option name="4M">4M</option>
                <option name="CPI">CPI</option>
                <option name="FSC">FSC</option>
                <option name="VE">VE</option>
              </>
            )}
          </select>
        </div>
        {projectType === "New Products" ||
        projectDetails?.project_type === "New Products" ? (
          <div className="flex flex-wrap">
            <label htmlFor="market" className="w-2/3">
              Market:<span className="text-red-600"> *</span>
            </label>
            <select
              name="market"
              className="rounded-xl w-4/5"
              defaultValue={projectDetails?.market}
              required
            >
              <option name="domestic">DNP</option>
              <option name="export">ENP</option>
              <option name="technial">TNP</option>
            </select>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex flex-wrap">
          <label htmlFor="project_platform" className="w-2/3">
            Project Platform:<span className="text-red-600"> *</span>
          </label>
          <select
            name="project_platform"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.project_platform}
            onChange={handleGetPmo}
            required
          >
            <option name="" disabled selected hidden>
              Select Project Platform
            </option>
            <option name="farmtrac">Farmtrac</option>
            <option name="powertrac">Powertrac</option>
            <option name="compact">Compact</option>
            <option name="exports - New >50HP">{`Exports - New >50HP`}</option>
            <option name="ftNets">FT NETS</option>
            <option name="bt5">BT 5</option>
            <option name="bs5">BS 5</option>
            <option name="eab">EAB</option>
            <option name="newEV">New EV</option>
            <option name="ftpt">FT PT</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="platform_segment" className="w-2/3">
            Platform Segment:<span className="text-red-600"> *</span>
          </label>
          <select
            name="platform_segment"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.project_segment}
            required
          >
            <option name="ft">FT</option>
            <option name="pt">PT</option>
            <option name="ft-pt">FT-PT</option>
            <option name="e75">E 75</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="project_name" className="w-2/3" required>
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
            required
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="projected_date" className="w-2/3">
            Projected Date:<span className="text-red-600"> *</span>
          </label>
          <input
            type="date"
            placeholder="Projected Date"
            name="projected_date"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.projected_date}
            required
          />
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="priority" className="w-2/3">
            Priority:<span className="text-red-600"> *</span>
          </label>
          <select
            name="priority"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.priority}
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
          <label htmlFor="project_template" className="w-2/3">
            Project Template:<span className="text-red-600"> *</span>
          </label>
          <select
            name="project_template"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.project_template}
            onChange={handleProjectTemplateChange}
            required
          >
            <option name="" disabled selected hidden>
              Select Project Template
            </option>
            <option name="major">Major</option>
            <option name="minor">Minor</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pmo" className="w-2/3">
            {/* Design Responsibility:<span className="text-red-600"> *</span> */}
            PMO:
          </label>
          {/* <input
            placeholder="Design Responsibility"
            name="pmo"
            type="text"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.pmo}
            required
          /> */}
          {/* <input
            name="pmo"
            required
            className="rounded-xl w-4/5"
            type="text"
            defaultValue={pmoName}
            onChange={handlePmoChange}
          /> */}
          <div
            name="pmo"
            required
            className="rounded-xl w-4/5 border-2 border-gray-400 p-2 h-10"
            // type="text"
            // defaultValue={pmoName}
            // onChange={handlePmoChange}
          >{pmoName}</div>

          {/* <select
            name="pmo"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.pmo_id}
            // defaultValue={pmoName}
            required
            // onChange={(e) => {
            //   onPmoSelect("pmo", e.target.value);
            // }}
          >
            <option name="" selected>
              Select User
            </option>
            {userList?.map((user) => {
              return (
                <option
                  key={user.user_id}
                  value={user.user_id}
                  className="bg-gray-300"
                  // label={user.username}
                >
                  {user.username}({user.email})
                </option>
              );
            })}
          </select> */}
        </div>
        <div className="flex flex-wrap">
          <label htmlFor="development_code" className="w-2/3">
            Development Code:<span className="text-red-600"> *</span>
          </label>
          <input
            type="text"
            placeholder="Development Code"
            name="development_code"
            className="rounded-xl w-4/5"
            defaultValue={projectDetails?.development_code}
            // required
          />
        </div>
        <div className="flex flex-wrap">
          {/* <label htmlFor="selectTeam" className="w-2/3"> */}
            {/* Design Responsibility:<span className="text-red-600"> *</span> */}
            {/* <span className="text-red-600"> *</span> */}
          {/* </label> */}
          <div className="w-2/3"></div>
          <Dialog>
            <DialogTrigger asChild>
              {/* <Button
                type="primary"
                className="rounded-xl w-4/5"
                // onClick={pendingApprovalAction}
              > */}
              <button className="rounded-xl w-4/5 bg-gray-600 text-white">Select Team</button>
              {/* </Button> */}
            </DialogTrigger>
            <DialogContent className=" bg-white  overflow-y-auto max-w-4xl">
              <DialogTitle></DialogTitle>
              {console.log(teamList)}
              {console.log(userList,userResponsibilityList,teamResponsibility,teamList)}
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

        {/* <div>
          <Button>Select Team</Button>
        </div> */}
        {/* <div></div> */}
        <div className="mt-6 items-center">
          {/* <Button
            //type="secondary"
            className="bg-gray-600 w-4/5 rounded-xl text-black"
          >
            Save As Draft
          </Button> */}
        </div>
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

export default ProjectForm;
