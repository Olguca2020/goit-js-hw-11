import Notiflix from 'notiflix';
import PixabayAPIservice from './PixabayAPIservice.js';
import LoadMoreBtn from './LoadMoreBtn.js';

const refs = {
  input: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector(`#search-form`),
  divGallery: document.querySelector(`div.gallery`),
};
const pixabayAPIservice = new PixabayAPIservice();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: false,
});
loadMoreBtn.button.addEventListener('click', fetchCards);
refs.form.addEventListener(`submit`, onSubmit);

function fetchCards(){}

function onSubmit(e) {
  e.preventDefault();
  const inputValue = refs.form.elements.searchQuery.value;

  pixabayAPIservice.setSearchValue(inputValue);
  pixabayAPIservice
    .getItem()
    .then(({ hits }) => {
      if (hits.length === 0)
        throw new Error(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      return hits.reduce(
        (marcup, currentCard) => marcup + createMarkup(currentCard),
        ''
      );
    })
    .then(updateList)
    .catch(onError)
    .finally(() => refs.form.reset());
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
}

function updateList(murcup) {
  refs.divGallery.innerHTML = murcup;
}

function onError(err) {
  Notiflix.Notify.failure(`Error: ${err.message}`);
}