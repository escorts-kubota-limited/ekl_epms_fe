// import React, { useEffect, useState } from "react";
// import { Search } from "lucide-react";
// import ApprovalListItem from "./ApprovalListItem";
// import axios from "axios";
// import { useAuth } from "@/AuthProvider";
// import { SEND_APPROVAL_REQUEST_URL, SEND_PRR_APPROVAL } from "@/URL";

// const ApprovalTabItem = ({
//   activeTab,
//   approvalsList,
//   setApprovalsList,
//   showPrr = false,
// }) => {
//   const [approvals, setApprovals] = useState(approvalsList);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [pendingApprovalCount, setPendingApprovalCount] = useState(() => {
//     let ct = 0;
//     approvalsList.map((approval) => {
//       if (approval.approval_status === "pending") {
//         ct += 1;
//       }
//     });
//     return ct;
//   });
//   const [approvedApprovalCount, setApprovedApprovalCount] = useState(() => {
//     let ct = 0;
//     approvalsList.map((approval) => {
//       if (approval.approval_status === "approved") {
//         ct += 1;
//       }
//     });
//     return ct;
//   });
//   const [prrApprovalCount, setPrrApprovalCount] = useState(() => {
//     let ct = 0;
//     approvalsList.map((approval) => {
//       if (approval.prr === "true") {
//         ct += 1;
//       }
//     });
//     return ct;
//   });
//   const { data } = useAuth();
//   const user_data = data.user_info;
//   // console.log("child", setApprovalsList);
//   useEffect(() => {
//     setApprovalsList(approvals);
//   }, [approvals, setApprovalsList]);
//   //   console.log(approvedApprovalCount, pendingApprovalCount);

//   const handleSearch = (event) => {
//     const term = event.target.value.toLowerCase();
//     console.log(term);
//     setSearchTerm(term);

//     const filteredapprovals = approvalsList.filter(
//       (approval) =>
//         approval.project_name.toLowerCase().includes(term) ||
//         approval.project_code.toLowerCase().includes(term)
//     );

//     setApprovals(filteredapprovals);
//     console.log(approvals);
//   };

//   const handleApprovalAction = (action, id, forPrr = false) => {
//     console.log(id, action);
//     const updatedapprovals = approvalsList.map((approval) =>
//       approval.id === id ? { ...approval, approval_status: action } : approval
//     );
//     console.log(updatedapprovals);
//     const sendApprovalStatusRequest = async () => {
//       console.log(user_data);
//       try {
//         const response = await axios.post(
//           `${forPrr ? SEND_PRR_APPROVAL : SEND_APPROVAL_REQUEST_URL}`,
//           {
//             user_id: user_data.ein,
//             id: id,
//             approval_status: action,
//           }
//         );
//         if (action == "approved") {
//           setApprovedApprovalCount(approvedApprovalCount + 1);
//         }
//         setPendingApprovalCount(pendingApprovalCount - 1);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     sendApprovalStatusRequest();
//     setApprovals(updatedapprovals);
//   };

//   return (
//     <div className="w-full mx-auto p-4 ">
//       <div className="relative mb-4 mt-6">
//         <input
//           type="text"
//           placeholder="Search approvals by project name or project code"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="w-full p-2 pl-8 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
//         />
//         <Search className="absolute left-2 top-3 text-gray-400" size={18} />
//       </div>

//       <div className="border rounded-md max-h-[calc(100vh-230px)] overflow-y-auto bg-gray-200">
//         {approvals.length === 0 ? (
//           <div className="p-4 text-center text-gray-500">
//             No Approvals found
//           </div>
//         ) : pendingApprovalCount === 0 && activeTab === "pending_approvals" ? (
//           <div className="p-4 text-center text-gray-500">
//             No Pending Approvals found
//           </div>
//         ) : approvedApprovalCount === 0 &&
//           activeTab === "approved_approvals" ? (
//           <div className="p-4 text-center text-gray-500">
//             No Approved Approvals found
//           </div>
//         ) : (
//           approvals.map((approval) => {
//             if (activeTab === "pending_approvals") {
//               return (
//                 approval.approval_status === "pending" &&
//                 !approval.is_prr && (
//                   <ApprovalListItem
//                     approval={approval}
//                     handleApprovalAction={handleApprovalAction}
//                   />
//                 )
//               );
//             } else if (activeTab === "approved_approvals") {
//               return (
//                 approval.approval_status === "approved" && (
//                   <ApprovalListItem
//                     approval={approval}
//                     handleApprovalAction={handleApprovalAction}
//                   />
//                 )
//               );
//             } else if (activeTab === "all_prr") {
//               return (
//                 approval.is_prr &&
//                 approval.approval_status === "pending" && (
//                   <ApprovalListItem
//                     approval={approval}
//                     handleApprovalAction={handleApprovalAction}
//                     isPrr={true}
//                   />
//                 )
//               );
//             } else {
//               return (
//                 <ApprovalListItem
//                   approval={approval}
//                   handleApprovalAction={handleApprovalAction}
//                   showAll={true}
//                 />
//               );
//             }
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApprovalTabItem;


import React, { useEffect, useState } from "react";
import { Search, Filter, FileText, Clock, AlertCircle } from "lucide-react";
import ApprovalListItem from "./ApprovalListItem";
import axios from "axios";
import { useAuth } from "@/AuthProvider";
import { SEND_APPROVAL_REQUEST_URL, SEND_PRR_APPROVAL } from "@/URL";
import { Badge } from "@/Components/ui/badge";

const ApprovalTabItem = ({
  activeTab,
  approvalsList,
  setApprovalsList,
  showPrr = false,
}) => {
  const [approvals, setApprovals] = useState(approvalsList);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const [pendingApprovalCount, setPendingApprovalCount] = useState(() => {
    return approvalsList.filter(approval => approval.approval_status === "pending").length;
  });
  
  const [approvedApprovalCount, setApprovedApprovalCount] = useState(() => {
    return approvalsList.filter(approval => approval.approval_status === "approved").length;
  });
  
  const [prrApprovalCount, setPrrApprovalCount] = useState(() => {
    return approvalsList.filter(approval => approval.is_prr).length;
  });

  const { data } = useAuth();
  const user_data = data.user_info;

  useEffect(() => {
    setApprovalsList(approvals);
  }, [approvals, setApprovalsList]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setIsSearching(term.length > 0);

    if (term === '') {
      setApprovals(approvalsList);
      return;
    }

    const filteredapprovals = approvalsList.filter(
      (approval) =>
        approval.project_name.toLowerCase().includes(term) ||
        approval.project_code.toLowerCase().includes(term)
    );

    setApprovals(filteredapprovals);
  };

  const handleApprovalAction = (action, id, forPrr = false) => {
    const updatedapprovals = approvalsList.map((approval) =>
      approval.id === id ? { ...approval, approval_status: action } : approval
    );
    
    const sendApprovalStatusRequest = async () => {
      try {
        const response = await axios.post(
          `${forPrr ? SEND_PRR_APPROVAL : SEND_APPROVAL_REQUEST_URL}`,
          {
            user_id: user_data.ein,
            id: id,
            approval_status: action,
          }
        );
        if (action === "approved") {
          setApprovedApprovalCount(approvedApprovalCount + 1);
        }
        setPendingApprovalCount(pendingApprovalCount - 1);
      } catch (err) {
        console.error(err);
      }
    };
    
    sendApprovalStatusRequest();
    setApprovals(updatedapprovals);
  };

  const getEmptyStateContent = () => {
    const emptyStates = {
      pending_approvals: {
        icon: <Clock className="h-12 w-12 text-gray-400 mb-4" />,
        title: "No Pending Approvals",
        description: "All caught up! No pending approvals at the moment."
      },
      approved_approvals: {
        icon: <FileText className="h-12 w-12 text-gray-400 mb-4" />,
        title: "No Approved Approvals",
        description: "No approved approvals found in your records."
      },
      all_prr: {
        icon: <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />,
        title: "No PRR Approvals",
        description: "No PRR approvals found at the moment."
      },
      default: {
        icon: <FileText className="h-12 w-12 text-gray-400 mb-4" />,
        title: "No Approvals Found",
        description: isSearching ? "Try adjusting your search terms." : "No approvals available."
      }
    };

    const state = emptyStates[activeTab] || emptyStates.default;
    
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        {state.icon}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{state.title}</h3>
        <p className="text-gray-500 text-center max-w-md">{state.description}</p>
      </div>
    );
  };

  const filteredApprovals = approvals.filter((approval) => {
    if (activeTab === "pending_approvals") {
      return approval.approval_status === "pending" && !approval.is_prr;
    } else if (activeTab === "approved_approvals") {
      return approval.approval_status === "approved";
    } else if (activeTab === "all_prr") {
      return approval.is_prr && approval.approval_status === "pending";
    }
    return true; // all_approvals
  });

  return (
    <div className="w-full">
      {/* Search Header */}
      <div className="p-6 border-b bg-gray-50/50">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by project name or code..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
            /> */}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {filteredApprovals.length} {filteredApprovals.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredApprovals.length === 0 ? (
          getEmptyStateContent()
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredApprovals.map((approval) => (
              <ApprovalListItem
                key={approval.id}
                approval={approval}
                handleApprovalAction={handleApprovalAction}
                showAll={activeTab === "all_approvals"}
                isPrr={activeTab === "all_prr"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalTabItem;