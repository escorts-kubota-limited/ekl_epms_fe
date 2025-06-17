import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { GET_PROJECT_DATA_URL, POST_TIMELOG } from "./URL";
import { useAuth } from "./AuthProvider";

const AddTimeLog = ({ events, setEvents, userProjectList, userTimeLog,setFlag }) => {
  const [projectTaskList, setProjectTaskList] = useState([]);

  const [formData, setFormData] = useState({
    // id: "",
    title: "",
    log_date: "",
    project_name: "",
    project_id: "",
    task_name: "",
    start: new Date(),
    end: new Date(),
    notes: "",
    task_id: "",
  });
  let today = new Date();
  today = today.toISOString().split("T")[0];

  const [selectedProject, setSelectedProject] = useState({
    project_id: "",
    project_name: "",
  });

  const userData = useAuth();

  useEffect(() => {
    const getTaskOfProject = async () => {
      try {
        if (selectedProject) {
          const response = await axios.get(
            `${GET_PROJECT_DATA_URL}/${selectedProject.project_id}`
          );
          //   console.log(response.data);
          setProjectTaskList(() => [...response.data.tasks]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getTaskOfProject();
  }, [selectedProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const combineDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const [hours, minutes] = timeStr.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };
    // console.log(formData["log_date"]);
    const newTask = {
      project_name: formData["project_name"],
      project_id: formData["project_id"],
      task_name: formData["task_name"],
      notes: formData["notes"],
      task_id: formData["task_id"],
      start: combineDateTime(formData["log_date"], formData["start"]),
      end: combineDateTime(formData["log_date"], formData["end"]),
      log_date: formData["log_date"],
      title: formData["task_name"],
      user_id: userData.data.user_info.userIndex,
    };
    // console.log(newEvent)

    //post time log
    const postUserTimeLog = async () => {
      try {
        const sendTimeLog = await axios.post(POST_TIMELOG, {
          newTask,
        });
        if (sendTimeLog.status === 200) {
          alert("Time log has been updated");
          setFlag(!flag);
        } else {
          alert("Error in updating time log");
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log(newTask);
    postUserTimeLog();

    // setEvents(() => [...events, newEvent]);
  };

  // const getProjectData = async ({project_id}) => {
  //   try {
  //     const projectDataResponse = await axios.get(`${GET_PROJECT_DATA_URL}/${project_id}`);
  //     console.log(projectDataResponse.data)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log("projectTaskList", projectTaskList);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Task Time Log</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.log_date}
              onChange={(e) => handleInputChange("log_date", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 justify-between">
            <div className="space-y-2">
              <Label htmlFor="project_name">Project Name</Label>
              {/* <Input
                id="project_name"
                type="text"
                placeholder="Enter project name"
                value={formData.project_name}
                onChange={(e) =>
                  handleInputChange("project_name", e.target.value)
                }
                required
              /> */}
              <Select
                value={formData.project_id}
                onValueChange={(value) => {
                  let selectedProj = userProjectList.find(
                    (project) => project.project_id === value
                  );
                  if (selectedProj) {
                    setSelectedProject(selectedProj);
                    // console.log("on change ", selectedProject);
                    // console.log("userProjectList", userProjectList);
                    // const project_name = selectedProject.project_name;
                    handleInputChange(
                      "project_name",
                      selectedProj.project_name
                    );
                    handleInputChange("project_id", value);
                    // console.log(formData);
                    
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {userProjectList.map((project) => (
                      <SelectItem
                        key={project.project_id}
                        value={project.project_id}
                      >
                        {project.project_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task_name">Task</Label>
              <Select
                value={formData.task_id}
                onValueChange={(value) => {
                  console.log(value);
                  let selectedTask = projectTaskList.find(
                    (task) => task.taskid === value
                  );
                    console.log(selectedTask);
                  if (selectedTask) {
                    handleInputChange("task_name", selectedTask.task_name);
                    handleInputChange("task_id", value);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="max-h-40">
                    {projectTaskList.map((task) => (
                      <SelectItem key={task.taskid} value={task.taskid}>
                        {task.task_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Time</Label>
              <Input
                id="start"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange("start", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end">End Time</Label>
              <Input
                id="end"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("end", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              // className="h-20 w-80"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Time Log
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTimeLog;
