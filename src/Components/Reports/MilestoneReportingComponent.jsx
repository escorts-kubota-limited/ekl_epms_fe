import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";

const sampleData = [
  {
    id: 1,
    project_name: "E-commerce Platform",
    status: "active",
    color: "#3B82F6",
    milestones: [
      {
        id: 1,
        project_name: "Requirements Analysis",
        date: "2025-01-15",
        status: "completed",
      },
      {
        id: 2,
        project_name: "UI/UX Design",
        date: "2025-03-20",
        status: "in-progress",
      },
      {
        id: 3,
        project_name: "Backend Development",
        date: "2025-05-15",
        status: "upcoming",
      },
      { id: 4, project_name: "Testing Phase", date: "2025-07-30", status: "upcoming" },
      { id: 5, project_name: "Launch", date: "2025-09-15", status: "upcoming" },
    ],
  },
  {
    id: 2,
    project_name: "Mobile App Development",
    status: "active",
    color: "#10B981",
    milestones: [
      {
        id: 6,
        project_name: "Market Research",
        date: "2024-12-10",
        status: "completed",
      },
      { id: 7, project_name: "Prototype", date: "2025-02-28", status: "in-progress" },
      { id: 8, project_name: "Beta Testing", date: "2025-06-10", status: "upcoming" },
      {
        id: 9,
        project_name: "App Store Release",
        date: "2025-08-20",
        status: "upcoming",
      },
    ],
  },
  {
    id: 3,
    project_name: "Data Analytics Platform",
    status: "planning",
    color: "#8B5CF6",
    milestones: [
      {
        id: 10,
        project_name: "Architecture Design",
        date: "2025-04-01",
        status: "upcoming",
      },
      { id: 11, project_name: "Data Pipeline", date: "2025-06-15", status: "upcoming" },
      {
        id: 12,
        project_name: "Dashboard Development",
        date: "2025-08-30",
        status: "upcoming",
      },
      {
        id: 13,
        project_name: "Production Deploy",
        date: "2025-11-15",
        status: "upcoming",
      },
    ],
  },
  {
    id: 4,
    project_name: "Cloud Migration",
    status: "active",
    color: "#F59E0B",
    milestones: [
      { id: 14, project_name: "Assessment", date: "2024-11-30", status: "completed" },
      {
        id: 15,
        project_name: "Infrastructure Setup",
        date: "2025-01-30",
        status: "completed",
      },
      {
        id: 16,
        project_name: "Data Migration",
        date: "2025-04-15",
        status: "upcoming",
      },
      { id: 17, project_name: "Go Live", date: "2025-06-30", status: "upcoming" },
    ],
  },
];

const MilestoneReportingComponent = ({ data = [] }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("12"); // months
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [projects] = useState(sampleData);

  // Generate months for the timeline
  const generateTimeline = useMemo(() => {
    const months = [];
    const years = new Map();
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - 6); // Start 6 months ago

    for (let i = 0; i < parseInt(selectedTimeframe) + 12; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const year = date.getFullYear();
      const monthName = date.toLocaleDateString("en-US", { month: "short" });

      months.push({
        key: monthKey,
        year: year,
        month: monthName,
        date: new Date(date),
      });

      if (!years.has(year)) {
        years.set(year, []);
      }
      years.get(year).push(monthKey);
    }

    return { months, years };
  }, [selectedTimeframe]);

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (filterStatus !== "all") {
      filtered = filtered.filter((project) => project.status === filterStatus);
    }

    if (selectedProjects.length > 0) {
      filtered = filtered.filter((project) =>
        selectedProjects.includes(project.id)
      );
    }

    return filtered;
  }, [projects, filterStatus, selectedProjects]);

  // Get milestone position for a given date
  const getMilestonePosition = (date, monthKey) => {
    const milestoneDate = new Date(date);
    const [year, month] = monthKey.split("-");
    const monthStart = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthEnd = new Date(parseInt(year), parseInt(month), 0);

    if (milestoneDate >= monthStart && milestoneDate <= monthEnd) {
      const dayOfMonth = milestoneDate.getDate();
      const daysInMonth = monthEnd.getDate();
      return (dayOfMonth / daysInMonth) * 100;
    }
    return null;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "in-progress":
        return "#F59E0B";
      case "upcoming":
        return "#6B7280";
      case "delayed":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className="w-full max-w-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header Controls */}
      <div className="p-2 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {/* <h2 className="text-2xl font-semibold text-gray-900">Project Milestones</h2> */}
            <p className="text-gray-600 mt-1 ml-4">
              Track project progress and upcoming deadlines
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border min-w-32 border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
              <option value="18">18 Months</option>
              <option value="24">24 Months</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border min-w-32 border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Year Headers */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <div className="w-64 px-4 py-3 font-medium text-gray-900 border-r border-gray-200 flex-shrink-0">
              Projects
            </div>
            {Array.from(generateTimeline.years.entries()).map(
              ([year, monthKeys]) => (
                <div
                  key={year}
                  className="border-r border-gray-200 bg-gray-100 px-2 py-3 text-center font-semibold text-gray-700"
                  style={{ width: `${monthKeys.length * 120}px` }}
                >
                  {year}
                </div>
              )
            )}
          </div>

          {/* Month Headers */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <div className="w-64 px-4 py-2 border-r border-gray-200 flex-shrink-0"></div>
            {generateTimeline.months.map((month) => (
              <div
                key={month.key}
                className="w-30 px-2 py-2 text-center text-sm font-medium text-gray-600 border-r border-gray-200"
                style={{ width: "120px" }}
              >
                {month.month}
              </div>
            ))}
          </div>

          {/* Project Rows */}
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* Project Info */}
              <div className="w-64 px-4 py-4 border-r border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {project.project_name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.status === "active"
                            ? "bg-green-100 text-green-800"
                            : project.status === "planning"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                      {/* <span className="text-xs text-gray-500">
                        {project.milestones.length} milestones
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Cells */}
              {generateTimeline.months.map((month) => (
                <div
                  key={month.key}
                  className="relative border-r border-gray-200"
                  style={{ width: "120px", minHeight: "80px" }}
                >
                  {/* Current month indicator */}
                  {month.key ===
                    `${new Date().getFullYear()}-${String(
                      new Date().getMonth() + 1
                    ).padStart(2, "0")}` && (
                    <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
                  )}

                  {/* Milestones */}
                  {project.milestones.map((milestone) => {
                    const position = getMilestonePosition(milestone.date, month.key);
                    if (position !== null) {
                      return (
                        <div 
                          key={milestone.id}
                          className="absolute top-2 group cursor-pointer"
                          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: getStatusColor(milestone.status) }}
                          ></div>
                          
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                              <div className="font-medium">{milestone.name}</div>
                              <div className="text-gray-300">{new Date(milestone.date).toLocaleDateString()}</div>
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-600">Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Delayed</span>
          </div>
          <div className="ml-auto text-gray-500">
            Scroll horizontally to view more months →
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneReportingComponent;
