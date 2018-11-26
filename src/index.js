import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const card = document.querySelector('.list');

  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
} else {
    let list = new List();
    list.load();
  }

  text.init(card);
});

const text = (() => {

  function init(_card) {
    console.log("woow");
    console.log(_card);

    // TODO láta hluti í _items virka
    _card.addEventListener("click", finish);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    /*
    if(e.target.parentElement.classList.value === 'card' || e.target.parentElement.parentElement.classList.value === 'card' || e.target.classList.value === 'card')
      console.log("wooow")
      */
  }

  return {
    init: init
  }
})();
