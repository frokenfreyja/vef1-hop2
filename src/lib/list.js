import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
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
    }
    else {
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
        console.log('Found slug: ' + slug);

        // Header
        document.getElementById('fHeader__title1').innerHTML = data.category;
        document.getElementById('fHeader__title2').innerHTML = data.title;

        // Mynd í header
        console.log(data.image);
        if (data.image !== undefined) {
          document.getElementById('fHeader').style.background = `url(${ data.image  })`;
        }


      }


    });
  }
}
