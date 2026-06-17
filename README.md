<div align="center">

# 📋 TaskPay

**Ứng dụng quản lý công việc & theo dõi lương — All-in-one Task Manager & Salary Tracker**

[![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![H2 Database](https://img.shields.io/badge/H2-Database-blue?style=for-the-badge)](https://www.h2database.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*Không đăng nhập · Không cloud · Không analytics — Dữ liệu hoàn toàn local*

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

**Backend**
- Java 21
- Spring Boot 3.3.5
- Spring Web (REST API)
- Spring Data JPA
- Bean Validation (JSR-380)
- H2 Database (file-based, local)

**Frontend** (bundled trong Spring Boot)
- Vanilla HTML5 / CSS3 / JavaScript
- Progressive Web App (PWA)
- Service Worker (offline support)
- Web App Manifest

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

## 📦 Yêu cầu môi trường

- **JDK 21** trở lên — [Download OpenJDK 21](https://adoptium.net/)
- **Gradle** không bắt buộc — repo đã có Gradle Wrapper sẵn

Kiểm tra Java:

```bash
java -version
```

---

## 🚀 Chạy local

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
| `http://localhost:8080` | Giao diện chính |
| `http://localhost:8080/api/health` | Health check |
| `http://localhost:8080/h2-console` | H2 Database console |

---

## 🔧 Build

**Windows:**
```cmd
gradlew.bat clean build
```

**macOS / Linux:**
```bash
./gradlew clean build
```

Output: `build/libs/taskpay-1.0.0.jar`

**Chạy từ JAR:**
```bash
java -jar build/libs/taskpay-1.0.0.jar
```

**Đổi port:**
```bash
java -jar build/libs/taskpay-1.0.0.jar --server.port=9090
```

---

## 🗄️ Database

TaskPay dùng **H2 file database** — dữ liệu lưu cục bộ, không cần server database riêng.

**Kết nối H2 Console** tại `http://localhost:8080/h2-console`:

```
JDBC URL : jdbc:h2:file:./data/taskpay-db;DB_CLOSE_ON_EXIT=FALSE
User     : sa
Password : (để trống)
```

**Reset dữ liệu:** Dừng app, xóa thư mục `data/`, chạy lại — app sẽ tự seed lại dữ liệu mặc định.

---

## 📡 API Reference

Base URL: `http://localhost:8080`

### Health
```
GET /api/health
```

### Tasks
```
GET    /api/tasks
GET    /api/tasks?filter=today|upcoming|overdue|completed|priority
POST   /api/tasks
PUT    /api/tasks/{id}
PATCH  /api/tasks/{id}/toggle
DELETE /api/tasks/{id}
DELETE /api/tasks/completed?months=6
```

### Categories
```
GET  /api/categories
POST /api/categories
```

### Settings
```
GET /api/settings/app
PUT /api/settings/app
GET /api/settings/salary
PUT /api/settings/salary
```

### Work Days
```
GET    /api/work-days?monthKey=2026-06
PUT    /api/work-days/{yyyy-MM-dd}
DELETE /api/work-days/{yyyy-MM-dd}
```

### Reports
```
GET /api/reports/monthly?monthKey=2026-06
```

---

## 🧪 Tests

**Windows:**
```cmd
gradlew.bat test
```

**macOS / Linux:**
```bash
./gradlew test
```

---

## 📱 Cài đặt như App (PWA)

**Android (Chrome):**
1. Mở `http://<server-ip>:8080` trong Chrome
2. Menu → **"Thêm vào Màn hình chính"**

**Desktop (Chrome/Edge):**
1. Mở app trong trình duyệt
2. Click icon cài đặt ở thanh địa chỉ → **"Install TaskPay"**

---

## 🤝 Đóng góp

1. Fork repo này
2. Tạo branch: `git checkout -b feature/ten-tinh-nang`
3. Commit: `git commit -m "Add: mô tả thay đổi"`
4. Push: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

---

## 📄 License

[MIT License](LICENSE) — Copyright (c) 2026 ilcde

---

<div align="center">

Made with ❤️ — ⭐ Nếu thấy hữu ích, hãy **star** repo này nhé!

</div>
