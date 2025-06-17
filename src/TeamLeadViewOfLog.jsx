import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, addDays, differenceInDays, parseISO } from "date-fns";
import axios from "axios";
import { GET_TEAM_HIERARCHY, GET_TEAM_TIMELOG, GET_TEAMLIST } from "./URL";
import moment from "moment";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useAuth } from "./AuthProvider";

const TeamLeadViewOfLog = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [days, setDays] = useState([]);
  const [teamTasks, setTeamTasks] = useState([]);
  const [teamList, setTeamList] = useState([]);

  // Sample team members and their tasks
  //   const teamMembers = [
  //     { user_id: 1, username: "A" },
  //     { user_id: 2, username: "B" },
  //     { user_id: 3, username: "C" },
  //     { user_id: 4, username: "D" },
  //   ];

  // Sample tasks data
  //   const tasks = [
  //     {
  //       task_id: 1,
  //       user_id: 1,
  //       date: "2025-02-17",
  //       task_name: "Meeting",
  //       color: "bg-blue-500",
  //     },
  //     {
  //       task_id: 1,
  //       user_id: 1,
  //       date: "2025-02-17",
  //       task_name: "Meeting",
  //       color: "bg-blue-500",
  //     },
  //     {
  //       task_id: 2,
  //       user_id: 2,
  //       date: "2025-02-18",
  //       task_name: "Development",
  //       color: "bg-green-500",
  //     },
  //     {
  //       task_id: 3,
  //       user_id: 1,
  //       date: "2025-02-18",
  //       task_name: "Review",
  //       color: "bg-purple-500",
  //     },
  //     {
  //       task_id: 4,
  //       user_id: 3,
  //       date: "2025-02-19",
  //       task_name: "Testing",
  //       color: "bg-orange-500",
  //     },
  //     {
  //       task_id: 5,
  //       user_id: 4,
  //       date: "2025-02-20",
  //       task_name: "Documentation",
  //       color: "bg-yellow-500",
  //     },
  //   ];


  const {data} =useAuth()
  useEffect(() => {
    if (fromDate && toDate) {
      const start = parseISO(fromDate);
      const end = parseISO(toDate);
      const dayCount = differenceInDays(end, start) + 1;
      const daysArray = [];
      for (let i = 0; i < dayCount; i++) {
        daysArray.push(addDays(start, i));
      }
      setDays(daysArray);
    }
    const getTeamCalendarInfo = async () => {
      try {
        console.log(data.user_info)
        const [teamTimeLogResponse,
          //  teamListResponse,
            hierarchyResponse] = await Promise.all([
          axios.post(GET_TEAM_TIMELOG, {
            start: fromDate,
            end: toDate,
          }),
          // axios.get(GET_TEAMLIST),
          axios.get(`${GET_TEAM_HIERARCHY}/${data.user_info.userIndex}`)
        ]);
        setTeamTasks(() => [...teamTimeLogResponse.data]);
        setTeamList(() => [...hierarchyResponse.data]);
        console.log(hierarchyResponse.data)
        // console.log(teamTimeLogResponse, teamListResponse);
      } catch (err) {
        console.log(err);
      }
    };
    getTeamCalendarInfo();
  }, [fromDate, toDate]);

  const getTasksForMemberAndDay = (user_id, date) => {
    // console.log(teamTasks);
    return teamTasks.filter(
      (task) =>
        task.user_id === user_id && task.log_date === format(date, "yyyy-MM-dd")
    );
  };

  return (
    <div className="p-4">
      <Card className="w-full mx-auto pt-10">
        <CardHeader>
          <CardTitle>Team Calendar</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <Input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-w-5xl">
          {days.length > 0 ? (
            <div className="relative">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-20 bg-white border p-2 text-left min-w-[200px]">
                        Team Member
                      </th>
                      {days.map((day) => (
                        <th
                          key={day.toString()}
                          className="border p-2 text-center min-w-[120px] w-"
                        >
                          <div>{format(day, "EEE")}</div>
                          <div className="text-sm text-gray-600">
                            {format(day, "MMM d")}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {teamList.map((member) => (
                      <tr key={member.userIndex}>
                        <td className="sticky left-0 z-10 bg-white border p-2 font-medium">
                          {member.firstname}
                        </td>
                        {days.map((day) => (
                          <td key={day.toString()} className="border p-2">
                            <div className="flex flex-col gap-1">
                              {getTasksForMemberAndDay(member.userIndex, day).map(
                                (task) => (
                                  <div
                                    key={task.task_id}
                                    //   className={`${task.color} text-white text-sm p-1 rounded text-center`}
                                    className={` text-black border-2 text-sm p-1 rounded text-center`}
                                    title={task.task_name}
                                  >
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          {task.task_name}{" "}
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-gray-700">
                                          <div className="flex-col">
                                            <div className="text-lg flex">
                                              <div className="font-bold">
                                                Project Name:
                                              </div>
                                              &nbsp;
                                              {task.project_name}
                                            </div>
                                            <div className="text-lg flex">
                                              <div className="font-bold">
                                                Duration:
                                              </div>
                                              &nbsp;
                                              {moment
                                                .duration(
                                                  moment(task.end).diff(
                                                    moment(task.start)
                                                  )
                                                )
                                                .hours()}{" "}
                                              Hours{" "}
                                              {moment
                                                .duration(
                                                  moment(task.end).diff(
                                                    moment(task.start)
                                                  )
                                                )
                                                .minutes()}{" "}
                                              Minutes
                                            </div>
                                          </div>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <div></div>
                                  </div>
                                )
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Please select date range to view the calendar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeadViewOfLog;
