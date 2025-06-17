import React, { useEffect, useState } from 'react'
import { ALL_TASKS_URL } from '@/URL';
import { useMemo } from 'react';
import { DataTable } from "@/Components/DataTable";
import axios from 'axios';

const TaskList = () => {
    const [taskData,setTaskData] = useState([])
    useEffect(()=>{
      const getAllTasks = async ()=>{
        const response = await axios.get(ALL_TASKS_URL);
        setTaskData(response.data);
        console.log(taskData);
      }
      getAllTasks()

    },[])
    // const data = []//useMemo(() => mData, []);

  /**@type import('@tanstack/react-table').ColumnDef@<any>*/
  const taskColumns = [
    {
      header: "Project Code",
      accessorKey: "project_code",
    },
    // {
    //   header: "Task Name",
    //   accessorKey: "task_name",
    // },
    {
      header: "Phase",
      accessorKey: "task_phase",
    },

    {
      header: "Milestone",
      accessorKey: "key_milestone",
    },
    {
      header: "Plan Date",
      accessorKey: "plan_date",
    },
    {
      header: "Actual Date",
      accessorKey: "actual_date",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Responsibility",
      accessorKey: "responsibility",
    },
  ];
  return (
    <div className=" p-5">
      <DataTable tData={taskData} tColumns={taskColumns} />
    </div>
  )
}

export default TaskList