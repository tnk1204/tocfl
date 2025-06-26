# Cấu trúc thư mục dự án TOCFL A1

## Frontend
/client
  /public
    /assets
      /audio      # File âm thanh phát âm
      /images     # Hình ảnh minh họa
      /icons      # Icon và logo
    /index.html
  /src
    /components   # React components
      /common     # Components dùng chung
      /layout     # Components layout
      /lessons    # Components bài học
      /vocabulary # Components từ vựng
      /grammar    # Components ngữ pháp
      /exercises  # Components bài tập
      /flashcards # Components thẻ ghi nhớ
      /tests      # Components đề thi
    /pages        # Các trang chính
    /context      # React context
    /hooks        # Custom hooks
    /redux        # Redux store
      /actions
      /reducers
      /slices
    /services     # API services
    /utils        # Utility functions
    /styles       # Global styles
    /routes       # Định tuyến
    App.js
    index.js

## Backend
/server
  /config        # Cấu hình
  /controllers   # Xử lý logic
  /middleware    # Middleware
  /models        # Mô hình dữ liệu
  /routes        # Định tuyến API
  /services      # Services
  /utils         # Utility functions
  /db            # Database scripts
    /migrations
    /seeders
  server.js

## Shared
/shared
  /constants     # Hằng số dùng chung
  /types         # Type definitions
  /utils         # Utility functions dùng chung

## Documentation
/docs
  /api           # API documentation
  /database      # Database schema
  /wireframes    # UI wireframes
  /user-guide    # User guide

## Configuration
.env.example     # Environment variables example
.gitignore       # Git ignore file
package.json     # Project dependencies
README.md        # Project documentation 