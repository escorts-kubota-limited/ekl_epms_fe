// import React, { useState, useMemo } from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   createColumnHelper,
// } from '@tanstack/react-table';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Edit, 
//   Save, 
//   PlusCircle, 
//   Trash2,
//   AlertTriangle
// } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectLabel,
//   SelectItem,
//   SelectGroup,
// } from "./ui/select";
// import { Textarea } from './ui/textarea';

// const CrudExpandableTable = () => {
//   // Start with empty data
//   const [data, setData] = useState([]);
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [editingRows, setEditingRows] = useState(new Set());
//   const [nextId, setNextId] = useState(1);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [rowToDelete, setRowToDelete] = useState(null);

//   const columnHelper = createColumnHelper();

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor('task_name', {
//         header: 'Task Name',
//         cell: ({ row, getValue }) => {
//           const value = getValue() || '';
//           return editingRows.has(row.original.id) ? (
//             <Input
//               value={value}
//               onChange={(e) => handleCellChange(row.original.id, 'task_name', e.target.value)}
//               className="w-full"
//               placeholder="Enter name"
//             />
//           ) : value || <span className="text-muted-foreground italic">Not set</span>;
//         },
//       }),
//       columnHelper.accessor('start_date', {
//         header: 'Start Date',
//         cell: ({ row, getValue }) => {
//           const value = getValue() || '';
//           return editingRows.has(row.original.id) ? (
//             <Input
//               value={value}
//               onChange={(e) => handleCellChange(row.original.id, 'start_date', e.target.value)}
//               className="w-full"
//               placeholder="Enter role"
//               type={"date"}
//             />
//           ) : value || <span className="text-muted-foreground italic">Not set</span>;
//         },
//       }),
//       columnHelper.accessor('end_date', {
//         header: 'End Date',
//         cell: ({ row, getValue }) => {
//           const value = getValue() || '';
//           return editingRows.has(row.original.id) ? (
//             <Input
//               value={value}
//               onChange={(e) => handleCellChange(row.original.id, 'end_date', e.target.value)}
//               className="w-full"
//               placeholder="Enter department"
//               type={"date"}
//             />
//           ) : value || <span className="text-muted-foreground italic">Not set</span>;
//         },
//       }),
//       columnHelper.accessor('status', {
//         header: 'Status',
//         meta: {
//           options: [
//             { value: "done", label: "Done" },
//             { value: "pending", label: "Pending" },
//             { value: "not_applicable", label: "Not Applicable" },
//             { value: "not_required", label: "Not Required" },
//           ],
//         },
//         cell: ({ row, getValue }) => {
//           const value = getValue() || '';
//           return editingRows.has(row.original.id) ? (
//             <Input
//               value={value}
//               onChange={(e) => handleCellChange(row.original.id, 'status', e.target.value)}
//               className="w-full"
//               placeholder="Enter name"
//             />
//           //   <Select
//           //   // value={editedData[rowIndex]?.[columnId] ?? value}
//           //   value={value}
//           //   className="w-full"
//           //   onChange={(e) => handleCellChange(row.original.id, 'status', e.target.value)}
//           //   >
//           //   <SelectTrigger className="w-[180px]">
//           //     {/* <SelectValue
//           //       placeholder={editedData[rowIndex]?.[columnId] ?? value}
//           //     /> */}
//           //   </SelectTrigger>
//           //   <SelectContent>
//           //     <SelectGroup>
//           //       {/* <SelectLabel>Fruits</SelectLabel> */}
//           //       {column.columnDef.meta.options.map((option) => {
//           //         return (
//           //           <SelectItem value={option.label}>{option.label}</SelectItem>
//           //         );
//           //       })}
//           //     </SelectGroup>
//           //   </SelectContent>
//           // </Select>
//           ) : value || <span className="text-muted-foreground italic">Not set</span>;
//         },
//       }),
//       columnHelper.accessor('task_name', {
//         header: 'Task Name',
//         cell: ({ row, getValue }) => {
//           const value = getValue() || '';
//           return editingRows.has(row.original.id) ? (
//             <Input
//               value={value}
//               onChange={(e) => handleCellChange(row.original.id, 'task_name', e.target.value)}
//               className="w-full"
//               placeholder="Enter name"
//             />
//           ) : value || <span className="text-muted-foreground italic">Not set</span>;
//         },
//       }),
//       columnHelper.display({
//         id: 'actions',
//         header: () => <div className="text-right">Actions</div>,
//         cell: ({ row }) => (
//           <div className="flex justify-end gap-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => toggleEdit(row.original.id)}
//             >
//               {editingRows.has(row.original.id) ? 
//                 <Save className="h-4 w-4" /> : 
//                 <Edit className="h-4 w-4" />
//               }
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => toggleExpand(row.original.id)}
//             >
//               {expandedRows.has(row.original.id) ? 
//                 <ChevronUp className="h-4 w-4" /> : 
//                 <ChevronDown className="h-4 w-4" />
//               }
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-red-500 hover:text-red-700 hover:bg-red-100"
//               onClick={() => openDeleteDialog(row.original.id)}
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//           </div>
//         ),
//       }),
//     ],
//     [editingRows, expandedRows]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const toggleExpand = (id) => {
//     const newExpandedRows = new Set(expandedRows);
//     if (newExpandedRows.has(id)) {
//       newExpandedRows.delete(id);
//     } else {
//       newExpandedRows.add(id);
//     }
//     setExpandedRows(newExpandedRows);
//   };

//   const toggleEdit = (id) => {
//     const newEditingRows = new Set(editingRows);
//     if (newEditingRows.has(id)) {
//       newEditingRows.delete(id);
//     } else {
//       newEditingRows.add(id);
//     }
//     setEditingRows(newEditingRows);
//   };

//   const handleCellChange = (id, field, value) => {
//     setData(data.map(row => {
//       if (row.id === id) {
//         if (field.includes('.')) {
//           const [parent, child] = field.split('.');
//           return {
//             ...row,
//             [parent]: {
//               ...row[parent],
//               [child]: value
//             }
//           };
//         }
//         return {
//           ...row,
//           [field]: value
//         };
//       }
//       return row;
//     }));
//   };

//   const addNewRow = () => {
//     const newRow = {
//       id: nextId,
//       task_name: '',
//       start_date: new Date(),
//       end_date: new Date(),
//       status:'',
//       priority: '',
//       details: {
//         description: '',
//       }
//     };
    
//     setData([...data, newRow]);
//     setNextId(nextId + 1);
    
//     // Automatically put the new row in edit mode
//     const newEditingRows = new Set(editingRows);
//     newEditingRows.add(nextId);
//     setEditingRows(newEditingRows);
//   };

//   const openDeleteDialog = (id) => {
//     setRowToDelete(id);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = () => {
//     // Remove the row
//     setData(data.filter(row => row.id !== rowToDelete));
    
//     // Remove from expanded and editing sets if present
//     const newExpandedRows = new Set(expandedRows);
//     if (newExpandedRows.has(rowToDelete)) {
//       newExpandedRows.delete(rowToDelete);
//     }
//     setExpandedRows(newExpandedRows);
    
//     const newEditingRows = new Set(editingRows);
//     if (newEditingRows.has(rowToDelete)) {
//       newEditingRows.delete(rowToDelete);
//     }
//     setEditingRows(newEditingRows);
    
//     // Close the dialog
//     setDeleteDialogOpen(false);
//     setRowToDelete(null);
//   };

//   const cancelDelete = () => {
//     setDeleteDialogOpen(false);
//     setRowToDelete(null);
//   };

//   const renderExpandedRow = (rowData) => (
//     <TableRow className="bg-muted/50">
//       <TableCell colSpan={columns.length}>
//         <div className="p-4">
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <p className="font-medium mb-1">Description</p>
//               {editingRows.has(rowData.id) ? (
//                 // <Input 
//                 //   value={rowData.details?.email || ''}
//                 //   onChange={(e) => handleCellChange(rowData.id, 'details.email', e.target.value)}
//                 //   className="w-full"
//                 //   placeholder="Enter email"
//                 // />
//                 <Textarea className="rounded-xl " />
//               ) : rowData.details?.email || <span className="text-muted-foreground italic">Not set</span>}
//             </div>
//             <div>
//               <p className="font-medium mb-1">Phone</p>
//               {editingRows.has(rowData.id) ? (
//                 <Input 
//                   value={rowData.details?.phone || ''}
//                   onChange={(e) => handleCellChange(rowData.id, 'details.phone', e.target.value)}
//                   className="w-full"
//                   placeholder="Enter phone"
//                 />
//               ) : rowData.details?.phone || <span className="text-muted-foreground italic">Not set</span>}
//             </div>
//             <div>
//               <p className="font-medium mb-1">Address</p>
//               {editingRows.has(rowData.id) ? (
//                 <Input 
//                   value={rowData.details?.address || ''}
//                   onChange={(e) => handleCellChange(rowData.id, 'details.address', e.target.value)}
//                   className="w-full"
//                   placeholder="Enter address"
//                 />
//               ) : rowData.details?.address || <span className="text-muted-foreground italic">Not set</span>}
//             </div>
//           </div>
//         </div>
//       </TableCell>
//     </TableRow>
//   );

//   return (
//     <div className="w-full p-4 space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">Enter Project Tasks</h2>
//         <Button onClick={addNewRow} className="flex items-center gap-2">
//           <PlusCircle className="h-4 w-4" />
//           Add New Task
//         </Button>
//       </div>
      
//       {data.length === 0 ? (
//         <div className="text-center py-8 border rounded-md bg-muted/20">
//           <p className="text-muted-foreground">No data available. Click "Add New Task" to get started.</p>
//         </div>
//       ) : (
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map(headerGroup => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                   <TableHead key={header.id}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.map(row => (
//               <React.Fragment key={row.id}>
//                 <TableRow>
//                   {row.getVisibleCells().map(cell => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//                 {expandedRows.has(row.original.id) && renderExpandedRow(row.original)}
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       )}

//       {/* Confirmation Dialog for Row Deletion */}
//       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-red-500" />
//               Confirm Deletion
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this row? This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
//             <AlertDialogAction 
//               onClick={confirmDelete}
//               className="bg-red-500 hover:bg-red-600 text-white"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default CrudExpandableTable;

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Save, 
  PlusCircle, 
  Trash2,
  AlertTriangle
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

const CrudExpandableTable = ({ columns: propColumns, tableTitle = "Data Table", expandedRowContent }) => {
  // Start with empty data
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [editingRows, setEditingRows] = useState(new Set());
  const [nextId, setNextId] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const toggleExpand = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const toggleEdit = (id) => {
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(id)) {
      newEditingRows.delete(id);
    } else {
      newEditingRows.add(id);
    }
    setEditingRows(newEditingRows);
  };

  const handleCellChange = (id, field, value) => {
    setData(data.map(row => {
      if (row.id === id) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          return {
            ...row,
            [parent]: {
              ...row[parent],
              [child]: value
            }
          };
        }
        return {
          ...row,
          [field]: value
        };
      }
      return row;
    }));
  };

  // Enhanced columns with cell editing capability
  const enhancedColumns = useMemo(() => {
    // Process each column from props
    const processedColumns = propColumns.map(column => {
      // Keep the original column definition
      const newColumn = { ...column };
      
      // Only override the cell renderer if meta.editable is true
      if (column.meta?.editable) {
        // Store the original cell renderer (if any) to use in non-editing mode
        const originalCellRenderer = column.cell;
        
        newColumn.cell = ({ row, column, getValue }) => {
          const value = getValue();
          const accessorKey = column.id;
          
          if (editingRows.has(row.original.id)) {
            // Render different input types based on meta.type
            console.log(column.meta.type)
            switch (column.meta.type) {
              case 'select':
                return (
                  <Select
                    value={row.original[accessorKey] || ''}
                    onValueChange={(value) => handleCellChange(row.original.id, accessorKey, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue 
                        placeholder={row.original[accessorKey] || 'Select...'}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {column.meta.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              
              case 'date':
                return (
                  <Input
                    type="date"
                    value={value ? new Date(value).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleCellChange(row.original.id, accessorKey, e.target.value)}
                    className="w-full"
                  />
                );
              
              case 'textarea':
                return (
                  <Textarea
                    value={value || ''}
                    onChange={(e) => handleCellChange(row.original.id, accessorKey, e.target.value)}
                    className="w-full"
                    placeholder={`Enter ${column.header?.toString() || accessorKey}`}
                  />
                );
              
              case 'number':
                return (
                  <Input
                    type="number"
                    value={value || ''}
                    onChange={(e) => handleCellChange(row.original.id, accessorKey, e.target.value)}
                    className="w-full"
                    placeholder={`Enter ${column.header?.toString() || accessorKey}`}
                  />
                );
              
              default: // text input for any other type
                return (
                  <Input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleCellChange(row.original.id, accessorKey, e.target.value)}
                    className="w-full"
                    placeholder={`Enter ${column.header?.toString() || accessorKey}`}
                  />
                );
            }
          }
          
          // Use the original cell renderer if available and not in edit mode
          if (originalCellRenderer) {
            return originalCellRenderer({ row, column, getValue });
          }
          
          // Default display value
          return value || <span className="text-muted-foreground italic">Not set</span>;
        };
      }
      
      return newColumn;
    });

    // Add actions column at the end
    return [
      ...processedColumns,
      {
        id: 'tableActions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleEdit(row.original.id);
              }}
            >
              {editingRows.has(row.original.id) ? 
                <Save className="h-4 w-4" /> : 
                <Edit className="h-4 w-4" />
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(row.original.id);
              }}
            >
              {expandedRows.has(row.original.id) ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700 hover:bg-red-100"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteDialog(row.original.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      }
    ];
  }, [propColumns, editingRows, expandedRows]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const addNewRow = () => {
    // Create a new row with default values based on column definitions
    const newRow = { id: nextId };
    
    // Set default values for each column
    propColumns.forEach(column => {
      if (column.accessorKey) {
        // Set default values based on type
        if (column.meta?.type === 'date') {
          newRow[column.accessorKey] = new Date().toISOString().split('T')[0];
        } else if (column.meta?.type === 'select' && column.meta.options?.length > 0) {
          newRow[column.accessorKey] = column.meta.options[0].value;
        } else if (column.meta?.type === 'number') {
          newRow[column.accessorKey] = 0;
        } else {
          newRow[column.accessorKey] = '';
        }
      }
    });
    
    // Add details object for expanded content if needed
    newRow.details = {
      description: '',
    };
    
    setData([...data, newRow]);
    setNextId(nextId + 1);
    
    // Automatically put the new row in edit mode
    const newEditingRows = new Set(editingRows);
    newEditingRows.add(nextId);
    setEditingRows(newEditingRows);
    
    // Automatically expand the new row
    const newExpandedRows = new Set(expandedRows);
    newExpandedRows.add(nextId);
    setExpandedRows(newExpandedRows);
  };

  const openDeleteDialog = (id) => {
    setRowToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Remove the row
    setData(data.filter(row => row.id !== rowToDelete));
    
    // Remove from expanded and editing sets if present
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowToDelete)) {
      newExpandedRows.delete(rowToDelete);
    }
    setExpandedRows(newExpandedRows);
    
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(rowToDelete)) {
      newEditingRows.delete(rowToDelete);
    }
    setEditingRows(newEditingRows);
    
    // Close the dialog
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  // Default expanded row content if none is provided
  const defaultExpandedContent = (rowData) => (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="font-medium mb-1">Description</p>
          {editingRows.has(rowData.id) ? (
            <Textarea 
              value={rowData.details?.description || ''}
              onChange={(e) => handleCellChange(rowData.id, 'details.description', e.target.value)}
              className="w-full"
              placeholder="Enter description"
            />
          ) : rowData.details?.description || <span className="text-muted-foreground italic">No description available</span>}
        </div>
      </div>
    </div>
  );

  const renderExpandedRow = (rowData) => (
    <TableRow className="bg-muted/50">
      <TableCell colSpan={enhancedColumns.length}>
        {expandedRowContent ? expandedRowContent(rowData, editingRows.has(rowData.id), handleCellChange) : defaultExpandedContent(rowData)}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{tableTitle}</h2>
        <Button onClick={addNewRow} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Row
        </Button>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">No data available. Click "Add New Row" to get started.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <TableRow>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {expandedRows.has(row.original.id) && renderExpandedRow(row.original)}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Confirmation Dialog for Row Deletion */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this row? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CrudExpandableTable;