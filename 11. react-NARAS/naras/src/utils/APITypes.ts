export type AllCountries = {
  code: string;
  commonName: string;
  flagEmoji: string;
  flagImg: string;
  capital: string[];
  region: string;
  population: number;
};

export type SearchResult = AllCountries;

export type CountryDetail = {
  code: string;
  commonName: string;
  officialName: string;
  flagEmoji: string;
  flagImg: string;
  capital: string[];
  region: string;
  population: number;
  googleMapURL: string;
};
