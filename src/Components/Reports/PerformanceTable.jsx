import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_MANAGER_REPORT } from '@/URL';
import axios from 'axios';
import { Segment } from '@mui/icons-material';


const PerformanceTable = ({reportData}) => {
  const [expandedWeeks, setExpandedWeeks] = useState({
    week1: false,
    week2: false,
    week3: false,
    week4: false
  });
  // console.log(reportData)
  // const [data,setData] = useState([])
  // useEffect(()=>{
  //   setData(reportData)
  //   console.log(data)
  // })

  const toggleWeek = (week) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [week]: !prev[week]
    }));
  };

  const WeekData = ({ weekData }) => (
    <>
      <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap bg-blue-200">{weekData.target}</td>
      <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap bg-blue-200">{weekData.actual}</td>
      <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap bg-blue-200">
        {weekData.percentage}
      </td>
      {/* <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap">{weekData.target}</td> */}
    </>
  );

  return (
    <Card className="w-full max-w-6xl">
    <div className="rounded-md border border-gray-200 max-w-6xl">
      <div className="relative overflow-x-auto">
        <div className="flex">
          {/* Fixed columns container */}
          <div className="sticky left-0 bg-white">
            <table className="w-auto table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-7 text-left font-medium text-gray-900 w-44">Project Lead</th>
                  {/* <th className="px-4 py-7 text-left font-medium text-gray-900 w-44">Platform Lead</th> */}
                  <th className="px-4 py-7 text-left font-medium text-gray-900 w-44">Segment</th>
                </tr>
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* {console.log(reportData)} */}
                {reportData.map((managerData, index) => (
                  managerData.segment.map((segment, segmentIndex) => (
                    <tr key={`${index}-${segmentIndex}`} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900 bg-white text-base">
                        {segmentIndex === 0 ? segment.username : ""}
                      </td>
                      {/* <td className="px-4 py-3 text-gray-700 bg-white ">{segment.lead}</td> */}
                      <td className="px-4 py-3 text-gray-700 bg-white text-base">{segment.platform}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>

          {/* Scrollable weeks container */}
          <div className="overflow-x-auto">
            <table className="max-w-fit table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(expandedWeeks).map(week => (
                    <th 
                      key={week}
                      colSpan={expandedWeeks[week] ? 3 : 1}
                      className="px-7 py-3 text-center font-medium text-gray-900 whitespace-nowrap"
                    >
                      <div 
                        className="cursor-pointer hover:bg-gray-400 px-2 py-1 rounded"
                        onClick={() => toggleWeek(week)}
                      >
                        {week.charAt(0).toUpperCase() + week.slice(1)}
                        <span className="ml-1">{expandedWeeks[week] ? '▼' : '▶'}</span>
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  {Object.keys(expandedWeeks).map(week => (
                    expandedWeeks[week] ? (
                      <React.Fragment key={week}>
                        <th className="px-4 py-3 text-right font-medium text-gray-900 whitespace-nowrap">Target</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-900 whitespace-nowrap">Actual</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-900 whitespace-nowrap">Score</th>
                        {/* <th className="px-4 py-3 text-right font-medium text-gray-900 whitespace-nowrap">PRR</th> */}
                      </React.Fragment>
                    ) : <th key={week} className='h-12 text-gray-600 text-sm'>Efficiency</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportData.map((managerData, index) => (
                  managerData.segment.map((segment, segmentIndex) => (
                    <tr key={`${index}-${segmentIndex}`} className="hover:bg-gray-50">
                      {/* {console.log(segment)} */}
                      {/* {Object.entries(segment.weeks).filter(([week,weekData])=>{
                        console.log(week,weekData)
                      })} */}
                      {Object.entries(segment.weeks).map(([week, weekData]) => (
                        expandedWeeks[week] ? (
                          <WeekData key={week} weekData={weekData}/>
                        ) : (
                          <td key={week} className="px-4 py-3 text-right text-gray-700 whitespace-nowrap">
                            {weekData.percentage}
                          </td>
                        )
                      ))}
                      
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Card>
  );
};

export default PerformanceTable;