import { useState, useMemo, useEffect, Fragment } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Plus,
  Paperclip,
  Check,
  X,
  Trash,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpandableSubtaskTable = ({
  taskData,
  setTaskData,
  generalTeam = [],
}) => {
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [currentItemForAttachment, setCurrentItemForAttachment] =
    useState(null);
  const [tasks, setTasks] = useState(() => [...taskData]);
  const [nextId, setNextId] = useState(1);
  const [nextSubtaskId, setNextSubtaskId] = useState(101);

  useEffect(() => {
    setTaskData([...tasks]);
    console.log(tasks);
  }, [tasks, setTaskData]);

  const openAttachmentModal = (type, taskId, subtaskId = null) => {
    setCurrentItemForAttachment({ type, taskId, subtaskId });
    setIsAttachmentModalOpen(true);
  };

  const closeAttachmentModal = () => {
    setIsAttachmentModalOpen(false);
    setCurrentItemForAttachment(null);
  };

  // Column definitions
  const columns = useMemo(
    () => [
      {
        header: "Task Name",
        accessorKey: "task_name",
        meta: {
          type: "text",
          editable: true,
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        meta: {
          type: "select",
          options: [
            { value: "Not Started", label: "Not Started" },
            { value: "In Progress", label: "In Progress" },
            { value: "Completed", label: "Completed" },
          ],
          editable: true,
        },
      },
      {
        header: "Start Date",
        accessorKey: "plan_date",
        meta: {
          type: "date",
          editable: true,
        },
      },
      {
        header: "Due Date",
        accessorKey: "actual_date",
        meta: {
          type: "date",
          editable: true,
        },
      },
      {
        header: "Assignee",
        accessorKey: "user_responsibility_name",
        meta: {
          type: "select",
          editable: true,
          options: [...generalTeam],
          //  [
          //   { value: "low", label: "Low" },
          //   { value: "medium", label: "Medium" },
          //   { value: "high", label: "High" },
          // ],
          // cell: ({ row, getValue }) => {
          //   const options = [...generalTeam];
          //   return editingRows[row.original.id] ? (
          //     <Select
          //       defaultValue={[row.original.id]?.user_responsibility_name} // || value}
          //       onValueChange={(selectedValue) => {
          //         handleInputChange(
          //           row.original.id,
          //           "user_responsibility_id",
          //           selectedValue
          //         );
          //         handleInputChange(
          //           row.original.id,
          //           "user_responsibility_name",
          //           options.find((option) => option.userIndex === selectedValue)
          //             .firstname
          //         );
          //       }}
          //     >
          //       <SelectTrigger className="h-8">
          //         <SelectValue
          //           placeholder={
          //             editValues[row.original.id]?.user_responsibility_name
          //           } // || value}
          //         />
          //       </SelectTrigger>
          //       <SelectContent>
          //         <SelectGroup>
          //           {options.map((option) => (
          //             <SelectItem
          //               key={option.userIndex}
          //               value={option.userIndex}
          //             >
          //               {option.firstname}
          //             </SelectItem>
          //           ))}
          //         </SelectGroup>
          //       </SelectContent>
          //     </Select>
          //   ) : (
          //     row.original.user_responsibility_name
          //   );
          // },
        },
      },
      {
        header: "Priority",
        accessorKey: "task_priority",
        meta: {
          type: "select",
          options: [
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
          ],
          editable: true,
        },
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => renderActions(row.original),
      },
    ],
    []
  );

  // Add a new empty task row
  const addNewTask = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    setTasks([
      ...tasks,
      {
        id: nextId,
        task_name: "",
        status: "not_started",
        actual_date: formattedDate,
        plan_date: formattedDate,
        // assignedTo: "",
        user_responsibility_name: "",
        user_responsibility_id: null,
        task_priority: "medium",
        expanded: false,
        editing: true,
        task_description: "",
        subtasks: [],
      },
    ]);
    setNextId(nextId + 1);
  };

  // Add a new empty subtask row
  const addSubtask = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: [
              ...task.subtasks,
              {
                id: nextSubtaskId,
                task_name: "",
                status: "not_started",
                actual_date: task.actual_date,
                plan_date: task.plan_date,
                // assignedTo: "",
                user_responsibility_name: "",
                user_responsibility_id: null,
                task_priority: "low",
                task_description: "",
                expanded: false,
                editing: true,
              },
            ],
          };
        }
        return task;
      })
    );
    setNextSubtaskId(nextSubtaskId + 1);
  };

  // Toggle expansion for main tasks or subtasks
  const toggleExpand = (taskId, subtaskId = null) => {
    setTasks(
      tasks.map((task) => {
        if (subtaskId === null) {
          if (task.id === taskId) {
            return { ...task, expanded: !task.expanded };
          }
        } else if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, expanded: !subtask.expanded }
                : subtask
            ),
          };
        }
        return task;
      })
    );
  };

  // Toggle edit mode for tasks or subtasks
  const toggleEdit = (taskId, subtaskId = null) => {
    setTasks(
      tasks.map((task) => {
        if (subtaskId === null) {
          if (task.id === taskId) {
            return { ...task, editing: !task.editing };
          }
        } else if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, editing: !subtask.editing }
                : subtask
            ),
          };
        }
        return task;
      })
    );
  };

  // Delete a task from the list
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Delete a subtask from a task
  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.filter(
              (subtask) => subtask.id !== subtaskId
            ),
          };
        }
        return task;
      })
    );
  };

  // Update the input value for task/subtask fields
  const handleInputChange = (taskId, field, value, subtaskId = null) => {
    setTasks(
      tasks.map((task) => {
        if (subtaskId === null) {
          if (task.id === taskId) {
            return { ...task, [field]: value };
          }
        } else if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, [field]: value }
                : subtask
            ),
          };
        }
        return task;
      })
    );
  };

  const handleAssigneeChange = (taskId, selectedValue, subtaskId) => {
    const selectedUser = generalTeam.find(
      (user) => user.userIndex === selectedValue
    );
    if (!selectedUser) return;

    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          const update = {
            user_responsibility_id: selectedValue,
            user_responsibility_name: selectedUser.firstname,
          };

          if (subtaskId === null) {
            return { ...task, ...update };
          } else {
            return {
              ...task,
              subtasks: task.subtasks.map((sub) =>
                sub.id === subtaskId ? { ...sub, ...update } : sub
              ),
            };
          }
        }
        return task;
      })
    );
  };

  const renderActions = (task) => {
    return (
      <div className="flex space-x-2">
        {task.editing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 h-8 w-8"
              onClick={() => toggleEdit(task.id)}
            >
              <Check size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 h-8 w-8"
              onClick={() => toggleEdit(task.id)}
            >
              <X size={16} />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleEdit(task.id)}
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 h-8 w-8"
              onClick={() => deleteTask(task.id)}
            >
              <Trash size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600 h-8 w-8"
              onClick={() => openAttachmentModal("task", task.id)}
              title="Attach File"
            >
              <Paperclip size={16} />
            </Button>
          </>
        )}
      </div>
    );
  };

  const renderSubtaskActions = (taskId, subtask) => {
    return (
      <div className="flex space-x-2">
        {subtask.editing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 h-8 w-8"
              onClick={() => toggleEdit(taskId, subtask.id)}
            >
              <Check size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 h-8 w-8"
              onClick={() => toggleEdit(taskId, subtask.id)}
            >
              <X size={16} />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleEdit(taskId, subtask.id)}
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 h-8 w-8"
              onClick={() => deleteSubtask(taskId, subtask.id)}
            >
              <Trash size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600 h-8 w-8"
              onClick={() => openAttachmentModal("subtask", taskId, subtask.id)}
              title="Attach File"
            >
              <Paperclip size={16} />
            </Button>
          </>
        )}
      </div>
    );
  };

  // Render a cell based on its type and editing state
  const renderCell = (taskId, columnId, rowData, subtaskId = null) => {
    const column = columns.find(
      (col) => col.accessorKey === columnId || col.id === columnId
    );
    if (!column || columnId === "actions") return null;

    const isEditing = subtaskId
      ? tasks
          .find((t) => t.id === taskId)
          ?.subtasks.find((s) => s.id === subtaskId)?.editing
      : tasks.find((t) => t.id === taskId)?.editing;

    const value = rowData[column.accessorKey];

    if (isEditing && column.meta?.editable) {
      if (column.meta.type === "text") {
        return (
          <Input
            type="text"
            value={value || ""}
            onChange={(e) =>
              handleInputChange(
                taskId,
                column.accessorKey,
                e.target.value,
                subtaskId
              )
            }
            className="h-8"
          />
        );
      } else if (column.meta.type === "date") {
        return (
          <Input
            type="date"
            value={value || ""}
            onChange={(e) =>
              handleInputChange(
                taskId,
                column.accessorKey,
                e.target.value,
                subtaskId
              )
            }
            className="h-8"
          />
        );
      } else if (column.meta.type === "select") {
        //   if (column.accessorKey === "user_responsibility_name") {
        //     const options = [...generalTeam];
        //     <Select
        //       value={value || ""}
        //       // defaultValue={[row.original.id]?.user_responsibility_name} // || value}
        //       onValueChange={(selectedValue) => {
        //         // handleInputChange(
        //         //   row.original.id,
        //         //   "user_responsibility_id",
        //         //   selectedValue
        //         // );
        //         // handleInputChange(
        //         //   row.original.id,
        //         //   "user_responsibility_name",
        //         //   options.find((option) => option.userIndex === selectedValue)
        //         //     .firstname
        //         // );
        //         console.log(options);
        //         const firstName = "x"; // options.find((option) => {
        //         //   console.log(option);
        //         //   return "x";
        //         // });
        //         handleInputChange(
        //           taskId,
        //           column.accessorKey,
        //           selectedValue,
        //           subtaskId
        //         );
        //         handleInputChange(
        //           taskId,
        //           "user_responsibility_name",
        //           firstName,
        //           subtaskId
        //         );
        //       }}
        //     >
        //       <SelectTrigger className="h-8">
        //         <SelectValue placeholder="Select" />
        //       </SelectTrigger>
        //       <SelectContent>
        //         <SelectGroup>
        //           {options.map((option) => (
        //             <SelectItem key={option.userIndex} value={option.userIndex}>
        //               {option.firstname}
        //             </SelectItem>
        //           ))}
        //         </SelectGroup>
        //       </SelectContent>
        //     </Select>;
        //   } else
        return (
          <Select
            value={value || ""}
            onValueChange={(selectedValue) => {
              if (column.accessorKey === "user_responsibility_name") {
                handleAssigneeChange(taskId, selectedValue, subtaskId);
              } else
                handleInputChange(
                  taskId,
                  column.accessorKey,
                  selectedValue,
                  subtaskId
                );
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {column.accessorKey === "user_responsibility_name"
                ? column.meta.options.map((option) => (
                    <SelectItem key={option.userIndex} value={option.userIndex}>
                      {option.firstname}
                    </SelectItem>
                  ))
                : column.meta.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        );
        // if (column.accessorKey === "user_responsibility_name") {
        //   return (
        //     <Select
        //       value={rowData.user_responsibility_id || ""}
        //       onValueChange={(selectedValue) => {
        //         // Find the selected user from generalTeam
        //         const selectedUser = generalTeam.find(
        //           (user) => user.userIndex === selectedValue
        //         );

        //         if (selectedUser) {
        //           // Update both fields in a single render cycle
        //           handleInputChange(
        //             taskId,
        //             "user_responsibility_id",
        //             selectedValue,
        //             subtaskId
        //           );
        //           handleInputChange(
        //             taskId,
        //             "user_responsibility_name",
        //             selectedUser.firstname,
        //             subtaskId
        //           );
        //         }
        //       }}
        //     >
        //       <SelectTrigger className="h-8">
        //         <SelectValue placeholder="Select Assignee" />
        //       </SelectTrigger>
        //       <SelectContent>
        //         {generalTeam.map((user) => (
        //           <SelectItem key={user.userIndex} value={user.userIndex}>
        //             {user.firstname}
        //           </SelectItem>
        //         ))}
        //       </SelectContent>
        //     </Select>
        //   );
        // } else {
        //   return (
        //     <Select
        //       value={value || ""}
        //       onValueChange={(selectedValue) =>
        //         handleInputChange(
        //           taskId,
        //           column.accessorKey,
        //           selectedValue,
        //           subtaskId
        //         )
        //       }
        //     >
        //       <SelectTrigger className="h-8">
        //         <SelectValue placeholder="Select" />
        //       </SelectTrigger>
        //       <SelectContent>
        //         {column.meta.options.map((option) => (
        //           <SelectItem key={option.value} value={option.value}>
        //             {option.label}
        //           </SelectItem>
        //         ))}
        //       </SelectContent>
        //     </Select>
        //   );
        // }
      }
    }

    // Display formatted values for non-editing mode
    if (column.meta?.type === "select") {
      const option =
        column.accessorKey === "user_responsibility_name"
          ? column.accessorKey
          : column.meta.options.find(
              (opt) =>
                // if (column.accessorKey === "user_responsibility_name") {
                //   return opt.userIndex === value;
                // }
                opt.firstname === value
            );
      return <span>{value}</span>;
    } else if (column.meta?.type === "date") {
      if (!value) return "";
      try {
        const date = new Date(value);
        return <span>{date.toLocaleDateString()}</span>;
      } catch (e) {
        return <span>{value}</span>;
      }
    }

    return <span>{value || ""}</span>;
  };

  // Create React Table instance for main tasks
  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex justify-between items-center">
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={addNewTask}>
          <Plus size={16} className="mr-2" /> Add New Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-gray-100">
          <p className="text-gray-500">
            No tasks available. Click on "Add New Task".
          </p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead className="w-12"></TableHead>
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
              {tasks.map((task) => (
                <Fragment key={task.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleExpand(task.id)}
                      >
                        {task.expanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </Button>
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.accessorKey || column.id}>
                        {column.id === "actions"
                          ? renderActions(task)
                          : renderCell(
                              task.id,
                              column.accessorKey || column.id,
                              task
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {task.expanded && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1}>
                        <div className="p-4 bg-gray-50">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg flex justify-between">
                                <div className="flex-col  w-full p-2">
                                  <div className="mb-2">Task Details</div>
                                  <Textarea
                                    value={
                                      // tasks[task.id]?.task_description ||
                                      task.task_description
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        task.id,
                                        "task_description",
                                        e.target.value
                                        // subtaskId
                                      )
                                    }
                                    className="w-full border rounded-md p-2 mb-4 h-12"
                                  />
                                </div>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addSubtask(task.id)}
                                >
                                  <Plus size={16} className="mr-1" /> Add
                                  Subtask
                                </Button>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              {task.subtasks.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="font-medium mb-2">Subtasks</h4>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        {columns.map((column) => (
                                          <TableHead
                                            key={
                                              column.accessorKey || column.id
                                            }
                                          >
                                            {column.header}
                                          </TableHead>
                                        ))}
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {task.subtasks.map((subtask) => (
                                        <Fragment key={subtask.id}>
                                          <TableRow className="hover:bg-gray-50">
                                            <TableCell>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() =>
                                                  toggleExpand(
                                                    task.id,
                                                    subtask.id
                                                  )
                                                }
                                              >
                                                {subtask.expanded ? (
                                                  <ChevronDown size={16} />
                                                ) : (
                                                  <ChevronRight size={16} />
                                                )}
                                              </Button>
                                            </TableCell>
                                            {columns.map((column) => (
                                              <TableCell
                                                key={
                                                  column.accessorKey ||
                                                  column.id
                                                }
                                              >
                                                {column.id === "actions"
                                                  ? renderSubtaskActions(
                                                      task.id,
                                                      subtask
                                                    )
                                                  : renderCell(
                                                      task.id,
                                                      column.accessorKey ||
                                                        column.id,
                                                      subtask,
                                                      subtask.id
                                                    )}
                                              </TableCell>
                                            ))}
                                          </TableRow>
                                          {subtask.expanded && (
                                            <TableRow>
                                              <TableCell
                                                colSpan={columns.length + 1}
                                              >
                                                <div className="p-4 bg-gray-100">
                                                  <Card>
                                                    <CardHeader>
                                                      <CardTitle className="text-sm">
                                                        Subtask Details
                                                      </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                      <Textarea
                                                        value={
                                                          subtask.task_description
                                                        }
                                                        onChange={(e) =>
                                                          handleInputChange(
                                                            task.id,
                                                            "task_description",
                                                            e.target.value,
                                                            subtask.id
                                                          )
                                                        }
                                                        className="w-full border rounded-md p-2 mb-4 h-12"
                                                      />
                                                    </CardContent>
                                                  </Card>
                                                </div>
                                              </TableCell>
                                            </TableRow>
                                          )}
                                        </Fragment>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Attachment Modal using shadcn/ui Dialog */}
      <Dialog
        open={isAttachmentModalOpen}
        onOpenChange={setIsAttachmentModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Attach File</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Attaching file for: {currentItemForAttachment?.type} ID:{" "}
              {currentItemForAttachment?.taskId}
              {currentItemForAttachment?.subtaskId
                ? ` (Subtask ID: ${currentItemForAttachment.subtaskId})`
                : ""}
            </p>
            <div className="mb-4 p-8 border-dashed border-2 border-gray-300 text-center rounded-md">
              <p className="text-gray-500">
                Drop files here or click to browse
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeAttachmentModal}>
              Cancel
            </Button>
            <Button onClick={closeAttachmentModal}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpandableSubtaskTable;
