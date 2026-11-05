# B25DCCC072 - Bài Thực Hành 02: Ứng Dụng Thời Tiết (Weather App)

Ứng dụng web xem dự báo thời tiết cho 8 thành phố lớn tại Việt Nam, xây dựng theo phong cách tối giản (Minimalist) bằng **React**, **TypeScript**, **Vite** và **Tailwind CSS**. Dữ liệu thời tiết được tích hợp từ API [Open-Meteo](https://open-meteo.com/).

---

## I Thông Tin Sinh Viên
- **Họ và tên:** Nguyễn Minh Hoàng
- **Mã sinh viên:** B25DCCC072
- **Trường:** Học viện Công nghệ Bưu chính Viễn thông (PTIT)
- **Bài tập:** Bài thực hành 02 (TH02)

---

## II Tính Năng Chính

### 1. Chức Năng Cốt Lõi (Yêu cầu bắt buộc)
- **Danh sách 8 thành phố:** Hà Nội, Hải Phòng, Huế, Đà Nẵng, Nha Trang, Đà Lạt, TP. Hồ Chí Minh, Cần Thơ. Thành phố đang chọn được làm nổi bật.
- **Thời tiết hiện tại:** Hiển thị nhiệt độ, độ ẩm, tốc độ gió, thời điểm cập nhật, biểu tượng và mô tả trạng thái.
- **Dự báo 7 ngày:** Hiển thị thứ, ngày, biểu tượng thời tiết, nhiệt độ cao nhất và thấp nhất.
- **Chuyển đổi đơn vị °C / °F:** Chuyển đổi linh hoạt nhiệt độ ở phía Client mà không gọi lại API.
- **Xử lý trạng thái UI:** Hiển thị rõ ràng các trạng thái `Loading` (đang tải dữ liệu), `Error` (lỗi kết nối kèm nút **Thử lại**), và trạng thái khi chưa chọn.
- **Giao diện Responsive:** Hiển thị 2 cột trên màn hình rộng (≥ 768px) và tự động xếp dọc 1 cột trên thiết bị di động.

### 2. Chức Năng Nâng Cao & UI/UX
- **Tìm kiếm thông minh:** Tìm nhanh thành phố hỗ trợ tiếng Việt không phân biệt dấu (gõ `ha noi` vẫn tìm ra `Hà Nội`).
- **Lưu trạng thái (LocalStorage):** Tự động ghi nhớ thành phố chọn gần nhất để hiển thị ở lần truy cập sau.
- **Giao diện Minimalist & Background động:**
  - **Trời nắng/quang (`weather_code` 0–2):** Tone màu nền sáng ấm.
  - **Nhiều mây/âm u (`weather_code` 3, 45, 48):** Tone màu nền xám lạnh dịu nhẹ.
  - **Mưa/dông (`weather_code` 61–65, 80–82, 95–99):** Tone nền trầm kết hợp hiệu ứng hạt mưa rơi mỏng chạy bằng CSS Animation ở background.

---

## III Công Nghệ Sử Dụng
- **Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** Open-Meteo Forecast API (`https://api.open-meteo.com/v1/forecast`)

---

## IV Cấu Trúc Dự Án

```text
B25DCCC072-BaiTH02/
├── public/
├── src/
│   ├── components/       # Các UI Components (CityList, WeatherCurrent, WeatherForecast, RainAnimation, StatusViews, UnitToggle)
│   ├── constants/        # Tọa độ 8 thành phố & cấu hình UI theo weather_code
│   ├── hooks/            # Custom Hooks (useWeather, useSelectedCity, useTemperatureUnit, useLocalStorage)
│   ├── services/         # Service gọi API Open-Meteo
│   ├── types/            # TypeScript Interfaces định nghĩa kiểu dữ liệu API
│   ├── utils/            # Các hàm tiện ích (bỏ dấu tiếng Việt, chuyển đổi C/F, định dạng ngày)
│   ├── App.tsx           # Main App Component
│   ├── index.css         # Stylesheet chung & CSS Keyframe animation mưa
│   └── main.tsx          # Entry Point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
*Hướng Dẫn Cài Đặt Và Chạy Local
Clone repository về máy:
BASH
git clone [https://github.com/nguyenminhhoanggptit-sudo/B25DCCC072---BaiTH02.git](https://github.com/nguyenminhhoanggptit-sudo/B25DCCC072---BaiTH02.git)
cd B25DCCC072---BaiTH02
Cài đặt thư viện phụ thuộc:
BASH
npm install
Chạy dự án ở môi trường Development:
BASH
npm run dev
Mở trình duyệt truy cập đường dẫn local: http://localhost:5173
Kiểm tra và Build ứng dụng:
Bash
npm run build
