function createLessonContent(lessonData) {
    const vocabHtml = `
        <div id="vocab-content-${lessonData.lesson}" class="lesson-tab-content">
            <div class="mb-4">
                <input type="text" id="vocab-search-${lessonData.lesson}" placeholder="Tìm kiếm từ vựng..." class="w-full p-3 rounded-lg focus:outline-none">
            </div>
        </div>
    `;

    const lessonSection = document.querySelector(`#lesson-${lessonData.lesson}`);
    if (lessonSection) {
        lessonSection.innerHTML = vocabHtml;

        lessonSection.querySelectorAll('.lesson-toggle-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        lessonSection.querySelectorAll('.lesson-tab-content').forEach(tab => tab.classList.add('hidden'));
        const newActiveTab = lessonSection.querySelector(`#${targetTab}-content-${lessonNumber}`);
        if (newActiveTab) {
            newActiveTab.classList.remove('hidden');
        }
    }
}

function initializeApp() {
    const lessonSections = document.querySelectorAll('.lesson-section');
    if (lessonSections.length > 0) {
        lessonSections.forEach(section => {
            const lessonNumber = section.getAttribute('data-lesson');
            const lessonData = { lesson: lessonNumber };
            createLessonContent(lessonData);
        });
    }

    const lessonTabs = document.querySelectorAll('.lesson-tab');
    if (lessonTabs.length > 0) {
        lessonTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const targetTab = this.getAttribute('data-target');
                const lessonNumber = this.getAttribute('data-lesson');
                const lessonSection = document.querySelector(`#lesson-${lessonNumber}`);
                if (lessonSection) {
                    const newActiveTab = lessonSection.querySelector(`#${targetTab}-content-${lessonNumber}`);
                    if (newActiveTab) {
                        newActiveTab.classList.remove('hidden');
                        newActiveTab.classList.add('active');
                    }
                }
            });
        });
    }

    const vocabSearchInputs = document.querySelectorAll('.vocab-search');
    if (vocabSearchInputs.length > 0) {
        vocabSearchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const lessonNumber = this.getAttribute('data-lesson');
                const lessonSection = document.querySelector(`#lesson-${lessonNumber}`);
                if (lessonSection) {
                    const searchValue = this.value.toLowerCase();
                    const vocabContents = lessonSection.querySelectorAll('.lesson-tab-content');
                    vocabContents.forEach(content => {
                        const vocabItems = content.querySelectorAll('.vocab-item');
                        vocabItems.forEach(item => {
                            const text = item.textContent.toLowerCase();
                            if (text.includes(searchValue)) {
                                item.classList.remove('hidden');
                            } else {
                                item.classList.add('hidden');
                            }
                        });
                    });
                }
            });
        });
    }

    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        const chart = new Chart(chartContainer, {
            type: 'bar',
            data: {
                labels: ['Bài 1', 'Bài 2', 'Bài 3', 'Bài 4', 'Bài 5'],
                datasets: [{
                    label: 'Điểm',
                    data: [85, 90, 78, 92, 88],
                    backgroundColor: 'var(--accent)',
                    borderColor: 'var(--accent)',
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        grid: { color: 'var(--border-color)' }
                    },
                    x: {
                        title: { display: true, text: 'Bài học', color: 'var(--text-secondary)' },
                        ticks: { color: 'var(--text-secondary)' },
                        grid: { color: 'var(--border-color)' }
                    }
                },
                plugins: {
                    borderColor: 'var(--accent)',
                    borderWidth: 1
                }
            }
        });
    }
}

initializeApp(); 