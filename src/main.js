import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const spinner = document.querySelector('.spinner');
const searchForm = document.querySelector('.search-form');

const hiddenClass = 'is-hidden';
let q = '';
let page = 1;
let perPage = 15;
let maxPage = 0;

function hide(button) {
  button.classList.add(hiddenClass);
}

function show(button) {
  button.classList.remove(hiddenClass);
}

function disable(button, spinner) {
  button.disabled = true;
  spinner.classList.remove(hiddenClass);
}

function enable(button, spinner) {
  button.disabled = false;
  spinner.classList.add(hiddenClass);
}

hide(loadMoreBtn);

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  page = 1;

  const form = event.currentTarget;
  q = form.elements.search.value.trim();

  if (!q) {
    iziToast.error({
      title: 'Error',
      message: 'Search field cannot be empty!',
    });
    return;
  }

  show(loadMoreBtn);
  disable(loadMoreBtn, spinner);

  try {
    const { hits, totalHits } = await fetchImages(q, page, perPage);

    maxPage = Math.ceil(totalHits / perPage);
    appendImagesMarkup(hits);

    if (hits.length > 0 && hits.length !== totalHits) {
      enable(loadMoreBtn, spinner);
      loadMoreBtn.addEventListener('click', handleLoadMore);
    } else {
      hide(loadMoreBtn);
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    form.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  disable(loadMoreBtn, spinner);

  try {
    const { hits } = await fetchImages(q, page, perPage);
    appendImagesMarkup(hits);
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch more images. Please try again later.',
    });
  } finally {
    enable(loadMoreBtn, spinner);

    if (page === maxPage) {
      hide(loadMoreBtn);
      loadMoreBtn.removeEventListener('click', handleLoadMore);
    }
  }
}

function appendImagesMarkup(images) {
  const markup = images
    .map(
      image => `<li>
        <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <div class="info">
            <p><strong>Likes:</strong> ${image.likes}</p>
            <p><strong>Views:</strong> ${image.views}</p>
            <p><strong>Comments:</strong> ${image.comments}</p>
            <p><strong>Downloads:</strong> ${image.downloads}</p>
          </div>
        </a>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
