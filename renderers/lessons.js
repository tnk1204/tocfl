class LessonsRenderer {
    constructor(app) {
        this.app = app;
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
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div>
                    <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Bài học</h2>
                    <p class="mt-1" style="color: var(--text-secondary);">Chọn bài học để bắt đầu</p>
                </div>
                <div class="grid gap-4 md:gap-6">
                    ${lessonsData.map(lesson => `
                        <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="app.switchView('lesson', ${lesson.id})">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-xl font-semibold" style="color: var(--text-primary);">${lesson.title}</h3>
                                    <p style="color: var(--text-secondary);" class="mt-1">${lesson.vocab.length} từ vựng</p>
                                </div>
                                <div class="text-3xl" style="color: var(--accent);">→</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
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

        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="flex items-center gap-4">
                    <button id="back-to-lessons" style="color: var(--accent);" class="text-xl hover:opacity-70 transition">←</button>
                    <div>
                        <h2 class="text-2xl md:text-3xl font-bold" style="color: var(--text-primary);">${lesson.title}</h2>
                        <p style="color: var(--text-secondary);" class="mt-1">${lesson.vocab.length} từ vựng</p>
                    </div>
                </div>

                <div class="grid gap-4 md:gap-6">
                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-xl font-semibold" style="color: var(--text-primary);">Từ vựng</h3>
                            <div class="flex gap-2">
                                <button id="flashcard-btn" style="background-color: var(--accent);" class="px-4 py-2 text-white rounded-lg hover:opacity-90 transition">Flashcard</button>
                                <button id="quiz-btn" style="background-color: var(--info);" class="px-4 py-2 text-white rounded-lg hover:opacity-90 transition">Quiz</button>
                            </div>
                        </div>
                        <div class="grid gap-3" id="vocab-list">
                            ${lesson.vocab.map(word => {
                                const isInNotebook = this.app.appState.notebookWords.some(w => w.char === word.char && w.lessonId === lessonId);
                                return `
                                    <div style="background-color: var(--bg-main); border: 1px solid var(--border-color);" class="p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p class="text-xl font-bold" style="color: var(--text-primary);">${word.char}</p>
                                            <p style="color: var(--text-secondary);">${word.pinyin}</p>
                                            <p style="color: var(--text-secondary);" class="text-sm">${word.viet}</p>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <button class="play-audio-btn text-xl hover:opacity-70 transition" data-char="${word.char}">🔊</button>
                                            <button class="save-word-btn text-xl ${isInNotebook ? 'text-yellow-500' : 'text-stone-300'} hover:text-yellow-400 transition" data-word='${JSON.stringify({...word, lessonId})}'>⭐</button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm">
                        <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Ngữ pháp</h3>
                        <div class="space-y-4">
                            ${lesson.grammar.map((item, index) => `
                                <div>
                                    <button class="w-full text-left p-3 rounded-lg flex justify-between items-center grammar-toggle" style="background-color: var(--bg-main); border: 1px solid var(--border-color);" data-index="${index}">
                                        <span class="font-medium" style="color: var(--text-primary);">${item.title}</span>
                                        <span class="transform transition-transform grammar-icon">▼</span>
                                    </button>
                                    <div class="grammar-content mt-2 px-3 max-h-0 overflow-hidden transition-all duration-300" style="color: var(--text-secondary);">
                                        <p class="pb-3">${item.content}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Back button
        const backBtn = document.getElementById('back-to-lessons');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.app.switchView('lessons'));
        }

        // Flashcard button
        const flashcardBtn = document.getElementById('flashcard-btn');
        if (flashcardBtn) {
            flashcardBtn.addEventListener('click', () => this.renderFlashcard(this.app.appState.currentLessonId));
        }

        // Quiz button
        const quizBtn = document.getElementById('quiz-btn');
        if (quizBtn) {
            quizBtn.addEventListener('click', () => this.renderQuiz(this.app.appState.currentLessonId));
        }

        // Audio buttons
        document.querySelectorAll('.play-audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.app.playAudio(e.currentTarget.dataset.char);
            });
        });

        // Save word buttons
        document.querySelectorAll('.save-word-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.app.toggleNotebookWord(e.currentTarget);
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

    renderFlashcard(lessonId) {
        if (typeof lessonsData === 'undefined') {
            console.warn('lessonsData not available yet');
            return;
        }
        
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;

        let currentCardIndex = 0;
        let isFlipped = false;

        const renderCard = () => {
            const word = lesson.vocab[currentCardIndex];
            return `
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <button id="back-to-lesson" style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                        <div class="text-center">
                            <h2 class="text-xl font-bold" style="color: var(--text-primary);">Flashcard - ${lesson.title}</h2>
                            <p style="color: var(--text-secondary);">${currentCardIndex + 1} / ${lesson.vocab.length}</p>
                        </div>
                        <div class="w-8"></div>
                    </div>

                    <div class="flashcard-container max-w-md mx-auto">
                        <div class="flashcard ${isFlipped ? 'is-flipped' : ''}" id="flashcard">
                            <div class="flashcard-face flashcard-front">
                                <div class="text-6xl font-bold mb-4">${word.char}</div>
                                <div style="color: var(--text-secondary);" class="text-lg">${word.pinyin}</div>
                                <div class="mt-4 text-sm opacity-60">Nhấn để xem nghĩa</div>
                            </div>
                            <div class="flashcard-face flashcard-back">
                                <div class="text-2xl font-bold mb-4">${word.viet}</div>
                                <div class="text-lg opacity-80">${word.pinyin}</div>
                                <div class="text-3xl mt-4">${word.char}</div>
                            </div>
                        </div>
                    </div>

                    ${isFlipped ? `
                        <div class="text-center">
                            <p class="mb-4" style="color: var(--text-primary);">Đánh giá độ khó của từ này:</p>
                            <div class="flex justify-center gap-3">
                                <button class="difficulty-btn difficulty-easy text-white px-4 py-2 rounded-lg font-medium" data-difficulty="easy">Dễ</button>
                                <button class="difficulty-btn difficulty-medium text-white px-4 py-2 rounded-lg font-medium" data-difficulty="medium">Vừa</button>
                                <button class="difficulty-btn difficulty-hard text-white px-4 py-2 rounded-lg font-medium" data-difficulty="hard">Khó</button>
                            </div>
                        </div>
                    ` : ''}

                    <div class="flex justify-between items-center max-w-md mx-auto">
                        <button id="prev-card" class="px-4 py-2 rounded-lg" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary);" ${currentCardIndex === 0 ? 'disabled' : ''}>← Trước</button>
                        <button id="play-audio" style="color: var(--accent);" class="text-2xl hover:opacity-70 transition">🔊</button>
                        <button id="next-card" class="px-4 py-2 rounded-lg" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary);" ${currentCardIndex === lesson.vocab.length - 1 ? 'disabled' : ''}>Tiếp →</button>
                    </div>
                </div>
            `;
        };

        this.app.mainContent.innerHTML = renderCard();

        // Event listeners
        document.getElementById('back-to-lesson').addEventListener('click', () => {
            this.renderLesson(lessonId);
        });

        document.getElementById('flashcard').addEventListener('click', () => {
            isFlipped = !isFlipped;
            this.app.mainContent.innerHTML = renderCard();
            this.setupFlashcardEvents();
        });

        this.setupFlashcardEvents();
    }

    setupFlashcardEvents() {
        const lesson = lessonsData.find(l => l.id === this.app.appState.currentLessonId);
        let currentCardIndex = parseInt(document.querySelector('.flashcard-container').dataset.index) || 0;

        document.getElementById('play-audio')?.addEventListener('click', () => {
            this.app.playAudio(lesson.vocab[currentCardIndex].char);
        });

        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.app.updateSRSData(lesson.vocab[currentCardIndex], btn.dataset.difficulty);
                // Move to next card or show completion
                if (currentCardIndex < lesson.vocab.length - 1) {
                    currentCardIndex++;
                    this.renderFlashcard(this.app.appState.currentLessonId);
                } else {
                    this.app.awardXP(50, 'Hoàn thành flashcard!');
                    this.renderLesson(this.app.appState.currentLessonId);
                }
            });
        });
    }

    renderQuiz(lessonId) {
        if (typeof lessonsData === 'undefined') {
            console.warn('lessonsData not available yet');
            return;
        }
        
        const lesson = lessonsData.find(l => l.id === lessonId);
        if (!lesson) return;

        let currentQuestionIndex = 0;
        let score = 0;
        let questions = this.generateQuizQuestions(lesson.vocab);

        const renderQuestion = () => {
            const question = questions[currentQuestionIndex];
            return `
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <button id="back-to-lesson" style="color: var(--accent);" class="text-xl hover:opacity-70 transition">← Quay lại</button>
                        <div class="text-center">
                            <h2 class="text-xl font-bold" style="color: var(--text-primary);">Quiz - ${lesson.title}</h2>
                            <p style="color: var(--text-secondary);">Câu ${currentQuestionIndex + 1} / ${questions.length}</p>
                            <p style="color: var(--accent);" class="font-semibold">Điểm: ${score}/${questions.length}</p>
                        </div>
                        <div class="w-8"></div>
                    </div>

                    <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
                        <div class="text-center mb-6">
                            <h3 class="text-2xl font-bold mb-2" style="color: var(--text-primary);">${question.question}</h3>
                            <p style="color: var(--text-secondary);">${question.prompt}</p>
                        </div>

                        <div class="grid gap-3" id="quiz-options">
                            ${question.options.map((option, index) => `
                                <button class="quiz-option p-4 rounded-lg text-left border transition-all" style="border-color: var(--border-color); background-color: var(--bg-main);" data-index="${index}">
                                    <span style="color: var(--text-primary);">${option}</span>
                                </button>
                            `).join('')}
                        </div>

                        <div id="quiz-feedback" class="mt-6 text-center hidden">
                            <button id="next-question" style="background-color: var(--accent);" class="px-6 py-2 text-white rounded-lg hover:opacity-90 transition">
                                ${currentQuestionIndex === questions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };

        this.app.mainContent.innerHTML = renderQuestion();

        // Event listeners
        document.getElementById('back-to-lesson').addEventListener('click', () => {
            this.renderLesson(lessonId);
        });

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuizAnswer(e.currentTarget, questions[currentQuestionIndex]);
            });
        });
    }

    generateQuizQuestions(vocab) {
        const questions = [];
        const shuffled = [...vocab].sort(() => 0.5 - Math.random()).slice(0, 10);

        shuffled.forEach(word => {
            // Multiple choice: Character to Vietnamese
            const wrongAnswers = vocab.filter(w => w.char !== word.char)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(w => w.viet);
            
            const options = [word.viet, ...wrongAnswers].sort(() => 0.5 - Math.random());
            
            questions.push({
                question: word.char,
                prompt: "Nghĩa tiếng Việt của từ này là gì?",
                options: options,
                correct: word.viet,
                correctIndex: options.indexOf(word.viet),
                word: word
            });
        });

        return questions;
    }

    handleQuizAnswer(button, question) {
        const selectedIndex = parseInt(button.dataset.index);
        const isCorrect = selectedIndex === question.correctIndex;

        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            if (parseInt(opt.dataset.index) === question.correctIndex) {
                opt.classList.add('correct');
            } else if (parseInt(opt.dataset.index) === selectedIndex && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        if (isCorrect) {
            this.app.appState.dailyStats.wordsLearned++;
            this.app.awardXP(10, 'Trả lời đúng!');
        }

        // Show feedback
        document.getElementById('quiz-feedback').classList.remove('hidden');
        document.getElementById('next-question').addEventListener('click', () => {
            // Logic to move to next question or finish quiz
            // This would be implemented based on current quiz state
        });
    }
} 