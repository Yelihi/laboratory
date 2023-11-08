import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const InfiniteScroll = () => {
  const [passengers, setPassengers] = useState([]);
  const [page, setPage] = useState(0);

  // Intersection Observer 에 적용할 options 객체
  const options = {};
  const [ref, inView] = useInView(options); // 라이브러리

  const fetch = async (page) => {
    const { data } = await axios.get(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
    );
    const fetchedPassengers = data.data;
    console.log(fetchedPassengers);
    setPassengers((prevState) => [...prevState, ...fetchedPassengers]);
  };

  // page 의 변화를 fetch에 적용시킨다
  useEffect(() => {
    fetch(page);
  }, [page]);

  // 관측 요소가 view 에 들어오게 되면 page 를 1 증가시킨다
  useEffect(() => {
    if (inView) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView]);

  return (
    <div>
      {passengers &&
        passengers.map((passenger, idx) => {
          const lastElement = idx === passengers.length - 1;
          return (
            <div
              key={passenger._id}
              className={lastElement ? "last-child" : ""}
              ref={lastElement ? ref : null}
            >
              <h2>{passenger.name}</h2>
              <h3>{passenger.trips}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default InfiniteScroll;
