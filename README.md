# TaskPay

TaskPay là app quản lý công việc và theo dõi lương, được tái tạo thành một repo Spring Boot full-stack để dễ chạy local và đăng lên GitHub.

Backend Spring Boot serve luôn frontend PWA trong `src/main/resources/static`, nên chỉ cần chạy một ứng dụng Java là có cả API và giao diện.

## Tính năng chính

- Todo list: thêm, sửa, xóa, hoàn thành, tìm kiếm, lọc theo hôm nay, sắp tới, quá hạn, đã xong, ưu tiên, danh mục.
- Task fields: tiêu đề, ghi chú, ngày hạn, giờ nhắc, lặp lại, ưu tiên, danh mục, màu, âm nhắc.
- Calendar view cho task theo ngày.
- Salary tracker: chấm công theo tháng, giờ làm, tăng ca, thưởng, nghỉ có lương, nghỉ không lương, ghi chú.
- Salary settings: tiền tệ, lương tháng, công ngày, giờ mặc định, lương tăng ca, cách tính.
- Reports: tổng kết tháng, so sánh các tháng gần đây, copy summary.
- Settings: Vietnamese/English, light/dark/system theme, background, notifications, cleanup.
- Backend local-first: dữ liệu lưu trong H2 file database tại `./data/taskpay-db`.
- Không login, không analytics, không cloud dependency.

## Tech stack

- Java 21
- Spring Boot 3.3.5
- Spring Web
- Spring Data JPA
- H2 Database
- Bean Validation
- Vanilla HTML/CSS/JS PWA frontend

## Cấu trúc thư mục

```text
.
├── build.gradle
├── settings.gradle
├── src
│   ├── main
│   │   ├── java/com/taskpay
│   │   │   ├── config
│   │   │   ├── controller
│   │   │   ├── domain
│   │   │   ├── repository
│   │   │   └── service
│   │   └── resources
│   │       ├── application.yml
│   │       └── static
│   │           ├── index.html
│   │           ├── app.js
│   │           ├── styles.css
│   │           ├── manifest.webmanifest
│   │           └── service-worker.js
│   └── test/java/com/taskpay
└── README.md
```

## Yêu cầu môi trường

Cài:

- JDK 21
- Gradle không bắt buộc vì repo đã có Gradle Wrapper

Kiểm tra:

```bash
java -version
javac -version
```

## Chạy local

Windows:

```bash
.\gradlew.bat bootRun
```

macOS/Linux:

```bash
./gradlew bootRun
```

Mở app:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/api/health
```

H2 console:

```text
http://localhost:8080/h2-console
```

Thông tin kết nối H2:

```text
JDBC URL: jdbc:h2:file:./data/taskpay-db;DB_CLOSE_ON_EXIT=FALSE
User: sa
Password: để trống
```

## Build

Windows:

```bash
.\gradlew.bat clean build
```

macOS/Linux:

```bash
./gradlew clean build
```

File jar sau khi build:

```text
build/libs/taskpay-1.0.0.jar
```

Chạy jar:

```bash
java -jar build/libs/taskpay-1.0.0.jar
```

## Test

Windows:

```bash
.\gradlew.bat test
```

macOS/Linux:

```bash
./gradlew test
```

## API chính

```text
GET    /api/health

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
PATCH  /api/tasks/{id}/toggle
DELETE /api/tasks/{id}
DELETE /api/tasks/completed?months=6

GET    /api/categories
POST   /api/categories

GET    /api/settings/app
PUT    /api/settings/app
GET    /api/settings/salary
PUT    /api/settings/salary

GET    /api/work-days?monthKey=2026-06
PUT    /api/work-days/{yyyy-MM-dd}
DELETE /api/work-days/{yyyy-MM-dd}

GET    /api/reports/monthly?monthKey=2026-06
```

## Cấu hình

Các biến môi trường thường dùng:

```bash
PORT=8080
TASKPAY_CORS_ORIGINS=http://localhost:8080,http://localhost:4173
```

Nếu muốn đổi nơi lưu database, sửa `spring.datasource.url` trong `src/main/resources/application.yml`.

## Đăng lên GitHub

Từ thư mục project:

```bash
git init
git add .
git commit -m "Initial TaskPay Spring Boot app"
```

Tạo repo mới trên GitHub, ví dụ `taskpay-spring-boot`, rồi chạy:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/taskpay-spring-boot.git
git push -u origin main
```

Nếu dùng GitHub CLI:

```bash
gh repo create taskpay-spring-boot --public --source=. --remote=origin --push
```

## Ghi chú Android

Repo này là Spring Boot + PWA. Trên Android có thể mở `http://<server-ip>:8080` bằng Chrome và chọn **Add to Home screen** để dùng như app cài đặt.

Nếu cần APK native thật, hướng tiếp theo là thêm một Android WebView/Capacitor wrapper trỏ tới frontend hoặc port UI sang Flutter/React Native. Backend Spring Boot hiện đã sẵn sàng để app Android gọi qua REST API.

## Reset dữ liệu local

Dừng app, xóa thư mục:

```text
data/
```

Sau đó chạy lại `gradle bootRun`, app sẽ seed lại settings và danh mục mặc định.
