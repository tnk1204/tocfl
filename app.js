// DOM elements
const vocabGrid = document.getElementById('vocab-grid');
const lessonFilter = document.getElementById('lesson-filter');
const searchInput = document.getElementById('search-input');
const reviewBtn = document.getElementById('review-btn');
const practiceBtn = document.getElementById('practice-btn');
const vocabularyBtn = document.getElementById('vocabulary-btn');
const wordCount = document.getElementById('word-count');
const resetSrsBtn = document.getElementById('reset-srs-btn');

// Modal elements
const quizModal = document.getElementById('quiz-modal');
const reviewModal = document.getElementById('review-modal');
const vocabularyModal = document.getElementById('vocabulary-modal');
const quizModalContent = document.getElementById('quiz-modal-content');
const reviewModalContent = document.getElementById('review-modal-content');
const vocabularyModalContent = document.getElementById('vocabulary-modal-content');

// Current state
let currentWords = [];
let srsData = JSON.parse(localStorage.getItem('srsData')) || {};
let personalNotes = JSON.parse(localStorage.getItem('personalNotes')) || {};
let currentReviewIndex = 0;
let reviewWords = [];
let isReviewMode = false;
let currentVocabularyIndex = 0;
let vocabularyWords = [];

// Speech synthesis setup
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    populateLessonFilter();
    setupEventListeners();
    filterAndDisplayWords();
    updateReviewCount();
    updateVocabularyStats();
}

function populateLessonFilter() {
    const lessons = [...new Set(vocabData.map(word => word.lesson))].sort((a, b) => a - b);
    
    lessons.forEach(lesson => {
        const option = document.createElement('option');
        option.value = lesson;
        option.textContent = `Bài ${lesson}`;
        lessonFilter.appendChild(option);
    });
}

function setupEventListeners() {
    // Filter and search
    lessonFilter.addEventListener('change', filterAndDisplayWords);
    searchInput.addEventListener('input', filterAndDisplayWords);
    
    // Buttons
    reviewBtn.addEventListener('click', startReview);
    practiceBtn.addEventListener('click', openQuizSetup);
    vocabularyBtn.addEventListener('click', openVocabularyModal);
    resetSrsBtn.addEventListener('click', resetSRS);
    
    // Modal close buttons
    document.getElementById('close-quiz-setup-btn').addEventListener('click', closeQuizModal);
    document.getElementById('quiz-close-btn').addEventListener('click', closeQuizModal);
    document.getElementById('review-close-btn').addEventListener('click', closeReviewModal);
    document.getElementById('vocabulary-close-btn').addEventListener('click', closeVocabularyModal);
    
    // Quiz setup
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    
    // Vocabulary controls
    document.getElementById('prev-card-btn').addEventListener('click', () => navigateVocabularyCard(-1));
    document.getElementById('next-card-btn').addEventListener('click', () => navigateVocabularyCard(1));
    document.getElementById('play-slow-btn').addEventListener('click', () => playAudioWithSpeed(0.6));
    document.getElementById('play-normal-btn').addEventListener('click', () => playAudioWithSpeed(0.8));
    document.getElementById('play-fast-btn').addEventListener('click', () => playAudioWithSpeed(1.0));
    document.getElementById('save-note-btn').addEventListener('click', savePersonalNote);
    document.getElementById('clear-note-btn').addEventListener('click', clearPersonalNote);
    
    // Click outside modal to close
    quizModal.addEventListener('click', (e) => {
        if (e.target === quizModal) closeQuizModal();
    });
    
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) closeReviewModal();
    });
    
    vocabularyModal.addEventListener('click', (e) => {
        if (e.target === vocabularyModal) closeVocabularyModal();
    });
}

function filterAndDisplayWords() {
    const selectedLesson = lessonFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    currentWords = vocabData.filter(word => {
        const matchesLesson = selectedLesson === 'all' || word.lesson.toString() === selectedLesson;
        const matchesSearch = searchTerm === '' || 
            word.char.toLowerCase().includes(searchTerm) ||
            word.pinyin.toLowerCase().includes(searchTerm) ||
            word.meaning.toLowerCase().includes(searchTerm);
        
        return matchesLesson && matchesSearch;
    });
    
    displayWords(currentWords);
    updateWordCount();
}

function displayWords(words) {
    vocabGrid.innerHTML = '';
    
    words.forEach((word, index) => {
        const wordCard = createWordCard(word, index);
        vocabGrid.appendChild(wordCard);
    });
}

function createWordCard(word, index) {
    const card = document.createElement('div');
    card.className = 'flashcard-container cursor-pointer';
    card.innerHTML = `
        <div class="flashcard">
            <div class="flashcard-inner">
                <div class="flashcard-front bg-white shadow-lg rounded-lg p-4 border border-slate-200 hover:shadow-xl transition-shadow">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-slate-800 mb-2">${word.char}</div>
                        <div class="text-sm text-slate-500">Bài ${word.lesson}</div>
                    </div>
                </div>
                <div class="flashcard-back bg-blue-600 text-white shadow-lg rounded-lg p-4 border border-blue-700">
                    <div class="text-center">
                        <div class="text-lg font-semibold mb-1">${word.pinyin}</div>
                        <div class="text-sm">${word.meaning}</div>
                        <button class="mt-2 text-white hover:text-blue-200 transition-colors" onclick="playAudio('${word.char}')">
                            🔊
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to flip card
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            card.querySelector('.flashcard').classList.toggle('flipped');
        }
    });
    
    return card;
}

function updateWordCount() {
    wordCount.textContent = `Hiển thị ${currentWords.length} từ`;
}

function updateReviewCount() {
    const reviewWords = getWordsForReview();
    const reviewCount = document.getElementById('review-count');
    
    if (reviewWords.length > 0) {
        reviewCount.textContent = reviewWords.length;
        reviewCount.style.display = 'flex';
        reviewBtn.classList.add('animate-pulse');
    } else {
        reviewCount.style.display = 'none';
        reviewBtn.classList.remove('animate-pulse');
    }
}

function getWordsForReview() {
    const now = Date.now();
    return vocabData.filter(word => {
        const wordId = `${word.char}_${word.lesson}`;
        const srsInfo = srsData[wordId];
        
        if (!srsInfo) return false;
        
        return srsInfo.nextReviewDate <= now;
    });
}

// Enhanced audio functionality
function playAudio(char, speed = 0.8) {
    if ('speechSynthesis' in window) {
        // Stop any current speech
        if (currentUtterance) {
            speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(char);
        utterance.lang = 'zh-CN';
        utterance.rate = speed;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Try to get a Chinese voice
        const voices = speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice => 
            voice.lang.includes('zh') || voice.lang.includes('cmn')
        );
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }
        
        currentUtterance = utterance;
        speechSynthesis.speak(utterance);
    }
}

function playAudioWithSpeed(speed) {
    if (vocabularyWords[currentVocabularyIndex]) {
        playAudio(vocabularyWords[currentVocabularyIndex].char, speed);
    }
}

// Vocabulary learning functionality
function openVocabularyModal() {
    vocabularyWords = [...currentWords];
    currentVocabularyIndex = 0;
    
    if (vocabularyWords.length === 0) {
        alert('Không có từ nào để học!');
        return;
    }
    
    showVocabularyModal();
    displayVocabularyCard();
    updateVocabularyStats();
}

function showVocabularyModal() {
    vocabularyModal.style.display = 'flex';
    setTimeout(() => {
        vocabularyModalContent.style.transform = 'scale(1)';
        vocabularyModalContent.style.opacity = '1';
    }, 10);
}

function closeVocabularyModal() {
    vocabularyModalContent.style.transform = 'scale(0.95)';
    vocabularyModalContent.style.opacity = '0';
    setTimeout(() => {
        vocabularyModal.style.display = 'none';
    }, 200);
}

function displayVocabularyCard() {
    if (currentVocabularyIndex >= vocabularyWords.length) {
        currentVocabularyIndex = 0;
    }
    
    const word = vocabularyWords[currentVocabularyIndex];
    const charElement = document.getElementById('flashcard-char');
    const pinyinElement = document.getElementById('flashcard-pinyin');
    const meaningElement = document.getElementById('flashcard-meaning');
    const currentWordDisplay = document.getElementById('current-word-display');
    const cardCounter = document.getElementById('card-counter');
    const noteTextarea = document.getElementById('personal-note');
    
    charElement.textContent = word.char;
    pinyinElement.textContent = word.pinyin;
    meaningElement.textContent = word.meaning;
    currentWordDisplay.textContent = `${word.char} (${word.pinyin})`;
    cardCounter.textContent = `${currentVocabularyIndex + 1} / ${vocabularyWords.length}`;
    
    // Load personal note
    const wordId = `${word.char}_${word.lesson}`;
    noteTextarea.value = personalNotes[wordId] || '';
}

function navigateVocabularyCard(direction) {
    currentVocabularyIndex += direction;
    
    if (currentVocabularyIndex < 0) {
        currentVocabularyIndex = vocabularyWords.length - 1;
    } else if (currentVocabularyIndex >= vocabularyWords.length) {
        currentVocabularyIndex = 0;
    }
    
    displayVocabularyCard();
}

function savePersonalNote() {
    if (vocabularyWords[currentVocabularyIndex]) {
        const word = vocabularyWords[currentVocabularyIndex];
        const wordId = `${word.char}_${word.lesson}`;
        const noteTextarea = document.getElementById('personal-note');
        
        personalNotes[wordId] = noteTextarea.value;
        localStorage.setItem('personalNotes', JSON.stringify(personalNotes));
        
        // Show success feedback
        const saveBtn = document.getElementById('save-note-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Đã lưu!';
        saveBtn.classList.add('bg-green-600');
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.classList.remove('bg-green-600');
        }, 1000);
    }
}

function clearPersonalNote() {
    if (vocabularyWords[currentVocabularyIndex]) {
        const word = vocabularyWords[currentVocabularyIndex];
        const wordId = `${word.char}_${word.lesson}`;
        const noteTextarea = document.getElementById('personal-note');
        
        delete personalNotes[wordId];
        localStorage.setItem('personalNotes', JSON.stringify(personalNotes));
        noteTextarea.value = '';
    }
}

function updateVocabularyStats() {
    const totalWords = vocabData.length;
    const learnedWords = Object.keys(srsData).length;
    const reviewWords = getWordsForReview().length;
    const masteryRate = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;
    
    document.getElementById('total-words').textContent = totalWords;
    document.getElementById('learned-words').textContent = learnedWords;
    document.getElementById('review-words').textContent = reviewWords;
    document.getElementById('mastery-rate').textContent = `${masteryRate}%`;
}

// Review functionality
function startReview() {
    reviewWords = getWordsForReview();
    
    if (reviewWords.length === 0) {
        alert('Không có từ nào cần ôn tập!');
        return;
    }
    
    currentReviewIndex = 0;
    isReviewMode = true;
    showReviewModal();
    displayReviewCard();
}

function showReviewModal() {
    reviewModal.style.display = 'flex';
    setTimeout(() => {
        reviewModalContent.style.transform = 'scale(1)';
        reviewModalContent.style.opacity = '1';
    }, 10);
}

function closeReviewModal() {
    reviewModalContent.style.transform = 'scale(0.95)';
    reviewModalContent.style.opacity = '0';
    setTimeout(() => {
        reviewModal.style.display = 'none';
        isReviewMode = false;
    }, 200);
}

function displayReviewCard() {
    if (currentReviewIndex >= reviewWords.length) {
        closeReviewModal();
        updateReviewCount();
        alert('Hoàn thành ôn tập!');
        return;
    }
    
    const word = reviewWords[currentReviewIndex];
    const progress = document.getElementById('review-progress');
    const frontCard = document.getElementById('review-card-front');
    const backCard = document.getElementById('review-card-back');
    const difficultyButtons = document.getElementById('review-difficulty-buttons');
    
    progress.textContent = `${currentReviewIndex + 1} / ${reviewWords.length}`;
    
    // Reset card flip
    const flashcard = document.querySelector('#review-card-container .flashcard');
    flashcard.classList.remove('flipped');
    
    // Set card content
    frontCard.innerHTML = `
        <div class="h-full flex flex-col justify-center items-center text-center">
            <div class="text-4xl font-bold text-slate-800 mb-4">${word.char}</div>
            <div class="text-sm text-slate-500">Bài ${word.lesson}</div>
            <div class="mt-4 text-xs text-slate-400">Nhấn để xem đáp án</div>
        </div>
    `;
    
    backCard.innerHTML = `
        <div class="h-full flex flex-col justify-center items-center text-center">
            <div class="text-2xl font-semibold mb-2">${word.pinyin}</div>
            <div class="text-lg mb-4">${word.meaning}</div>
            <button class="text-white hover:text-blue-200 transition-colors" onclick="playAudio('${word.char}')">
                🔊 Nghe phát âm
            </button>
        </div>
    `;
    
    // Add click event to flip card
    flashcard.onclick = () => {
        flashcard.classList.add('flipped');
        difficultyButtons.classList.remove('hidden');
    };
    
    // Hide difficulty buttons initially
    difficultyButtons.classList.add('hidden');
    
    // Setup difficulty buttons
    const buttons = difficultyButtons.querySelectorAll('.btn-difficulty');
    buttons.forEach(btn => {
        btn.onclick = () => handleDifficultySelection(word, parseInt(btn.dataset.difficulty));
    });
}

function handleDifficultySelection(word, difficulty) {
    const wordId = `${word.char}_${word.lesson}`;
    const now = Date.now();
    
    // Update SRS data
    if (!srsData[wordId]) {
        srsData[wordId] = {
            interval: 1,
            repetitions: 0,
            easeFactor: 2.5,
            nextReviewDate: now
        };
    }
    
    const srsInfo = srsData[wordId];
    
    // Update based on difficulty (simplified SM-2 algorithm)
    if (difficulty >= 2) {
        srsInfo.repetitions += 1;
        if (srsInfo.repetitions === 1) {
            srsInfo.interval = 1;
        } else if (srsInfo.repetitions === 2) {
            srsInfo.interval = 6;
        } else {
            srsInfo.interval = Math.round(srsInfo.interval * srsInfo.easeFactor);
        }
        srsInfo.easeFactor = Math.max(1.3, srsInfo.easeFactor + (0.1 - (3 - difficulty) * (0.08 + (3 - difficulty) * 0.02)));
    } else {
        srsInfo.repetitions = 0;
        srsInfo.interval = 1;
    }
    
    srsInfo.nextReviewDate = now + (srsInfo.interval * 24 * 60 * 60 * 1000);
    
    // Save to localStorage
    localStorage.setItem('srsData', JSON.stringify(srsData));
    
    // Move to next card
    currentReviewIndex++;
    displayReviewCard();
}

// Quiz functionality
function openQuizSetup() {
    document.getElementById('quiz-setup').classList.remove('hidden');
    document.getElementById('quiz-main').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    showQuizModal();
}

function showQuizModal() {
    quizModal.style.display = 'flex';
    setTimeout(() => {
        quizModalContent.style.transform = 'scale(1)';
        quizModalContent.style.opacity = '1';
    }, 10);
}

function closeQuizModal() {
    quizModalContent.style.transform = 'scale(0.95)';
    quizModalContent.style.opacity = '0';
    setTimeout(() => {
        quizModal.style.display = 'none';
    }, 200);
}

function startQuiz() {
    const quizType = document.getElementById('quiz-type').value;
    const quizSource = document.getElementById('quiz-source').value;
    
    let quizWords = quizSource === 'current' ? currentWords : vocabData;
    
    if (quizWords.length < 4) {
        alert('Cần ít nhất 4 từ để tạo bài quiz!');
        return;
    }
    
    // Shuffle and take first 10 words
    quizWords = shuffleArray([...quizWords]).slice(0, 10);
    
    document.getElementById('quiz-setup').classList.add('hidden');
    document.getElementById('quiz-main').classList.remove('hidden');
    
    runQuiz(quizWords, quizType);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function runQuiz(words, type) {
    let currentQuestion = 0;
    let score = 0;
    let wrongAnswers = [];
    
    function showQuestion() {
        if (currentQuestion >= words.length) {
            showQuizResults(score, words.length, wrongAnswers);
            return;
        }
        
        const word = words[currentQuestion];
        const progress = document.getElementById('quiz-progress');
        const questionCard = document.getElementById('quiz-question-card');
        const question = document.getElementById('quiz-question');
        const hint = document.getElementById('quiz-question-hint');
        const options = document.getElementById('quiz-options');
        const feedback = document.getElementById('quiz-feedback');
        const replayAudioBtn = document.getElementById('quiz-replay-audio-btn');
        
        progress.textContent = `${currentQuestion + 1} / ${words.length}`;
        feedback.innerHTML = '';
        
        // Generate question and options based on type
        let questionText, correctAnswer, allOptions;
        
        switch(type) {
            case 'char-to-meaning':
                questionText = word.char;
                hint.textContent = 'Chọn nghĩa đúng';
                correctAnswer = word.meaning;
                allOptions = generateOptions(word, 'meaning');
                replayAudioBtn.classList.add('hidden');
                break;
            case 'pinyin-to-meaning':
                questionText = word.pinyin;
                hint.textContent = 'Chọn nghĩa đúng';
                correctAnswer = word.meaning;
                allOptions = generateOptions(word, 'meaning');
                replayAudioBtn.classList.add('hidden');
                break;
            case 'meaning-to-char':
                questionText = word.meaning;
                hint.textContent = 'Chọn chữ Hán đúng';
                correctAnswer = word.char;
                allOptions = generateOptions(word, 'char');
                replayAudioBtn.classList.add('hidden');
                break;
            case 'char-to-pinyin':
                questionText = word.char;
                hint.textContent = 'Chọn pinyin đúng';
                correctAnswer = word.pinyin;
                allOptions = generateOptions(word, 'pinyin');
                replayAudioBtn.classList.add('hidden');
                break;
            case 'audio-to-meaning':
                questionText = '🔊 Nhấn để nghe';
                hint.textContent = 'Nghe và chọn nghĩa đúng';
                correctAnswer = word.meaning;
                allOptions = generateOptions(word, 'meaning');
                replayAudioBtn.classList.remove('hidden');
                replayAudioBtn.onclick = () => playAudio(word.char);
                // Auto-play audio
                setTimeout(() => playAudio(word.char), 500);
                break;
            case 'listening-comprehension':
                questionText = '🔊 Nghe hiểu';
                hint.textContent = 'Nghe câu và chọn từ phù hợp';
                correctAnswer = word.char;
                allOptions = generateOptions(word, 'char');
                replayAudioBtn.classList.remove('hidden');
                replayAudioBtn.onclick = () => playAudio(word.char);
                // Auto-play audio
                setTimeout(() => playAudio(word.char), 500);
                break;
            case 'reading-comprehension':
                questionText = `Đọc câu: "这是${word.char}。"`;
                hint.textContent = 'Chọn nghĩa phù hợp với từ trong câu';
                correctAnswer = word.meaning;
                allOptions = generateOptions(word, 'meaning');
                replayAudioBtn.classList.add('hidden');
                break;
        }
        
        question.textContent = questionText;
        
        // Create option buttons
        options.innerHTML = '';
        allOptions.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'p-4 bg-white border border-slate-300 rounded-lg hover:bg-blue-50 transition text-left';
            btn.textContent = option;
            btn.onclick = () => handleAnswer(option, correctAnswer, word);
            options.appendChild(btn);
        });
    }
    
    function generateOptions(currentWord, field) {
        const options = [currentWord[field]];
        const allWords = vocabData.filter(w => w !== currentWord);
        
        while (options.length < 4) {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            if (!options.includes(randomWord[field])) {
                options.push(randomWord[field]);
            }
        }
        
        return shuffleArray(options);
    }
    
    function handleAnswer(selected, correct, word) {
        const feedback = document.getElementById('quiz-feedback');
        const buttons = document.querySelectorAll('#quiz-options button');
        
        buttons.forEach(btn => btn.disabled = true);
        
        if (selected === correct) {
            score++;
            feedback.innerHTML = '<span class="text-green-600">✓ Đúng!</span>';
        } else {
            wrongAnswers.push(word);
            feedback.innerHTML = `<span class="text-red-600">✗ Sai! Đáp án: ${correct}</span>`;
        }
        
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1500);
    }
    
    showQuestion();
}

function showQuizResults(score, total, wrongAnswers) {
    document.getElementById('quiz-main').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    
    const scoreElement = document.getElementById('quiz-score');
    const wrongAnswersElement = document.getElementById('quiz-wrong-answers');
    
    const percentage = Math.round((score / total) * 100);
    scoreElement.textContent = `${score}/${total} (${percentage}%)`;
    
    if (wrongAnswers.length > 0) {
        wrongAnswersElement.innerHTML = '<h4 class="font-semibold mb-2">Câu trả lời sai:</h4>' +
            wrongAnswers.map(word => 
                `<div class="mb-2 p-2 bg-red-50 rounded">
                    <strong>${word.char}</strong> (${word.pinyin}) - ${word.meaning}
                </div>`
            ).join('');
        document.getElementById('quiz-review-wrong-btn').classList.remove('hidden');
    } else {
        wrongAnswersElement.innerHTML = '<p class="text-green-600">Hoàn hảo! Không có câu nào sai.</p>';
        document.getElementById('quiz-review-wrong-btn').classList.add('hidden');
    }
    
    // Setup result buttons
    document.getElementById('quiz-restart-btn').onclick = () => {
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-setup').classList.remove('hidden');
    };
}

function resetSRS() {
    if (confirm('Bạn có chắc muốn reset toàn bộ tiến độ ôn tập?')) {
        localStorage.removeItem('srsData');
        localStorage.removeItem('personalNotes');
        srsData = {};
        personalNotes = {};
        updateReviewCount();
        updateVocabularyStats();
        alert('Đã reset thành công!');
    }
}

// CSS for flashcard flip effect
const style = document.createElement('style');
style.textContent = `
    .flashcard-container {
        perspective: 1000px;
        height: 120px;
    }
    
    .flashcard {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }
    
    .flashcard.flipped {
        transform: rotateY(180deg);
    }
    
    .flashcard-front, .flashcard-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .flashcard-back {
        transform: rotateY(180deg);
    }
    
    .modal-base {
        display: none;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .animate-pulse {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);
