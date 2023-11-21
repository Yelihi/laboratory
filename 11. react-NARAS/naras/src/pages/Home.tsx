import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { API } from "../utils/API";
import { AllCountries } from "../utils/APITypes";

import CountryList from "../components/CountryList";
import Searchbar from "../components/Searchbar";

const Home = () => {
  const [countries, setCountries] = useState<AllCountries[]>([]);
  useEffect(() => {
    API.fetchCountries().then((data) => setCountries(data));
  }, []);

  if (countries.length === 0) return <div>로딩중입니다...!</div>;

  return (
    <div className={style.container}>
      <Searchbar />
      <CountryList countries={countries} />
    </div>
  );
};

export default Home;
