window.renderProgressApp = function() {
  const el = document.getElementById('progress-app');
  const quizScore = localStorage.getItem('tocfl_quiz_score') || 0;
  el.innerHTML = `<div>Điểm kiểm tra gần nhất: <b>${quizScore}</b></div>
    <div id="flashcard-progress"></div>`;
  // Có thể mở rộng thêm: số từ đã học, số bài đã làm, v.v.
} 