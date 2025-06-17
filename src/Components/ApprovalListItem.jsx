import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ShowApprovalHistory from "./ShowApprovalHistory";

function ApprovalListItem({ approval, handleApprovalAction, showAll = false }) {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApprovalOnClick = () => {
    // Only navigate if the dialog is not open
    if (!dialogOpen) {
      approval.is_prr
        ? navigate(`/showprr/` + `${approval.id}`, {
            state: { rowData: { id: approval.id } },
          })
        : navigate(`/projects/individualproject/` + `${approval.id}`, {
            state: { rowData: { project_id: approval.id } },
          });
    }
  };
  return (
    <div>
      <div
        key={approval.id}
        className={`grid grid-cols-6 items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors `}
        onClick={handleApprovalOnClick}
      >
        <div className="col-span-2">
          <div className="font-semibold">{approval.project_name}</div>
          <div className=" text-gray-500">
            {approval.is_prr ? approval.prr_number : approval.project_code}
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-gray-500"
              >
                View Status
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl bg-white"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <DialogHeader className="">Approval History</DialogHeader>
              <ShowApprovalHistory approval={approval} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="col-span-1 flex justify-end">
          {approval.approval_status === "pending" && !showAll && (
            <div className="flex space-x-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprovalAction(
                    "approved",
                    approval.id,
                    approval.is_prr
                  );
                }}
                className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                <Check size={30} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprovalAction(
                    "rejected",
                    approval.project_id,
                    approval.is_prr
                  );
                }}
                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={30} className="" />
              </button>
            </div>
          )}
          {approval.approval_status !== "pending" && (
            <div
              className={`text-lg mt-1 ${
                approval.approval_status === "approved"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {approval.approval_status === "approved"
                ? "Approved"
                : "Rejected"}
            </div>
          )}
          {approval.approval_status === "pending" && showAll && (
            <div className="text-lg mt-1 text-gray-600">
              {approval.approval_status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApprovalListItem;
