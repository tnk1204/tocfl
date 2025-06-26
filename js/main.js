const PAGES = ['home', 'vocab', 'grammar', 'exercise', 'flashcard', 'test'];
let tocflData = [];

async function loadData() {
  if (tocflData.length) return tocflData;
  const res = await fetch('data/tocfl_a1.json');
  tocflData = await res.json();
  return tocflData;
}

function setActiveNav(page) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${page}`);
  });
}

function render(page = 'home') {
  setActiveNav(page);
  const main = document.getElementById('main-content');
  switch(page) {
    case 'vocab':
      main.innerHTML = '<h2>Từ vựng TOCFL A1</h2><div id="vocab-list">Đang tải...</div>';
      loadData().then(data => renderVocab(data));
      break;
    case 'grammar':
      main.innerHTML = '<h2>Ngữ pháp cơ bản</h2><div id="grammar-list">Đang cập nhật...</div>';
      break;
    case 'exercise':
      main.innerHTML = '<h2>Bài tập luyện tập</h2><div id="exercise-list">Đang cập nhật...</div>';
      break;
    case 'flashcard':
      main.innerHTML = '<h2>Flashcard từ vựng</h2><div id="flashcard-app"></div>';
      if (window.renderFlashcardApp) loadData().then(data => window.renderFlashcardApp(data));
      break;
    case 'test':
      main.innerHTML = '<h2>Kiểm tra trình độ</h2><div id="quiz-app"></div>';
      if (window.renderQuizApp) loadData().then(data => window.renderQuizApp(data));
      break;
    default:
      main.innerHTML = `<section class="card"><h2>Chào mừng đến với TOCFL A1!</h2><p>Website hỗ trợ học tập, ôn luyện TOCFL A1: từ vựng, ngữ pháp, bài tập, flashcard, kiểm tra, cá nhân hóa.</p></section>
      <section class="card"><h3>Tiến độ học tập</h3><div id="progress-app"></div></section>`;
      if (window.renderProgressApp) window.renderProgressApp();
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  function onHashChange() {
    const page = location.hash.replace('#', '') || 'home';
    render(PAGES.includes(page) ? page : 'home');
  }
  window.addEventListener('hashchange', onHashChange);
  onHashChange();
});

// Từ vựng: render bảng từ vựng
function renderVocab(data) {
  const el = document.getElementById('vocab-list');
  if (!data || !data.length) { el.innerHTML = 'Không có dữ liệu.'; return; }
  let html = `<table style="width:100%;border-collapse:collapse"><thead><tr><th>Từ</th><th>Phiên âm</th><th>Ý nghĩa</th><th>Ví dụ</th></tr></thead><tbody>`;
  for (const item of data) {
    html += `<tr><td>${item.word}</td><td>${item.pinyin||''}</td><td>${item.meaning||''}</td><td>${item.example||''}</td></tr>`;
  }
  html += '</tbody></table>';
  el.innerHTML = html;
} 