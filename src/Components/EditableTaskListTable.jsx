// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Edit2,
//   Check,
//   X,
//   Plus,
//   Calendar,
//   Users,
//   Clock,
//   AlertCircle,
//   Edit,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import ChangeInputModal from "./ChangeInputModal"; // Import your modal component
// import { addDays, format } from "date-fns";
// import moment from "moment";

// // Sample ChangeInputModal component (you can replace this with your actual component)
// // const ChangeInputModal = ({
// //   isOpen,
// //   onClose,
// //   onConfirm,
// //   columnName,
// //   oldValue,
// //   newValue,
// //   rowData
// // }) => {
// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-[425px]">
// //         <DialogHeader>
// //           <DialogTitle>Confirm {columnName} Change</DialogTitle>
// //           <DialogDescription>
// //             You are about to change the {columnName.toLowerCase()} for task "{rowData?.key_milestone || 'Unknown Task'}".
// //           </DialogDescription>
// //         </DialogHeader>

// //         <div className="grid gap-4 py-4">
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label className="text-right font-medium">Task:</label>
// //             <div className="col-span-3 text-sm text-muted-foreground">
// //               {rowData?.key_milestone || 'N/A'}
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label className="text-right font-medium">Old {columnName}:</label>
// //             <div className="col-span-3 text-sm">
// //               {oldValue || 0} days
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label className="text-right font-medium">New {columnName}:</label>
// //             <div className="col-span-3 text-sm font-medium">
// //               {newValue || 0} days
// //             </div>
// //           </div>
// //         </div>

// //         <DialogFooter>
// //           <Button variant="outline" onClick={onClose}>
// //             Cancel
// //           </Button>
// //           <Button onClick={onConfirm}>
// //             Confirm Change
// //           </Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// export const EditableTaskListTable = ({
//   tColumns,
//   tData,
//   setTaskData,
//   editFlag = true,
//   setUpdateFlag,
//   forProjectAddition = false,
// }) => {
//   // Sample responsibility options
//   const resOptionList = [
//     { value: "PM", label: "Project Manager" },
//     { value: "DEV", label: "Developer" },
//     { value: "QA", label: "Quality Assurance" },
//     { value: "BA", label: "Business Analyst" },
//     { value: "ARCH", label: "Architect" },
//   ];
//   console.log(editFlag);

//   const [editingCell, setEditingCell] = useState(null);
//   const [editValue, setEditValue] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [affectNextRow, setAffectNextRow] = useState(null);
//   const [currentRowIndex, setCurrentRowIndex] = useState(null);

//   // Modal state
//   const [modalState, setModalState] = useState({
//     isOpen: false,
//     columnName: "",
//     oldValue: null,
//     newValue: null,
//     rowIndex: null,
//     columnKey: "",
//     rowData: null,
//   });

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   // Calculate pagination
//   const totalPages = Math.ceil(tData.length / pageSize);
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   // const paginatedData = tData.slice(startIndex, endIndex);

//   // Pagination handlers
//   const goToFirstPage = () => setCurrentPage(1);
//   const goToLastPage = () => setCurrentPage(totalPages);
//   const goToPreviousPage = () =>
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const goToNextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const goToPage = (page) =>
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));

//   const handleCellClick = (rowIndex, columnKey, currentValue, column) => {
//     if (!column.meta.editable) return;

//     setEditingCell(`${rowIndex}-${columnKey}`);
//     setEditValue(currentValue || "");
//     setCurrentRowIndex(rowIndex);
//   };

//   useEffect(() => {
//     if (!forProjectAddition) {
//       setUpdateFlag(true);
//     }
//   }, [tData]);

//   // useEffect(
//   //   (currentRowIndex) => {
//   //     console.log(currentRowIndex,affectNextRow)
//   //     if (currentRowIndex && affectNextRow) {
//   //       setNextRowTargetDate(currentRowIndex, editValue);
//   //       console.log("changes", currentRowIndex, editValue);
//   //       setShowModal(false);
//   //     }
//   //   },
//   //   [affectNextRow]
//   // );

//   const handleSave = (rowIndex, columnKey) => {
//     const actualRowIndex = startIndex + rowIndex;
//     // actualRowIndex;
//     const currentRow = tData[actualRowIndex];
//     const oldValue = currentRow[columnKey];
//     const newValue = editValue;
//     // console.log(currentRowIndex,editValue)

//     // Check if this is a Duration or Delay column change
//     if (
//       columnKey === "duration"
//       // oldValue !== newValue
//     ) {
//       // Show modal for confirmation
//       // setModalState({
//       //   isOpen: true,
//       //   columnName: columnKey === "duration" ? "Duration" : "Delay",
//       //   oldValue: oldValue,
//       //   newValue: newValue,
//       //   rowIndex: actualRowIndex,
//       //   columnKey: columnKey,
//       //   rowData: currentRow,
//       // });
//       setShowModal(true);
//       // if (affectNextRow) {
//       //   setNextRowTargetDate(rowIndex, editValue);
//       //   setAffectNextRow(null);
//       // }
//       const newData = [...tData];
//       newData[actualRowIndex][columnKey] = editValue;
//       setEditingCell(null);
//       // setTaskData(newData);
//       // setEditValue("");
//       // setCurrentRowIndex("");
//     } else if (columnKey === "delay") {
//       setShowModal(true);
//       const newData = [...tData];
//       newData[actualRowIndex][columnKey] = editValue;
//       setEditingCell(null);
//     } else if (columnKey === "actual_date") {
//       setShowModal(true);
//       const newData = [...tData];
//       newData[actualRowIndex][columnKey] = editValue;
//       setEditingCell(null);
//     } else {
//       // Direct save for other columns
//       const newData = [...tData];
//       newData[actualRowIndex][columnKey] = editValue;
//       setTaskData(newData);
//       setEditingCell(null);
//       setEditValue("");
//       setCurrentRowIndex("");
//     }
//   };

//   const setNextRowTargetDate = (response) => {
//     console.log(currentRowIndex, editValue, response);
//     // setEditValue("");
//     // setCurrentRowIndex("");

//     if (response) {
//       const currentRowTargetDate = moment(tData[currentRowIndex]["plan_date"]);
//       const nextRowTargetDate = currentRowTargetDate
//         .clone()
//         .add(editValue, "days");
//       const nextTargetDateValue = nextRowTargetDate.format("YYYY-MM-DD");

//       console.log(
//         currentRowTargetDate.toDate(),
//         nextRowTargetDate.toDate(),
//         editValue,
//         nextTargetDateValue
//       );

//       const nextIndex = currentRowIndex + 1;

//       if (currentRowIndex < tData.length - 2 && currentRowIndex != 0) {
//         console.log("updated next target date");

//         const newData = [...tData];
//         // handleSave(nextIndex, "plan_date");
//         newData[nextIndex]["plan_date"] = nextTargetDateValue;
//         console.log(newData); //[nextIndex]["plan_date"]);
//         // setTaskData(newData);
//       }
//     }
//   };
//   const handleModalConfirm = () => {
//     const { rowIndex, columnKey, newValue } = modalState;
//     const newData = [...tData];
//     newData[rowIndex][columnKey] = newValue;
//     setTaskData(newData);

//     // Close modal and editing state
//     setModalState({
//       isOpen: false,
//       columnName: "",
//       oldValue: null,
//       newValue: null,
//       rowIndex: null,
//       columnKey: "",
//       rowData: null,
//     });
//     setEditingCell(null);
//     setEditValue("");
//     setCurrentRowIndex("");
//   };

//   const handleModalClose = () => {
//     setModalState({
//       isOpen: false,
//       columnName: "",
//       oldValue: null,
//       newValue: null,
//       rowIndex: null,
//       columnKey: "",
//       rowData: null,
//     });
//     // Keep the editing state so user can continue editing
//   };

//   const handleCancel = () => {
//     setEditingCell(null);
//     setEditValue("");
//     setCurrentRowIndex("");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     if (isNaN(date)) return dateString;
//     return date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "2-digit",
//     });
//   };

//   const getStatusVariant = (status) => {
//     const variants = {
//       Done: "default",
//       Pendgin: "secondary",
//       "Not Applicable": "outline",
//       "Not Required": "destructive",
//     };
//     return variants[status] || "outline";
//   };

//   const getResponsibilityIcon = (responsibility) => {
//     const icons = {
//       PM: <Users className="w-3 h-3" />,
//       DEV: <Edit2 className="w-3 h-3" />,
//       QA: <AlertCircle className="w-3 h-3" />,
//       BA: <Users className="w-3 h-3" />,
//       ARCH: <Edit2 className="w-3 h-3" />,
//     };
//     return icons[responsibility];
//   };

//   const renderCell = (row, rowIndex, column) => {
//     const cellKey = `${rowIndex}-${column.accessorKey}`;
//     const cellValue = row[column.accessorKey];
//     const isEditing = editingCell === cellKey && editFlag;
//     const isEditable = column.meta.editable && editFlag;

//     if (isEditing && isEditable) {
//       switch (column.meta.type) {
//         case "date":
//           return (
//             <div className="flex items-center gap-2 min-w-[200px]">
//               <Input
//                 type="date"
//                 value={editValue}
//                 onChange={(e) => {
//                   // setCurrentRowIndex(rowIndex);
//                   return setEditValue(e.target.value);
//                 }}
//                 className="h-8"
//                 autoFocus
//               />
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => handleSave(rowIndex, column.accessorKey)}
//                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
//               >
//                 <Check className="w-4 h-4" />
//               </Button>
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={handleCancel}
//                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
//               >
//                 <X className="w-4 h-4" />
//               </Button>
//             </div>
//           );

//         case "select":
//           return (
//             <div className="flex items-center gap-2 min-w-[220px]">
//               <Select
//                 value={editValue}
//                 onValueChange={() => {
//                   // setCurrentRowIndex(rowIndex);
//                   return setEditValue;
//                 }}
//               >
//                 <SelectTrigger className="h-8">
//                   <SelectValue placeholder="Select..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {column.meta.options.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => handleSave(rowIndex, column.accessorKey)}
//                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
//               >
//                 <Check className="w-4 h-4" />
//               </Button>
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={handleCancel}
//                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
//               >
//                 <X className="w-4 h-4" />
//               </Button>
//             </div>
//           );

//         case "number":
//           return (
//             <div className="flex items-center gap-2 min-w-[150px]">
//               <Input
//                 type="number"
//                 value={editValue}
//                 onChange={(e) => {
//                   // setCurrentRowIndex(rowIndex);
//                   return setEditValue(e.target.value);
//                 }}
//                 className="h-8"
//                 autoFocus
//               />
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => handleSave(rowIndex, column.accessorKey)}
//                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
//               >
//                 <Check className="w-4 h-4" />
//               </Button>
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={handleCancel}
//                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
//               >
//                 <X className="w-4 h-4" />
//               </Button>
//             </div>
//           );

//         default:
//           return (
//             <div className="flex items-center gap-2 min-w-[200px]">
//               <Input
//                 type="text"
//                 value={editValue}
//                 onChange={(e) => {
//                   // setCurrentRowIndex(rowIndex);
//                   return setEditValue(e.target.value);
//                 }}
//                 className="h-8"
//                 autoFocus
//               />
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => handleSave(rowIndex, column.accessorKey)}
//                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
//               >
//                 <Check className="w-4 h-4" />
//               </Button>
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={handleCancel}
//                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
//               >
//                 <X className="w-4 h-4" />
//               </Button>
//             </div>
//           );
//       }
//     }

//     // Display mode
//     const displayValue = () => {
//       switch (column.meta.type) {
//         case "date":
//           return cellValue ? (
//             <div className="flex items-center gap-2 text-sm">
//               {formatDate(cellValue)}
//             </div>
//           ) : (
//             <span className="text-muted-foreground text-sm">Not set</span>
//           );
//         case "select":
//           if (column.accessorKey === "responsibility") {
//             const option = column.meta.options.find(
//               (opt) =>
//                 opt.label === cellValue || opt.value === cellValue.toLowerCase()
//             );
//             return option ? (
//               <div className="flex items-center gap-2">
//                 {getResponsibilityIcon(cellValue)}
//                 <span className="text-sm font-medium">{cellValue}</span>
//               </div>
//             ) : (
//               <span className="text-muted-foreground text-sm">
//                 Not assigned
//               </span>
//             );
//           }
//           if (column.accessorKey === "status") {
//             return cellValue ? (
//               <div
//                 variant={getStatusVariant(cellValue)}
//                 className="font-medium"
//               >
//                 {cellValue}
//               </div>
//             ) : (
//               <div variant="outline">Not set</div>
//             );
//           }
//           return cellValue;
//         case "number":
//           if (column.accessorKey === "duration") {
//             return (
//               <div className="flex items-center gap-2 text-sm">
//                 {cellValue || 0} days
//               </div>
//             );
//           }
//           if (column.accessorKey === "delay") {
//             return (
//               <div className="flex items-center gap-2 text-sm">
//                 <span
//                   className={
//                     cellValue > 0
//                       ? "text-red-600 font-medium"
//                       : "text-muted-foreground"
//                   }
//                 >
//                   {cellValue || 0} days
//                 </span>
//               </div>
//             );
//           }
//           return cellValue || 0;
//         default:
//           return cellValue || "";
//       }
//     };
//     console.log(editFlag);

//     return (
//       <div
//         className={`group ${
//           isEditable ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""
//         } py-2`}
//         onClick={() =>
//           handleCellClick(rowIndex, column.accessorKey, cellValue, column)
//         }
//       >
//         <div className="flex items-center justify-between">
//           {displayValue()}
//           {isEditable && (
//             <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Calculate statistics
//   const stats = {
//     total: tData.length,
//     completed: tData.filter((row) => row.status === "Done").length,
//     pending: tData.filter((row) => row.status === "Pendgin").length,
//     totalDelay: tData.reduce((acc, row) => acc + (row.delay || 0), 0),
//   };

//   const displayData = tData && tData.length > 0 ? tData : [];
//   const totalPagesDisplay = Math.ceil(displayData.length / pageSize);
//   const paginatedDisplayData = displayData.slice(startIndex, endIndex);

//   return (
//     <div className="max-w-7xl mx-auto space-y-6">
//       {/* Main Table */}
//       <Card>
//         <CardHeader className="pb-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Task Details</CardTitle>
//               <CardDescription>
//                 Showing {startIndex + 1} to{" "}
//                 {Math.min(endIndex, displayData.length)} of {displayData.length}{" "}
//                 tasks
//               </CardDescription>
//             </div>
//             <div className="flex items-center gap-2">
//               <Select
//                 value={pageSize.toString()}
//                 onValueChange={(value) => {
//                   setPageSize(parseInt(value));
//                   setCurrentPage(1);
//                 }}
//               >
//                 <SelectTrigger className="w-[80px]">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="5">5</SelectItem>
//                   <SelectItem value="10">10</SelectItem>
//                   <SelectItem value="20">20</SelectItem>
//                   <SelectItem value="50">50</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-lg border">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-muted/50">
//                   {tColumns.map((column) => (
//                     <TableHead
//                       key={column.accessorKey}
//                       className="font-semibold"
//                     >
//                       <div className="flex items-center gap-2">
//                         {column.header}
//                         {column.meta.editable && editFlag && (
//                           <Edit2 className="w-4 h-4" />
//                         )}
//                       </div>
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginatedDisplayData.map((row, rowIndex) => (
//                   <TableRow
//                     key={startIndex + rowIndex}
//                     className="hover:bg-muted/30 transition-colors"
//                   >
//                     {tColumns.map((column) => (
//                       <TableCell
//                         key={column.accessorKey}
//                         className={!column.meta.editable ? "bg-muted/20" : ""}
//                       >
//                         {renderCell(row, rowIndex, column)}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination Controls */}
//           {totalPagesDisplay > 1 && (
//             <div className="flex items-center justify-between pt-4">
//               <div className="text-sm text-muted-foreground">
//                 Page {currentPage} of {totalPagesDisplay}
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={goToFirstPage}
//                   disabled={currentPage === 1}
//                   className="h-8 w-8 p-0"
//                 >
//                   <ChevronsLeft className="w-4 h-4" />
//                 </Button>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={goToPreviousPage}
//                   disabled={currentPage === 1}
//                   className="h-8 w-8 p-0"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </Button>

//                 {/* Page numbers */}
//                 <div className="flex items-center gap-1">
//                   {Array.from(
//                     { length: Math.min(5, totalPagesDisplay) },
//                     (_, i) => {
//                       let pageNum;
//                       if (totalPagesDisplay <= 5) {
//                         pageNum = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNum = i + 1;
//                       } else if (currentPage >= totalPagesDisplay - 2) {
//                         pageNum = totalPagesDisplay - 4 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }

//                       return (
//                         <Button
//                           key={pageNum}
//                           variant={
//                             currentPage === pageNum ? "default" : "outline"
//                           }
//                           size="sm"
//                           onClick={() => goToPage(pageNum)}
//                           className="h-8 w-8 p-0"
//                         >
//                           {pageNum}
//                         </Button>
//                       );
//                     }
//                   )}
//                 </div>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={goToNextPage}
//                   disabled={currentPage === totalPagesDisplay}
//                   className="h-8 w-8 p-0"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>

//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={goToLastPage}
//                   disabled={currentPage === totalPagesDisplay}
//                   className="h-8 w-8 p-0"
//                 >
//                   <ChevronsRight className="w-4 h-4" />
//                 </Button>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">
//                   Go to page:
//                 </span>
//                 <Input
//                   type="number"
//                   min="1"
//                   max={totalPagesDisplay}
//                   value={currentPage}
//                   onChange={(e) => {
//                     const page = parseInt(e.target.value);
//                     if (page >= 1 && page <= totalPagesDisplay) {
//                       goToPage(page);
//                     }
//                   }}
//                   className="h-8 w-16 text-center"
//                 />
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Change Input Modal */}
//       {showModal && (
//         <ChangeInputModal
//           // isOpen={modalState.isOpen}
//           // onClose={handleModalClose}
//           // onConfirm={handleModalConfirm}
//           // columnName={modalState.columnName}
//           // oldValue={modalState.oldValue}
//           // newValue={modalState.newValue}
//           // rowData={modalState.rowData}
//           showModal={showModal}
//           setShowModal={setShowModal}
//           setAffectNextRow={setAffectNextRow}
//           handleUpdate={setNextRowTargetDate}
//           rowIndex={currentRowIndex}
//           value={editValue}
//         />
//       )}
//     </div>
//   );
// };

import React, { useState, useMemo, useEffect } from "react";
import {
  Edit2,
  Check,
  X,
  Plus,
  Calendar,
  Users,
  Clock,
  AlertCircle,
  Edit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChangeInputModal from "./ChangeInputModal"; // Import your modal component
import { addDays, format } from "date-fns";
import moment from "moment";

export const EditableTaskListTable = ({
  tColumns,
  tData,
  setTaskData,
  editFlag = true,
  setUpdateFlag,
  forProjectAddition = false,
}) => {
  console.log(editFlag);

  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [affectNextRow, setAffectNextRow] = useState(null);
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [showUplModal, setShowUplModal] = useState(false);

  // Modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    columnName: "",
    oldValue: null,
    newValue: null,
    rowIndex: null,
    columnKey: "",
    rowData: null,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Calculate pagination
  const totalPages = Math.ceil(tData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const handleCellClick = (rowIndex, columnKey, currentValue, column) => {
    if (!column.meta.editable) return;

    setEditingCell(`${rowIndex}-${columnKey}`);
    setEditValue(currentValue || "");
    setCurrentRowIndex(rowIndex);
  };

  useEffect(() => {
    if (!forProjectAddition) {
      setUpdateFlag(true);
    }
  }, [tData]);

  // Helper function to calculate delay between two dates
  const calculateDelay = (planDate, actualDate) => {
    try {
      if (!planDate || !actualDate) return 0;

      const plan = moment(planDate);
      const actual = moment(actualDate);

      // Check if dates are valid
      if (!plan.isValid() || !actual.isValid()) {
        console.warn("Invalid date provided for delay calculation");
        return 0;
      }

      // Calculate difference in days
      const diffInDays = actual.diff(plan, "days");
      return diffInDays;
    } catch (error) {
      console.error("Error calculating delay:", error);
      return 0;
    }
  };

  // Helper function to calculate actual date from plan date and delay
  const calculateActualDate = (planDate, delay) => {
    try {
      if (!planDate || delay === null || delay === undefined) return null;

      const plan = moment(planDate);

      // Check if plan date is valid
      if (!plan.isValid()) {
        console.warn("Invalid plan date provided for actual date calculation");
        return null;
      }

      // Add delay to plan date
      const actualDate = plan.clone().add(delay, "days");
      return actualDate.format("YYYY-MM-DD");
    } catch (error) {
      console.error("Error calculating actual date:", error);
      return null;
    }
  };

  const handleSave = (rowIndex, columnKey) => {
    const actualRowIndex = startIndex + rowIndex;
    const currentRow = tData[actualRowIndex];
    // const oldValue = currentRow[columnKey];
    const newValue = editValue;

    try {
      // Handle actual_date changes
      if (columnKey === "actual_date") {
        if (newValue && currentRow.plan_date) {
          // Calculate delay and update both actual_date and delay
          const calculatedDelay = calculateDelay(
            currentRow.plan_date,
            newValue
          );

          const newData = [...tData];
          newData[actualRowIndex][columnKey] = newValue;
          newData[actualRowIndex]["gap"] = calculatedDelay;

          // if (newData[actualRowIndex]["duration"]) {
          const updatedDuration =
            calculatedDelay + Number(newData[actualRowIndex]["duration"]);
          console.log(updatedDuration);
          newData[actualRowIndex]["duration"] = updatedDuration;
          // }

          setTaskData(newData);
          setEditingCell(null);
          setEditValue("");
          setCurrentRowIndex("");

          console.log(
            `Updated actual_date to ${newValue} and calculated delay: ${calculatedDelay} days`
          );
        } else if (!currentRow.plan_date) {
          console.warn("Cannot calculate delay: plan_date is missing");
          // Still update actual_date but keep delay as is
          const newData = [...tData];
          newData[actualRowIndex][columnKey] = newValue;
          setTaskData(newData);
          setEditingCell(null);
          setEditValue("");
          setCurrentRowIndex("");
        } else {
          // Just update actual_date if newValue is empty
          const newData = [...tData];
          newData[actualRowIndex][columnKey] = newValue;
          setTaskData(newData);
          setEditingCell(null);
          setEditValue("");
          setCurrentRowIndex("");
        }
        return;
      }

      // Handle delay changes
      if (columnKey === "gap") {
        const delayValue = parseFloat(newValue) || 0;

        if (currentRow.plan_date) {
          // Calculate actual_date and update both delay and actual_date
          const calculatedActualDate = calculateActualDate(
            currentRow.plan_date,
            delayValue
          );

          const newData = [...tData];
          newData[actualRowIndex][columnKey] = delayValue;
          if (calculatedActualDate) {
            newData[actualRowIndex]["actual_date"] = calculatedActualDate;
          }

          setTaskData(newData);
          setEditingCell(null);
          setEditValue("");
          setCurrentRowIndex("");

          console.log(
            `Updated delay to ${delayValue} days and calculated actual_date: ${calculatedActualDate}`
          );
        } else {
          console.warn("Cannot calculate actual_date: plan_date is missing");
          // Still update delay but keep actual_date as is
          const newData = [...tData];
          newData[actualRowIndex][columnKey] = delayValue;
          setTaskData(newData);
          setEditingCell(null);
          setEditValue("");
          setCurrentRowIndex("");
        }
        return;
      }

      // Handle duration changes
      if (columnKey === "duration") {
        if (editValue === "") {
          const newData = [...tData];
          newData[actualRowIndex][columnKey] = editValue;
          setEditingCell(null);
          return;
        }
        if (actualRowIndex === 0) {
          const newData = [...tData];
          newData[actualRowIndex][columnKey] = editValue;
          setEditingCell(null);
          return;
        }
        setShowModal(true);
        const newData = [...tData];
        newData[actualRowIndex][columnKey] = editValue;
        setEditingCell(null);
        return;
      }

      if (columnKey === "upl_number") {
        const newData = [...tData];
        newData[2][columnKey] = uplValue;
        setEditingCell(null);
        return;
      }
      if (columnKey === "status" && (editValue ==="Done"||editValue ==="done")) {
        if (!currentRow.actual_date) {
          console.warn("Cannot update status: actual_date is missing");
          setEditingCell(null);
          setEditValue("");
          setCurrentRowIndex("");
          alert("Please set the actual date before updating the status.");
          return;
        }

        const newData = [...tData];
        newData[actualRowIndex][columnKey] = newValue;
        setTaskData(newData);
        setEditingCell(null);
        setEditValue("");
        setCurrentRowIndex("");

        console.log(`Status updated to: ${newValue}`);
        return;
      }

      // Direct save for other columns
      const newData = [...tData];
      newData[actualRowIndex][columnKey] = editValue;
      setTaskData(newData);
      setEditingCell(null);
      setEditValue("");
      setCurrentRowIndex("");
    } catch (error) {
      console.error("Error in handleSave:", error);
      // Fallback: just update the specific field without calculations
      const newData = [...tData];
      newData[actualRowIndex][columnKey] = editValue;
      setTaskData(newData);
      setEditingCell(null);
      setEditValue("");
      setCurrentRowIndex("");
    }
  };

  const setCurrentTargetDate = (response) => {
    console.log(currentRowIndex, editValue, response);

    if (response) {
      try {
        const previousIndex = currentRowIndex - 1;

        // Ensure the previous row exists
        if (previousIndex < 0 || !tData[previousIndex]) {
          console.warn("No valid previous row to derive plan_date from.");
          return;
        }

        const previousRowTargetDate = moment(tData[previousIndex]["plan_date"]);

        if (!previousRowTargetDate.isValid()) {
          console.warn("Invalid plan_date in previous row for calculation");
          return;
        }

        const calculatedTargetDate = previousRowTargetDate
          .clone()
          .add(editValue, "days");
        const newTargetDateValue = calculatedTargetDate.format("YYYY-MM-DD");

        console.log(
          "Previous target date:",
          previousRowTargetDate.toDate(),
          "New calculated target date:",
          calculatedTargetDate.toDate(),
          "Edit value (days):",
          editValue,
          "Formatted target date:",
          newTargetDateValue
        );

        const newData = [...tData];
        newData[currentRowIndex]["plan_date"] = newTargetDateValue;

        console.log("Updated current row with new target date:", newData);
        setTaskData(newData);
      } catch (error) {
        console.error(
          "Error setting current row target date from previous row:",
          error
        );
      }
    }
  };

  // const handleModalConfirm = () => {
  //   const { rowIndex, columnKey, newValue } = modalState;
  //   const newData = [...tData];
  //   newData[rowIndex][columnKey] = newValue;
  //   setTaskData(newData);

  //   // Close modal and editing state
  //   setModalState({
  //     isOpen: false,
  //     columnName: "",
  //     oldValue: null,
  //     newValue: null,
  //     rowIndex: null,
  //     columnKey: "",
  //     rowData: null,
  //   });
  //   setEditingCell(null);
  //   setEditValue("");
  //   setCurrentRowIndex("");
  // };

  // const handleModalClose = () => {
  //   setModalState({
  //     isOpen: false,
  //     columnName: "",
  //     oldValue: null,
  //     newValue: null,
  //     rowIndex: null,
  //     columnKey: "",
  //     rowData: null,
  //   });
  // };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue("");
    setCurrentRowIndex("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const getStatusVariant = (status) => {
    const variants = {
      Done: "default",
      Pendgin: "secondary",
      "Not Applicable": "outline",
      "Not Required": "destructive",
    };
    return variants[status] || "outline";
  };

  const getResponsibilityIcon = (responsibility) => {
    const icons = {
      PM: <Users className="w-3 h-3" />,
      DEV: <Edit2 className="w-3 h-3" />,
      QA: <AlertCircle className="w-3 h-3" />,
      BA: <Users className="w-3 h-3" />,
      ARCH: <Edit2 className="w-3 h-3" />,
    };
    return icons[responsibility];
  };

  const renderCell = (row, rowIndex, column) => {
    const cellKey = `${rowIndex}-${column.accessorKey}`;
    const cellValue = row[column.accessorKey];
    const isEditing = editingCell === cellKey && editFlag;
    const isEditable = column.meta.editable && editFlag;
    const upl_custom_flag = row.upl_flag || row?.stage === "No. of Parts (UPL)";
    console.log(upl_custom_flag);

    if (isEditing && isEditable && !upl_custom_flag) {
      switch (column.meta.type) {
        case "date":
          return (
            <div className="flex items-center gap-2 min-w-[200px]">
              <Input
                type="date"
                value={editValue}
                onChange={(e) => {
                  return setEditValue(e.target.value);
                }}
                className="h-8"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSave(rowIndex, column.accessorKey)}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );

        case "select":
          return (
            <div className="flex items-center gap-2 min-w-[220px]">
              <Select
                value={editValue}
                onValueChange={(value) => {
                  setEditValue(value);
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {column.meta.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSave(rowIndex, column.accessorKey)}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );

        case "number":
          return (
            <div className="flex items-center gap-2 min-w-[150px]">
              <Input
                type="number"
                value={editValue}
                onChange={(e) => {
                  return setEditValue(e.target.value);
                }}
                className="h-8"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSave(rowIndex, column.accessorKey)}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );

        default:
          return (
            <div className="flex items-center gap-2 min-w-[200px]">
              <Input
                type="text"
                value={editValue}
                onChange={(e) => {
                  return setEditValue(e.target.value);
                }}
                className="h-8"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSave(rowIndex, column.accessorKey)}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
      }
    }

    // Display mode
    const displayValue = () => {
      if (upl_custom_flag) {
        switch (column.accessorKey) {
          case "key_milestone":
            return (
              <div className="flex items-center gap-2 text-sm">
                {cellValue || ""}
              </div>
            );
          case "stage":
            return (
              <div className="flex items-center gap-2 text-sm">
                {cellValue || ""}
              </div>
            );
          case "task_number":
            return (
              <div className="flex items-center gap-2 text-sm">
                {cellValue || ""}
              </div>
            );
          case "plan_date":
            return (
              <div className="flex items-center gap-2 text-sm text-gray-500"></div>
            );
          case "actual_date":
            return (
              <div className="flex items-center gap-2 text-sm text-gray-500"></div>
            );
          case "responsibility":
            return (
              <div className="flex items-center gap-2 text-sm">
                {cellValue || ""}
              </div>
            );
          case "duration":
            return <div className="flex items-center gap-2 text-sm"></div>;
          case "gap":
            return <div className="flex items-center gap-2 text-sm"></div>;
          default:
            return <div className="flex items-center gap-2 text-sm"></div>;
        }
      } else {
        switch (column.meta.type) {
          case "date":
            return cellValue ? (
              <div className="flex items-center gap-2 text-sm">
                {formatDate(cellValue)}
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">Not set</span>
            );
          case "select":
            if (column.accessorKey === "responsibility") {
              const option = column.meta.options.find(
                (opt) =>
                  opt.label === cellValue ||
                  opt.value === cellValue.toLowerCase()
              );
              return option ? (
                <div className="flex items-center gap-2">
                  {/* {getResponsibilityIcon(cellValue)} */}
                  <span className="text-sm font-medium">{cellValue}</span>
                </div>
              ) : (
                <span className="text-muted-foreground text-sm">
                  Not assigned
                </span>
              );
            }
            if (column.accessorKey === "status") {
              return cellValue ? (
                <div
                  variant={getStatusVariant(cellValue)}
                  className="font-medium"
                >
                  {cellValue}
                </div>
              ) : (
                <div variant="outline">Not set</div>
              );
            }
            return cellValue;
          case "number":
            if (column.accessorKey === "duration") {
              return (
                <div className="flex items-center gap-2 text-sm">
                  {cellValue || 0} days
                </div>
              );
            }
            if (column.accessorKey === "gap") {
              return (
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={
                      cellValue > 0
                        ? "text-red-600 font-medium"
                        : cellValue < 0
                        ? "text-green-600 font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {cellValue || 0} days
                  </span>
                </div>
              );
            }
            return cellValue || 0;
          default:
            return cellValue || "";
        }
      }
    };

    return (
      <div
        className={`group ${
          isEditable ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""
        } py-2`}
        onClick={() =>
          handleCellClick(rowIndex, column.accessorKey, cellValue, column)
        }
      >
        <div className="flex items-center justify-between">
          {displayValue()}
          {isEditable && (
            <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground" />
          )}
        </div>
      </div>
    );
  };

  // Calculate statistics
  // const stats = {
  //   total: tData.length,
  //   completed: tData.filter((row) => row.status === "Done").length,
  //   pending: tData.filter((row) => row.status === "Pendgin").length,
  //   totalDelay: tData.reduce((acc, row) => acc + (row.gap || 0), 0),
  // };

  const displayData = tData && tData.length > 0 ? tData : [];
  const totalPagesDisplay = Math.ceil(displayData.length / pageSize);
  const paginatedDisplayData = displayData.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Main Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, displayData.length)} of {displayData.length}{" "}
                tasks
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {tColumns.map((column) => (
                    <TableHead
                      key={column.accessorKey}
                      className="font-semibold"
                    >
                      <div className="flex items-center gap-2">
                        {column.header}
                        {column.meta.editable && editFlag && (
                          <Edit2 className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDisplayData.map((row, rowIndex) => (
                  <TableRow
                    key={startIndex + rowIndex}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {tColumns.map((column) => (
                      <TableCell
                        key={column.accessorKey}
                        className={!column.meta.editable ? "bg-muted/20" : ""}
                      >
                        {renderCell(row, rowIndex, column)}
                      </TableCell>
                    ))}
                    {row?.upl_flag || row?.stage === "No. of Parts (UPL)" ? (
                      <div className="h-28 w-8 flex items-center justify-center">
                        {/* {uplValue === "" ? ( */}
                        {row?.upl_number === "" || row?.upl_number === null ? (
                          <Plus onClick={openUPLModal}></Plus>
                        ) : (
                          <div onClick={openUPLModal}>{row.upl_number}</div>
                        )}
                        {/* ) : (
                          uplValue
                        )} */}
                      </div>
                    ) : (
                      ""
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {totalPagesDisplay > 1 && (
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPagesDisplay}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, totalPagesDisplay) },
                    (_, i) => {
                      let pageNum;
                      if (totalPagesDisplay <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPagesDisplay - 2) {
                        pageNum = totalPagesDisplay - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => goToPage(pageNum)}
                          className="h-8 w-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPagesDisplay}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPagesDisplay}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Go to page:
                </span>
                <Input
                  type="number"
                  min="1"
                  max={totalPagesDisplay}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPagesDisplay) {
                      goToPage(page);
                    }
                  }}
                  className="h-8 w-16 text-center"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Input Modal */}
      {showModal && (
        <ChangeInputModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleUpdate={setCurrentTargetDate}
          rowIndex={currentRowIndex}
          value={editValue}
        />
      )}
    </div>
  );
};
