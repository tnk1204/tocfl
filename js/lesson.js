document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const lessonTitleZh = document.getElementById('lesson-title-zh');
    const lessonTitleVi = document.getElementById('lesson-title-vi');
    const flashcard = document.getElementById('flashcard');
    const flashcardChar = document.getElementById('flashcard-char');
    const flashcardPinyin = document.getElementById('flashcard-pinyin');
    const flashcardTranslation = document.getElementById('flashcard-translation');
    const showAnswerBtn = document.getElementById('show-answer-btn');
    const nextBtn = document.getElementById('next-btn');
    const vocabSection = document.getElementById('vocab-section');
    const grammarSection = document.getElementById('grammar-section');
    const summaryScreen = document.getElementById('summary-screen');

    // --- State ---
    let currentLesson = null;
    let currentVocabIndex = 0;
    let isFlipped = false;

    // --- Initialization ---
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = parseInt(urlParams.get('id'));

    if (!lessonId) {
        window.location.href = 'index.html'; // Redirect if no ID
        return;
    }

    fetch('data/tocfl_a1.json')
        .then(response => response.json())
        .then(data => {
            currentLesson = data.lessons.find(l => l.id === lessonId);
            if (currentLesson) {
                startLesson();
            } else {
                console.error('Lesson not found');
                // Handle error: show message, redirect
            }
        });

    // --- Functions ---
    function startLesson() {
        // Populate header
        lessonTitleZh.textContent = `Bài ${currentLesson.id}: ${currentLesson.title_zh}`;
        lessonTitleVi.textContent = currentLesson.title_vi;

        // Start with vocabulary
        displayCurrentVocab();
    }

    function displayCurrentVocab() {
        if (currentVocabIndex < currentLesson.vocabulary.length) {
            const vocab = currentLesson.vocabulary[currentVocabIndex];
            
            // Reset card state
            isFlipped = false;
            flashcard.classList.remove('flipped');
            
            // Update content
            flashcardChar.textContent = vocab.character;
            flashcardPinyin.textContent = vocab.pinyin;
            flashcardTranslation.textContent = vocab.translation;

            showAnswerBtn.disabled = false;
        } else {
            // Vocabulary finished, show grammar
            showGrammar();
        }
    }

    function showGrammar() {
        vocabSection.classList.add('hidden');
        grammarSection.classList.remove('hidden');

        let grammarHTML = '<h2>Ngữ pháp</h2>';
        currentLesson.grammar.forEach(point => {
            grammarHTML += `
                <div class="grammar-card">
                    <h3>${point.point}</h3>
                    <p>${point.explanation}</p>
                </div>
            `;
        });
        grammarSection.innerHTML = grammarHTML;
        
        // Add a button to finish the lesson
        const finishBtn = document.createElement('button');
        finishBtn.textContent = 'Hoàn thành bài học';
        finishBtn.className = 'control-btn';
        finishBtn.style.margin = '20px auto 0';
        finishBtn.style.display = 'block';

        finishBtn.onclick = showSummary;
        grammarSection.appendChild(finishBtn);
    }
    
    function showSummary() {
        grammarSection.classList.add('hidden');
        summaryScreen.classList.remove('hidden');
        document.getElementById('lesson-header').classList.add('hidden');
        updateProgress();
    }
    
    function updateProgress() {
        let progress = JSON.parse(localStorage.getItem('tocflProgress')) || {};
        progress[currentLesson.id] = 100; // Mark as complete
        localStorage.setItem('tocflProgress', JSON.stringify(progress));
    }


    // --- Event Listeners ---
    showAnswerBtn.addEventListener('click', () => {
        isFlipped = true;
        flashcard.classList.add('flipped');
        showAnswerBtn.disabled = true;
    });
    
    flashcard.addEventListener('click', () => {
        if (!isFlipped) {
             isFlipped = true;
             flashcard.classList.add('flipped');
             showAnswerBtn.disabled = true;
        }
    });

    nextBtn.addEventListener('click', () => {
        currentVocabIndex++;
        displayCurrentVocab();
    });
}); 