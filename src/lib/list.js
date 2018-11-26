import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  load() {
    fetch('../lectures.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong on api server!');
      })
      .then((data) => {
        this.parseData(data.lectures);
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }

  parseData(data) {
    this.videos = data;
    this.getVideos();
  }

  getVideos() {
    this.videos.forEach((data) => {
      const column = document.createElement('section');
      column.classList.add('col');

      const card = document.createElement('div');
      card.classList.add('card');

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

      card.appendChild(videoThumbnail);
      card.appendChild(videoFooter);

      column.appendChild(card);


      this.container.appendChild(column);
    });
  }
}
