import style from "./CountryList.module.css";

import CountryItem from "./CountryItem";

import { AllCountries } from "../utils/APITypes";

type CountryListProps = {
  countries: AllCountries[];
};

const CountryList = ({ countries }: CountryListProps) => {
  return (
    <div className={style.container}>
      {countries.map((country) => (
        <CountryItem key={country.code} {...country} />
      ))}
    </div>
  );
};

export default CountryList;
