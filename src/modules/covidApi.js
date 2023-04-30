const covidApi = axios.create({
  baseURL: 'https://api.covid19api.com',
});

export default covidApi;
