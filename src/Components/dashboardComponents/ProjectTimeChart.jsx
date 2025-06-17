



// ProjectTimeChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectTimeChart = ({ projects, estimatedTimes, actualTimes }) => {
  const data = {
    labels: projects,
    datasets: [
      {
        label: 'Estimated Time',
        data: estimatedTimes,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Actual Time',
        data: actualTimes,
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} days`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Project Name',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Days',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Project Time Comparison</h3>
      </div>
      <div className="card-body chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProjectTimeChart;
