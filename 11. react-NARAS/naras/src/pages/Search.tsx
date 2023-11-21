import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from "./Search.module.css";

import CountryList from "../components/CountryList";
import Searchbar from "../components/Searchbar";
import { API } from "../utils/API";
import { AllCountries } from "../utils/APITypes";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [countries, setCountries] = useState<AllCountries[]>([]);

  // 최선은 아닌거같다. 결국 3번의 렌더링이 발생하니깐? 근데 어차피 loading 이면 3번은 발생해야한다.
  // navigate 를 통해 변경된 url 로 렌더링 첫번째 발생 (기존 배열)
  // useEffect 발동으로 인해 background 에 setCountries([]) 랑 setCountries(data) 들어감 -> 기존 화면 렌더링
  // queue 로 이동하여 첫번째 setCountries([]) 실행 -> 렌더링 -> 로딩중 화면 뜸
  // 두번째 setCountries(data) 실행 -> 렌더링 -> 결과 화면으로 변경
  useEffect(() => {
    setCountries([]);
    API.fetchSearchResult(searchParams.get("q")).then((data) => {
      setCountries(data);
    });
  }, [searchParams.get("q")]);

  if (countries.length == 0) return <div>로딩중입니다...!</div>;

  return (
    <div className={style.container}>
      <Searchbar />
      <div>
        <b>{searchParams.get("q")}</b> 검색 결과
      </div>
      <CountryList countries={countries} />
    </div>
  );
};

export default Search;
