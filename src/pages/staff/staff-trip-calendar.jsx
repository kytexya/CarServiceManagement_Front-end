import DriveHeader from "@/components/common/drive-header";
import SidebarStaff from "@/components/common/sidebar-staff";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";

moment.locale("vi-VN");
const localizer = momentLocalizer(moment);

const convertToDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

const events = [
  {
    id: 1,
    title: "Morning Meeting",
    start: "15/04/2025",
    end: "15/04/2025",
  },
  {
    id: 2,
    title: "Project Deadline",
    start: "16/04/2025",
    end: "16/04/2025",
  },
  {
    id: 3,
    title: "Team Lunch",
    start: "17/04/2025",
    end: "17/04/2025",
  },
  {
    id: 4,
    title: "Conference Call",
    start: "18/04/2025",
    end: "18/04/2025",
  },
  {
    id: 5,
    title: "Weekend Event",
    start: "19/04/2025",
    end: "19/04/2025",
  },
  {
    id: 6,
    title: "Weekend Event",
    start: "20/04/2025",
    end: "20/04/2025",
  },
];

export default function StaffCalendarPage() {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!events) return;

    const formattedData = events.map((event) => ({
      ...event,
      start: convertToDate(event.start),
      end: convertToDate(event.end),
    }));

    setData(formattedData);
  }, []);

  const handleDateNavigate = (date) => {
    setCurrentDate(date);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <DriveHeader />
      <div className="flex flex-shrink overflow-y-scroll w-[calc(100%-300px]">
        <SidebarStaff />
        <div className="flex flex-col w-full p-3">
          <Calendar
            views={["month"]}
            defaultView="month"
            style={{ height: "100vh" }}
            localizer={localizer}
            events={data}
            startAccessor="start"
            endAccessor="end"
            date={currentDate}
            onNavigate={handleDateNavigate}
            onSelectEvent={(event) => {
              console.log("Selected event:", event);
            }}
          />
        </div>
      </div>
    </div>
  );
}
