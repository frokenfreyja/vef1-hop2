import { empty } from './helpers';


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

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.container2 = document.querySelector('.lecture');
  }

  load(isLecturePage) {
    fetch('../lectures.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong on api server!');
      })
      .then((data) => {
        this.parseData(data.lectures, isLecturePage);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }

  parseData(data, isLecturePage) {
    this.lectures = data;
    if (isLecturePage) {
      this.loadLecturePage();
    } else {
      this.getLectures(false, false, false);
    }
  }

  removeAll() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  getLectures(html, css, js) {
    this.removeAll();
    this.lectures.forEach((data) => {
      const column = document.createElement('section');
      column.classList.add('col');

      const card = document.createElement('div');
      card.classList.add('card');

      const a = document.createElement('a');
      a.href = `fyrirlestur.html?slug=${data.slug}`;

      const videoThumbnail = document.createElement('img');
      videoThumbnail.classList.add('video__thumbnail');
      if (data.thumbnail !== undefined) {
        videoThumbnail.src = data.thumbnail;
      }

      const videoFooter = document.createElement('div');
      videoFooter.classList.add('video__footer');

      const videoCategory = document.createElement('div');
      videoCategory.classList.add('video__category');
      videoCategory.appendChild(document.createTextNode(data.category));

      const videoTitle = document.createElement('h2');
      videoTitle.appendChild(document.createTextNode(data.title));

      videoFooter.appendChild(videoCategory);
      videoFooter.appendChild(videoTitle);

      // Athuga hvort fyrirlestur er merktur sem kláraður, ef svo bæta við checkmark
      if (getValue(data.slug)){
        const checkmark = document.createElement('h2');
        checkmark.appendChild(document.createTextNode('✓'));
        checkmark.classList.add('video__checkmark')
        videoFooter.appendChild(checkmark);
      }
      // Athuga hvort mynd sé skilgr, ef ekki skal ekki appenda mynd kölluð undefined
      if (data.thumbnail !== undefined) {
        card.appendChild(videoThumbnail);
      }
      card.appendChild(videoFooter);

      a.appendChild(card);

      column.appendChild(a);

      if (html) {
        if (data.category === 'html') {
          this.container.appendChild(column);
        }
      }

      if (css) {
        if (data.category === 'css') {
          this.container.appendChild(column);
        }
      }

      if (js) {
        if (data.category === 'javascript') {
          this.container.appendChild(column);
        }
      }

      if (!html && !css && !js) {
        this.container.appendChild(column);
      }
    });
  }

  loadLecturePage() {
    const slug = window.location.href.substring(window.location.href.lastIndexOf('=') + 1);

    this.lectures.forEach((data) => {
      if (data.slug === slug) {
        // Header
        document.getElementById('fHeader__title1').innerHTML = data.category;
        document.getElementById('fHeader__title2').innerHTML = data.title;

        // Mynd í header
        if (data.image !== undefined) {
          document.getElementById('fHeader').style.backgroundImage = `url(${data.image})`;
        }

        // Allt efni
        for (let i = 0; i < data.content.length; i += 1) {
          this.showLecture(data.content[i]);
        }
      }
    });
  }

  showLecture(data) {
    if (data.type === 'youtube') {
      const element = document.createElement('iframe');
      element.classList.add(data.type);
      element.setAttribute('src', data.data);
      element.setAttribute('frameBorder', 0);
      this.container2.appendChild(element);
    }

    if (data.type === 'text') {
      const element = document.createElement('p');
      element.classList.add(data.type);
      element.appendChild(document.createTextNode(data.data));
      this.container2.appendChild(element);
    }

    if (data.type === 'quote') {
      const element = document.createElement('div');
      element.classList.add('quote__content');

      const quote = document.createElement('p');
      quote.classList.add('quote');
      quote.appendChild(document.createTextNode(data.data));

      const quoteBy = document.createElement('p');
      quoteBy.classList.add('quoteBy');
      quoteBy.appendChild(document.createTextNode(data.attribute));

      element.appendChild(quote);
      element.appendChild(quoteBy);
      this.container2.appendChild(element);
    }

    if (data.type === 'image') {
      const element = document.createElement('div');
      element.classList.add('image__content');

      const img = document.createElement('img');
      img.classList.add('image');
      img.setAttribute('src', data.data);

      const imgCaption = document.createElement('p');
      imgCaption.classList.add('image__caption');
      imgCaption.appendChild(document.createTextNode(data.caption));

      element.appendChild(img);
      element.appendChild(imgCaption);
      this.container2.appendChild(element);
    }

    if (data.type === 'heading') {
      const element = document.createElement('h2');
      element.classList.add('heading__content');
      element.appendChild(document.createTextNode(data.data));
      this.container2.appendChild(element);
    }

    if (data.type === 'list') {
      const element = document.createElement('ul');
      element.classList.add('lecture__ul');
      for (let i = 0; i < data.data.length; i += 1) {
        const listItem = document.createElement('li');
        listItem.classList.add('list__item');
        listItem.appendChild(document.createTextNode(data.data[i]));
        element.appendChild(listItem);
      }
      this.container2.appendChild(element);
    }

    if (data.type === 'code') {
      const element = document.createElement('p');
      element.classList.add(data.type);
      element.appendChild(document.createTextNode(data.data));
      this.container2.appendChild(element);
    }
  }
}
