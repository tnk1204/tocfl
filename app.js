class ChineseApp {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.mobileHeaderTitle = document.getElementById('mobile-header-title');
        
        this.chart = null;
        this.studyTimer = null;
        this.studyStartTime = null;
        
        // Initialize renderers
        this.dashboardRenderer = new DashboardRenderer(this);
        this.lessonsRenderer = new LessonsRenderer(this);
        this.notebookRenderer = new NotebookRenderer(this);
        
        this.appState = {
            currentView: 'dashboard',
            currentLessonId: null,
            notebookWords: [],
            writingPracticeChars: [],
            currentWritingCharIndex: 0,
            userLevel: 'HSK3',
            streakCount: 5,
            xp: 2450,
            dailyGoal: 20,
            wordsLearnedToday: 12,
            studyTimeToday: 0,
            achievements: [],
            theme: 'light',
            srsData: {},
            dailyStats: {
                wordsLearned: 0,
                timeStudied: 0,
                accuracy: 0,
                mistakeWords: []
            }
        };
        
        // Initialize the app
        this.init();
    }

    init() {
        this.loadState();
        this.setupEventListeners();
        this.updateUIElements();
        this.renderView(this.appState.currentView);
        this.updateActiveNav(this.appState.currentView);
        this.startStudyTimer();
    }

    setupEventListeners() {
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                const title = btn.dataset.title || 'Học Tiếng Trung';
                this.switchView(view);
                this.mobileHeaderTitle.textContent = title;
            });
        });
        
        // Theme toggle
        const desktopThemeToggle = document.getElementById('desktop-theme-toggle');
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (desktopThemeToggle) {
            desktopThemeToggle.addEventListener('click', () => this.toggleTheme());
        }
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1': this.switchView('dashboard'); break;
                    case '2': this.switchView('lessons'); break;
                    case '3': this.switchView('listening'); break;
                    case '4': this.switchView('writing'); break;
                    case '5': this.switchView('notebook'); break;
                }
            }
        });
    }

    saveState() {
        const stateToSave = {
            notebookWords: this.appState.notebookWords,
            userLevel: this.appState.userLevel,
            streakCount: this.appState.streakCount,
            xp: this.appState.xp,
            dailyGoal: this.appState.dailyGoal,
            achievements: this.appState.achievements,
            theme: this.appState.theme,
            srsData: this.appState.srsData,
            lastStudyDate: new Date().toDateString()
        };
        localStorage.setItem('chineseAppState', JSON.stringify(stateToSave));
    }

    loadState() {
        const savedState = localStorage.getItem('chineseAppState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                this.appState.notebookWords = state.notebookWords || [];
                this.appState.userLevel = state.userLevel || 'HSK3';
                this.appState.streakCount = state.streakCount || 0;
                this.appState.xp = state.xp || 0;
                this.appState.dailyGoal = state.dailyGoal || 20;
                this.appState.achievements = state.achievements || [];
                this.appState.theme = state.theme || 'light';
                this.appState.srsData = state.srsData || {};
                
                // Check streak
                const today = new Date().toDateString();
                const yesterday = new Date(Date.now() - 86400000).toDateString();
                if (state.lastStudyDate !== today && state.lastStudyDate !== yesterday) {
                    this.appState.streakCount = 0;
                }
            } catch(e) {
                console.error('Error loading state:', e);
            }
        }
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', this.appState.theme);
    }

    toggleTheme() {
        this.appState.theme = this.appState.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.appState.theme);
        this.saveState();
    }

    startStudyTimer() {
        if (!this.studyTimer) {
            this.studyStartTime = Date.now();
            const timerElement = document.getElementById('study-timer');
            const display = document.getElementById('timer-display');
            timerElement.classList.add('active');
            
            this.studyTimer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - this.studyStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                this.appState.studyTimeToday = elapsed;
            }, 1000);
        }
    }

    stopStudyTimer() {
        if (this.studyTimer) {
            clearInterval(this.studyTimer);
            this.studyTimer = null;
            const timerElement = document.getElementById('study-timer');
            timerElement.classList.remove('active');
            
            const studyTime = Math.floor((Date.now() - this.studyStartTime) / 1000);
            this.appState.dailyStats.timeStudied += studyTime;
            
            // Award XP for study time (1 XP per minute)
            const minutesStudied = Math.floor(studyTime / 60);
            this.appState.xp += minutesStudied;
            
            this.saveState();
        }
    }

    awardXP(amount, reason = '') {
        this.appState.xp += amount;
        this.checkAchievements();
        this.saveState();
    }

    checkAchievements() {
        const achievements = [
            { id: 'first_word', name: 'Từ đầu tiên', description: 'Học từ vựng đầu tiên', condition: () => this.appState.notebookWords.length >= 1, icon: '🌟' },
            { id: 'word_collector', name: 'Sưu tập từ', description: 'Lưu 50 từ vào sổ tay', condition: () => this.appState.notebookWords.length >= 50, icon: '📚' },
            { id: 'week_streak', name: 'Tuần hoàn hảo', description: 'Học 7 ngày liên tiếp', condition: () => this.appState.streakCount >= 7, icon: '🔥' },
            { id: 'xp_master', name: 'Bậc thầy XP', description: 'Đạt 5000 XP', condition: () => this.appState.xp >= 5000, icon: '👑' }
        ];
        
        achievements.forEach(achievement => {
            if (!this.appState.achievements.includes(achievement.id) && achievement.condition()) {
                this.appState.achievements.push(achievement.id);
                this.showAchievementNotification(achievement);
            }
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3';
        notification.innerHTML = `
            <div class="achievement-badge">${achievement.icon}</div>
            <div>
                <div class="font-bold">${achievement.name}</div>
                <div class="text-sm">${achievement.description}</div>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 5000);
    }

    updateUIElements() {
        const desktopStreak = document.getElementById('desktop-streak');
        const mobileStreak = document.getElementById('mobile-streak');
        if (desktopStreak) {
            desktopStreak.textContent = this.appState.streakCount;
        }
        if (mobileStreak) {
            mobileStreak.textContent = this.appState.streakCount;
        }
    }

    switchView(view, lessonId = null) {
        this.appState.currentView = view;
        if(lessonId) this.appState.currentLessonId = lessonId;
        this.renderView(view);
        this.updateActiveNav(view);
    }
    
    updateActiveNav(view) {
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
    }

    renderView(view) {
        this.mainContent.innerHTML = '';
        switch(view) {
            case 'dashboard': 
                this.dashboardRenderer.render(); 
                break;
            case 'lessons': 
                this.lessonsRenderer.render(); 
                break;
            case 'lesson':
                this.lessonsRenderer.renderLesson(this.appState.currentLessonId);
                break;
            case 'notebook': 
                this.notebookRenderer.render(); 
                break;
            case 'writing': 
                this.renderWritingPractice(); 
                break;
            case 'listening': 
                this.renderListeningPractice(); 
                break;
            case 'speaking': 
                this.renderSpeakingPractice(); 
                break;
            case 'dictionary': 
                this.renderDictionary(); 
                break;
            case 'achievements': 
                this.renderAchievements(); 
                break;
            default:
                this.dashboardRenderer.render();
                break;
        }
    }

    playAudio(text, rate = 0.9) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            
            const speechRateControl = document.getElementById('speech-rate');
            if (speechRateControl) {
                utterance.rate = parseFloat(speechRateControl.value);
            } else {
                utterance.rate = rate;
            }
            
            window.speechSynthesis.speak(utterance);
        }
    }

    toggleNotebookWord(button, fromNotebook = false) {
        const wordData = JSON.parse(button.dataset.word);
        const index = this.appState.notebookWords.findIndex(w => w.char === wordData.char && w.lessonId === wordData.lessonId);
        if (index > -1) {
            this.appState.notebookWords.splice(index, 1);
            button.classList.remove('text-yellow-500');
            button.classList.add('text-stone-300');
        } else {
            this.appState.notebookWords.push(wordData);
            button.classList.add('text-yellow-500');
            button.classList.remove('text-stone-300');
        }
        this.saveState();
        if (fromNotebook) this.renderNotebook();
    }

    // Writing Practice Implementation
    renderWritingPractice() {
        if (typeof lessonsData === 'undefined') {
            this.mainContent.innerHTML = '<p>Loading...</p>';
            return;
        }
        
        // Select random words from all lessons
        const allWords = lessonsData.flatMap(lesson => 
            lesson.vocab.map(word => ({...word, lessonId: lesson.id}))
        );
        const practiceWords = allWords.sort(() => 0.5 - Math.random()).slice(0, 10);
        
        this.appState.writingPracticeWords = practiceWords;
        this.appState.currentWritingIndex = 0;
        
        this.renderWritingWord();
    }
    
    renderWritingWord() {
        const word = this.appState.writingPracticeWords[this.appState.currentWritingIndex];
        const progress = ((this.appState.currentWritingIndex + 1) / this.appState.writingPracticeWords.length) * 100;
        
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Luyện viết</h2>
                        <p class="mt-1" style="color: var(--text-secondary);">Viết từ theo pinyin</p>
                    </div>
                    <button onclick="app.switchView('dashboard')" class="text-xl hover:opacity-70 transition" style="color: var(--accent);">✕</button>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-8 shadow-sm text-center">
                        <div class="mb-6">
                            <div class="text-2xl font-bold mb-2" style="color: var(--text-primary);">${word.pinyin}</div>
                            <div class="text-lg" style="color: var(--text-secondary);">${word.viet}</div>
                        </div>
                        
                        <div class="mb-6">
                            <input type="text" id="writing-input" 
                                class="w-full text-center text-4xl p-4 rounded-lg border-2" 
                                style="background-color: var(--bg-main); border-color: var(--border-color); color: var(--text-primary);"
                                placeholder="Nhập chữ Hán..."
                                autofocus>
                        </div>
                        
                        <div class="flex gap-3 justify-center">
                            <button onclick="app.playAudio('${word.char}')" class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:opacity-90 transition">
                                🔊 Nghe
                            </button>
                            <button onclick="app.checkWriting()" class="px-6 py-2 rounded-lg bg-green-500 text-white hover:opacity-90 transition font-semibold">
                                Kiểm tra
                            </button>
                            <button onclick="app.showWritingHint()" class="px-4 py-2 rounded-lg border-2" style="border-color: var(--accent); color: var(--accent);">
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
                this.checkWriting();
            }
        });
    }
    
    checkWriting() {
        const input = document.getElementById('writing-input');
        const feedback = document.getElementById('writing-feedback');
        const word = this.appState.writingPracticeWords[this.appState.currentWritingIndex];
        
        if (input.value === word.char) {
            feedback.innerHTML = '<div class="text-green-500 font-semibold">✓ Chính xác!</div>';
            this.awardXP(5, 'Luyện viết');
            
            setTimeout(() => {
                if (this.appState.currentWritingIndex < this.appState.writingPracticeWords.length - 1) {
                    this.appState.currentWritingIndex++;
                    this.renderWritingWord();
                } else {
                    this.renderWritingComplete();
                }
            }, 1500);
        } else {
            feedback.innerHTML = '<div class="text-red-500">✗ Chưa đúng, thử lại!</div>';
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
        }
    }
    
    showWritingHint() {
        const word = this.appState.writingPracticeWords[this.appState.currentWritingIndex];
        const feedback = document.getElementById('writing-feedback');
        feedback.innerHTML = `<div class="text-blue-500">Gợi ý: ${word.char}</div>`;
    }
    
    renderWritingComplete() {
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="text-center">
                    <div class="text-6xl mb-4">🎉</div>
                    <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành!</h2>
                    <p class="text-lg mb-6" style="color: var(--text-secondary);">Bạn đã hoàn thành bài luyện viết</p>
                    <div class="flex gap-3 justify-center">
                        <button onclick="app.renderWritingPractice()" class="px-6 py-3 rounded-lg bg-green-500 text-white hover:opacity-90 transition font-semibold">
                            Luyện tiếp
                        </button>
                        <button onclick="app.switchView('dashboard')" class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                            Về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderListeningPractice() {
        if (typeof lessonsData === 'undefined') {
            this.mainContent.innerHTML = '<p>Loading...</p>';
            return;
        }
        
        // Select random words for listening practice
        const allWords = lessonsData.flatMap(lesson => 
            lesson.vocab.map(word => ({...word, lessonId: lesson.id}))
        );
        const practiceWords = allWords.sort(() => 0.5 - Math.random()).slice(0, 10);
        
        this.appState.listeningPracticeWords = practiceWords;
        this.appState.currentListeningIndex = 0;
        
        this.renderListeningWord();
    }
    
    renderListeningWord() {
        const word = this.appState.listeningPracticeWords[this.appState.currentListeningIndex];
        const progress = ((this.appState.currentListeningIndex + 1) / this.appState.listeningPracticeWords.length) * 100;
        
        // Generate 4 options including the correct answer
        const allWords = lessonsData.flatMap(lesson => lesson.vocab);
        const options = [word];
        while (options.length < 4) {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            if (!options.find(w => w.char === randomWord.char)) {
                options.push(randomWord);
            }
        }
        options.sort(() => 0.5 - Math.random());
        
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Luyện nghe</h2>
                        <p class="mt-1" style="color: var(--text-secondary);">Nghe và chọn từ đúng</p>
                    </div>
                    <button onclick="app.switchView('dashboard')" class="text-xl hover:opacity-70 transition" style="color: var(--accent);">✕</button>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-8 shadow-sm">
                        <div class="text-center mb-8">
                            <button onclick="app.playAudio('${word.char}', 0.7)" class="text-6xl hover:scale-110 transition-transform">
                                🔊
                            </button>
                            <p class="mt-3 text-sm" style="color: var(--text-secondary);">Nhấn để nghe lại</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            ${options.map((option, index) => `
                                <button class="listening-option p-4 rounded-lg border-2 hover:shadow-md transition" 
                                    style="background-color: var(--bg-main); border-color: var(--border-color); color: var(--text-primary);"
                                    onclick="app.checkListening('${option.char}')">
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
        
        // Auto play the audio
        setTimeout(() => this.playAudio(word.char, 0.7), 500);
    }
    
    checkListening(selectedChar) {
        const word = this.appState.listeningPracticeWords[this.appState.currentListeningIndex];
        const feedback = document.getElementById('listening-feedback');
        const options = document.querySelectorAll('.listening-option');
        
        options.forEach(option => {
            option.disabled = true;
            if (option.querySelector('.text-2xl').textContent === word.char) {
                option.style.borderColor = 'var(--success)';
                option.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
            } else if (option.querySelector('.text-2xl').textContent === selectedChar) {
                option.style.borderColor = 'var(--danger)';
                option.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }
        });
        
        if (selectedChar === word.char) {
            feedback.innerHTML = `<div class="text-green-500 font-semibold">✓ Chính xác! ${word.viet}</div>`;
            this.awardXP(5, 'Luyện nghe');
            
            setTimeout(() => {
                if (this.appState.currentListeningIndex < this.appState.listeningPracticeWords.length - 1) {
                    this.appState.currentListeningIndex++;
                    this.renderListeningWord();
                } else {
                    this.renderListeningComplete();
                }
            }, 2000);
        } else {
            feedback.innerHTML = `<div class="text-red-500">✗ Chưa đúng! Đáp án: ${word.char} - ${word.viet}</div>`;
            
            setTimeout(() => {
                if (this.appState.currentListeningIndex < this.appState.listeningPracticeWords.length - 1) {
                    this.appState.currentListeningIndex++;
                    this.renderListeningWord();
                } else {
                    this.renderListeningComplete();
                }
            }, 3000);
        }
    }
    
    renderListeningComplete() {
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="text-center">
                    <div class="text-6xl mb-4">🎧</div>
                    <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành!</h2>
                    <p class="text-lg mb-6" style="color: var(--text-secondary);">Bạn đã hoàn thành bài luyện nghe</p>
                    <div class="flex gap-3 justify-center">
                        <button onclick="app.renderListeningPractice()" class="px-6 py-3 rounded-lg bg-blue-500 text-white hover:opacity-90 transition font-semibold">
                            Luyện tiếp
                        </button>
                        <button onclick="app.switchView('dashboard')" class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                            Về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderSpeakingPractice() {
        if (typeof lessonsData === 'undefined') {
            this.mainContent.innerHTML = '<p>Loading...</p>';
            return;
        }
        
        // Check if browser supports speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.mainContent.innerHTML = `
                <div class="space-y-6 md:space-y-8">
                    <div>
                        <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Luyện nói</h2>
                        <p class="mt-1" style="color: var(--text-secondary);">Trình duyệt không hỗ trợ</p>
                    </div>
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm text-center">
                        <div class="text-6xl mb-4">😔</div>
                        <p style="color: var(--text-secondary);">Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói.</p>
                        <p class="text-sm mt-2" style="color: var(--text-tertiary);">Vui lòng sử dụng Chrome, Edge hoặc Safari mới nhất.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        // Select random words for speaking practice
        const allWords = lessonsData.flatMap(lesson => 
            lesson.vocab.map(word => ({...word, lessonId: lesson.id}))
        );
        const practiceWords = allWords.sort(() => 0.5 - Math.random()).slice(0, 5);
        
        this.appState.speakingPracticeWords = practiceWords;
        this.appState.currentSpeakingIndex = 0;
        
        this.renderSpeakingWord();
    }
    
    renderSpeakingWord() {
        const word = this.appState.speakingPracticeWords[this.appState.currentSpeakingIndex];
        const progress = ((this.appState.currentSpeakingIndex + 1) / this.appState.speakingPracticeWords.length) * 100;
        
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Luyện nói</h2>
                        <p class="mt-1" style="color: var(--text-secondary);">Đọc từ vựng bằng tiếng Trung</p>
                    </div>
                    <button onclick="app.switchView('dashboard')" class="text-xl hover:opacity-70 transition" style="color: var(--accent);">✕</button>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-8 shadow-sm text-center">
                        <div class="mb-6">
                            <div class="text-6xl font-bold mb-4" style="color: var(--text-primary);">${word.char}</div>
                            <div class="text-xl mb-2" style="color: var(--text-secondary);">${word.pinyin}</div>
                            <div class="text-lg" style="color: var(--text-secondary);">${word.viet}</div>
                        </div>
                        
                        <div class="mb-6">
                            <button onclick="app.playAudio('${word.char}', 0.8)" class="mb-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:opacity-90 transition">
                                🔊 Nghe mẫu
                            </button>
                        </div>
                        
                        <div class="flex justify-center mb-4">
                            <button id="record-btn" onclick="app.toggleRecording()" 
                                class="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center text-white">
                                <span class="text-3xl">🎤</span>
                            </button>
                        </div>
                        
                        <p id="recording-status" class="text-sm" style="color: var(--text-secondary);">Nhấn nút micro để bắt đầu ghi âm</p>
                        
                        <div id="speaking-feedback" class="mt-4"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    toggleRecording() {
        const recordBtn = document.getElementById('record-btn');
        const status = document.getElementById('recording-status');
        const feedback = document.getElementById('speaking-feedback');
        
        if (!this.recognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'zh-CN';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onstart = () => {
                recordBtn.classList.add('animate-pulse');
                recordBtn.classList.remove('bg-red-500');
                recordBtn.classList.add('bg-red-600');
                status.textContent = 'Đang ghi âm... Hãy nói!';
                feedback.innerHTML = '';
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const word = this.appState.speakingPracticeWords[this.appState.currentSpeakingIndex];
                
                // Simple check - in real app would use more sophisticated comparison
                if (transcript.includes(word.char)) {
                    feedback.innerHTML = '<div class="text-green-500 font-semibold">✓ Tuyệt vời! Phát âm chính xác!</div>';
                    this.awardXP(10, 'Luyện nói');
                    
                    setTimeout(() => {
                        if (this.appState.currentSpeakingIndex < this.appState.speakingPracticeWords.length - 1) {
                            this.appState.currentSpeakingIndex++;
                            this.renderSpeakingWord();
                        } else {
                            this.renderSpeakingComplete();
                        }
                    }, 2000);
                } else {
                    feedback.innerHTML = `
                        <div class="text-yellow-500">
                            <p>Bạn nói: "${transcript}"</p>
                            <p class="mt-2">Hãy thử lại!</p>
                        </div>
                    `;
                }
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                feedback.innerHTML = '<div class="text-red-500">Không thể nhận dạng. Hãy thử lại!</div>';
            };
            
            this.recognition.onend = () => {
                recordBtn.classList.remove('animate-pulse');
                recordBtn.classList.add('bg-red-500');
                recordBtn.classList.remove('bg-red-600');
                status.textContent = 'Nhấn nút micro để bắt đầu ghi âm';
            };
        }
        
        if (recordBtn.classList.contains('bg-red-600')) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }
    
    renderSpeakingComplete() {
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="text-center">
                    <div class="text-6xl mb-4">🎉</div>
                    <h2 class="text-3xl font-bold mb-2" style="color: var(--text-primary);">Hoàn thành!</h2>
                    <p class="text-lg mb-6" style="color: var(--text-secondary);">Bạn đã hoàn thành bài luyện nói</p>
                    <div class="flex gap-3 justify-center">
                        <button onclick="app.renderSpeakingPractice()" class="px-6 py-3 rounded-lg bg-purple-500 text-white hover:opacity-90 transition font-semibold">
                            Luyện tiếp
                        </button>
                        <button onclick="app.switchView('dashboard')" class="px-6 py-3 rounded-lg border-2" style="border-color: var(--border-color); color: var(--text-primary);">
                            Về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderDictionary() {
        if (typeof lessonsData === 'undefined') {
            this.mainContent.innerHTML = '<p>Loading...</p>';
            return;
        }
        
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div>
                    <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Từ điển</h2>
                    <p class="mt-1" style="color: var(--text-secondary);">Tìm kiếm từ vựng trong tất cả bài học</p>
                </div>
                
                <div class="max-w-2xl mx-auto">
                    <div class="relative mb-6">
                        <input type="text" id="dictionary-search" 
                            class="w-full px-4 py-3 pr-10 rounded-lg border-2" 
                            style="background-color: var(--bg-secondary); border-color: var(--border-color); color: var(--text-primary);"
                            placeholder="Tìm theo chữ Hán, Pinyin hoặc nghĩa tiếng Việt..."
                            oninput="app.searchDictionary()">
                        <span class="absolute right-3 top-3.5 text-gray-400">🔍</span>
                    </div>
                    
                    <div id="dictionary-results" class="space-y-3">
                        <p class="text-center" style="color: var(--text-secondary);">Nhập từ khóa để tìm kiếm...</p>
                    </div>
                </div>
            </div>
        `;
        
        // Focus on search input
        setTimeout(() => document.getElementById('dictionary-search').focus(), 100);
    }
    
    searchDictionary() {
        const searchTerm = document.getElementById('dictionary-search').value.toLowerCase().trim();
        const resultsDiv = document.getElementById('dictionary-results');
        
        if (!searchTerm) {
            resultsDiv.innerHTML = '<p class="text-center" style="color: var(--text-secondary);">Nhập từ khóa để tìm kiếm...</p>';
            return;
        }
        
        // Search through all words
        const results = [];
        lessonsData.forEach(lesson => {
            lesson.vocab.forEach(word => {
                if (word.char.toLowerCase().includes(searchTerm) ||
                    word.pinyin.toLowerCase().includes(searchTerm) ||
                    word.viet.toLowerCase().includes(searchTerm)) {
                    results.push({...word, lessonId: lesson.id, lessonTitle: lesson.title});
                }
            });
        });
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p class="text-center" style="color: var(--text-secondary);">Không tìm thấy kết quả nào.</p>';
            return;
        }
        
        resultsDiv.innerHTML = results.map(word => {
            const isInNotebook = this.appState.notebookWords.some(w => w.char === word.char && w.lessonId === word.lessonId);
            return `
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                    class="p-4 rounded-lg flex justify-between items-center">
                    <div class="flex-1">
                        <div class="flex items-baseline gap-3">
                            <span class="text-2xl font-bold" style="color: var(--text-primary);">${word.char}</span>
                            <span style="color: var(--text-secondary);">${word.pinyin}</span>
                        </div>
                        <p style="color: var(--text-secondary);">${word.viet}</p>
                        <p class="text-sm mt-1" style="color: var(--text-tertiary);">Bài ${word.lessonId}: ${word.lessonTitle}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="text-xl hover:opacity-70 transition" onclick="app.playAudio('${word.char}')">🔊</button>
                        <button class="text-xl ${isInNotebook ? 'text-yellow-500' : 'text-stone-300'} hover:text-yellow-400 transition" 
                            data-word='${JSON.stringify({char: word.char, pinyin: word.pinyin, viet: word.viet, lessonId: word.lessonId})}'
                            onclick="app.toggleNotebookWord(this)">⭐</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAchievements() {
        const allAchievements = [
            { id: 'first_word', name: 'Từ đầu tiên', description: 'Học từ vựng đầu tiên', icon: '🌟', xp: 10 },
            { id: 'word_collector_10', name: 'Nhà sưu tập', description: 'Lưu 10 từ vào sổ tay', icon: '📚', xp: 20 },
            { id: 'word_collector_50', name: 'Sưu tập gia', description: 'Lưu 50 từ vào sổ tay', icon: '📖', xp: 50 },
            { id: 'word_collector_100', name: 'Bậc thầy từ vựng', description: 'Lưu 100 từ vào sổ tay', icon: '🎓', xp: 100 },
            { id: 'week_streak', name: 'Tuần hoàn hảo', description: 'Học 7 ngày liên tiếp', icon: '🔥', xp: 70 },
            { id: 'month_streak', name: 'Tháng kiên trì', description: 'Học 30 ngày liên tiếp', icon: '💪', xp: 300 },
            { id: 'xp_500', name: 'Học viên chăm chỉ', description: 'Đạt 500 XP', icon: '⭐', xp: 50 },
            { id: 'xp_1000', name: 'Học viên xuất sắc', description: 'Đạt 1000 XP', icon: '🌟', xp: 100 },
            { id: 'xp_5000', name: 'Bậc thầy XP', description: 'Đạt 5000 XP', icon: '👑', xp: 500 },
            { id: 'perfect_quiz', name: 'Điểm 10', description: 'Hoàn thành quiz với điểm tuyệt đối', icon: '💯', xp: 30 },
            { id: 'speed_learner', name: 'Tốc độ ánh sáng', description: 'Hoàn thành 20 từ trong 5 phút', icon: '⚡', xp: 40 },
            { id: 'night_owl', name: 'Cú đêm', description: 'Học sau 10 giờ tối', icon: '🦉', xp: 20 },
            { id: 'early_bird', name: 'Chim sớm', description: 'Học trước 6 giờ sáng', icon: '🐦', xp: 20 },
            { id: 'lesson_master_1', name: 'Hoàn thành bài 1', description: 'Học hết từ vựng bài 1', icon: '1️⃣', xp: 30 },
            { id: 'halfway_there', name: 'Nửa chặng đường', description: 'Hoàn thành 50% bài học', icon: '🎯', xp: 150 },
            { id: 'course_complete', name: 'Tốt nghiệp', description: 'Hoàn thành toàn bộ khóa học', icon: '🎉', xp: 1000 }
        ];
        
        const earnedAchievements = allAchievements.filter(a => this.appState.achievements.includes(a.id));
        const lockedAchievements = allAchievements.filter(a => !this.appState.achievements.includes(a.id));
        
        this.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div>
                    <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Thành tích</h2>
                    <p class="mt-1" style="color: var(--text-secondary);">Đã mở khóa ${earnedAchievements.length}/${allAchievements.length} thành tích</p>
                </div>
                
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-semibold" style="color: var(--text-primary);">Tiến độ</span>
                        <span style="color: var(--text-secondary);">${Math.round(earnedAchievements.length / allAchievements.length * 100)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all" 
                            style="width: ${earnedAchievements.length / allAchievements.length * 100}%"></div>
                    </div>
                </div>
                
                ${earnedAchievements.length > 0 ? `
                    <div>
                        <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Đã đạt được</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${earnedAchievements.map(achievement => `
                                <div style="background-color: var(--bg-secondary); border: 2px solid var(--warning);" 
                                    class="p-4 rounded-lg flex items-center gap-4">
                                    <div class="text-4xl">${achievement.icon}</div>
                                    <div class="flex-1">
                                        <h4 class="font-semibold" style="color: var(--text-primary);">${achievement.name}</h4>
                                        <p class="text-sm" style="color: var(--text-secondary);">${achievement.description}</p>
                                        <p class="text-sm text-yellow-600 mt-1">+${achievement.xp} XP</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div>
                    <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Chưa mở khóa</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${lockedAchievements.map(achievement => `
                            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" 
                                class="p-4 rounded-lg flex items-center gap-4 opacity-60">
                                <div class="text-4xl grayscale">${achievement.icon}</div>
                                <div class="flex-1">
                                    <h4 class="font-semibold" style="color: var(--text-primary);">${achievement.name}</h4>
                                    <p class="text-sm" style="color: var(--text-secondary);">${achievement.description}</p>
                                    <p class="text-sm" style="color: var(--text-tertiary);">+${achievement.xp} XP</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    updateSRSData(word, difficulty) {
        const key = `${word.char}_${word.lessonId}`;
        if (!this.appState.srsData[key]) {
            this.appState.srsData[key] = {
                word: word,
                difficulty: difficulty,
                reviewCount: 0,
                lastReviewed: new Date(),
                nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
            };
        } else {
            this.appState.srsData[key].difficulty = difficulty;
            this.appState.srsData[key].reviewCount++;
            this.appState.srsData[key].lastReviewed = new Date();
            
            // Calculate next review based on difficulty
            let daysToAdd = 1;
            switch(difficulty) {
                case 'easy': daysToAdd = 7; break;
                case 'medium': daysToAdd = 3; break;
                case 'hard': daysToAdd = 1; break;
            }
            this.appState.srsData[key].nextReview = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
        }
        this.saveState();
    }
} 