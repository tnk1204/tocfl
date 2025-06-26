class DashboardRenderer {
    constructor(app) {
        this.app = app;
    }

    render() {
        const dailyProgress = Math.min(100, (this.app.appState.wordsLearnedToday / this.app.appState.dailyGoal) * 100);
        const xpProgress = (this.app.appState.xp % 1000) / 10;
        
        this.app.mainContent.innerHTML = `
            <div class="space-y-6 md:space-y-8">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Bảng điều khiển</h2>
                        <p class="mt-1" style="color: var(--text-secondary);">Chào mừng bạn trở lại!</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <svg class="progress-ring w-16 h-16">
                                <circle cx="32" cy="32" r="28" stroke="var(--border-color)" stroke-width="4" fill="none"/>
                                <circle class="progress-ring-circle" cx="32" cy="32" r="28" style="stroke-dashoffset: ${251.2 - (dailyProgress * 251.2 / 100)}"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center text-sm font-bold">${Math.round(dailyProgress)}%</div>
                        </div>
                        <div>
                            <div class="text-sm font-semibold">Mục tiêu hàng ngày</div>
                            <div class="text-xs" style="color: var(--text-secondary);">${this.app.appState.wordsLearnedToday}/${this.app.appState.dailyGoal} từ</div>
                        </div>
                    </div>
                </div>
                
                ${this.renderStatsCards()}
                ${this.renderActivityAndSuggestions()}
                ${this.renderProgressChart()}
            </div>`;
        
        this.renderOverviewChart();
    }

    renderStatsCards() {
        const xpProgress = (this.app.appState.xp % 1000) / 10;
        
        return `
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div class="rounded-xl shadow-sm border p-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h3 class="font-semibold mb-2" style="color: var(--text-primary);">Tiến độ học</h3>
                    <div class="text-4xl font-bold text-accent">${this.app.appState.notebookWords.length}</div>
                    <p style="color: var(--text-secondary);">từ đã lưu</p>
                </div>
                
                <div class="rounded-xl shadow-sm border p-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h3 class="font-semibold mb-2" style="color: var(--text-primary);">Kinh nghiệm</h3>
                    <div class="text-4xl font-bold text-blue-500">${this.app.appState.xp}</div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${xpProgress}%"></div>
                    </div>
                </div>
                
                <div class="rounded-xl shadow-sm border p-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h3 class="font-semibold mb-2" style="color: var(--text-primary);">Thời gian học</h3>
                    <div class="text-4xl font-bold text-green-500">${Math.floor(this.app.appState.studyTimeToday / 60)}</div>
                    <p style="color: var(--text-secondary);">phút hôm nay</p>
                </div>
                
                <div class="rounded-xl shadow-sm border p-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h3 class="font-semibold mb-2" style="color: var(--text-primary);">Thành tích</h3>
                    <div class="text-4xl font-bold text-yellow-500">${this.app.appState.achievements.length}</div>
                    <p style="color: var(--text-secondary);">huy hiệu</p>
                </div>
            </div>`;
    }

    renderActivityAndSuggestions() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="rounded-xl shadow-sm border p-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Hoạt động gần đây</h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 p-3 rounded-lg" style="background-color: var(--bg-main);">
                            <span class="text-2xl">📚</span>
                            <div class="flex-1">
                                <div class="font-medium">Học bài 3</div>
                                <div class="text-sm" style="color: var(--text-secondary);">2 giờ trước</div>
                            </div>
                            <span class="text-sm font-semibold text-green-500">+15 XP</span>
                        </div>
                        <div class="flex items-center gap-3 p-3 rounded-lg" style="background-color: var(--bg-main);">
                            <span class="text-2xl">✍️</span>
                            <div class="flex-1">
                                <div class="font-medium">Luyện viết</div>
                                <div class="text-sm" style="color: var(--text-secondary);">5 giờ trước</div>
                            </div>
                            <span class="text-sm font-semibold text-green-500">+10 XP</span>
                        </div>
                    </div>
                </div>
                
                <div class="rounded-xl shadow-sm border p-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Gợi ý hôm nay</h3>
                    <div class="space-y-3">
                        <button class="w-full bg-accent text-white px-4 py-3 rounded-lg hover:opacity-90 transition font-semibold" onclick="window.app.switchView('writing')">
                            ✍️ Luyện viết 10 phút
                        </button>
                        <button class="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:opacity-90 transition font-semibold" onclick="window.app.switchView('listening')">
                            🎧 Luyện nghe từ vựng
                        </button>
                        <button class="w-full border-2 border-accent text-accent px-4 py-3 rounded-lg hover:bg-accent hover:text-white transition font-semibold" onclick="window.app.switchView('flashcards', 1)">
                            🎴 Ôn tập flashcard
                        </button>
                    </div>
                </div>
            </div>`;
    }

    renderProgressChart() {
        return `
            <div class="rounded-xl shadow-md border p-4 md:p-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                 <h3 class="text-xl font-semibold mb-4" style="color: var(--text-primary);">Biểu đồ tiến độ</h3>
                 <div class="relative w-full mx-auto h-64 md:h-80"><canvas id="overview-chart"></canvas></div>
            </div>`;
    }

    renderOverviewChart() {
        const chartEl = document.getElementById('overview-chart');
        if(!chartEl) return;
        
        // Check if lessonsData is available
        if (typeof lessonsData === 'undefined') {
            console.warn('lessonsData not available yet, skipping chart render');
            return;
        }
        
        const ctx = chartEl.getContext('2d');
        const vocabCounts = lessonsData.map(lesson => lesson.vocab.length);
        const lessonLabels = lessonsData.map(lesson => `Bài ${lesson.id}`);
        
        if (this.app.chart) this.app.chart.destroy();
        this.app.chart = new Chart(ctx, { 
            type: 'bar', 
            data: { 
                labels: lessonLabels, 
                datasets: [{ 
                    label: 'Số từ vựng', 
                    data: vocabCounts, 
                    backgroundColor: 'rgba(74, 124, 89, 0.6)', 
                    borderColor: 'rgba(74, 124, 89, 1)', 
                    borderWidth: 1, 
                    borderRadius: 5 
                }] 
            }, 
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: { 
                    y: { 
                        beginAtZero: true 
                    } 
                }, 
                plugins: { 
                    legend: { 
                        display: false 
                    } 
                } 
            } 
        });
    }
} 