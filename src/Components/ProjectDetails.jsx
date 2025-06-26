import React, { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import ShowTeam from "./ShowTeam";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import SelectTeam from "./SelectTeam";
import { Textarea } from "@material-tailwind/react";
import { ClipboardList } from "lucide-react";

function ProjectDetails({
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
  teamResponsibility,
  setTeamResponsibility,
  setTeamList,
  setUserList,
  forKmc = false,
}) {
  console.log(teamResponsibility);

  const handleUpdatedProjectData = (e) => {
    e.preventDefault();
    const formData = new FormData(
      document.getElementById("project_details_update")
    );
    const tempData = {};

    for (let [key, value] of formData.entries()) {
      if (key === "pmo") {
        const selectedPmo = userList.find(
          ({ user_id }) => user_id.toString() === value
        );
        tempData["pmo_id"] = value;
        value = selectedPmo.username;
      }
      console.log(key, value);
      tempData[key] = value;
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

  const summaryData = {
    uplNumber: projectDetails?.upl_number,
    volumeData: projectDetails?.volume_data,
    uplData: projectDetails?.upl_data,
  };

  const FormField = ({
    label,
    children,
    required = false,
    colSpan = false,
  }) => (
    <div className={`space-y-2 ${colSpan ? "col-span-full" : ""}`}>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  const DisplayValue = ({ value, className = "" }) => (
    <div
      className={`
      px-4 py-3 
      bg-gray-50 dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700 
      rounded-lg 
      text-gray-900 dark:text-gray-100
      min-h-[44px] 
      flex items-center
      ${className}
    `}
    >
      {value || "Not specified"}
    </div>
  );

  const InputField = ({
    type = "text",
    name,
    defaultValue,
    required = false,
    children,
    ...props
  }) => {
    if (type === "select") {
      return (
        <select
          name={name}
          defaultValue={defaultValue}
          required={required}
          className="
            w-full px-4 py-3 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-colors duration-200
          "
          {...props}
        >
          {children}
        </select>
      );
    }

    return (
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="
          w-full px-4 py-3 
          border border-gray-300 dark:border-gray-600 
          rounded-lg 
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200
        "
        {...props}
      />
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-2 space-y-6 -mt-6 -ml-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Details
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {onProjectEdit ? "Edit project information" : "View project information"}
          </p>
        </div> */}

        <div className="p-6">
          <form
            id="project_details_update"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            onSubmit={handleUpdatedProjectData}
          >
            {/* Project Type */}
            <FormField label="Project Type">
              <DisplayValue value={projectDetails?.project_type} />
            </FormField>

            {/* Project Sub Type */}
            <FormField label="Project Sub Type">
              <DisplayValue value={projectDetails?.project_subtype} />
            </FormField>

            {/* Market (conditional) */}
            {projectDetails?.project_type === "New Products" && (
              <FormField label="Market">
                <DisplayValue value={projectDetails?.market} />
              </FormField>
            )}

            {/* Project Code (conditional) */}
            {showProjectCode && (
              <FormField label="Project Code">
                <DisplayValue value={projectDetails?.project_code} />
              </FormField>
            )}

            {/* Project Name */}
            <FormField label="Project Name">
              <DisplayValue value={projectDetails?.project_name} />
            </FormField>

            {/* Project Platform */}
            <FormField label="Project Platform" required={onProjectEdit}>
              {onProjectEdit ? (
                <InputField
                  type="select"
                  name="project_platform"
                  defaultValue={projectDetails?.project_platform}
                  required
                >
                  <option value="" disabled>
                    Select Project Platform
                  </option>
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
                </InputField>
              ) : (
                <DisplayValue value={projectDetails?.project_platform} />
              )}
            </FormField>

            {/* Platform Segment */}
            <FormField label="Platform Segment">
              <DisplayValue value={projectDetails?.platform_segment} />
            </FormField>

            {/* Start Date */}
            <FormField label="Start Date" required={onProjectEdit}>
              {onProjectEdit ? (
                <InputField
                  type="date"
                  name="start_date"
                  defaultValue={projectDetails?.start_date}
                  required
                />
              ) : (
                <DisplayValue value={projectDetails?.start_date} />
              )}
            </FormField>

            {/* Priority */}
            <FormField label="Priority" required={onProjectEdit}>
              {onProjectEdit ? (
                <InputField
                  type="select"
                  name="priority"
                  defaultValue={projectDetails?.priority}
                  required
                >
                  <option value="" disabled>
                    Set Priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </InputField>
              ) : (
                <DisplayValue
                  value={projectDetails?.priority}
                  className={`
                    ${
                      projectDetails?.priority === "high"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : ""
                    }
                    ${
                      projectDetails?.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : ""
                    }
                    ${
                      projectDetails?.priority === "low"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : ""
                    }
                  `}
                />
              )}
            </FormField>

            {/* Project Template */}
            <FormField label="Project Template">
              <DisplayValue value={projectDetails?.project_template} />
            </FormField>

            {/* Project Manager */}
            <FormField label="Project Manager">
              <DisplayValue value={projectDetails?.pmo} />
            </FormField>

            {/* Development Code (conditional) */}
            {projectDetails?.development_code && (
              <FormField label="Development Code">
                <DisplayValue value={projectDetails?.development_code} />
              </FormField>
            )}

            {/* Project Code */}
            <FormField label="Project Code">
              <DisplayValue
                value={
                  projectDetails?.project_code === ""
                    ? "Auto Generated"
                    : projectDetails?.project_code
                }
              />
            </FormField>

            {/* Project Description - Full Width */}
            <FormField
              label="Project Description"
              required={onProjectEdit}
              colSpan
            >
              {onProjectEdit ? (
                <Textarea
                  name="project_description"
                  defaultValue={projectDetails?.project_description}
                  className="w-full min-h-[120px] resize-none"
                />
              ) : (
                <div className="w-full">
                  <Textarea
                    value={projectDetails?.project_description}
                    disabled
                    className="w-full min-h-[120px] resize-none opacity-70"
                  />
                </div>
              )}
            </FormField>
            {/* {!forUpdateTask && ( */}
             <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="
                inline-flex items-center px-6 py-3 
                bg-gradient-to-r from-gray-600 to-gray-700 
                hover:from-gray-700 hover:to-gray-800 
                text-white font-medium rounded-lg 
                transition-all duration-200 
                shadow-md hover:shadow-lg
                focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full
              "
                  >
                    {/* <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    > */}
                    {/* <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    /> */}
                    {/* </svg> */}
                   View Team
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-900 max-h-[90vh] max-w-5xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Team Selection
                    </DialogTitle>
                  </DialogHeader>
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
            {/* )} */}

            {/* Save Button */}
            {onProjectEdit && (
              <div className="col-span-full pt-4">
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="
                      px-8 py-3 
                      bg-gradient-to-r from-blue-600 to-blue-700 
                      hover:from-blue-700 hover:to-blue-800 
                      text-white font-semibold rounded-lg 
                      transition-all duration-200 
                      shadow-lg hover:shadow-xl
                      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    "
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </form>
          <div className="max-w-7xl mx-auto p-6 bg-white">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <ClipboardList className="w-5 h-5 text-gray-600" />
                <h1 className="text-xl font-semibold text-gray-900">
                  UPL & Volume Summary
                </h1>
              </div>
              <p className="text-sm text-gray-600">
                UPL Number: {summaryData.uplNumber}
              </p>
            </div>

            {/* Annual Volume Table */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Annual Volume
              </h2>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Y-1
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Y-2
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Y-3
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {summaryData?.volumeData?.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.model}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {row.y1.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {row.y2.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {row.y3.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UPL Details Table */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                UPL Details
              </h2>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aggregates
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        UPL
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Specs
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change Specs
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {summaryData?.uplData?.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {row.aggregate}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {row.upl}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                          <div className="break-words">{row.currentSpec}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                          <div className="break-words">{row.changeSpec}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 max-w-xs">
                          <div className="break-words">{row.changeDetails}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
    </div>
  );
}

export default ProjectDetails;
