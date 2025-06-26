document.addEventListener('DOMContentLoaded', () => {
    const lessonListContainer = document.getElementById('lesson-list');

    // 1. Fetch lesson data
    fetch('data/tocfl_a1.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 2. Load progress from localStorage
            const progressData = JSON.parse(localStorage.getItem('tocflProgress')) || {};

            // 3. Generate a card for each lesson
            data.lessons.forEach(lesson => {
                const lessonProgress = progressData[lesson.id] || 0;

                const card = document.createElement('a');
                card.href = `lesson.html?id=${lesson.id}`;
                card.className = 'lesson-card';

                card.innerHTML = `
                    <h2>Bài ${lesson.id}: ${lesson.title_zh}</h2>
                    <p class="lesson-title-vi">${lesson.title_vi}</p>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${lessonProgress}%"></div>
                    </div>
                    <div class="progress-text">${lessonProgress}% Hoàn thành</div>
                `;

                lessonListContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Could not load lesson data:", error);
            lessonListContainer.innerHTML = `<p style="text-align: center; color: var(--error);">Không thể tải được danh sách bài học. Vui lòng thử lại sau.</p>`;
        });
}); 