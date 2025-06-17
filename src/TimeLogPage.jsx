import React, { useEffect, useState } from "react";
import CalendarComponent from "./Components/CalenderComponent";
import { Button } from "./Components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import AddTimeLog from "./AddTimeLog";
import TeamLeadViewOfLog from "./TeamLeadViewOfLog";
import axios from "axios";
import {
  GET_PROJECT_DATA_URL,
  GET_USER_PROJECT_LIST,
  GET_USER_TIMELOG,
} from "./URL";

const now = new Date();

const eventsL = [
  {
    id: 1,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    // start: now,
    // end: now
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 2,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 3,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
];
function TimeLogPage() {
  const [events, setEvents] = useState([...eventsL]);
  const [userCalendarTimeLog, setUserCalendarTimeLog] = useState([]);
  const [userProjectList, setUserProjectList] = useState([]);
  const [flag,setFlag] = useState(false)


  useEffect(() => {
    const getAllTaskLogs = async () => {
      // const response = await axios.get(GET_USER_TIMELOG)
      try {
        const [timeLogResponse, projectListResponse] = await Promise.all([
          axios.get(GET_USER_TIMELOG),
          axios.get(GET_USER_PROJECT_LIST),
        ]);
        // console.log(timeLogResponse, projectListResponse);
        const projectList = projectListResponse.data;
        setUserProjectList(() => [...projectList]);
        setUserCalendarTimeLog(() => [...timeLogResponse.data]);
      } catch (err) {
        console.error(err);
      }
    };

    getAllTaskLogs();
  }, [flag]);

  // console.log(userCalendarTimeLog);

  return (
    <div className="m-4 max-w-5xl">
      <div className="flex-col">
        <div className="flex justify-end mr-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Add Log
                {/* <PlusIcon className="w-4 h-4 items-center" /> */}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-svh bg-white overflow-y-auto ">
              <DialogTitle>Add Time Log</DialogTitle>
              <DialogHeader className=""></DialogHeader>
              <AddTimeLog
                events={events}
                setEvents={setEvents}
                userProjectList={userProjectList}
                userTimeLog={userCalendarTimeLog}
                setFlag={setFlag}
              />
            </DialogContent>
          </Dialog>
        </div>

        <CalendarComponent  userTimeLog={userCalendarTimeLog}  />
        {/* <TeamLeadViewOfLog/> */}
      </div>
    </div>
  );
}

export default TimeLogPage;
