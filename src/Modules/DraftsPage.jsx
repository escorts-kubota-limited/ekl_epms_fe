import { GET_DRAFT_LIST } from "@/URL";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { DataTable } from "@/Components/DataTable";

function DraftsPage() {
  const [draftList, setDraftList] = useState([]);

  useEffect(() => {
    getAllDrafts();
  }, []);

  const getAllDrafts = async () => {
    try {
      const response = await axios.get(GET_DRAFT_LIST);
      setDraftList(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
/**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const projectListColumns = useMemo(() => [
    {
      header: "Project Platform",
      accessorKey: "project_platform",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    {
      header: "PMO",
      accessorKey: "pmo",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    // {
    //   header: "Project Code",
    //   accessorKey: "project_code",
    //   meta: {
    //     type: "text",
    //   },
    //   //cell: NavCell,
    // },
    {
      header: "Project Name",
      accessorKey: "project_name",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    // {
    //   header: "Current Phase",
    //   accessorKey: "current_phase",
    //   meta: {
    //     type: "text",
    //   },
    //   //cell: NavCell,
    // },
    // {
    //   header: "Project Status",
    //   accessorKey: "project_status",
    //   meta: {
    //     type: "select",
    //     options: [
    //       { value: "active", label: "Active" },
    //       { value: "hold", label: "Hold" },
    //       { value: "drop", label: "Drop" },
    //       { value: "implemented", label: "Implemented" },
    //     ],
    //   },
      //cell: NavCell,
    // },
    // {
    //   id: "edit",
    //   cell: EditCell,
    // },
  ]);
  return (
    <div className="p-2">

      <DataTable
        tData={draftList}
        tColumns={projectListColumns}
        rowClick={true}
        isDraft={true}
      />
    </div>
  );
}

export default DraftsPage;
