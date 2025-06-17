import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import axios from "axios";
import {
  GET_ALL_INBOX,
  GET_INBOX_HISTORY,
  GET_PROJECT_DATA_URL,
  POST_INBOX_ACTION,
} from "@/URL";
import { useAuth } from "@/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProjectItem = ({ project, onAccept, onRevert }) => {
  const [showRevertModal, setShowRevertModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [revertMessage, setRevertMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data } = useAuth();
  console.log(data);
  // Simulate fetching conversation history when history modal opens
  useEffect(() => {
    if (showHistoryModal) {
      setLoading(true);
      // Simulated API call - replace with actual fetch in production
      // setTimeout(() => {
      //   setConversations([
      //     {
      //       id: 1,
      //       person: "Sarah Johnson",
      //       message:
      //         "I've assigned you to the project. Please review the requirements.",
      //       timestamp: "2025-03-15T10:30:00",
      //     },
      //     {
      //       id: 2,
      //       person: "John Smith",
      //       message: "I need more information about the project scope.",
      //       timestamp: "2025-03-16T14:22:00",
      //     },
      //     {
      //       id: 3,
      //       person: "Sarah Johnson",
      //       message:
      //         "I've attached the detailed requirements document. Let me know if you have questions.",
      //       timestamp: "2025-03-17T09:15:00",
      //     },
      //   ]);
      //   setLoading(false);
      // }, 500);
    }
  }, [showHistoryModal]);

  useEffect(() => {
    setLoading(false);
  }, [conversations]);

  const handleRevert = (e) => {
    e.stopPropagation();
    setShowRevertModal(true);
  };
  const navigate = useNavigate();

  const getInboxHistory = async (id) => {
    try {
      const response = await axios.get(`${GET_INBOX_HISTORY}/${id}`);

      const data = response.data.data;
      console.log(data);
      setConversations([...data]);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  const handleSubmitRevert = async (id, message) => {
    try {
      // Simulated API call - replace with actual API call
      const response = await axios.post(POST_INBOX_ACTION, {
        action: "reverted",
        message: message,
        project_id: id,
      });
      const data = response.data;

      console.log(response);
      // setShowRevertModal

      // For now, we'll just simulate success
      // onRevert(project.id, revertMessage);
      if (response.status === 201) {
        setShowRevertModal(false);
      }
      setRevertMessage("");
      // setRevertMessage("");
    } catch (error) {
      console.error("Failed to send revert message:", error);
      // Handle error appropriately
    }
  };

  const handleAccept = async (id) => {
    try {
      // Simulated API call - replace with actual API call
      const response = await axios.post(POST_INBOX_ACTION, {
        action: "accepted",
        message: "",
        project_id: id,
      });
      const data = response.json();

      console.log(data);

      // For now, we'll just simulate success
      // onRevert(project.id, revertMessage);
      // setShowRevertModal(false);
      // setRevertMessage("");
    } catch (error) {
      console.error("Failed to send revert message:", error);
      // Handle error appropriately
    }
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowRevertModal(false);
    setRevertMessage("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const handleInboxClick = async (projectId) => {
    console.log(projectId);
    const response = await axios.get(`${GET_PROJECT_DATA_URL}/${projectId}`);
    // console.log(response);
    const projectData = response.data;
    navigate(`/projects/createproject/${projectData.project.project_id}`, {
      state: {
        rowData: JSON.stringify(projectData),
      },
    });
  };
  return (
    <div
      className="p-4 mb-4 border rounded-lg bg-white shadow-sm"
      onClick={() => handleInboxClick(project.project_id)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {project.project_name}
          </h3>
          <p className="text-sm text-gray-500">
            Initiated by: {project.initiator_name}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              getInboxHistory(project.project_id);
              return setShowHistoryModal(true);
            }}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            title="View History"
          >
            <Clock size={20} />
          </button>
          {console.log(data.user_info.userIndex === project.user_id)}
          {data.user_info.userIndex != project.user_id && (
            // <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                return handleAccept(project.project_id);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Accept
            </button>
            // </div>
          )}
          <button
            onClick={handleRevert}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Revert
          </button>
        </div>
      </div>

      {/* Revert Modal */}
      {showRevertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              Revert Project: {project.project_name}
            </h3>
            <textarea
              className="w-full border rounded-md p-2 mb-4 h-32"
              placeholder="Enter reason for reverting this project..."
              value={revertMessage}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setRevertMessage(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  return handleSubmitRevert(project.project_id, revertMessage);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={!revertMessage.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-full max-h-3/4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Project History: {project.project_name}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHistoryModal(false);
                  return setConversations([]);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto mb-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading conversation history...</p>
                </div>
              ) : conversations.length > 0 ? (
                <div className="space-y-4 p-2">
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 mr-3">
                        {conversation.message}
                      </div>
                      <div className="flex-grow">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">
                              {conversation.person}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(conversation.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-800">
                            {conversation.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">
                    No conversation history available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InboxPage = () => {
  const [projects, setProjects] = useState([
    // {
    //   id: 1,
    //   name: "Website Redesign",
    //   assignedBy: "Sarah Johnson",
    //   status: "pending",
    // },
    // {
    //   id: 2,
    //   name: "Mobile App Development",
    //   assignedBy: "Michael Chen",
    //   status: "pending",
    // },
    // {
    //   id: 3,
    //   name: "Database Migration",
    //   assignedBy: "Emily Rodriguez",
    //   status: "pending",
    // },
  ]);

  useEffect(() => {
    getAllInboxes();
  }, []);

  const getAllInboxes = async () => {
    try {
      const response = await axios.get(GET_ALL_INBOX);
      // console.log(response.data);
      const inboxData = response.data.data;
      setProjects(inboxData);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleAccept = (projectId) => {
  //   setProjects(
  //     projects.map((project) =>
  //       project.id === projectId ? { ...project, status: "accepted" } : project
  //     )
  //   );
  // };

  // const handleRevert = (projectId, message) => {
  //   setProjects(
  //     projects.map((project) =>
  //       project.id === projectId
  //         ? { ...project, status: "reverted", revertMessage: message }
  //         : project
  //     )
  //   );
  // };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Project Assignments
      </h2>
      <div>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            // onAccept={handleAccept}
            // onRevert={handleRevert}
          />
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
