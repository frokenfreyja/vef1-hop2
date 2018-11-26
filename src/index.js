import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const card = document.querySelector('.list');
  const buttons = document.querySelector('.buttons');

  const isLecturePage = page.classList.contains('lecture-page');
  const list = new List();

  if (isLecturePage) {
  } else {
    list.load();
  }

  text.init(list, card, buttons);
});

const text = (() => {

  let list;

  function init(_list, _card, _buttons) {
    console.log(_list);
    console.log(_card);
    console.log(_buttons);

    list = _list;

    // TODO láta hluti í _items virka
    _card.addEventListener('click', finish);
    _buttons.addEventListener('click', toggle);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    /*
    if(e.target.parentElement.classList.value === 'card' || e.target.parentElement.parentElement.classList.value === 'card' || e.target.classList.value === 'card')
      console.log("wooow")
      */
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
