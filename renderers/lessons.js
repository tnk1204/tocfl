class LessonsRenderer {
    constructor(app) {
        this.app = app;
        this.currentAudio = null;
        this.studyMode = 'normal'; // normal, review, speed
        this.filterOptions = {
            difficulty: 'all', // all, easy, medium, hard
            starred: false,
            search: ''
        };
    }

    render() {
        // Check if lessonsData is available
        if (typeof lessonsData === 'undefined') {
            this.app.mainContent.innerHTML = `
                <div class="space-y-6 md:space-y-8">
                    <div>
                        <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Bài học</h2>
                        <p class="mt-1" style="color: var(--text-secondary);">Đang tải dữ liệu...</p>
                    </div>
                </div>
            `;
            return;
        }
        
        // Calculate progress for each lesson
        const lessonProgress = this.calculateLessonProgress();
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div>
                    <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Bài học TOCFL</h2>
                    <p class="mt-1" style="color: var(--text-secondary);">Chọn bài học để bắt đầu học</p>
                </div>
                
                <!-- Overall Progress -->
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm">
                    <h3 class="text-lg font-semibold mb-4" style="color: var(--text-primary);">Tiến độ tổng quan</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="text-center">
                            <div class="text-3xl font-bold" style="color: var(--accent);">${this.getTotalLearnedWords()}</div>
                            <div class="text-sm" style="color: var(--text-secondary);">Từ đã học</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold" style="color: var(--info);">${this.getTotalWords()}</div>
                            <div class="text-sm" style="color: var(--text-secondary);">Tổng số từ</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold" style="color: var(--success);">${this.getOverallProgress()}%</div>
                            <div class="text-sm" style="color: var(--text-secondary);">Hoàn thành</div>
                        </div>
                    </div>
                    <div class="mt-4 w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500" 
                            style="width: ${this.getOverallProgress()}%"></div>
                    </div>
                </div>
                
                <!-- Filter and Search -->
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="lesson-search" placeholder="Tìm kiếm bài học..." 
                            class="w-full px-4 py-2 rounded-lg border" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color); color: var(--text-primary);">
                    </div>
                    <select id="difficulty-filter" class="px-4 py-2 rounded-lg border" 
                        style="background-color: var(--bg-secondary); border-color: var(--border-color); color: var(--text-primary);">
                        <option value="all">Tất cả độ khó</option>
                        <option value="beginner">Sơ cấp (Bài 1-5)</option>
                        <option value="intermediate">Trung cấp (Bài 6-10)</option>
                        <option value="advanced">Cao cấp (Bài 11-15)</option>
                    </select>
                </div>
                
                <!-- Lessons Grid -->
                <div class="grid gap-4 md:gap-6" id="lessons-grid">
                    ${lessonsData.map(lesson => {
                        const progress = lessonProgress[lesson.id] || 0;
                        const difficulty = this.getLessonDifficulty(lesson.id);
                        const difficultyColor = difficulty === 'beginner' ? 'green' : difficulty === 'intermediate' ? 'yellow' : 'red';
                        
                        return `
                            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                                class="lesson-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer" 
                                onclick="app.switchView('lesson', ${lesson.id})"
                                data-lesson-id="${lesson.id}"
                                data-difficulty="${difficulty}">
                                <div class="flex items-center justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <h3 class="text-xl font-semibold" style="color: var(--text-primary);">${lesson.title}</h3>
                                            <span class="px-2 py-1 text-xs rounded-full bg-${difficultyColor}-100 text-${difficultyColor}-700">
                                                ${difficulty === 'beginner' ? 'Sơ cấp' : difficulty === 'intermediate' ? 'Trung cấp' : 'Cao cấp'}
                                            </span>
                                        </div>
                                        <p style="color: var(--text-secondary);" class="text-sm mb-1">${lesson.subtitle}</p>
                                        <div class="flex items-center gap-4 text-sm">
                                            <span style="color: var(--text-secondary);">
                                                <strong>${lesson.vocab.length}</strong> từ vựng
                                            </span>
                                            <span style="color: var(--text-secondary);">
                                                <strong>${lesson.grammar.length}</strong> ngữ pháp
                                            </span>
                                            ${progress > 0 ? `
                                                <span style="color: var(--success);">
                                                    <strong>${progress}%</strong> hoàn thành
                                                </span>
                                            ` : ''}
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center gap-2">
                                        <div class="relative w-16 h-16">
                                            <svg class="transform -rotate-90 w-16 h-16">
                                                <circle cx="32" cy="32" r="28" stroke="var(--border-color)" stroke-width="4" fill="none"/>
                                                <circle cx="32" cy="32" r="28" 
                                                    stroke="var(--accent)" 
                                                    stroke-width="4" 
                                                    fill="none"
                                                    stroke-dasharray="${2 * Math.PI * 28}"
                                                    stroke-dashoffset="${2 * Math.PI * 28 * (1 - progress / 100)}"
                                                    class="transition-all duration-500"/>
                                            </svg>
                                            <div class="absolute inset-0 flex items-center justify-center text-2xl" style="color: var(--accent);">
                                                ${progress > 0 ? progress + '%' : '→'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        // Setup search functionality
        this.setupLessonSearch();
    }

    renderLesson(lessonId) {
        if (typeof lessonsData === 'undefined') {
            console.warn('lessonsData not available yet');
            return;
        }
        
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;

        this.app.appState.currentLessonId = lessonId;
        this.app.mobileHeaderTitle.textContent = lesson.title;
        
        // Get learned words for this lesson
        const learnedWords = this.getLearnedWordsForLesson(lessonId);
        const progress = Math.round((learnedWords.length / lesson.vocab.length) * 100);

        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <!-- Header with back button and progress -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <button id="back-to-lessons" style="color: var(--accent);" class="text-xl hover:opacity-70 transition">←</button>
                        <div>
                            <h2 class="text-2xl md:text-3xl font-bold" style="color: var(--text-primary);">${lesson.title}</h2>
                            <p style="color: var(--text-secondary);" class="mt-1">${lesson.subtitle}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" style="color: var(--accent);">${progress}%</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Hoàn thành</div>
                    </div>
                </div>
                
                <!-- Study Timer -->
                <div id="lesson-timer" class="hidden" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                    class="rounded-lg p-4 flex items-center justify-between">
                    <span style="color: var(--text-primary);">Thời gian học:</span>
                    <span id="timer-display" class="font-mono font-bold" style="color: var(--accent);">00:00</span>
                </div>

                <!-- Quick Actions -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button onclick="app.lessonsRenderer.startFlashcardSession(${lessonId})" 
                        class="p-4 rounded-lg border hover:shadow-md transition-all" 
                        style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                        <div class="text-2xl mb-1">🎴</div>
                        <div class="font-semibold" style="color: var(--text-primary);">Flashcard</div>
                        <div class="text-xs" style="color: var(--text-secondary);">Ôn tập từ vựng</div>
                    </button>
                    
                    <button onclick="app.lessonsRenderer.startQuizSession(${lessonId})" 
                        class="p-4 rounded-lg border hover:shadow-md transition-all" 
                        style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                        <div class="text-2xl mb-1">📝</div>
                        <div class="font-semibold" style="color: var(--text-primary);">Quiz</div>
                        <div class="text-xs" style="color: var(--text-secondary);">Kiểm tra</div>
                    </button>
                    
                    <button onclick="app.lessonsRenderer.startListeningSession(${lessonId})" 
                        class="p-4 rounded-lg border hover:shadow-md transition-all" 
                        style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                        <div class="text-2xl mb-1">🎧</div>
                        <div class="font-semibold" style="color: var(--text-primary);">Nghe</div>
                        <div class="text-xs" style="color: var(--text-secondary);">Luyện phát âm</div>
                    </button>
                    
                    <button onclick="app.lessonsRenderer.startWritingSession(${lessonId})" 
                        class="p-4 rounded-lg border hover:shadow-md transition-all" 
                        style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                        <div class="text-2xl mb-1">✍️</div>
                        <div class="font-semibold" style="color: var(--text-primary);">Viết</div>
                        <div class="text-xs" style="color: var(--text-secondary);">Luyện viết chữ</div>
                    </button>
                </div>

                <!-- Advanced Features Section -->
                <div class="mt-6">
                    <h3 class="text-lg font-semibold mb-3" style="color: var(--text-primary);">Chức năng nâng cao</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <button onclick="app.lessonsRenderer.startSmartReview(${lessonId})" 
                            class="p-4 rounded-lg border hover:shadow-md transition-all relative" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                            <div class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-purple-500 text-white">AI</div>
                            <div class="text-2xl mb-1">🧠</div>
                            <div class="font-semibold" style="color: var(--text-primary);">Smart Review</div>
                            <div class="text-xs" style="color: var(--text-secondary);">Ôn tập thông minh</div>
                        </button>
                        
                        <button onclick="app.lessonsRenderer.startSentenceBuilder(${lessonId})" 
                            class="p-4 rounded-lg border hover:shadow-md transition-all" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                            <div class="text-2xl mb-1">🏗️</div>
                            <div class="font-semibold" style="color: var(--text-primary);">Xây dựng câu</div>
                            <div class="text-xs" style="color: var(--text-secondary);">Tạo câu từ vựng</div>
                        </button>
                        
                        <button onclick="app.lessonsRenderer.startConversationPractice(${lessonId})" 
                            class="p-4 rounded-lg border hover:shadow-md transition-all" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                            <div class="text-2xl mb-1">💬</div>
                            <div class="font-semibold" style="color: var(--text-primary);">Hội thoại</div>
                            <div class="text-xs" style="color: var(--text-secondary);">Luyện giao tiếp</div>
                        </button>
                        
                        <button onclick="app.lessonsRenderer.startCharacterDecomposition(${lessonId})" 
                            class="p-4 rounded-lg border hover:shadow-md transition-all" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                            <div class="text-2xl mb-1">🔍</div>
                            <div class="font-semibold" style="color: var(--text-primary);">Phân tích chữ</div>
                            <div class="text-xs" style="color: var(--text-secondary);">Cấu trúc Hán tự</div>
                        </button>
                        
                        <button onclick="app.lessonsRenderer.showLessonAnalytics(${lessonId})" 
                            class="p-4 rounded-lg border hover:shadow-md transition-all" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                            <div class="text-2xl mb-1">📊</div>
                            <div class="font-semibold" style="color: var(--text-primary);">Phân tích</div>
                            <div class="text-xs" style="color: var(--text-secondary);">Thống kê chi tiết</div>
                        </button>
                        
                        <button onclick="app.lessonsRenderer.startSpeedReview(${lessonId})" 
                            class="p-4 rounded-lg border hover:shadow-md transition-all relative" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                            <div class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-red-500 text-white">NEW</div>
                            <div class="text-2xl mb-1">⚡</div>
                            <div class="font-semibold" style="color: var(--text-primary);">Speed Review</div>
                            <div class="text-xs" style="color: var(--text-secondary);">Ôn tập tốc độ</div>
                        </button>
                    </div>
                </div>

                <!-- Vocabulary Section -->
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold" style="color: var(--text-primary);">Từ vựng (${lesson.vocab.length} từ)</h3>
                        <div class="flex gap-2">
                            <button id="toggle-pinyin" class="px-3 py-1 text-sm rounded-lg border" 
                                style="border-color: var(--border-color); color: var(--text-secondary);">
                                Ẩn/Hiện Pinyin
                            </button>
                            <button id="play-all-vocab" class="px-3 py-1 text-sm rounded-lg" 
                                style="background-color: var(--accent); color: white;">
                                🔊 Phát tất cả
                            </button>
                        </div>
                    </div>
                    
                    <!-- Search within lesson -->
                    <input type="text" id="vocab-search" placeholder="Tìm từ vựng trong bài..." 
                        class="w-full mb-4 px-3 py-2 rounded-lg border text-sm" 
                        style="background-color: var(--bg-main); border-color: var(--border-color); color: var(--text-primary);">
                    
                    <div class="grid gap-3" id="vocab-list">
                        ${lesson.vocab.map((word, index) => {
                            const isInNotebook = this.app.appState.notebookWords.some(w => w.char === word.char && w.lessonId === lessonId);
                            const isLearned = learnedWords.includes(word.char);
                            const srsLevel = this.getSRSLevel(word.char, lessonId);
                            
                            return `
                                <div class="vocab-item p-4 rounded-lg flex justify-between items-center transition-all" 
                                    style="background-color: var(--bg-main); border: 1px solid ${isLearned ? 'var(--success)' : 'var(--border-color)'};"
                                    data-word="${word.char}" data-pinyin="${word.pinyin}" data-viet="${word.viet}">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3">
                                            <span class="text-2xl font-bold" style="color: var(--text-primary);">${word.char}</span>
                                            <span class="pinyin-text" style="color: var(--text-secondary);">${word.pinyin}</span>
                                            ${srsLevel > 0 ? `
                                                <span class="px-2 py-1 text-xs rounded-full" 
                                                    style="background-color: var(--accent-light); color: var(--accent);">
                                                    SRS ${srsLevel}
                                                </span>
                                            ` : ''}
                                            ${isLearned ? `
                                                <span class="text-green-500 text-sm">✓ Đã học</span>
                                            ` : ''}
                                        </div>
                                        <p style="color: var(--text-secondary);" class="text-sm mt-1">${word.viet}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button class="play-audio-btn text-xl hover:opacity-70 transition" 
                                            data-char="${word.char}" data-index="${index}">🔊</button>
                                        <button class="save-word-btn text-xl ${isInNotebook ? 'text-yellow-500' : 'text-stone-300'} hover:text-yellow-400 transition" 
                                            data-word='${JSON.stringify({...word, lessonId})}'>⭐</button>
                                        <button class="mark-learned-btn text-xl ${isLearned ? 'text-green-500' : 'text-stone-300'} hover:text-green-400 transition"
                                            data-word="${word.char}" data-lesson="${lessonId}">✓</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Grammar Section -->
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm">
                    <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Ngữ pháp (${lesson.grammar.length} điểm)</h3>
                    <div class="space-y-4">
                        ${lesson.grammar.map((item, index) => `
                            <div class="grammar-item">
                                <button class="w-full text-left p-4 rounded-lg flex justify-between items-center grammar-toggle transition-all" 
                                    style="background-color: var(--bg-main); border: 1px solid var(--border-color);" 
                                    data-index="${index}">
                                    <span class="font-medium" style="color: var(--text-primary);">${index + 1}. ${item.title}</span>
                                    <span class="transform transition-transform grammar-icon">▼</span>
                                </button>
                                <div class="grammar-content mt-2 px-4 max-h-0 overflow-hidden transition-all duration-300" 
                                    style="color: var(--text-secondary);">
                                    <div class="pb-3 whitespace-pre-wrap">${item.content}</div>
                                    <button class="text-sm text-blue-500 hover:underline" 
                                        onclick="app.lessonsRenderer.practiceGrammar(${lessonId}, ${index})">
                                        📝 Luyện tập ngữ pháp này
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Related Resources -->
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm">
                    <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Tài liệu bổ sung</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button class="p-4 rounded-lg border text-left hover:shadow-md transition" 
                            style="border-color: var(--border-color);"
                            onclick="app.lessonsRenderer.downloadVocabList(${lessonId})">
                            <div class="font-semibold" style="color: var(--text-primary);">📥 Tải danh sách từ vựng</div>
                            <div class="text-sm" style="color: var(--text-secondary);">Xuất file PDF/Excel</div>
                        </button>
                        <button class="p-4 rounded-lg border text-left hover:shadow-md transition" 
                            style="border-color: var(--border-color);"
                            onclick="app.lessonsRenderer.generatePracticeSheet(${lessonId})">
                            <div class="font-semibold" style="color: var(--text-primary);">📄 Tạo bài tập</div>
                            <div class="text-sm" style="color: var(--text-secondary);">Tự động tạo worksheet</div>
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.startLessonTimer();
    }

    setupEventListeners() {
        // Back button
        const backBtn = document.getElementById('back-to-lessons');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.stopLessonTimer();
                this.app.switchView('lessons');
            });
        }

        // Toggle pinyin visibility
        const togglePinyinBtn = document.getElementById('toggle-pinyin');
        if (togglePinyinBtn) {
            togglePinyinBtn.addEventListener('click', () => {
                document.querySelectorAll('.pinyin-text').forEach(el => {
                    el.classList.toggle('hidden');
                });
            });
        }

        // Play all vocabulary
        const playAllBtn = document.getElementById('play-all-vocab');
        if (playAllBtn) {
            playAllBtn.addEventListener('click', () => this.playAllVocabulary());
        }

        // Vocabulary search
        const vocabSearch = document.getElementById('vocab-search');
        if (vocabSearch) {
            vocabSearch.addEventListener('input', (e) => this.filterVocabulary(e.target.value));
        }

        // Audio buttons
        document.querySelectorAll('.play-audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const char = e.currentTarget.dataset.char;
                const index = parseInt(e.currentTarget.dataset.index);
                this.playAudioWithHighlight(char, index);
            });
        });

        // Save word buttons
        document.querySelectorAll('.save-word-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.app.toggleNotebookWord(e.currentTarget);
            });
        });

        // Mark learned buttons
        document.querySelectorAll('.mark-learned-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleLearnedStatus(e.currentTarget);
            });
        });

        // Grammar toggles
        document.querySelectorAll('.grammar-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector('.grammar-icon');
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    // New helper methods
    calculateLessonProgress() {
        const progress = {};
        lessonsData.forEach(lesson => {
            const learnedWords = this.getLearnedWordsForLesson(lesson.id);
            progress[lesson.id] = Math.round((learnedWords.length / lesson.vocab.length) * 100);
        });
        return progress;
    }

    getLearnedWordsForLesson(lessonId) {
        const learnedKey = `learned_words_${lessonId}`;
        return JSON.parse(localStorage.getItem(learnedKey) || '[]');
    }

    toggleLearnedStatus(button) {
        const word = button.dataset.word;
        const lessonId = parseInt(button.dataset.lesson);
        const learnedKey = `learned_words_${lessonId}`;
        let learnedWords = JSON.parse(localStorage.getItem(learnedKey) || '[]');
        
        if (learnedWords.includes(word)) {
            learnedWords = learnedWords.filter(w => w !== word);
            button.classList.remove('text-green-500');
            button.classList.add('text-stone-300');
        } else {
            learnedWords.push(word);
            button.classList.add('text-green-500');
            button.classList.remove('text-stone-300');
            this.app.awardXP(2, 'Học từ mới');
        }
        
        localStorage.setItem(learnedKey, JSON.stringify(learnedWords));
        
        // Update vocab item border
        const vocabItem = button.closest('.vocab-item');
        if (vocabItem) {
            vocabItem.style.borderColor = learnedWords.includes(word) ? 'var(--success)' : 'var(--border-color)';
        }
    }

    getSRSLevel(word, lessonId) {
        const key = `${word}_${lessonId}`;
        const srsData = this.app.appState.srsData[key];
        if (!srsData) return 0;
        
        // Calculate SRS level based on review count and success rate
        const level = Math.min(5, Math.floor(srsData.reviewCount / 3));
        return level;
    }

    getLessonDifficulty(lessonId) {
        if (lessonId <= 5) return 'beginner';
        if (lessonId <= 10) return 'intermediate';
        return 'advanced';
    }

    getTotalWords() {
        return lessonsData.reduce((sum, lesson) => sum + lesson.vocab.length, 0);
    }

    getTotalLearnedWords() {
        let total = 0;
        lessonsData.forEach(lesson => {
            total += this.getLearnedWordsForLesson(lesson.id).length;
        });
        return total;
    }

    getOverallProgress() {
        const totalWords = this.getTotalWords();
        const learnedWords = this.getTotalLearnedWords();
        return totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;
    }

    setupLessonSearch() {
        const searchInput = document.getElementById('lesson-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterLessons());
        }
        
        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', () => this.filterLessons());
        }
    }

    filterLessons() {
        const searchTerm = document.getElementById('lesson-search').value.toLowerCase();
        const difficulty = document.getElementById('difficulty-filter').value;
        
        document.querySelectorAll('.lesson-card').forEach(card => {
            const lessonId = parseInt(card.dataset.lessonId);
            const lesson = lessonsData.find(l => l.id === lessonId);
            const lessonDifficulty = card.dataset.difficulty;
            
            const matchesSearch = !searchTerm || 
                lesson.title.toLowerCase().includes(searchTerm) ||
                lesson.subtitle.toLowerCase().includes(searchTerm);
                
            const matchesDifficulty = difficulty === 'all' || lessonDifficulty === difficulty;
            
            card.style.display = matchesSearch && matchesDifficulty ? 'block' : 'none';
        });
    }

    filterVocabulary(searchTerm) {
        const term = searchTerm.toLowerCase();
        document.querySelectorAll('.vocab-item').forEach(item => {
            const word = item.dataset.word.toLowerCase();
            const pinyin = item.dataset.pinyin.toLowerCase();
            const viet = item.dataset.viet.toLowerCase();
            
            const matches = !term || word.includes(term) || pinyin.includes(term) || viet.includes(term);
            item.style.display = matches ? 'flex' : 'none';
        });
    }

    playAudioWithHighlight(char, index) {
        // Highlight the current word
        document.querySelectorAll('.vocab-item').forEach(item => {
            item.classList.remove('ring-2', 'ring-blue-500');
        });
        
        const currentItem = document.querySelectorAll('.vocab-item')[index];
        if (currentItem) {
            currentItem.classList.add('ring-2', 'ring-blue-500');
            currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        this.app.playAudio(char);
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            if (currentItem) {
                currentItem.classList.remove('ring-2', 'ring-blue-500');
            }
        }, 2000);
    }

    async playAllVocabulary() {
        const lesson = lessonsData.find(l => l.id === this.app.appState.currentLessonId);
        if (!lesson) return;
        
        const playBtn = document.getElementById('play-all-vocab');
        playBtn.disabled = true;
        playBtn.textContent = '⏸ Đang phát...';
        
        for (let i = 0; i < lesson.vocab.length; i++) {
            const word = lesson.vocab[i];
            this.playAudioWithHighlight(word.char, i);
            
            // Wait for audio to finish (estimate 2 seconds per word)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Check if user wants to stop
            if (playBtn.textContent === '⏹ Dừng') {
                break;
            }
        }
        
        playBtn.disabled = false;
        playBtn.textContent = '🔊 Phát tất cả';
    }

    startLessonTimer() {
        const timerDiv = document.getElementById('lesson-timer');
        const timerDisplay = document.getElementById('timer-display');
        
        if (timerDiv && timerDisplay) {
            timerDiv.classList.remove('hidden');
            this.lessonStartTime = Date.now();
            
            this.lessonTimer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - this.lessonStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }
    }

    stopLessonTimer() {
        if (this.lessonTimer) {
            clearInterval(this.lessonTimer);
            this.lessonTimer = null;
            
            // Save study time
            const elapsed = Math.floor((Date.now() - this.lessonStartTime) / 1000);
            this.app.appState.studyTimeToday += elapsed;
            this.app.saveState();
        }
    }

    // Enhanced Flashcard functionality
    startFlashcardSession(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        // Filter words based on SRS and learning status
        const words = this.getWordsForReview(lesson);
        
        if (words.length === 0) {
            alert('Không có từ nào cần ôn tập! Hãy học thêm từ mới.');
            return;
        }
        
        this.flashcardSession = {
            words: words,
            currentIndex: 0,
            correct: 0,
            incorrect: 0,
            startTime: Date.now()
        };
        
        this.renderFlashcard(lessonId);
    }

    getWordsForReview(lesson) {
        const now = Date.now();
        const words = [];
        
        lesson.vocab.forEach(word => {
            const key = `${word.char}_${lesson.id}`;
            const srsData = this.app.appState.srsData[key];
            
            // Include word if: never reviewed, or due for review
            if (!srsData || new Date(srsData.nextReview).getTime() <= now) {
                words.push({...word, lessonId: lesson.id});
            }
        });
        
        // Shuffle words
        return words.sort(() => Math.random() - 0.5);
    }

    // Enhanced Quiz functionality
    startQuizSession(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.quizSession = {
            questions: this.generateAdvancedQuizQuestions(lesson.vocab),
            currentIndex: 0,
            score: 0,
            startTime: Date.now(),
            lessonId: lessonId
        };
        
        this.renderAdvancedQuiz();
    }

    generateAdvancedQuizQuestions(vocab) {
        const questions = [];
        const types = ['char-to-meaning', 'meaning-to-char', 'pinyin-to-char', 'char-to-pinyin', 'listening'];
        
        // Generate diverse question types
        vocab.forEach(word => {
            const type = types[Math.floor(Math.random() * types.length)];
            questions.push(this.createQuizQuestion(word, type, vocab));
        });
        
        return questions.sort(() => Math.random() - 0.5).slice(0, 10);
    }

    createQuizQuestion(word, type, allVocab) {
        const question = {
            type: type,
            word: word,
            options: []
        };
        
        switch(type) {
            case 'char-to-meaning':
                question.prompt = `"${word.char}" có nghĩa là gì?`;
                question.correctAnswer = word.viet;
                question.options = this.generateOptions(word.viet, allVocab.map(w => w.viet));
                break;
                
            case 'meaning-to-char':
                question.prompt = `Từ nào có nghĩa "${word.viet}"?`;
                question.correctAnswer = word.char;
                question.options = this.generateOptions(word.char, allVocab.map(w => w.char));
                break;
                
            case 'pinyin-to-char':
                question.prompt = `Chữ Hán nào có phiên âm "${word.pinyin}"?`;
                question.correctAnswer = word.char;
                question.options = this.generateOptions(word.char, allVocab.map(w => w.char));
                break;
                
            case 'char-to-pinyin':
                question.prompt = `Phiên âm của "${word.char}" là gì?`;
                question.correctAnswer = word.pinyin;
                question.options = this.generateOptions(word.pinyin, allVocab.map(w => w.pinyin));
                break;
                
            case 'listening':
                question.prompt = `🔊 Nghe và chọn từ đúng`;
                question.correctAnswer = word.char;
                question.options = this.generateOptions(word.char, allVocab.map(w => w.char));
                question.audioChar = word.char;
                break;
        }
        
        return question;
    }

    generateOptions(correct, allOptions) {
        const options = [correct];
        const filtered = allOptions.filter(opt => opt !== correct);
        
        while (options.length < 4 && filtered.length > 0) {
            const randomIndex = Math.floor(Math.random() * filtered.length);
            const option = filtered.splice(randomIndex, 1)[0];
            if (!options.includes(option)) {
                options.push(option);
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    }

    // Additional practice methods
    startListeningSession(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.listeningSession = {
            words: lesson.vocab.sort(() => Math.random() - 0.5),
            currentIndex: 0,
            correct: 0,
            lessonId: lessonId
        };
        
        this.renderListeningPractice();
    }

    startWritingSession(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.writingSession = {
            words: lesson.vocab.sort(() => Math.random() - 0.5).slice(0, 10),
            currentIndex: 0,
            score: 0,
            lessonId: lessonId
        };
        
        this.renderWritingPractice();
    }

    practiceGrammar(lessonId, grammarIndex) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson || !lesson.grammar[grammarIndex]) return;
        
        const grammar = lesson.grammar[grammarIndex];
        
        // Create grammar practice exercises
        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="flex items-center gap-4">
                    <button onclick="app.switchView('lesson', ${lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">←</button>
                    <div>
                        <h2 class="text-2xl font-bold" style="color: var(--text-primary);">Luyện tập ngữ pháp</h2>
                        <p style="color: var(--text-secondary);">${grammar.title}</p>
                    </div>
                </div>
                
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                    class="rounded-xl p-6 shadow-sm">
                    <div class="mb-6 p-4 rounded-lg" style="background-color: var(--bg-main);">
                        <h3 class="font-semibold mb-2" style="color: var(--text-primary);">Giải thích:</h3>
                        <p style="color: var(--text-secondary);" class="whitespace-pre-wrap">${grammar.content}</p>
                    </div>
                    
                    <div class="space-y-4">
                        <h3 class="font-semibold" style="color: var(--text-primary);">Bài tập thực hành:</h3>
                        <!-- Grammar exercises would be generated based on the grammar point -->
                        <p style="color: var(--text-secondary);">Tính năng đang được phát triển...</p>
                    </div>
                </div>
            </div>
        `;
    }

    downloadVocabList(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        // Create CSV content
        let csvContent = "Chữ Hán,Pinyin,Tiếng Việt\n";
        lesson.vocab.forEach(word => {
            csvContent += `"${word.char}","${word.pinyin}","${word.viet}"\n`;
        });
        
        // Download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `TOCFL_Bai${lessonId}_TuVung.csv`;
        link.click();
    }

    generatePracticeSheet(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        // Create practice sheet HTML
        const practiceHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Bài tập - ${lesson.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1, h2 { text-align: center; }
                    .exercise { margin: 20px 0; page-break-inside: avoid; }
                    .word-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                    .word-box { border: 1px solid #ccc; padding: 10px; height: 100px; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                <h1>${lesson.title}</h1>
                <h2>${lesson.subtitle}</h2>
                
                <div class="exercise">
                    <h3>1. Viết lại các từ sau:</h3>
                    <div class="word-grid">
                        ${lesson.vocab.slice(0, 10).map(word => `
                            <div class="word-box">
                                <div style="font-size: 24px; margin-bottom: 10px;">${word.char}</div>
                                <div style="color: #666;">${word.pinyin}</div>
                                <div style="border-top: 1px solid #ccc; margin-top: 20px; height: 30px;"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="exercise">
                    <h3>2. Nối từ với nghĩa:</h3>
                    <!-- Matching exercise -->
                </div>
                
                <div class="exercise">
                    <h3>3. Điền từ vào chỗ trống:</h3>
                    <!-- Fill in the blanks -->
                </div>
                
                <button class="no-print" onclick="window.print()">In bài tập</button>
            </body>
            </html>
        `;
        
        // Open in new window
        const practiceWindow = window.open('', '_blank');
        practiceWindow.document.write(practiceHTML);
        practiceWindow.document.close();
    }

    // Enhanced rendering methods for practice sessions
    renderFlashcard(lessonId) {
        const session = this.flashcardSession;
        const word = session.words[session.currentIndex];
        const progress = ((session.currentIndex + 1) / session.words.length) * 100;
        
        let isFlipped = false;

        const renderCard = () => {
            this.app.mainContent.innerHTML = `
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <button id="back-to-lesson" style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                        <div class="text-center">
                            <h2 class="text-xl font-bold" style="color: var(--text-primary);">Flashcard - Ôn tập thông minh</h2>
                            <p style="color: var(--text-secondary);">${session.currentIndex + 1} / ${session.words.length}</p>
                        </div>
                        <div class="text-right">
                            <div class="text-sm" style="color: var(--success);">✓ ${session.correct}</div>
                            <div class="text-sm" style="color: var(--error);">✗ ${session.incorrect}</div>
                        </div>
                    </div>
                    
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                    </div>

                    <div class="flashcard-container max-w-md mx-auto">
                        <div class="flashcard ${isFlipped ? 'is-flipped' : ''}" id="flashcard">
                            <div class="flashcard-face flashcard-front">
                                <div class="text-6xl font-bold mb-4">${word.char}</div>
                                <div style="color: var(--text-secondary);" class="text-lg">${word.pinyin}</div>
                                <button onclick="app.playAudio('${word.char}')" class="mt-4 text-2xl hover:scale-110 transition">🔊</button>
                                <div class="mt-4 text-sm opacity-60">Nhấn để xem nghĩa</div>
                            </div>
                            <div class="flashcard-face flashcard-back">
                                <div class="text-2xl font-bold mb-4">${word.viet}</div>
                                <div class="text-lg opacity-80">${word.pinyin}</div>
                                <div class="text-3xl mt-4">${word.char}</div>
                                ${this.getSRSInfo(word.char, lessonId)}
                            </div>
                        </div>
                    </div>

                    ${isFlipped ? `
                        <div class="text-center">
                            <p class="mb-4" style="color: var(--text-primary);">Bạn nhớ từ này như thế nào?</p>
                            <div class="flex justify-center gap-3">
                                <button onclick="app.lessonsRenderer.handleFlashcardResponse('again')" 
                                    class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                                    😕 Quên rồi
                                </button>
                                <button onclick="app.lessonsRenderer.handleFlashcardResponse('hard')" 
                                    class="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
                                    🤔 Khó
                                </button>
                                <button onclick="app.lessonsRenderer.handleFlashcardResponse('good')" 
                                    class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                                    😊 Tốt
                                </button>
                                <button onclick="app.lessonsRenderer.handleFlashcardResponse('easy')" 
                                    class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
                                    😎 Dễ
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        };

        renderCard();

        // Event listeners
        document.getElementById('back-to-lesson').addEventListener('click', () => {
            this.renderLesson(lessonId);
        });

        document.getElementById('flashcard').addEventListener('click', () => {
            isFlipped = !isFlipped;
            renderCard();
        });
    }

    getSRSInfo(char, lessonId) {
        const key = `${char}_${lessonId}`;
        const srsData = this.app.appState.srsData[key];
        
        if (!srsData) {
            return '<div class="mt-4 text-sm opacity-60">Từ mới - Chưa ôn tập</div>';
        }
        
        const nextReview = new Date(srsData.nextReview);
        const now = new Date();
        const daysUntilReview = Math.ceil((nextReview - now) / (1000 * 60 * 60 * 24));
        
        return `
            <div class="mt-4 text-sm opacity-60">
                <div>Đã ôn tập: ${srsData.reviewCount} lần</div>
                <div>Ôn tập lại sau: ${daysUntilReview} ngày</div>
            </div>
        `;
    }

    handleFlashcardResponse(quality) {
        const session = this.flashcardSession;
        const word = session.words[session.currentIndex];
        
        // Update SRS data based on quality
        this.updateSRSData(word, quality);
        
        // Update session stats
        if (quality === 'again') {
            session.incorrect++;
        } else {
            session.correct++;
        }
        
        // Move to next card
        if (session.currentIndex < session.words.length - 1) {
            session.currentIndex++;
            this.renderFlashcard(this.app.appState.currentLessonId);
        } else {
            this.showFlashcardResults();
        }
    }

    updateSRSData(word, quality) {
        const key = `${word.char}_${word.lessonId}`;
        let srsData = this.app.appState.srsData[key] || {
            word: word,
            reviewCount: 0,
            easeFactor: 2.5,
            interval: 1,
            lastReviewed: new Date()
        };
        
        // Update based on SM-2 algorithm
        srsData.reviewCount++;
        srsData.lastReviewed = new Date();
        
        // Calculate new interval based on quality
        let qualityFactor = { 'again': 0, 'hard': 1, 'good': 2, 'easy': 3 }[quality];
        
        if (qualityFactor === 0) {
            srsData.interval = 1;
        } else {
            if (srsData.reviewCount === 1) {
                srsData.interval = 1;
            } else if (srsData.reviewCount === 2) {
                srsData.interval = 6;
            } else {
                srsData.interval = Math.round(srsData.interval * srsData.easeFactor);
            }
            
            // Update ease factor
            srsData.easeFactor = srsData.easeFactor + (0.1 - (3 - qualityFactor) * (0.08 + (3 - qualityFactor) * 0.02));
            srsData.easeFactor = Math.max(1.3, srsData.easeFactor);
        }
        
        // Set next review date
        srsData.nextReview = new Date(Date.now() + srsData.interval * 24 * 60 * 60 * 1000);
        
        this.app.appState.srsData[key] = srsData;
        this.app.saveState();
    }

    showFlashcardResults() {
        const session = this.flashcardSession;
        const duration = Math.floor((Date.now() - session.startTime) / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="text-center">
                    <div class="text-6xl mb-4">🎊</div>
                    <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành phiên ôn tập!</h2>
                    
                    <div class="max-w-md mx-auto mt-6 p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div class="text-2xl font-bold" style="color: var(--success);">${session.correct}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Đúng</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold" style="color: var(--error);">${session.incorrect}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Cần ôn lại</div>
                            </div>
                        </div>
                        
                        <div class="text-sm" style="color: var(--text-secondary);">
                            Thời gian: ${minutes}:${seconds.toString().padStart(2, '0')}
                        </div>
                        
                        <div class="mt-4 text-lg font-semibold" style="color: var(--accent);">
                            +${session.correct * 5} XP
                        </div>
                    </div>
                    
                    <div class="flex gap-3 justify-center mt-6">
                        <button onclick="app.lessonsRenderer.startFlashcardSession(${this.app.appState.currentLessonId})" 
                            class="px-6 py-3 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                            Ôn tập lại
                        </button>
                        <button onclick="app.switchView('lesson', ${this.app.appState.currentLessonId})" 
                            class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                            Về bài học
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Award XP
        this.app.awardXP(session.correct * 5, 'Flashcard practice');
    }

    renderAdvancedQuiz() {
        const quiz = this.quizSession;
        const question = quiz.questions[quiz.currentIndex];
        const progress = ((quiz.currentIndex + 1) / quiz.questions.length) * 100;
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.switchView('lesson', ${quiz.lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <div class="text-center">
                        <h2 class="text-xl font-bold" style="color: var(--text-primary);">Quiz</h2>
                        <p style="color: var(--text-secondary);">Câu ${quiz.currentIndex + 1} / ${quiz.questions.length}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" style="color: var(--accent);">${quiz.score}</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Điểm</div>
                    </div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-8 shadow-sm">
                        
                        <div class="text-center mb-8">
                            ${question.type === 'listening' ? `
                                <button onclick="app.playAudio('${question.audioChar}')" 
                                    class="text-6xl hover:scale-110 transition mb-4">🔊</button>
                            ` : ''}
                            <h3 class="text-xl font-semibold" style="color: var(--text-primary);">${question.prompt}</h3>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${question.options.map((option, index) => `
                                <button class="quiz-option p-4 rounded-lg border-2 hover:shadow-md transition text-left" 
                                    style="background-color: var(--bg-main); border-color: var(--border-color);"
                                    onclick="app.lessonsRenderer.handleQuizAnswer(this, '${option}', '${question.correctAnswer}')">
                                    <span class="text-lg">${String.fromCharCode(65 + index)}. ${option}</span>
                                </button>
                            `).join('')}
                        </div>
                        
                        <div id="quiz-feedback" class="mt-6 text-center"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Auto-play audio for listening questions
        if (question.type === 'listening') {
            setTimeout(() => this.app.playAudio(question.audioChar), 500);
        }
    }

    handleQuizAnswer(button, selected, correct) {
        const quiz = this.quizSession;
        const isCorrect = selected === correct;
        
        // Disable all buttons
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent.includes(correct)) {
                btn.style.borderColor = 'var(--success)';
                btn.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            } else if (btn === button && !isCorrect) {
                btn.style.borderColor = 'var(--error)';
                btn.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }
        });
        
        // Update score
        if (isCorrect) {
            quiz.score += 10;
            document.getElementById('quiz-feedback').innerHTML = 
                '<div class="text-green-500 font-semibold text-lg">✓ Chính xác! +10 điểm</div>';
        } else {
            document.getElementById('quiz-feedback').innerHTML = 
                `<div class="text-red-500 font-semibold text-lg">✗ Sai rồi! Đáp án đúng: ${correct}</div>`;
        }
        
        // Next question after delay
        setTimeout(() => {
            if (quiz.currentIndex < quiz.questions.length - 1) {
                quiz.currentIndex++;
                this.renderAdvancedQuiz();
            } else {
                this.showQuizResults();
            }
        }, 2000);
    }

    showQuizResults() {
        const quiz = this.quizSession;
        const percentage = Math.round((quiz.score / (quiz.questions.length * 10)) * 100);
        const duration = Math.floor((Date.now() - quiz.startTime) / 1000);
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="text-center">
                    <div class="text-6xl mb-4">${percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '💪'}</div>
                    <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">
                        ${percentage >= 80 ? 'Xuất sắc!' : percentage >= 60 ? 'Tốt lắm!' : 'Cố gắng hơn nhé!'}
                    </h2>
                    
                    <div class="max-w-md mx-auto mt-6 p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
                        <div class="text-5xl font-bold mb-2" style="color: var(--accent);">${quiz.score}</div>
                        <div class="text-lg mb-4" style="color: var(--text-secondary);">Tổng điểm</div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <div class="text-2xl font-bold" style="color: var(--info);">${percentage}%</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Độ chính xác</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold" style="color: var(--warning);">${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Thời gian</div>
                            </div>
                        </div>
                        
                        <div class="mt-4 text-lg font-semibold" style="color: var(--accent);">
                            +${quiz.score} XP
                        </div>
                    </div>
                    
                    <div class="flex gap-3 justify-center mt-6">
                        <button onclick="app.lessonsRenderer.startQuizSession(${quiz.lessonId})" 
                            class="px-6 py-3 rounded-lg bg-purple-500 text-white hover:opacity-90 transition font-semibold">
                            Làm lại
                        </button>
                        <button onclick="app.switchView('lesson', ${quiz.lessonId})" 
                            class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                            Về bài học
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Award XP
        this.app.awardXP(quiz.score, 'Quiz completion');
    }

    renderListeningPractice() {
        const session = this.listeningSession;
        const word = session.words[session.currentIndex];
        const progress = ((session.currentIndex + 1) / session.words.length) * 100;
        
        // Generate options
        const options = [word];
        const allWords = lessonsData.find(l => l.id === session.lessonId).vocab;
        while (options.length < 4) {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            if (!options.find(w => w.char === randomWord.char)) {
                options.push(randomWord);
            }
        }
        options.sort(() => 0.5 - Math.random());
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <div class="text-center">
                        <h2 class="text-xl font-bold" style="color: var(--text-primary);">Luyện nghe</h2>
                        <p style="color: var(--text-secondary);">${session.currentIndex + 1} / ${session.words.length}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" style="color: var(--success);">${session.correct}</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Đúng</div>
                    </div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-8 shadow-sm">
                        
                        <div class="text-center mb-8">
                            <button onclick="app.playAudio('${word.char}', 0.7)" 
                                class="text-6xl hover:scale-110 transition">🔊</button>
                            <p class="mt-3 text-sm" style="color: var(--text-secondary);">Nhấn để nghe lại</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            ${options.map(option => `
                                <button class="listening-option p-4 rounded-lg border-2 hover:shadow-md transition" 
                                    style="background-color: var(--bg-main); border-color: var(--border-color);"
                                    onclick="app.lessonsRenderer.checkListeningAnswer('${option.char}', '${word.char}')">
                                    <div class="text-2xl font-bold mb-1">${option.char}</div>
                                    <div class="text-sm" style="color: var(--text-secondary);">${option.pinyin}</div>
                                </button>
                            `).join('')}
                        </div>
                        
                        <div id="listening-feedback" class="mt-6 text-center"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Auto-play audio
        setTimeout(() => this.app.playAudio(word.char, 0.7), 500);
    }

    checkListeningAnswer(selected, correct) {
        const session = this.listeningSession;
        const isCorrect = selected === correct;
        
        // Update UI
        document.querySelectorAll('.listening-option').forEach(btn => {
            btn.disabled = true;
            const char = btn.querySelector('.text-2xl').textContent;
            if (char === correct) {
                btn.style.borderColor = 'var(--success)';
                btn.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            } else if (char === selected && !isCorrect) {
                btn.style.borderColor = 'var(--error)';
                btn.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }
        });
        
        // Update stats
        if (isCorrect) {
            session.correct++;
            document.getElementById('listening-feedback').innerHTML = 
                '<div class="text-green-500 font-semibold">✓ Chính xác!</div>';
        } else {
            const word = session.words[session.currentIndex];
            document.getElementById('listening-feedback').innerHTML = 
                `<div class="text-red-500">✗ Sai rồi! Đáp án: ${word.char} - ${word.viet}</div>`;
        }
        
        // Next word
        setTimeout(() => {
            if (session.currentIndex < session.words.length - 1) {
                session.currentIndex++;
                this.renderListeningPractice();
            } else {
                this.showListeningResults();
            }
        }, 2000);
    }

    showListeningResults() {
        const session = this.listeningSession;
        const percentage = Math.round((session.correct / session.words.length) * 100);
        
        this.app.mainContent.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">🎧</div>
                <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành luyện nghe!</h2>
                <div class="mt-6">
                    <div class="text-4xl font-bold" style="color: var(--accent);">${session.correct}/${session.words.length}</div>
                    <div style="color: var(--text-secondary);">Số câu đúng</div>
                    <div class="mt-2 text-lg" style="color: var(--info);">${percentage}% chính xác</div>
                </div>
                <div class="flex gap-3 justify-center mt-6">
                    <button onclick="app.lessonsRenderer.startListeningSession(${session.lessonId})" 
                        class="px-6 py-3 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                        Luyện tiếp
                    </button>
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                        Về bài học
                    </button>
                </div>
            </div>
        `;
        
        // Award XP
        this.app.awardXP(session.correct * 3, 'Listening practice');
    }

    renderWritingPractice() {
        const session = this.writingSession;
        const word = session.words[session.currentIndex];
        const progress = ((session.currentIndex + 1) / session.words.length) * 100;
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <div class="text-center">
                        <h2 class="text-xl font-bold" style="color: var(--text-primary);">Luyện viết</h2>
                        <p style="color: var(--text-secondary);">${session.currentIndex + 1} / ${session.words.length}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" style="color: var(--accent);">${session.score}</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Điểm</div>
                    </div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-8 shadow-sm text-center">
                        
                        <div class="mb-6">
                            <div class="text-2xl font-bold mb-2" style="color: var(--text-primary);">${word.pinyin}</div>
                            <div class="text-lg" style="color: var(--text-secondary);">${word.viet}</div>
                            <button onclick="app.playAudio('${word.char}')" class="mt-2 text-xl hover:scale-110 transition">🔊</button>
                        </div>
                        
                        <div class="mb-6">
                            <input type="text" id="writing-input" 
                                class="w-full text-center text-4xl p-4 rounded-lg border-2" 
                                style="background-color: var(--bg-main); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Nhập chữ Hán..."
                                autofocus>
                        </div>
                        
                        <div class="flex gap-3 justify-center">
                            <button onclick="app.lessonsRenderer.checkWritingAnswer()" 
                                class="px-6 py-2 rounded-lg bg-green-500 text-white hover:opacity-90 transition font-semibold">
                                Kiểm tra
                            </button>
                            <button onclick="app.lessonsRenderer.showWritingHint('${word.char}')" 
                                class="px-4 py-2 rounded-lg border-2" style="border-color: var(--accent); color: var(--accent);">
                                💡 Gợi ý
                            </button>
                        </div>
                        
                        <div id="writing-feedback" class="mt-4"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add enter key listener
        document.getElementById('writing-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkWritingAnswer();
            }
        });
    }

    checkWritingAnswer() {
        const session = this.writingSession;
        const word = session.words[session.currentIndex];
        const input = document.getElementById('writing-input');
        const feedback = document.getElementById('writing-feedback');
        
        if (input.value === word.char) {
            feedback.innerHTML = '<div class="text-green-500 font-semibold">✓ Chính xác!</div>';
            session.score += 10;
            
            setTimeout(() => {
                if (session.currentIndex < session.words.length - 1) {
                    session.currentIndex++;
                    this.renderWritingPractice();
                } else {
                    this.showWritingResults();
                }
            }, 1500);
        } else {
            feedback.innerHTML = '<div class="text-red-500">✗ Chưa đúng, thử lại!</div>';
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
        }
    }

    showWritingHint(char) {
        const feedback = document.getElementById('writing-feedback');
        feedback.innerHTML = `<div class="text-blue-500">Gợi ý: ${char}</div>`;
    }

    showWritingResults() {
        const session = this.writingSession;
        const percentage = Math.round((session.score / (session.words.length * 10)) * 100);
        
        this.app.mainContent.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">✍️</div>
                <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành luyện viết!</h2>
                <div class="mt-6">
                    <div class="text-4xl font-bold" style="color: var(--accent);">${session.score}</div>
                    <div style="color: var(--text-secondary);">Tổng điểm</div>
                    <div class="mt-2 text-lg" style="color: var(--info);">${percentage}% hoàn thành</div>
                </div>
                <div class="flex gap-3 justify-center mt-6">
                    <button onclick="app.lessonsRenderer.startWritingSession(${session.lessonId})" 
                        class="px-6 py-3 rounded-lg bg-green-500 text-white hover:opacity-90 transition font-semibold">
                        Luyện tiếp
                    </button>
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                        Về bài học
                    </button>
                </div>
            </div>
        `;
        
        // Award XP
        this.app.awardXP(session.score, 'Writing practice');
    }

    // NEW ADVANCED FEATURES

    // 1. Smart Review System - AI-powered review scheduling
    startSmartReview(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        // Get words that need review based on forgetting curve
        const wordsForReview = this.getSmartReviewWords(lesson);
        
        if (wordsForReview.length === 0) {
            this.showNoReviewNeeded();
            return;
        }
        
        this.smartReviewSession = {
            words: wordsForReview,
            currentIndex: 0,
            results: [],
            startTime: Date.now(),
            lessonId: lessonId
        };
        
        this.renderSmartReview();
    }

    getSmartReviewWords(lesson) {
        const now = Date.now();
        const words = [];
        
        lesson.vocab.forEach(word => {
            const key = `${word.char}_${lesson.id}`;
            const srsData = this.app.appState.srsData[key];
            
            if (srsData) {
                // Calculate retention probability based on forgetting curve
                const daysSinceReview = (now - new Date(srsData.lastReviewed).getTime()) / (1000 * 60 * 60 * 24);
                const retentionProbability = Math.exp(-daysSinceReview / (srsData.interval * 2));
                
                // Include word if retention probability is below threshold
                if (retentionProbability < 0.8 || new Date(srsData.nextReview).getTime() <= now) {
                    words.push({
                        ...word,
                        retentionProbability: retentionProbability,
                        priority: srsData.reviewCount === 0 ? 'high' : retentionProbability < 0.5 ? 'high' : 'medium'
                    });
                }
            } else {
                // New words have highest priority
                words.push({
                    ...word,
                    retentionProbability: 0,
                    priority: 'highest'
                });
            }
        });
        
        // Sort by priority and retention probability
        return words.sort((a, b) => {
            const priorityOrder = { highest: 0, high: 1, medium: 2, low: 3 };
            if (a.priority !== b.priority) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return a.retentionProbability - b.retentionProbability;
        });
    }

    // 2. Sentence Builder - Practice creating sentences with vocabulary
    startSentenceBuilder(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.sentenceBuilderSession = {
            lessonId: lessonId,
            vocabulary: lesson.vocab,
            currentSentence: [],
            score: 0,
            sentences: this.generateSentenceTemplates(lesson)
        };
        
        this.renderSentenceBuilder();
    }

    generateSentenceTemplates(lesson) {
        // Generate sentence templates based on lesson vocabulary and grammar
        const templates = [
            { pattern: "我[verb][object]", hint: "Tôi + động từ + tân ngữ" },
            { pattern: "你[question]吗？", hint: "Bạn + câu hỏi + không?" },
            { pattern: "[subject]很[adjective]", hint: "Chủ ngữ + rất + tính từ" },
            { pattern: "[time]我[verb]", hint: "Thời gian + tôi + động từ" }
        ];
        
        return templates;
    }

    renderSentenceBuilder() {
        const session = this.sentenceBuilderSession;
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <h2 class="text-xl font-bold" style="color: var(--text-primary);">Xây dựng câu</h2>
                    <div class="text-right">
                        <div class="text-2xl font-bold" style="color: var(--accent);">${session.score}</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Điểm</div>
                    </div>
                </div>
                
                <div class="max-w-4xl mx-auto">
                    <!-- Sentence building area -->
                    <div style="background-color: var(--bg-secondary); border: 2px dashed var(--border-color);" 
                        class="rounded-xl p-6 min-h-[100px] mb-6">
                        <div id="sentence-area" class="flex flex-wrap gap-2 text-2xl">
                            ${session.currentSentence.length > 0 ? 
                                session.currentSentence.map((word, idx) => `
                                    <span class="px-3 py-1 rounded-lg cursor-pointer hover:opacity-70" 
                                        style="background-color: var(--accent-light); color: var(--accent);"
                                        onclick="app.lessonsRenderer.removeWordFromSentence(${idx})">
                                        ${word.char}
                                    </span>
                                `).join('') : 
                                '<span style="color: var(--text-secondary);">Kéo từ vào đây để tạo câu...</span>'
                            }
                        </div>
                    </div>
                    
                    <!-- Word bank -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-3" style="color: var(--text-primary);">Kho từ vựng:</h3>
                        <div class="flex flex-wrap gap-2">
                            ${session.vocabulary.map((word, idx) => `
                                <button class="word-tile px-4 py-2 rounded-lg border-2 hover:shadow-md transition" 
                                    style="background-color: var(--bg-main); border-color: var(--border-color);"
                                    onclick="app.lessonsRenderer.addWordToSentence(${idx})">
                                    <div class="font-bold">${word.char}</div>
                                    <div class="text-xs" style="color: var(--text-secondary);">${word.pinyin}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Common words -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-3" style="color: var(--text-primary);">Từ phổ biến:</h3>
                        <div class="flex flex-wrap gap-2">
                            ${['的', '是', '了', '我', '你', '他', '她', '们', '在', '有', '这', '那', '吗', '不', '很'].map(char => `
                                <button class="px-3 py-1 rounded-lg border hover:shadow-sm transition text-sm" 
                                    style="background-color: var(--bg-main); border-color: var(--border-color);"
                                    onclick="app.lessonsRenderer.addCommonWord('${char}')">
                                    ${char}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex gap-3 justify-center">
                        <button onclick="app.lessonsRenderer.checkSentence()" 
                            class="px-6 py-2 rounded-lg bg-green-500 text-white hover:opacity-90 transition font-semibold"
                            ${session.currentSentence.length === 0 ? 'disabled' : ''}>
                            Kiểm tra câu
                        </button>
                        <button onclick="app.lessonsRenderer.clearSentence()" 
                            class="px-6 py-2 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                            Xóa tất cả
                        </button>
                        <button onclick="app.playAudio(app.lessonsRenderer.getSentenceText())" 
                            class="px-4 py-2 rounded-lg border-2" style="border-color: var(--accent); color: var(--accent);"
                            ${session.currentSentence.length === 0 ? 'disabled' : ''}>
                            🔊 Nghe
                        </button>
                    </div>
                    
                    <div id="sentence-feedback" class="mt-4"></div>
                </div>
            </div>
        `;
    }

    // 3. Conversation Practice - Interactive dialogue scenarios
    startConversationPractice(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.conversationSession = {
            lessonId: lessonId,
            scenarios: this.generateConversationScenarios(lesson),
            currentScenario: 0,
            currentLine: 0,
            score: 0
        };
        
        this.renderConversationPractice();
    }

    generateConversationScenarios(lesson) {
        // Generate conversation scenarios based on lesson content
        return [
            {
                title: "在餐厅 (At the restaurant)",
                lines: [
                    { speaker: "服务员", text: "您好！请问您要点什么？", translation: "Xin chào! Bạn muốn gọi gì?" },
                    { speaker: "你", text: "___________", options: ["我要一杯咖啡", "我要一杯茶", "我要一杯水"], correct: 0 },
                    { speaker: "服务员", text: "好的，请稍等。", translation: "Được, xin chờ một chút." }
                ]
            },
            {
                title: "自我介绍 (Self introduction)",
                lines: [
                    { speaker: "老师", text: "请你自我介绍一下。", translation: "Hãy tự giới thiệu về mình." },
                    { speaker: "你", text: "___________", options: ["我叫...", "我是学生", "我来自..."], correct: 0 },
                    { speaker: "老师", text: "很高兴认识你！", translation: "Rất vui được biết bạn!" }
                ]
            }
        ];
    }

    // 4. Character Decomposition - Learn character components
    startCharacterDecomposition(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.decompositionSession = {
            lessonId: lessonId,
            characters: lesson.vocab.filter(w => w.char.length === 1),
            currentIndex: 0,
            score: 0
        };
        
        this.renderCharacterDecomposition();
    }

    renderCharacterDecomposition() {
        const session = this.decompositionSession;
        const char = session.characters[session.currentIndex];
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <h2 class="text-xl font-bold" style="color: var(--text-primary);">Phân tích chữ Hán</h2>
                    <div class="text-right">
                        <span style="color: var(--text-secondary);">${session.currentIndex + 1}/${session.characters.length}</span>
                    </div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-8 text-center">
                        
                        <div class="text-8xl font-bold mb-4" style="color: var(--text-primary);">${char.char}</div>
                        <div class="text-xl mb-2" style="color: var(--text-secondary);">${char.pinyin}</div>
                        <div class="text-lg mb-6" style="color: var(--text-secondary);">${char.viet}</div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="p-4 rounded-lg" style="background-color: var(--bg-main);">
                                <h4 class="font-semibold mb-2" style="color: var(--text-primary);">Bộ thủ</h4>
                                <div class="text-2xl">氵(water radical)</div>
                            </div>
                            <div class="p-4 rounded-lg" style="background-color: var(--bg-main);">
                                <h4 class="font-semibold mb-2" style="color: var(--text-primary);">Số nét</h4>
                                <div class="text-2xl">8 nét</div>
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h4 class="font-semibold mb-2" style="color: var(--text-primary);">Thứ tự nét viết</h4>
                            <div class="text-4xl tracking-widest">一 丨 丿 丶 ㇏</div>
                        </div>
                        
                        <button onclick="app.lessonsRenderer.nextCharacterDecomposition()" 
                            class="px-6 py-2 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                            Tiếp theo →
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 5. Progress Analytics - Detailed learning analytics
    showLessonAnalytics(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        const analytics = this.calculateLessonAnalytics(lessonId);
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center gap-4">
                    <button onclick="app.switchView('lesson', ${lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <h2 class="text-2xl font-bold" style="color: var(--text-primary);">Phân tích chi tiết - ${lesson.title}</h2>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Study Time Analysis -->
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-6">
                        <h3 class="font-semibold mb-4" style="color: var(--text-primary);">Thời gian học</h3>
                        <div class="text-3xl font-bold" style="color: var(--accent);">${analytics.totalTime}</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Tổng thời gian</div>
                        <div class="mt-4 space-y-2">
                            <div class="flex justify-between text-sm">
                                <span>Flashcard:</span>
                                <span>${analytics.flashcardTime}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Quiz:</span>
                                <span>${analytics.quizTime}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Luyện tập:</span>
                                <span>${analytics.practiceTime}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Vocabulary Mastery -->
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-6">
                        <h3 class="font-semibold mb-4" style="color: var(--text-primary);">Độ thành thạo từ vựng</h3>
                        <div class="space-y-3">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm">Mới học</span>
                                    <span class="text-sm">${analytics.newWords}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${analytics.newWordsPercent}%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm">Đang học</span>
                                    <span class="text-sm">${analytics.learningWords}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-500 h-2 rounded-full" style="width: ${analytics.learningWordsPercent}%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm">Thành thạo</span>
                                    <span class="text-sm">${analytics.masteredWords}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: ${analytics.masteredWordsPercent}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Performance Stats -->
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-6">
                        <h3 class="font-semibold mb-4" style="color: var(--text-primary);">Hiệu suất học tập</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold" style="color: var(--success);">${analytics.accuracy}%</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Độ chính xác</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold" style="color: var(--info);">${analytics.streakDays}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Ngày liên tiếp</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold" style="color: var(--warning);">${analytics.avgScore}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Điểm TB</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold" style="color: var(--accent);">${analytics.totalXP}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Tổng XP</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Weak Points Analysis -->
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                    class="rounded-xl p-6">
                    <h3 class="font-semibold mb-4" style="color: var(--text-primary);">Điểm cần cải thiện</h3>
                    <div class="space-y-3">
                        ${analytics.weakPoints.map(point => `
                            <div class="flex items-center justify-between p-3 rounded-lg" 
                                style="background-color: var(--bg-main);">
                                <div>
                                    <div class="font-medium">${point.char}</div>
                                    <div class="text-sm" style="color: var(--text-secondary);">${point.pinyin} - ${point.viet}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-sm" style="color: var(--error);">Sai ${point.errors} lần</div>
                                    <button onclick="app.lessonsRenderer.practiceWord(${lessonId}, '${point.char}')" 
                                        class="text-sm text-blue-500 hover:underline">Luyện tập</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Study Recommendations -->
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                    class="rounded-xl p-6">
                    <h3 class="font-semibold mb-4" style="color: var(--text-primary);">Gợi ý học tập</h3>
                    <div class="space-y-3">
                        ${analytics.recommendations.map(rec => `
                            <div class="flex items-start gap-3">
                                <span class="text-2xl">${rec.icon}</span>
                                <div>
                                    <div class="font-medium">${rec.title}</div>
                                    <div class="text-sm" style="color: var(--text-secondary);">${rec.description}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    calculateLessonAnalytics(lessonId) {
        // Calculate detailed analytics for the lesson
        const lesson = lessonsData.find(l => l.id === lessonId);
        const learnedWords = this.getLearnedWordsForLesson(lessonId);
        
        // Mock data for demonstration - in real app, this would come from stored data
        return {
            totalTime: "2h 45m",
            flashcardTime: "1h 20m",
            quizTime: "45m",
            practiceTime: "40m",
            newWords: 5,
            newWordsPercent: 13,
            learningWords: 15,
            learningWordsPercent: 39,
            masteredWords: 18,
            masteredWordsPercent: 47,
            accuracy: 85,
            streakDays: 7,
            avgScore: 82,
            totalXP: 450,
            weakPoints: [
                { char: "请问", pinyin: "qǐngwèn", viet: "Xin hỏi", errors: 5 },
                { char: "歡迎", pinyin: "huānyíng", viet: "Hoan nghênh", errors: 4 }
            ],
            recommendations: [
                { icon: "🎯", title: "Tập trung vào từ khó", description: "Bạn nên dành thêm thời gian cho 5 từ hay bị lỗi" },
                { icon: "📅", title: "Ôn tập định kỳ", description: "Có 8 từ cần ôn tập lại hôm nay" },
                { icon: "🏆", title: "Thử thách mới", description: "Hãy thử chế độ Speed Review để cải thiện tốc độ" }
            ]
        };
    }

    // Helper methods for new features
    addWordToSentence(index) {
        const word = this.sentenceBuilderSession.vocabulary[index];
        this.sentenceBuilderSession.currentSentence.push(word);
        this.renderSentenceBuilder();
    }

    addCommonWord(char) {
        this.sentenceBuilderSession.currentSentence.push({ char: char, pinyin: '', viet: '' });
        this.renderSentenceBuilder();
    }

    removeWordFromSentence(index) {
        this.sentenceBuilderSession.currentSentence.splice(index, 1);
        this.renderSentenceBuilder();
    }

    clearSentence() {
        this.sentenceBuilderSession.currentSentence = [];
        this.renderSentenceBuilder();
    }

    getSentenceText() {
        return this.sentenceBuilderSession.currentSentence.map(w => w.char).join('');
    }

    checkSentence() {
        const sentence = this.getSentenceText();
        const feedback = document.getElementById('sentence-feedback');
        
        // Simple validation - in real app, this would use NLP
        if (sentence.length < 2) {
            feedback.innerHTML = '<div class="text-orange-500">Câu quá ngắn! Hãy thêm từ.</div>';
        } else {
            this.sentenceBuilderSession.score += 10;
            feedback.innerHTML = `
                <div class="text-green-500 font-semibold">
                    ✓ Tốt lắm! +10 điểm
                    <div class="text-sm mt-2">Câu của bạn: "${sentence}"</div>
                </div>
            `;
            
            // Clear sentence after success
            setTimeout(() => {
                this.clearSentence();
                feedback.innerHTML = '';
            }, 3000);
        }
    }

    nextCharacterDecomposition() {
        const session = this.decompositionSession;
        if (session.currentIndex < session.characters.length - 1) {
            session.currentIndex++;
            this.renderCharacterDecomposition();
        } else {
            this.showDecompositionResults();
        }
    }

    showDecompositionResults() {
        this.app.mainContent.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">📚</div>
                <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành phân tích!</h2>
                <p style="color: var(--text-secondary);">Bạn đã học cấu trúc của ${this.decompositionSession.characters.length} chữ Hán</p>
                <button onclick="app.switchView('lesson', ${this.decompositionSession.lessonId})" 
                    class="mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                    Về bài học
                </button>
            </div>
        `;
    }

    showNoReviewNeeded() {
        this.app.mainContent.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">🌟</div>
                <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Tuyệt vời!</h2>
                <p style="color: var(--text-secondary);">Không có từ nào cần ôn tập lúc này.</p>
                <p class="mt-2" style="color: var(--text-secondary);">Hãy học thêm từ mới hoặc quay lại sau.</p>
                <button onclick="app.switchView('lesson', ${this.app.appState.currentLessonId})" 
                    class="mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                    Về bài học
                </button>
            </div>
        `;
    }

    practiceWord(lessonId, char) {
        // Focus practice on a specific word
        const lesson = lessonsData.find(l => l.id === lessonId);
        const word = lesson.vocab.find(w => w.char === char);
        
        if (word) {
            this.flashcardSession = {
                words: [word],
                currentIndex: 0,
                correct: 0,
                incorrect: 0,
                startTime: Date.now()
            };
            this.renderFlashcard(lessonId);
        }
    }

    // Speed Review Feature
    startSpeedReview(lessonId) {
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;
        
        this.speedReviewSession = {
            words: lesson.vocab.sort(() => Math.random() - 0.5),
            currentIndex: 0,
            correct: 0,
            timePerWord: 3000, // 3 seconds per word
            score: 0,
            lessonId: lessonId
        };
        
        this.renderSpeedReview();
    }

    renderSpeedReview() {
        const session = this.speedReviewSession;
        const word = session.words[session.currentIndex];
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.lessonsRenderer.endSpeedReview()" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">✕ Kết thúc</button>
                    <h2 class="text-xl font-bold" style="color: var(--text-primary);">⚡ Speed Review</h2>
                    <div class="text-right">
                        <div class="text-2xl font-bold" style="color: var(--accent);">${session.score}</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Điểm</div>
                    </div>
                </div>
                
                <!-- Timer bar -->
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div id="speed-timer-bar" class="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-1000" 
                        style="width: 100%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto text-center">
                    <div class="text-6xl font-bold mb-4" style="color: var(--text-primary);">${word.char}</div>
                    <div class="text-xl mb-6" style="color: var(--text-secondary);">${word.pinyin}</div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <button onclick="app.lessonsRenderer.speedReviewAnswer(false)" 
                            class="p-6 rounded-xl bg-red-500 text-white text-xl font-semibold hover:opacity-90 transition">
                            ✗ Không biết
                        </button>
                        <button onclick="app.lessonsRenderer.speedReviewAnswer(true)" 
                            class="p-6 rounded-xl bg-green-500 text-white text-xl font-semibold hover:opacity-90 transition">
                            ✓ Biết
                        </button>
                    </div>
                    
                    <div class="mt-4 text-sm" style="color: var(--text-secondary);">
                        ${session.currentIndex + 1} / ${session.words.length}
                    </div>
                </div>
            </div>
        `;
        
        // Start countdown timer
        this.startSpeedTimer();
    }

    startSpeedTimer() {
        const timerBar = document.getElementById('speed-timer-bar');
        let timeLeft = this.speedReviewSession.timePerWord;
        
        // Animate timer bar
        setTimeout(() => {
            timerBar.style.width = '0%';
        }, 100);
        
        this.speedTimer = setTimeout(() => {
            this.speedReviewAnswer(false); // Auto fail if time runs out
        }, timeLeft);
    }

    speedReviewAnswer(correct) {
        clearTimeout(this.speedTimer);
        const session = this.speedReviewSession;
        
        if (correct) {
            session.correct++;
            session.score += 10;
        }
        
        if (session.currentIndex < session.words.length - 1) {
            session.currentIndex++;
            this.renderSpeedReview();
        } else {
            this.showSpeedReviewResults();
        }
    }

    endSpeedReview() {
        clearTimeout(this.speedTimer);
        this.showSpeedReviewResults();
    }

    showSpeedReviewResults() {
        const session = this.speedReviewSession;
        const accuracy = Math.round((session.correct / session.words.length) * 100);
        
        this.app.mainContent.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">⚡</div>
                <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Speed Review hoàn thành!</h2>
                <div class="mt-6">
                    <div class="text-5xl font-bold" style="color: var(--accent);">${session.score}</div>
                    <div style="color: var(--text-secondary);">Tổng điểm</div>
                    <div class="mt-4 grid grid-cols-2 gap-4 max-w-xs mx-auto">
                        <div>
                            <div class="text-2xl font-bold" style="color: var(--success);">${session.correct}</div>
                            <div class="text-sm" style="color: var(--text-secondary);">Đúng</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold" style="color: var(--info);">${accuracy}%</div>
                            <div class="text-sm" style="color: var(--text-secondary);">Chính xác</div>
                        </div>
                    </div>
                </div>
                <button onclick="app.switchView('lesson', ${session.lessonId})" 
                    class="mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                    Về bài học
                </button>
            </div>
        `;
        
        // Award XP
        this.app.awardXP(session.score, 'Speed Review');
    }

    // Render methods for Smart Review
    renderSmartReview() {
        const session = this.smartReviewSession;
        const word = session.words[session.currentIndex];
        const progress = ((session.currentIndex + 1) / session.words.length) * 100;
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <div class="text-center">
                        <h2 class="text-xl font-bold" style="color: var(--text-primary);">🧠 Smart Review</h2>
                        <p class="text-sm" style="color: var(--text-secondary);">Ôn tập dựa trên thuật toán AI</p>
                    </div>
                    <div class="text-right">
                        <div class="text-sm" style="color: ${word.priority === 'highest' ? 'var(--error)' : word.priority === 'high' ? 'var(--warning)' : 'var(--info)'};">
                            Độ ưu tiên: ${word.priority === 'highest' ? 'Rất cao' : word.priority === 'high' ? 'Cao' : 'Trung bình'}
                        </div>
                        <div class="text-xs" style="color: var(--text-secondary);">
                            Xác suất nhớ: ${Math.round(word.retentionProbability * 100)}%
                        </div>
                    </div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-8 text-center">
                        
                        <div class="text-5xl font-bold mb-4" style="color: var(--text-primary);">${word.char}</div>
                        <div class="text-xl mb-2" style="color: var(--text-secondary);">${word.pinyin}</div>
                        
                        <div class="mt-6 mb-6">
                            <input type="text" id="smart-review-input" 
                                class="w-full px-4 py-3 rounded-lg border-2 text-center text-lg" 
                                style="background-color: var(--bg-main); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Nhập nghĩa tiếng Việt..."
                                autofocus>
                        </div>
                        
                        <button onclick="app.lessonsRenderer.checkSmartReviewAnswer()" 
                            class="px-6 py-3 rounded-lg bg-purple-500 text-white hover:opacity-90 transition font-semibold">
                            Kiểm tra
                        </button>
                        
                        <div id="smart-review-feedback" class="mt-4"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add enter key listener
        document.getElementById('smart-review-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkSmartReviewAnswer();
            }
        });
    }

    checkSmartReviewAnswer() {
        const session = this.smartReviewSession;
        const word = session.words[session.currentIndex];
        const input = document.getElementById('smart-review-input').value.toLowerCase().trim();
        const correct = word.viet.toLowerCase();
        
        // Check if answer is correct (allow partial matches)
        const isCorrect = correct.includes(input) || input.includes(correct);
        
        const feedback = document.getElementById('smart-review-feedback');
        if (isCorrect) {
            feedback.innerHTML = `
                <div class="text-green-500 font-semibold">✓ Chính xác!</div>
                <div class="text-sm mt-1" style="color: var(--text-secondary);">${word.viet}</div>
            `;
            session.results.push({ word: word, correct: true });
            
            // Update SRS data
            this.updateSRSData(word, 'good');
        } else {
            feedback.innerHTML = `
                <div class="text-red-500 font-semibold">✗ Sai rồi!</div>
                <div class="text-sm mt-1" style="color: var(--text-secondary);">Đáp án: ${word.viet}</div>
            `;
            session.results.push({ word: word, correct: false });
            
            // Update SRS data
            this.updateSRSData(word, 'again');
        }
        
        // Next word after delay
        setTimeout(() => {
            if (session.currentIndex < session.words.length - 1) {
                session.currentIndex++;
                this.renderSmartReview();
            } else {
                this.showSmartReviewResults();
            }
        }, 2000);
    }

    showSmartReviewResults() {
        const session = this.smartReviewSession;
        const correct = session.results.filter(r => r.correct).length;
        const accuracy = Math.round((correct / session.results.length) * 100);
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="text-center">
                    <div class="text-6xl mb-4">🧠</div>
                    <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Smart Review hoàn thành!</h2>
                    
                    <div class="max-w-md mx-auto mt-6 p-6 rounded-xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            <div>
                                <div class="text-2xl font-bold" style="color: var(--success);">${correct}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Đúng</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold" style="color: var(--error);">${session.results.length - correct}</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Sai</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold" style="color: var(--info);">${accuracy}%</div>
                                <div class="text-sm" style="color: var(--text-secondary);">Chính xác</div>
                            </div>
                        </div>
                        
                        <div class="text-lg font-semibold" style="color: var(--accent);">
                            +${correct * 8} XP
                        </div>
                    </div>
                </div>
                
                <!-- Review summary -->
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                    class="rounded-xl p-6 max-w-2xl mx-auto">
                    <h3 class="font-semibold mb-4" style="color: var(--text-primary);">Chi tiết ôn tập:</h3>
                    <div class="space-y-2 max-h-64 overflow-y-auto">
                        ${session.results.map(result => `
                            <div class="flex items-center justify-between p-2 rounded" 
                                style="background-color: var(--bg-main);">
                                <div class="flex items-center gap-3">
                                    <span class="${result.correct ? 'text-green-500' : 'text-red-500'}">
                                        ${result.correct ? '✓' : '✗'}
                                    </span>
                                    <span class="font-medium">${result.word.char}</span>
                                    <span class="text-sm" style="color: var(--text-secondary);">${result.word.pinyin}</span>
                                </div>
                                <span class="text-sm" style="color: var(--text-secondary);">${result.word.viet}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flex gap-3 justify-center">
                    <button onclick="app.lessonsRenderer.startSmartReview(${session.lessonId})" 
                        class="px-6 py-3 rounded-lg bg-purple-500 text-white hover:opacity-90 transition font-semibold">
                        Ôn tập lại
                    </button>
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                        Về bài học
                    </button>
                </div>
            </div>
        `;
        
        // Award XP
        this.app.awardXP(correct * 8, 'Smart Review');
    }

    // Render Conversation Practice
    renderConversationPractice() {
        const session = this.conversationSession;
        const scenario = session.scenarios[session.currentScenario];
        const line = scenario.lines[session.currentLine];
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <button onclick="app.switchView('lesson', ${session.lessonId})" 
                        style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                    <div class="text-center">
                        <h2 class="text-xl font-bold" style="color: var(--text-primary);">💬 Luyện hội thoại</h2>
                        <p class="text-sm" style="color: var(--text-secondary);">${scenario.title}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" style="color: var(--accent);">${session.score}</div>
                        <div class="text-sm" style="color: var(--text-secondary);">Điểm</div>
                    </div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <!-- Conversation display -->
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                        class="rounded-xl p-6 space-y-4">
                        ${scenario.lines.slice(0, session.currentLine + 1).map((l, idx) => {
                            if (idx < session.currentLine) {
                                return `
                                    <div class="${l.speaker === '你' ? 'text-right' : 'text-left'}">
                                        <div class="inline-block max-w-xs p-3 rounded-lg ${l.speaker === '你' ? 'bg-blue-500 text-white' : ''}" 
                                            style="${l.speaker !== '你' ? 'background-color: var(--bg-main);' : ''}">
                                            <div class="text-xs opacity-75 mb-1">${l.speaker}</div>
                                            <div>${l.text}</div>
                                            ${l.translation ? `<div class="text-xs opacity-75 mt-1">${l.translation}</div>` : ''}
                                        </div>
                                    </div>
                                `;
                            } else if (idx === session.currentLine && l.options) {
                                return `
                                    <div class="text-right">
                                        <div class="text-xs opacity-75 mb-2">你的回答:</div>
                                        <div class="space-y-2">
                                            ${l.options.map((option, optIdx) => `
                                                <button onclick="app.lessonsRenderer.selectConversationOption(${optIdx}, ${l.correct})" 
                                                    class="block ml-auto px-4 py-2 rounded-lg border-2 hover:shadow-md transition text-left" 
                                                    style="background-color: var(--bg-main); border-color: var(--border-color);">
                                                    ${option}
                                                </button>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;
                            }
                            return '';
                        }).join('')}
                    </div>
                    
                    <div id="conversation-feedback" class="mt-4 text-center"></div>
                </div>
            </div>
        `;
    }

    selectConversationOption(selected, correct) {
        const session = this.conversationSession;
        const scenario = session.scenarios[session.currentScenario];
        const isCorrect = selected === correct;
        
        if (isCorrect) {
            session.score += 10;
            document.getElementById('conversation-feedback').innerHTML = 
                '<div class="text-green-500 font-semibold">✓ Tốt lắm!</div>';
        } else {
            document.getElementById('conversation-feedback').innerHTML = 
                '<div class="text-red-500">✗ Thử lại nhé!</div>';
        }
        
        setTimeout(() => {
            if (isCorrect) {
                if (session.currentLine < scenario.lines.length - 1) {
                    session.currentLine++;
                    this.renderConversationPractice();
                } else if (session.currentScenario < session.scenarios.length - 1) {
                    session.currentScenario++;
                    session.currentLine = 0;
                    this.renderConversationPractice();
                } else {
                    this.showConversationResults();
                }
            } else {
                document.getElementById('conversation-feedback').innerHTML = '';
            }
        }, 1500);
    }

    showConversationResults() {
        const session = this.conversationSession;
        
        this.app.mainContent.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">💬</div>
                <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành luyện hội thoại!</h2>
                <div class="mt-6">
                    <div class="text-4xl font-bold" style="color: var(--accent);">${session.score}</div>
                    <div style="color: var(--text-secondary);">Tổng điểm</div>
                </div>
                <button onclick="app.switchView('lesson', ${session.lessonId})" 
                    class="mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                    Về bài học
                </button>
            </div>
        `;
        
        // Award XP
        this.app.awardXP(session.score, 'Conversation practice');
    }
} 