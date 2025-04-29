import DriveHeader from "@/components/common/drive-header";
import SidebarStaff from "@/components/common/sidebar-staff";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

moment.locale("vi-VN");
const localizer = momentLocalizer(moment);

const convertToDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return new Date(year, month - 1, day);
};

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function StaffCalendarPage() {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const fetchData = (date) => {
    const yourToken = localStorage.getItem("bus-token");
    axios
      .get(`${baseURL}/api/Trip/calendar?month=${date}`, {
        headers: {
          Authorization: `Bearer ${yourToken}`,
          "ngrok-skip-browser-warning": 69420,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        const formattedData = data.map((event) => ({
          ...event,
          start: convertToDate(event.start),
          end: convertToDate(event.end),
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  };
  useEffect(() => {
    const now = new Date();
    // const formattedDate = `${now.getMonth() + 1}/${now.getFullYear()}`;
    const formattedDate = `${now.getMonth() + 1}`;
    fetchData(formattedDate);
  }, []);
  const handleDateNavigate = (date) => {
    setCurrentDate(date);
    // const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedDate = `${date.getMonth() + 1}`;
    fetchData(formattedDate);
  };
  const eventPropGetter = (event) => {
    var style = {
      borderRadius: "8px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };

    if (event?.hasDriver) {
      style.backgroundColor = "#36c956";
    } else {
      style.backgroundColor = "#c96736";
    }

    return {
      style: style,
    };
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
              navigate(`/staff/trip/${event.id}`);
            }}
            eventPropGetter={eventPropGetter}
          />
        </div>
      </div>
    </div>
  );
}