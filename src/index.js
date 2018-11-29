import List from './lib/list';

// Function that stores data in the localStorage by using json to stringify the value first
function storeValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Function that retreives data from the local storage
function getValue(key) {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
}

// Function that removes value from the local storage
// Perhaps a bit redundant but since we're working with functions might as well
function removeValue(key) {
  localStorage.removeItem(key);
}
const slug = window.location.href.substring(window.location.href.lastIndexOf('=') + 1);

const index = (() => {
  let list;

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

  function init(_list, _buttons) {
    list = _list;

    _buttons.addEventListener('click', toggle);
  }

  return {
    init,
  };
})();

// event handler fyrir það að klára færslu
function finish(e) {
  const trgt = e.target.classList.value;
  if (trgt === 'fFooter__link' || trgt === 'fFooter__link link--toggled') {
    // e.target.classList.toggle('link--toggled');

    if (trgt === 'fFooter__link') {
      e.target.innerText = '✓ Fyrirlestur kláraður';
      e.target.classList.add('link--toggled');
      storeValue(slug, slug);
    } else {
      e.target.innerText = 'Klára fyrirlestur';
      e.target.classList.remove('link--toggled');
      removeValue(slug);
    }
  }
}

const lecture = (() => {
  function init(_list, _footer) {
    // Ef slug er þegar í localStorage, merkja fyrirlestur kláraður
    if (getValue(slug) === slug) {
      // Ná í element til þess að geta sett toggle á link (sem gerir hann grænan)
      const trgt = document.getElementById('fFooter__link').classList;
      document.getElementById('fFooter__link').innerHTML = '✓ Fyrirlestur kláraður';
      trgt.toggle('link--toggled');
    }
    _footer.addEventListener('click', finish);
  }


  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const buttons = document.querySelector('.buttons');
  const footer = document.querySelector('.fFooter');

  const isLecturePage = page.classList.contains('lecture-page');
  const list = new List();

  list.load(isLecturePage);

  if (!isLecturePage) {
    index.init(list, buttons);
  } else {
    lecture.init(list, footer);
  }
});
