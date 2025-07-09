import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

// Mock data cho lịch hẹn
const mockEvents = [
  {
    id: 1,
    title: 'Bảo dưỡng xe Toyota',
    start: new Date(moment().startOf('day').add(9, 'hours').toDate()),
    end: new Date(moment().startOf('day').add(10, 'hours').toDate()),
    customer: 'Nguyễn Văn A',
    service: 'Bảo dưỡng định kỳ',
  },
  {
    id: 2,
    title: 'Sửa chữa xe Ford',
    start: new Date(moment().startOf('day').add(13, 'hours').toDate()),
    end: new Date(moment().startOf('day').add(15, 'hours').toDate()),
    customer: 'Trần Thị B',
    service: 'Sửa chữa động cơ',
  },
  {
    id: 3,
    title: 'Thay dầu xe Honda',
    start: new Date(moment().add(1, 'days').startOf('day').add(8, 'hours').toDate()),
    end: new Date(moment().add(1, 'days').startOf('day').add(9, 'hours').toDate()),
    customer: 'Lê Văn C',
    service: 'Thay dầu',
  },
];

function CreateAppointmentModal({ open, onClose, onSave }) {
  const [customer, setCustomer] = useState('');
  const [service, setService] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold">×</button>
        <h3 className="text-lg font-bold mb-4 text-primary">Tạo lịch hẹn mới</h3>
        <form onSubmit={e => { e.preventDefault(); onSave({ customer, service, start, end }); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên khách hàng</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={customer} onChange={e => setCustomer(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dịch vụ</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" value={service} onChange={e => setService(e.target.value)} required />
          </div>
          <div className="flex flex-col sm:flex-row gap-1">
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1">Bắt đầu</label>
              <input type="datetime-local" className="w-full max-w-full border rounded-lg px-3 py-2" value={start} onChange={e => setStart(e.target.value)} required />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1">Kết thúc</label>
              <input type="datetime-local" className="w-full max-w-full border rounded-lg px-3 py-2" value={end} onChange={e => setEnd(e.target.value)} required />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold">Đóng</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AppointmentCalendar() {
  const [events] = useState(mockEvents);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 sm:p-10 relative">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-blue-100 text-primary font-semibold text-sm shadow-sm transition"
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'><path fillRule='evenodd' d='M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 8H17a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z' clipRule='evenodd' /></svg>
          Quay lại
        </button>
        <div className="flex items-center justify-between mb-6 mt-2">
          <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">Lịch hẹn dịch vụ</h2>
          <button onClick={() => setOpenModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-semibold shadow-sm text-sm transition flex items-center gap-1">
            <span className="text-lg leading-none">+</span> <span className="hidden sm:inline">Tạo lịch hẹn</span>
          </button>
        </div>
        <div className="rounded-xl overflow-hidden border border-blue-100 shadow">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 520 }}
            messages={{
              next: 'Sau',
              previous: 'Trước',
              today: 'Hôm nay',
              month: 'Tháng',
              week: 'Tuần',
              day: 'Ngày',
              agenda: 'Danh sách',
            }}
            popup
            views={['month', 'week', 'day', 'agenda']}
            eventPropGetter={() => ({ style: { backgroundColor: '#0077B6', color: 'white', borderRadius: 8, border: 'none', fontWeight: 500 } })}
          />
        </div>
        <CreateAppointmentModal open={openModal} onClose={() => setOpenModal(false)} onSave={() => setOpenModal(false)} />
      </div>
    </div>
  );
} 