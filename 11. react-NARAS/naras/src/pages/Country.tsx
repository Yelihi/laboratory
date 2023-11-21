import style from "./Country.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API } from "../utils/API";
import { CountryDetail } from "../utils/APITypes";

const Country = () => {
  const params = useParams<"code">();
  const [detail, setDetail] = useState<CountryDetail | null>(null);

  useEffect(() => {
    if (params.code) {
      API.fetchCountryDetail(params.code).then((data) => setDetail(data));
    }
  }, []);

  if (detail == null) return <div>로딩중입니다...!</div>;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.commonName}>
          {detail.flagEmoji}&nbsp;{detail.commonName}
        </div>
        <div className={style.officialName}>{detail.officialName}</div>
      </div>
      <img
        src={detail.flagImg}
        alt={`${detail.commonName}의 국기 이미지입니다`}
      />
      <div className={style.body}>
        <div>
          <b>코드 :</b>&nbsp;{detail.code}
        </div>
        <div>
          <b>수도 :</b>&nbsp;{detail.capital.join(", ")}
        </div>
        <div>
          <b>지역 :</b>&nbsp;{detail.region}
        </div>
        <div>
          <b>지도 :</b>&nbsp;
          <a target='_blank' href={detail.googleMapURL}>
            {detail.googleMapURL}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Country;
