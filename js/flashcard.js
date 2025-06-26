window.renderFlashcardApp = function(data) {
  const el = document.getElementById('flashcard-app');
  if (!data || !data.length) { el.innerHTML = 'Không có dữ liệu.'; return; }
  let idx = 0, showBack = false;
  function render() {
    const item = data[idx];
    el.innerHTML = `<div class="card" style="text-align:center;min-height:180px;">
      <div id="flashcard" style="font-size:2rem;cursor:pointer;user-select:none;">${showBack ? item.meaning : item.word}</div>
      <div style="margin-top:1rem;">
        <button class="button" id="prev">&#8592; Trước</button>
        <button class="button" id="flip">Lật thẻ</button>
        <button class="button" id="next">Sau &#8594;</button>
      </div>
      <div style="margin-top:0.5rem;font-size:0.95em;color:#888;">${idx+1} / ${data.length}</div>
    </div>`;
    document.getElementById('flashcard').onclick = () => { showBack = !showBack; render(); };
    document.getElementById('flip').onclick = () => { showBack = !showBack; render(); };
    document.getElementById('prev').onclick = () => { if(idx>0){idx--;showBack=false;render();} };
    document.getElementById('next').onclick = () => { if(idx<data.length-1){idx++;showBack=false;render();} };
  }
  render();
} 