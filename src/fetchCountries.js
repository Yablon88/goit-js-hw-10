export function fetchCountries(inputName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${inputName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.status === 404) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
