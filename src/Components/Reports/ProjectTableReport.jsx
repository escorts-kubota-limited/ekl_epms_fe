import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, PlayCircle, PauseCircle, ChevronLeft, ChevronRight, Target, Flag } from 'lucide-react';

// Sample data - replace with your API response
const sampleTableData = [
  {
    sno: 1,
    projectNo: "PRJ-2024-001",
    currentMilestone: "Requirements Analysis",
    targetDate: "2024-06-15",
    daysDelayed: 0,
    currentStatus: "On Track"
  },
  {
    sno: 2,
    projectNo: "PRJ-2024-002",
    currentMilestone: "Development Phase 2",
    targetDate: "2024-06-10",
    daysDelayed: 5,
    currentStatus: "Delayed"
  },
  {
    sno: 3,
    projectNo: "PRJ-2024-003",
    currentMilestone: "Testing & QA",
    targetDate: "2024-06-20",
    daysDelayed: 0,
    currentStatus: "In Progress"
  },
  {
    sno: 4,
    projectNo: "PRJ-2024-004",
    currentMilestone: "Deployment",
    targetDate: "2024-06-08",
    daysDelayed: 7,
    currentStatus: "Critical"
  },
  {
    sno: 5,
    projectNo: "PRJ-2024-005",
    currentMilestone: "User Acceptance Testing",
    targetDate: "2024-06-25",
    daysDelayed: 0,
    currentStatus: "Completed"
  }
];

// const sampleProgressData = [
//   {
//     id: 1,
//     projectName: "E-Commerce Platform",
//     projectNo: "PRJ-2024-001",
//     progress: 65,
//     status: "On Track",
//     startDate: "2024-01-15",
//     endDate: "2024-08-15",
//     team: "Frontend Team",
//     milestones: [
//       { name: "Planning", completed: true },
//       { name: "Design", completed: true },
//       { name: "Development", completed: false, current: true },
//       { name: "Testing", completed: false },
//       { name: "Deployment", completed: false }
//     ]
//   },
//   {
//     id: 2,
//     projectName: "Mobile App Development",
//     projectNo: "PRJ-2024-002",
//     progress: 40,
//     status: "Delayed",
//     startDate: "2024-02-01",
//     endDate: "2024-07-30",
//     team: "Mobile Team",
//     milestones: [
//       { name: "Requirements", completed: true },
//       { name: "UI/UX Design", completed: true },
//       { name: "Backend API", completed: false, current: true },
//       { name: "Frontend", completed: false },
//       { name: "Testing", completed: false }
//     ]
//   },
//   {
//     id: 3,
//     projectName: "Data Analytics Dashboard",
//     projectNo: "PRJ-2024-003",
//     progress: 85,
//     status: "In Progress",
//     startDate: "2024-03-01",
//     endDate: "2024-06-30",
//     team: "Data Team",
//     milestones: [
//       { name: "Data Collection", completed: true },
//       { name: "Analysis", completed: true },
//       { name: "Dashboard Dev", completed: true },
//       { name: "Integration", completed: false, current: true },
//       { name: "Go Live", completed: false }
//     ]
//   }
// ];

// Tabular Reporting Component
const ProjectTableReport = ({ data=[], title = "Project Status Report" }) => {
  console.log(data)
  const getStatusColor = (status, daysDelayed) => {
    if (status === "Completed") return "text-green-700 bg-green-100";
    if (status === "Approval Pending" || daysDelayed > 5) return "text-red-700 bg-red-100";
    if (status === "Pending" || daysDelayed > 0) return "text-orange-700 bg-orange-100";
    return "text-blue-700 bg-blue-100";
  };

  const getStatusIcon = (status, daysDelayed) => {
    if (status === "Completed") return <CheckCircle className="w-4 h-4" />;
    if (status === "Approval Pending" || daysDelayed > 5) return <AlertTriangle className="w-4 h-4" />;
    if (status === "Delayed") return <Clock className="w-4 h-4" />;
    return <PlayCircle className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.NO.</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project No.</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Milestone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Delayed</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index+1}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {row.project_code}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.current_phase}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {row.start_date}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`font-semibold ${row.delayed_by > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {row.delayed_by > 0 ? `+${row.delayed_by}` : row.delayed_by} days
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.currentStatus, row.daysDelayed)}`}>
                    {getStatusIcon(row.project_status, row.daysDelayed)}
                    <span className="ml-2">{row.project_status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Progress Dashboard Component
// const ProjectProgressDashboard = ({ data = sampleProgressData, title = "Project Progress Dashboard" }) => {
//   const getProgressColor = (progress, status) => {
//     if (status === "Delayed") return "bg-orange-500";
//     if (progress >= 90) return "bg-green-500";
//     if (progress >= 70) return "bg-blue-500";
//     if (progress >= 40) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   const getStatusBadgeColor = (status) => {
//     switch (status) {
//       case "On Track": return "bg-green-100 text-green-800";
//       case "Delayed": return "bg-orange-100 text-orange-800";
//       case "In Progress": return "bg-blue-100 text-blue-800";
//       case "Critical": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//       </div>
      
//       <div className="p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data.map((project) => (
//             <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.projectName}</h3>
//                   <p className="text-sm text-gray-500 font-mono">{project.projectNo}</p>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(project.status)}`}>
//                   {project.status}
//                 </span>
//               </div>
              
//               <div className="mb-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-gray-700">Progress</span>
//                   <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                   <div 
//                     className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(project.progress, project.status)}`}
//                     style={{ width: `${project.progress}%` }}
//                   ></div>
//                 </div>
//               </div>
              
//               <div className="space-y-2 mb-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Team:</span>
//                   <span className="font-medium text-gray-900">{project.team}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Start:</span>
//                   <span className="text-gray-900">{project.startDate}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">End:</span>
//                   <span className="text-gray-900">{project.endDate}</span>
//                 </div>
//               </div>
              
//               <div className="border-t pt-4">
//                 <h4 className="text-sm font-medium text-gray-700 mb-3">Milestones</h4>
//                 <div className="space-y-2">
//                   {project.milestones.map((milestone, idx) => (
//                     <div key={idx} className="flex items-center space-x-2">
//                       <div className={`w-3 h-3 rounded-full ${
//                         milestone.completed ? 'bg-green-500' : 
//                         milestone.current ? 'bg-blue-500' : 'bg-gray-300'
//                       }`}></div>
//                       <span className={`text-sm ${
//                         milestone.completed ? 'text-green-700 line-through' :
//                         milestone.current ? 'text-blue-700 font-medium' : 'text-gray-600'
//                       }`}>
//                         {milestone.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// Main Dashboard Component
// const ProjectStatusList = () => {
//   const [activeTab, setActiveTab] = useState('table');

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           {/* <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Reporting Dashboard</h1> */}
          
//           <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
//             {/* <button
//               onClick={() => setActiveTab('table')}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 activeTab === 'table' 
//                   ? 'bg-white text-blue-700 shadow-sm' 
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Table Report
//             </button> */}
//             {/* <button
//               onClick={() => setActiveTab('progress')}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 activeTab === 'progress' 
//                   ? 'bg-white text-blue-700 shadow-sm' 
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               Progress Dashboard
//             </button> */}
//           </div>
//         </div>

//         <div className="space-y-6">
//           {activeTab === 'table' && (
//             <ProjectTableReport 
//               data={sampleTableData}
//               title="Project Status Report"
//             />
//           )}
          
//           {activeTab === 'progress' && (
//             <ProjectProgressDashboard 
//               data={sampleProgressData}
//               title="Project Progress Dashboard"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

export default ProjectTableReport;