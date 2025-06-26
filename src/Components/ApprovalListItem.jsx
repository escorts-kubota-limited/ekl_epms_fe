// import React, { useState } from "react";
// import { Check, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import ShowApprovalHistory from "./ShowApprovalHistory";

// function ApprovalListItem({ approval, handleApprovalAction, showAll = false }) {
//   const navigate = useNavigate();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleApprovalOnClick = () => {
//     // Only navigate if the dialog is not open
//     if (!dialogOpen) {
//       approval.is_prr
//         ? navigate(`/showprr/` + `${approval.id}`, {
//             state: { rowData: { id: approval.id } },
//           })
//         : navigate(`/projects/individualproject/` + `${approval.id}`, {
//             state: { rowData: { project_id: approval.id } },
//           });
//     }
//   };
//   return (
//     <div>
//       <div
//         key={approval.id}
//         className={`grid grid-cols-6 items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors `}
//         onClick={handleApprovalOnClick}
//       >
//         <div className="col-span-2">
//           <div className="font-semibold">{approval.project_name}</div>
//           <div className=" text-gray-500">
//             {approval.is_prr ? approval.prr_number : approval.project_code}
//           </div>
//         </div>
//         <div className="col-span-3 grid grid-cols-3 gap-4">
//           <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                 }}
//                 className="bg-gray-500"
//               >
//                 View Status
//               </Button>
//             </DialogTrigger>
//             <DialogContent
//               className="max-w-4xl bg-white"
//               onInteractOutside={(e) => e.preventDefault()}
//             >
//               <DialogHeader className="">Approval History</DialogHeader>
//               <ShowApprovalHistory approval={approval} />
//             </DialogContent>
//           </Dialog>
//         </div>
//         <div className="col-span-1 flex justify-end">
//           {approval.approval_status === "pending" && !showAll && (
//             <div className="flex space-x-8">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleApprovalAction(
//                     "approved",
//                     approval.id,
//                     approval.is_prr
//                   );
//                 }}
//                 className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600"
//               >
//                 <Check size={30} />
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleApprovalAction(
//                     "rejected",
//                     approval.project_id,
//                     approval.is_prr
//                   );
//                 }}
//                 className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
//               >
//                 <X size={30} className="" />
//               </button>
//             </div>
//           )}
//           {approval.approval_status !== "pending" && (
//             <div
//               className={`text-lg mt-1 ${
//                 approval.approval_status === "approved"
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {approval.approval_status === "approved"
//                 ? "Approved"
//                 : "Rejected"}
//             </div>
//           )}
//           {approval.approval_status === "pending" && showAll && (
//             <div className="text-lg mt-1 text-gray-600">
//               {approval.approval_status}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ApprovalListItem;

import React, { useState } from "react";
import { Check, X, Eye, Calendar, User, Building2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ShowApprovalHistory from "./ShowApprovalHistory";

function ApprovalListItem({ approval, handleApprovalAction, showAll = false, isPrr = false }) {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApprovalOnClick = () => {
    if (!dialogOpen) {
      approval.is_prr
        ? navigate(`/showprr/${approval.id}`, {
            state: { rowData: { id: approval.id } },
          })
        : navigate(`/projects/individualproject/${approval.id}`, {
            state: { rowData: { project_id: approval.id } },
          });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (isRrr) => {
    return isRrr 
      ? 'bg-purple-100 text-purple-800 border-purple-200'
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="group hover:bg-gray-50/50 transition-colors duration-200">
      <div
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={handleApprovalOnClick}
      >
        {/* Left Section - Project Info */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {approval.project_name}
                </h3>
                <Badge className={`text-xs ${getTypeColor(approval.is_prr)}`}>
                  {approval.is_prr ? 'PRR' : 'Project'}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-500 mb-2">
                {approval.is_prr ? approval.prr_number : approval.project_code}
              </p>
              
              {/* Meta info */}
              <div className="flex items-center gap-4 text-xs text-gray-400">
                {/* <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>ID: {approval.id}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Status & Actions */}
        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <Badge className={`${getStatusColor(approval.approval_status)} capitalize font-medium`}>
            {approval.approval_status}
          </Badge>

          {/* View Status Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 hover:bg-gray-100 border-gray-200"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl bg-white"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Approval History</DialogTitle>
              </DialogHeader>
              <ShowApprovalHistory approval={approval} />
            </DialogContent>
          </Dialog>

          {/* Action Buttons */}
          {approval.approval_status === "pending" && !showAll && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprovalAction("approved", approval.id, approval.is_prr);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Approve</span>
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprovalAction("rejected", approval.id, approval.is_prr);
                }}
                className="px-3 py-1.5 flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Reject</span>
              </Button>
            </div>
          )}

          {/* Navigation Arrow */}
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default ApprovalListItem;