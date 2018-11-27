import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const card = document.querySelector('.list');
  const buttons = document.querySelector('.buttons');
  const footer = document.querySelector('.fFooter');

  const isLecturePage = page.classList.contains('lecture-page');
  const list = new List();

  list.load(isLecturePage);

  if (!isLecturePage)
  { text.init(list, buttons); }
  else
  { lecture.init(list, footer); }
});

const text = (() => {

  let list;

  function init(_list, _buttons) {

    list = _list;

    _buttons.addEventListener('click', toggle);
  }

  function toggle(e) {
    let html = false;
    let css = false;
    let js = false;
    if (e.target.classList.value === 'button' || e.target.classList.value === 'button button--toggled') {
      e.target.classList.toggle('button--toggled');

      if (e.target.parentElement.children[0].classList.value !== 'button') {
        html = true;
      }
      if (e.target.parentElement.children[1].classList.value !== 'button') {
        css = true;
      }
      if (e.target.parentElement.children[2].classList.value !== 'button') {
        js = true;
      }

      list.getLectures(html, css, js);
    }
  }

  return {
    init,
  };
})();

const lecture = (() => {

  let list;

  function init(_list, _footer) {

    list = _list;

    _footer.addEventListener('click', finish);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const trgt = e.target.classList.value;
    if (trgt === 'fFooter__link' || trgt === 'fFooter__link link--toggled') {
      e.target.classList.toggle('link--toggled');

      if (trgt === 'fFooter__link'){ 
        e.target.innerText = '✓ Fyrirlestur kláraður'; 
      }
      else{
        e.target.innerText = 'Klára fyrirlestur';
      }
    }
  }

  return {
    init,
  };
})();
