import React, { useState } from "react";

const LightBulb = ({ ligtht }) => {
  return (
    <>
      {ligtht ? (
        <div style={{ backgroundColor: "orange" }}>On</div>
      ) : (
        <div style={{ backgroundColor: "gray" }}>On</div>
      )}
    </>
  );
};

const Body = () => {
  const [light, setLight] = useState(true);

  const switchLight = () => {
    setLight((prev) => !prev);
  };

  return (
    <>
      <LightBulb light={light} />
      <button onClick={switchLight}>켜기</button>
    </>
  );
};

export default Body;
