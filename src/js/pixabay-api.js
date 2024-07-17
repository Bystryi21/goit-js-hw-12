import axios from 'axios';
export const API_KEY = '44781462-ae4aaccc0a5ec19c0259ffb3b';
const api = 'https://pixabay.com/api/';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = true;

export async function fetchImages(q, page, perPage) {
  const url = `${api}?key=${API_KEY}&q=${encodeURIComponent(
    q
  )}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const { hits, totalHits } = response.data;

    return { hits, totalHits };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
