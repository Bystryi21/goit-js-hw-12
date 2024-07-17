export function hide(button) {
  button.classList.add('is-hidden');
}

export function show(button) {
  button.classList.remove('is-hidden');
}

export function disable(button, spinner) {
  button.disabled = true;
  spinner.classList.remove('is-hidden');
}

export function enable(button, spinner) {
  button.disabled = false;
  spinner.classList.add('is-hidden');
}

export function appendImagesMarkup(images, gallery) {
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

export function initializeLightbox() {
  return new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
