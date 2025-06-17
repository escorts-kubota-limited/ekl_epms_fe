import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export function TaskSummary({ tasks, subtasks }) {
  const [expandedSummaryTasks, setExpandedSummaryTasks] = useState({});
  const toggleSummaryTaskExpansion = (taskId) =>
    setExpandedSummaryTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));

  console.log(tasks, subtasks);

  const getSubtaskCount = (taskId) =>
    subtasks.filter((subtask) => subtask.parentTaskId === taskId).length;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Summary</h1>
        <button
          onClick={goToPreviousStep}
          className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
        >
          <ArrowLeftCircle size={18} className="mr-2" /> Back to Edit
        </button>
      </div> */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks to display.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-50 rounded-lg shadow-sm">
              <div
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSummaryTaskExpansion(task.id)}
              >
                <div className="flex items-center">
                  {expandedSummaryTasks[task.id] ? (
                    <ChevronDown size={20} className="mr-2" />
                  ) : (
                    <ChevronRight size={20} className="mr-2" />
                  )}
                  <h2 className="text-lg font-semibold text-gray-700">
                    {task.title || task.task_name}
                  </h2>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === "Low"
                      ? "bg-blue-100 text-blue-800"
                      : task.priority === "Medium"
                      ? "bg-green-100 text-green-800"
                      : task.priority === "High"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {task.priority || task.task_priority}
                </span>
              </div>
              {expandedSummaryTasks[task.id] && (
                <div className="p-4 border-t border-gray-200">
                  <div className="mb-3 text-sm">
                    <strong>Description:</strong>{" "}
                    <div className="whitespace-pre-wrap mt-1 p-2 bg-white border rounded">
                      {task.description || task.task_description || "N/A"}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mb-3 text-sm">
                    <div>
                      <strong>Status:</strong> {task.status}
                    </div>
                    <div>
                      <strong>Start Date:</strong>{" "}
                      {task.startDate || task.plan_date || "N/A"}
                    </div>
                    <div>
                      <strong>Due Date:</strong>{" "}
                      {task.dueDate || task.actual_date || "N/A"}
                    </div>
                    <div>
                      <strong>Assignee:</strong>{" "}
                      {task.user_responsibility_name || "N/A"}
                    </div>
                  </div>
                  <h4 className="text-md font-semibold text-gray-600 mt-4 mb-2">
                    Subtasks ({getSubtaskCount(task.id)}):
                  </h4>
                  {subtasks.filter((st) => st.parentTaskId === task.id).length >
                  0 ? (
                    <ul className="space-y-2 text-sm">
                      {subtasks
                        .filter((st) => st.parentTaskId === task.id)
                        .map((subtask) => (
                          <li
                            key={subtask.id}
                            className="bg-white p-3 rounded border border-gray-200 shadow-sm"
                          >
                            <div className="flex justify-between items-start">
                              <p className="font-semibold">
                                {subtask.title || subtask.task_name}
                              </p>
                              {/* Removed status display for subtask in summary */}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">
                              {subtask.description ||
                                subtask.task_description ||
                                "No description"}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 text-xs mt-2 pt-1 border-t border-gray-100">
                              <span>
                                Start:{" "}
                                {subtask.startDate ||
                                  subtask.start_date ||
                                  "N/A"}
                              </span>
                              <span>
                                Due:{" "}
                                {subtask.dueDate || subtask.due_date || "N/A"}
                              </span>
                              <span>
                                Assignee:{" "}
                                {subtask.user_responsibility_name || "N/A"}
                              </span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No subtasks for this task.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskSummary;
