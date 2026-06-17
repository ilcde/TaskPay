<![CDATA[<div align="center">

# 📋 TaskPay

**Ứng dụng quản lý công việc & theo dõi lương — All-in-one Task Manager & Salary Tracker**

[![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![H2 Database](https://img.shields.io/badge/H2-Database-blue?style=for-the-badge)](https://www.h2database.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*Không đăng nhập • Không cloud • Không analytics — Dữ liệu hoàn toàn local*

[🚀 Bắt đầu](#-bắt-đầu-nhanh) • [✨ Tính năng](#-tính-năng) • [📦 Cài đặt](#-cài-đặt) • [📡 API](#-api-reference) • [🤝 Đóng góp](#-đóng-góp)

</div>

---

## ✨ Tính năng

### 📝 Quản lý công việc (Todo)
| Tính năng | Chi tiết |
|-----------|----------|
| CRUD đầy đủ | Thêm, sửa, xóa, hoàn thành task |
| Tìm kiếm & lọc | Theo hôm nay, sắp tới, quá hạn, đã xong, ưu tiên, danh mục |
| Task fields | Tiêu đề, ghi chú, ngày hạn, giờ nhắc, lặp lại, ưu tiên, danh mục, màu sắc, âm nhắc |
| Calendar view | Xem task theo ngày trong tháng |

### 💰 Theo dõi lương (Salary Tracker)
| Tính năng | Chi tiết |
|-----------|----------|
| Chấm công | Theo dõi theo tháng: giờ làm, tăng ca, thưởng, nghỉ có/không lương |
| Cài đặt lương | Tiền tệ, lương tháng, công ngày, giờ mặc định, hệ số tăng ca |
| Báo cáo | Tổng kết tháng, so sánh các tháng, copy summary nhanh |

### ⚙️ Hệ thống
| Tính năng | Chi tiết |
|-----------|----------|
| Đa ngôn ngữ | Tiếng Việt / English |
| Giao diện | Light / Dark / System theme |
| PWA | Cài đặt như app native trên điện thoại / máy tính |
| Local-first | Dữ liệu lưu trong H2 file database, không cần internet |
| Notification | Nhắc nhở task qua browser notification |

---

## 🛠️ Tech Stack

```
Backend:
  ├── Java 21
  ├── Spring Boot 3.3.5
  ├── Spring Web (REST API)
  ├── Spring Data JPA
  ├── Bean Validation (JSR-380)
  └── H2 Database (file-based, local)

Frontend (bundled trong Spring Boot):
  ├── Vanilla HTML5 / CSS3 / JavaScript
  ├── Progressive Web App (PWA)
  ├── Service Worker (offline support)
  └── Web App Manifest
```

---

## 📁 Cấu trúc dự án

```
taskpay/
├── build.gradle                          # Gradle build config
├── settings.gradle
├── gradlew / gradlew.bat                 # Gradle wrapper
├── src/
│   ├── main/
│   │   ├── java/com/taskpay/
│   │   │   ├── TaskPayApplication.java   # Entry point
│   │   │   ├── api/                      # API models / DTOs
│   │   │   ├── config/                   # CORS, Web config
│   │   │   ├── controller/               # REST controllers
│   │   │   ├── domain/                   # JPA entities
│   │   │   ├── repository/               # Spring Data repositories
│   │   │   └── service/                  # Business logic
│   │   └── resources/
│   │       ├── application.yml           # App configuration
│   │       └── static/                   # Frontend PWA files
│   │           ├── index.html
│   │           ├── app.js
│   │           ├── styles.css
│   │           ├── manifest.webmanifest
│   │           └── service-worker.js
│   └── test/
│       └── java/com/taskpay/             # Unit & integration tests
├── data/                                 # H2 database files (gitignored)
└── README.md
```

---

## 📦 Cài đặt

### Yêu cầu

- **JDK 21** trở lên ([Download OpenJDK 21](https://adoptium.net/))
- Gradle **không bắt buộc** — repo đã bao gồm Gradle Wrapper

Kiểm tra Java đã cài:

```bash
java -version
# java version "21.x.x" ...
```

---

## 🚀 Bắt đầu nhanh

### 1. Clone dự án

```bash
git clone https://github.com/ilcde/TaskPay.git
cd TaskPay
```

### 2. Chạy ứng dụng

**Windows:**
```cmd
gradlew.bat bootRun
```

**macOS / Linux:**
```bash
./gradlew bootRun
```

### 3. Mở trình duyệt

| URL | Mô tả |
|-----|-------|
| `http://localhost:8080` | 🏠 Giao diện chính |
| `http://localhost:8080/api/health` | ❤️ Health check |
| `http://localhost:8080/h2-console` | 🗄️ H2 Database console |

---

## 🔧 Build & Deploy

### Build JAR

**Windows:**
```cmd
gradlew.bat clean build
```

**macOS / Linux:**
```bash
./gradlew clean build
```

Output: `build/libs/taskpay-1.0.0.jar`

### Chạy từ JAR

```bash
java -jar build/libs/taskpay-1.0.0.jar
```

### Biến môi trường

| Biến | Mặc định | Mô tả |
|------|----------|-------|
| `SERVER_PORT` | `8080` | Port ứng dụng |
| `TASKPAY_CORS_ORIGINS` | `http://localhost:8080` | Allowed CORS origins |

**Ví dụ chạy với port khác:**
```bash
java -jar build/libs/taskpay-1.0.0.jar --server.port=9090
```

---

## 🗄️ Database

TaskPay dùng **H2 file database** — dữ liệu lưu cục bộ, không cần cài server database riêng.

### Kết nối H2 Console

Truy cập `http://localhost:8080/h2-console` với thông tin:

```
JDBC URL : jdbc:h2:file:./data/taskpay-db;DB_CLOSE_ON_EXIT=FALSE
User     : sa
Password : (để trống)
```

### Đổi vị trí database

Sửa trong `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:h2:file:/path/to/your/database;DB_CLOSE_ON_EXIT=FALSE
```

### Reset dữ liệu

Dừng app, xóa thư mục `data/`, chạy lại:
```bash
# Windows
rd /s /q data
gradlew.bat bootRun

# macOS/Linux
rm -rf data/
./gradlew bootRun
```
App sẽ tự tạo lại database và seed dữ liệu mặc định.

---

## 📡 API Reference

Base URL: `http://localhost:8080`

### Health

```http
GET /api/health
```

---

### Tasks

```http
GET    /api/tasks                          # Lấy tất cả task
GET    /api/tasks?filter=today             # Lọc: today | upcoming | overdue | completed | priority
POST   /api/tasks                          # Tạo task mới
PUT    /api/tasks/{id}                     # Cập nhật task
PATCH  /api/tasks/{id}/toggle              # Toggle hoàn thành
DELETE /api/tasks/{id}                     # Xóa task
DELETE /api/tasks/completed?months=6       # Xóa task đã xong cũ hơn N tháng
```

**POST /api/tasks — Request Body:**
```json
{
  "title": "Tên công việc",
  "note": "Ghi chú...",
  "dueDate": "2026-06-20",
  "dueTime": "09:00",
  "priority": "HIGH",
  "categoryId": 1,
  "color": "#FF5733",
  "repeat": "NONE"
}
```

---

### Categories

```http
GET  /api/categories         # Lấy danh mục
POST /api/categories         # Tạo danh mục mới
```

---

### Settings

```http
GET /api/settings/app        # Lấy cài đặt ứng dụng
PUT /api/settings/app        # Cập nhật cài đặt ứng dụng

GET /api/settings/salary     # Lấy cài đặt lương
PUT /api/settings/salary     # Cập nhật cài đặt lương
```

---

### Work Days (Chấm công)

```http
GET    /api/work-days?monthKey=2026-06     # Lấy chấm công tháng
PUT    /api/work-days/{yyyy-MM-dd}         # Cập nhật ngày làm
DELETE /api/work-days/{yyyy-MM-dd}         # Xóa bản ghi ngày
```

**PUT /api/work-days/{date} — Request Body:**
```json
{
  "hoursWorked": 8,
  "overtimeHours": 2,
  "bonus": 100000,
  "isPaidLeave": false,
  "isUnpaidLeave": false,
  "note": "Ghi chú ngày làm"
}
```

---

### Reports

```http
GET /api/reports/monthly?monthKey=2026-06   # Báo cáo tháng
```

**Response:**
```json
{
  "monthKey": "2026-06",
  "totalWorkDays": 22,
  "totalHours": 176,
  "overtimeHours": 10,
  "totalBonus": 500000,
  "estimatedSalary": 12500000
}
```

---

## 🧪 Chạy Tests

**Windows:**
```cmd
gradlew.bat test
```

**macOS / Linux:**
```bash
./gradlew test
```

Kết quả test: `build/reports/tests/test/index.html`

---

## 📱 Cài đặt như App (PWA)

TaskPay là Progressive Web App — có thể cài đặt như app native:

**Android (Chrome):**
1. Mở `http://<server-ip>:8080` trong Chrome
2. Menu (⋮) → **"Thêm vào Màn hình chính"**
3. App xuất hiện trên màn hình như ứng dụng thật

**Desktop (Chrome/Edge):**
1. Mở app trong trình duyệt
2. Click icon cài đặt ở thanh địa chỉ
3. Chọn **"Install TaskPay"**

> **Lưu ý cho mobile:** Đảm bảo điện thoại và máy chủ cùng mạng LAN, hoặc deploy server lên máy chủ công khai.

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repo này
2. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
3. Commit thay đổi: `git commit -m 'Add: mô tả thay đổi'`
4. Push lên branch: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

### Báo lỗi

Nếu gặp bug, hãy [tạo Issue](https://github.com/ilcde/TaskPay/issues) với thông tin:
- Môi trường (OS, Java version)
- Các bước tái hiện lỗi
- Log lỗi (nếu có)

---

## 📄 License

MIT License — xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

<div align="center">

Made with ❤️ by [ilcde](https://github.com/ilcde)

⭐ Nếu thấy hữu ích, hãy **star** repo này nhé!

</div>
]]>
