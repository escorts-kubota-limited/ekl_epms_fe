"use client";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import axios from "axios";
import { GET_PROJECT_DATA_URL, GET_DRAFT_DATA } from "@/URL";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  InformationCircleIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import TaskDialogPopup from "./TaskDialogPopup";
import { PlusIcon, PlusSquareIcon } from "lucide-react";

export const BaseCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  const onSelectChange = (e) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select
        onChange={onSelectChange}
        value={initialValue}
        className="rounded-full"
      >
        {columnMeta?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        className="rounded-full"
      />
    );
  }
  return <span>{value}</span>;
};
export const EditCell = ({ row, table }) => {
  const meta = table.options.meta;
  const setEditedRows = (e) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  return meta?.editedRows[row.id] ? (
    <div className="flex flex-col">
      <button onClick={setEditedRows} name="cancel">
        X
      </button>{" "}
      <button onClick={setEditedRows} name="done">
        ✔
      </button>
    </div>
  ) : (
    <button onClick={setEditedRows} name="edit">
      ✐
    </button>
  );
};

export const NavCell = ({ getValue, row }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  //console.log(row.getValue("project_name"));

  return (
    <NavLink
      to={"/projects/individualProject/" + `${row.getValue("project_id")}`}
    >
      <div>{value}</div>
    </NavLink>
  );
};
// export const handleRowCLick = (row) => {
//   // const initialValue = getValue();
//   // const [value, setValue] = useState(initialValue);

//   // useEffect(() => {
//   //   setValue(initialValue);
//   // }, [initialValue]);
//   // return (<></>)
//   console.log(row.original)
//   return (row.original);
// };

export function DataTable({
  tData,
  tColumns,
  rowClick = false,
  pagination = true,
  search = true,
  isDraft = false,
}) {
  const [filtering, setfiltering] = useState("");
  const [data, setData] = useState(() => [...tData]);
  const [editedRows, setEditedRows] = useState({});
  const [originalData, setOriginalData] = useState(() => [...tData]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [draftData, setDraftData] = useState(null);
  const [rowData, setRowData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // const disableRowClick = rowClick
  // || location.pathname
  //   .split("/")
  //   .includes("individualProject");
  useEffect(() => {
    console.log("rowData", rowData, "draftData", draftData);
    if (draftData) {
      navigate(`/projects/draftdata/${rowData.original.draft_id}`, {
        state: {
          rowData: JSON.stringify(rowData),
          draftData: JSON.stringify(draftData),
        },
      });
    }
  }, [draftData, rowData]);

  const table = useReactTable({
    data: tData,
    columns: tColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setfiltering,
    // meta: {
    //   editedRows,
    //   setEditedRows,
    //   revertData: (rowIndex, revert) => {
    //     if (revert) {
    //       setData((old) =>
    //         old.map((row, index) =>
    //           index === rowIndex ? originalData[rowIndex] : row
    //         )
    //       );
    //     } else {
    //       setOriginalData((old) =>
    //         old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
    //       );
    //     }
    //   },
    //   updateData: (rowIndex, columnId, value) => {
    //     setData((old) =>
    //       old.map((row, index) => {
    //         if (index === rowIndex) {
    //           return {
    //             ...old[rowIndex],
    //             [columnId]: value,
    //           };
    //         }
    //         return row;
    //       })
    //     );
    //   },
    // },
  });
  const handleRowCLick = (row) => {
    //console.log(disableRowClick);
    setRowData(row);
    if (rowClick) {
      if (isDraft) {
        const getDraftData = async () => {
          try {
            const response = await axios.get(
              `${GET_DRAFT_DATA}/${row.original.draft_id}`
            );
            // console.log(response.data);
            setDraftData(response.data);
          } catch (err) {
            console.error(err);
          }
        };
        getDraftData();
      }
      // console.log(draftData);

      // isDraft
      //   ? navigate(`/projects/draftdata/` + `${row.original.draft_id}`, {
      //       state: { rowData: row.original, data: draftData  },
      //     })
      //   :
      else {
        navigate(
          `/projects/individualproject/` + `${row.original.project_id}`,
          {
            state: { rowData: row.original },
          }
        );
      }

      // const fetchProjectDetails = async () => {
      //   const response = await axios.post(
      //     `${GET_PROJECT_DATA_URL}/${row.original.project_id}`
      //   );
      //  console.log("##" + response.data);
      // };
      // fetchProjectDetails();
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        {search ? (
          <div>
            <Input
              type="text"
              value={filtering}
              onChange={(e) => setfiltering(e.target.value)}
              id="dt"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => handleRowCLick(row)}
                    >
                      {row.getVisibleCells().map(
                        (cell) => (
                          // cell.column.columnDef.meta.type === "button" ? (
                          // <TableCell
                          //   key={cell.id}
                          //   // onClick={(e) => {
                          //   //   e.stopPropagation();
                          //   // }}
                          // >
                          //   <Dialog>
                          //     <DialogTrigger asChild>
                          //       <div className="">
                          //         <PlusSquareIcon
                          //           className="h-5 w-5 "
                          //           // onClick={onInfoClick}
                          //         />
                          //       </div>
                          //     </DialogTrigger>
                          //     <DialogContent className="max-w-2xl bg-white">
                          //       <DialogHeader className="">
                          //         Time Log Tracker
                          //       </DialogHeader>
                          //       <TaskDialogPopup
                          //       // rowData={rowData}
                          //       // taskHistory={rowTaskHistory}
                          //       />
                          //     </DialogContent>
                          //   </Dialog>
                          // </TableCell>
                          // ) : (
                          <TableCell key={cell.id}>
                            {/* {console.log(cell.column.columnDef)} */}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                        // )
                      )}
                    </TableRow>
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {pagination ? (
        <div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
