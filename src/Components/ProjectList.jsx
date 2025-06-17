import { DataTable } from "./DataTable";
import { useEffect, useMemo, useState } from "react";
import { PROJECT_LIST_URL } from "@/URL";
import axios from "axios";
const ProjectList = () => {
  //const projectData = useMemo(() => mProjData, []);
  const [projectListData, setProjectListData] = useState([]);
  useEffect(() => {
    const fetchProjectListData = async () => {
      try {
        const response = await axios.get(PROJECT_LIST_URL);
        const projectList = response.data;
        setProjectListData(projectList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjectListData();
  }, []);

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
    {
      header: "Project Code",
      accessorKey: "project_code",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    {
      header: "Project Name",
      accessorKey: "project_name",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    {
      header: "Current Phase",
      accessorKey: "current_phase",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    {
      header: "Project Status",
      accessorKey: "project_status",
      meta: {
        type: "select",
        options: [
          { value: "active", label: "Active" },
          { value: "hold", label: "Hold" },
          { value: "drop", label: "Drop" },
          { value: "implemented", label: "Implemented" },
        ],
      },
      //cell: NavCell,
    },
    {
      header: "Current Stage",
      accessorKey: "current",
      meta: {
        type: "text",
      },
      //cell: NavCell,
    },
    // {
    //   id: "edit",
    //   cell: EditCell,
    // },
  ]);
  return (
    <div>
      <DataTable
        tData={projectListData}
        tColumns={projectListColumns}
        rowClick={true}
      />
    </div>
  );
};

export default ProjectList;
