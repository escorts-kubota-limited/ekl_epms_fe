// import React from "react";

// function ShowApprovalHistory({ history }) {
//     const allApprovalStatus = history
//   console.log(allApprovalStatus);
//   return (
//     <div className="flex-col gap-2">
//       {allApprovalStatus.map((approval) => (
//         <div>
//             {console.log(approval)}
//           {approval.firstName}: {"   "}  {approval.approval_status}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ShowApprovalHistory;
import React, { useState, useEffect } from "react";
import { Check, Clock, X, AlertCircle } from "lucide-react";
import { GET_PRR_HISTORY, GET_APPROVAL_HISTORY } from "@/URL";
import axios from "axios";

// Mock data structure - replace with your actual API call
// const fetchApprovalData = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         requestId: "REQ-2025-04-07-001",
//         requestTitle: "Budget Increase for Q3 Marketing Campaign",
//         requestDate: "2025-04-02",
//         status: "In Progress",
//         departmentHeads: [
//           {
//             id: 1,
//             name: "Sarah Johnson",
//             department: "Marketing",
//             status: "approved",
//             date: "2025-04-03",
//             comments: "Looks good to me",
//           },
//           {
//             id: 2,
//             name: "Michael Chen",
//             department: "Finance",
//             status: "rejected",
//             date: "2025-04-04",
//             comments: "Need more justification for the expense",
//           },
//           {
//             id: 3,
//             name: "David Rodriguez",
//             department: "Operations",
//             status: "pending",
//             date: null,
//             comments: null,
//           },
//           {
//             id: 4,
//             name: "Emily Williams",
//             department: "Legal",
//             status: "approved",
//             date: "2025-04-05",
//             comments: "No legal concerns",
//           },
//           {
//             id: 5,
//             name: "Robert Kim",
//             department: "IT",
//             status: "waiting",
//             date: null,
//             comments: null,
//           },
//         ],
//       });
//     }, 1000);
//   });
// };

const ShowApprovalHistory = ({ approval }) => {
  const [approvalData, setApprovalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status,setStatus] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          `${approval.is_prr ? GET_PRR_HISTORY : GET_APPROVAL_HISTORY}/${
            approval.id
          }`
        );
        console.log(response.data);
        setApprovalData([...response.data]);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError("Failed to load approval data");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (approvalData) {
      checkOverallStatus();
    }
  }, [approvalData]);

  // const handleViewStatus = () => {
  const getHistory = async () => {
    const response = await axios.get(
      `${approval.is_prr ? GET_PRR_HISTORY : GET_APPROVAL_HISTORY}/${
        approval.id
      }`
    );
    console.log(response.data);
    setApprovalData(() => [...response.data]);
  };
  // getHistory();
  // };

  const checkOverallStatus=()=>{
    let flag = true;
    console.log(approvalData)
    approvalData?.forEach(element => {
      if(element.approval_status==="pending"){
        flag=false;
      }
    });
    console.log(flag)
    if(flag){
      setStatus("approved");
    }else{
      setStatus("pending");
    }

  }
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <X className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending Review";
      default:
        return "Awaiting Turn";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-gray-700">
          Loading approval data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className=" bg-white shadow-md rounded-lg overflow-hidden max-h-96 overflow-y-visible">
      {/* Request Header */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {approval.project_code}
            </h2>
            <div className="flex space-x-4 mt-1 text-sm text-gray-600">
              <span>Name: {approval.project_name}</span>
              <span>Submitted: {approval.createdAt}</span>
            </div>
          </div>
          <div className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            {/* {getStatusText(approval.approval_status)} */}
            {getStatusText(status)}
          </div>
        </div>
      </div>

      {/* Approval List */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Department Approvals
        </h3>
        <div className="space-y-4">
          {/* {console.log(approvalData)} */}
          {approvalData.map((head) => (
            <div key={head.id} className="border rounded-lg overflow-hidden">
              <div className="flex items-center p-4">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{head.firstName}</h4>
                  {/* <p className="text-sm text-gray-600">
                    {head.department} Department
                  </p> */}
                </div>
                <div className="flex items-center space-x-4">
                  {head.date && (
                    <span className="text-sm text-gray-600">{head.updatedAt}</span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusClass(
                      head.approval_status
                    )}`}
                  >
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(head.approval_status)}
                      <span>{getStatusText(head.approval_status)}</span>
                    </div>
                  </span>
                </div>
              </div>
              {/* {head.comments && (
                <div className="bg-gray-50 px-4 py-3 border-t">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Comment:</span>{" "}
                    {head.comments}
                  </p>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowApprovalHistory;
