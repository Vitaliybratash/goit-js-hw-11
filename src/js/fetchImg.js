import Notiflix from 'notiflix';

const axios = require('axios');

const KEY = '7130529-cd9ea3f018b85a189f3c85b8b';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImg(inputValue, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });
    if (response.data.total === 0) {
      throw new Error();
    }
    return response.data;
  } catch {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
