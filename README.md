# TOCFL A1 - Nền tảng học tiếng Trung cho người mới bắt đầu

![TOCFL A1 Logo](./client/public/assets/icons/logo.png)

Nền tảng học tiếng Trung hiện đại giúp bạn chinh phục kỳ thi TOCFL A1 với phương pháp học tập hiệu quả.

## Tính năng nổi bật

### 1. Học từ vựng thông minh
- Hệ thống thẻ ghi nhớ với công nghệ spaced repetition
- Phát âm chuẩn với nhiều giọng đọc
- Nhận dạng chữ Hán qua vẽ
- Trò chơi từ vựng tương tác

### 2. Luyện ngữ pháp hiệu quả
- Bài giảng trực quan với hình ảnh minh họa
- Bài tập tương tác với phản hồi tức thì
- Theo dõi tiến độ học tập chi tiết

### 3. Luyện thi TOCFL A1
- Đề thi thử mô phỏng đề thi thật
- Phân tích điểm mạnh/yếu
- Hướng dẫn chiến lược làm bài thi

### 4. Cộng đồng học tập
- Diễn đàn hỏi đáp
- Nhóm học tập
- Bảng xếp hạng tiến độ

## Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (v14.0.0 trở lên)
- npm (v6.0.0 trở lên)
- PostgreSQL (v12.0 trở lên)

### Cài đặt
1. Clone dự án về máy
```bash
git clone https://github.com/your-username/tocfl-a1.git
cd tocfl-a1
```

2. Cài đặt các dependencies cho backend
```bash
cd server
npm install
```

3. Cài đặt các dependencies cho frontend
```bash
cd ../client
npm install
```

4. Tạo file .env trong thư mục server và cấu hình các biến môi trường
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://username:password@localhost:5432/tocfl
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
```

5. Tạo cơ sở dữ liệu và chạy migration
```bash
cd ../server
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Chạy dự án
1. Chạy backend server
```bash
cd server
npm run dev
```

2. Chạy frontend development server
```bash
cd client
npm start
```

3. Truy cập ứng dụng tại http://localhost:3000

## Công nghệ sử dụng

### Frontend
- React.js
- Redux
- Ant Design
- Styled Components
- Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT Authentication

### DevOps
- Docker
- AWS (EC2, S3, RDS)
- GitHub Actions

## Đóng góp
Chúng tôi rất hoan nghênh mọi đóng góp cho dự án. Vui lòng làm theo các bước sau:
1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## Giấy phép
Dự án được phân phối theo giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## Liên hệ
- Email: contact@tocfl-a1.com
- Website: https://tocfl-a1.com
- Facebook: https://facebook.com/tocfla1 