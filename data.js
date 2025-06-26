const lessonsData = [
    {
        id: 1,
        title: "Bài 1: 歡迎你來臺灣！",
        vocab: [
            { char: "歡迎", pinyin: "huānyíng", viet: "Hoan nghênh" }, 
            { char: "你", pinyin: "nǐ", viet: "Bạn" }, 
            { char: "來", pinyin: "lái", viet: "Đến" }, 
            { char: "臺灣", pinyin: "Táiwān", viet: "Đài Loan" }, 
            { char: "請問", pinyin: "qǐngwèn", viet: "Xin hỏi" }, 
            { char: "是", pinyin: "shì", viet: "Là" }, 
            { char: "小姐", pinyin: "xiǎojiě", viet: "Cô, tiểu thư" }, 
            { char: "嗎", pinyin: "ma", viet: "(Trợ từ nghi vấn) phải không?" }, 
            { char: "謝謝", pinyin: "xièxie", viet: "Cảm ơn" }, 
            { char: "接", pinyin: "jiē", viet: "Đón" }, 
            { char: "我們", pinyin: "wǒmen", viet: "Chúng tôi, chúng ta" }, 
            { char: "不客氣", pinyin: "búkèqi", viet: "Đừng khách sáo" }, 
            { char: "我", pinyin: "wǒ", viet: "Tôi" }, 
            { char: "這", pinyin: "zhè", viet: "Đây, này" }, 
            { char: "先生", pinyin: "xiānshēng", viet: "Ông, ngài, tiên sinh" }, 
            { char: "好", pinyin: "hǎo", viet: "Tốt, khỏe" }, 
            { char: "姓", pinyin: "xìng", viet: "Mang họ, họ là" }, 
            { char: "叫", pinyin: "jiào", viet: "Tên là, gọi là" }, 
            { char: "你們", pinyin: "nǐmen", viet: "Các bạn" }, 
            { char: "請", pinyin: "qǐng", viet: "Mời" }, 
            { char: "喝", pinyin: "hē", viet: "Uống" }, 
            { char: "茶", pinyin: "chá", viet: "Trà" }, 
            { char: "很", pinyin: "hěn", viet: "Rất" }, 
            { char: "好喝", pinyin: "hǎohē", viet: "Ngon (dùng cho đồ uống)" }, 
            { char: "什麼", pinyin: "shénme", viet: "Cái gì" }, 
            { char: "人", pinyin: "rén", viet: "Người" }, 
            { char: "喜歡", pinyin: "xǐhuān", viet: "Thích" }, 
            { char: "呢", pinyin: "ne", viet: "(Trợ từ nghi vấn) còn...thì sao?" }, 
            { char: "他", pinyin: "tā", viet: "Anh ấy, ông ấy" }, 
            { char: "不", pinyin: "bù", viet: "Không" }, 
            { char: "哪", pinyin: "nǎ", viet: "Nào" }, 
            { char: "要", pinyin: "yào", viet: "Muốn" }, 
            { char: "咖啡", pinyin: "kāfēi", viet: "Cà phê" }, 
            { char: "對不起", pinyin: "duìbùqǐ", viet: "Xin lỗi" }, 
            { char: "國", pinyin: "guó", viet: "Nước, quốc gia" }, 
            { char: "美國", pinyin: "Měiguó", viet: "Nước Mỹ" }, 
            { char: "日本", pinyin: "Rìběn", viet: "Nhật Bản" }, 
            { char: "烏龍茶", pinyin: "Wūlóng chá", viet: "Trà Ô Long" }
        ],
        grammar: [
            { title: "Các cách đặt câu hỏi", content: "Có hai cách chính: <br>1. <b>A-not-A (Chính-Phản):</b> Động từ/Tính từ + 不 + Động từ/Tính từ? (Ví dụ: 你是不是臺灣人？) <br>2. <b>Với 嗎 (ma):</b> Câu trần thuật + 嗎? (Ví dụ: 你是臺灣人嗎？)" }, 
            { title: "Cách trả lời câu hỏi", content: "1. <b>Khẳng định:</b> Lặp lại động từ chính. (Ví dụ: A: 你喜歡臺灣嗎？ B: 喜歡。) <br>2. <b>Phủ định:</b> Dùng 不 + Động từ. (Ví dụ: A: 你喝咖啡嗎？ B: 不喝。)" }, 
            { title: "Phó từ chỉ mức độ 很 (hěn)", content: "Thường đứng trước tính từ để bổ nghĩa, nhưng đôi khi chỉ để hoàn thành cấu trúc câu mà không mang nghĩa 'rất'." }, 
            { title: "Câu hỏi tỉnh lược với 呢 (ne)", content: "Dùng để hỏi lại về một đối tượng khác trong cùng một ngữ cảnh. (Ví dụ: 我喝茶，你呢？)" }
        ]
    },
    {
        id: 2,
        title: "Bài 2: 我的家人",
        vocab: [
            { char: "的", pinyin: "de", viet: "Của" }, 
            { char: "家", pinyin: "jiā", viet: "Nhà, gia đình" }, 
            { char: "家人", pinyin: "jiārén", viet: "Người nhà" }, 
            { char: "漂亮", pinyin: "piàoliàng", viet: "Xinh đẹp" }, 
            { char: "房子", pinyin: "fángzi", viet: "Ngôi nhà" }, 
            { char: "坐", pinyin: "zuò", viet: "Ngồi" }, 
            { char: "有", pinyin: "yǒu", viet: "Có" }, 
            { char: "多", pinyin: "duō", viet: "Nhiều" }, 
            { char: "照片", pinyin: "zhàopiàn", viet: "Bức ảnh" }, 
            { char: "都", pinyin: "dōu", viet: "Đều" }, 
            { char: "照相", pinyin: "zhàoxiàng", viet: "Chụp ảnh" }, 
            { char: "張", pinyin: "zhāng", viet: "(Lượng từ) tấm, tờ" }, 
            { char: "好看", pinyin: "hǎokàn", viet: "Đẹp, ưa nhìn" }, 
            { char: "誰", pinyin: "shéi", viet: "Ai" }, 
            { char: "姐姐", pinyin: "jiějie", viet: "Chị gái" }, 
            { char: "妹妹", pinyin: "mèimei", viet: "Em gái" }, 
            { char: "爸爸", pinyin: "bàba", viet: "Bố" }, 
            { char: "媽媽", pinyin: "māma", viet: "Mẹ" }, 
            { char: "請進", pinyin: "qǐng jìn", viet: "Mời vào" }, 
            { char: "伯母", pinyin: "bómǔ", viet: "Bác gái" }, 
            { char: "您", pinyin: "nín", viet: "Ngài, ông, bà (kính trọng)" }, 
            { char: "名字", pinyin: "míngzi", viet: "Tên" }, 
            { char: "書", pinyin: "shū", viet: "Sách" }, 
            { char: "哥哥", pinyin: "gēge", viet: "Anh trai" }, 
            { char: "老師", pinyin: "lǎoshī", viet: "Giáo viên" }, 
            { char: "看書", pinyin: "kànshū", viet: "Đọc sách" }, 
            { char: "幾", pinyin: "jǐ", viet: "Mấy" }, 
            { char: "個", pinyin: "ge", viet: "(Lượng từ) cái, người" }, 
            { char: "沒", pinyin: "méi", viet: "Không (dùng với 有)" }, 
            { char: "兄弟", pinyin: "xiōngdì", viet: "Anh em trai" }, 
            { char: "姐妹", pinyin: "jiěmèi", viet: "Chị em gái" }, 
            { char: "五", pinyin: "wǔ", viet: "Năm (số 5)" }, 
            { char: "兩", pinyin: "liǎng", viet: "Hai (dùng trước lượng từ)" }
        ],
        grammar: [
            { title: "Sở hữu cách với 的 (de)", content: "Cấu trúc: <b>Chủ sở hữu + 的 + Vật sở hữu</b>. (Ví dụ: 我的書)." }, 
            { title: "Định ngữ với 的 (de)", content: "Cấu trúc: <b>Định ngữ + 的 + Danh từ</b>. (Ví dụ: 漂亮的房子)." }, 
            { title: "Câu tồn tại với 有 (yǒu)", content: "Cấu trúc: <b>Địa điểm + 有 + Sự vật</b>. (Ví dụ: 我家有很多照片)." }, 
            { title: "Phó từ 都 (dōu)", content: "Biểu thị 'tất cả', 'đều'. Thường đứng trước động từ. (Ví dụ: 我們都是學生)." }, 
            { title: "Lượng từ", content: "Cấu trúc: <b>Số từ + Lượng từ + Danh từ</b>. (Ví dụ: 一張照片; 兩個人)." }
        ]
    },
    // ... continue with remaining lessons data
    // (I'll include a few more lessons to show the pattern)
    {
        id: 3,
        title: "Bài 3: 週末做什麼？",
        vocab: [
            { char: "週末", pinyin: "zhōumò", viet: "Cuối tuần" }, 
            { char: "聽", pinyin: "tīng", viet: "Nghe" }, 
            { char: "音樂", pinyin: "yīnyuè", viet: "Âm nhạc" }, 
            { char: "運動", pinyin: "yùndòng", viet: "Vận động" }, 
            { char: "打", pinyin: "dǎ", viet: "Chơi, đánh" }, 
            { char: "網球", pinyin: "wǎngqiú", viet: "Quần vợt" }
            // ... more vocab
        ],
        grammar: [
            { title: "Vị trí của từ chỉ thời gian", content: "Thường đứng sau chủ ngữ và trước động từ. (Ví dụ: 我們明天去看電影)." }
            // ... more grammar
        ]
    }
    // ... additional lessons would continue here
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { lessonsData };
} 