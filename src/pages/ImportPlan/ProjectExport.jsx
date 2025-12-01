import { useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";

function getAllBorders() {
  return {
    top: { style: "thin", color: { rgb: "000000" } },
    bottom: { style: "thin", color: { rgb: "000000" } },
    left: { style: "thin", color: { rgb: "000000" } },
    right: { style: "thin", color: { rgb: "000000" } },
  };
}

export default function ProjectExportHTML({ projectData, tasks }) {
  const tableRef = useRef(null);

  useEffect(() => {
    if (!projectData || !tasks) return;

    const table = tableRef.current;
    if (!table) return;

    // Fill Project Name & Code
    table.querySelector("#projName").innerText = projectData.project_name;
    table.querySelector("#projCode").innerText = projectData.project_code;

    // Add task rows dynamically
    const tbody = table.querySelector("#taskRows");
    tbody.innerHTML = "";

    tasks.forEach((task) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${task.gate || ""}</td>
        <td>${task.sno || ""}</td>
        <td>${task.stage || ""}</td>
        <td>${task.task_phase || ""}</td>
        <td>${task.key_milestone || ""}</td>
        <td>${task.responsibility || ""}</td>
        <td>${task.plan_date || ""}</td>
        <td>${task.rev || ""}</td>
        <td>${task.actual_date || ""}</td>
        <td>${task.status || ""}</td>
        <td>${task.duration || ""}</td>
      `;
      tbody.appendChild(tr);
    });
  }, [projectData, tasks]);

const exportFile = () => {
  const tbl = tableRef.current;
  const ws = XLSX.utils.table_to_sheet(tbl, { display: true });
  const range = XLSX.utils.decode_range(ws["!ref"]);

  // 🎨 Styles
  const titleStyle = {
    font: { bold: true, sz: 18 },
    alignment: { horizontal: "center", vertical: "center" },
  };

  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "E9ECEF" } },
    border: getAllBorders()
  };

  const sectionRowStyle = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: "center" },
    fill: { fgColor: { rgb: "D6D6D6" } },
    border: getAllBorders()
  };

  const normalCellStyle = {
    border: getAllBorders(),
    alignment: { vertical: "center" }
  };

  // Helper: Excel Date Conversion
  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return XLSX.SSF.format("dd-mm-yyyy", date);
  };

  // 🧠 Apply styles
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[cellRef];
      if (!cell) continue;

      // Title Row
      if (R === 0) {
        cell.s = titleStyle;
        continue;
      }

      // Header Row
      if (R === 3) {
        cell.s = headerStyle;
        continue;
      }

      // Section Rows Detection (Stage Header rows missing gate & sno)
      const isSectionRow =
        C === 0 && ws[cellRef].v === "" &&
        ws[XLSX.utils.encode_cell({ r: R, c: 2 })]?.v; // stage exists

      if (isSectionRow) {
        cell.s = sectionRowStyle;
        continue;
      }

      // Normal Task Row - apply borders
      cell.s = normalCellStyle;

      // Date formatting for plan_date & actual_date (Columns 6 & 8)
      if (C === 6 || C === 8) {
        cell.v = formatDate(cell.v);
        cell.z = "dd-mm-yyyy";
      }
    }
  }

  // Auto column widths
  ws["!cols"] = [
    { wpx: 80 }, { wpx: 40 }, { wpx: 140 }, { wpx: 80 },
    { wpx: 240 }, { wpx: 110 }, { wpx: 110 }, { wpx: 80 },
    { wpx: 110 }, { wpx: 80 }, { wpx: 90 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Major Template");
  XLSX.writeFile(wb, `Major_Project_${projectData.project_code}.xlsx`);
};

  return (
    <div className="p-4 space-y-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold">Export Major Project Excel</h2>

      {/* Hidden HTML Template Table */}
      <table ref={tableRef} style={{ display: "none" }}>
        <tbody>
          <tr>
            <th colSpan="11" style={{ fontSize: "18px", fontWeight: "bold" }}>
              Kubota Escorts Limited
            </th>
          </tr>

          <tr>
            <td>Project Name :</td>
            <td id="projName" colSpan="4"></td>
            <td></td>
            <td>Project Code :</td>
            <td id="projCode" colSpan="4"></td>
          </tr>

          <tr><td colSpan="11"></td></tr>

          <tr style={{ background: "#e9ecef", fontWeight: "bold" }}>
            <td>Gate</td>
            <td>S.N.</td>
            <td>Stages</td>
            <td>Phase</td>
            <td>Key Milestone</td>
            <td>Responsibility</td>
            <td>Plan Date</td>
            <td>Rev No - 36</td>
            <td>Actual Date</td>
            <td>Status</td>
            <td>Duration</td>
          </tr>

          {/* Dynamic Rows */}
          <tbody id="taskRows"></tbody>
        </tbody>
      </table>

      <Button onClick={exportFile}>
        Export XLSX
      </Button>
    </div>
  );
}
