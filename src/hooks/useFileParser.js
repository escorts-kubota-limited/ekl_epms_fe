import { useState } from "react";
import * as XLSX from "xlsx";

const convertExcelDateToISO = (serial) => {
  const excelEpoch = new Date(1900, 0, 1);
  const date = new Date(excelEpoch.getTime() + (serial - 2) * 86400000); // -2 because Excel bug and JS zero index
  return date.toISOString().split("T")[0]; // Get YYYY-MM-DD
};

export const useFileParser = (columnDefs = []) => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [parseError, setParseError] = useState(null);

  const parseFile = (file, fileName) => {
    setLoading(true);
    setProgress(0);
    setErrors([]);
    setData([]);
    setParseError(null);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const binaryData = new Uint8Array(e.target.result);
        const workbook = XLSX.read(binaryData, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (rows.length < 2) {
          setParseError("Empty or invalid file");
          setLoading(false);
          return;
        }

        const headers = rows[0].map((h) => h?.trim());
        const result = [];
        const validationErrors = [];
        const lastSeenValues = {};

        // Validate allowed headers
        const allowedLabels = columnDefs.map((col) => col.label);
        const isAllowedHeader = (header) => {
          return allowedLabels.some((label) => {
            if (label.includes("*")) {
              const base = label.replace("*", "").trim();
              return header.startsWith(base);
            }
            return header === label;
          });
        };

        const unknownHeaders = headers.filter((h) => !isAllowedHeader(h));
        if (unknownHeaders.length > 0) {
          setErrors([`Invalid columns: ${unknownHeaders.join(", ")}`]);
          setLoading(false);
          return;
        }

        const chunkSize = 100;
        let rowIndex = 1;

        const processChunk = () => {
          const endIndex = Math.min(rowIndex + chunkSize, rows.length);

          for (let i = rowIndex; i < endIndex; i++) {
            const row = rows[i];
            const entry = {};
            const rev = {};
            const rowErrors = [];

            headers.forEach((header, index) => {
              const cellValue = row[index] ?? "";
              const trimmedHeader = header.trim();

              const colDef = columnDefs.find((col) => {
                if (col.label.includes("*")) {
                  const baseLabel = col.label.replace("*", "").trim();
                  return trimmedHeader.startsWith(baseLabel);
                }
                return trimmedHeader === col.label;
              });

              if (colDef?.name === "rev") {
                rev[trimmedHeader] = cellValue;
              } else if (colDef) {
                const key = colDef.name;

                // Forward-fill
                if (colDef.forwardFill) {
                  if (cellValue !== "") {
                    entry[key] = cellValue;
                    lastSeenValues[key] = cellValue;
                  } else {
                    entry[key] = lastSeenValues[key] ?? "";
                  }
                } else {
                  entry[key] = cellValue;
                }

                // Required
                if (colDef.required && entry[key] === "") {
                  rowErrors.push(
                    `Row ${i + 1}: "${trimmedHeader}" is required`
                  );
                }

                // Regex
                if (colDef.regex && cellValue !== "") {
                  let parsedValue = cellValue;

                  // If it's a number but expected to be a date, try to convert
                  if (
                    typeof cellValue === "number" &&
                    colDef.regex.includes("\\d{4}-\\d{2}-\\d{2}")
                  ) {
                    parsedValue = convertExcelDateToISO(cellValue);
                    entry[key] = parsedValue; // update the value
                  }

                  const isValid = new RegExp(colDef.regex).test(parsedValue);
                  if (!isValid) {
                    rowErrors.push(
                      `Row ${
                        i + 1
                      }: "${trimmedHeader}" does not match required format`
                    );
                  }
                }
              }
            });

            entry.rev = rev;
            entry.sheet_name = fileName;

            if (rowErrors.length > 0) {
              validationErrors.push(...rowErrors);
            }

            result.push(entry);
          }

          setProgress(Math.round((endIndex / rows.length) * 100));
          rowIndex = endIndex;

          if (rowIndex < rows.length) {
            setTimeout(processChunk, 0);
          } else {
            setData(result);
            setErrors(validationErrors);
            setLoading(false);
          }
        };

        processChunk();
      } catch (err) {
        setParseError("Failed to parse file: " + err.message);
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setParseError("Failed to read file");
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return {
    data,
    errors,
    loading,
    progress,
    parseError,
    parseFile,
  };
};
