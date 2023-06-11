import axios from "axios";

const KEY_API = '37172974-4e93c60554a40da27d1468fe2';

export default class PixabayAPIservice {
  constructor() {
    this.page = 1;
    this.serchItem = '';
  }
  async getItem() {
    const url = `https://pixabay.com/api/?key=${KEY_API}&q=${this.serchItem}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const res = await axios.get(url)
      this.incrementPage();
      return res.data;       
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
