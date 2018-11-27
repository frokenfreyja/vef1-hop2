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
    if (isLecturePage){
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
      videoThumbnail.src = data.thumbnail;

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

  loadLecturePage(){
    const slug = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
    this.lectures.forEach((data) => {
      if (data.slug === slug) {
        console.log("Found slug: " + slug);

        // Header
        const header = document.createElement("header");
        header.setAttribute("class", "fHeader");

        const divfHeader__protect = document.createElement("div");
        divfHeader__protect.setAttribute("class", "fHeader__protect");

        const divfHeader__content = document.createElement("div");
        divfHeader__content.setAttribute("class", "fHeader__content");

        const header__category = document.createElement("p");
        header__category.setAttribute("class", "fHeader__title1")
        header__category.innerHTML = data.category;

        const header__title = document.createElement("h2");  // búa til h1 element
        header__title.setAttribute("class", "iHeader__title2");  // setja klasa á h1 sem iHeader__title1 þannig css þekki það
        header__title.innerHTML = data.title; // Setja texta á h1 sem title úr data

        divfHeader__protect.appendChild(divfHeader__content);
        divfHeader__content.appendChild(header__category);
        divfHeader__content.appendChild(header__title);

        header.appendChild(divfHeader__protect);
        document.body.appendChild(header);

        console.log(header);


      }


    });
  }
}
