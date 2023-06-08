import axios from 'axios';
 export class GetGalleryCard {
  static FOTO_API = "37046560-081d25d951e10cecd03c40d51";
  static FOTO_URL = 'https://pixabay.com/api/';

  constructor() {
    this.page = 1;
    this.per_page = 40;
    this.q = null;
  }


  getGalleryURL() {
    const searchParams = new URLSearchParams({
      q: this.q,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      key: GetGalleryCard.FOTO_API,
      page: this.page,
      per_page:this.per_page
    });
      
      return axios.get(`${GetGalleryCard.FOTO_URL}?${searchParams}`);
      
  }
}