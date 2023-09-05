import React, { useState } from "react";

const WeatherCards = ({ weather, temp,}) => {
    console.log(weather);
   

  const [iscelsius, setIscelsius] = useState(true);

  const handleChangeTemp = () => {
    setIscelsius(!iscelsius);
  };

  return (
      <article className="father">
        
      <div className="info-title">
        <h1>weather app</h1>
        <h2 className="text-center">
          {weather?.name}, {weather?.sys.country}{" "}
        </h2>
      </div>
      <div className="content">
        <div>
          <img
            className="stile-img"
            src={
              weather &&
              `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
            }
            alt=""
          />
        </div>
        <section className="stile-list">
          <h3>"{weather?.weather[0].description}"</h3>
          <ul>
            <li>
              <span>wind speed: </span> 
              <span>{weather?.wind.speed} m/s</span>
            </li>
            <li>
              <span>Clouds: </span>
              <span>{weather?.clouds.all} %</span>
            </li>
            <li>
              <span>Pressure: </span>
              <span>{weather?.main.pressure} hpa</span>
            </li>
          </ul>
        </section>
      </div>
      <div className="container_btn">
        <h2 className="container_temp">
          {iscelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}
        </h2>
        <button onClick={handleChangeTemp} className="btn">
          {iscelsius ? `change to °F` : `change to °C`}
        </button>
      </div>
    </article>
  );
};

export default WeatherCards;
