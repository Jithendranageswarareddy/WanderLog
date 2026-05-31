import axios from 'axios';

const countriesClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

export function normalizeCountry(country) {
  if (!country) {
    return null;
  }

  if (typeof country?.name === 'string' && country?.code) {
    return {
      name: country.name,
      officialName: country.officialName || country.name,
      flag: country.flag || '',
      population: country.population || 0,
      region: country.region || 'Unknown',
      capital: country.capital || 'N/A',
      code: country.code,
      area: country.area || 0,
      timezone: country.timezone || 'N/A',
      borders: country.borders || 'None',
      independent: Boolean(country.independent),
      languages: country.languages || 'N/A',
      currencies: country.currencies || 'N/A',
      maps: {
        googleMaps: country.maps?.googleMaps || '',
        openStreetMaps: country.maps?.openStreetMaps || '',
      },
    };
  }

  return {
    name: country?.name?.common || 'Unknown',
    officialName: country?.name?.official || country?.name?.common || 'Unknown',
    flag: country?.flags?.svg || country?.flags?.png || '',
    population: country?.population || 0,
    region: country?.region || 'Unknown',
    capital: country?.capital?.[0] || 'N/A',
    code: country?.cca3 || '',
    area: country?.area || 0,
    timezone: Array.isArray(country?.timezones) ? country.timezones.join(', ') : 'N/A',
    borders: Array.isArray(country?.borders) && country.borders.length > 0 ? country.borders.join(', ') : 'None',
    independent: typeof country?.independent === 'boolean' ? country.independent : false,
    languages: country?.languages ? Object.values(country.languages).join(', ') : 'N/A',
    currencies: country?.currencies
      ? Object.values(country.currencies)
          .map((currency) => `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ''}`)
          .join(', ')
      : 'N/A',
    maps: {
      googleMaps: country?.maps?.googleMaps || '',
      openStreetMaps: country?.maps?.openStreetMaps || '',
    },
  };
}

export async function fetchCountries() {
  const response = await countriesClient.get('/all?fields=name,flags,population,region,capital,cca3,area');
  return response.data.map((country) => normalizeCountry(country));
}

export async function fetchCountryByCode(code) {
  const response = await countriesClient.get(`/alpha/${code}`);
  const country = Array.isArray(response.data) ? response.data[0] : response.data;
  return normalizeCountry(country);
}
