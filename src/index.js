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

// index sér um category filterinn og button handlera fyrir forsíðuna
const index = (() => {
  let list;

  function toggle(e) {
    let html = false; // html filter er óvirkur í upphafi
    let css = false; // css filter er óvirkur í upphafi
    let js = false; // js filter er óvirkur í upphafi

    // If fyrir þegar notandi ýtir á takka í filternum
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

      // Kalla á aðferð getLectures úr list.js sem tekur inn núverandi stöðu filtersins
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

// event handler fyrir það að klára fyrirlestur
function finish(e) {
  const trgt = e.target.classList.value;
  if (trgt === 'fFooter__link' || trgt === 'fFooter__link link--toggled') {
    e.target.classList.toggle('link--toggled');

    if (trgt === 'fFooter__link') {
      e.target.innerText = '✓ Fyrirlestur kláraður';
      storeValue(slug, slug);
    } else {
      e.target.innerText = 'Klára fyrirlestur';
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

  // kalla á mismunandi init aðferðir eftir því hvort síðan sé lecture síða eða forsíðan
  if (!isLecturePage) {
    index.init(list, buttons);
  } else {
    lecture.init(list, footer);
  }
});
