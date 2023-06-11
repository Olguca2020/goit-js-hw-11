const KEY_API = '37172974-4e93c60554a40da27d1468fe2';

export default class PixabayAPIservice {
  constructor() {
    this.page = 1;
    this.serchItem = '';
  }
  getItem() {
    const url = `https://pixabay.com/api/?key=${KEY_API}&q=${this.serchItem}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  setSearchValue(inputValue) {
    this.serchItem = inputValue;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
