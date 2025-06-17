import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const DonutChart = () => {
  const chartRef = useRef(null); // Ref for the Chart.js instance
  const canvasRef = useRef(null); // Ref for the canvas element

  useEffect(() => {
    // Cleanup function to destroy the previous chart instance
    if (chartRef.current) {
      // chartRef.current.destroy();
    }

    // Initialize a new Chart.js instance
    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: [
          "Total Project",
          "Completed Project",
          "Deadlock Project",
          "Inprogress Project",
        ],
        datasets: [
          {
            label: "Project Status",
            data: [19, 12, 3, 4],
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, // Ensures the chart is responsive
        maintainAspectRatio: false, // Allows the chart to fill its container
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || "";
                if (context.parsed !== null) {
                  label += `: ${context.raw}`;
                }
                return label;
              },
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartRef.current) {
        // chartRef.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return (
    <div className="chart-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default DonutChart;
