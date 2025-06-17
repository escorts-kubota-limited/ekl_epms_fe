import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ApprovalListItem from "./ApprovalListItem";
import axios from "axios";
import { useAuth } from "@/AuthProvider";
import { SEND_APPROVAL_REQUEST_URL, SEND_PRR_APPROVAL } from "@/URL";

const ApprovalTabItem = ({
  activeTab,
  approvalsList,
  setApprovalsList,
  showPrr = false,
}) => {
  const [approvals, setApprovals] = useState(approvalsList);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingApprovalCount, setPendingApprovalCount] = useState(() => {
    let ct = 0;
    approvalsList.map((approval) => {
      if (approval.approval_status === "pending") {
        ct += 1;
      }
    });
    return ct;
  });
  const [approvedApprovalCount, setApprovedApprovalCount] = useState(() => {
    let ct = 0;
    approvalsList.map((approval) => {
      if (approval.approval_status === "approved") {
        ct += 1;
      }
    });
    return ct;
  });
  const [prrApprovalCount, setPrrApprovalCount] = useState(() => {
    let ct = 0;
    approvalsList.map((approval) => {
      if (approval.prr === "true") {
        ct += 1;
      }
    });
    return ct;
  });
  const { data } = useAuth();
  const user_data = data.user_info;
  // console.log("child", setApprovalsList);
  useEffect(() => {
    setApprovalsList(approvals);
  }, [approvals, setApprovalsList]);
  //   console.log(approvedApprovalCount, pendingApprovalCount);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    console.log(term);
    setSearchTerm(term);

    const filteredapprovals = approvalsList.filter(
      (approval) =>
        approval.project_name.toLowerCase().includes(term) ||
        approval.project_code.toLowerCase().includes(term)
    );

    setApprovals(filteredapprovals);
    console.log(approvals);
  };

  const handleApprovalAction = (action, id, forPrr = false) => {
    console.log(id, action);
    const updatedapprovals = approvalsList.map((approval) =>
      approval.id === id ? { ...approval, approval_status: action } : approval
    );
    console.log(updatedapprovals);
    const sendApprovalStatusRequest = async () => {
      console.log(user_data);
      try {
        const response = await axios.post(
          `${forPrr ? SEND_PRR_APPROVAL : SEND_APPROVAL_REQUEST_URL}`,
          {
            user_id: user_data.ein,
            id: id,
            approval_status: action,
          }
        );
        if (action == "approved") {
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

  return (
    <div className="w-full mx-auto p-4 ">
      <div className="relative mb-4 mt-6">
        <input
          type="text"
          placeholder="Search approvals by project name or project code"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 pl-8 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <Search className="absolute left-2 top-3 text-gray-400" size={18} />
      </div>

      <div className="border rounded-md max-h-[calc(100vh-230px)] overflow-y-auto bg-gray-200">
        {approvals.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No Approvals found
          </div>
        ) : pendingApprovalCount === 0 && activeTab === "pending_approvals" ? (
          <div className="p-4 text-center text-gray-500">
            No Pending Approvals found
          </div>
        ) : approvedApprovalCount === 0 &&
          activeTab === "approved_approvals" ? (
          <div className="p-4 text-center text-gray-500">
            No Approved Approvals found
          </div>
        ) : (
          approvals.map((approval) => {
            if (activeTab === "pending_approvals") {
              return (
                approval.approval_status === "pending" &&
                !approval.is_prr && (
                  <ApprovalListItem
                    approval={approval}
                    handleApprovalAction={handleApprovalAction}
                  />
                )
              );
            } else if (activeTab === "approved_approvals") {
              return (
                approval.approval_status === "approved" && (
                  <ApprovalListItem
                    approval={approval}
                    handleApprovalAction={handleApprovalAction}
                  />
                )
              );
            } else if (activeTab === "all_prr") {
              return (
                approval.is_prr &&
                approval.approval_status === "pending" && (
                  <ApprovalListItem
                    approval={approval}
                    handleApprovalAction={handleApprovalAction}
                    isPrr={true}
                  />
                )
              );
            } else {
              return (
                <ApprovalListItem
                  approval={approval}
                  handleApprovalAction={handleApprovalAction}
                  showAll={true}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default ApprovalTabItem;
