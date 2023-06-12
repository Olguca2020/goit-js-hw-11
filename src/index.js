import Notiflix from 'notiflix';
import PixabayAPIservice from './PixabayAPIservice.js';
import LoadMoreBtn from './LoadMoreBtn.js';


const refs = {
  input: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector(`#search-form`),
  divGallery: document.querySelector(`div.gallery`),
  totalResult: document.querySelector(`.totalResalt`),
};
const pixabayAPIservice = new PixabayAPIservice();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
loadMoreBtn.button.addEventListener('click', fetchCards);
refs.form.addEventListener(`submit`, onSubmit);

async function fetchCards() {
  loadMoreBtn.disable();
  try {
    const markup = await generatCardsMarkup()
    if (markup === undefined) throw new Error
    
    appendNewToList(markup);
  }
  catch (err) {
    onError(err)
  }
    loadMoreBtn.enable();
  };


function onSubmit(e) {
  e.preventDefault();
  const inputValue = refs.form.elements.searchQuery.value.trim();

  pixabayAPIservice.setSearchValue(inputValue);
  if (inputValue === '') {
    const err = 'Please enter a search query';
    onError(new Error(err));
    return;
  }
  clearNewList();
  loadMoreBtn.show();
  pixabayAPIservice.resetPage();

  fetchCards()
    .catch(onError)
    .finally(() => refs.form.reset());
}
async function generatCardsMarkup() {
  try {
    const { hits, totalHits } = await pixabayAPIservice.getItem();
    const nextPage = pixabayAPIservice.page;
    const maxPage = Math.ceil(totalHits / 40);    
    if (nextPage > maxPage) {
      loadMoreBtn.hide();
      
    }
if (hits.length === 0)
      throw new Error(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    // console.log(totalHits);
    alert(`Hooray! We found ${totalHits} totalHits images.`);
    return hits.reduce(
      (marcup, currentCard) => marcup + createMarkup(currentCard),
      ''
    );
    
  }
  catch (err) {
    throw err;
    
  }
  
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
  <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
  
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

function appendNewToList(murcup) {
  refs.divGallery.insertAdjacentHTML('beforeend', murcup);
}

function clearNewList() {
  refs.divGallery.innerHTML = '';
}

function onError(err) {
  clearNewList();
  Notiflix.Notify.failure(`Error: ${err.message}`);
  loadMoreBtn.hide();
}
 let gallery = new SimpleLightbox('.gallery a', {
   captionsData: 'alt',
   captionDelay: 250,
 });
 gallery.on('show.simplelightbox', function () {});