import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCards from "./components/WeatherCards";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [Image, setImage] = useState();
  const [randomImage, setRandomImage] = useState("")

 

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
          const ImageApiKey = `39164457-e4d578415391bd203bf06bf93`;
          const ImageUrl = `https://pixabay.com/api/?key=${ImageApiKey}&q=${encodeURIComponent(res.data?.weather[0].description)}`;
          axios
            .get(ImageUrl)
            .then((res) => {
              setImage(res.data)
              getRandomImage()
            })
            .catch((err) => console.log(err));
        })
    }
   
  }, [coords]);

  const getRandomImage = () => {
    
    if (Image?.hits.length) {
      const mierda = Math.floor(Math.random() * Image.hits.length)
      setRandomImage(Image.hits[mierda].largeImageURL)
      
    }
  }
    
  return (
    <main className="container" style={{backgroundImage:`url(${randomImage})`}} >
      <WeatherCards weather={weather} temp={temp}/>
      
    </main>
  );
}

export default App;

