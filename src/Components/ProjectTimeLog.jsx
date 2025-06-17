import { useEffect, useState } from "react";
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
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// function ProjectTimeLog({ rowData }) {
//   // const [projectData, setProjectData] = useState();
//   let today = new Date();
//   today = today.toISOString().split("T")[0];

//   console.log(rowData);
//   return (
//     <div className="">
//       <div className="flex gap-4 justify-between m-2">
//         <div className="font-bold content-center">Date:</div>
//         <input type="date" value={today} className="" />
//       </div>
//       <div className="flex gap-4 justify-between m-2">
//         <div className="font-bold content-center">Project Name:</div>
//         <input value={rowData.project_name} disabled/>
//       </div>
//       <div className="flex gap-4 justify-between m-2">
//         <div className="font-bold content-center">Select Task:</div>
//         <select>
//           <option value="">xyz</option>
//           <option value="">abc</option>
//           <option value="">def</option>
//         </select>
//       </div>
//       <div className="flex gap-4 justify-between m-2">
//         <div className="font-bold content-center"> Log Time:</div>
//         <input placeholder="In Hours" type="number"/>
//       </div>
//       <div className="flex gap-4 justify-between m-2">
//         <div className="font-bold content-center">Notes:</div>
//         <input className="w-64" />
//       </div>
//     </div>
//   );
// }

const ProjectTimeLog = ({ events, setEvents, rowData  }) => {
  console.log(events)
  const [formData, setFormData] = useState({
    id: `${events[events.length-1].id+1}`,
    title: `${rowData.project_name}`,
    date: "",
    projectName: `${rowData.project_name}`,
    taskName: "",
    start: "",
    end: "",
    notes: "",
  });
  let today = new Date();
  today = today.toISOString().split("T")[0];

  const projectTasks = [
    "Documentation",
    "Development",
    "Testing",
    "Code Review",
    "Bug Fixing",
    "Meeting",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const combineDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const [hours, minutes] = timeStr.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };

    const newEvent = {
      id: events[events.length - 1].id + 1,
      title: formData["projectName"],
      start: combineDateTime(formData["date"], formData["start"]),
      end: combineDateTime(formData["date"], formData["end"]),
    };
    // console.log(newEvent)
    setEvents(() => [...events, newEvent]);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Project Time Log</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 justify-between">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                type="text"
                placeholder="Enter project name"
                value={formData.projectName}
                onChange={(e) =>
                
                  handleInputChange("project_name", e.target.value)
                
                 
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taskName">Task</Label>
              <Select
                value={formData.taskName}
                onValueChange={(value) => handleInputChange("taskName", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  {projectTasks.map((task) => (
                    <SelectItem key={task} value={task}>
                      {task}
                    </SelectItem>
                  ))}
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

export default ProjectTimeLog;
