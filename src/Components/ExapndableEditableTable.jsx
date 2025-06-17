import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Pencil,
  Save,
  Trash,
  X,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";
import FileAttachment from "./FileAttachment";

const ExpandableEditableTable = ({
  taskData,
  setTaskData,
  generalTeam = [],
  forKMC = false,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([]
    // () =>
    // taskData?.length === 0 ? [] :
    //  [...taskData]
  );
  const [expandedRows, setExpandedRows] = useState({});
  const [editingRows, setEditingRows] = useState({});
  const [editValues, setEditValues] = useState({});

  console.log(generalTeam);
  console.log(taskData);

  
  useEffect(() => {
    //  const updatedTasks = Array.isArray(data)
    //     ? data
    //     : [data];
    
    // setTaskData([...data]);
    // console.log(data);
    // console.log(updatedTasks)
  }, [data]);

  // console.log(taskData)
  // Define column structure for TanStack Table
  const columns = useMemo(
    () => [
      {
        accessorKey: "task_name",
        header: "Name",
        cell: ({ row, getValue }) => {
          const value = getValue();
          return editingRows[row.original.id] ? (
            <Input
              value={editValues[row.original.id]?.task_name || value}
              onChange={(e) =>
                handleInputChange(row.original.id, "task_name", e.target.value)
              }
              className="h-8 px-2"
              required
              autoFocus
              placeholder={"Task Name"}
            />
          ) : (
            value
          );
        },
      },
      {
        accessorKey: "plan_date",
        header: "Plan Date",
        cell: ({ row, getValue }) => {
          const value = getValue();
          if (editingRows[row.original.id]) {
            return (
              <Input
                type="date"
                value={editValues[row.original.id]?.plan_date}
                onChange={(e) =>
                  handleInputChange(
                    row.original.id,
                    "plan_date",
                    e.target.value
                  )
                }
                className="h-8 px-2"
                required
              />
            );
          }

          const dateValue = new Date(value);
          if (!isNaN(dateValue) && value) {
            return format(dateValue, "dd/MM/yyyy");
          }
          // else{
          //   alert("Please fill in the details");
          // }
          return "";
        },
      },
      {
        accessorKey: "actual_date",
        header: "End Date",
        cell: ({ row, getValue }) => {
          const value = getValue();
          if (editingRows[row.original.id]) {
            return (
              <Input
                required
                type="date"
                value={editValues[row.original.id]?.actual_date}
                onChange={(e) =>
                  handleInputChange(
                    row.original.id,
                    "actual_date",
                    e.target.value
                  )
                }
                className="h-8 px-2"
              />
            );
          }

          const dateValue = new Date(value);
          if (!isNaN(dateValue) && value) {
            return format(dateValue, "dd/MM/yyyy");
          }
          return "";
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row, getValue }) => {
          const value = getValue();
          const statusOptions = [
            { value: "pending", label: "Pending" },
            { value: "in_progress", label: "In Progress" },
            { value: "completed", label: "Completed" },
            { value: "blocked", label: "Blocked" },
          ];

          return editingRows[row.original.id] ? (
            <Select
              required
              defaultValue={editValues[row.original.id]?.status || value}
              onValueChange={(selectedValue) =>
                handleInputChange(row.original.id, "status", selectedValue)
              }
            >
              <SelectTrigger className="h-8">
                <SelectValue
                  placeholder={editValues[row.original.id]?.status || value}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            value
          );
        },
      },
      {
        id: "task_priority",
        header: "Priority",
        cell: ({ row, getValue }) => {
          const value = getValue();
          const options = [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ];

          return editingRows[row.original.id] ? (
            <Select
              required
              defaultValue={editValues[row.original.id]?.task_priority || value}
              onValueChange={(selectedValue) =>
                handleInputChange(
                  row.original.id,
                  "task_priority",
                  selectedValue
                )
              }
            >
              <SelectTrigger className="h-8">
                <SelectValue
                  placeholder={
                    editValues[row.original.id]?.task_priority || value
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            row.original.task_priority
          );
        },
      },
      {
        id: "assignedTo",
        header: "Assigned To",
        cell: ({ row, getValue }) => {
          const options = [...generalTeam];
          return editingRows[row.original.id] ? (
            <Select
              defaultValue={[row.original.id]?.user_responsibility_name} // || value}
              onValueChange={(selectedValue) => {
                handleInputChange(
                  row.original.id,
                  "user_responsibility_id",
                  selectedValue
                );
                handleInputChange(
                  row.original.id,
                  "user_responsibility_name",
                  options.find((option) => option.userIndex === selectedValue)
                    .firstname
                );
              }}
            >
              <SelectTrigger className="h-8">
                <SelectValue
                  placeholder={
                    editValues[row.original.id]?.user_responsibility_name
                  } // || value}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.userIndex} value={option.userIndex}>
                      {option.firstname}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            row.original.user_responsibility_name
          );
        },
      },

      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            {editingRows[row.original.id] ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => saveRow(row.original.id)}
                  className="h-8 w-8 p-0"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => cancelEditing(row.original.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(row.original.id, row.original)}
                  className="h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteRow(row.original.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ),
      },
    ],
    [editingRows, editValues]
  );

  const majorTaskColumns_project_creation = useMemo(
    () => [
      {
        accessorKey: "task_phase",
        header: "Phase",
        cell: ({ row, getValue }) => {
          const value = getValue();
          return editingRows[row.original.id] ? (
            <Input
              value={editValues[row.original.id]?.task_phase || value}
              onChange={(e) =>
                handleInputChange(row.original.id, "task_phase", e.target.value)
              }
              className="h-8 px-2"
              disabled={true}
            />
          ) : (
            value
          );
        },
      },
      {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row, getValue }) => {
          const value = getValue();
          return editingRows[row.original.id] ? (
            <Input
              value={editValues[row.original.id]?.stage || value}
              onChange={(e) =>
                handleInputChange(row.original.id, "stage", e.target.value)
              }
              className="h-8 px-2"
              disabled={true}
            />
          ) : (
            value
          );
        },
      },
      {
        accessorKey: "key_milestone",
        header: "Milestone",
        cell: ({ row, getValue }) => {
          const value = getValue();
          return editingRows[row.original.id] ? (
            <Input
              value={editValues[row.original.id]?.key_milestone || value}
              onChange={(e) =>
                handleInputChange(
                  row.original.id,
                  "key_milestone",
                  e.target.value
                )
              }
              className="h-8 px-2"
              disabled={true}
            />
          ) : (
            value
          );
        },
      },
      {
        accessorKey: "plan_date",
        header: "Plan Date",
        cell: ({ row, getValue }) => {
          const value = getValue();
          if (editingRows[row.original.id]) {
            return (
              <Input
                type="date"
                value={editValues[row.original.id]?.plan_date}
                onChange={(e) =>
                  handleInputChange(
                    row.original.id,
                    "plan_date",
                    e.target.value
                  )
                }
                className="h-8 px-2"
                required
              />
            );
          }

          const dateValue = new Date(value);
          if (!isNaN(dateValue) && value) {
            return format(dateValue, "dd/MM/yyyy");
          }
          return "";
        },
      },
      {
        accessorKey: "actual_date",
        header: "Actual Date",
        cell: ({ row, getValue }) => {
          const value = getValue();
          if (editingRows[row.original.id]) {
            return (
              <Input
                type="date"
                value={editValues[row.original.id]?.actual_date}
                onChange={(e) =>
                  handleInputChange(
                    row.original.id,
                    "actual_date",
                    e.target.value
                  )
                }
                className="h-8 px-2"
                required
              />
            );
          }

          const dateValue = new Date(value);
          if (!isNaN(dateValue) && value) {
            return format(dateValue, "dd/MM/yyyy");
          }
          return "";
        },
      },
      {
        accessorKey: "responsibility",
        header: "Responsibility",
        cell: ({ row, getValue }) => {
          const value = getValue();
          return editingRows[row.original.id] ? (
            <Input
              value={editValues[row.original.id]?.responsibility || value}
              onChange={(e) =>
                handleInputChange(
                  row.original.id,
                  "responsibility",
                  e.target.value
                )
              }
              className="h-8 px-2"
              disabled={true}
            />
          ) : (
            value
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row, getValue }) => {
          const value = getValue();
          const statusOptions = [
            { value: "done", label: "Done" },
            { value: "pending", label: "Pending" },
            { value: "not_applicable", label: "Not Applicable" },
            { value: "not_required", label: "Not Required" },
          ];

          return editingRows[row.original.id] ? (
            <Select
              required
              defaultValue={editValues[row.original.id]?.status || value}
              onValueChange={(selectedValue) =>
                handleInputChange(row.original.id, "status", selectedValue)
              }
            >
              <SelectTrigger className="h-8">
                <SelectValue
                  placeholder={editValues[row.original.id]?.status || value}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            value
          );
        },
      },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row, getValue }) => {
          const value = getValue();
          return editingRows[row.original.id] ? (
            <Input
              type="number"
              value={editValues[row.original.id]?.duration || value}
              onChange={(e) =>
                handleInputChange(row.original.id, "duration", e.target.value)
              }
              className="h-8 px-2"
            />
          ) : (
            value
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2">
            {editingRows[row.original.id] ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => saveRow(row.original.id)}
                  className="h-8 w-8 p-0"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => cancelEditing(row.original.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(row.original.id, row.original)}
                  className="h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteRow(row.original.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ),
      },
    ],
    [editingRows, editValues]
  );

  // Toggle row expansion
  const toggleRowExpand = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  // Start editing a row
  const startEditing = (rowId, rowData) => {
    setEditingRows((prev) => ({ ...prev, [rowId]: true }));
    setEditValues((prev) => ({ ...prev, [rowId]: { ...rowData } }));
  };

  // Cancel editing
  const cancelEditing = (rowId) => {
    setEditingRows((prev) => {
      const newValues = { ...prev };
      delete newValues[rowId];
      return newValues;
    });
    setEditValues((prev) => {
      const newValues = { ...prev };
      delete newValues[rowId];
      return newValues;
    });
  };

  // Handle input change during editing
  const handleInputChange = (rowId, field, value) => {
    // console.log(value);
    setEditValues((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: value,
      },
    }));
  };

  // Save edited row
  const saveRow = (rowId) => {
    setData((prev) =>
      prev.map((row) => (row.id === rowId ? { ...editValues[rowId] } : row))
    );

    cancelEditing(rowId);
  };

  // Delete a row
  const deleteRow = (rowId) => {
    setData((prev) => prev.filter((row) => row.id !== rowId));
    setExpandedRows((prev) => {
      const newExpandedRows = { ...prev };
      delete newExpandedRows[rowId];
      return newExpandedRows;
    });
  };

  // Add a new row
  const handleAddRow = () => {
    const newRow = {
      id: String(data.length + 1),
      task_name: "",
      status: "Pending",
      task_priority: "Medium",
      plan_date: new Date(""),
      actual_date: new Date(""),
      user_responsibility_name: "",
      user_responsibility_id: "",
      details: "Add task details here",
    };
    setData([...data, newRow]);
    startEditing(newRow.id, newRow);
  };

  // Create TanStack table instance
  const table = useReactTable({
    data:taskData,
    columns: forKMC ? majorTaskColumns_project_creation : columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </div>
        {forKMC?<></>:<div className="flex gap-2">
          <Input
            placeholder="Search tasks..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleAddRow}>Add New Task</Button>
        </div>}
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">
              No tasks available. Click on "Add New Task".
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead className="w-10"></TableHead>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpand(row.original.id)}
                        className="p-0 h-8 w-8"
                      >
                        {expandedRows[row.original.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {expandedRows[row.original.id] && (
                    <TableRow className="bg-gray-200">
                      {/* <TableCell></TableCell> */}
                      <TableCell
                        colSpan={row.getVisibleCells().length + 1}
                        className="p-4"
                      >
                        <div className="rounded-md bg-background p-4 grid grid-cols-6">
                          <div className="col-span-2">
                            <h4 className="font-medium mb-2 ">
                              Task Description
                            </h4>
                            {editingRows[row.original.id] ? (
                              <Textarea
                                value={
                                  editValues[row.original.id]?.details ||
                                  row.original.details
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    row.original.id,
                                    "details",
                                    e.target.value
                                  )
                                }
                                // className="w-full border rounded-md p-2 mb-4 h-32"
                              />
                            ) : (
                              <Textarea
                                placeholder="Add Task Details"
                                value={row.original.details}
                              />
                            )}
                          </div>
                          <div className="col-span-2">
                            <h4 className="font-medium mb-2 ">Attachments</h4>
                            {editingRows[row.original.id] ? (
                              // <Input
                              // value={
                              //   editValues[row.original.id]?.details ||
                              //   row.original.details
                              // }
                              // onChange={(e) =>
                              // handleInputChange(
                              //   row.original.id,
                              //   "",
                              //   e.target.value
                              // )
                              // }
                              // className="w-full"
                              // />
                              // <>sadad</>
                              <FileAttachment />
                            ) : (
                              <FileAttachment />
                              // <p></p>
                            )}
                          </div>
                          <div className="col-span-2">
                            <h4 className="font-medium mb-2 ">Dependencies</h4>
                            {editingRows[row.original.id] ? (
                              <Input
                                // value={
                                //   editValues[row.original.id]?.details ||
                                //   row.original.details
                                // }
                                // onChange={(e) =>
                                // handleInputChange(
                                //   row.original.id,
                                //   "",
                                //   e.target.value
                                // )
                                // }
                                className="w-full"
                              />
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpandableEditableTable;
