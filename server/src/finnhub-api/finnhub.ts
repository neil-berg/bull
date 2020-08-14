import axios from 'axios';

export const finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1/',
  timeout: 1000,
  headers: { 'X-Finnhub-Token': process.env.FINNHUB_API_TOKEN },
});
