import React, { useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

const localizer = momentLocalizer(moment);
const now = new Date();

const CalendarComponent = ({ userTimeLog = [] }) => {
  // Admin events visible to all users
  console.log(userTimeLog);
  const [adminEvents, setAdminEvents] = useState([]);
  useEffect(() => {}, [userTimeLog]);

  // User-specific events only visible to the user who created them
  const [userEvents, setUserEvents] = useState([]);

  // Assume we know whether the current user is an admin or not
  const userIsAdmin = true; // Replace with your authentication logic

  const handleSelect = ({ start, end }) => {
    // Prevent adding events in the past
    // if (moment(start).isBefore(moment(), "day")) {
    //   alert("You cannot add events to past dates.");
    //   return;
    // }
    // const title = window.prompt("Enter event title");
    // return <div>xyz</div>
    // if (title) {
    //   const newEvent = {start, end, title, id: new Date().getTime() };
    //   if (userIsAdmin) {
    //     // Admin events are shared with everyone
    //     setAdminEvents([...adminEvents, newEvent]);
    //   } else {
    //     // User events are personal
    //     setUserEvents([...userEvents, newEvent]);
    //   }
    // }
  };
  const ToolTipForTimeLog = ({ event }) => {
    return (
      // <div>
      //   <button
      //     onClick={() => {
      //       console.log(event.log_date);
      //     }}
      //   >
      //     {event.title}
      //   </button>
      // </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{event.title}</TooltipTrigger>
          <TooltipContent>
            <div className="flex-col">
              <div className="text-lg flex">
                <div className="font-bold">Project Name:</div>
                &nbsp;
                {event.project_name}
              </div>
              <div className="text-lg flex">
                <div className="font-bold">Duration:</div>
                &nbsp;
                {moment
                  .duration(moment(event.end).diff(moment(event.start)))
                  .hours()}{" "}
                Hours{" "}
                {moment
                  .duration(moment(event.end).diff(moment(event.start)))
                  .minutes()}{" "}
                Minutes
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  // function formatDate(date) {
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }

  const formattedEvents = userTimeLog.map((event) => ({
    id: event.id,
    title: event.title, 
    start: new Date(event.start), 
    end: new Date(event.end),
  }));
  // userTimeLog.map(({ start, end }) => {
  //   let startDate = new Date(start);
  //   let endDate = new Date(end);
  //   // startDate = formatDate(startDate);
  //   // endDate = formatDate(endDate);
  //   // console.log(startDate.toString())
  //   start = startDate.toString();
  //   end = endDate.toString();
  // });

  // console.log(formattedTimeLog);

  return (
    <div style={{ height: "100vh", padding: "20px" }} className="">
      <h3>Time Log</h3>
      <Calendar
        selectable
        localizer={localizer}
        events={formattedEvents}
        // {userIsAdmin ? [...adminEvents] : [...adminEvents, ...userEvents]} // Admin sees all events, user sees their own and admin's events
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        style={{ height: "100%" }}
        components={{
          event: ToolTipForTimeLog,
        }}
      />
    </div>
  );
};

export default CalendarComponent;
