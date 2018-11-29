import List from './lib/list';


// Function that stores data in the localStorage by using json to stringify the value first
function storeValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function that retreives data from the local storage
function getValue(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

// Function that removes value from the local storage
// Perhaps a bit redundant but since we're working with functions might as well
function removeValue(key) {
    localStorage.removeItem(key);
}

const slug = window.location.href.substring(window.location.href.lastIndexOf('=') + 1);

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const card = document.querySelector('.list');
  const buttons = document.querySelector('.buttons');
  const footer = document.querySelector('.fFooter');

  const isLecturePage = page.classList.contains('lecture-page');
  const list = new List();

  list.load(isLecturePage);

  if (!isLecturePage) {
    text.init(list, buttons);
  } else {
    lecture.init(list, footer);
  }
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
    console.log(getValue(slug));
    list = _list;
    if (getValue(slug)!==null) {

      document.getElementById('fFooter__link').innerHTML = '✓ Fyrirlestur kláraður';
      // Þarf að toggla hlekk hér, ekki viss hvernig það er gert enn
      // Siggi ath. :>
    }
    _footer.addEventListener('click', finish);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    console.log(getValue(slug));
    const trgt = e.target.classList.value;
    if (trgt === 'fFooter__link' || trgt === 'fFooter__link link--toggled') {
      // e.target.classList.toggle('link--toggled');

      if (trgt === 'fFooter__link' && getValue(slug)!==slug) {
        e.target.innerText = '✓ Fyrirlestur kláraður';
        e.target.classList.add('link--toggled');

        storeValue(slug, slug);

      }
      else{
        e.target.innerText = 'Klára fyrirlestur';
        e.target.classList.remove('link--toggled');
        removeValue(slug);
      }
    }
  }

  return {
    init,
  };
})();
