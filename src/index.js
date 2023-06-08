import { GetGalleryCard } from './galleryAPI';
import { creadGalleryCard } from './gallery-card';
import Notiflix from 'notiflix';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const ref = {
  form: document.querySelector(".search-form"),
  input: document.querySelector("input[name=searchQuery]"),
  button: document.querySelector("button"),
  gallery: document.querySelector(".gallery"),
  loadMore: document.querySelector(".load-more"),
};

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
});

const galleryCard = new GetGalleryCard();

const onSearchFotoButton = async event => {
  event.preventDefault();

  if (ref.input.value.trim() === '') {
    return;
  }

  galleryCard.q = ref.input.value;
  galleryCard.page = 1;

 try{
   const { data } = await galleryCard.getGalleryURL();

      if (data.hits.length === 0) {
        ref.gallery.innerHTML = '';
        ref.loadMore.style.display = 'none';
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      else if (data.hits.length <= 40) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
         ref.loadMore.style.display = 'flex' ;
        ref.gallery.innerHTML = creadGalleryCard(data.hits);

        gallery.refresh()
      }
      else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        ref.loadMore.style.display = 'none';
        ref.gallery.innerHTML = creadGalleryCard(data.hits)
        console.log(creadGalleryCard(data.hits));
    gallery.refresh()
   }
   const totalLoaded = data.hits.length;
     if (totalLoaded >= data.totalHits) {
        ref.loadMore.style.display = 'none';
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      }
    }catch(error){console.log(error)}
    
   
  
};

const onloadMoreCard = async event => {
  event.preventDefault();
  galleryCard.page += 1;

  try {
    const { data } = await galleryCard.getGalleryURL();

    if (data.hits.length === 0) {
      ref.loadMore.style.display = 'none';
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    } else {
      ref.gallery.insertAdjacentHTML('beforeend', creadGalleryCard(data.hits));
    }

    const totalLoaded = galleryCard.page * galleryCard.per_page;
    if (totalLoaded >= data.totalHits) {
      ref.loadMore.style.display = 'none';
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }

  gallery.refresh();
};

ref.form.addEventListener('submit', onSearchFotoButton);
ref.loadMore.addEventListener('click', onloadMoreCard);


