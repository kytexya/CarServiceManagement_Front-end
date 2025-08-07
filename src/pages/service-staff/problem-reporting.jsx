import AdminLayout from '../../components/common/admin-layout';

const ProblemReporting = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Báo cáo lỗi / Tạm ngừng xử lý</h1>
      <div className="bg-white rounded shadow p-4 mb-4">
        <p>Gửi thông tin lỗi phát sinh (phụ tùng không đủ, lỗi mới), chuyển trạng thái đơn sang "Tạm ngưng" hoặc "Chờ xử lý".</p>
      </div>
      {/* Form báo cáo lỗi sẽ được phát triển sau */}
    </div>
  );
};

export default ProblemReporting;