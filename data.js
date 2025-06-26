const lessonsData = [
    {
        id: 1,
        title: "Bài 1: 歡迎你來臺灣！",
        subtitle: "Hoan nghênh bạn đến Đài Loan!",
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
            {
                title: "Các cách đặt câu hỏi",
                content: "A-not-A (Chính-Phản): Động từ/Tính từ + 不 + Động từ/Tính từ? (Ví dụ: 你是不是臺灣人？)\nVới 嗎 (ma): Câu trần thuật + 嗎? (Ví dụ: 你是臺灣人嗎？)"
            },
            {
                title: "Cách trả lời câu hỏi",
                content: "Khẳng định: Lặp lại động từ chính. (Ví dụ: A: 你喜歡臺灣嗎？ B: 喜歡。)\nPhủ định: Dùng 不 + Động từ. (Ví dụ: A: 你喝咖啡嗎？ B: 不喝。)"
            },
            {
                title: "Phó từ chỉ mức độ 很 (hěn)",
                content: "Thường đứng trước tính từ để bổ nghĩa. (Ví dụ: 很好 - hěn hǎo - rất tốt)"
            },
            {
                title: "Câu hỏi tỉnh lược với 呢 (ne)",
                content: "Dùng để hỏi lại về một đối tượng khác trong cùng một ngữ cảnh. (Ví dụ: 我喝茶，你呢？- Wǒ hē chá, nǐ ne? - Tôi uống trà, còn bạn thì sao?)"
            }
        ]
    },
    {
        id: 2,
        title: "Bài 2: 我的家人",
        subtitle: "Gia đình của tôi",
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
            {
                title: "Sở hữu cách với 的 (de)",
                content: "Chủ sở hữu + 的 + Vật sở hữu. (Ví dụ: 我的書 - wǒ de shū - sách của tôi)"
            },
            {
                title: "Định ngữ với 的 (de)",
                content: "Định ngữ + 的 + Danh từ. (Ví dụ: 漂亮的房子 - piàoliàng de fángzi - ngôi nhà xinh đẹp)"
            },
            {
                title: "Câu tồn tại với 有 (yǒu)",
                content: "Địa điểm + 有 + Sự vật. (Ví dụ: 我家有很多照片 - wǒ jiā yǒu hěn duō zhàopiàn)"
            },
            {
                title: "Phó từ 都 (dōu)",
                content: "Biểu thị 'tất cả', 'đều'. Thường đứng trước động từ. (Ví dụ: 我們都是學生 - wǒmen dōu shì xuéshēng)"
            },
            {
                title: "Lượng từ",
                content: "Số từ + Lượng từ + Danh từ. (Ví dụ: 一張照片 - yì zhāng zhàopiàn; 兩個人 - liǎng ge rén)"
            }
        ]
    },
    {
        id: 3,
        title: "Bài 3: 週末做什麼？",
        subtitle: "Cuối tuần làm gì?",
        vocab: [
            { char: "週末", pinyin: "zhōumò", viet: "Cuối tuần" },
            { char: "聽", pinyin: "tīng", viet: "Nghe" },
            { char: "音樂", pinyin: "yīnyuè", viet: "Âm nhạc" },
            { char: "運動", pinyin: "yùndòng", viet: "Vận động, thể thao" },
            { char: "打", pinyin: "dǎ", viet: "Chơi, đánh (thể thao dùng tay)" },
            { char: "網球", pinyin: "wǎngqiú", viet: "Quần vợt" },
            { char: "棒球", pinyin: "bàngqiú", viet: "Bóng chày" },
            { char: "和", pinyin: "hàn", viet: "Và" },
            { char: "游泳", pinyin: "yóuyǒng", viet: "Bơi lội" },
            { char: "常", pinyin: "cháng", viet: "Thường xuyên" },
            { char: "籃球", pinyin: "lánqiú", viet: "Bóng rổ" },
            { char: "也", pinyin: "yě", viet: "Cũng" },
            { char: "踢", pinyin: "tī", viet: "Đá (bóng)" },
            { char: "足球", pinyin: "zúqiú", viet: "Bóng đá" },
            { char: "覺得", pinyin: "juéde", viet: "Cảm thấy" },
            { char: "好玩", pinyin: "hǎowán", viet: "Vui, thú vị" },
            { char: "明天", pinyin: "míngtiān", viet: "Ngày mai" },
            { char: "早上", pinyin: "zǎoshàng", viet: "Buổi sáng" },
            { char: "去", pinyin: "qù", viet: "Đi" },
            { char: "怎麼樣", pinyin: "zěnmeyàng", viet: "Như thế nào?" },
            { char: "啊", pinyin: "a", viet: "(Trợ từ cuối câu)" },
            { char: "看", pinyin: "kàn", viet: "Xem" },
            { char: "電影", pinyin: "diànyǐng", viet: "Phim điện ảnh" },
            { char: "妳", pinyin: "nǐ", viet: "Bạn (dùng cho nữ)" },
            { char: "想", pinyin: "xiǎng", viet: "Muốn, nghĩ" },
            { char: "還是", pinyin: "háishì", viet: "Hay là (dùng trong câu hỏi lựa chọn)" },
            { char: "吧", pinyin: "ba", viet: "(Trợ từ cuối câu, biểu thị sự đề nghị)" },
            { char: "可以", pinyin: "kěyǐ", viet: "Có thể" },
            { char: "學", pinyin: "xué", viet: "Học" },
            { char: "中文", pinyin: "Zhōngwén", viet: "Tiếng Trung" },
            { char: "一起", pinyin: "yìqǐ", viet: "Cùng nhau" },
            { char: "吃", pinyin: "chī", viet: "Ăn" },
            { char: "晚飯", pinyin: "wǎnfàn", viet: "Bữa tối" },
            { char: "菜", pinyin: "cài", viet: "Món ăn, rau" },
            { char: "越南", pinyin: "Yuènán", viet: "Việt Nam" }
        ],
        grammar: [
            {
                title: "Vị trí của từ chỉ thời gian",
                content: "Thường đứng sau chủ ngữ và trước động từ. (Ví dụ: 我們明天去看電影)"
            },
            {
                title: "Đi làm gì với 去 (qù)",
                content: "去 + Động từ. (Ví dụ: 我去打網球 - Wǒ qù dǎ wǎngqiú)"
            },
            {
                title: "Câu chủ đề",
                content: "Đưa đối tượng muốn bình luận lên đầu câu làm chủ đề. (Ví dụ: 美國電影、臺灣電影，我都想看)"
            },
            {
                title: "Trật tự phó từ 也 (yě), 都 (dōu)",
                content: "也 thường đứng trước 都 và 常. (Ví dụ: 我常打籃球，也常踢足球)"
            },
            {
                title: "Đưa ra đề nghị với 吧 (ba)",
                content: "Câu trần thuật + 吧!. (Ví dụ: 我們看臺灣電影吧!)"
            }
        ]
    },
    {
        id: 4,
        title: "Bài 4: 請問一共多少錢？",
        subtitle: "Xin hỏi tổng cộng bao nhiêu tiền?",
        vocab: [
            { char: "一共", pinyin: "yígòng", viet: "Tổng cộng" },
            { char: "多少", pinyin: "duōshǎo", viet: "Bao nhiêu" },
            { char: "錢", pinyin: "qián", viet: "Tiền" },
            { char: "老闆", pinyin: "lǎobǎn", viet: "Ông chủ" },
            { char: "買", pinyin: "mǎi", viet: "Mua" },
            { char: "杯", pinyin: "bēi", viet: "Cốc, ly (lượng từ)" },
            { char: "熱", pinyin: "rè", viet: "Nóng" },
            { char: "包子", pinyin: "bāozi", viet: "Bánh bao" },
            { char: "大", pinyin: "dà", viet: "To, lớn" },
            { char: "中", pinyin: "zhōng", viet: "Vừa (size)" },
            { char: "小", pinyin: "xiǎo", viet: "Nhỏ" },
            { char: "幫", pinyin: "bāng", viet: "Giúp đỡ" },
            { char: "微波", pinyin: "wéibō", viet: "Vi sóng" },
            { char: "百", pinyin: "bǎi", viet: "Trăm" },
            { char: "塊", pinyin: "kuài", viet: "Đồng (tiền tệ)" },
            { char: "外帶", pinyin: "wàidài", viet: "Mang đi" },
            { char: "內用", pinyin: "nèiyòng", viet: "Dùng tại chỗ" },
            { char: "支", pinyin: "zhī", viet: "Chiếc (lượng từ cho vật dài, cứng như bút, điện thoại)" },
            { char: "新", pinyin: "xīn", viet: "Mới" },
            { char: "手機", pinyin: "shǒujī", viet: "Điện thoại di động" },
            { char: "太", pinyin: "tài", viet: "Quá" },
            { char: "舊", pinyin: "jiù", viet: "Cũ" },
            { char: "了", pinyin: "le", viet: "(Trợ từ cuối câu)" },
            { char: "種", pinyin: "zhǒng", viet: "Loại, chủng loại" },
            { char: "能", pinyin: "néng", viet: "Có thể (về khả năng)" },
            { char: "上網", pinyin: "shàngwǎng", viet: "Lên mạng" },
            { char: "那", pinyin: "nà", viet: "Kia, đó" },
            { char: "貴", pinyin: "guì", viet: "Đắt" },
            { char: "賣", pinyin: "mài", viet: "Bán" },
            { char: "便宜", pinyin: "piányí", viet: "Rẻ" },
            { char: "萬", pinyin: "wàn", viet: "Vạn (mười nghìn)" },
            { char: "千", pinyin: "qiān", viet: "Nghìn" },
            { char: "為什麼", pinyin: "wèishénme", viet: "Tại sao" }
        ],
        grammar: [
            {
                title: "Lượng từ",
                content: "塊 (kuài), 杯 (bēi), 支 (zhī), 種 (zhǒng)"
            },
            {
                title: "Giới từ 幫 (bāng)",
                content: "幫 + Tân ngữ chỉ người + Động từ. (Ví dụ: 請幫我微波包子 - Mời giúp tôi vi sóng bánh bao)"
            },
            {
                title: "Lược bỏ Danh từ trung tâm sau 的 (de)",
                content: "Khi danh từ đã rõ, có thể lược bỏ. (Ví dụ: 我要新的 (手機))"
            },
            {
                title: "Cấu trúc 太...了 (tài...le)",
                content: "Biểu thị mức độ quá cao. (Ví dụ: 太貴了 - tài guì le - Đắt quá)"
            },
            {
                title: "Động từ năng nguyện 能 (néng)",
                content: "Biểu thị khả năng. (Ví dụ: 手機能上網)"
            },
            {
                title: "多 (duō) chỉ số lượng 'hơn'",
                content: "Số từ + 多 + Lượng từ + Danh từ. (Ví dụ: 一萬五千多塊 - Hơn 15000 đồng)"
            }
        ]
    },
    {
        id: 5,
        title: "Bài 5: 牛肉麵真好吃",
        subtitle: "Mì bò thật ngon",
        vocab: [
            { char: "牛肉", pinyin: "niúròu", viet: "Thịt bò" },
            { char: "麵", pinyin: "miàn", viet: "Mì" },
            { char: "真", pinyin: "zhēn", viet: "Thật là" },
            { char: "好吃", pinyin: "hǎochī", viet: "Ngon (dùng cho đồ ăn)" },
            { char: "說", pinyin: "shuō", viet: "Nói" },
            { char: "少", pinyin: "shǎo", viet: "Ít" },
            { char: "有名", pinyin: "yǒumíng", viet: "Nổi tiếng" },
            { char: "小吃", pinyin: "xiǎochī", viet: "Món ăn vặt, quà vặt" },
            { char: "最", pinyin: "zuì", viet: "Nhất" },
            { char: "湯", pinyin: "tāng", viet: "Canh, súp" },
            { char: "這麼", pinyin: "zhème", viet: "Như vậy" },
            { char: "知道", pinyin: "zhīdào", viet: "Biết" },
            { char: "家", pinyin: "jiā", viet: "(Lượng từ) cho cửa hàng, nhà hàng" },
            { char: "店", pinyin: "diàn", viet: "Cửa hàng" },
            { char: "一定", pinyin: "yídìng", viet: "Nhất định" },
            { char: "點", pinyin: "diǎn", viet: "Gọi món" },
            { char: "碗", pinyin: "wǎn", viet: "Bát, chén (lượng từ)" },
            { char: "小籠包", pinyin: "xiǎolóngbāo", viet: "Tiểu long bao" },
            { char: "臭豆腐", pinyin: "chòudòufu", viet: "Đậu phụ thối" },
            { char: "昨天", pinyin: "zuótiān", viet: "Hôm qua" },
            { char: "餐廳", pinyin: "cāntīng", viet: "Nhà hàng" },
            { char: "可是", pinyin: "kěshì", viet: "Nhưng" },
            { char: "辣", pinyin: "là", viet: "Cay" },
            { char: "怕", pinyin: "pà", viet: "Sợ" },
            { char: "所以", pinyin: "suǒyǐ", viet: "Cho nên" },
            { char: "自己", pinyin: "zìjǐ", viet: "Tự mình" },
            { char: "做飯", pinyin: "zuòfàn", viet: "Nấu cơm" },
            { char: "得", pinyin: "de", viet: "(Bổ ngữ trạng thái)" },
            { char: "會", pinyin: "huì", viet: "Biết (thông qua học tập)" },
            { char: "甜點", pinyin: "tiándiǎn", viet: "Đồ ngọt, tráng miệng" },
            { char: "不錯", pinyin: "búcuò", viet: "Không tệ, tốt" },
            { char: "教", pinyin: "jiāo", viet: "Dạy" },
            { char: "到", pinyin: "dào", viet: "Đến" }
        ],
        grammar: [
            {
                title: "有一點 (yǒu yìdiǎn)",
                content: "有一點 + Tính từ, biểu thị một chút (thường mang nghĩa tiêu cực). (Ví dụ: 有一點辣 - hơi cay một chút)"
            },
            {
                title: "Bổ ngữ trạng thái 得 (de)",
                content: "Động từ + 得 + Tính từ/Trạng từ để miêu tả trạng thái của hành động. (Ví dụ: 他做得很好 - Anh ấy làm rất tốt)"
            },
            {
                title: "Động từ năng nguyện 會 (huì)",
                content: "Biểu thị kỹ năng có được qua học tập. (Ví dụ: 我會做飯 - Tôi biết nấu cơm)"
            },
            {
                title: "Giới từ 到 (dào)",
                content: "Biểu thị điểm đến. (Ví dụ: 你到我家來 - Bạn đến nhà tôi đi)"
            }
        ]
    },
    {
        id: 6,
        title: "Bài 6: 他們學校在山上",
        subtitle: "Trường họ ở trên núi",
        vocab: [
            { char: "他們", pinyin: "tāmen", viet: "Bọn họ" },
            { char: "學校", pinyin: "xuéxiào", viet: "Trường học" },
            { char: "在", pinyin: "zài", viet: "Ở tại" },
            { char: "山上", pinyin: "shānshàng", viet: "Trên núi" },
            { char: "哪裡", pinyin: "nǎlǐ", viet: "Ở đâu" },
            { char: "遠", pinyin: "yuǎn", viet: "Xa" },
            { char: "那裡", pinyin: "nàlǐ", viet: "Ở đó" },
            { char: "風景", pinyin: "fēngjǐng", viet: "Phong cảnh" },
            { char: "美", pinyin: "měi", viet: "Đẹp" },
            { char: "前面", pinyin: "qiánmiàn", viet: "Phía trước" },
            { char: "海", pinyin: "hǎi", viet: "Biển" },
            { char: "後面", pinyin: "hòumiàn", viet: "Phía sau" },
            { char: "山", pinyin: "shān", viet: "Núi" },
            { char: "真的", pinyin: "zhēnde", viet: "Thật sự" },
            { char: "地方", pinyin: "dìfang", viet: "Nơi, chỗ" },
            { char: "現在", pinyin: "xiànzài", viet: "Bây giờ" },
            { char: "附近", pinyin: "fùjìn", viet: "Gần đây, lân cận" },
            { char: "樓下", pinyin: "lóuxià", viet: "Dưới lầu" },
            { char: "找", pinyin: "zhǎo", viet: "Tìm" },
            { char: "朋友", pinyin: "péngyou", viet: "Bạn bè" },
            { char: "上課", pinyin: "shàngkè", viet: "Lên lớp, đi học" },
            { char: "近", pinyin: "jìn", viet: "Gần" },
            { char: "方便", pinyin: "fāngbiàn", viet: "Thuận tiện" },
            { char: "東西", pinyin: "dōngxi", viet: "Đồ đạc" },
            { char: "外面", pinyin: "wàimiàn", viet: "Bên ngoài" },
            { char: "裡面", pinyin: "lǐmiàn", viet: "Bên trong" },
            { char: "商店", pinyin: "shāngdiàn", viet: "Cửa hàng" },
            { char: "宿舍", pinyin: "sùshè", viet: "Ký túc xá" },
            { char: "樓", pinyin: "lóu", viet: "Tầng, lầu" },
            { char: "棟", pinyin: "dòng", viet: "Tòa (lượng từ cho tòa nhà)" },
            { char: "大樓", pinyin: "dàlóu", viet: "Tòa nhà lớn" },
            { char: "圖書館", pinyin: "túshūguǎn", viet: "Thư viện" },
            { char: "旁邊", pinyin: "pángbiān", viet: "Bên cạnh" },
            { char: "教室", pinyin: "jiàoshì", viet: "Phòng học" },
            { char: "游泳池", pinyin: "yóuyǒngchí", viet: "Bể bơi" }
        ],
        grammar: [
            {
                title: "Biểu thị vị trí với 在 (zài)",
                content: "Sự vật + 在 + Địa điểm"
            },
            {
                title: "Câu tồn tại với 有 (yǒu)",
                content: "Địa điểm + 有 + Sự vật"
            },
            {
                title: "Lặp lại động từ (V-V)",
                content: "Biểu thị hành động diễn ra trong thời gian ngắn, thử làm gì đó. (Ví dụ: 我想去看看 - Wǒ xiǎng qù kànkan)"
            },
            {
                title: "Phủ định với 不是 (búshì)",
                content: "Dùng để phủ nhận một sự thật hoặc một nhận định đã nêu"
            },
            {
                title: "Vị trí của hành động",
                content: "Chủ ngữ + 在 + Địa điểm + Động từ. (Ví dụ: 我在家看書 - Wǒ zài jiā kàn shū)"
            }
        ]
    },
    {
        id: 7,
        title: "Bài 7: 早上九點去KTV",
        subtitle: "9 giờ sáng đi KTV",
        vocab: [
            { char: "點", pinyin: "diǎn", viet: "Giờ (chỉ thời gian)" },
            { char: "KTV", pinyin: "KTV", viet: "Karaoke" },
            { char: "唱歌", pinyin: "chànggē", viet: "Hát" },
            { char: "分", pinyin: "fēn", viet: "Phút" },
            { char: "見面", pinyin: "jiànmiàn", viet: "Gặp mặt" },
            { char: "從", pinyin: "cóng", viet: "Từ" },
            { char: "中午", pinyin: "zhōngwǔ", viet: "Buổi trưa" },
            { char: "得", pinyin: "děi", viet: "Phải (làm gì)" },
            { char: "銀行", pinyin: "yínháng", viet: "Ngân hàng" },
            { char: "時候", pinyin: "shíhou", viet: "Lúc, khi" },
            { char: "後天", pinyin: "hòutiān", viet: "Ngày kia" },
            { char: "再見", pinyin: "zàijiàn", viet: "Tạm biệt" },
            { char: "午餐", pinyin: "wǔcān", viet: "Bữa trưa" },
            { char: "剛", pinyin: "gāng", viet: "Vừa mới" },
            { char: "下課", pinyin: "xiàkè", viet: "Tan học" },
            { char: "下午", pinyin: "xiàwǔ", viet: "Buổi chiều" },
            { char: "半", pinyin: "bàn", viet: "Rưỡi, nửa" },
            { char: "比賽", pinyin: "bǐsài", viet: "Cuộc thi, trận đấu" },
            { char: "結束", pinyin: "jiéshù", viet: "Kết thúc" },
            { char: "最近", pinyin: "zuìjìn", viet: "Gần đây" },
            { char: "忙", pinyin: "máng", viet: "Bận rộn" },
            { char: "每", pinyin: "měi", viet: "Mỗi" },
            { char: "天", pinyin: "tiān", viet: "Ngày" },
            { char: "書法", pinyin: "shūfǎ", viet: "Thư pháp" },
            { char: "課", pinyin: "kè", viet: "Môn học, bài học" },
            { char: "開始", pinyin: "kāishǐ", viet: "Bắt đầu" },
            { char: "字", pinyin: "zì", viet: "Chữ" },
            { char: "寫", pinyin: "xiě", viet: "Viết" },
            { char: "問", pinyin: "wèn", viet: "Hỏi" }
        ],
        grammar: [
            {
                title: "Thứ tự thời gian và địa điểm",
                content: "Chủ ngữ + Thời gian + Địa điểm + Động từ"
            },
            {
                title: "Cấu trúc 從...到... (cóng...dào...)",
                content: "Từ...đến... (chỉ không gian hoặc thời gian)"
            },
            {
                title: "Hành động tiếp diễn với 在 (zài)",
                content: "在 + Động từ, biểu thị hành động đang diễn ra"
            },
            {
                title: "每 (měi)",
                content: "Mỗi, thường đi kèm với 都 (dōu). (Ví dụ: 我每天都運動)"
            },
            {
                title: "可以 (kěyǐ)",
                content: "Có thể (xin phép)"
            }
        ]
    },
    {
        id: 8,
        title: "Bài 8: 坐火車去臺南",
        subtitle: "Ngồi tàu hỏa đi Đài Nam",
        vocab: [
            { char: "坐", pinyin: "zuò", viet: "Ngồi (phương tiện)" },
            { char: "火車", pinyin: "huǒchē", viet: "Tàu hỏa" },
            { char: "跟", pinyin: "gēn", viet: "Cùng với" },
            { char: "玩", pinyin: "wán", viet: "Chơi" },
            { char: "怎麼", pinyin: "zěnme", viet: "Như thế nào, làm sao" },
            { char: "慢", pinyin: "màn", viet: "Chậm" },
            { char: "鐘頭", pinyin: "zhōngtóu", viet: "Tiếng, giờ (khoảng thời gian)" },
            { char: "比較", pinyin: "bǐjiào", viet: "Tương đối, hơn" },
            { char: "快", pinyin: "kuài", viet: "Nhanh" },
            { char: "車票", pinyin: "chēpiào", viet: "Vé xe" },
            { char: "非常", pinyin: "fēicháng", viet: "Vô cùng, rất" },
            { char: "但是", pinyin: "dànshì", viet: "Nhưng" },
            { char: "又", pinyin: "yòu", viet: "Vừa" },
            { char: "舒服", pinyin: "shūfu", viet: "Thoải mái" },
            { char: "站", pinyin: "zhàn", viet: "Trạm, ga" },
            { char: "或是", pinyin: "huòshì", viet: "Hoặc là" },
            { char: "同學", pinyin: "tóngxué", viet: "Bạn học" },
            { char: "參觀", pinyin: "cānguān", viet: "Tham quan" },
            { char: "古代", pinyin: "gǔdài", viet: "Cổ đại" },
            { char: "騎", pinyin: "qí", viet: "Cưỡi, đi (xe 2 bánh)" },
            { char: "機車", pinyin: "jīchē", viet: "Xe máy" },
            { char: "載", pinyin: "zài", viet: "Chở, đèo" },
            { char: "捷運", pinyin: "jiéyùn", viet: "Tàu điện ngầm (MRT)" },
            { char: "比", pinyin: "bǐ", viet: "So với (dùng trong câu so sánh)" },
            { char: "故宮", pinyin: "Gùgōng", viet: "Cố Cung" }
        ],
        grammar: [
            {
                title: "Đi cùng ai với 跟 (gēn)",
                content: "A 跟 B 一起 + Động từ"
            },
            {
                title: "Hỏi cách thức với 怎麼 (zěnme)",
                content: "怎麼 + Động từ?"
            },
            {
                title: "So sánh ngầm với 比較 (bǐjiào)",
                content: "Biểu thị mức độ 'hơn'. (Ví dụ: 這個比較好)"
            },
            {
                title: "Cấu trúc 又...又... (yòu...yòu...)",
                content: "Biểu thị hai đặc điểm/hành động cùng tồn tại"
            },
            {
                title: "Câu so sánh với 比 (bǐ)",
                content: "A 比 B + Tính từ"
            }
        ]
    },
    {
        id: 9,
        title: "Bài 9: 放假去哪裡玩？",
        subtitle: "Nghỉ lễ đi đâu chơi?",
        vocab: [
            { char: "放假", pinyin: "fàngjià", viet: "Nghỉ lễ, nghỉ phép" },
            { char: "星期", pinyin: "xīngqī", viet: "Tuần" },
            { char: "回國", pinyin: "huíguó", viet: "Về nước" },
            { char: "打算", pinyin: "dǎsuàn", viet: "Dự định" },
            { char: "電視", pinyin: "diànshì", viet: "Ti vi" },
            { char: "影片", pinyin: "yǐngpiàn", viet: "Phim, video" },
            { char: "旅行", pinyin: "lǚxíng", viet: "Du lịch" },
            { char: "功課", pinyin: "gōngkè", viet: "Bài tập về nhà" },
            { char: "出去", pinyin: "chūqù", viet: "Đi ra ngoài" },
            { char: "大概", pinyin: "dàgài", viet: "Khoảng, đại khái" },
            { char: "有時候", pinyin: "yǒushíhou", viet: "Có lúc, thỉnh thoảng" },
            { char: "多久", pinyin: "duō jiǔ", viet: "Bao lâu" },
            { char: "女", pinyin: "nǚ", viet: "Nữ" },
            { char: "月", pinyin: "yuè", viet: "Tháng" },
            { char: "號", pinyin: "hào", viet: "Ngày" },
            { char: "帶", pinyin: "dài", viet: "Mang, dắt" },
            { char: "她", pinyin: "tā", viet: "Cô ấy" },
            { char: "還", pinyin: "hái", viet: "Vẫn, còn" },
            { char: "建議", pinyin: "jiànyì", viet: "Gợi ý, đề nghị" },
            { char: "夜市", pinyin: "yèshì", viet: "Chợ đêm" },
            { char: "應該", pinyin: "yīnggāi", viet: "Nên" },
            { char: "逛", pinyin: "guàng", viet: "Dạo chơi" },
            { char: "特別", pinyin: "tèbié", viet: "Đặc biệt" },
            { char: "茶館", pinyin: "cháguǎn", viet: "Quán trà" },
            { char: "決定", pinyin: "juédìng", viet: "Quyết định" },
            { char: "要是", pinyin: "yàoshi", viet: "Nếu" },
            { char: "就", pinyin: "jiù", viet: "Thì, liền" }
        ],
        grammar: [
            {
                title: "Phân biệt Thời điểm và Thời đoạn",
                content: "Thời điểm (time-when) chỉ một mốc thời gian. Thời đoạn (time-duration) chỉ một khoảng thời gian"
            },
            {
                title: "Cấu trúc ...的時候 (de shíhou)",
                content: "Khi... (Ví dụ: 放假的時候 - Lúc nghỉ lễ)"
            },
            {
                title: "Cấu trúc 有時候...有時候...",
                content: "Lúc thì... lúc thì..."
            },
            {
                title: "Câu điều kiện 要是...就... (yàoshi...jiù...)",
                content: "Nếu...thì..."
            }
        ]
    },
    {
        id: 10,
        title: "Bài 10: 臺灣的水果很好吃",
        subtitle: "Trái cây Đài Loan rất ngon",
        vocab: [
            { char: "水果", pinyin: "shuǐguǒ", viet: "Trái cây" },
            { char: "黃色", pinyin: "huángsè", viet: "Màu vàng" },
            { char: "芒果", pinyin: "mángguǒ", viet: "Xoài" },
            { char: "給", pinyin: "gěi", viet: "Cho" },
            { char: "塊", pinyin: "kuài", viet: "Miếng (lượng từ)" },
            { char: "香", pinyin: "xiāng", viet: "Thơm" },
            { char: "甜", pinyin: "tián", viet: "Ngọt" },
            { char: "紅色", pinyin: "hóngsè", viet: "Màu đỏ" },
            { char: "西瓜", pinyin: "xīguā", viet: "Dưa hấu" },
            { char: "吧", pinyin: "ba", viet: "(Trợ từ cuối câu, biểu thị sự phỏng đoán)" },
            { char: "對", pinyin: "duì", viet: "Đúng" },
            { char: "以前", pinyin: "yǐqián", viet: "Trước đây" },
            { char: "機會", pinyin: "jīhuì", viet: "Cơ hội" },
            { char: "請", pinyin: "qǐng", viet: "Mời (ai đó ăn/uống)" },
            { char: "拍", pinyin: "pāi", viet: "Chụp (ảnh)" },
            { char: "笑", pinyin: "xiào", viet: "Cười" },
            { char: "開心", pinyin: "kāixīn", viet: "Vui vẻ" },
            { char: "穿", pinyin: "chuān", viet: "Mặc (quần áo)" },
            { char: "衣服", pinyin: "yīfu", viet: "Quần áo" },
            { char: "旅館", pinyin: "lǚguǎn", viet: "Khách sạn" },
            { char: "太太", pinyin: "tàitai", viet: "Vợ, bà (madam)" },
            { char: "男", pinyin: "nán", viet: "Nam" },
            { char: "矮", pinyin: "ǎi", viet: "Thấp, lùn" },
            { char: "高", pinyin: "gāo", viet: "Cao" },
            { char: "弟弟", pinyin: "dìdi", viet: "Em trai" },
            { char: "乾淨", pinyin: "gānjìng", viet: "Sạch sẽ" },
            { char: "窗戶", pinyin: "chuānghu", viet: "Cửa sổ" },
            { char: "往", pinyin: "wǎng", viet: "Hướng về" },
            { char: "藍色", pinyin: "lánsè", viet: "Màu xanh lam" },
            { char: "因為", pinyin: "yīnwèi", viet: "Bởi vì" },
            { char: "住", pinyin: "zhù", viet: "Sống, ở" }
        ],
        grammar: [
            {
                title: "Lặp lại động từ + 看 (VVkàn)",
                content: "Thử làm gì đó xem sao. (Ví dụ: 吃吃看 - chīchīkàn)"
            },
            {
                title: "Lặp lại tính từ (AA的)",
                content: "Nhấn mạnh tính chất, thường mang sắc thái yêu thích, khen ngợi. (Ví dụ: 香香的，甜甜的)"
            },
            {
                title: "Mệnh đề làm định ngữ",
                content: "Mệnh đề + 的 + Danh từ. (Ví dụ: 你說的水果 - trái cây mà bạn nói)"
            },
            {
                title: "Trợ từ 了 (le) cuối câu",
                content: "Biểu thị sự thay đổi của tình huống. (Ví dụ: 我現在很喜歡了 - bây giờ tôi rất thích rồi)"
            },
            {
                title: "Câu nguyên nhân - kết quả 因為...所以...",
                content: "Bởi vì... cho nên..."
            }
        ]
    },
    {
        id: 11,
        title: "Bài 11: 我要租房子",
        subtitle: "Tôi muốn thuê nhà",
        vocab: [
            { char: "租", pinyin: "zū", viet: "Thuê" },
            { char: "房東", pinyin: "fángdōng", viet: "Chủ nhà" },
            { char: "客廳", pinyin: "kètīng", viet: "Phòng khách" },
            { char: "廚房", pinyin: "chúfáng", viet: "Nhà bếp" },
            { char: "左邊", pinyin: "zuǒbiān", viet: "Bên trái" },
            { char: "右邊", pinyin: "yòubiān", viet: "Bên phải" },
            { char: "浴室", pinyin: "yùshì", viet: "Phòng tắm" },
            { char: "超市", pinyin: "chāoshì", viet: "Siêu thị" },
            { char: "走路", pinyin: "zǒulù", viet: "Đi bộ" },
            { char: "分鐘", pinyin: "fēnzhōng", viet: "Phút" },
            { char: "到", pinyin: "dào", viet: "Đến" },
            { char: "間", pinyin: "jiān", viet: "Gian (lượng từ cho phòng)" },
            { char: "空", pinyin: "kōng", viet: "Trống" },
            { char: "房間", pinyin: "fángjiān", viet: "Căn phòng" },
            { char: "套房", pinyin: "tàofáng", viet: "Phòng khép kín" },
            { char: "回去", pinyin: "huíqù", viet: "Đi về" },
            { char: "再", pinyin: "zài", viet: "Lại, nữa, sau đó" },
            { char: "電話", pinyin: "diànhuà", viet: "Điện thoại" },
            { char: "喂", pinyin: "wéi", viet: "A lô" },
            { char: "房租", pinyin: "fángzū", viet: "Tiền thuê nhà" },
            { char: "已經", pinyin: "yǐjīng", viet: "Đã" },
            { char: "習慣", pinyin: "xíguàn", viet: "Quen" },
            { char: "問題", pinyin: "wèntí", viet: "Vấn đề" },
            { char: "熱水器", pinyin: "rèshuǐqì", viet: "Bình nóng lạnh" },
            { char: "好像", pinyin: "hǎoxiàng", viet: "Hình như" },
            { char: "會", pinyin: "huì", viet: "Sẽ" },
            { char: "等", pinyin: "děng", viet: "Đợi" },
            { char: "那", pinyin: "nà", viet: "Vậy thì, thế thì" },
            { char: "裝", pinyin: "zhuāng", viet: "Lắp đặt" },
            { char: "不過", pinyin: "búguò", viet: "Nhưng" },
            { char: "付", pinyin: "fù", viet: "Trả (tiền)" }
        ],
        grammar: [
            {
                title: "Đến để làm gì với 來 (lái)",
                content: "來 + Động từ. (Ví dụ: 我來看房子 - Tôi đến xem nhà)"
            },
            {
                title: "就 (jiù) - Sớm hơn dự kiến",
                content: "(Ví dụ: 走路五分鐘就到了 - Đi bộ 5 phút là đến rồi)"
            },
            {
                title: "Câu tồn tại với chủ ngữ bất định",
                content: "有 + Danh từ bất định + Động từ. (Ví dụ: 有人住嗎？)"
            },
            {
                title: "Các loại 會 (huì)",
                content: "huì_1 (kỹ năng), huì_2 (khả năng xảy ra, sẽ)"
            },
            {
                title: "Lược bỏ danh từ",
                content: "Trong văn nói, danh từ đã được nhắc đến hoặc rõ ràng trong ngữ cảnh thường được lược bỏ"
            }
        ]
    },
    {
        id: 12,
        title: "Bài 12: 你在臺灣學多久的中文？",
        subtitle: "Bạn học tiếng Trung ở Đài Loan bao lâu?",
        vocab: [
            { char: "計畫", pinyin: "jìhuà", viet: "Kế hoạch, dự định" },
            { char: "年", pinyin: "nián", viet: "Năm" },
            { char: "久", pinyin: "jiǔ", viet: "Lâu" },
            { char: "時間", pinyin: "shíjiān", viet: "Thời gian" },
            { char: "先", pinyin: "xiān", viet: "Trước" },
            { char: "念", pinyin: "niàn", viet: "Học, đọc" },
            { char: "大學", pinyin: "dàxué", viet: "Đại học" },
            { char: "需要", pinyin: "xūyào", viet: "Cần" },
            { char: "花", pinyin: "huā", viet: "Tiêu tốn (thời gian, tiền bạc)" },
            { char: "獎學金", pinyin: "jiǎngxuéjīn", viet: "Học bổng" },
            { char: "成績", pinyin: "chéngjì", viet: "Thành tích, điểm số" },
            { char: "學費", pinyin: "xuéfèi", viet: "Học phí" },
            { char: "公司", pinyin: "gōngsī", viet: "Công ty" },
            { char: "替", pinyin: "tì", viet: "Thay, cho" },
            { char: "希望", pinyin: "xīwàng", viet: "Hy vọng" },
            { char: "以後", pinyin: "yǐhòu", viet: "Sau này" },
            { char: "上班", pinyin: "shàngbān", viet: "Đi làm" },
            { char: "念書", pinyin: "niànshū", viet: "Học bài, đi học" },
            { char: "累", pinyin: "lèi", viet: "Mệt" },
            { char: "工作", pinyin: "gōngzuò", viet: "Công việc, làm việc" },
            { char: "去年", pinyin: "qùnián", viet: "Năm ngoái" },
            { char: "做", pinyin: "zuò", viet: "Làm" },
            { char: "生意", pinyin: "shēngyì", viet: "Kinh doanh" },
            { char: "好", pinyin: "hǎo", viet: "Dễ (làm gì)" },
            { char: "難", pinyin: "nán", viet: "Khó (làm gì)" },
            { char: "這樣", pinyin: "zhèyàng", viet: "Như thế này" },
            { char: "國家", pinyin: "guójiā", viet: "Đất nước" },
            { char: "試", pinyin: "shì", viet: "Thử" }
        ],
        grammar: [
            {
                title: "Cấu trúc 先...再... (xiān...zài...)",
                content: "Trước tiên...sau đó..."
            },
            {
                title: "Nhấn mạnh với 是...的 (shì...de)",
                content: "Dùng để nhấn mạnh một thành phần (thời gian, địa điểm, cách thức...) của hành động đã xảy ra trong quá khứ"
            },
            {
                title: "以後 (yǐhòu)",
                content: "Sau này, sau khi"
            },
            {
                title: "Nghĩa đặc biệt của 好/難 + Động từ",
                content: "好 là dễ, 難 là khó. (Ví dụ: 中文不好學 - Tiếng Trung không dễ học)"
            }
        ]
    },
    {
        id: 13,
        title: "Bài 13: 生日快樂",
        subtitle: "Chúc mừng sinh nhật",
        vocab: [
            { char: "生日", pinyin: "shēngrì", viet: "Sinh nhật" },
            { char: "快樂", pinyin: "kuàilè", viet: "Vui vẻ" },
            { char: "回來", pinyin: "huílái", viet: "Quay về" },
            { char: "啊", pinyin: "a", viet: "(Trợ từ thán từ)" },
            { char: "怎麼", pinyin: "zěnme", viet: "Sao lại, làm sao" },
            { char: "忘了", pinyin: "wàngle", viet: "Quên rồi" },
            { char: "記得", pinyin: "jìde", viet: "Nhớ" },
            { char: "當然", pinyin: "dāngrán", viet: "Đương nhiên" },
            { char: "語言", pinyin: "yǔyán", viet: "Ngôn ngữ" },
            { char: "交換", pinyin: "jiāohuàn", viet: "Trao đổi" },
            { char: "那麼", pinyin: "nàme", viet: "Như vậy, đến thế" },
            { char: "熱心", pinyin: "rèxīn", viet: "Nhiệt tình" },
            { char: "西班牙文", pinyin: "Xībānyáwén", viet: "Tiếng Tây Ban Nha" },
            { char: "一樣", pinyin: "yíyàng", viet: "Giống nhau" },
            { char: "過", pinyin: "guò", viet: "Trải qua, đón (sinh nhật)" },
            { char: "左右", pinyin: "zuǒyòu", viet: "Khoảng" },
            { char: "門口", pinyin: "ménkǒu", viet: "Cổng" },
            { char: "禮物", pinyin: "lǐwù", viet: "Quà" },
            { char: "今年", pinyin: "jīnnián", viet: "Năm nay" },
            { char: "訂", pinyin: "dìng", viet: "Đặt trước" },
            { char: "了", pinyin: "le", viet: "(Trợ từ động thái, hoàn thành)" },
            { char: "豬腳麵線", pinyin: "zhūjiǎo miànxiàn", viet: "Mì sợi heo" },
            { char: "蛋", pinyin: "dàn", viet: "Trứng" },
            { char: "一點", pinyin: "yìdiǎn", viet: "Một chút" },
            { char: "傳統", pinyin: "chuántǒng", viet: "Truyền thống" },
            { char: "年輕", pinyin: "niánqīng", viet: "Trẻ" },
            { char: "蛋糕", pinyin: "dàngāo", viet: "Bánh ngọt" },
            { char: "對", pinyin: "duì", viet: "Đối với" },
            { char: "祝", pinyin: "zhù", viet: "Chúc" }
        ],
        grammar: [
            {
                title: "Cấu trúc 一...就... (yī...jiù...)",
                content: "Hễ...là..."
            },
            {
                title: "Động thái từ 了 (le)",
                content: "Đứng sau động từ, biểu thị hành động đã hoàn thành"
            },
            {
                title: "Phân biệt phủ định 不 và 沒",
                content: "不 dùng cho hiện tại, tương lai, thói quen; 沒 dùng cho quá khứ và phủ định của 有"
            },
            {
                title: "Câu bao hàm với từ nghi vấn",
                content: "Từ nghi vấn + 都/也 + Phủ định/Khẳng định. (Ví dụ: 我什麼都吃 - Tôi ăn gì cũng được)"
            },
            {
                title: "多/少 + Động từ",
                content: "Làm gì đó nhiều hơn/ít hơn"
            },
            {
                title: "是不是 (shì bú shì)",
                content: "Dùng để xác nhận thông tin"
            },
            {
                title: "So sánh với 跟...一樣...",
                content: "A 跟 B 一樣 (+ tính từ) - A giống B"
            }
        ]
    },
    {
        id: 14,
        title: "Bài 14: 天氣這麼冷！",
        subtitle: "Thời tiết lạnh quá!",
        vocab: [
            { char: "天氣", pinyin: "tiānqì", viet: "Thời tiết" },
            { char: "冷", pinyin: "lěng", viet: "Lạnh" },
            { char: "風", pinyin: "fēng", viet: "Gió" },
            { char: "滑雪", pinyin: "huáxuě", viet: "Trượt tuyết" },
            { char: "春天", pinyin: "chūntiān", viet: "Mùa xuân" },
            { char: "想", pinyin: "xiǎng", viet: "Nhớ" },
            { char: "新年", pinyin: "xīnnián", viet: "Năm mới" },
            { char: "快", pinyin: "kuài", viet: "Sắp" },
            { char: "父母", pinyin: "fùmǔ", viet: "Bố mẹ" },
            { char: "冬天", pinyin: "dōngtiān", viet: "Mùa đông" },
            { char: "明年", pinyin: "míngnián", viet: "Năm sau" },
            { char: "秋天", pinyin: "qiūtiān", viet: "Mùa thu" },
            { char: "紅葉", pinyin: "hóngyè", viet: "Lá đỏ" },
            { char: "只", pinyin: "zhǐ", viet: "Chỉ" },
            { char: "下雪", pinyin: "xiàxuě", viet: "Tuyết rơi" },
            { char: "雨", pinyin: "yǔ", viet: "Mưa" },
            { char: "傘", pinyin: "sǎn", viet: "Ô, dù" },
            { char: "颱風", pinyin: "táifēng", viet: "Bão" },
            { char: "要", pinyin: "yào", viet: "Sẽ" },
            { char: "夏天", pinyin: "xiàtiān", viet: "Mùa hè" },
            { char: "濕", pinyin: "shī", viet: "Ẩm ướt" },
            { char: "討厭", pinyin: "tǎoyàn", viet: "Ghét" },
            { char: "新聞", pinyin: "xīnwén", viet: "Tin tức" },
            { char: "更", pinyin: "gèng", viet: "Càng" },
            { char: "大家", pinyin: "dàjiā", viet: "Mọi người" },
            { char: "小心", pinyin: "xiǎoxīn", viet: "Cẩn thận" },
            { char: "可怕", pinyin: "kěpà", viet: "Đáng sợ" },
            { char: "停", pinyin: "tíng", viet: "Dừng" }
        ],
        grammar: [
            {
                title: "Thời đoạn sau Động từ + 了",
                content: "Biểu thị thời gian kéo dài của hành động đã hoàn thành. (Ví dụ: 我在臺灣住了一年)"
            },
            {
                title: "Cấu trúc '了' kép",
                content: "V + 了 + Thời đoạn + 了, biểu thị hành động đã diễn ra được một khoảng thời gian và vẫn có thể tiếp tục"
            },
            {
                title: "Cấu trúc 快...了 (kuài...le)",
                content: "Sắp...rồi"
            },
            {
                title: "So sánh với 更 (gèng)",
                content: "Càng... (Ví dụ: 今天比昨天更冷)"
            },
            {
                title: "So sánh kém hơn với 沒有 (méiyǒu)",
                content: "A 沒有 B + Tính từ"
            }
        ]
    },
    {
        id: 15,
        title: "Bài 15: 我很不舒服",
        subtitle: "Tôi rất khó chịu",
        vocab: [
            { char: "醫生", pinyin: "yīshēng", viet: "Bác sĩ" },
            { char: "一直", pinyin: "yìzhí", viet: "Liên tục, suốt" },
            { char: "流", pinyin: "liú", viet: "Chảy" },
            { char: "鼻水", pinyin: "bíshuǐ", viet: "Nước mũi" },
            { char: "頭", pinyin: "tóu", viet: "Đầu" },
            { char: "痛", pinyin: "tòng", viet: "Đau" },
            { char: "胃口", pinyin: "wèikǒu", viet: "Khẩu vị" },
            { char: "差", pinyin: "chà", viet: "Kém" },
            { char: "喉嚨", pinyin: "hóulóng", viet: "Họng" },
            { char: "發炎", pinyin: "fāyán", viet: "Viêm" },
            { char: "生病", pinyin: "shēngbìng", viet: "Bị bệnh" },
            { char: "發燒", pinyin: "fāshāo", viet: "Sốt" },
            { char: "感冒", pinyin: "gǎnmào", viet: "Cảm cúm" },
            { char: "藥", pinyin: "yào", viet: "Thuốc" },
            { char: "藥局", pinyin: "yàojú", viet: "Hiệu thuốc" },
            { char: "拿", pinyin: "ná", viet: "Cầm, lấy" },
            { char: "把", pinyin: "bǎ", viet: "(Giới từ trong câu chữ 把)" },
            { char: "水", pinyin: "shuǐ", viet: "Nước" },
            { char: "休息", pinyin: "xiūxi", viet: "Nghỉ ngơi" },
            { char: "睡覺", pinyin: "shuìjiào", viet: "Ngủ" },
            { char: "臉色", pinyin: "liǎnsè", viet: "Sắc mặt" },
            { char: "難看", pinyin: "nánkàn", viet: "Khó coi, xấu xí" },
            { char: "肚子", pinyin: "dùzi", viet: "Bụng" },
            { char: "吐", pinyin: "tù", viet: "Nôn" },
            { char: "次", pinyin: "cì", viet: "Lần" },
            { char: "陪", pinyin: "péi", viet: "Đi cùng, ở bên" },
            { char: "看病", pinyin: "kànbìng", viet: "Khám bệnh" },
            { char: "健康", pinyin: "jiànkāng", viet: "Sức khỏe" },
            { char: "保險", pinyin: "bǎoxiǎn", viet: "Bảo hiểm" },
            { char: "油", pinyin: "yóu", viet: "Dầu mỡ" },
            { char: "冰", pinyin: "bīng", viet: "Lạnh, đá" },
            { char: "別", pinyin: "bié", viet: "Đừng" },
            { char: "關心", pinyin: "guānxīn", viet: "Quan tâm" },
            { char: "包", pinyin: "bāo", viet: "Gói (lượng từ)" },
            { char: "睡", pinyin: "shuì", viet: "Ngủ" },
            { char: "小時", pinyin: "xiǎoshí", viet: "Giờ, tiếng đồng hồ" }
        ],
        grammar: [
            {
                title: "Câu biểu thị thái độ không chắc chắn với từ nghi vấn",
                content: "Thường dùng ở dạng phủ định. (Ví dụ: 我沒有多少錢 - Tôi không có bao nhiêu tiền)"
            },
            {
                title: "Câu chữ 把 (bǎ)",
                content: "Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác, nhấn mạnh sự xử lý đối với tân ngữ"
            },
            {
                title: "Cấu trúc V了...就... (V le...jiù...)",
                content: "Làm xong V rồi thì..."
            },
            {
                title: "一點 (yìdiǎn)",
                content: "Một chút (có nhiều cách dùng khác nhau)"
            },
            {
                title: "So sánh hành động với bổ ngữ 得",
                content: "Động từ + 得 + 比 + Đối tượng so sánh + Tính từ"
            },
            {
                title: "Động từ ly hợp",
                content: "Các động từ có cấu trúc Động-Tân có thể tách ra để chèn các thành phần khác vào giữa. (Ví dụ: 見面 -> 見個面)"
            }
        ]
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { lessonsData };
} 