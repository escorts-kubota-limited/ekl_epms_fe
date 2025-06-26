// import React, { useEffect, useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Pencil, Check, X, Search } from "lucide-react";

// const SelectTeam = ({
//   userList,
//   userResponsibilityList,
//   //   setUserResponsibilityList,
//   // teamList,
//   setTeamList,
// }) => {
//   // const leads = userList;
//   //   console.log(leads)

//   // State management
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [tempLeads, setTempLeads] = useState([]);
//   const [departmentLeads, setDepartmentLeads] = useState({});
//   const [savedAssignments, setSavedAssignments] = useState({});
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [departmentSearch, setDepartmentSearch] = useState("");
//   const [leadSearch, setLeadSearch] = useState("");

//   useEffect(() => {
//     // console.log(savedAssignments);
//     // taskResponsibilityArray()
//     setTeamList(savedAssignments);
//     // debugger
//     // console.log(teamList); // console.log(userResponsibilityList)
//   }, [savedAssignments]);
//   // debugger
//   //returning array of task responsibility
//   //   const taskResponsibilityArray = ()=>{
//   //     let userArray =[];
//   //     Object.entries(savedAssignments).map(([key,value])=>{
//   //         console.log(key,value)
//   //         // userArray.push();
//   //     })
//   //     console.log(userArray);
//   //     // setUserResponsibilityList(()=>({...userResponsibilityList,...userArray}))
//   //   }

//   // Handle department selection
//   const handleDepartmentChange = (event) => {
//     const dept = event.target.value;
//     setSelectedDepartment(dept);
//     setTempLeads(departmentLeads[dept] || []);
//     setShowConfirmation(false);
//     setEditMode(dept in departmentLeads);
//   };
//   // Filter leads based on search
//   const filteredLeads = useMemo(() => {
//     return leads.filter((lead) =>
//       lead.toLowerCase().includes(leadSearch.toLowerCase())
//     );
//   }, [leads, leadSearch]);

//   // Filter departments based on search
//   const filteredDepartments = useMemo(() => {
//     return departments.filter((dept) =>
//       dept.toLowerCase().includes(departmentSearch.toLowerCase())
//     );
//   }, [departments, departmentSearch]);

//   //Get bg colour for department option
//   const getDepartmentOptionClass = (dept) => {
//     if (dept in departmentLeads) {
//       return "bg-blue-100";
//     }
//     return "";
//   };

//   // Handle leads selection
//   const handleTeamSelect = (event) => {
//     const selectedOptions = Array.from(
//       event.target.selectedOptions,
//       (option) => option.value
//     );
//     setTempLeads(selectedOptions);
//     console.log(tempLeads);
//   };

//   // Cancel editing
//   const handleCancelEdit = () => {
//     setTempLeads(departmentLeads[selectedDepartment] || []);
//     setEditMode(false);
//   };

//   // Confirm current selection
//   const handleConfirm = () => {
//     if (selectedDepartment && tempLeads.length > 0) {
//       setDepartmentLeads((prev) => ({
//         ...prev,
//         [selectedDepartment]: tempLeads,
//       }));
//       console.log(departmentLeads);
//       setShowConfirmation(true);
//       setEditMode(false);
//     }
//   };

//   // Save all assignments
//   const handleSaveAll = () => {
//     setSavedAssignments(departmentLeads);
//     setShowConfirmation(false);
//     setSelectedDepartment("");
//     setTempLeads([]);
//   };

//   const displayUser = (ids) => {
//     // console.log(ids);
//     const allNames = [];
//     ids.map((id) => {
//       const selectedPmo = userList.find(
//         ({ user_id }) => user_id.toString() === id
//       );
//       const username = selectedPmo.username;
//       allNames.push(username);
//     });
//     // console.log(allNames);
//     return allNames;
//   };
//   // debugger
//   return (
//     <div className="p-10 max-w-4xl mx-auto max-h-96 overflow-y-auto">
//       <div className="space-y-6">
//         {/* Department Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Department
//           </label>
//           <div className="relative mb-2">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search departments..."
//               value={departmentSearch}
//               onChange={(e) => setDepartmentSearch(e.target.value)}
//               className="pl-8 p-2 w-full border rounded-md"
//             />
//           </div>
//           <select
//             className="w-full p-2 border rounded-md mb-4"
//             value={selectedDepartment}
//             onChange={handleDepartmentChange}
//           >
//             <option value="">Choose a department...</option>
//             {userResponsibilityList.map((dept, index) => (
//               <option
//                 key={index}
//                 value={dept.responsibility}
//                 className={getDepartmentOptionClass(dept.responsibility)}
//               >
//                 {/* {dept.responsibility} */}
//                 {dept.responsibility}{" "}
//                 {dept in departmentLeads ? "(Assigned)" : ""}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Leads Selection */}
//         {selectedDepartment && (
//           <div>
//             <div className="flex flex-col justify-between items-center mb-2">
//               <div className="flex gap-x-20 ">
//                 <div className="text-sm font-medium text-gray-700 mb-2">
//                   Select Responsible Leads (hold Ctrl/Cmd to select multiple)
//                 </div>
//                 {selectedDepartment in departmentLeads && !editMode && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setEditMode(true)}
//                     className=""
//                   >
//                     <Pencil className="w-4 h-4 mr-1" />
//                     Edit
//                   </Button>
//                 )}
//               </div>
//               <div className="relative mb-2">
//                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search leads..."
//                   value={leadSearch}
//                   onChange={(e) => setLeadSearch(e.target.value)}
//                   className="pl-8 p-2 w-full border rounded-md"
//                 />
//               </div>

//               <select
//                 multiple
//                 className="w-full p-2 border rounded-md mb-4"
//                 value={tempLeads}
//                 onChange={handleTeamSelect}
//                 size={5}
//                 disabled={selectedDepartment in departmentLeads && !editMode}
//               >
//                 {/* {leads.map(lead => (
//                 <option key={lead} value={lead}>{lead}</option>
//               ))} */}
//                 {userList?.map((user) => {
//                   return (
//                     <option
//                       key={user.user_id}
//                       value={user.user_id}
//                       // label={user.username}
//                     >
//                       {user.username}({user.email})
//                     </option>
//                   );
//                 })}
//               </select>
//               {/* Confirm Button */}
//               <div className="flex gap-2">
//                 {!editMode && !(selectedDepartment in departmentLeads) && (
//                   <Button
//                     onClick={handleConfirm}
//                     className="flex-1"
//                     disabled={tempLeads.length === 0}
//                   >
//                     <Check className="w-4 h-4 mr-1" />
//                     Confirm
//                   </Button>
//                 )}
//                 {editMode && (
//                   <>
//                     <Button
//                       onClick={handleConfirm}
//                       className="flex-1"
//                       disabled={tempLeads.length === 0}
//                     >
//                       <Check className="w-4 h-4 mr-1" />
//                       Save Changes
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={handleCancelEdit}
//                       className="flex-1"
//                     >
//                       <X className="w-4 h-4 mr-1" />
//                       Cancel
//                     </Button>
//                   </>
//                 )}
//               </div>
//               {/* <Button
//                 onClick={handleConfirm}
//                 className="w-full mb-4"
//                 disabled={tempLeads.length === 0}
//               >
//                 Confirm Selection
//               </Button> */}

//               {/* Confirmation Message */}
//               {showConfirmation && (
//                 <Alert className="mt-4">
//                   <AlertDescription>
//                     {editMode ? "Changes saved" : "Selection confirmed"} for{" "}
//                     {selectedDepartment}!
//                   </AlertDescription>
//                 </Alert>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Current Assignments */}
//         {Object.keys(departmentLeads).length > 0 && (
//           <div className="bg-gray-50 p-4 rounded-md mb-4">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Current Selections
//             </h3>
//             {Object.entries(departmentLeads).map(([dept, leads]) => (
//               <div key={dept} className="mb-2">
//                 <span className="font-medium">{dept}:</span>{" "}
//                 {displayUser(leads).join(", ")}
//               </div>
//             ))}

//             {/* Save All Button */}
//             <Button
//               onClick={handleSaveAll}
//               className="w-full mt-4"
//               variant="outline"
//             >
//               Save All
//             </Button>
//           </div>
//         )}

//         {/* Saved Assignments */}
//         {Object.keys(savedAssignments).length > 0 && (
//           <div className="bg-green-50 p-4 rounded-md">
//             <h3 className="text-lg font-medium text-green-900 mb-2">
//               Saved Assignments
//             </h3>
//             {console.log(Object.entries(savedAssignments))}
//             {Object.entries(savedAssignments).map(([dept, leads]) => (
//               <div key={dept} className="mb-2">
//                 <span className="font-medium">{dept}:</span>{" "}
//                 {displayUser(leads).join(", ")}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
//   // return (
//   //   <div className="p-6 max-w-2xl mx-auto">
//   //     <div className="space-y-6">
//   //       {/* Department Selection */}
//   //       <div>
//   //         <label className="block text-sm font-medium text-gray-700 mb-2">
//   //           Select Department
//   //         </label>
//   //         <select
//   //           className="w-full p-2 border rounded-md mb-4"
//   //           value={selectedDepartment}
//   //           onChange={handleDepartmentChange}
//   //         >
//   //           <option value="">Choose a department...</option>
//   //           {userResponsibilityList.map((dept) => (
//   //             <option
//   //               key={dept}
//   //               value={dept}
//   //               className={getDepartmentOptionClass(dept)}
//   //             >
//   //               {/* {dept} */}
//   //               {dept} {dept in departmentLeads ? "(Assigned)" : ""}
//   //             </option>
//   //           ))}
//   //         </select>
//   //       </div>

//   //       {/* Leads Selection */}
//   //       {selectedDepartment && (
//   //         <div>
//   //           <div className="flex justify-between items-center mb-2">
//   //             <label className="text-sm font-medium text-gray-700">
//   //               Select Responsible Leads (hold Ctrl/Cmd to select multiple)
//   //             </label>
//   //             {selectedDepartment in departmentLeads && !editMode && (
//   //               <Button
//   //                 variant="outline"
//   //                 size="sm"
//   //                 onClick={() => setEditMode(true)}
//   //                 className="ml-2"
//   //               >
//   //                 <Pencil className="w-4 h-4 mr-1" />
//   //                 Edit
//   //               </Button>
//   //             )}
//   //           </div>
//   //           <select
//   //             multiple
//   //             className="w-full p-2 border rounded-md mb-4"
//   //             value={tempLeads}
//   //             onChange={handleLeadChange}
//   //             size={5}
//   //             disabled={selectedDepartment in departmentLeads && !editMode}
//   //           >
//   //             {leads.map((lead) => (
//   //               <option key={lead} value={lead}>
//   //                 {lead}
//   //               </option>
//   //             ))}
//   //           </select>

//   //           {/* Action Buttons */}
//   //           <div className="flex gap-2">
//   //             {!editMode && !(selectedDepartment in departmentLeads) && (
//   //               <Button
//   //                 onClick={handleConfirm}
//   //                 className="flex-1"
//   //                 disabled={tempLeads.length === 0}
//   //               >
//   //                 <Check className="w-4 h-4 mr-1" />
//   //                 Confirm Selection
//   //               </Button>
//   //             )}

//   //             {editMode && (
//   //               <>
//   //                 <Button
//   //                   onClick={handleConfirm}
//   //                   className="flex-1"
//   //                   disabled={tempLeads.length === 0}
//   //                 >
//   //                   <Check className="w-4 h-4 mr-1" />
//   //                   Save Changes
//   //                 </Button>
//   //                 <Button
//   //                   variant="outline"
//   //                   onClick={handleCancelEdit}
//   //                   className="flex-1"
//   //                 >
//   //                   <X className="w-4 h-4 mr-1" />
//   //                   Cancel
//   //                 </Button>
//   //               </>
//   //             )}
//   //           </div>

//   //           {/* Confirmation Message */}
//   //           {showConfirmation && (
//   //             <Alert className="mt-4">
//   //               <AlertDescription>
//   //                 {editMode ? "Changes saved" : "Selection confirmed"} for{" "}
//   //                 {selectedDepartment}!
//   //               </AlertDescription>
//   //             </Alert>
//   //           )}
//   //         </div>
//   //       )}

//   //       {/* Current Assignments */}
//   //       {Object.keys(departmentLeads).length > 0 && (
//   //         <div className="bg-gray-50 p-4 rounded-md mb-4">
//   //           <h3 className="text-lg font-medium text-gray-900 mb-2">
//   //             Current Assignments
//   //           </h3>
//   //           {Object.entries(departmentLeads).map(([dept, leads]) => (
//   //             <div key={dept} className="mb-2">
//   //               <span className="font-medium">{dept}:</span> {leads.join(", ")}
//   //             </div>
//   //           ))}

//   //           {/* Save All Button */}
//   //           <Button
//   //             onClick={handleSaveAll}
//   //             className="w-full mt-4"
//   //             variant="outline"
//   //           >
//   //             <Check className="w-4 h-4 mr-1" />
//   //             Save All Assignments
//   //           </Button>
//   //         </div>
//   //       )}

//   //       {/* Saved Assignments */}
//   //       {Object.keys(savedAssignments).length > 0 && (
//   //         <div className="bg-green-50 p-4 rounded-md">
//   //           <h3 className="text-lg font-medium text-green-900 mb-2">
//   //             Saved Assignments
//   //           </h3>
//   //           {Object.entries(savedAssignments).map(([dept, leads]) => (
//   //             <div key={dept} className="mb-2">
//   //               <span className="font-medium">{dept}:</span> {leads.join(", ")}
//   //             </div>
//   //           ))}
//   //         </div>
//   //       )}
//   //     </div>
//   //   </div>
//   // );
// };

// export default SelectTeam;

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pencil, Check, X, Search } from "lucide-react";
import axios from "axios";
import { select } from "@material-tailwind/react";
import { useAuth } from "@/AuthProvider";

const SelectTeam = ({
  forKmc = false,
  userList,
  userResponsibilityList,
  setUserResponsibilityList,
  teamList,
  setTeamList,
  showTeam = false,
  template,
  setUserList,
  teamResponsibility,
  setTeamResponsibility,
}) => {

  const { data } = useAuth();
  // State management
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [tempLeads, setTempLeads] = useState([]);
  const [departmentLeads, setDepartmentLeads] = useState({});
  const [savedAssignments, setSavedAssignments] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");

  //corporate
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeammates, setSelectedTeammates] = useState([]);
  const [savedTeammates, setSavedTeammates] =
    // data.user_info.division === "Escorts Agri Machinery"
    //   ? useState([...teamResponsibility])
    //   :
       useState([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log(userList, teamList, userResponsibilityList);
  useEffect(() => {
    // console.log("useeffect .....");
    // taskResponsibilityArray()
    // debugger
    // forKmc && setTeamList({ ...teamList, ...savedAssignments });
    if (forKmc) {
      setTeamResponsibility({ ...teamResponsibility, ...savedAssignments });
    }
    if (!forKmc) {
      setTeamResponsibility([...savedTeammates]);
    }
    // setTeamList();
    // if (showTeam) {
    //   const getDepartment = async () => {
    //     const [userListResponse, responsibilitiesListResponse] =
    //       await Promise.all([
    //         axios.get(USER_RESPONSIBILITY_URL),
    //         axios.get(`${GET_RESPONSIBILITIES_LIST}/${template}`),
    //       ]);
    //     console.log(userListResponse.data);
    //     console.log(responsibilitiesListResponse.data);
    //     // setTaskUserList(response.data);
    //     // const list = "list";
    //     //console.log(userList);
    //     //const taskUserList = {};
    //     //taskUserList[list] = response.data;
    //     // console.log(taskUserList);
    //     const userListData = userListResponse.data;
    //     const userResponsibilityData = responsibilitiesListResponse.data;
    //     setUserList(userListData);
    //     setUserResponsibilityList(userResponsibilityData);
    //   };
    //   getDepartment();
    // }
    // debugger
    // console.log(teamList); // console.log(userResponsibilityList)
  }, [savedTeammates, savedAssignments]);
  // [departmentLeads, savedAssignments]);

  // useEffect(() => {
  //   getUserAsPerDeparment();
  // }, [selectedDepartment]);
  // debugger
  // Filter departments based on search
  console.log(teamResponsibility);
  // useEffect(()=>{
  //   console.log("#######")
  // },[])

  const getUserAsPerDeparment = async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  };
  const filteredDepartments = useMemo(() => {
    return (
      forKmc &&
      userResponsibilityList?.filter((dept) =>
        dept.responsibility
          .toLowerCase()
          .includes(departmentSearch.toLowerCase())
      )
    );
  }, [userResponsibilityList, departmentSearch]);

  // Filter leads based on search
  const filteredLeads = useMemo(() => {
    return userList?.filter((lead) => {
      // const firstName = lead?.firstName || "";
      // console.log(lead, leadSearch);
      // console.log(leadSearch.toLowerCase());
      return lead.firstName.toLowerCase().includes(leadSearch.toLowerCase());
    });
  }, [userList, leadSearch]);

  // Handle department selection
  const handleDepartmentChange = (event) => {
    const dept = event.target.value;
    setSelectedDepartment(dept);
    setTempLeads(departmentLeads[dept] || []);
    setShowConfirmation(false);
    setEditMode(dept in departmentLeads);
  };

  console.log("component .....");

  // Handle leads selection
  const handleLeadChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTempLeads(selectedOptions);
  };

  // Confirm current selection
  const handleConfirm = () => {
    if (selectedDepartment && tempLeads.length > 0) {
      setDepartmentLeads((prev) => ({
        ...prev,
        [selectedDepartment]: tempLeads,
      }));
      setShowConfirmation(true);
      setEditMode(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setTempLeads(departmentLeads[selectedDepartment] || []);
    setEditMode(false);
  };

  // Save all assignments
  const handleSaveAll = () => {
    console.log(departmentLeads);
    setSavedAssignments(departmentLeads);
    setShowConfirmation(false);
    setSelectedDepartment("");
    setTempLeads([]);
    setEditMode(false);
  };

  // Get background color for department option
  const getDepartmentOptionClass = (dept) => {
    if (dept in departmentLeads) {
      return "bg-blue-100";
    }
    return "";
  };
  const displayUser = (ids) => {
    // console.log(ids);
    const allNames = [];
    // ids?.map((id) => {
    //   // console.log(userList);
    //   // if (showTeam) {
    //   //   const username =
    //   // } else {
    //   const selectedPmo = userList.filter(
    //     ({ user_id }) => user_id.toString() === id
    //   );
    //   // console.log(selectedPmo);
    //   const username = selectedPmo[0].username;
    //   allNames.push(username);
    //   // console.log(selectedPmo.username)
    //   // }
    // });
    if (ids && ids.length >= 1) {
      for (let i = 0; i < ids.length; i++) {
        const selectedPmo = userList.filter(
          ({ userIndex }) =>
            userIndex.toString() === ids[i] || userIndex === ids[i]
        );
        // console.log(selectedPmo)
        allNames.push(selectedPmo[0]?.firstName);
        // console.log(allNames)
      }
    }
    // console.log(allNames);
    return allNames;
  };

  // console.log(teamList);

  // Filter team list based on search term

  if (!forKmc) {
    const filteredTeamList = userResponsibilityList?.filter((teammate) =>
      // {console.log(teammate)}
      teammate.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Toggle teammate selection
  const toggleTeammate = (teammate) => {
    setSelectedTeammates((prev) =>
      prev.find((t) => t.userIndex === teammate.userIndex)
        ? prev.filter((t) => t.userIndex !== teammate.userIndex)
        : [...prev, teammate]
    );
  };

  // Save selected teammates
  const saveTeammates = () => {
    setSavedTeammates([...selectedTeammates]);
    setIsOpen(false);
  };
  console.log(savedTeammates);

  // Remove saved teammate
  const removeSavedTeammate = (userIndex) => {
    setSavedTeammates((prev) => prev.filter((t) => t.userIndex !== userIndex));
  };

  // Edit saved teammates
  const editSavedTeammates = () => {
    setSelectedTeammates(savedTeammates);
    setIsOpen(true);
  };
  return (
    <div className="p-6 mx-auto max-h-[600px]">
      {forKmc && (
        <div className="">
          {/* Department Selection with Search */}
          {
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Department
              </label>
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={departmentSearch}
                  onChange={(e) => setDepartmentSearch(e.target.value)}
                  className="pl-8 p-2 w-[50vw] border rounded-md"
                />
              </div>
              <select
                className="w-full p-2 border rounded-md mb-4"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                size={
                  departmentSearch
                    ? Math.min(filteredDepartments.length + 1, 5)
                    : 1
                }
              >
                <option value="">Choose a department...</option>
                {filteredDepartments?.map((dept, index) => (
                  <option
                    key={index}
                    value={dept.responsibility}
                    className={getDepartmentOptionClass(dept.responsibility)}
                  >
                    {/* {dept.responsibility} */}
                    {dept.responsibility}{" "}
                    {dept in departmentLeads ? "(Assigned)" : ""}
                  </option>
                ))}
              </select>
            </div>
          }
          {/* Leads Selection with Search */}
          {selectedDepartment && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Select Responsible Leads
                </label>
                {selectedDepartment in departmentLeads && !editMode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditMode(true)}
                    className="ml-2"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}
              </div>
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="pl-8 p-2 w-full border rounded-md"
                />
              </div>
              <select
                multiple
                className="w-full p-2 border rounded-md mb-4"
                value={tempLeads}
                onChange={handleLeadChange}
                size={5}
                disabled={selectedDepartment in departmentLeads && !editMode}
              >
                {filteredLeads?.map((user) => {
                  return (
                    <option
                      key={user.userIndex}
                      value={user.userIndex}
                      // label={user.username}
                    >
                      {user.firstName}({user.email})
                    </option>
                  );
                })}
              </select>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!editMode && !(selectedDepartment in departmentLeads) && (
                  <Button
                    onClick={handleConfirm}
                    className="flex-1"
                    disabled={tempLeads.length === 0}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Confirm Selection
                  </Button>
                )}

                {editMode && (
                  <>
                    <Button
                      onClick={handleConfirm}
                      className="flex-1"
                      disabled={tempLeads.length === 0}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>

              {/* Confirmation Message */}
              {showConfirmation && (
                <Alert className="mt-4">
                  <AlertDescription>
                    {editMode ? "Changes saved" : "Selection confirmed"} for{" "}
                    {selectedDepartment}!
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          {/* Current Assignments */}
          {Object.keys(departmentLeads).length > 0 && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Current Assignments
              </h3>
              {Object.entries(departmentLeads).map(([dept, leads]) => (
                <div key={dept} className="mb-2">
                  <span className="font-medium">{dept}:</span>
                  {displayUser(leads).join(", ")}
                </div>
              ))}

              {/* Save All Button */}
              <Button
                onClick={handleSaveAll}
                className="w-full mt-4"
                variant="outline"
              >
                <Check className="w-4 h-4 mr-1" />
                Save All Assignments
              </Button>
            </div>
          )}
          {/* Saved Assignments */}
          {/* {console.log(teamResponsibility)}{" "} */}
          {Object.keys(teamResponsibility).length > 0 && (
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-green-900 mb-2">
                Saved Assignments
              </h3>
              {Object.entries(teamResponsibility).map(([dept, leads]) => (
                <div key={dept} className="mb-2">
                  <span className="font-medium">{dept}:</span>
                  {displayUser(leads).join(", ")}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {!forKmc && (
        <div className="h-[500px] w-96">
          <h2 className="text-xl font-bold mb-2">Team Selection</h2>

          {/* Saved Teammates Display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {savedTeammates?.map((teammate) => (
              <div
                key={teammate.userIndex}
                className="bg-blue-100 px-2 py-1 rounded flex items-center"
              >
                {teammate.firstname}
                <button
                  onClick={() => removeSavedTeammate(teammate.userIndex)}
                  className="ml-2 text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {Object.entries(savedTeammates).length > 0 && (
              <button
                onClick={editSavedTeammates}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                Edit
              </button>
            )}
          </div>

          {/* Team Selection Dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="border p-2 rounded flex items-center justify-between cursor-pointer"
            >
              <span>
                {selectedTeammates.length > 0
                  ? `${selectedTeammates.length} teammates selected`
                  : "Select teammates"}
              </span>
              <div className="flex items-center">{isOpen ? "▲" : "▼"}</div>
            </div>

            {isOpen && (
              <div className="absolute z-10 w-full border rounded mt-1 bg-white shadow-lg">
                {/* Search Input */}
                <div className="p-2 flex items-center border-b">
                  <Search size={16} className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search teammates"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>

                {/* Teammate List */}
                <div className="max-h-60 overflow-y-auto">
                  {userResponsibilityList?.length > 0 ? (
                    userResponsibilityList?.map((teammate) => (
                      <div
                        key={teammate.userIndex}
                        onClick={() => toggleTeammate(teammate)}
                        className={`p-2 flex items-center cursor-pointer hover:bg-gray-100 
                        ${
                          selectedTeammates.find((t) => t.id === teammate.id)
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={
                            !!selectedTeammates.find(
                              (t) => t.userIndex === teammate.userIndex
                            )
                          }
                          readOnly
                          className="mr-2"
                        />
                        <span>{teammate.firstname}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-gray-500">
                      No teammates found
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="p-2 border-t flex justify-end">
                  <Button
                    onClick={saveTeammates}
                    // className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    className="rounded-xl w-4/5"
                  >
                    <Check size={16} className="mr-2" />
                    Save Selection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTeam;
