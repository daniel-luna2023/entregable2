import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCards from "./components/WeatherCards";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [imageURL, setImageURL] = useState('');

  console.log(weather)

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const Apikey = "db4f6ed22e243447b27536b9f42683dd";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${Apikey}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: (((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            ),
          };

          setTemp(obj);
        })

    }



  }, [coords]);


  useEffect(() => {
    console.log(weather?.weather[0].description)

    const ImageApiKey = `39164457-e4d578415391bd203bf06bf93`;
    const searchQuery = weather?.weather[0].description
    console.log(searchQuery)
    const ImageUrl = `https://pixabay.com/api/?key=${ImageApiKey}&image_type=photo&q=('${searchQuery}')`;
    console.log(ImageUrl)
    axios
      .get(ImageUrl)
      .then((res) => {
        if (res.data.hits.length > 0) {
          const firstImageURL = res.data.hits[0].webformatURL;
          setImageURL(firstImageURL);
        }
      })
      .catch((err) => console.log(err));




  }, [weather])

  console.log(imageURL)

  /*Aqui puedes cambiar la URL que puse en caso de que no exista */
  document.body.style = `background-image: url(${imageURL});`


  return (
    <main className="container" >
      <WeatherCards weather={weather} temp={temp} Image={imageURL} />

    </main>
  );
}

export default App;
