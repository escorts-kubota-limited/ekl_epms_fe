import { useFileParser } from "@/hooks/useFileParser";
import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import { LoaderCSV } from "../ui/LoaderCSV";

const ImportsCSV = ({
  columnDefs,
  sampleRows,
  handleAPICall,
  setCsvRespObj,
  apiLoading
}) => {
  console.log(columnDefs);
  const { data, errors, progress, loading, parseFile, parseError } =
    useFileParser(columnDefs);

  useEffect(() => {
    setCsvRespObj({
      data: data,
      errors: errors,
      progress: progress,
      loading: loading,
    });
  }, [data, errors, progress, loading]);

  const handleDownloadErrors = () => {
    console.log(errors);
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Row Number", "Error Message"],
      //   ...errors.map((e) => [e.row, e.errors.join('; ')])
      ...errors.map((msg) => [msg]),
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Errors");
    XLSX.writeFile(workbook, "import-errors.xlsx");
  };

  const handleDownloadSample = () => {
    const sampleHeaders = columnDefs.map((col) =>
      col.required ? `${col.label}*` : col.label
    );

    const sampleData = [
      sampleHeaders,
      //   columnDefs.map((col) => col.required ? 'Sample' : '')
      Object.values(sampleRows),
    ];

    console.log(sampleData);

    const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample");
    XLSX.writeFile(workbook, "sample-import-template.xlsx");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log("e : ", e);
    if (file) parseFile(file, file.name);
  };

  return (
    <div className="space-y-6 text-sm text-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Upload CSV/XLSX File
        </h2>
        <button
          onClick={handleDownloadSample}
          className="text-blue-600 hover:text-blue-800 underline transition"
        >
          Download Sample
        </button>
      </div>

      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={handleFileChange}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100 border border-gray-300 rounded-md"
      />

      {loading && (
        <div className="w-full">
          <LoaderCSV progress={progress} />
        </div>
      )}

      {parseError && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-200">
          {parseError}
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <p className="font-semibold text-red-600 mb-2">
            Validation Errors Found:
          </p>
          <button
            onClick={handleDownloadErrors}
            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
          >
            Download Errors
          </button>
        </div>
      )}

      {data.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-green-700 font-semibold mb-1">
              Data Preview (first 5 rows):
            </h3>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-300 max-h-64 overflow-auto text-xs font-mono">
              <pre>{JSON.stringify(data.slice(0, 5), null, 2)}</pre>
            </div>
          </div>

          <button
            onClick={handleAPICall}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
            disabled={apiLoading}
          >
            {apiLoading ? "Loading... " : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportsCSV;
