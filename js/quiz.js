window.renderQuizApp = function(data) {
  const el = document.getElementById('quiz-app');
  if (!data || data.length < 4) { el.innerHTML = 'Không đủ dữ liệu để kiểm tra.'; return; }
  let questions = shuffle(data).slice(0, 10);
  let idx = 0, score = 0, userAnswers = [];
  function render() {
    if (idx >= questions.length) {
      el.innerHTML = `<div class="card"><h3>Kết quả: ${score}/${questions.length}</h3>
        <button class="button" id="retry">Làm lại</button></div>`;
      document.getElementById('retry').onclick = () => { idx=0;score=0;userAnswers=[];render(); };
      localStorage.setItem('tocfl_quiz_score', score);
      return;
    }
    const q = questions[idx];
    let options = shuffle([
      q.meaning,
      ...shuffle(data.filter(x=>x.word!==q.word)).slice(0,3).map(x=>x.meaning)
    ]);
    el.innerHTML = `<div class="card"><h3>Câu ${idx+1}: ${q.word}</h3>
      <div>${options.map((opt,i)=>`<div><label><input type='radio' name='opt' value='${opt}'> ${opt}</label></div>`).join('')}</div>
      <button class="button" id="submit">Trả lời</button></div>`;
    document.getElementById('submit').onclick = () => {
      const val = el.querySelector('input[name=opt]:checked');
      if (!val) { alert('Chọn đáp án!'); return; }
      userAnswers.push({q:q.word, a:val.value, correct:q.meaning});
      if (val.value === q.meaning) score++;
      idx++;
      render();
    };
  }
  render();
}
function shuffle(arr) {
  return arr.slice().sort(()=>Math.random()-0.5);
} 