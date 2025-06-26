# TOCFL Chinese Learning App

Ứng dụng học tiếng Trung với cấu trúc module hóa.

## Cấu trúc thư mục

```
tocfl/
├── index.html              # File HTML chính
├── styles.css              # File CSS chính chứa tất cả styles
├── data.js                 # Dữ liệu bài học (lessons)
├── app.js                  # Logic ứng dụng chính (ChineseApp class)
├── renderers/              # Thư mục chứa các renderer
│   ├── dashboard.js        # Renderer cho Dashboard
│   ├── lessons.js          # Renderer cho Lessons
│   └── notebook.js         # Renderer cho Notebook
└── README.md              # File này
```

## Mô tả các file

### `index.html`
- File HTML chính với cấu trúc layout
- Chỉ chứa HTML và các script includes
- Không chứa CSS hay JavaScript inline

### `styles.css`
- Tất cả CSS variables, styles, animations
- Dark mode support
- Responsive design
- Accessibility features

### `data.js`
- Chứa `lessonsData` array với 15 bài học
- Mỗi bài học có từ vựng và ngữ pháp
- Dữ liệu được export thành global variable

### `app.js`
- `ChineseApp` class chính
- Quản lý state, navigation, localStorage
- Các utility functions (playAudio, toggleTheme, etc.)
- Khởi tạo các renderer classes

### `renderers/`
- Các class renderer riêng biệt cho từng view
- `DashboardRenderer`: Dashboard với charts, stats, progress
- `LessonsRenderer`: Danh sách bài học và chi tiết bài học
- `NotebookRenderer`: Sổ tay từ vựng đã lưu

## Tính năng chính

- 📊 Dashboard với thống kê chi tiết
- 📚 15 bài học TOCFL với từ vựng và ngữ pháp
- 📔 Sổ tay lưu từ vựng yêu thích
- ✍️ Luyện viết chữ Hán với canvas
- 🎧 Luyện nghe với audio
- 🎤 Luyện nói với speech recognition
- 📖 Từ điển tích hợp
- 🏆 Hệ thống thành tích và XP
- 🌙 Dark/Light mode
- 📱 Responsive design
- ♿ Accessibility support

## Cách khởi chạy

1. Mở `index.html` trong trình duyệt
2. Hoặc chạy local server:
   ```bash
   python -m http.server 8000
   # hoặc
   npx serve .
   ```

## Kiến trúc

Ứng dụng sử dụng kiến trúc modular với:
- **Separation of Concerns**: HTML, CSS, JS tách biệt
- **Component-based**: Mỗi view có renderer riêng
- **State Management**: Centralized state trong ChineseApp
- **Event-driven**: Event listeners và callbacks
- **Responsive**: Mobile-first design với Tailwind CSS 