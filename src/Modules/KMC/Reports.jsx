import PerformanceTable from "@/Components/Reports/PerformanceTable";
import { GET_MANAGER_REPORT, GET_USER_PROJECT_LIST, PROJECT_LIST_URL } from "@/URL";
// import { useState } from "react";
import axios from "axios";
// import React from "react";

// function Reports() {
//   return (
//     <div className="m-4 bg-white ">
//       <PerformanceTable />
//     </div>
//   );
// }

// export default Reports;
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MilestoneReportingComponent from "@/Components/Reports/MilestoneReportingComponent";
import ProjectTableReport from "@/Components/Reports/ProjectTableReport";

const Reports = () => {
  // Example list of button data
  const buttonList = [
    {
      id: 1,
      label: "PMO: Monthly Milestones",
      content: "PMO-wise Monthly Milestones",
    },
    {
      id: 2,
      label: "Project Milestones",
      content: "Milestones",
    },
    {
      id: 3,
      label: "Project Status Report",
      content: "Project Status",
    },
    {
      id: 4,
      label: "Department Headwise Summary",
      content: "Department Headwise Summary",
    },
  ];
  const [reportData, setReportData] = useState([]);
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    const getManagerReport = async () => {
      try {
        const [managerReportData, userProjectList] = await Promise.all([
          axios.get(GET_MANAGER_REPORT),
          axios.get(PROJECT_LIST_URL),
        ]);
        console.log(managerReportData.data);
        const setdata = managerReportData.data;
        const projectListData = userProjectList.data;
        setReportData(setdata);
        setProjectList(projectListData);
        // console.log(reportData)
      } catch (err) {
        console.error(err);
      }
    };
    getManagerReport();
  }, []);

  // console.log(reportData)
  const [activeContent, setActiveContent] = useState(null);
  // console.log(reportData);

  // Handler factory to create individual click handlers
  const handleClick = (id) => {
    return () => {
      setActiveContent(id);
    };
  };

  // Function to render the appropriate component
  const renderComponent = ({ reportData }) => {
    switch (activeContent) {
      case 1:
        return (
          <div className="p-2 mt-2 bg-blue-100 rounded-lg">
            <PerformanceTable reportData={reportData} />
          </div>
        );
      case 2:
        return (
          <div className="p-2 mt-2 bg-blue-100 rounded-lg">
            <h3 className="text-lg font-medium"></h3>
            <MilestoneReportingComponent data={projectList}/>
          </div>
        );
      case 3:
        return (
          <div className="p-2 mt-2 bg-blue-100 rounded-lg">
            <h3 className="text-lg font-medium"></h3>
            <ProjectTableReport data={projectList} />
          </div>
        );
      case 4:
        return (
          <div className="p-2 mt-2 bg-blue-100 rounded-lg">
            <h3 className="text-lg font-medium"></h3>
            <p></p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>ALL REPORTS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          {buttonList.map((button) => (
            <Button
              key={button.id}
              onClick={handleClick(button.id)}
              variant={activeContent === button.id ? "default" : "secondary"}
            >
              {button.label}
            </Button>
          ))}
        </div>
        {renderComponent({ reportData })}
      </CardContent>
    </Card>
  );
};

export default Reports;
