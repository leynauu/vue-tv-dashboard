import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.tvmaze.com'
});

export function searchShows(query) {
  return API.get(`/search/shows?q=${query}`);
}