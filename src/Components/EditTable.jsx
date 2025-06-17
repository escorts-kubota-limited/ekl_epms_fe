// import { useState, useCallback, memo } from "react";
// import DatePicker from "react-datepicker";
// import Alert from "./Alert";
// import "react-datepicker/dist/react-datepicker.css";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   getPaginationRowModel,
//   getFilteredRowModel,
// } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
//   SelectGroup,
// } from "./ui/select";
// import { format, differenceInDays, isBefore, isEqual, isAfter } from "date-fns";

// // EditableCell component to handle different cell types
// const EditableCell = memo(
//   ({
//     column,
//     value,
//     rowIndex,
//     columnId,
//     isEditing,
//     editedData,
//     handleCellEdit,
//   }) => {
//     if (!isEditing || !column.meta?.editable) {
//       return value;
//     }

//     const formatDateForInput = (dateValue) => {
//       if (!dateValue) return "";

//       try {
//         const date = new Date(dateValue);

//         if (isNaN(date.getTime())) return "";

//         // Format as YYYY-MM-DD for input type="date"
//         return date.toISOString().split("T")[0];
//       } catch (error) {
//         return "";
//       }
//     };

//     // Parse date value for the date picker
//     const parseDate = (dateValue) => {
//       if (!dateValue) return null;
//       try {
//         const date = new Date(dateValue);
//         return isNaN(date.getTime()) ? null : date;
//       } catch (error) {
//         return null;
//       }
//     };

//     // Handle cell rendering based on type
//     switch (column.meta?.type) {
//       case "select":
//         return (
//           <Select
//             className="w-full"
//             onValueChange={(e) => handleCellEdit(rowIndex, columnId, e)}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue
//                 placeholder={editedData[rowIndex]?.[columnId] ?? value}
//               />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {column.meta.options.map((option, idx) => (
//                   <SelectItem key={idx} value={option.label}>
//                     {option.label}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         );
//       case "date":
//         return (
//           <div onClick={(e) => e.stopPropagation()}>
//             {/* <DatePicker
//               selected={parseDate(editedData[rowIndex]?.[columnId] || value)}
//               onChange={(date) => {
//                 // Format as YYYY-MM-DD for consistent storage
//                 // const formattedDate = date
//                 //   ? date.toISOString().split("T")[0]
//                 //   : "";
//                 // console.log(formattedDate)
//                 if (date === null) {
//                   handleCellEdit(rowIndex, columnId, "");
//                 }
//                 const formattedDate = format(new Date(date), "yyyy-MM-dd");
//                 // console.log(formattedDate);
//                 // const fDate = formatDateForInput(date);
//                 handleCellEdit(rowIndex, columnId, formattedDate);
//               }}
//               dateFormat="dd/MMM/yy"
//               className="w-full h-9 px-2 border rounded-md"
//               wrapperClassName="w-32"
//               showYearDropdown
//               showMonthDropdown
//               scrollableYearDropdown
//               isClearable
//             /> */}
//             {/* <DatePicker
//               selected={parseDate(editedData["0-date"] || "")}
//               onChange={(date) => {
//                 if (date === null) {
//                   handleCellEdit(0, "date", "");
//                 } else {
//                   const formattedDate = format(new Date(date), "yyyy-MM-dd");
//                   handleCellEdit(0, "date", formattedDate);
//                 }
//               }}
//               dateFormat="dd/MM/yyyy"
//               className="w-full h-9 px-2 border rounded-md"
//               wrapperClassName="w-32"
//               showYearDropdown
//               showMonthDropdown
//               scrollableYearDropdown
//               isClearable
//             /> */}
//             {/* <Input
//               type="date"
//               value={
//                 editedData[rowIndex]?.[columnId]// || formatDateForInput(value)
//               }
//               onChange={(e) => {
//                 // e.stopPropagation()
//                 console.log(e.target.value)
//                 handleCellEdit(rowIndex, columnId, e.target.value, e);
//               }}
//               // onFocus={(e) => e.stopPropagation()}
//               // onClick={(e) => e.stopPropagation()}
//               className="w-full h-9 px-2"
//             /> */}
//             <Input
//               type="date"
//               //  value={
//               //   editedData[rowIndex]?.[columnId] || formatDateForInput(value)
//               // }
//               onChange={(date) => {
//                 // Format as YYYY-MM-DD for consistent storage
//                 // const formattedDate = date
//                 //   ? date.toISOString().split("T")[0]
//                 //   : "";
//                 // console.log(formattedDate)
//                 if (date === null) {
//                   handleCellEdit(rowIndex, columnId, "");
//                 }
//                 const formattedDate = format(new Date(date), "yyyy-MM-dd");
//                 // console.log(formattedDate);
//                 // const fDate = formatDateForInput(date);
//                 handleCellEdit(rowIndex, columnId, formattedDate);
//               }}
//               className="w-full  px-2 rounded-md"
//             />
//           </div>
//         );
//       default:
//         return (
//           <Input
//             type={column.meta?.type || "text"}
//             value={editedData[rowIndex]?.[columnId] ?? value}
//             onChange={(e) =>
//               handleCellEdit(rowIndex, columnId, e.target.value, e)
//             }
//             className="w-full"
//           />
//         );
//     }
//   }
// );

// export function EditTable({
//   tData,
//   tColumns,
//   rowClick = false,
//   pagination = true,
//   search = true,
//   editable = false,
//   setUpdateFlag,
//   setTaskDetails,
//   taskData,
//   forProjectAddition = false,
// }) {
//   const [filtering, setFiltering] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({});
//   // const [alert, setAlert] = useState(null);

//   // Handle cell edits with useCallback for better performance
//   const handleCellEdit = useCallback(
//     (rowIndex, columnId, value, e) => {
//       if (e) {
//         e.stopPropagation();
//       }

//       console.log(taskData);
//       const currentRow = taskData[rowIndex];

//       let dateValue = "";

//       //format date
//       if (columnId === "plan_date" || columnId === "actual_date") {
//         if (value === "") dateValue = "";
//         else dateValue = format(new Date(value), "dd/MM/yyyy");
//       }

//       const newEdits = {
//         ...editedData,
//         [rowIndex]: {
//           ...editedData[rowIndex],
//           [columnId]:
//             // columnId === "plan_date" || columnId === "actual_date"
//             //   ? dateValue
//             value,
//         },
//       };

//       // If editing plan_date, validate any existing actual_date is not before it
//       if (columnId === "plan_date" && value) {
//         console.log(editedData[rowIndex]?.status);
//         if (
//           editedData[rowIndex]?.status === "Not Required" ||
//           editedData[rowIndex]?.status === "Not Applicable"
//         ) {
//           alert(
//             "No Plan Date or Actual Date can be set if Status is Not Required/Not Applicable"
//           );
//           return;
//         }
//         // console.log(value);
//         const actualDate =
//           editedData[rowIndex]?.actual_date || currentRow.actual_date;

//         if (actualDate) {
//           const planDateObj = new Date(value);
//           const actualDateObj = new Date(actualDate);

//           if (!isNaN(planDateObj) && !isNaN(actualDateObj)) {
//             // Check if plan date is after actual date
//             if (
//               isBefore(actualDateObj, planDateObj) &&
//               !isEqual(actualDateObj, planDateObj)
//             ) {
//               alert("Plan date cannot be later than the actual date");
//               // console.log(alert);
//               return; // Don't proceed with the edit
//             }
//           }
//         }
//       }
//       //If editing actual_date, validating any existing plan_date is not after it
//       if (columnId === "actual_date" && value) {
//         if (
//           editedData[rowIndex]?.status === "Not Required" ||
//           editedData[rowIndex]?.status === "Not Applicable"
//         ) {
//           alert(
//             "No Plan Date or Actual Date can be set if Status is Not Required/Not Applicable"
//           );
//           return;
//         }
//         const planDate =
//           editedData[rowIndex]?.plan_date || currentRow.plan_date;

//         if (planDate) {
//           const actualDateObj = new Date(value);
//           const planDateObj = new Date(planDate);

//           if (!isNaN(planDateObj) && !isNaN(actualDateObj)) {
//             // Check if plan date is after actual date
//             if (
//               isAfter(planDateObj, actualDateObj) &&
//               !isEqual(actualDateObj, planDateObj)
//             ) {
//               alert("Actual date cannot be before than the actual date");
//               // console.log(alert);
//               return; // Don't proceed with the edit
//             }
//           }
//         }
//       }
//       // Clear dates if Status is Not Applicable or Not Required
//       if (
//         columnId === "status" &&
//         (value === "Not Applicable" || value === "Not Required")
//       ) {
//         // Ensure the rowIndex exists in newEdits
//         console.log(value);
//         if (!newEdits[rowIndex]) {
//           newEdits[rowIndex] = {};
//         }
//         console.log(value);
//         newEdits[rowIndex].plan_date = "";
//         newEdits[rowIndex].actual_date = "";
//         // Optionally clear duration as well
//         newEdits[rowIndex].duration = "";
//       }

//       // Auto calculate duration if both dates are present
//       if (columnId === "plan_date" || columnId === "actual_date") {
//         const currentRow = taskData[rowIndex];
//         // console.log(currentRow)
//         // Get the current values considering edited data
//         const planDate =
//           columnId === "plan_date"
//             ? value
//             : editedData[rowIndex]?.plan_date || currentRow.plan_date;

//         const actualDate =
//           columnId === "actual_date"
//             ? value
//             : editedData[rowIndex]?.actual_date || currentRow.actual_date;

//         // console.log(planDate, actualDate);
//         // Calculate duration if both dates exist
//         if (planDate && actualDate) {
//           try {
//             const planDateObj = new Date(planDate);
//             const actualDateObj = new Date(actualDate);

//             if (!isNaN(planDateObj) && !isNaN(actualDateObj)) {
//               const diff = differenceInDays(actualDateObj, planDateObj);
//               // if (diff > 0) {
//               newEdits[rowIndex].duration = diff;
//               // } else alert("Please check the date values"); //setAlert("Please check the date values")
//             }
//           } catch (error) {
//             console.error("Date calculation error:", error);
//           }
//         }
//         // console.log(columnId)

//         // Auto-fill the next row's plan_date if actual_date is being set
//         if (
//           columnId === "actual_date" &&
//           value &&
//           // newEdits[rowIndex.duration] >= 0 &&
//           rowIndex < taskData.length - 1
//         ) {
//           const nextRowIndex = rowIndex + 1;
//           const nextRow = taskData[nextRowIndex];

//           // Only auto-fill if the next row's plan_date is empty
//           const nextRowPlanDate =
//             editedData[nextRowIndex]?.plan_date || nextRow.plan_date;
//           if (!nextRowPlanDate) {
//             newEdits[nextRowIndex] = {
//               ...editedData[nextRowIndex],
//               plan_date: value,
//             };
//           }
//         }
//       }

//       setEditedData(newEdits);
//     },
//     [taskData, editedData]
//   );

//   // Save changes handler
//   const handleSaveChanges = useCallback(() => {
//     const updatedData = tData.map((row, index) => ({
//       ...row,
//       ...editedData[index],
//     }));

//     setIsEditing(false);
//     setEditedData({});

//     if (!forProjectAddition) {
//       setUpdateFlag(true);
//     }

//     setTaskDetails(updatedData);
//   }, [tData, editedData, forProjectAddition, setUpdateFlag, setTaskDetails]);

//   // Cancel editing handler
//   const handleCancelEdit = useCallback(() => {
//     setIsEditing(false);
//     setEditedData({});
//   }, []);

//   // Enhanced columns with editable cell rendering
//   const editableColumns = tColumns.map((column) => ({
//     ...column,
//     cell: ({ row, column, getValue }) => {
//       const value = getValue();
//       const rowIndex = row.index;
//       const columnId = column.id;

//       return (
//         <EditableCell
//           column={column.columnDef}
//           value={value}
//           rowIndex={rowIndex}
//           columnId={columnId}
//           isEditing={isEditing && editable}
//           editedData={editedData}
//           handleCellEdit={handleCellEdit}
//         />
//       );
//     },
//   }));

//   // Initialize table
//   const table = useReactTable({
//     data: tData,
//     columns: editableColumns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       globalFilter: filtering,
//     },
//     onGlobalFilterChange: setFiltering,
//   });

//   return (
//     <div>
//       {/* {alert && (<Alert message={alert} onClose={() => setAlert(null)} />)} */}
//       <div className="flex justify-between items-center mb-4">
//         {search && (
//           <Input
//             type="text"
//             value={filtering}
//             onChange={(e) => setFiltering(e.target.value)}
//             placeholder="Search..."
//             className="max-w-sm ml-3"
//           />
//         )}

//         {editable && (
//           <div className="space-x-2 mr-3">
//             <Button
//               onClick={() => setIsEditing(true)}
//               disabled={isEditing}
//               variant="outline"
//               className="border-2 border-gray-600"
//             >
//               Edit
//             </Button>

//             {isEditing && (
//               <>
//                 <Button
//                   onClick={handleSaveChanges}
//                   variant="default"
//                   className="bg-green-500"
//                 >
//                   Save Changes
//                 </Button>
//                 <Button onClick={handleCancelEdit} variant="destructive">
//                   Cancel
//                 </Button>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   className={isEditing ? "" : "cursor-pointer"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={tColumns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {pagination && (
//         <div className="flex items-center justify-end space-x-2 py-4">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useCallback, memo } from "react";
import DatePicker from "react-datepicker";
import Alert from "./Alert";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "./ui/select";
import {
  format,
  differenceInDays,
  isBefore,
  isEqual,
  isAfter,
  addDays,
} from "date-fns";
import {
  Search,
  Edit3,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";

// EditableCell component to handle different cell types
const EditableCell = memo(
  ({
    column,
    value,
    rowIndex,
    columnId,
    isEditing,
    editedData,
    handleCellEdit,
  }) => {
    if (!isEditing || !column.meta?.editable) {
      return (
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          {value}
        </span>
      );
    }

    const formatDateForInput = (dateValue) => {
      if (!dateValue) return "";

      try {
        const date = new Date(dateValue);

        if (isNaN(date.getTime())) return "";

        // Format as YYYY-MM-DD for input type="date"
        return format(date, "yyyy-mm-dd");
        // return date.toISOString().split("T")[0];
      } catch (error) {
        return "";
      }
    };

    // Parse date value for the date picker
    const parseDate = (dateValue) => {
      if (!dateValue) return "";

      try {
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`; // Format acceptable by input[type="date"]
      } catch (error) {
        return "";
      }
    };

    // Handle cell rendering based on type
    switch (column.meta?.type) {
      case "select":
        return (
          <Select
            className="w-full"
            onValueChange={(e) => handleCellEdit(rowIndex, columnId, e)}
          >
            <SelectTrigger className="w-full h-9 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <SelectValue
                placeholder={editedData[rowIndex]?.[columnId] ?? value}
              />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectGroup>
                {column.meta.options.map((option, idx) => (
                  <SelectItem
                    key={idx}
                    value={option.label}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case "date":
        const dateValue =
          // parseDate(editedData?.[rowIndex]?.[columnId]) || parseDate(value);
          editedData?.[rowIndex]?.[columnId] ?? value;
        const inputDateValue = dateValue
          ? format(new Date(dateValue), "yyyy-MM-dd")
          : "";
        console.log(editedData?.[rowIndex]?.[columnId], inputDateValue);
        return (
          <div onClick={(e) => e.stopPropagation()}>
            {/* <DatePicker
              selected={parseDate(editedData["0-date"] || "")}
              onChange={(date) => {
                if (date === null) {
                  handleCellEdit(0, "date", "");
                } else {
                  const formattedDate = format(new Date(date), "yyyy-MM-dd");
                  handleCellEdit(0, "date", formattedDate);
                }
              }}
              dateFormat="dd/MM/yyyy"
              className="w-full h-9 px-2 border rounded-md"
              wrapperClassName="w-32"
              showYearDropdown
              showMonthDropdown
              scrollableYearDropdown
              isClearable
             /> */}
            <Input
              type="date"
              value={inputDateValue}
              onChange={(e) => {
                const rawDate = e.target.value;
                console.log(e);
                if (!rawDate) {
                  handleCellEdit(rowIndex, columnId, ""); // Clear the date in state
                  return;
                }
                handleCellEdit(rowIndex, columnId, e.target.value);
              }}
              className="w-full h-9 px-3 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800"
            />
          </div>
        );
      default:
        return (
          <Input
            type={column.meta?.type || "text"}
            value={editedData[rowIndex]?.[columnId] ?? value}
            onChange={
              (e) => handleCellEdit(rowIndex, columnId, e.target.value, e)
              // console.log(rowIndex, columnId, e.target.value, e)
            }
            className="w-full h-9 px-3 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800"
          />
        );
    }
  }
);

export function EditTable({
  tData,
  tColumns,
  rowClick = false,
  pagination = true,
  search = true,
  editable = false,
  setUpdateFlag,
  setTaskDetails,
  taskData,
  forProjectAddition = false,
}) {
  const [filtering, setFiltering] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(()=>[...taskData]);

  const [affectNextRow, setAffectNextRow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle cell edits with useCallback for better performance
  const handleCellEdit = useCallback(
    (rowIndex, columnId, value, e) => {
      // if (e) {
      //   e.stopPropagation();
      // }

      // console.log(taskData);
      const currentRow = taskData[rowIndex];

      let dateValue = "";

      //format date
      if (columnId === "plan_date" || columnId === "actual_date") {
        if (value === "") dateValue = "";
        else dateValue = format(new Date(value), "dd/MMM/yy");
      }
      // console.log(dateValue);

      const newEdits = {
        ...editedData,
        [rowIndex]: {
          ...editedData[rowIndex],
          [columnId]:
            columnId === "plan_date" || columnId === "actual_date"
              ? dateValue
              : value,
        },
      };

      // If editing plan_date, validate any existing actual_date is not before it
      if (columnId === "plan_date" && value) {
        console.log(editedData[rowIndex]?.status);
        if (
          editedData[rowIndex]?.status === "Not Required" ||
          editedData[rowIndex]?.status === "Not Applicable"
        ) {
          alert(
            "No Plan Date or Actual Date can be set if Status is Not Required/Not Applicable"
          );
          return;
        }
        const actualDate =
          editedData[rowIndex]?.actual_date || currentRow.actual_date;

        if (actualDate) {
          const planDateObj = new Date(value);
          const actualDateObj = new Date(actualDate);

          if (!isNaN(planDateObj) && !isNaN(actualDateObj)) {
            if (
              isBefore(actualDateObj, planDateObj) &&
              !isEqual(actualDateObj, planDateObj)
            ) {
              alert("Plan date cannot be later than the actual date");
              return;
            }
          }
        }
      }
      //If editing actual_date, validating any existing plan_date is not after it
      if (columnId === "actual_date" && value) {
        if (
          editedData[rowIndex]?.status === "Not Required" ||
          editedData[rowIndex]?.status === "Not Applicable"
        ) {
          alert(
            "No Plan Date or Actual Date can be set if Status is Not Required/Not Applicable"
          );
          return;
        }
        const planDate =
          editedData[rowIndex]?.plan_date || currentRow.plan_date;

        if (planDate) {
          const actualDateObj = new Date(value);
          const planDateObj = new Date(planDate);

          if (!isNaN(planDateObj) && !isNaN(actualDateObj)) {
            if (
              isAfter(planDateObj, actualDateObj) &&
              !isEqual(actualDateObj, planDateObj)
            ) {
              alert("Actual date cannot be before than the actual date");
              return;
            }
          }
        }
      }
      // Clear dates if Status is Not Applicable or Not Required
      if (
        columnId === "status" &&
        (value === "Not Applicable" || value === "Not Required")
      ) {
        console.log(value);
        if (!newEdits[rowIndex]) {
          newEdits[rowIndex] = {};
        }
        console.log(value);
        newEdits[rowIndex].plan_date = "";
        newEdits[rowIndex].actual_date = "";
        newEdits[rowIndex].duration = "";
      }

      // Auto calculate duration if both dates are present
      if (columnId === "plan_date" || columnId === "actual_date") {
        const currentRow = taskData[rowIndex];
        const planDate =
          columnId === "plan_date"
            ? value
            : editedData[rowIndex]?.plan_date || currentRow.plan_date;

        const actualDate =
          columnId === "actual_date"
            ? value
            : editedData[rowIndex]?.actual_date || currentRow.actual_date;

        if (planDate && actualDate) {
          try {
            const planDateObj = new Date(planDate);
            const actualDateObj = new Date(actualDate);

            if (!isNaN(planDateObj) && !isNaN(actualDateObj)) {
              const diff = differenceInDays(actualDateObj, planDateObj);
              newEdits[rowIndex].duration = diff;
            }
          } catch (error) {
            console.error("Date calculation error:", error);
          }
        }

        // Auto-fill the next row's plan_date if actual_date is being set
        // if (
        //   columnId === "actual_date" &&
        //   value &&
        //   rowIndex < taskData.length - 1
        // ) {
        //   const nextRowIndex = rowIndex + 1;
        //   const nextRow = taskData[nextRowIndex];

        //   const nextRowPlanDate =
        //     editedData[nextRowIndex]?.plan_date || nextRow.plan_date;
        //   if (!nextRowPlanDate) {
        //     newEdits[nextRowIndex] = {
        //       ...editedData[nextRowIndex],
        //       plan_date: value,
        //     };
        //   }
        // }

        //Auto-fill the next target date/plan date on adding duration
        if (columnId === "duration" && rowIndex < taskData.length - 1) {
          const nextRowIndex = rowIndex + 1;
          const nextRow = taskData[nextRowIndex];
          const currentPlanDate = new Date(editedData[rowIndex]?.plan_date);

          const newRowPlanDate = addDays(currentPlanDate, value);
          console.log(newRowPlanDate);

          // if(!netRowPlanDate){
          //   newEdits[nextRowIndex={
          //     ...editedData[nextRowIndex],plan_date:""
          //   }]
          // }
        }
      }

      setEditedData(newEdits);
    },
    [taskData, editedData]
  );

  // Save changes handler
  const handleSaveChanges = useCallback(() => {
    const updatedData = tData.map((row, index) => ({
      ...row,
      ...editedData[index],
    }));

    setIsEditing(false);
    setEditedData({});

    if (!forProjectAddition) {
      setUpdateFlag(true);
    }

    setTaskDetails(updatedData);
  }, [tData, editedData, forProjectAddition, setUpdateFlag, setTaskDetails]);

  // Cancel editing handler
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditedData({});
  }, []);

  // Enhanced columns with editable cell rendering
  const editableColumns = tColumns.map((column) => ({
    ...column,
    cell: ({ row, column, getValue }) => {
      const value = getValue();
      const rowIndex = row.index;
      const columnId = column.id;
      console.log(value,rowIndex,columnId)

      // return (
      //   <EditableCell
      //     column={column.columnDef}
      //     value={value}
      //     rowIndex={rowIndex}
      //     columnId={columnId}
      //     isEditing={isEditing && editable}
      //     editedData={editedData}
      //     handleCellEdit={handleCellEdit}
      //   />
      // );
      if (isEditing) {
        return (
          <Input
            value={editedData?.[rowIndex]?.[columnId]}//?? value}
            onChange={(e) => handleCellEdit(rowIndex, columnId, e.target.value)}
            className="w-full"
          />
        );
      }
      return value;
    },
  }));

  // Initialize table
  const table = useReactTable({
    data: tData,
    columns: editableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w-full max-w-full mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-gray-100 dark:border-gray-800">
        {search && (
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              placeholder="Search across all columns..."
              className="pl-10 pr-4 py-2 w-full sm:w-80 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-800"
            />
          </div>
        )}

        {editable && (
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30 transition-all duration-200 rounded-lg font-medium"
              >
                <Edit3 className="w-4 h-4" />
                Edit Table
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30 transition-all duration-200 rounded-lg font-medium"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`
                      border-b border-gray-50 dark:border-gray-800/50 
                      hover:bg-gray-50/50 dark:hover:bg-gray-800/30 
                      transition-colors duration-150
                      ${isEditing ? "" : "cursor-pointer"}
                      ${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50/30 dark:bg-gray-800/20"
                      }
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-4 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tColumns.length}
                    className="h-32 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="font-medium">No results found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {table.getRowModel().rows.length} of {tData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-2 px-3 py-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-2 px-3 py-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-lg"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
