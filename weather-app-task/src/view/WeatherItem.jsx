// Clouds Clear Rain
export default function WeatherItem ({weather}){
    let weatherImg ;
    if(weather.mainWeather === 'Clouds'){
        weatherImg =require("../assets/cloud.png")
    }else if (weather.mainWeather === 'Clear'){
        weatherImg=require("../assets/clear.png")
    }else if( weather.mainWeather === 'Rain'){
        weatherImg=require("../assets/rain.png")
    }
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[weather.timeZone.getDay()]
    let hours = weather.timeZone.getHours()
    let mintus = weather.timeZone.getMinutes()
    console.log(weather)
    return(
        
        <div className="weather-item" >
            <img src={weatherImg} alt={weather.mainWeather}/>
            <div className="weather-item-content">
                <div>
                    <h3>{weather.city}</h3>
                    <p>{weather.temp }<sup>&#186;</sup><span>c</span> </p>
                </div>
                <p>wind : {weather.wind}</p>
                <p> {day } : {hours}:{mintus} </p>
                <p>{weather.mainWeather}</p>
            </div>
            <div className="glass"></div>
        </div>
    )
}