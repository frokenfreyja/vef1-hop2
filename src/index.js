import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const card = document.querySelector('.list');
  const buttons = document.querySelector('.buttons');

  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
} else {
    let list = new List();
    list.load();
  }

  text.init(card, buttons);
});

const text = (() => {

  function init(_card, _buttons) {
    console.log("woow");
    console.log(_card);
    console.log(_buttons)

    // TODO láta hluti í _items virka
<<<<<<< HEAD
    //_card.addEventListener("click", finish);
=======
    _card.addEventListener("click", finish);
    _buttons.addEventListener("click", toggle);
>>>>>>> aec5ff4047a4065850782f599eef9a49f480513e
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    /*
    if(e.target.parentElement.classList.value === 'card' || e.target.parentElement.parentElement.classList.value === 'card' || e.target.classList.value === 'card')
      console.log("wooow")
      */
  }

  function toggle(e){
    console.log(e.target.value);
  }

  return {
    init: init
  }
})();
