import { useEffect, useState } from "react";
import ProjectExport from "./ProjectExport";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/useApi";

export default function ProjectExportPage() {
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projectCode, setProjectCode] = useState("");

  const { data, loading, error, callApi } = useApi(import.meta.env.VITE_BASE_URL);

  const fetchProjectData = async () => {
    if (!projectCode.trim()) return alert("Please enter Project Code");

    try {
      const resp = await callApi("/v2/project/list", {
        method: "POST",
        body: { project_code: projectCode },
      });
      
      console.log("Project Data Response: ", resp);

      if (!resp?.success) return alert("Project not found!");

      setProjectData(resp.body.projects[projectCode]);
      setTasks(resp.body.tasks[projectCode] || []);

    } catch (err) {
        console.error("Error fetching project data:", err);
      alert("Something went wrong fetching project");
    }
  };

  console.log("Project Data: ", projectData);
  console.log("Project Task: ", tasks);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Major Project Export</h1>

      <Input
        placeholder="Enter Project Code"
        value={projectCode}
        onChange={(e) => setProjectCode(e.target.value)}
      />

      <Button disabled={loading} onClick={fetchProjectData}>
        {loading ? "Loading..." : "Load Project Data"}
      </Button>

      {projectData && (
        <ProjectExport projectData={projectData} tasks={tasks} />
      )}
    </div>
  );
}
