import { useFileParser } from "@/hooks/useFileParser";
import React, { useEffect, useState } from "react";
import { ImportButton } from "../../Components/ui/ImportButton";
import { ModalComponent } from "@/Components/ui/ModalComponent";
import * as XLSX from "xlsx";
import ImportsCSV from "@/Components/Functions/ImportsCSV";
import { useApi } from "@/hooks/useApi";
import { showSuccess, showError } from '@/utils/toast';

const columnDefs = [
  { label: "Project Code", name: "project_code", required: true },
  { label: "Project Name", name: "project_name", required: true },
  { label: "Project Type", name: "project_type", required: true },
  { label: "Project Subtype", name: "project_subtype", required: true },
  { label: "Market", name: "market" },
  { label: "Project Platform", name: "project_platform" },
  { label: "Platform Segment", name: "platform_segment" },
  {
    label: "Start Date",
    name: "start_date",
    required: true,
    regex: "^\\d{4}-\\d{2}-\\d{2}$",
    DataType : "date"
  },
  {
    label: "Projected Date",
    name: "projected_date",
    required: true,
    regex: "^\\d{4}-\\d{2}-\\d{2}$",
    DataType : "date"
  },
  { label: "Project Template", name: "project_template", required: true },
  { label: "Priority", name: "priority", required: true },
  { label: "Design Responsibility", name: "design_responsibility" },
  { label: "Current Phase", name: "current_phase" },
  {
    label: "PMO Mail",
    name: "pmo_mail",
    regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
  },
  { label: "Project Status", name: "project_status" },
  { label: "Approval Count", name: "approval_count", regex: "^\\d+$" },
  { label: "Project Department", name: "project_department" },
  { label: "Project Description", name: "project_description", required: true },
  {
    label: "Project Budget",
    name: "project_budget",
    regex: "^\\d+(\\.\\d{1,2})?$",
  },
  { label: "Development Code", name: "development_code" },
  { label: "S.N.", name: "s_no", required: true, regex: "^\\d+$" },
  { label: "Stage", name: "stage", required: true, forwardFill: true },
  { label: "Phase", name: "phase", required: true, forwardFill: true },
  { label: "Key Milestone", name: "key_milestone", required: true },
  { label: "Plan Date", name: "plan_date", regex: "^\\d{4}-\\d{2}-\\d{2}$" , DataType : "date" },
  {
    label: "Revised Date",
    name: "revised_date",
    regex: "^\\d{4}-\\d{2}-\\d{2}$",
    DataType : "date"
  },
  {
    label: "Actual Date",
    name: "actual_date",
    regex: "^\\d{4}-\\d{2}-\\d{2}$",
    DataType : "date"
  },
  { label: "Duration", name: "ref_duration", regex: "^\\d+(\\.\\d{1,2})?$" },
  { label: "Status", name: "s_status" , required: true},
  { label: "Remarks", name: "remarks"  },
  { label: "Responsibility", name: "responsibility" , required: true },
];

const sampleData = {
  "Project Code": "P001",
  "Project Name" : "INF-DISCUSION",
  "Project Type": "Infrastructure",
  "Project Subtype": "SubtypeA",
  Market: "North",
  "Project Platform": "Web",
  "Platform Segment": "Enterprise",
  "Start Date": "2025-06-01",
  "Projected Date": "2025-12-31",
  "Project Template": "Standard",
  Priority: "High",
  "Design Responsibility": "TeamA",
  "Current Phase": "Initiation",
  "PMO Mail": "example@domain.com",
  "Project Status": "approval_pending",
  "Approval Count": "1",
  "Project Department": "Engineering",
  "Project Description": "This is a sample project description for Alpha.",
  "Project Budget": "1000000",
  "Development Code": "DEV-ALPHA",
  "S.N. / task_number": "1",
  Stage: "Planning",
  Phase: "Phase1",
  "Key Milestone": "Requirement Gathering",
  "Plan Date": "2025-06-10",
  "Revised Date": "",
  "Actual Date": "2025-06-12",
  Duration: "5",
  Status: "pending",
  Remarks: "",
  Responsibility:""
};

const ImportProjects = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data : dataApi, error, loading : apiLoading, callApi } = useApi(
    import.meta.env.VITE_BASE_URL
  );
  const [csvRespObj, setCsvRespObj] = useState(null);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;


  const handleCSVResParams = () => {};
  const handleAPICall = () => {
    console.log("csvRespObj : ",csvRespObj);
    if (!csvRespObj.data) {
      console.log("Data is Invalid!!!");
      return;
    }

    callApi("/imports/pjt-n-tsk", {
      method: "POST",
      body: { data: csvRespObj.data },
    });
  };

  useEffect(() => {
    console.log("dataAPi",dataApi)
    if (dataApi) {
        if( dataApi.success){
          // success pop up 
          showSuccess("File Imported Successfully!!!");
        }else{
          //  errror pop up
          showError(dataApi.message);
        }
    }
    if (error) {
      console.log("Error at calling the api", error);
    }
  }, [dataApi, error]);

  return (
    <div className="p-2">
      <ImportButton onClick={() => setModalOpen(true)} />

      <ModalComponent isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ImportsCSV
          columnDefs={columnDefs}
          sampleRows={sampleData}
          handleAPICall={handleAPICall}
          setCsvRespObj={setCsvRespObj}
          apiLoading={apiLoading}
        />
      </ModalComponent>
    </div>
  );
};

export default ImportProjects;
