# Ứng dụng Ôn tập Từ vựng TOCFL A1

Ứng dụng học từ vựng tiếng Trung dành cho kỳ thi TOCFL A1, được phát triển với các chức năng học tập thông minh và giao diện hiện đại.

## 🚀 Tính năng chính

### 1. **Ôn tập thông minh (SRS - Spaced Repetition System)**
- Hệ thống ôn tập dựa trên thuật toán SM-2
- Tự động lên lịch ôn tập dựa trên mức độ khó dễ
- Đánh giá mức độ nhớ từ (Khó/Vừa/Dễ)
- Theo dõi tiến độ học tập

### 2. **Luyện tập đa dạng**
- **Chữ Hán → Nghĩa**: Nhìn chữ Hán chọn nghĩa
- **Pinyin → Nghĩa**: Nhìn pinyin chọn nghĩa
- **Nghĩa → Chữ Hán**: Nhìn nghĩa chọn chữ Hán
- **Nghe & Chọn Nghĩa**: Nghe phát âm chọn nghĩa
- **Chữ Hán → Pinyin**: Nhìn chữ Hán chọn pinyin
- **Nghe hiểu**: Nghe và chọn từ phù hợp
- **Đọc hiểu**: Đọc câu và chọn nghĩa phù hợp

### 3. **Học từ vựng nâng cao**
- Flashcard với giao diện đẹp
- Phát âm với 3 tốc độ (Chậm/Bình thường/Nhanh)
- Ghi chú cá nhân cho từng từ
- Thống kê học tập chi tiết
- Điều hướng dễ dàng giữa các từ

### 4. **Phát âm cải tiến**
- Sử dụng Web Speech API
- Tự động tìm giọng đọc tiếng Trung
- 3 tốc độ phát âm khác nhau
- Chất lượng âm thanh tốt

### 5. **Giao diện thân thiện**
- Thiết kế responsive
- Hiệu ứng chuyển động mượt mà
- Giao diện tối ưu cho mobile
- Màu sắc hài hòa

## 📱 Cách sử dụng

### Bắt đầu học
1. Mở file `index.html` trong trình duyệt
2. Chọn bài học từ dropdown "Lọc"
3. Sử dụng thanh tìm kiếm để tìm từ cụ thể

### Ôn tập thông minh
1. Nhấn nút **"Ôn tập"** (màu xanh lá)
2. Nhấn vào thẻ để xem đáp án
3. Đánh giá mức độ nhớ: **Khó** (đỏ) / **Vừa** (vàng) / **Dễ** (xanh)
4. Hệ thống sẽ tự động lên lịch ôn tập

### Luyện tập
1. Nhấn nút **"Luyện tập"** (màu xanh dương)
2. Chọn hình thức luyện tập
3. Chọn nguồn từ vựng (từ đang lọc hoặc tất cả)
4. Trả lời 10 câu hỏi
5. Xem kết quả và ôn lại câu sai

### Học từ vựng nâng cao
1. Nhấn nút **"Từ vựng"** (màu tím)
2. Sử dụng nút điều hướng để chuyển từ
3. Nhấn nút phát âm với tốc độ mong muốn
4. Ghi chú cá nhân cho từng từ
5. Xem thống kê học tập

### Phát âm
- Nhấn nút 🔊 trên thẻ từ vựng
- Trong chế độ học từ vựng: chọn tốc độ phát âm
- Trong bài luyện tập: nhấn nút replay để nghe lại

## 🎯 Lợi ích học tập

### Phương pháp SRS
- Tối ưu hóa thời gian ôn tập
- Tăng cường trí nhớ dài hạn
- Giảm thiểu việc quên từ

### Đa dạng bài tập
- Rèn luyện kỹ năng nghe hiểu
- Cải thiện khả năng đọc hiểu
- Luyện tập phát âm chính xác

### Theo dõi tiến độ
- Thống kê số từ đã học
- Tỷ lệ thành thạo
- Số từ cần ôn tập

## 🔧 Cài đặt và chạy

### Yêu cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Hỗ trợ Web Speech API cho phát âm

### Cách chạy
1. Tải về tất cả file
2. Mở file `index.html` trong trình duyệt
3. Bắt đầu học!

### Lưu trữ dữ liệu
- Dữ liệu được lưu trong localStorage của trình duyệt
- Bao gồm: tiến độ SRS, ghi chú cá nhân
- Dữ liệu sẽ được giữ lại khi đóng/mở lại trình duyệt

## 📊 Cấu trúc dữ liệu

### Từ vựng (data.js)
```javascript
{
  lesson: 1,
  char: '你',
  pinyin: 'nǐ',
  meaning: 'Bạn, anh, chị, em'
}
```

### Dữ liệu SRS (localStorage)
```javascript
{
  "你_1": {
    interval: 6,
    repetitions: 2,
    easeFactor: 2.5,
    nextReviewDate: 1234567890
  }
}
```

### Ghi chú cá nhân (localStorage)
```javascript
{
  "你_1": "Ghi chú về từ này..."
}
```

## 🎨 Tùy chỉnh

### Thêm từ vựng mới
1. Mở file `data.js`
2. Thêm từ mới vào mảng `vocabData`
3. Lưu file và refresh trang

### Thay đổi giao diện
1. Chỉnh sửa file `style.css`
2. Sử dụng Tailwind CSS classes trong HTML
3. Thêm hiệu ứng CSS tùy chỉnh

## 🚀 Tính năng nâng cao

### Phát triển trong tương lai
- [ ] Thêm bài tập viết chữ Hán
- [ ] Tích hợp với API phát âm chất lượng cao
- [ ] Thêm chế độ học theo chủ đề
- [ ] Xuất/nhập dữ liệu học tập
- [ ] Thêm bài tập ngữ pháp
- [ ] Tích hợp với cơ sở dữ liệu từ vựng lớn hơn

## 📞 Hỗ trợ

Nếu gặp vấn đề hoặc có góp ý, vui lòng:
1. Kiểm tra console của trình duyệt để xem lỗi
2. Đảm bảo trình duyệt hỗ trợ Web Speech API
3. Thử refresh trang hoặc xóa cache

## 📄 Giấy phép

Dự án này được phát triển cho mục đích học tập và sử dụng cá nhân.

---

**Chúc bạn học tập hiệu quả! 🎓** 