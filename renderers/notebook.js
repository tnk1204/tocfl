class NotebookRenderer {
    constructor(app) {
        this.app = app;
    }

    render() {
        let contentHtml = `
            <div class="space-y-6 md:space-y-8">
                <div>
                    <h2 class="text-3xl font-bold" style="color: var(--text-primary);">Sổ tay từ vựng</h2>
                    <p class="mt-1" style="color: var(--text-secondary);">Các từ vựng đã lưu</p>
                </div>
        `;

        if (this.app.appState.notebookWords.length === 0) {
            contentHtml += `
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="p-6 rounded-xl text-center shadow-sm">
                    <div class="text-6xl mb-4" style="color: var(--text-secondary);">📔</div>
                    <p style="color: var(--text-secondary);" class="text-lg">Sổ tay của bạn đang trống.</p>
                    <p style="color: var(--text-secondary);" class="text-sm mt-2">Nhấn vào ngôi sao ⭐ bên cạnh từ vựng để lưu lại đây.</p>
                </div>
            `;
        } else {
            contentHtml += `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${this.app.appState.notebookWords.map(word => `
                        <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" class="p-4 rounded-xl shadow-sm flex justify-between items-start">
                            <div>
                                <p class="text-xs" style="color: var(--text-secondary);">Bài ${word.lessonId}</p>
                                <p class="text-2xl font-bold" style="color: var(--text-primary);">${word.char}</p>
                                <p style="color: var(--text-secondary);">${word.pinyin}</p>
                                <p class="mt-1" style="color: var(--text-secondary);">${word.viet}</p>
                            </div>
                            <div class="flex flex-col items-center gap-2">
                                <button class="play-audio-btn text-xl hover:opacity-70 transition" style="color: var(--accent);" data-char="${word.char}">🔊</button>
                                <button class="save-word-btn text-xl text-yellow-500 hover:text-yellow-400 transition" data-word='${JSON.stringify(word)}'>⭐</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        contentHtml += `</div>`;
        this.app.mainContent.innerHTML = contentHtml;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Audio buttons
        document.querySelectorAll('.play-audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.app.playAudio(e.currentTarget.dataset.char);
            });
        });

        // Save word buttons (to remove from notebook)
        document.querySelectorAll('.save-word-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.app.toggleNotebookWord(e.currentTarget, true);
            });
        });
    }
} 