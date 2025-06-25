// This file will be populated with the new, functional JavaScript code. 

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const app = document.getElementById('app');
    const pageTitle = document.getElementById('page-title');
    const mainContent = document.getElementById('main-content');
    const themeToggle = document.getElementById('theme-toggle');
    const fab = document.getElementById('fab');
    const loading = document.getElementById('loading');
    const bottomNav = document.querySelector('.bottom-nav');

    // --- State Management ---
    let currentPage = 'dashboard';
    let currentLesson = null;
    let vocabStatus = JSON.parse(localStorage.getItem('vocabStatus')) || {};

    function saveVocabStatus() {
        localStorage.setItem('vocabStatus', JSON.stringify(vocabStatus));
    }

    function getVocabStatus(lesson, char) {
        return vocabStatus[`${lesson}-${char}`] || 'unknown';
    }

    function setVocabStatus(lesson, char, status) {
        vocabStatus[`${lesson}-${char}`] = status;
        saveVocabStatus();
    }

    // --- App Initialization ---
    function init() {
        setupTheme();
        setupNavigation();
        setupFAB();
        
        // Hide loading and show dashboard
        setTimeout(() => {
            loading.style.display = 'none';
            navigateToPage('dashboard');
        }, 1000);
    }

    function setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.className = savedTheme;
        themeToggle.checked = savedTheme === 'dark';
        
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            document.documentElement.className = newTheme;
            localStorage.setItem('theme', newTheme);
        });
    }

    function setupNavigation() {
        bottomNav.addEventListener('click', (e) => {
            const navBtn = e.target.closest('.nav-btn');
            if (navBtn) {
                const targetPage = navBtn.dataset.page;
                navigateToPage(targetPage);
                
                // Update active nav button
                document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                navBtn.classList.add('active');
            }
        });
    }

    function setupFAB() {
        fab.addEventListener('click', () => {
            if (currentPage === 'dashboard') {
                // Quick start - go to first lesson or review
                const wordsToReview = getWordsToReview().length;
                if (wordsToReview > 0) {
                    navigateToPage('review');
                } else {
                    navigateToPage('lessons');
                }
            } else if (currentPage === 'lessons') {
                // Quick access to practice for current lesson
                if (currentLesson) {
                    showLessonDetail(currentLesson, 'practice');
                }
            } else if (currentPage === 'review') {
                // Restart review
                renderReviewPage();
            }
        });
    }

    // --- Navigation System ---
    function navigateToPage(pageName) {
        currentPage = pageName;
        
        // Update page title and FAB
        switch (pageName) {
            case 'dashboard':
                pageTitle.textContent = 'TOCFL A1';
                fab.innerHTML = '<i class="fas fa-play text-lg"></i>';
                renderDashboard();
                break;
            case 'lessons':
                pageTitle.textContent = 'Bài học';
                fab.innerHTML = '<i class="fas fa-search text-lg"></i>';
                renderLessonsPage();
                break;
            case 'review':
                pageTitle.textContent = 'Ôn tập';
                fab.innerHTML = '<i class="fas fa-refresh text-lg"></i>';
                renderReviewPage();
                break;
            case 'progress':
                pageTitle.textContent = 'Tiến độ';
                fab.innerHTML = '<i class="fas fa-chart-bar text-lg"></i>';
                renderProgressPage();
                break;
        }
    }

    // --- Dashboard Page ---
    function renderDashboard() {
        const stats = getVocabStats();
        const wordsToReview = getWordsToReview().length;
        const totalWords = data.lessons.reduce((sum, l) => sum + l.vocab.length, 0);
        const completionRate = Math.round((stats.known / totalWords) * 100);

        mainContent.innerHTML = `
            <div class="p-4">
                <!-- Welcome Section -->
                <div class="mb-6">
                    <h2 class="text-2xl font-bold mb-2">Xin chào! 👋</h2>
                    <p class="text-text-secondary">Hôm nay bạn muốn học gì?</p>
                </div>

                <!-- Progress Ring -->
                <div class="card text-center mb-4">
                    <div class="progress-ring mb-4">
                        <canvas id="progressRing" width="120" height="120"></canvas>
                    </div>
                    <p class="text-sm text-text-secondary mb-1">Tiến độ tổng thể</p>
                    <p class="text-2xl font-bold" style="background-image: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${completionRate}%</p>
                </div>

                <!-- Quick Actions -->
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <button class="card text-center p-4 ${wordsToReview > 0 ? 'border-warning-color' : ''}" onclick="app.navigateToPage('review')">
                        <i class="fas fa-rotate text-2xl mb-2 ${wordsToReview > 0 ? 'text-warning-color' : 'text-text-secondary'}"></i>
                        <p class="font-medium">Ôn tập</p>
                        <p class="text-sm text-text-secondary">${wordsToReview} từ</p>
                    </button>
                    <button class="card text-center p-4" onclick="app.navigateToPage('lessons')">
                        <i class="fas fa-book text-2xl mb-2 text-text-secondary"></i>
                        <p class="font-medium">Bài học</p>
                        <p class="text-sm text-text-secondary">15 bài</p>
                    </button>
                </div>

                <!-- Recent Lessons -->
                <div class="mb-4">
                    <h3 class="text-lg font-bold mb-3">Tiếp tục học</h3>
                    ${renderRecentLessons()}
                </div>

                <!-- Study Streak -->
                <div class="card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">Chuỗi học tập</p>
                            <p class="text-sm text-text-secondary">Hãy duy trì động lực!</p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold text-warning-color">🔥</p>
                            <p class="text-sm text-text-secondary">1 ngày</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Draw progress ring
        drawProgressRing();
        
        // Expose navigation function to global scope for onclick handlers
        window.app = { navigateToPage };
    }

    function drawProgressRing() {
        const canvas = document.getElementById('progressRing');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = 60;
        const centerY = 60;
        const radius = 45;
        const stats = getVocabStats();
        const total = data.lessons.reduce((sum, l) => sum + l.vocab.length, 0);
        const progress = stats.known / total;
        
        // Clear canvas
        ctx.clearRect(0, 0, 120, 120);
        
        // Background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
        ctx.lineWidth = 8;
        ctx.stroke();
        
        // Progress arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, (2 * Math.PI * progress) - Math.PI / 2);
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-start');
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    function renderRecentLessons() {
        const recentLessons = data.lessons.slice(0, 3);
        return recentLessons.map(lesson => `
            <div class="lesson-card" onclick="showLessonDetail(${lesson.lesson})">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="font-medium">Bài ${lesson.lesson}</p>
                        <p class="text-sm text-text-secondary">${lesson.title}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-text-secondary">${lesson.vocab.length} từ</p>
                        ${getLessonProgress(lesson.lesson)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function getLessonProgress(lessonNumber) {
        const lesson = data.lessons.find(l => l.lesson === lessonNumber);
        if (!lesson) return '';
        
        const knownCount = lesson.vocab.filter(v => 
            getVocabStatus(lessonNumber, v.char) === 'known'
        ).length;
        const total = lesson.vocab.length;
        const percentage = Math.round((knownCount / total) * 100);
        
        return `<div class="w-16 h-2 bg-border-color rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-accent-start to-accent-end" style="width: ${percentage}%"></div>
        </div>`;
    }

    // --- Lessons Page ---
    function renderLessonsPage() {
        mainContent.innerHTML = `
            <div class="p-4">
                <div class="mb-4">
                    <input type="text" id="lesson-search" placeholder="Tìm kiếm bài học..." 
                           class="w-full p-4 rounded-lg border border-border-color bg-bg-secondary">
                </div>
                <div id="lessons-list">
                    ${data.lessons.map(lesson => `
                        <div class="lesson-card" onclick="showLessonDetail(${lesson.lesson})">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center">
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-accent-start to-accent-end flex items-center justify-center text-white font-bold mr-3">
                                        ${lesson.lesson}
                                    </div>
                                    <div>
                                        <p class="font-medium">Bài ${lesson.lesson}</p>
                                        <p class="text-sm text-text-secondary">${lesson.vocab.length} từ vựng</p>
                                    </div>
                                </div>
                                <i class="fas fa-chevron-right text-text-secondary"></i>
                            </div>
                            <p class="text-sm text-text-secondary mb-2">${lesson.title}</p>
                            ${getLessonProgress(lesson.lesson)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Setup search
        const searchInput = document.getElementById('lesson-search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const lessonCards = document.querySelectorAll('.lesson-card');
            lessonCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // --- Lesson Detail ---
    function showLessonDetail(lessonNumber, activeTab = 'vocab') {
        currentLesson = lessonNumber;
        const lesson = data.lessons.find(l => l.lesson === lessonNumber);
        if (!lesson) return;

        pageTitle.textContent = `Bài ${lesson.lesson}`;
        fab.innerHTML = '<i class="fas fa-play text-lg"></i>';

        mainContent.innerHTML = `
            <div class="p-4">
                <div class="mb-4">
                    <h2 class="text-xl font-bold mb-1">${lesson.title}</h2>
                    <p class="text-text-secondary">${lesson.vocab.length} từ vựng • ${lesson.grammar.length} điểm ngữ pháp</p>
                </div>

                <!-- Tab Navigation -->
                <div class="tab-nav">
                    <button class="tab-btn ${activeTab === 'vocab' ? 'active' : ''}" data-tab="vocab">Từ vựng</button>
                    <button class="tab-btn ${activeTab === 'grammar' ? 'active' : ''}" data-tab="grammar">Ngữ pháp</button>
                    <button class="tab-btn ${activeTab === 'practice' ? 'active' : ''}" data-tab="practice">Luyện tập</button>
                </div>

                <!-- Tab Content -->
                <div id="tab-content">
                    ${renderTabContent(lesson, activeTab)}
                </div>
            </div>
        `;

        setupLessonDetailEvents(lesson);
    }

    function renderTabContent(lesson, activeTab) {
        switch (activeTab) {
            case 'vocab':
                return renderVocabTab(lesson);
            case 'grammar':
                return renderGrammarTab(lesson);
            case 'practice':
                return renderPracticeTab(lesson);
            default:
                return '';
        }
    }

    function renderVocabTab(lesson) {
        return `
            <div class="vocab-table-container">
                ${lesson.vocab.map(word => `
                    <div class="vocab-row flex items-center p-4">
                        <button class="speaker-btn mr-4" data-char="${word.char}">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <div class="flex-1">
                            <div class="vocab-char">${word.char}</div>
                            <div class="vocab-pinyin">${word.pinyin}</div>
                            <div class="vocab-meaning">${word.meaning}</div>
                        </div>
                        <div class="flex items-center">
                            ${renderStatusButtons(lesson.lesson, word.char)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderStatusButtons(lessonNumber, char) {
        const status = getVocabStatus(lessonNumber, char);
        return `
            <div class="flex" data-lesson="${lessonNumber}" data-char="${char}">
                <button class="status-btn unknown ${status === 'unknown' ? 'active' : ''}" data-status="unknown">
                    <i class="fas fa-times"></i>
                </button>
                <button class="status-btn unsure ${status === 'unsure' ? 'active' : ''}" data-status="unsure">
                    <i class="fas fa-question"></i>
                </button>
                <button class="status-btn known ${status === 'known' ? 'active' : ''}" data-status="known">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        `;
    }

    function renderGrammarTab(lesson) {
        return lesson.grammar.map(item => `
            <div class="card mb-4">
                <h3 class="font-bold mb-2">${item.title}</h3>
                <div class="text-text-secondary mb-3">${item.content}</div>
                ${item.quiz ? `
                    <button class="btn-primary w-full" onclick="showGrammarQuiz(${lesson.lesson}, '${item.title}')">
                        Luyện tập ngữ pháp
                    </button>
                ` : ''}
            </div>
        `).join('');
    }

    function renderPracticeTab(lesson) {
        return `
            <div class="text-center py-8">
                <i class="fas fa-graduation-cap text-4xl text-text-secondary mb-4"></i>
                <h3 class="text-xl font-bold mb-2">Bài kiểm tra từ vựng</h3>
                <p class="text-text-secondary mb-6">Kiểm tra kiến thức của bạn với ${lesson.vocab.length} từ vựng</p>
                <button class="btn-primary w-full" onclick="startVocabQuiz(${lesson.lesson})">
                    Bắt đầu kiểm tra
                </button>
            </div>
        `;
    }

    function setupLessonDetailEvents(lesson) {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('tab-content').innerHTML = renderTabContent(lesson, targetTab);
                setupLessonDetailEvents(lesson); // Re-setup events for new content
            });
        });

        // Status buttons
        document.addEventListener('click', (e) => {
            const statusBtn = e.target.closest('.status-btn');
            if (statusBtn) {
                const container = statusBtn.closest('[data-lesson]');
                const lessonNum = container.dataset.lesson;
                const char = container.dataset.char;
                const status = statusBtn.dataset.status;
                
                setVocabStatus(lessonNum, char, status);
                
                // Update UI
                container.querySelectorAll('.status-btn').forEach(btn => 
                    btn.classList.remove('active'));
                statusBtn.classList.add('active');
            }
        });

        // Speaker buttons
        document.addEventListener('click', (e) => {
            const speakerBtn = e.target.closest('.speaker-btn');
            if (speakerBtn) {
                const char = speakerBtn.dataset.char;
                const utterance = new SpeechSynthesisUtterance(char);
                utterance.lang = 'zh-CN';
                speechSynthesis.speak(utterance);
            }
        });
    }

    // --- Review Page ---
    function renderReviewPage() {
        const wordsToReview = getWordsToReview();
        
        if (wordsToReview.length === 0) {
            mainContent.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="text-center">
                        <i class="fas fa-trophy text-6xl text-warning-color mb-4"></i>
                        <h2 class="text-2xl font-bold mb-2">Tuyệt vời!</h2>
                        <p class="text-text-secondary">Bạn đã ôn xong tất cả từ vựng</p>
                    </div>
                </div>
            `;
            return;
        }

        // Simple flashcard review
        let currentIndex = 0;
        
        function showFlashcard() {
            const word = wordsToReview[currentIndex];
            mainContent.innerHTML = `
                <div class="p-4 h-full flex flex-col">
                    <div class="text-center mb-4">
                        <p class="text-sm text-text-secondary">Bài ${word.lesson}</p>
                        <p class="text-sm text-text-secondary">${currentIndex + 1} / ${wordsToReview.length}</p>
                    </div>

                    <div class="flex-1 flex items-center justify-center">
                        <div id="flashcard" class="card max-w-sm w-full text-center p-8 cursor-pointer">
                            <div class="char-side">
                                <div class="text-6xl font-bold mb-4">${word.char}</div>
                                <p class="text-text-secondary">Nhấn để xem nghĩa</p>
                            </div>
                            <div class="meaning-side hidden">
                                <div class="text-2xl font-bold mb-2" style="color: var(--accent-start)">${word.pinyin}</div>
                                <div class="text-xl">${word.meaning}</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <button class="btn-secondary" onclick="prevFlashcard()" ${currentIndex === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-left mr-2"></i> Trước
                        </button>
                        <button class="btn-secondary" onclick="nextFlashcard()" ${currentIndex === wordsToReview.length - 1 ? 'disabled' : ''}>
                            Sau <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            `;

            document.getElementById('flashcard').addEventListener('click', () => {
                document.querySelector('.char-side').classList.toggle('hidden');
                document.querySelector('.meaning-side').classList.toggle('hidden');
            });
        }

        window.nextFlashcard = () => {
            if (currentIndex < wordsToReview.length - 1) {
                currentIndex++;
                showFlashcard();
            }
        };

        window.prevFlashcard = () => {
            if (currentIndex > 0) {
                currentIndex--;
                showFlashcard();
            }
        };

        showFlashcard();
    }

    // --- Progress Page ---
    function renderProgressPage() {
        const stats = getVocabStats();
        const totalWords = data.lessons.reduce((sum, l) => sum + l.vocab.length, 0);

        mainContent.innerHTML = `
            <div class="p-4">
                <!-- Overall Stats -->
                <div class="grid grid-cols-3 gap-3 mb-6">
                    <div class="progress-stat">
                        <div class="text-2xl font-bold text-success-color">${stats.known}</div>
                        <div class="text-sm text-text-secondary">Đã thuộc</div>
                    </div>
                    <div class="progress-stat">
                        <div class="text-2xl font-bold text-warning-color">${stats.unsure}</div>
                        <div class="text-sm text-text-secondary">Phân vân</div>
                    </div>
                    <div class="progress-stat">
                        <div class="text-2xl font-bold text-danger-color">${stats.unknown}</div>
                        <div class="text-sm text-text-secondary">Chưa thuộc</div>
                    </div>
                </div>

                <!-- Progress Chart -->
                <div class="card mb-6">
                    <h3 class="font-bold mb-4">Tiến độ theo bài</h3>
                    <div class="h-64">
                        <canvas id="progressChart"></canvas>
                    </div>
                </div>

                <!-- Lessons Progress -->
                <div class="card">
                    <h3 class="font-bold mb-4">Chi tiết từng bài</h3>
                    ${data.lessons.map(lesson => {
                        const lessonStats = getLessonStats(lesson.lesson);
                        const completion = Math.round((lessonStats.known / lesson.vocab.length) * 100);
                        return `
                            <div class="flex items-center justify-between py-3 border-b border-border-color last:border-b-0">
                                <div>
                                    <p class="font-medium">Bài ${lesson.lesson}</p>
                                    <p class="text-sm text-text-secondary">${completion}% hoàn thành</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-success-color">${lessonStats.known}/${lesson.vocab.length}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        // Draw progress chart
        drawProgressChart();
    }

    function drawProgressChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const lessonProgress = data.lessons.map(lesson => {
            const stats = getLessonStats(lesson.lesson);
            return Math.round((stats.known / lesson.vocab.length) * 100);
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.lessons.map(l => `Bài ${l.lesson}`),
                datasets: [{
                    label: 'Tiến độ (%)',
                    data: lessonProgress,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-start'),
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') }
                    },
                    x: {
                        grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') }
                    }
                }
            }
        });
    }

    // --- Utility Functions ---
    function getVocabStats() {
        const stats = { known: 0, unsure: 0, unknown: 0 };
        const total = data.lessons.reduce((sum, l) => sum + l.vocab.length, 0);
        
        Object.values(vocabStatus).forEach(status => {
            if (stats[status] !== undefined) stats[status]++;
        });
        
        stats.unknown = total - (stats.known + stats.unsure);
        return stats;
    }

    function getLessonStats(lessonNumber) {
        const lesson = data.lessons.find(l => l.lesson === lessonNumber);
        const stats = { known: 0, unsure: 0, unknown: 0 };
        
        lesson.vocab.forEach(word => {
            const status = getVocabStatus(lessonNumber, word.char);
            stats[status]++;
        });
        
        return stats;
    }

    function getWordsToReview() {
        const words = [];
        data.lessons.forEach(lesson => {
            lesson.vocab.forEach(word => {
                const status = getVocabStatus(lesson.lesson, word.char);
                if (status === 'unknown' || status === 'unsure') {
                    words.push({ ...word, lesson: lesson.lesson });
                }
            });
        });
        return words;
    }

    // --- Global Functions (for onclick handlers) ---
    window.showLessonDetail = showLessonDetail;
    window.startVocabQuiz = (lessonNumber) => {
        // Will implement quiz logic here
        alert('Quiz coming soon!');
    };
    window.showGrammarQuiz = (lessonNumber, grammarTitle) => {
        // Will implement grammar quiz logic here  
        alert('Grammar quiz coming soon!');
    };

    // --- Start App ---
    init();
}); 