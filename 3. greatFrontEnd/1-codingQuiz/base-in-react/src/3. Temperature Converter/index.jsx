import { useState } from "react";
import "./styles.css";

const celsiusToFahrenheit = (degree) => {
  const convertNumber = degree * 1.8 + 32;
  return is4DecimalPlaces(convertNumber);
};

const fahrenheitToCelsius = (degree) => {
  const convertNumber = (degree - 32) / 1.8;
  return is4DecimalPlaces(convertNumber);
};

const is4DecimalPlaces = (number) => {
  const reg = /\.\d{5}/;
  return reg.test(number) ? number.toFixed(4) : number;
};

export default function TemperatureConvertor() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const onChangeDegree = (setStart, setEnd, func) => (e) => {
    const reg = /^[0-9]+$/;
    let degree = e.target.value;
    setStart(degree);
    if (!reg.test(degree)) {
      setEnd("");
    } else {
      setEnd(func(degree));
    }
  };

  return (
    <>
      <div>
        <div className='temperature-converter'>
          {/* Use a label for better a11y. */}
          <label className='temperature-converter-column'>
            <input
              className='temperature-converter-column-top-row'
              type='number'
              value={celsius}
              onChange={onChangeDegree(
                setCelsius,
                setFahrenheit,
                celsiusToFahrenheit
              )}
            />
            <div className='temperature-converter-column-bottom-row'>
              Celsius
            </div>
          </label>
          <div className='temperature-converter-column'>
            <div className='temperature-converter-column-top-row'>=</div>
          </div>
          {/* Use a label for better a11y. */}
          <label className='temperature-converter-column'>
            <input
              className='temperature-converter-column-top-row'
              type='number'
              value={fahrenheit}
              onChange={onChangeDegree(
                setFahrenheit,
                setCelsius,
                fahrenheitToCelsius
              )}
            />
            <div className='temperature-converter-column-bottom-row'>
              Fahrenheit
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
