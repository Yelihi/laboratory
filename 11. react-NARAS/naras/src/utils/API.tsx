import { AllCountries, SearchResult, CountryDetail } from "./APITypes";

export default class FetchNaras {
  constructor() {}

  async fetchCountries() {
    try {
      const response = await fetch("https://naras-api.vercel.app/all", {
        method: "GET",
      });
      const data = response.json() as Promise<AllCountries[]>;
      const allCountries = await data;
      return allCountries;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async fetchSearchResult(query: string | null) {
    try {
      const stringQuery = query === null ? "" : query;
      const response = await fetch(
        `https://naras-api.vercel.app/search?q=${stringQuery}`,
        {
          method: "GET",
        }
      );
      const data = (await response.json()) as Promise<SearchResult[]>;
      const searchCountries = await data;
      return searchCountries;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async fetchCountryDetail(code: string) {
    try {
      const response = await fetch(
        `https://naras-api.vercel.app/code/${code}`,
        { method: "GET" }
      );
      const data = (await response.json()) as Promise<CountryDetail>;
      const detailCountry = await data;
      return detailCountry;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export const API = new FetchNaras();
