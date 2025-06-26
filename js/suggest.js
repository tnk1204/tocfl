window.getLearningSuggestion = function() {
  // Giả lập: dựa trên điểm quiz
  const score = localStorage.getItem('tocfl_quiz_score') || 0;
  if (score < 5) return 'Bạn nên ôn lại từ vựng và làm thêm bài tập.';
  if (score < 8) return 'Bạn đang tiến bộ! Hãy luyện thêm flashcard và kiểm tra.';
  return 'Bạn đã nắm vững kiến thức cơ bản. Hãy thử các đề kiểm tra nâng cao!';
} 