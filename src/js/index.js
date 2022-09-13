import { fetchImg } from './fetchImg';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
let inputValue = '';

function hideBtn() {
  loadMore.style.display = 'none';
}

hideBtn();

function reset() {
  inputValue = '';
  page = 1;
  gallery.innerHTML = '';
  hideBtn();
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  reset();

  inputValue = searchForm.elements.searchQuery.value;
  fetchImg(inputValue, page).then(data => {
    generateGallery(data.hits);
    if (data.totalHits > 40) {
      loadMore.style.display = 'block';
    }
    checkEnd(data);
  });
});

function generateCard(card) {
  return `
    <div class="photo-card">
      <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${card.likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${card.views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${card.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${card.downloads}
        </p>
      </div>
    </div>`;
}

function generateGallery(cards) {
  let galleryHtml = '';
  for (const card of cards) {
    galleryHtml += generateCard(card);
  }
  gallery.innerHTML += galleryHtml;
}

loadMore.addEventListener('click', () => {
  page += 1;
  fetchImg(inputValue, page).then(data => {
    generateGallery(data.hits);
    checkEnd(data);
  });
});

function checkEnd(data) {
  const allPictures = document.querySelectorAll('.photo-card');
  if (data.totalHits <= [...allPictures].length) {
    hideBtn();
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
